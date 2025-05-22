import { mergeResolvers } from "@graphql-tools/merge";
import { userResolvers } from "./user";
import { arrestLogResolvers } from "./arrestLog";
import { postResolvers } from "./post";
import { postCommentResolvers } from "./postComment";

export const resolvers = mergeResolvers([
  userResolvers,
  arrestLogResolvers,
  postResolvers,
  postCommentResolvers,
]);
