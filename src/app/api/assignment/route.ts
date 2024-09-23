import { NextResponse } from 'next/server';
import { dbConnect } from '../lib/dbConnect';
import { getUserId } from '../lib/getUserId';
import { handleAPIError } from '../lib/handleAPIError';
import prisma from '../lib/prisma';
import { uploadAssignmentImage } from '../lib/uploadImage/uploadAssignmentImage';
import { findSpecificUser } from '../lib/user/findSpecificUser';
import { apiRes } from '../types';

export const GET = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    await dbConnect();
    const assignments = await prisma.assignment.findMany({
      include: {
        replies: {
          include: {
            author: true,
            childReplies: true,
          },
        },
        likes: {
          include: {
            user: true,
          },
        },
        author: {
          include: {
            tags: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json<apiRes>({ message: 'success', data: assignments }, { status: 200 });
  });

export const POST = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    dbConnect();

    const formData = await req.formData();

    const title = formData.get('title') as string;
    const image = formData.get('image') as File | null;
    const description = formData.get('description') as string;
    const deadLine = formData.get('deadLine') as string;

    const { fileName: imageUrl } = await uploadAssignmentImage(image);

    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await findSpecificUser(userId);

    const newPost = await prisma.assignment.create({
      data: {
        title,
        description,
        deadLine,
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
