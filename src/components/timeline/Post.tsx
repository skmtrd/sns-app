'use client';
import { usePostLike } from '@/hooks/Like/usePostLike';
import { useRelativeTime } from '@/hooks/useRelativeTime';
import { ICON_IMAGE_BASE_URL, POST_IMAGE_BASE_URL } from '@/lib/constants';
import { Post as PostType } from '@/lib/types';
import { Heart, MessageCircleReply, MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import KebabMenu from '../element/KebabMenu';
import PostHeader from '../element/PostElement/PostHeader/PostHeader';
import PostMain from '../element/PostElement/PostMain/PostMain';
import PostTags from '../element/PostElement/PostTags/PostTags';
import { AddReplyModal } from './AddReplyModal';

type PostProps = {
  post: PostType;
  currentUserId: string;
  handleDeletePost: Promise<(postId: string) => Promise<void>>;
};

type ReplyFormData = {
  content: string;
};

export const Post: React.FC<PostProps> = ({ handleDeletePost, post, currentUserId }) => {
  const router = useRouter();
  const timeAgo = useRelativeTime(post.createdAt);
  const { likesCount, isLiked, handleToggleLike } = usePostLike(post.likes, currentUserId);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ReplyFormData>();

  const handleReplyModalToggle = () => {
    setIsReplyModalOpen(!isReplyModalOpen);
  };

  return (
    <div
      onClick={() => router.push(`/posts/${post.id}`)}
      className='w-11/12 rounded-lg bg-white p-4 shadow hover:bg-slate-50'
    >
      {isReplyModalOpen && <AddReplyModal closeModal={handleReplyModalToggle} postId={post.id} />}
      <PostHeader
        src={`${ICON_IMAGE_BASE_URL}${post.author.iconUrl}`}
        timeAgo={timeAgo}
        name={post.author.name}
        id={post.author.id}
      />
      <div className='h-5' />
      <PostMain
        textContent={post.content}
        imageUrl={post.imageUrl ? `${POST_IMAGE_BASE_URL}${post.imageUrl}` : null}
      />
      <div className='h-5' />
      <PostTags tags={post.author.tags || []} />
      <div className='h-5' />
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
            <span className='ml-1'>
              {post.replies.filter((reply) => reply.parentReplyId === null).length}
            </span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleLike(post.id);
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
            currentUserId={currentUserId}
            authorUserId={post.author.id}
            contentId={post.id}
            handleDelete={handleDeletePost}
          />
        )}
      </div>
    </div>
  );
};
