import { NextResponse } from "next/server";
import prisma from "./prisma";
import { Prisma } from "@prisma/client";

//tagNameがTagテーブルに存在するかを確認
//存在する場合はエラーメッセージを返す
//存在しないは作成して、成功メッセージを返す
export const CreateTag = async (
  tagName: string
): Promise<Prisma.TagWhereUniqueInput[]> => {
  //タグがTagテーブルに存在するかを確認
  const existingTag = await prisma.tag.findUnique({
    where: { name: tagName },
  });

  if (existingTag) {
    return { message: "already exit" };
  } else {
    const newTag = await prisma.tag.create({
      data: { name: tagName },
    });
    return { message: "create success" };
  }
};
