import prisma from '../prisma';

type UserInfo = {
  id: string;
  clerkId: string;
  name: string;
  email: string;
  introduction: string;
  createdAt: Date;
  updatedAt: Date;
};

//特定のユーザーのデータを取ってくる関数
export const findSpecificUser = async (userId: string): Promise<UserInfo> => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { clerkId: userId },
  });

  return user;
};
