import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { dbConnect } from '../lib/dbConnect';
import { handleAPIError } from '../lib/handleAPIError';
import prisma from '../lib/prisma';
import { apiRes } from '../types';

export const GET = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    await dbConnect();
    const posts = await prisma.post.findMany({
      include: {
        author: {
          include: {
            tags: true, // 作者のタグ情報を含める
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // 必要に応じてデータを整形
    const formattedPosts = posts.map((post) => ({
      ...post,
      author: {
        ...post.author,
        tags: post.author.tags.map((tag) => tag.name), // タグ名のみの配列に変換
      },
    }));

    return NextResponse.json<apiRes>({ message: 'success', data: formattedPosts }, { status: 200 });
  });

export const POST = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    try {
      dbConnect();

      const { content } = await req.json();
      //clerkのuserIdからUserテーブルのuserIdを取得
      const { userId } = auth();
      // const userId = process.env.clerkId;

      const user = await prisma.user.findUniqueOrThrow({
        where: { clerkId: userId },
      });

      //postgresqlに投稿
      const newPost = await prisma.post.create({
        data: {
          content,
          author: {
            connect: { id: user.id },
          },
        },
        include: {
          author: true,
        },
      });

      return NextResponse.json<apiRes>({ message: 'success', data: newPost }, { status: 200 });
    } catch (error) {
      return NextResponse.json<apiRes>({ message: 'failed', data: error }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  });
