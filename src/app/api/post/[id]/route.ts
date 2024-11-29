// import { NextResponse } from 'next/server';
// import { dbConnect } from '../../lib/dbConnect';
// import { handleAPIError } from '../../lib/handleAPIError';
// import prisma from '../../lib/prisma';
// import { getUserAvatar } from '../../lib/user/getUserAvatar';
// import { apiRes } from '../../types';

// export const DELETE = async (req: Request, res: NextResponse) =>
//   handleAPIError(async () => {
//     dbConnect();
//     const postId = req.url.split('/post/')[1];

//     const deletedReplies = await prisma.postReply.deleteMany({ where: { postId } });
//     const deletedLikes = await prisma.like.deleteMany({ where: { postId } });
//     const deletedPost = await prisma.post.delete({ where: { id: postId } });
//     return NextResponse.json<apiRes>({ message: 'success', data: deletedPost }, { status: 200 });
//   });

// export const GET = async (req: Request, res: NextResponse) =>
//   handleAPIError(async () => {
//     dbConnect();
//     const postId = req.url.split('/post/')[1];

//     const post = await prisma.post.findUnique({
//       where: { id: postId },
//       include: {
//         author: {
//           include: {
//             tags: true,
//           },
//         },
//         likes: {
//           include: {
//             user: true,
//           },
//         },
//         replies: {
//           include: {
//             author: {
//               include: {
//                 tags: true,
//               },
//             },
//           },
//         },
//       },
//     });

//     if (!post) return NextResponse.json<apiRes>({ message: 'Post not found' }, { status: 404 });

//     const postsWithAvatar = {
//       ...post,
//       avatar: await getUserAvatar(post.author.clerkId),
//       replies: await Promise.all(
//         post.replies.map(async (reply) => {
//           return {
//             ...reply,
//             avatar: await getUserAvatar(reply.author.clerkId),
//           };
//         }),
//       ),
//     };

//     return NextResponse.json<apiRes>(
//       { message: 'success', data: postsWithAvatar },
//       { status: 200 },
//     );
//   });
