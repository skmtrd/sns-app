'use server';

import { auth } from '@/auth';
import { SessionSchema } from '@/lib/schemas';
import { redirect } from 'next/navigation';

export const getSession = async () => {
  const session = await auth();
  if (!session) redirect('/');
  const parsedSession = SessionSchema.parse(session?.user);
  return parsedSession;
};
