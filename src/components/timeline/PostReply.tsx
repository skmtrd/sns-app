'use client';
import { useRelativeTime } from '@/hooks/useRelativeTime';
import { Reply, Tag } from '@/lib/types';
import { useAuth } from '@clerk/nextjs';
import { MessageCircleReply, MoreVertical } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import KebabMenu from '../element/KebabMenu';
import ProfilePreview from '../element/ProfilePreview';
import UserTag from '../element/UserTag';
import { AddReplyToReplyModal } from './AddReplyToReplyModal';

type PostProps = {
  username: string;
  clerkId: string;
  id: string;
  timestamp: string;
  content: string;
  tags: Tag[];
  replyId: string;
  postId: string;
  avatar: string;
  introduction?: string;
  replies: Reply[];
  likes: { author: { name: string; clerkId: string; id: string } }[];
  toReplyUserId: string;
};

type ReplyFormData = {
  content: string;
};

const REPLY_MAX_LENGTH = 500;

export const PostReply: React.FC<PostProps> = ({
  username,
  timestamp,
  clerkId,
  id,
  content,
  tags,
  replyId,
  postId,
  avatar,
  replies,
  introduction,
  likes,
  toReplyUserId,
}) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showProfilePreview, setShowProfilePreview] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profilePreviewRef = useRef<HTMLDivElement>(null);
  const { userId } = useAuth();
  const timeAgo = useRelativeTime(timestamp);
  //   const [isLiked, setIsLiked] = useState(false);
  //   const [likesCount, setLikesCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ReplyFormData>();

  const replyContent = watch('content');

  useEffect(() => {
    // setLikesCount(likes.length);
    // setIsLiked(likes.some((like) => like.author.clerkId === userId));
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (profilePreviewRef.current && !profilePreviewRef.current.contains(event.target as Node)) {
        setShowProfilePreview(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const deleteReply = async () => {
    const toDelete = `/api/post/${postId}/reply/${replyId}`;
    try {
      const res = await fetch(toDelete, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      mutate('/api/post');
      setIsDropdownOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReplyDrawerToggle = () => {
    setIsReplyModalOpen(!isReplyModalOpen);
  };

  const onSubmit = (data: ReplyFormData) => {
    const newReply = {
      content: data.content,
      parentReplyId: replyId,
    };

    fetch(`/api/post/${postId}/reply/${replyId}/reply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReply),
    });
    mutate('/api/post');

    reset();
  };

  return (
    <>
      <div
        // onClick={() => router.push(`/posts/${postId}`)}
        className='w-11/12 rounded-lg bg-white p-4 shadow hover:bg-blue-50'
      >
        {isReplyModalOpen && (
          <AddReplyToReplyModal
            closeModal={handleReplyDrawerToggle}
            postId={postId}
            parentReplyId={replyId}
          />
        )}
        <div className='flex justify-between'>
          <p className='py-2 text-blue-500'>返信先 : @{toReplyUserId}</p>
          <p className='mr-1 text-sm text-gray-500'>{timeAgo}</p>
        </div>
        <div className='mb-2 flex items-center justify-start'>
          <div
            className='relative'
            onMouseEnter={() => setShowProfilePreview(true)}
            onMouseLeave={() => setShowProfilePreview(false)}
          >
            <Link href={`/profile/${clerkId}`}>
              <Image
                src={avatar}
                alt={username}
                width={40}
                height={40}
                className='rounded-full hover:opacity-80'
              />
            </Link>
          </div>
          <div className='ml-2 w-full'>
            <div className='flex w-full items-center justify-between'>
              <div className='relative'>
                <Link href={`/profile/${clerkId}`}>
                  <div className='inline-block rounded-md hover:bg-gray-100'>
                    <h3 className='px-1 py-0.5 font-bold transition-colors duration-100 hover:text-blue-600'>
                      {username}
                    </h3>
                  </div>
                </Link>
                {showProfilePreview && (
                  <div ref={profilePreviewRef} className='absolute left-0 top-full mt-1'>
                    <ProfilePreview
                      username={username}
                      avatar={avatar}
                      id={id}
                      introduction={introduction}
                    />
                  </div>
                )}
              </div>
            </div>
            <p className='px-1 py-0.5 text-xs text-gray-500'>@{id}</p>
          </div>
        </div>
        <div className='mb-4'>
          <div className='mb-2 ml-1 w-full break-words'>{content}</div>
        </div>
        <div className='flex flex-wrap gap-2'>
          {tags &&
            tags.map((tag) => (
              <Link key={tag.id} href={`/timeline/${tag.id}`}>
                <UserTag tagName={tag.name} />
              </Link>
            ))}
        </div>
        <div className='relative mt-6 flex w-full items-center justify-between'>
          <div className='flex items-center justify-center gap-2'>
            <button
              onClick={handleReplyDrawerToggle}
              className='flex items-center justify-center rounded-full bg-blue-400 px-4 py-2 text-white transition-all hover:bg-blue-600 hover:shadow-lg'
            >
              <MessageCircleReply size={20} />
              <span className='ml-1'>
                {replies.filter((reply) => reply.parentReplyId === replyId).length}
              </span>
            </button>
            {/* <button onClick={handleLike}>
                 <Heart size={20} color={'#dc143c'} fill={isLiked ? '#dc143c' : 'white'} />
               </button>
               <span>{likesCount}</span> */}
          </div>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className='text-gray-500 hover:text-gray-700'
          >
            <MoreVertical size={20} fill='red' />
          </button>
          {isDropdownOpen && (
            <KebabMenu
              currentClerkId={userId}
              postClerkId={clerkId}
              postId={postId}
              handleDelete={deleteReply}
            />
          )}
        </div>
      </div>
      <div className='flex w-full flex-col items-center'>
        {replies
          .filter((reply) => reply.parentReplyId === replyId)
          .map((reply) => (
            <PostReply
              key={reply.id}
              username={reply.author.name}
              clerkId={reply.author.clerkId}
              id={reply.author.id}
              timestamp={reply.createdAt}
              content={reply.content}
              avatar={reply.avatar}
              likes={reply.likes}
              tags={reply.author.tags}
              replyId={reply.id}
              postId={postId}
              toReplyUserId={reply.author.id}
              replies={replies}
            />
          ))}
      </div>
    </>
  );
};

export default PostReply;
