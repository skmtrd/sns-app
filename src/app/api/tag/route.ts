import { NextResponse } from "next/server";
import { dbConnect } from "../../../../lib/dbConnect";
import prisma from "../../../../lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const GET = async (req: Request, res: NextResponse) => {
  try {
    dbConnect();
    const tags = await prisma.tag.findMany();
    return NextResponse.json({ message: "success", tags }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "failed" });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: Request, res: NextResponse) => {
  try {
    dbConnect();
    // const userId = auth();
    const userId = "user_2jjkSfZ9UtV3upYwwNBdCbHw45D";

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

    return NextResponse.json(
      { message: "success", updateTag },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "failed" });
  } finally {
    await prisma.$disconnect();
  }
};
