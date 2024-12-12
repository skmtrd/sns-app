import { formatTimeUntil } from '@/hooks/useDeadline';
import { NextResponse } from 'next/server';
import { handleAPIError } from '../lib/handleAPIError';
import prisma from '../lib/prisma';
import { apiRes } from '../types';

export const GET = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    const assignments = await prisma.assignment.findMany();
    for (const assignment of assignments) {
      const [datePart, timePart] = assignment.deadLine.split('/');
      const [year, month, day] = datePart.split('-').map(Number);
      const [hour, minute] = timePart.split(':').map(Number);
      const target = new Date(year, month - 1, day, hour, minute);
      const timeUntil = formatTimeUntil(target);
      if (timeUntil === 'over') {
        const deletedAssignment = await prisma.assignment.delete({
          where: { id: assignment.id },
        });
        console.log(`Deleted assignment: ${deletedAssignment.title}`);
      }
    }

    return NextResponse.json<apiRes>({ message: 'success', data: assignments }, { status: 200 });
  });
