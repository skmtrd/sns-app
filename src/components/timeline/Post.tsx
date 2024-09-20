'use client';
import { useRelativeTime } from '@/hooks/useRelativeTime';
import { ICON_IMAGE_BASE_URL, POST_IMAGE_BASE_URL } from '@/lib/constants';
import { Post as PostType } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AddReplyModal } from './AddReplyModal';
import PostBottomItems from './PostElement/PostBottomItems/PostBottomItems';
import PostHeader from './PostElement/PostHeader/PostHeader';
import PostMain from './PostElement/PostMain/PostMain';
import PostTags from './PostElement/PostTags/PostTags';

type PostProps = {
  post: PostType;
  currentUserId: string;
  handleDeletePost: Promise<(postId: string) => Promise<void>>;
};

export const Post: React.FC<PostProps> = ({ handleDeletePost, post, currentUserId }) => {
  const router = useRouter();
  const timeAgo = useRelativeTime(post.createdAt);

  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  const handleReplyModalToggle = () => {
    setIsReplyModalOpen(!isReplyModalOpen);
  };

  return (
    <div className='w-11/12 rounded-lg bg-white p-4 shadow hover:bg-slate-50'>
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
