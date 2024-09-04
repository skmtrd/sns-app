import { NextResponse } from 'next/server';
import { dbConnect } from '../lib/dbConnect';
import { getClerkId } from '../lib/getClerkId';
import { handleAPIError } from '../lib/handleAPIError';
import prisma from '../lib/prisma';
import { apiRes } from '../types';

export const GET = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    // const { getUser } = clerkClient().users;
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

    const assignmentsWithAvatar = await Promise.all(
      assignments.map(async (assignment) => {
        return {
          ...assignment,
          //もしavatarが必要であれば取得する
          // avatar: await getUserAvatar(question.author.clerkId),
          avatar: null,
          replies: await Promise.all(
            assignment.replies.map(async (reply) => {
              return {
                ...reply,
                avatar: null,
              };
            }),
          ),
        };
      }),
    );

    return NextResponse.json<apiRes>(
      { message: 'success', data: assignmentsWithAvatar },
      { status: 200 },
    );
  });

export const POST = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    dbConnect();

    const { title, description, deadLine } = await req.json();

    const clerkId = getClerkId();

    if (!clerkId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUniqueOrThrow({
      where: { clerkId: clerkId },
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
