import { dbConnect } from '@/app/api/lib/dbConnect';
import { handleAPIError } from '@/app/api/lib/handleAPIError';
import { apiRes } from '@/app/api/types';
import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export const GET = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    const clerkId = req.url.split('/')[6];
    console.log(clerkId);
    await dbConnect();
    const posts = await prisma.post.findMany({
      where: {
        likes: {
          some: {
            user: {
              clerkId,
            },
          },
        },
      },
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
      orderBy: { createdAt: 'desc' },
    });

    const postsWithAvatar = await Promise.all(
      posts.map(async (post) => {
        return {
          ...post,
          avatar: (await clerkClient().users.getUser(post.author.clerkId)).imageUrl,
        };
      }),
    );

    return NextResponse.json<apiRes>(
      { message: 'success', data: postsWithAvatar },
      { status: 200 },
    );
  });
