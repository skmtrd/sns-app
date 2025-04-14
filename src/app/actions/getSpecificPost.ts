import prisma from '@/app/api/lib/prisma';
import { PostSchema } from '@/lib/schemas';

export const getSpecificPost = async (postId: string) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
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
          author: {
            include: {
              tags: true,
            },
          },
        },
      },
    },
  });

  const parsedPost = PostSchema.parse(post);
  return parsedPost;
};
