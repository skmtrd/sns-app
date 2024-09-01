import { dbConnect } from '@/app/api/lib/dbConnect';
import { handleAPIError } from '@/app/api/lib/handleAPIError';
import { apiRes } from '@/app/api/types';
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export const GET = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    await dbConnect();
    const clerkId = req.url.split('/')[6];
    const posts = await prisma.question.findMany({
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
        replies: {
          include: {
            author: true,
            childReplies: true,
          },
        },
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
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json<apiRes>({ message: 'success', data: posts }, { status: 200 });
  });
