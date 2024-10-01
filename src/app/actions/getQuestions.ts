'use server';
import { revalidatePath } from 'next/cache';
import prisma from '../api/lib/prisma';
export const getQuestions = async () => {
  const questions = await prisma.question.findMany({
    include: {
      replies: {
        include: {
          author: true,
          childReplies: true,
        },
      },
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
    },
    orderBy: { createdAt: 'desc' },
  });
  revalidatePath('/bookmarks');
  return questions;
};
