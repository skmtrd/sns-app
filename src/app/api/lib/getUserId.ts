import { auth } from '@/auth';

export const getUserId = async () => {
  const session = await auth();
  if (!session) return '';
  return session?.user?.id;
};
