import { NextResponse } from 'next/server';
import { handleAPIError } from '../lib/handleAPIError';
import { apiRes } from '../types';

export const GET = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    // const assignments = await prisma.assignment.findMany();
    // for (const assignment of assignments) {
    //   const [datePart, timePart] = assignment.deadLine.split('/');
    //   const [year, month, date] = datePart.split('-');

    // }
    const now = new Date();

    return NextResponse.json<apiRes>({ message: 'success', data: now }, { status: 200 });
  });
