import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/dbConnect';
import { getClerkId } from '../../lib/getClerkId';
import { handleAPIError } from '../../lib/handleAPIError';
import prisma from '../../lib/prisma';
import { findSpecificUser } from '../../lib/user/findSpecificUser';
import { apiRes } from '../../types';

export const POST = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    dbConnect();
    const { postReplyId } = await req.json();

    const clerkId = getClerkId();

    if (!clerkId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await findSpecificUser(clerkId);

    const newLike = await prisma.likeReply.create({
      data: {
        user: { connect: { id: user.id } },
        postReply: { connect: { id: postReplyId } },
      },
      include: {
        user: true,
        postReply: true,
      },
    });

    return NextResponse.json<apiRes>({ message: 'success', data: newLike }, { status: 200 });
  });

export const DELETE = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    dbConnect();

    const { postReplyId } = await req.json();

    const clerkId = getClerkId();

    if (!clerkId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await findSpecificUser(clerkId);

    const deleteLike = await prisma.likeReply.delete({
      where: {
        userId_postReplyId: {
          userId: user.id,
          postReplyId: postReplyId,
        },
      },
    });

    return NextResponse.json({ message: 'success', data: deleteLike }, { status: 200 });
  });
