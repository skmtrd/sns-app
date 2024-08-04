import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { converToJpeg } from '../../lib/convertImage';
import { handleAPIError } from '../../lib/handleAPIError';
import { getObjectURL, putObject } from '../../lib/S3Client';

export const POST = async (req: NextRequest, res: NextResponse) =>
  handleAPIError(async () => {
    const { userId } = auth();
    if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const formData = await req.formData();
    const date = new Date().getTime();
    const filename = `${userId}-${date}.jpg`;
    const file = formData.get('file') as File;
    if (!file) return NextResponse.json({ message: 'No file found' }, { status: 400 });
    const jpegFile = await converToJpeg(file);
    if (!jpegFile)
      return NextResponse.json({ message: 'Failed to convert image' }, { status: 500 });
    const jpegBuff = Buffer.from(await jpegFile.arrayBuffer());
    await putObject(`avatars/${filename}`, jpegBuff, 'image/jpeg');
    const signedUrl = await getObjectURL(`avatars/${filename}`);
    if (!signedUrl)
      return NextResponse.json({ message: 'Failed to get signed URL' }, { status: 500 });
    console.log('signedUrl:', signedUrl);
    return NextResponse.json({ message: 'Success', data: `avatars/${filename}` }, { status: 200 });
  });
