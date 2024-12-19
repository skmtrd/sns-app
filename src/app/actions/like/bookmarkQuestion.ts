'use server';

import { revalidatePath } from 'next/cache';
import prisma from '../../api/lib/prisma';
import { getSession } from '../getSession';

export const bookmarkQuestion = async (questionId: string) => {
  const session = await getSession();
  const newBookmark = await prisma.like.create({
    data: {
      user: {
        connect: { id: session.id },
      },
      question: { connect: { id: questionId } },
    },
    include: {
      question: true,
      user: true,
    },
  });

  revalidatePath('/questions');
  revalidatePath('/bookmarks');
  return newBookmark;
};

export const unBookmarkQuestion = async (questionId: string) => {
  const session = await getSession();
  const deleteBookmark = await prisma.like.delete({
    where: {
      userId_questionId: {
        userId: session.id,
        questionId: questionId,
      },
    },
    include: {
      question: true,
      user: true,
    },
  });

  revalidatePath('/questions');
  revalidatePath('/bookmarks');

  return deleteBookmark;
};
