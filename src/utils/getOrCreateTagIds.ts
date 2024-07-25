import prisma from "../../lib/prisma";
import { Prisma } from "@prisma/client";

//tagがTagテーブルに存在するかを確認
//存在すれば,確認したtagのidを返す
//存在しなければ、Tagテーブルに新規作成してtagのidを返す
export const getOrCreateTagIds = async (tags: string[]): Promise<Prisma.TagWhereUniqueInput[]> => {
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
  return tagIds;
};





