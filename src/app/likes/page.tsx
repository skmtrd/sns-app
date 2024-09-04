'use client';
import TimelineSkeltonLoading from '@/components/loading/TimelineSkeltonLoading';
import TimeLinePage from '@/components/timeline/TimeLinePage';
import useData from '@/hooks/useData';
import { PostSchema } from '@/lib/schemas';
import { useAuth } from '@clerk/nextjs';
import { z } from 'zod';

const Likes = () => {
  const { userId: currentClerkId } = useAuth();
  const { data: posts, error, isLoading } = useData('/api/post', z.array(PostSchema));

  if (isLoading || !posts || !currentClerkId) {
    return <TimelineSkeltonLoading title={'いいねしたポスト一覧'} subtitle={'すべて'} />;
  }

  const likedPosts = posts.filter((post) =>
    post.likes.some((like) => like.user.clerkId === currentClerkId),
  );

  return (
    <TimeLinePage
      posts={likedPosts}
      currentClerkId={currentClerkId}
      title={'いいねしたポスト一覧'}
      target={null}
    />
  );
};

export default Likes;
