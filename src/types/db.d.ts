import type { Post, Campus, User, Vote, Comment } from '@prisma/client'

export type ExtendedPost = Post & {
  campus: Campus
  votes: Vote[]
  author: User
  comments: Comment[]
}
