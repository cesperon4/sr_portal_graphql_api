import { mergeResolvers } from "@graphql-tools/merge";
import { userResolvers } from "./user";

export const resolvers = mergeResolvers([userResolvers]);
