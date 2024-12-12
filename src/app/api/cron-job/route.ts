import { formatTimeUntil } from '@/lib/formatTimeUntil';
import { NextResponse } from 'next/server';
import { handleAPIError } from '../lib/handleAPIError';
import prisma from '../lib/prisma';
import { apiRes } from '../types';

export const GET = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
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
    for (const assignment of assignments) {
      const [datePart, timePart] = assignment.deadLine.split('/');
      const [year, month, day] = datePart.split('-').map(Number);
      const [hour, minute] = timePart.split(':').map(Number);
      const target = new Date(year, month - 1, day, hour, minute);
      const timeUntil = formatTimeUntil(target);
      if (timeUntil === 'over') {
        const deletedReplies = await prisma.assignmentReply.deleteMany({
          where: { assignmentId: assignment.id },
        });
        const deletedLikes = await prisma.like.deleteMany({
          where: { assignmentId: assignment.id },
        });
        const deletedAssignment = await prisma.assignment.delete({
          where: { id: assignment.id },
        });
      }
    }

    return NextResponse.json<apiRes>({ message: 'success', data: assignments }, { status: 200 });
  });
