import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/dbConnect';
import { handleAPIError } from '../../lib/handleAPIError';
import prisma from '../../lib/prisma';
import { apiRes } from '../../types';

export const DELETE = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    dbConnect();
    const postId = req.url.split('/post/')[1];

    const deletedReplies = await prisma.postReply.deleteMany({ where: { postId } });
    const deletedLikes = await prisma.like.deleteMany({ where: { postId } });
    const deletedPost = await prisma.post.delete({ where: { id: postId } });
    return NextResponse.json<apiRes>({ message: 'success', data: deletedPost }, { status: 200 });
  });
