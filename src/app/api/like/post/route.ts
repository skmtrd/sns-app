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

    const { postId } = await req.json();

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await findSpecificUser(userId);

    const newLike = await prisma.like.create({
      data: {
        author: {
          connect: { id: user.id },
        },
        post: { connect: { id: postId } },
      },
      include: {
        post: true,
        author: true,
      },
    });

    return NextResponse.json<apiRes>({ message: 'success', data: newLike }, { status: 200 });
  });

export const DELETE = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    const { userId } = auth();

    const { postId } = await req.json();

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await findSpecificUser(userId);

    const deleteLike = await prisma.like.delete({
      where: {
        authorId_postId: {
          authorId: user.id,
          postId: postId,
        },
      },
    });
    return NextResponse.json({ message: 'success', data: deleteLike }, { status: 200 });
  });
