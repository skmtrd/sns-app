// 'use client';
// import { useRelativeTime } from '@/hooks/useRelativeTime';
// import { Reply, Tag } from '@/lib/types';
// import { MessageCircleReply, MoreVertical } from 'lucide-react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useEffect, useRef, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useSWRConfig } from 'swr';
// import KebabMenu from '../element/KebabMenu';
// import ProfilePreview from '../element/ProfilePreview';
// import UserTag from '../element/UserTag';
// import { AddReplyToReplyModal } from './AddReplyToReplyModal';

// type PostProps = {
//   replyAuthorName: string;
//   replyAuthorClerkId: string;
//   replyAuthorId: string;
//   timestamp: string;
//   replyContent: string;
//   replyAuthorTags: Tag[];
//   replyId: string;
//   parentPostId: string;
//   replyAuthorAvatar: string;
//   replyAuthorIntroduction?: string;
//   replies: Reply[];
//   toReplyPostAuthorId: string;
//   currentClerkId: string;
// };

// type ReplyFormData = {
//   content: string;
// };

// const REPLY_MAX_LENGTH = 500;

// export const PostReply: React.FC<PostProps> = ({
//   replyAuthorName,
//   timestamp,
//   replyAuthorClerkId,
//   replyAuthorId,
//   replyContent,
//   replyAuthorTags,
//   replyId,
//   parentPostId,
//   replyAuthorAvatar,
//   replyAuthorIntroduction,
//   replies,
//   toReplyPostAuthorId,
//   currentClerkId,
// }) => {
//   const { mutate } = useSWRConfig();
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [showProfilePreview, setShowProfilePreview] = useState(false);
//   const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const profilePreviewRef = useRef<HTMLDivElement>(null);
//   const timeAgo = useRelativeTime(timestamp);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//     reset,
//   } = useForm<ReplyFormData>();

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false);
//       }
//       if (profilePreviewRef.current && !profilePreviewRef.current.contains(event.target as Node)) {
//         setShowProfilePreview(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);
//   //   const handleLike = async () => {
//   //     setIsLiked(!isLiked);
//   //     isLiked ? await deleteLike(postId) : await postLike(postId);
//   //     isLiked ? setLikesCount(likesCount - 1) : setLikesCount(likesCount + 1);
//   //   };
//   const deleteReply = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.stopPropagation();
//     const toDelete = `/api/post/${parentPostId}/reply/${replyId}`;
//     fetch(toDelete, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then(() => mutate(`/api/post/${parentPostId}`))
//       .catch((error) => console.error(error));
//     setIsDropdownOpen(false);
//   };

//   const handleReplyDrawerToggle = () => {
//     setIsReplyModalOpen(!isReplyModalOpen);
//   };

//   const onSubmit = (data: ReplyFormData) => {
//     const newReply = {
//       content: data.content,
//       parentReplyId: replyId,
//     };

//     fetch(`/api/post/${parentPostId}/reply/${replyId}/reply`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newReply),
//     });
//     mutate('/api/post');

//     reset();
//   };

//   return (
//     <>
//       <div
//         // onClick={() => router.push(`/posts/${postId}`)}
//         className='w-11/12 rounded-lg bg-white p-4 shadow hover:bg-blue-50'
//       >
//         {isReplyModalOpen && (
//           <AddReplyToReplyModal
//             closeModal={handleReplyDrawerToggle}
//             postId={parentPostId}
//             parentReplyId={replyId}
//           />
//         )}
//         <div className='flex justify-between'>
//           <p className='py-2 text-blue-500'>返信先 : @{toReplyPostAuthorId}</p>
//           <p className='mr-1 whitespace-nowrap text-sm text-gray-500'>{timeAgo}</p>
//         </div>
//         <div className='mb-2 flex items-center justify-start'>
//           <div
//             className='relative'
//             onMouseEnter={() => setShowProfilePreview(true)}
//             onMouseLeave={() => setShowProfilePreview(false)}
//           >
//             <Link href={`/profile/${replyAuthorClerkId}`}>
//               <Image
//                 src={replyAuthorAvatar}
//                 alt={replyAuthorName}
//                 width={40}
//                 height={40}
//                 className='min-h-10 min-w-10 rounded-full hover:opacity-80'
//               />
//             </Link>
//           </div>
//           <div className='ml-2 w-full'>
//             <div className='flex w-full items-center justify-between'>
//               <div className='relative'>
//                 <Link href={`/profile/${replyAuthorClerkId}`}>
//                   <div className='inline-block rounded-md hover:bg-gray-100'>
//                     <h3 className='break-words px-1 py-0.5 font-bold transition-colors duration-100 hover:text-blue-600'>
//                       {replyAuthorName}
//                     </h3>
//                   </div>
//                 </Link>
//                 {showProfilePreview && (
//                   <div ref={profilePreviewRef} className='absolute left-0 top-full mt-1'>
//                     <ProfilePreview
//                       authorName={replyAuthorName}
//                       authorAvatar={replyAuthorAvatar}
//                       authorId={replyAuthorId}
//                       authorIntroduction={replyAuthorIntroduction}
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//             <p className='px-1 py-0.5 text-xs text-gray-500'>@{replyAuthorId}</p>
//           </div>
//         </div>
//         <div className='mb-4'>
//           <div className='mb-2 ml-1 w-full break-words'>{replyContent}</div>
//         </div>
//         <div className='flex flex-wrap gap-2'>
//           {replyAuthorTags &&
//             replyAuthorTags.map((tag) => (
//               <Link key={tag.id} href={`/timeline/${tag.id}`}>
//                 <UserTag tagName={tag.name} />
//               </Link>
//             ))}
//         </div>
//         <div className='relative mt-6 flex w-full items-center justify-between'>
//           <div className='flex items-center justify-center gap-2'>
//             <button
//               onClick={handleReplyDrawerToggle}
//               className='flex items-center justify-center rounded-full bg-blue-400 px-4 py-2 text-white transition-all hover:bg-blue-600 hover:shadow-lg'
//             >
//               <MessageCircleReply size={20} />
//               <span className='ml-1'>
//                 {replies.filter((reply) => reply.parentReplyId === replyId).length}
//               </span>
//             </button>
//             {/* <button onClick={handleLike}>
//                  <Heart size={20} color={'#dc143c'} fill={isLiked ? '#dc143c' : 'white'} />
//                </button>
//                <span>{likesCount}</span> */}
//           </div>
//           <button
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             className='text-gray-500 hover:text-gray-700'
//           >
//             <MoreVertical size={20} fill='red' />
//           </button>
//           {isDropdownOpen && (
//             <KebabMenu
//               currentClerkId={currentClerkId}
//               authorClerkId={replyAuthorClerkId}
//               handleDelete={deleteReply}
//               contentId={replyId}
//             />
//           )}
//         </div>
//       </div>
//       <div className='flex w-full flex-col items-center'>
//         {replies
//           .filter((reply) => reply.parentReplyId === replyId)
//           .map((reply) => (
//             <PostReply
//               key={reply.id}
//               replyId={reply.id}
//               replyContent={reply.content}
//               timestamp={reply.createdAt}
//               // likes={reply.likes}
//               currentClerkId={currentClerkId}
//               replies={replies}
//               parentPostId={parentPostId}
//               toReplyPostAuthorId={reply.author.id}
//               replyAuthorName={reply.author.name}
//               replyAuthorId={reply.author.id}
//               replyAuthorClerkId={reply.author.clerkId}
//               replyAuthorAvatar={reply.avatar ?? ''}
//               replyAuthorTags={reply.author.tags ?? []}
//               replyAuthorIntroduction={reply.author.introduction}
//             />
//           ))}
//       </div>
//     </>
//   );
// };

// export default PostReply;
