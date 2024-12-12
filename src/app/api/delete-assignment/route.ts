import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { handleAPIError } from '../lib/handleAPIError';
import prisma from '../lib/prisma';
import { apiRes } from '../types';

export const GET = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    revalidatePath('/api/assignment');
    const assignments = await prisma.assignment.findMany({
      include: {
        replies: {
          include: {
            author: true,
            childReplies: true,
          },
        },
        likes: {
          include: {
            user: true,
          },
        },
        author: {
          include: {
            tags: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json<apiRes>({ message: 'success', data: assignments }, { status: 200 });
  });
