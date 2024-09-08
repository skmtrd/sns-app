import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/dbConnect';
import { getUserId } from '../../lib/getUserId';
import { handleAPIError } from '../../lib/handleAPIError';
import prisma from '../../lib/prisma';
import { findSpecificUser } from '../../lib/user/findSpecificUser';
import { apiRes } from '../../types';

export const POST = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    dbConnect();

    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const { assignmentId } = await req.json();

    const user = await findSpecificUser(userId);

    const newLike = await prisma.like.create({
      data: {
        user: {
          connect: { id: user.id },
        },
        assignment: {
          connect: { id: assignmentId },
        },
      },
      include: {
        assignment: true,
        user: true,
      },
    });
    return NextResponse.json<apiRes>({ message: 'success', data: newLike }, { status: 200 });
  });

export const DELETE = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    const { assignmentId } = await req.json();
    dbConnect();

    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await findSpecificUser(userId);

    const deleteLike = await prisma.like.delete({
      where: {
        userId_assignmentId: {
          userId: user.id,
          assignmentId: assignmentId,
        },
      },
    });
    return NextResponse.json<apiRes>({ message: 'success', data: deleteLike }, { status: 200 });
  });
