import prisma from '../prisma';

//特定のユーザーのデータを取ってくる関数
export const findSpecificUser = async (userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
  });

  return user;
};
