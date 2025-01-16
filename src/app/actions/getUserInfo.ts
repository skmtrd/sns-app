'use server';
import { ProfileSchema } from '@/lib/schemas';
import prisma from '../api/lib/prisma';
export const getUserInfo = async (userId: string) => {
  const userInfo = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      tags: {
        select: { id: true, name: true },
      },
      posts: {
        orderBy: { createdAt: 'desc' },
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
      },
    },
  });
  const parsedUserInfo = ProfileSchema.parse(userInfo);
  return parsedUserInfo;
};
