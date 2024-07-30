import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/dbConnect';
import prisma from '../../lib/prisma';
import { checkUserIdExists } from '../../lib/user/checkUserIdExists';
import { apiRes } from '../../types';

export const GET = async (req: Request, res: NextResponse) => {
  try {
    await dbConnect();

    const userId = req.url.split('/profile/')[1];

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
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
    const userId = req.url.split('/profile/')[1];

    const { name, introduction, id } = await req.json();

    //新しく登録するuserIdが存在するかを確認する
    //存在したら、エラーメッセージを返す
    const isUserIdExists = await checkUserIdExists(id, userId);
    if (isUserIdExists)
      return NextResponse.json<apiRes>({ message: 'userId already exits' }, { status: 404 });
    //userIdが存在しなければ、新しいプロフィールを作成する
    else {
      const user = await prisma.user.update({
        data: { name, introduction, id },
        where: { clerkId: userId },
      });

      return NextResponse.json<apiRes>({ message: 'Success', data: user }, { status: 200 });
    }
  } catch (err) {
    return NextResponse.json<apiRes>({ message: 'Error', data: err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
