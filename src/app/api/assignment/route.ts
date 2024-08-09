import { NextResponse } from 'next/server';
import { dbConnect } from '../lib/dbConnect';
import { handleAPIError } from '../lib/handleAPIError';
import prisma from '../lib/prisma';
import { apiRes } from '../types';

export const GET = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    // const { getUser } = clerkClient().users;
    await dbConnect();
    const posts = await prisma.assignment.findMany({
      include: {
        replies: {
          include: {
            author: true,
            childReplies: true,
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

    return NextResponse.json<apiRes>({ message: 'success', data: posts }, { status: 200 });
  });

export const POST = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    dbConnect();

    const { title, description, deadLine } = await req.json();

    const userId = 'user_2kAm1CqUROhV77wXS43Td3lI3NN';

    const user = await prisma.user.findUniqueOrThrow({
      where: { clerkId: userId },
    });

    const newPost = await prisma.assignment.create({
      data: {
        title,
        description,
        deadLine,
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
