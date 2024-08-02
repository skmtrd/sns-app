import { auth } from '@clerk/nextjs/server';

export const identification = (clerkId: string): boolean => {
  //auth()からclerkIdを取得
  const { userId } = auth();

  return clerkId === userId ? true : false;
};
