import { gql } from "apollo-server-micro";

import { arrestLogTypeDefs } from "./arrestLog";
import { likeTypeDefs } from "./like";
import { postTypeDefs } from "./post";
import { postCommentTypeDefs } from "./postComment";
import { stripeTypeDefs } from "./stripe";
import { userTypeDefs } from "./user";

export const typeDefs = [
  gql`
    type Query
    type Mutation
  `,
  userTypeDefs,
  postTypeDefs,
  postCommentTypeDefs,
  arrestLogTypeDefs,
  likeTypeDefs,
  stripeTypeDefs,
];
