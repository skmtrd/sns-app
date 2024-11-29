// import { NextResponse } from 'next/server';
// import { dbConnect } from '../../lib/dbConnect';
// import { handleAPIError } from '../../lib/handleAPIError';
// import prisma from '../../lib/prisma';
// import { findSpecificUser } from '../../lib/user/findSpecificUser';
// import { apiRes } from '../../types';

// export const POST = async (req: Request, res: NextResponse) =>
//   handleAPIError(async () => {
//     dbConnect();
//     const { questionReplyId } = await req.json();

//     const clerkId = getClerkId();

//     if (!clerkId) {
//       return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//     }

//     const user = await findSpecificUser(clerkId);

//     const newLike = await prisma.likeReply.create({
//       data: {
//         user: { connect: { id: user.id } },
//         questionReply: { connect: { id: questionReplyId } },
//       },
//       include: {
//         user: true,
//         questionReply: true,
//       },
//     });

//     return NextResponse.json<apiRes>({ message: 'success', data: newLike }, { status: 200 });
//   });

// export const DELETE = async (req: Request, res: NextResponse) =>
//   handleAPIError(async () => {
//     dbConnect();

//     const { questionReplyId } = await req.json();

//     const clerkId = getClerkId();

//     if (!clerkId) {
//       return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//     }

//     const user = await findSpecificUser(clerkId);

//     const deleteLike = await prisma.likeReply.delete({
//       where: {
//         userId_questionReplyId: {
//           userId: user.id,
//           questionReplyId: questionReplyId,
//         },
//       },
//     });

//     return NextResponse.json({ message: 'success', data: deleteLike }, { status: 200 });
//   });
