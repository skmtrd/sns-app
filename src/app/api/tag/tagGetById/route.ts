import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/dbConnect';
import { handleAPIError } from '../../lib/handleAPIError';
import prisma from '../../lib/prisma';
import { apiRes } from '../../types';

// export const GET = async (req: Request, res: NextResponse) =>
//   handleAPIError(async () => {
//     dbConnect();
//     const { userId } = await req.json();
//     const tags = await prisma.user.findUnique({
//       where: { id: userId },
//       select: { tags: true },
//     });
//     return NextResponse.json<apiRes>({ message: 'success', data: tags }, { status: 200 });
//   });

//   export const GET = async (req: Request, res: NextResponse) =>
//     handleAPIError(async () => {
//         dbConnect();
//         const { userId } = await req.json();
//         const tags = await prisma.user.findUnique({
//           where: { id: userId },
//           select: { tags: true },
//           return NextResponse.json<apiRes>({ message: 'success', data: tags }, { status: 200 });
//     });

// export const POST = async (req: Request, res: NextResponse) => {
//   try {
//     dbConnect();
//     console.log('req:', req);
//     const { userId } = await req.json();
//     console.log('userId:', userId);
//     const tags = await prisma.user.findUnique({
//       where: { id: userId },
//     });
//     return NextResponse.json<apiRes>({ message: 'success', data: tags }, { status: 200 });
//   } catch (error) {
//     console.log('************************************');
//     console.error('Failed to fetch tags:', error);
//     return NextResponse.json<apiRes>({ message: 'Error', data: error }, { status: 500 });
//   }
// };

export const POST = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    dbConnect();
    console.log('req:', req);
    const { userId } = await req.json();
    console.log('userId:', userId);
    const tags = await prisma.user.findUnique({
      where: { id: userId },
      select: { tags: true },
    });
    return NextResponse.json<apiRes>({ message: 'success', data: tags }, { status: 200 });
  });
