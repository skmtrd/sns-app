'use server';

import { revalidatePath } from 'next/cache';
import prisma from '../../api/lib/prisma';
import { getSession } from '../getSession';

export const registerAssignment = async (assignmentId: string) => {
  const session = await getSession();
  const newAssignment = await prisma.like.create({
    data: {
      user: {
        connect: { id: session.id },
      },
      assignment: { connect: { id: assignmentId } },
    },
    include: {
      assignment: true,
      user: true,
    },
  });

  revalidatePath('/assignments');
  revalidatePath('/my-assignments');
  return newAssignment;
};

export const unRegisterAssignment = async (assignmentId: string) => {
  const session = await getSession();
  const deleteAssignment = await prisma.like.delete({
    where: {
      userId_assignmentId: {
        userId: session.id,
        assignmentId: assignmentId,
      },
    },
    include: {
      assignment: true,
      user: true,
    },
  });

  revalidatePath('/assignments');
  revalidatePath('/my-assignments');

  return deleteAssignment;
};
