import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import { handleAPIError } from '../lib/handleAPIError';
import prisma from '../lib/prisma';
import { CreateTag } from '../lib/tag/createTag';
import { apiRes } from '../types';

export const GET = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    const tags = await prisma.tag.findMany();
    return NextResponse.json<apiRes>({ message: 'success', data: tags }, { status: 200 });
  });

export const POST = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    const { tagName } = await req.json();

    CreateTag(tagName);

    return NextResponse.json<apiRes>({ message: 'success' }, { status: 200 });
  });

export const PUT = async (req: Request) =>
  handleAPIError(async () => {
    const { tagNames } = await req.json();
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId || !Array.isArray(tagNames)) {
      return NextResponse.json(
        { message: 'Invalid input. ClerkId and tagNames array are required.' },
        { status: 400 },
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      // ユーザーとその現在のタグを取得
      const user = await tx.user.findUnique({
        where: { id: userId },
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
        where: { id: userId },
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
  });
