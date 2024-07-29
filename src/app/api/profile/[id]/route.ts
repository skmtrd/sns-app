import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import { dbConnect } from "../../lib/dbConnect";
import { checkUserIdExists } from "../../lib/user/checkUserIdExists";
import { auth } from "@clerk/nextjs/server";
import { apiRes } from "../../types";

//ブログの詳細記事取得API
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await dbConnect();

    const userId = req.url.split("/profile/")[1];

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { tags: true },
    });

    return NextResponse.json<apiRes>(
      { message: "Success", data: user },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json<apiRes>(
      { message: "Error", data: err },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: Request, res: NextResponse) => {
  try {
    await dbConnect();
    const userId = req.url.split("/profile/")[1];

    const { name, introduction, id } = await req.json();

    //新しく登録するuserIdが存在するかを確認する
    //存在したら、エラーメッセージを返す
    const isUserIdExists = await checkUserIdExists(id);
    if (isUserIdExists)
      return NextResponse.json<apiRes>(
        { message: "userId already  exits" },
        { status: 400 }
      );
    //userIdが存在しなければ、新しいプロフィールを作成する
    else {
      const user = await prisma.user.update({
        data: { name, introduction, id },
        where: { clerkId: userId },
      });

      return NextResponse.json<apiRes>(
        { message: "Success", data: user },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json<apiRes>(
      { message: "Error", data: err },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
