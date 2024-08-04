import { clerkClient, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { handleAPIError } from '../../lib/handleAPIError';

export const GET = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    const targetId = req.url.split('avatars/')[1];

    if (!(await currentUser())) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const clerkUser = await clerkClient().users.getUser(targetId);
    if (!clerkUser) {
      return NextResponse.json({ message: 'Not Found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'success', data: clerkUser.imageUrl }, { status: 200 });
  });
