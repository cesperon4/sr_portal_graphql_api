import { mergeResolvers } from "@graphql-tools/merge";
import { authResolvers } from "./auth";
import { arrestLogResolvers } from "./arrestLog";
import { likeResolvers } from "./like";
import { postResolvers } from "./post";
import { postCommentResolvers } from "./postComment";
import { stripeResolvers } from "./stripe";
import { userResolvers } from "./user";

export const resolvers = mergeResolvers([
  authResolvers,
  userResolvers,
  arrestLogResolvers,
  postResolvers,
  postCommentResolvers,
  likeResolvers,
  stripeResolvers,
]);
