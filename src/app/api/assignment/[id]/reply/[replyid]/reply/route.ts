import { dbConnect } from '@/app/api/lib/dbConnect';
import { getClerkId } from '@/app/api/lib/getUserId';
import { handleAPIError } from '@/app/api/lib/handleAPIError';
import prisma from '@/app/api/lib/prisma';
import { apiRes } from '@/app/api/types';
import { NextResponse } from 'next/server';

export const POST = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    dbConnect();

    const { content, parentReplyId } = await req.json();

    const clerkId = getClerkId();

    if (!clerkId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUniqueOrThrow({
      where: { clerkId: clerkId },
    });

    const parentReply = await prisma.assignmentReply.findUniqueOrThrow({
      where: { id: parentReplyId },
      include: { assignment: true },
    });

    const reply = await prisma.assignmentReply.create({
      data: {
        assignment: {
          connect: { id: parentReply.assignmentId },
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
