'use client';
import TimelineSkeltonLoading from '@/components/loading/TimelineSkeltonLoading';
import TimeLinePage from '@/components/timeline/TimeLinePage';
import useData from '@/hooks/useData';
import { postSchema } from '@/lib/schemas';
import { useAuth } from '@clerk/nextjs';

const Likes = () => {
  const { userId: currentClerkId } = useAuth();
  const { data: posts, error, isLoading } = useData('/api/post', postSchema);

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
