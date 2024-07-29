//このファイルはTagをUserに登録する

import { NextResponse } from "next/server";
import { dbConnect } from "../../lib/dbConnect";
import prisma from "../../lib/prisma";
import { apiRes } from "../../types";

export const PUT = async (req: Request, res: NextResponse) => {
  try {
    dbConnect();
    const { clerkId, tagName } = await req.json();

    const newUserTag = await prisma.user.update({
      where: { clerkId: clerkId },
      data: {
        tags: { connect: { name: tagName } },
      },
      include: {
        tags: true,
      },
    });
    return NextResponse.json<apiRes>(
      { message: "success", data: newUserTag },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json<apiRes>(
      { message: "failed", data: error },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
