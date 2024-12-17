'use server';

import { revalidatePath } from 'next/cache';
import prisma from '../../api/lib/prisma';
import { getSession } from '../getSession';

export const likePost = async (postId: string) => {
  const session = await getSession();
  const newLike = await prisma.like.create({
    data: {
      user: {
        connect: { id: session.id },
      },
      post: { connect: { id: postId } },
    },
    include: {
      post: true,
      user: true,
    },
  });

  revalidatePath('/timeline');
  revalidatePath('/likes');
  revalidatePath(`/profile/${newLike.post?.authorId}`);
  return newLike;
};

export const unLikePost = async (postId: string) => {
  const session = await getSession();
  const deleteLike = await prisma.like.delete({
    where: {
      userId_postId: {
        userId: session.id,
        postId: postId,
      },
    },
    include: {
      post: true,
      user: true,
    },
  });

  revalidatePath('/timeline');
  revalidatePath('/likes');
  revalidatePath(`/profile/${deleteLike.post?.authorId}`);
  return deleteLike;
};
