import { getUserId } from '@/app/api/lib/getUserId';
import { handleAPIError } from '@/app/api/lib/handleAPIError';
import prisma from '@/app/api/lib/prisma';
import { findSpecificUser } from '@/app/api/lib/user/findSpecificUser';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const POST = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await findSpecificUser(userId);

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
    revalidatePath(`/post/${postId}`);
    revalidatePath(`/timeline`);
    return NextResponse.json({ message: 'success', data: newReply }, { status: 200 });
  });
