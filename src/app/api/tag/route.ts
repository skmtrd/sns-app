//このファイルはTagのCRU操作をしている。

import { NextResponse } from 'next/server';
import { dbConnect } from '../lib/dbConnect';
import prisma from '../lib/prisma';
import { CreateTag } from '../lib/tag/createTag';
import { apiRes } from '../types';

export const GET = async (req: Request, res: NextResponse) => {
  try {
    dbConnect();
    const tags = await prisma.tag.findMany();
    return NextResponse.json<apiRes>({ message: 'success', data: tags }, { status: 200 });
  } catch (error) {
    return NextResponse.json<apiRes>({ message: 'failed', data: error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { tagName } = await req.json();

    dbConnect();

    CreateTag(tagName);

    return NextResponse.json<apiRes>({ message: 'success' }, { status: 200 });
  } catch (error) {
    return NextResponse.json<apiRes>({ message: 'failed', data: error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: Request) => {
  try {
    const { clerkId, tagNames } = await req.json();
    dbConnect();

    if (!clerkId || !Array.isArray(tagNames)) {
      return NextResponse.json(
        { message: 'Invalid input. ClerkId and tagNames array are required.' },
        { status: 400 },
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      // ユーザーとその現在のタグを取得
      const user = await tx.user.findUnique({
        where: { clerkId },
        include: { tags: true },
      });

      if (!user) {
        throw new Error('User not found');
      }

      // 新しいタグを取得または作成
      const newTags = await Promise.all(
        tagNames.map((name) =>
          tx.tag.upsert({
            where: { name },
            update: {},
            create: { name },
          }),
        ),
      );

      // 現在のタグと新しいタグの差分を計算
      const currentTagIds = new Set(user.tags.map((tag) => tag.id));
      const newTagIds = new Set(newTags.map((tag) => tag.id));

      const tagsToConnect = newTags.filter((tag) => !currentTagIds.has(tag.id));
      const tagsToDisconnect = user.tags.filter((tag) => !newTagIds.has(tag.id));

      // ユーザーのタグを更新
      const updatedUser = await tx.user.update({
        where: { clerkId },
        data: {
          tags: {
            connect: tagsToConnect.map((tag) => ({ id: tag.id })),
            disconnect: tagsToDisconnect.map((tag) => ({ id: tag.id })),
          },
        },
        include: { tags: true },
      });

      return updatedUser;
    });

    return NextResponse.json({ message: 'success', data: result }, { status: 200 });
  } catch (error) {
    console.error('Error in updating user tags:', error);
    return NextResponse.json(
      {
        message: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  } finally {
    prisma.$disconnect();
  }
};
