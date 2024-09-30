'use server';
import { AssignmentSchema } from '@/lib/schemas';
import prisma from '../api/lib/prisma';

export const getAssignments = async () => {
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
  const parsedAssignments = AssignmentSchema.array().parse(assignments);
  return parsedAssignments;
};
