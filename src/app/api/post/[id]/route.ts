import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/dbConnect';
import { handleAPIError } from '../../lib/handleAPIError';
import prisma from '../../lib/prisma';

export const DELETE = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    dbConnect();
    const postId = req.url.split('/post/')[1];

    const deletedPost = await prisma.post.delete({ where: { id: postId } });
    return NextResponse.json({ message: 'success', data: deletedPost }, { status: 200 });
  });
