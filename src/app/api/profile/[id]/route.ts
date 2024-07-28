import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { dbConnect } from "../../../../../lib/dbConnect";
import { auth } from "@clerk/nextjs/server";

//ブログの詳細記事取得API
export const GET = async (req: Request, res: NextResponse) => {
  try {
    const userId = req.url.split("/profile/")[1];
    await dbConnect();
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    return NextResponse.json({ Message: "Success", user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ Message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const userId = req.url.split("/profile/")[1];

    const { name, introduction } = await req.json();

    await dbConnect();
    const user = await prisma.user.update({
      data: { name, introduction },
      where: { clerkId: userId },
    });
    return NextResponse.json({ Message: "Success", user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ Message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
