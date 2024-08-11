'use client';
import { useRelativeTime } from '@/hooks/useRelativeTime';
import { deleteLike, postLike } from '@/lib/likeRequests';
import { Reply, Tag } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useAuth } from '@clerk/nextjs';
import { Heart, MessageCircleReply, MoreVertical, Send } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import KebabMenu from '../element/KebabMenu';
import ProfilePreview from '../element/ProfilePreview';
import UserTag from '../element/UserTag';

type PostProps = {
  username: string;
  clerkId: string;
  id: string;
  timestamp: string;
  content: string;
  tags: Tag[];
  postId: string;
  avatar: string;
  introduction?: string;
  likes: { author: { name: string; clerkId: string; id: string } }[];
  replies: Reply[];
};

type ReplyFormData = {
  content: string;
};

const REPLY_MAX_LENGTH = 500;

export const Post: React.FC<PostProps> = ({
  username,
  timestamp,
  clerkId,
  id,
  content,
  tags,
  postId,
  avatar,
  introduction,
  likes,
  replies,
}) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showProfilePreview, setShowProfilePreview] = useState(false);
  const [isReplyDrawerOpen, setIsReplyDrawerOpen] = useState(false);
  const [replyContentHeight, setReplyContentHeight] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profilePreviewRef = useRef<HTMLDivElement>(null);
  const replyContentRef = useRef<HTMLDivElement>(null);
  const { userId } = useAuth();
  const timeAgo = useRelativeTime(timestamp);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ReplyFormData>();

  const replyContent = watch('content');

  useEffect(() => {
    setLikesCount(likes?.length);
    setIsLiked(likes?.some((like) => like.author.clerkId === userId));
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

  useEffect(() => {
    if (replyContentRef.current) {
      setReplyContentHeight(replyContentRef.current.scrollHeight);
    }
  }, [isReplyDrawerOpen]);

  const deletePost = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const toDelete = `/api/post/${id}`;
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
    setTimeout(() => {
      document.getElementById(postId)?.focus();
    }, 400);
    setIsReplyDrawerOpen(!isReplyDrawerOpen);
  };

  const handleLike = async () => {
    setIsLiked(!isLiked);
    isLiked ? await deleteLike(postId) : await postLike(postId);
    isLiked ? setLikesCount(likesCount - 1) : setLikesCount(likesCount + 1);
  };

  const onSubmit = (data: ReplyFormData) => {
    const newReply = {
      content: data.content,
      postId,
    };

    fetch(`/api/post/${postId}/reply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReply),
    });
    console.log(data.content);
    mutate('/api/post');
    setIsReplyDrawerOpen(false);
    reset();
  };

  return (
    <div
      onClick={() => router.push(`/posts/${postId}`)}
      className='w-11/12 rounded-lg bg-white p-4 shadow hover:bg-gray-50'
    >
      <div className='mb-2 flex items-center justify-start'>
        <div
          className='relative'
          onMouseEnter={() => setShowProfilePreview(true)}
          onMouseLeave={() => setShowProfilePreview(false)}
        >
          <Link href={`/profile/${clerkId}`} onClick={(e) => e.stopPropagation()}>
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
              <Link href={`/profile/${clerkId}`} onClick={(e) => e.stopPropagation()}>
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
            <p className='mr-1 text-sm text-gray-500'>{timeAgo}</p>
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
            <Link key={tag.id} href={`/timeline/${tag.id}`} onClick={(e) => e.stopPropagation()}>
              <UserTag tagName={tag.name} />
            </Link>
          ))}
      </div>
      <div className='relative mt-6 flex w-full items-center justify-between'>
        <div className='flex items-center justify-center gap-2'>
          <button
            onClick={(e) => {
              e.stopPropagation(); // 親要素のクリックを防ぐ
              handleReplyDrawerToggle();
            }}
            className='flex items-center justify-center rounded-full bg-blue-400 px-4 py-2 text-white transition-all hover:bg-blue-600 hover:shadow-lg'
          >
            <MessageCircleReply size={20} />
            <span className='ml-1'>
              {/* {replies.filter((reply) => reply.parentReplyId === null).length}*/}
              {replies.filter((reply) => reply.parentReplyId === null).length}
            </span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation(); // 親要素のクリックを防ぐ
              handleLike();
            }}
          >
            <Heart size={20} color={'#dc143c'} fill={isLiked ? '#dc143c' : 'white'} />
          </button>
          <span>{likesCount}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation(); // 親要素のクリックを防ぐ
            setIsDropdownOpen(!isDropdownOpen);
          }}
          className='text-gray-500 hover:text-gray-700'
        >
          <MoreVertical size={20} fill='red' />
        </button>
        {isDropdownOpen && (
          <KebabMenu
            currentClerkId={userId}
            postClerkId={clerkId}
            postId={postId}
            handleDelete={deletePost}
          />
        )}
      </div>

      <div
        ref={replyContentRef}
        className='overflow-hidden transition-all duration-500 ease-in-out'
        style={{ height: isReplyDrawerOpen ? `${replyContentHeight}px` : '0' }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className='mt-4'>
          <textarea
            id={postId}
            {...register('content', { required: 'リプライを入力してください' })}
            className='w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none'
            rows={4}
            maxLength={REPLY_MAX_LENGTH}
            placeholder='リプライを入力してください'
            onClick={(e) => e.stopPropagation()} // 親要素のクリックを防ぐ
          />
          <div className='flex justify-end'>
            <p
              className={cn(
                'text-sm',
                replyContent?.length === REPLY_MAX_LENGTH || replyContent?.length === 0
                  ? 'text-red-500'
                  : 'text-gray-400',
              )}
            >
              {replyContent?.length || 0} / {REPLY_MAX_LENGTH}
            </p>
          </div>
          <div className='mb-4 mt-3 text-right'>
            <button
              type='submit'
              onClick={(e) => e.stopPropagation()} // 親要素のクリックを防ぐ
              className='inline-flex items-center justify-center rounded-full bg-blue-500 px-4 py-2 text-white transition-all hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2'
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
