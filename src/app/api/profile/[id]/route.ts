import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/dbConnect';
import { handleAPIError } from '../../lib/handleAPIError';
import prisma from '../../lib/prisma';
import { checkUserIdExists } from '../../lib/user/checkUserIdExists';
import { apiRes } from '../../types';

export const GET = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    const userId = req.url.split('/profile/')[1];

    await dbConnect();
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        tags: {
          select: { id: true, name: true },
        },
        posts: {
          orderBy: { createdAt: 'desc' },
          include: {
            author: {
              include: {
                tags: true,
              },
            },
            likes: {
              include: {
                user: true,
              },
            },
            replies: {
              include: {
                author: true,
              },
            },
          },
        },
      },
    });

    if (!user) return NextResponse.json<apiRes>({ message: 'User not found' }, { status: 404 });

    return NextResponse.json<apiRes>(
      {
        message: 'Success',
        data: {
          ...user,
        },
      },
      { status: 200 },
    );
  });

export const PUT = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    await dbConnect();
    const currentUserId = req.url.split('/profile/')[1];

    const { name, userId } = await req.json();

    const isUserIdExists = await checkUserIdExists(userId, currentUserId);
    if (isUserIdExists) {
      return NextResponse.json<apiRes>({ message: 'userId already exits' }, { status: 404 });
    } else {
      const newProfile = await prisma.user.update({
        data: { name, id: userId },
        where: { id: currentUserId },
      });

      return NextResponse.json<apiRes>({ message: 'Success', data: newProfile }, { status: 200 });
    }
  });
