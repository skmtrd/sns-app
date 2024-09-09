import { NextResponse } from 'next/server';
import { dbConnect } from '../lib/dbConnect';

import { getUserId } from '../lib/getUserId';
import { handleAPIError } from '../lib/handleAPIError';
import prisma from '../lib/prisma';
import { supabase } from '../lib/supabase/supabase';
import { uploadPostImage } from '../lib/uploadPostImage';
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

    const postsWithImages = posts.map((post) => {
      if (post.imageUrl) {
        post.imageUrl = supabase.storage
          .from('post-images')
          .getPublicUrl(post.imageUrl).data.publicUrl;
      } else {
        post.imageUrl = null;
      }
      return post;
    });

    return NextResponse.json<apiRes>(
      { message: 'success', data: postsWithImages },
      { status: 200 },
    );
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
