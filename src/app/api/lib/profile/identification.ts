//この関数は,他人のプロフィールを編集させないようにするためもの
//具体的にはログインしているユーザーとプロフィールページのurlに含まれるidが一致するかを確認。

import { auth } from '@clerk/nextjs/server';

export const identification = (clerkId: string): boolean => {
  //auth()からclerkIdを取得
  const { userId } = auth();

  return clerkId === userId ? true : false;
};
