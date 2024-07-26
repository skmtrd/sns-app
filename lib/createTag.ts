import { NextResponse } from "next/server";
import prisma from "./prisma";
import { Prisma } from "@prisma/client";
import { checkExitingTag } from "./checkExitingTag";

//tagNameがTagテーブルに存在するかを確認
//存在する場合はエラーメッセージを返す
//存在しないは作成して、成功メッセージを返す
export const CreateTag = async (
  tagName: string
): Promise<{ message: string }> => {
  if (await checkExitingTag(tagName)) return { message: "already exit tag" };
  else {
    await prisma.tag.create({
      data: { name: tagName },
    });
    return { message: "create success" };
  }
};
