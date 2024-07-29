import { NextResponse } from "next/server";
import prisma from "../lib/prisma";
import { dbConnect } from "../lib/dbConnect";
import { auth } from "@clerk/nextjs/server";
import { error } from "console";
import { apiRes } from "../types";

export const GET = async (req: Request, res: NextResponse) => {
  try {
    dbConnect();

    const posts = await prisma.post.findMany({ include: { author: true } });
    return NextResponse.json<apiRes>(
      { message: "success", data: posts },
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

export const POST = async (req: Request, res: NextResponse) => {
  try {
    dbConnect();

    const { content } = await req.json();
    //clerkのuserIdからUserテーブルのuserIdを取得
    // const { userId } = auth();
    const userId = process.env.clerkId;

    const user = await prisma.user.findUniqueOrThrow({
      where: { clerkId: userId },
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

    return NextResponse.json<apiRes>(
      { message: "success", data: newPost },
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
