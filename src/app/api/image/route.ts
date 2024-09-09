// import { NextResponse } from 'next/server';
// import { dbConnect } from '../lib/dbConnect';
// import prisma from '../lib/prisma';

import { NextResponse } from 'next/server';
import { convertToWebp } from '../lib/convertToWebp';
import { dbConnect } from '../lib/dbConnect';
import prisma from '../lib/prisma';
import { supabase } from '../lib/supabase/supabase';

export const GET = async (req: Request, res: NextResponse) => {
  const images = await prisma.image.findMany();
  return NextResponse.json({ message: 'success', data: images }, { status: 200 });
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json({ error: '画像が不足しています' }, { status: 400 });
    }

    const { webpBuffer, fileName } = await convertToWebp(image);

    const { data, error: uploadError } = await supabase.storage
      .from('post-images')
      .upload(fileName, webpBuffer, {
        contentType: 'image/webp',
      });

    if (uploadError) {
      throw uploadError;
    }

    dbConnect();

    const dbImage = await prisma.image.create({
      data: {
        imageUrl: fileName,
      },
    });

    return NextResponse.json({ success: true, post: dbImage }, { status: 200 });
  } catch (error) {
    console.error('Error processing post:', error);
    return NextResponse.json({ error: '投稿の処理中にエラーが発生しました' }, { status: 500 });
  }
}
