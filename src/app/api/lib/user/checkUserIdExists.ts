//このファイルは新しく登録するuserIdが既存のものと被っていないかを確認する

import { NextResponse } from "next/server";
import prisma from "../prisma";
import { dbConnect } from "../dbConnect";

export const checkUserIdExists = async (
  newUserId: string
): Promise<boolean> => {
  try {
    //prismaでdbを操作しているのに
    //データベース接続していないのは、この関数の呼び出し元で接続しているから
    const isUserIdExists = await prisma.user.findUnique({
      where: { id: newUserId },
    });

    return isUserIdExists ? true : false;
  } catch (error) {
    throw error;
  }
};
