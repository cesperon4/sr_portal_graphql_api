import { gql } from "apollo-server-micro";

import { userTypeDefs } from "./user";
import { postTypeDefs } from "./post";
import { postCommentTypeDefs } from "./postComment";
import { arrestLogTypeDefs } from "./arrestLog";

export const typeDefs = [
  gql`
    type Query
    type Mutation
  `,
  userTypeDefs,
  postTypeDefs,
  postCommentTypeDefs,
  arrestLogTypeDefs,
];
