import { type PostsArgs } from "./posts"
import { type Post } from "../../generated/prisma/client"


export type CacheKeyVariables = PostsArgs | null

export type CacheValues = Post[]