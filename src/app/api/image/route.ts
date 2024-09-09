import { NextResponse } from 'next/server';
import { dbConnect } from '../lib/dbConnect';
import prisma from '../lib/prisma';

export const GET = async (req: Request, res: NextResponse) => {
  const images = await prisma.image.findMany();
  return NextResponse.json({ message: 'success', data: images }, { status: 200 });
};

export const POST = async (req: Request, res: NextResponse) => {
  const { imageUrl } = await req.json();
  dbConnect();
  const image = await prisma.image.create({
    data: {
      imageUrl,
    },
  });
  return NextResponse.json({ message: 'success', data: image }, { status: 200 });
};
