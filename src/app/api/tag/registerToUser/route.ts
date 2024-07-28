//このファイルはTagをUserに登録する

import { NextResponse } from "next/server";
import { dbConnect } from "../../../../../lib/dbConnect";
import prisma from "../../../../../lib/prisma";

export const PUT = async (req: Request, res: NextResponse) => {
  try {
    dbConnect();
    const { clerkId, tagName } = await req.json();

    await prisma.user.update({
      where: { clerkId: clerkId },
      data: {
        tags: { connect: { name: tagName } },      },
      include: {
        tags: true,
      },
    });
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "failed" });
  } finally {
    await prisma.$disconnect();
  }
};
