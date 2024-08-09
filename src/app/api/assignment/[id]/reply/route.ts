import { dbConnect } from '@/app/api/lib/dbConnect';
import { handleAPIError } from '@/app/api/lib/handleAPIError';
import prisma from '@/app/api/lib/prisma';
import { apiRes } from '@/app/api/types';
import { NextResponse } from 'next/server';

export const POST = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    dbConnect();

    const { content, assignmentId } = await req.json();

    const userId = 'user_2kAm1CqUROhV77wXS43Td3lI3NN';

    const user = await prisma.user.findUniqueOrThrow({
      where: { clerkId: userId },
    });

    const reply = await prisma.assignmentReply.create({
      data: {
        assignment: {
          connect: { id: assignmentId },
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

    return NextResponse.json<apiRes>({ message: 'success', data: reply }, { status: 200 });
  });
