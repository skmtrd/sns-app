import { dbConnect } from '@/app/api/lib/dbConnect';
import { handleAPIError } from '@/app/api/lib/handleAPIError';
import { apiRes } from '@/app/api/types';
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export const GET = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    const id = req.url.split('/')[6];

    await dbConnect();
    const posts = await prisma.post.findMany({
      where: {
        likes: {
          some: {
            user: {
              id,
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

    return NextResponse.json<apiRes>({ message: 'success', data: posts }, { status: 200 });
  });
