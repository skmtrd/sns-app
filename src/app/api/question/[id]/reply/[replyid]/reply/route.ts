import { dbConnect } from '@/app/api/lib/dbConnect';
import { getUserId } from '@/app/api/lib/getUserId';
import { handleAPIError } from '@/app/api/lib/handleAPIError';
import prisma from '@/app/api/lib/prisma';
import { findSpecificUser } from '@/app/api/lib/user/findSpecificUser';
import { apiRes } from '@/app/api/types';
import { NextResponse } from 'next/server';

export const POST = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    dbConnect();

    const { content, parentReplyId } = await req.json();

    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const user = await findSpecificUser(userId);

    const parentReply = await prisma.questionReply.findUniqueOrThrow({
      where: { id: parentReplyId },
      include: { question: true },
    });

    const reply = await prisma.questionReply.create({
      data: {
        question: {
          connect: { id: parentReply.questionId },
        },
        content,
        author: {
          connect: { id: user.id },
        },
        parentReply: {
          connect: { id: parentReplyId },
        },
      },
      include: {
        author: true,
      },
    });

    return NextResponse.json<apiRes>({ message: 'success', data: reply }, { status: 200 });
  });
