import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/dbConnect';
import { getUserId } from '../../lib/getUserId';
import { handleAPIError } from '../../lib/handleAPIError';
import prisma from '../../lib/prisma';
import { supabase } from '../../lib/supabase/supabase';
import { uploadIconImage } from '../../lib/uploadImage/uploadIconImage';
import { checkUserIdExists } from '../../lib/user/checkUserIdExists';
import { apiRes } from '../../types';

export const GET = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    const userId = req.url.split('/profile/')[1];

    await dbConnect();
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        tags: {
          select: { id: true, name: true },
        },
        posts: {
          orderBy: { createdAt: 'desc' },
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
        },
      },
    });
    if (!user) return NextResponse.json<apiRes>({ message: 'User not found' }, { status: 404 });

    const postsWithImages = user.posts.map((post) => {
      if (post.imageUrl) {
        post.imageUrl = supabase.storage
          .from('post-images')
          .getPublicUrl(post.imageUrl).data.publicUrl;
      } else {
        post.imageUrl = null;
      }
      return post;
    });

    user.posts = postsWithImages;

    return NextResponse.json<apiRes>(
      {
        message: 'Success',
        data: {
          ...user,
        },
      },
      { status: 200 },
    );
  });

export const PUT = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    await dbConnect();
    const currentUserId = await getUserId();

    if (!currentUserId) {
      return NextResponse.json<apiRes>({ message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const name = formData.get('name') as string;
    const userId = formData.get('userId') as string;
    const introduction = formData.get('introduction') as string;
    const icon = formData.get('icon') as File;

    const { fileName: iconUrl } = await uploadIconImage(icon);

    const isUserIdExists = await checkUserIdExists(userId, currentUserId);
    if (isUserIdExists) {
      return NextResponse.json<apiRes>({ message: 'userId already exits' }, { status: 404 });
    } else {
      const newProfile = await prisma.user.update({
        data: { name, id: userId, introduction, iconUrl },
        where: { id: currentUserId },
      });

      return NextResponse.json<apiRes>({ message: 'Success', data: newProfile }, { status: 200 });
    }
  });
