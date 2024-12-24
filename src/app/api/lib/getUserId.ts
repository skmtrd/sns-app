import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const getUserId = async () => {
  const session = await auth();
  if (!session?.user.id) redirect('');
  return session?.user?.id;
};
