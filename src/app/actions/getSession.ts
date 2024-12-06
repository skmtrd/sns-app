'use server';

import { SessionSchema } from '@/lib/schemas';
import { redirect } from 'next/navigation';
import { auth } from '../../../auth';

export const getSession = async () => {
  const session = await auth();
  if (!session) redirect('/');
  const parsedSession = SessionSchema.parse(session?.user);
  return parsedSession;
};
