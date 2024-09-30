'use server';

import { PostSchema } from '@/lib/schemas';
import prisma from './api/lib/prisma';

export const getPosts = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        include: {
          tags: true,
        },
      },
      likes: {
        include: {
          user: true,
        },
      },
      replies: {
        include: {
          author: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const parsedPosts = PostSchema.array().parse(posts);
  return parsedPosts;
};
