import { NextResponse } from "next/server";
import { dbConnect } from "../../../../lib/dbConnect";
import prisma from "../../../../lib/prisma";

export const GET = async (req: Request, res: NextResponse) => {
  try {
    dbConnect();
    const tags = await prisma.tag.findMany();
    return NextResponse.json({ message: "success", tags }, { status: 200 });
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
