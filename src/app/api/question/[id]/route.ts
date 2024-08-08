import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/dbConnect';
import { handleAPIError } from '../../lib/handleAPIError';
import prisma from '../../lib/prisma';
import { apiRes } from '../../types';

export const DELETE = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    dbConnect();
    const questionId = req.url.split('/question/')[1];

    const deletedReplies = await prisma.questionReply.deleteMany({ where: { questionId } });
    const deletedQuestion = await prisma.question.delete({ where: { id: questionId } });
    return NextResponse.json<apiRes>(
      { message: 'success', data: deletedQuestion },
      { status: 200 },
    );
  });
