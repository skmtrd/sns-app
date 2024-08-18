'use client';
import { useRelativeTime } from '@/hooks/useRelativeTime';
import { addPostLike, deletePostLike } from '@/lib/likeRequests';
import { Tag } from '@/lib/types';
import { useAuth } from '@clerk/nextjs';
import { Heart, MessageCircleReply, MoreVertical } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import KebabMenu from '../element/KebabMenu';
import ProfilePreview from '../element/ProfilePreview';
import UserTag from '../element/UserTag';
import { AddReplyModal } from './AddReplyModal';

type PostProps = {
  postAuthorName: string;
  postAuthorId: string;
  postAuthorClerkId: string;
  timestamp: string;
  postContent: string;
  postAuthorTags: Tag[] | undefined;
  postId: string;
  postAuthorAvatar: string | null;
  postAuthorIntroduction?: string | undefined | null;
  likes: { user: { name: string; clerkId: string; id: string } }[];
  replyCount: number;
  handleDeletePost: (e: React.MouseEvent<HTMLButtonElement>, postId: string) => void;
};

type ReplyFormData = {
  content: string;
};

const REPLY_MAX_LENGTH = 500;

export const Post: React.FC<PostProps> = ({
  postAuthorName,
  timestamp,
  postAuthorClerkId,
  postAuthorId,
  postContent,
  postAuthorTags,
  postId,
  postAuthorAvatar,
  postAuthorIntroduction,
  likes,
  replyCount,
  handleDeletePost,
}) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showProfilePreview, setShowProfilePreview] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profilePreviewRef = useRef<HTMLDivElement>(null);
  const { userId: currentClerkId } = useAuth();
  const timeAgo = useRelativeTime(timestamp);
  const [likesCount, setLikesCount] = useState(likes.length);
  const [isLiked, setIsLiked] = useState(
    likes.some((like) => like.user.clerkId === currentClerkId),
  );
  const [isLiking, setIsLiking] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ReplyFormData>();

  useEffect(() => {
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

  const handleLike = async () => {
    if (isLiking) return;

    setIsLiking(true);
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);

    try {
      if (isLiked) {
        await deletePostLike(postId);
      } else {
        await addPostLike(postId);
      }
    } catch (error) {
      setIsLiked(isLiked);
      setLikesCount(likesCount);
    } finally {
      setIsLiking(false);
    }
  };

  const handleReplyModalToggle = () => {
    setIsReplyModalOpen(!isReplyModalOpen);
  };

  if (!postAuthorAvatar) {
    return;
  }

  return (
    <div
      onClick={() => router.push(`/posts/${postId}`)}
      className='w-11/12 rounded-lg bg-white p-4 shadow hover:bg-blue-50'
    >
      {isReplyModalOpen && <AddReplyModal closeModal={handleReplyModalToggle} postId={postId} />}
      <div className='mb-2 flex items-center justify-start'>
        <div
          className='relative'
          onMouseEnter={() => setShowProfilePreview(true)}
          onMouseLeave={() => setShowProfilePreview(false)}
        >
          <Link href={`/profile/${postAuthorClerkId}`} onClick={(e) => e.stopPropagation()}>
            <Image
              src={postAuthorAvatar}
              alt={postAuthorName}
              width={40}
              height={40}
              className='min-h-10 min-w-10 rounded-full hover:opacity-80'
            />
          </Link>
        </div>
        <div className='ml-2 w-full'>
          <div className='flex w-full items-center justify-between'>
            <div className='relative'>
              <Link href={`/profile/${postAuthorClerkId}`} onClick={(e) => e.stopPropagation()}>
                <div className='inline-block rounded-md hover:bg-gray-100'>
                  <h3 className='break-words px-1 py-0.5 font-bold transition-colors duration-100 hover:text-blue-600'>
                    {postAuthorName}
                  </h3>
                </div>
              </Link>
              {showProfilePreview && (
                <div ref={profilePreviewRef} className='absolute left-0 top-full mt-1'>
                  <ProfilePreview
                    authorName={postAuthorName}
                    authorAvatar={postAuthorAvatar}
                    authorId={postAuthorId}
                    authorIntroduction={postAuthorIntroduction}
                  />
                </div>
              )}
            </div>
            <p className='mr-1 whitespace-nowrap text-sm text-gray-500'>{timeAgo}</p>
          </div>
          <p className='px-1 py-0.5 text-xs text-gray-500'>@{postAuthorId}</p>
        </div>
      </div>
      <div className='mb-4'>
        <div className='mb-2 ml-1 w-full break-words'>{postContent}</div>
      </div>
      <div className='flex flex-wrap gap-2'>
        {postAuthorTags &&
          postAuthorTags.map((tag) => (
            <Link key={tag.id} href={`/timeline/${tag.id}`} onClick={(e) => e.stopPropagation()}>
              <UserTag tagName={tag.name} />
            </Link>
          ))}
      </div>
      <div className='relative mt-6 flex w-full items-center justify-between'>
        <div className='flex items-center justify-center gap-2'>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleReplyModalToggle();
            }}
            className='flex items-center justify-center rounded-full bg-blue-400 px-4 py-2 text-white transition-all hover:bg-blue-600 hover:shadow-lg'
          >
            <MessageCircleReply size={20} />
            <span className='ml-1'>{replyCount}</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLike();
            }}
          >
            <Heart size={20} color={'#dc143c'} fill={isLiked ? '#dc143c' : 'white'} />
          </button>
          <span>{likesCount}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsDropdownOpen(!isDropdownOpen);
          }}
          className='text-gray-500 hover:text-gray-700'
        >
          <MoreVertical size={20} fill='red' />
        </button>
        {isDropdownOpen && (
          <KebabMenu
            currentClerkId={currentClerkId}
            authorClerkId={postAuthorClerkId}
            contentId={postId}
            handleDelete={handleDeletePost}
          />
        )}
      </div>
    </div>
  );
};
