import { clerkClient } from '@clerk/nextjs/server';

export const getUserAvatar = async (clerkId: string) =>
  (await clerkClient().users.getUser(clerkId)).imageUrl;
