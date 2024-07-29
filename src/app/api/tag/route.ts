//このファイルはTagのCRU操作をしている。

import { NextResponse } from "next/server";
import { dbConnect } from "../../../../lib/dbConnect";
import prisma from "../../../../lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { CreateTag } from "../../../../lib/tag/createTag";
import { apiRes } from "../types";

export const GET = async (req: Request, res: NextResponse) => {
  try {
    dbConnect();
    const tags = await prisma.tag.findMany();
    return NextResponse.json<apiRes>(
      { message: "success", data: tags },
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
    const { tagName } = await req.json();

    dbConnect();

    CreateTag(tagName);

    return NextResponse.json<apiRes>({ message: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json<apiRes>(
      { message: "failed", data: error },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: Request, res: NextResponse) => {
  try {
    dbConnect();
    // const userId = auth();
    const userId = process.env.clerkId;

    const { tagName } = await req.json();

    const updateTag = await prisma.user.update({
      where: { clerkId: userId },
      data: {
        tags: {
          connect: { name: tagName },
        },
      },
      include: { tags: true },
    });

    return NextResponse.json<apiRes>(
      { message: "success", data: updateTag },
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
