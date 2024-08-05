import { dbConnect } from '@/app/api/lib/dbConnect';
import { handleAPIError } from '@/app/api/lib/handleAPIError';
import prisma from '@/app/api/lib/prisma';
import { apiRes } from '@/app/api/types';
import { NextResponse } from 'next/server';

export const POST = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    dbConnect();

    //がんばれたなか
    //成長するんだ

    const { content, parentReplyId } = await req.json();

    const userId = 'user_2kAm1CqUROhV77wXS43Td3lI3NN';

    const user = await prisma.user.findUniqueOrThrow({
      where: { clerkId: userId },
    });

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