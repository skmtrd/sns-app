import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/dbConnect';
import { handleAPIError } from '../../lib/handleAPIError';
import prisma from '../../lib/prisma';
import { findSpecificUser } from '../../lib/user/findSpecificUser';
import { apiRes } from '../../types';

export const POST = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    dbConnect();

    const { userId } = auth();

    const { questionId } = await req.json();

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await findSpecificUser(userId);

    const newLike = await prisma.like.create({
      data: {
        user: {
          connect: { id: user.id },
        },
        question: {
          connect: { id: questionId },
        },
      },
      include: {
        question: true,
        user: true,
      },
    });
    return NextResponse.json<apiRes>({ message: 'success', data: newLike }, { status: 200 });
  });

export const DELETE = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    const { questionId } = await req.json();
    dbConnect();

    //clerkId
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await findSpecificUser(userId);

    const deleteLike = await prisma.like.delete({
      where: {
        userId_questionId: {
          userId: user.id,
          questionId: questionId,
        },
      },
    });
    return NextResponse.json<apiRes>({ message: 'success', data: deleteLike }, { status: 200 });
  });
