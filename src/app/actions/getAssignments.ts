'use server';
import { AssignmentSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';
import prisma from '../api/lib/prisma';

export const getAssigments = async () => {
  const assignments = await prisma.assignment.findMany({
    include: {
      replies: {
        include: {
          author: true,
          childReplies: true,
        },
      },
      likes: {
        include: {
          user: true,
        },
      },
      author: {
        include: {
          tags: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
  revalidatePath('/my-assignments');
  const parsedAssignments = AssignmentSchema.array().parse(assignments);
  return parsedAssignments;
};
