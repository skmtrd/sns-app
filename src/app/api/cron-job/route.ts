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

    const overDeadlinedAssignments = assignments.filter((assignment) => {
      const [datePart, timePart] = assignment.deadLine.split('/');
      const [year, month, day] = datePart.split('-').map(Number);
      const [hour, minute] = timePart.split(':').map(Number);
      const target = new Date(year, month - 1, day, hour, minute);
      const now = new Date();
      return target < now;
    });

    const deletedAssignments = await prisma.assignment.deleteMany({
      where: {
        id: {
          in: overDeadlinedAssignments.map((assignment) => assignment.id),
        },
      },
    });

    return NextResponse.json<apiRes>(
      { message: 'success', data: overDeadlinedAssignments },
      { status: 200 },
    );
  });
