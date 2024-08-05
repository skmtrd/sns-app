import { NextResponse } from 'next/server';
import { dbConnect } from '../lib/dbConnect';
import { handleAPIError } from '../lib/handleAPIError';
import prisma from '../lib/prisma';
import { apiRes } from '../types';

export const GET = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    // const { getUser } = clerkClient().users;
    await dbConnect();
    const posts = await prisma.question.findMany({
      include: {
        author: {
          include: {
            tags: true, // 作者のタグ情報を含める
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json<apiRes>({ message: 'success', data: posts }, { status: 200 });
  });

export const POST = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    dbConnect();

    const { title, description } = await req.json();

    const userId = 'user_2kBbB59pFe6EQcpYrVAcUkBr446';

    const user = await prisma.user.findUniqueOrThrow({
      where: { clerkId: userId },
    });

    //postgresqlに投稿
    const newPost = await prisma.question.create({
      data: {
        title,
        description,
        author: {
          connect: { id: user.id },
        },
      },
      include: {
        author: true,
      },
    });

    return NextResponse.json<apiRes>({ message: 'success', data: newPost }, { status: 200 });
  });
