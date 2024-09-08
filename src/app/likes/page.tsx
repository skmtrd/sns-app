'use client';
import TimelineSkeltonLoading from '@/components/loading/TimelineSkeltonLoading';
import TimeLinePage from '@/components/timeline/TimeLinePage';
import useData from '@/hooks/useData';
import { PostSchema } from '@/lib/schemas';
import { useSession } from 'next-auth/react';
import { z } from 'zod';

const Likes = () => {
  const { data: session, status } = useSession();
  const { data: posts, error, isLoading } = useData('/api/post', z.array(PostSchema));

  if (isLoading || !posts || !session?.user?.id) {
    return <TimelineSkeltonLoading title={'いいねしたポスト一覧'} subtitle={'すべて'} />;
  }

  const likedPosts = posts.filter((post) =>
    post.likes.some((like) => like.user.id === session?.user?.id),
  );

  return (
    <TimeLinePage
      posts={likedPosts}
      currentUserId={session.user.id}
      title={'いいねしたポスト一覧'}
      target={null}
    />
  );
};

export default Likes;
