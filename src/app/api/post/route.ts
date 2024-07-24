import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { auth } from "@clerk/nextjs/server";

//postgrelに接続する
const dbConnect = async () => {
  try {
    const prisma = new PrismaClient();
    await prisma.$connect();
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};

export const GET = async (req: Request, res: NextResponse) => {
  try {
    dbConnect();
    

  } catch (error) {
    
  }
};



export const POST = async (req: Request, res: NextResponse) => {
  try {
    dbConnect();
    const { content, tags } = await req.json();
    const tagIds = await Promise.all(
      tags.map(async (tag: string) => {
        const existingTag = await prisma.tag.findUnique({
          where: { name: tag },
        });
        if (existingTag) {
          return { id: existingTag.id };
        } else {
          const newTag = await prisma.tag.create({
            data: { name: tag },
          });
          return { id: newTag.id };
        }
      })
    );

    const { userId } = auth();
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
        tags: {
          connect: tagIds,
        },
      },
      include: {
        author: true,
        tags: true,
      },
    });

    await prisma.$disconnect();
    return NextResponse.json({ message: "success", newPost }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
