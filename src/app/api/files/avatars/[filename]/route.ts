import { handleAPIError } from '@/app/api/lib/handleAPIError';
import { deleteObject } from '@/app/api/lib/S3Client';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (req: NextRequest, res: NextResponse) =>
  handleAPIError(async () => {
    const filename = req.url.split('/avatars/')[1];
    const clerkId = filename.split('-')[0];
    const { userId } = auth();
    if (userId !== clerkId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    await deleteObject(`avatars/${filename}`);

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  });
