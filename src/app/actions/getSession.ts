'use server';

import { SessionSchema } from '@/lib/schemas';
import { auth } from '../../../auth';

export const getSession = async () => {
  const session = await auth();
  const parsedSession = SessionSchema.parse(session?.user);
  return parsedSession;
};
