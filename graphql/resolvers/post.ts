import { GraphQLError, GraphQLResolveInfo } from "graphql";
import { type Post } from "../../generated/prisma/client";
import { supabaseAdmin } from "../../lib/supabaseAdmin"; // server-side Supabase client

import { sendResponse } from "../../lib/apiResponse";
import { HttpMessages, HttpStatus } from "../../lib/constants/http";
import { requireAuth } from "../../helpers/auth";
import { parseLocation } from "../../helpers/stringParser";
import { asStringArray } from "../../lib/json";
import { prisma } from "../../lib/prisma";
import {
  getJSON,
  makeCacheKey,
  setJSON,
} from "../../services/cache";
import { scheduleInvalidateByPrefix } from "../../services/jobs/invalidate-cache";
import { scheduleDeletePostImages } from "../../services/jobs/delete-post-images";
import { type ContextObject, isUser } from "../types/context";
import { type PostsArgs } from "../types/posts";
import { type ApiResponse, type Page } from "../types/response";

type MapPost = {
  id: number;
  lat: number;
  lon: number;
  title: string;
  date_occurred: Date;
};

type PostCategory =
  | "VA"
  | "SS"
  | "CE"
  | "TB"
  | "DD"
  | "TI"
  | "PD"
  | "EH"
  | "PL"
  | "CO";

interface CreatePostArgs {
  title: string;
  body: string;
  userId: string;
  arrestLogId: number | null;
  imageBase64: string[]; // Optional field for base64 image data
  imageName: string[]; // Optional field for image name
  lat?: string;
  lon?: string;
  locationName?: string;
  date?: Date;
  category?: PostCategory;
  date_occurred?: Date;
}

const POSTS_TTL_MS = 60 * 60 * 1000; // 1 hour

export const postResolvers = {
  Query: {
    posts: async (
      _parent: unknown,
      args: { data: PostsArgs },
      context: ContextObject,
      info: GraphQLResolveInfo,
    ): Promise<ApiResponse<Page<Post[]> | null>> => {
      const authenticated = requireAuth(context); // ⛔ block if not authenticated
      if (!authenticated)
        throw new GraphQLError("Unauthorized", {
          extensions: { code: "UNAUTHENTICATED" },
        });

      if (!args.data)
        return sendResponse(
          null,
          HttpStatus.BAD_REQUEST,
          HttpMessages.BAD_REQUEST,
        );
      try {
        const { limit, cursor } = args.data;

        const key = `gql:${info.fieldName}:${makeCacheKey(
          info.fieldName,
          args.data,
        )}`; //create key using field name and argumens

        const cached = await getJSON<Page<Post[]>>(key); //get cached value as json

        if (cached) return sendResponse(cached);

        const posts = await prisma.post.findMany({
          take: limit + 1, // fetch one extra to check if there's a next page
          orderBy: { createdAt: "desc" },
          ...(cursor
            ? { cursor: { id: cursor }, skip: 1 } // skip the cursor itself
            : {}),
        });

        const hasNextPage = posts.length > limit;
        const slicedPosts = hasNextPage ? posts.slice(0, -1) : posts;

        const pageData = {
          data: slicedPosts,
          cursor: hasNextPage ? slicedPosts[slicedPosts.length - 1].id : null,
          hasNextPage,
        };

        await setJSON(key, pageData, POSTS_TTL_MS);

        return sendResponse(pageData);
      } catch (err) {
        console.log(err);
        throw new GraphQLError("Internal server error", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },
    post: async (_parent: unknown, args: { id: number }, context: any) => {
      // requireAuth(context); // ⛔ block if not authenticated

      return prisma.post.findUnique({
        where: {
          id: Number(args.id),
        },
      });
    },
    mapPosts: async (
      _parent: unknown,
      args: unknown,
      context: ContextObject,
      info: GraphQLResolveInfo,
    ): Promise<ApiResponse<MapPost[] | null>> => {
      try {
        const key = `gql:${info.fieldName}:${makeCacheKey(info.fieldName, null)}`;

        const cached = await getJSON<MapPost[]>(key); //get cached value as json

        if (cached) return sendResponse(cached);

        const map_posts = (await prisma.post.findMany({
          where: { lat: { not: null }, lon: { not: null } },
          select: {
            id: true,
            lat: true,
            lon: true,
            title: true,
            date_occurred: true,
          },
        })) as MapPost[];

        await setJSON(key, map_posts, POSTS_TTL_MS);
        return sendResponse(map_posts);
      } catch (err) {
        console.log(err);
        return sendResponse(
          null,
          HttpStatus.INTERNAL_SERVER_ERROR,
          HttpMessages.INTERNAL_SERVER_ERROR,
        );
      }
    },
  },
  Mutation: {
    createPost: async (
      _parent: unknown,
      args: { data: CreatePostArgs },
      context: ContextObject,
    ) => {
      // requireAuth(context); // ⛔ block if not authenticated

      let imageUrls: string[] = [];
      let imageKeys: string[] = [];

      const { street, city, state, zip } = parseLocation(
        args.data.locationName,
      );

      if (args.data.imageBase64?.length > 0) {
        const uploadPromises = args.data.imageBase64.map(
          async (base64, index) => {
            const storageKey = `post-images/${Date.now()}-${args.data.imageName[index]}`;
            const base64String = base64.includes(",")
              ? base64.split(",")[1]
              : base64;

            const { error: uploadError } = await supabaseAdmin.storage
              .from("images")
              .upload(storageKey, Buffer.from(base64String, "base64"), {
                contentType: "image/jpeg",
                upsert: false,
              });

            if (uploadError)
              throw new Error(`Image upload failed: ${uploadError.message}`);

            const { data: publicData } = supabaseAdmin.storage
              .from("images")
              .getPublicUrl(storageKey);

            return {
              imageUrl: publicData.publicUrl,
              imageKey: storageKey,
            };
          },
        );

        const uploads = await Promise.all(uploadPromises);
        imageUrls = uploads.map((u) => u.imageUrl);
        imageKeys = uploads.map((u) => u.imageKey);
      }

      void scheduleInvalidateByPrefix("gql:posts");
      void scheduleInvalidateByPrefix("gql:mapPosts");
      void scheduleInvalidateByPrefix("gql:user");

      return prisma.post.create({
        data: {
          title: args.data.title,
          body: args.data.body,
          userId: args.data.userId,
          arrestLogId: args.data.arrestLogId,
          createdAt: new Date(),
          updatedAt: new Date(),
          imageUrls,
          imageKeys,
          lat: args.data.lat ? parseFloat(args.data.lat) : undefined,
          lon: args.data.lon ? parseFloat(args.data.lon) : undefined,
          street: street ? street : undefined,
          category: args.data.category ? args.data.category : undefined,
          city: city ? city : undefined,
          state: state ? state : undefined,
          zip: zip ? zip : undefined,
          date_occurred: args.data.date_occurred
            ? args.data.date_occurred
            : undefined,
        },
      });
    },
    updatePost: (
      _parent: unknown,
      args: { id: number; data: Partial<CreatePostArgs> },
      context: any,
    ) => {
      // requireAuth(context); // ⛔ block if not authenticated

      // invalidateByPrefix("gql:posts");
      void scheduleInvalidateByPrefix("gql:posts");

      return prisma.post.update({
        where: {
          id: Number(args.id),
        },
        data: {
          updatedAt: new Date(),
          title: args.data.title ? { set: args.data.title } : undefined,
          body: args.data.body ? { set: args.data.body } : undefined,
          category: args.data.category
            ? { set: args.data.category }
            : undefined,
        },
      });
    },
    deletePost: async (
      _parent: unknown,
      args: { id: number },
      context: ContextObject,
    ) => {
      if (!requireAuth(context) || !context.user || !isUser(context.user)) {
        throw new GraphQLError("Unauthorized", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      const id = Number(args.id);

      const existing = await prisma.post.findUnique({
        where: { id },
        select: { id: true, userId: true, imageKeys: true },
      });

      if (!existing) {
        throw new GraphQLError("Post not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }

      if (existing.userId !== context.user.userId) {
        throw new GraphQLError("You can only delete your own posts", {
          extensions: { code: "FORBIDDEN" },
        });
      }

      const imageKeys = asStringArray(existing.imageKeys);

      const deleted = await prisma.post.delete({ where: { id } });

      if (imageKeys.length > 0) {
        await scheduleDeletePostImages(
          { imageKeys },
          { jobId: `delete-post-images:${id}` },
        );
      }

      void scheduleInvalidateByPrefix("gql:posts");
      void scheduleInvalidateByPrefix("gql:mapPosts");
      void scheduleInvalidateByPrefix("gql:user");

      return deleted;
    },
  },

  Post: {
    postComments: (parent: Post, _args: {}) => {
      return prisma.postComment.findMany({
        where: { postId: parent?.id },
        orderBy: { updatedAt: "desc" },
      });
    },
    arrestLog: (parent: Post, _args: {}) => {
      return prisma.arrestLog.findUnique({
        where: { postId: parent?.id },
      });
    },

    user: (parent: Post, _args: {}) => {
      return prisma.user.findUnique({
        where: { id: parent?.userId },
      });
    },
    likes: (parent: Post, _args: {}) => {
      return prisma.like.findMany({
        where: { postId: parent?.id },
        orderBy: { createdAt: "desc" },
      });
    },
  },
};
