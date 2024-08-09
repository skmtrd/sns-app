import { dbConnect } from '@/app/api/lib/dbConnect';
import { handleAPIError } from '@/app/api/lib/handleAPIError';
import prisma from '@/app/api/lib/prisma';
import { findSpecificUser } from '@/app/api/lib/user/findSpecificUser';
import { apiRes } from '@/app/api/types';
import { NextResponse } from 'next/server';

export const POST = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    dbConnect();

    //がんばれたなか
    //成長するんだ

    const { content, questionId } = await req.json();

    const userId = 'user_2kAm1CqUROhV77wXS43Td3lI3NN';

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await findSpecificUser(userId);

    const reply = await prisma.questionReply.create({
      data: {
        question: {
          connect: { id: questionId },
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
