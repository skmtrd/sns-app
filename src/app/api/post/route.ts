import { NextResponse } from 'next/server';
import { dbConnect } from '../lib/dbConnect';

import { getUserId } from '../lib/getUserId';
import { handleAPIError } from '../lib/handleAPIError';
import prisma from '../lib/prisma';
import { uploadPostImage } from '../lib/uploadImage/uploadPostImage';
import { findSpecificUser } from '../lib/user/findSpecificUser';
import { apiRes } from '../types';

export const GET = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    await dbConnect();
    const posts = await prisma.post.findMany({
      include: {
        author: {
          include: {
            tags: true,
          },
        },
        likes: {
          include: {
            user: true,
          },
        },
        replies: {
          include: {
            author: true,
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

    const formData = await req.formData();

    const content = formData.get('content') as string;
    const image = formData.get('image') as File | null;

    const { fileName: imageUrl } = await uploadPostImage(image);

    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await findSpecificUser(userId);

    const newPost = await prisma.post.create({
      data: {
        content,
        imageUrl,
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
