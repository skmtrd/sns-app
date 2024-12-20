'use client';
import { useRelativeTime } from '@/hooks/useRelativeTime';
import { ICON_IMAGE_BASE_URL, POST_IMAGE_BASE_URL } from '@/lib/constants/baseUrl';
import { Post as PostType } from '@/lib/types';
import Link from 'next/link';
import PostBottomItems from './PostElement/PostBottomItems/PostBottomItems';
import PostHeader from './PostElement/PostHeader/PostHeader';
import PostMain from './PostElement/PostMain/PostMain';
import PostTags from './PostElement/PostTags/PostTags';

type PostProps = {
  post: PostType;
  currentUserId: string;
};

export const Post: React.FC<PostProps> = ({ post, currentUserId }) => {
  const timeAgo = useRelativeTime(post.createdAt);

  return (
    <Link
      href={`/post/${post.id}`}
      className='w-11/12 rounded-lg bg-white p-4 shadow hover:bg-slate-50'
    >
      <PostHeader
        src={
          post.author.iconUrl
            ? `${ICON_IMAGE_BASE_URL}${post.author.iconUrl}`
            : post.author.image
              ? post.author.image
              : ''
        }
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
        likes={post.likes}
      />
    </Link>
  );
};
