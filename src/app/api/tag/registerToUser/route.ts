//このファイルはTagをUserに登録する

import { NextResponse } from 'next/server';
import { handleAPIError } from '../../lib/handleAPIError';
import prisma from '../../lib/prisma';
import { apiRes } from '../../types';

export const PUT = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    const { id, tagName } = await req.json();

    const newUserTag = await prisma.user.update({
      where: { id: id },
      data: {
        tags: { connect: { name: tagName } },
      },
      include: {
        tags: true,
      },
    });
    return NextResponse.json<apiRes>({ message: 'success', data: newUserTag }, { status: 200 });
  });
