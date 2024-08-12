import { dbConnect } from '@/app/api/lib/dbConnect';
import { getClerkId } from '@/app/api/lib/getClerkId';
import { handleAPIError } from '@/app/api/lib/handleAPIError';
import prisma from '@/app/api/lib/prisma';
import { NextResponse } from 'next/server';

export const POST = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    dbConnect();

    const clerkId = getClerkId();

    if (!clerkId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUniqueOrThrow({
      where: { clerkId: clerkId },
    });

    const { content, postId } = await req.json();
    const newReply = await prisma.postReply.create({
      data: {
        post: {
          connect: { id: postId },
        },
        content,
        author: {
          connect: { id: user.id },
        },
      },
      include: {
        author: true,
      },
    });
    return NextResponse.json({ message: 'success', data: newReply }, { status: 200 });
  });
