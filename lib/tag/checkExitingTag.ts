import prisma from "../prisma";

//タグがTagテーブルに存在するかを確認
export const checkTagExits = async (tagName: string) => {
  const existingTag = await prisma.tag.findUnique({
    where: { name: tagName },
  });

  return existingTag ? true : false;
};
