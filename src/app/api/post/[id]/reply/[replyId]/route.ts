import { dbConnect } from '@/app/api/lib/dbConnect';
import { handleAPIError } from '@/app/api/lib/handleAPIError';
import prisma from '@/app/api/lib/prisma';
import { apiRes } from '@/app/api/types';
import { NextResponse } from 'next/server';

export const DELETE = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    dbConnect();
    const replyId = req.url.split('/reply/')[1];

    const deletedReplies = await prisma.postReply.deleteMany({ where: { id: replyId } });

    return NextResponse.json<apiRes>({ message: 'success', data: deletedReplies }, { status: 200 });
  });
