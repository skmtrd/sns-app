import { auth } from '@clerk/nextjs/server';
//auth()から取得するときのclerkIdがuserIdという名前になる
//userIdという名前だと clerkIdだと認識するのが困難になるので、この関数でclerkIdとして扱えるようにした。
export const getClerkId = () => {
  const { userId } = auth();
  return userId;
};
