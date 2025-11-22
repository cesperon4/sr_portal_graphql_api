import { mergeResolvers } from "@graphql-tools/merge";
import { arrestLogResolvers } from "./arrestLog";
import { likeResolvers } from "./like";
import { postResolvers } from "./post";
import { postCommentResolvers } from "./postComment";
import { userResolvers } from "./user";

export const resolvers = mergeResolvers([
  userResolvers,
  arrestLogResolvers,
  postResolvers,
  postCommentResolvers,
  likeResolvers,
]);
