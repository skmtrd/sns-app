import { NextResponse } from 'next/server';
import { dbConnect } from '../lib/dbConnect';
import { handleAPIError } from '../lib/handleAPIError';
import prisma from '../lib/prisma';
import { apiRes } from '../types';

export const DELETE = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    dbConnect();
    const postId = req.url.split('/assiignment/')[1];

    const deletedPost = await prisma.post.findMany({ where: { id: postId } });
    return NextResponse.json<apiRes>({ message: 'success', data: deletedPost }, { status: 200 });
  });
