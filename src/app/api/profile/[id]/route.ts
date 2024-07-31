import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/dbConnect';
import prisma from '../../lib/prisma';
import { checkUserIdExists } from '../../lib/user/checkUserIdExists';
import { apiRes } from '../../types';

export const GET = async (req: Request, res: NextResponse) => {
  try {
    const clerkId = req.url.split('/profile/')[1];

    await dbConnect();

    const user = await prisma.user.findUnique({
      where: { clerkId: clerkId },
      include: { tags: true },
    });

    return NextResponse.json<apiRes>({ message: 'Success', data: user }, { status: 200 });
  } catch (err) {
    return NextResponse.json<apiRes>({ message: 'Error', data: err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: Request, res: NextResponse) => {
  try {
    await dbConnect();
    const clerkId = req.url.split('/profile/')[1];

    const { name, introduction, userId } = await req.json();

    //新しく登録するuserIdが存在するかを確認する
    //存在したら、エラーメッセージを返す
    const isUserIdExists = await checkUserIdExists(userId, clerkId);
    if (isUserIdExists)
      return NextResponse.json<apiRes>({ message: 'userId already exits' }, { status: 404 });
    //userIdが存在しなければ、新しいプロフィールを作成する
    else {
      const newProfile = await prisma.user.update({
        data: { name, introduction, id: userId },
        where: { clerkId: clerkId },
      });

      return NextResponse.json<apiRes>({ message: 'Success', data: newProfile }, { status: 200 });
    }
  } catch (err) {
    return NextResponse.json<apiRes>({ message: 'Error', data: err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
