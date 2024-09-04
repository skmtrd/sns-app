import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/dbConnect';
import { handleAPIError } from '../../lib/handleAPIError';
import prisma from '../../lib/prisma';
import { checkUserIdExists } from '../../lib/user/checkUserIdExists';
import { apiRes } from '../../types';

export const GET = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    const clerkId = req.url.split('/profile/')[1];
    const clerkUser = await clerkClient().users.getUser(clerkId);
    if (!clerkUser)
      return NextResponse.json<apiRes>({ message: 'User not found' }, { status: 404 });

    const { imageUrl } = clerkUser;

    await dbConnect();
    const user = await prisma.user.findUnique({
      where: { clerkId: clerkId },
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

    const postsWithAvatar = await Promise.all(
      user.posts.map(async (post) => {
        return {
          ...post,
          avatar: imageUrl,
          replies: await Promise.all(
            post.replies.map(async (reply) => {
              return {
                ...reply,
                avatar: null,
              };
            }),
          ),
        };
      }),
    );

    return NextResponse.json<apiRes>(
      {
        message: 'Success',
        data: {
          ...user,
          avatar: imageUrl,
          posts: postsWithAvatar,
        },
      },
      { status: 200 },
    );
  });

export const PUT = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    await dbConnect();
    const clerkId = req.url.split('/profile/')[1];

    const { name, introduction, userId } = await req.json();

    const isUserIdExists = await checkUserIdExists(userId, clerkId);
    if (isUserIdExists) {
      return NextResponse.json<apiRes>({ message: 'userId already exits' }, { status: 404 });
    } else {
      const newProfile = await prisma.user.update({
        data: { name, introduction, id: userId },
        where: { clerkId: clerkId },
      });

      return NextResponse.json<apiRes>({ message: 'Success', data: newProfile }, { status: 200 });
    }
  });
