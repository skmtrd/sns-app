//このファイルは新しく登録するuserIdが既存のものと被っていないかを確認する

import prisma from '../prisma';

export const checkUserIdExists = async (newUserId: string, clerkId: string): Promise<boolean> => {
  try {
    //prismaでdbを操作しているのに
    //データベース接続していないのは、この関数の呼び出し元で接続しているから
    const isUserIdExists = await prisma.user.findUnique({
      where: { id: newUserId },
    });

    if (isUserIdExists?.clerkId === clerkId) return false;
    return isUserIdExists ? true : false;
  } catch (error) {
    throw error;
  }
};
