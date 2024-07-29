import { dbConnect } from "../dbConnect";
import prisma from "../prisma";

//タグがTagテーブルに存在するかを確認
export const checkTagExits = async (tagName: string): Promise<boolean> => {
  //prismaでdbを操作しているのに
  //データベース接続していないのは、この関数の呼び出し元で接続しているから
  dbConnect();
  const existingTag = await prisma.tag.findUnique({
    where: { name: tagName },
  });

  return existingTag ? true : false;
};
