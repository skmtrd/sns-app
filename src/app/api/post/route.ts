import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { getOrCreateTagIds } from "../../../../lib/getOrCreateTagIds";
import { dbConnect } from "../../../../lib/dbConnect";
import { auth } from "@clerk/nextjs/server";

export const GET = async (req: Request, res: NextResponse) => {
  try {
    dbConnect();

    const posts = await prisma.post.findMany();
    return NextResponse.json({ message: "success", posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "failed" });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request, res: NextResponse) => {
  try {
    dbConnect();

    const { content } = await req.json();
    //clerkのuserIdからUserテーブルのuserIdを取得
    // const { userId } = auth();
    const userId = "user_2jjkSfZ9UtV3upYwwNBdCbHw45D";

    const user = await prisma.user.findUnique({
      where: { clerkId: userId ?? undefined },
    });

    //postgresqlに投稿
    const newPost = await prisma.post.create({
      data: {
        content,
        author: {
          connect: { id: user.id },
        },
      },
      include: {
        author: true,
      },
    });

    return NextResponse.json({ message: "success", newPost }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "failed" });
  } finally {
    await prisma.$disconnect();
  }
};
