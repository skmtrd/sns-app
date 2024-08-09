import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/dbConnect';
import { handleAPIError } from '../../lib/handleAPIError';
import prisma from '../../lib/prisma';
import { apiRes } from '../../types';

export const DELETE = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    dbConnect();
    const assignmentId = req.url.split('/assignment/')[1];

    const deletedReplies = await prisma.assignmentReply.deleteMany({ where: { assignmentId } });
    const deletedAssignment = await prisma.assignment.delete({ where: { id: assignmentId } });
    return NextResponse.json<apiRes>(
      { message: 'success', data: deletedAssignment },
      { status: 200 },
    );
  });
