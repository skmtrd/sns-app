'use client';
import { useRelativeTime } from '@/hooks/useRelativeTime';
import { ICON_IMAGE_BASE_URL, POST_IMAGE_BASE_URL } from '@/lib/constants';
import { Post as PostType } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PostBottomItems from '../element/PostElement/PostBottomItems/PostBottomItems';
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
      <PostBottomItems
        replies={post.replies}
        postId={post.id}
        currentUserId={currentUserId}
        postAuthorId={post.author.id}
        handleDeletePost={handleDeletePost}
        likes={post.likes}
      />
    </div>
  );
};
