import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/dbConnect';
import { getClerkId } from '../../lib/getUserId';
import { handleAPIError } from '../../lib/handleAPIError';
import prisma from '../../lib/prisma';
import { findSpecificUser } from '../../lib/user/findSpecificUser';
import { apiRes } from '../../types';

export const POST = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    dbConnect();

    const clerkId = getClerkId();

    if (!clerkId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const { assignmentReplyId } = await req.json();

    const user = await findSpecificUser(clerkId);

    const newReplyLike = await prisma.likeReply.create({
      data: {
        user: {
          connect: { id: user.id },
        },
        assignmentReply: {
          connect: { id: assignmentReplyId },
        },
      },
      include: {
        assignmentReply: true,
        user: true,
      },
    });
    return NextResponse.json<apiRes>({ message: 'success', data: newReplyLike }, { status: 200 });
  });
export const DELETE = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    const { assignmentReplyId } = await req.json();
    dbConnect();

    const clerkId = getClerkId();

    if (!clerkId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await findSpecificUser(clerkId);

    const deleteLike = await prisma.likeReply.delete({
      where: {
        userId_assignmentReplyId: {
          userId: user.id,
          assignmentReplyId: assignmentReplyId,
        },
      },
    });
    return NextResponse.json<apiRes>({ message: 'success', data: deleteLike }, { status: 200 });
  });
