import { NextResponse } from 'next/server';
import { dbConnect } from '../lib/dbConnect';
import { getClerkId } from '../lib/getClerkId';
import { handleAPIError } from '../lib/handleAPIError';
import prisma from '../lib/prisma';
import { findSpecificUser } from '../lib/user/findSpecificUser';
import { apiRes } from '../types';

export const GET = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    await dbConnect();
    const questions = await prisma.question.findMany({
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
        likes: {
          include: {
            user: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const questionsWithAvatar = await Promise.all(
      questions.map(async (question) => {
        return {
          ...question,
          //もしavatarがあれば取得する
          // avatar: await getUserAvatar(question.author.clerkId),
          avatar: null,
          replies: await Promise.all(
            question.replies.map(async (reply) => {
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
      { message: 'success', data: questionsWithAvatar },
      { status: 200 },
    );
  });

export const POST = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    dbConnect();

    const { title, description } = await req.json();

    const clerkId = getClerkId();

    if (!clerkId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await findSpecificUser(clerkId);

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
