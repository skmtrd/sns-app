'use client';
import TimelineSkeltonLoading from '@/components/loading/TimelineSkeltonLoading';
import TimeLinePage from '@/components/timeline/TimeLinePage';
import useData from '@/hooks/useData';
import { PostSchema } from '@/lib/schemas';
import { useSession } from 'next-auth/react';
import { z } from 'zod';

const TimelineAll = () => {
  const { data: posts, error, isLoading } = useData('/api/post', z.array(PostSchema));
  const { data: session, status } = useSession();

  if (isLoading || !posts || !session?.user?.id) {
    return <TimelineSkeltonLoading title={'タイムライン'} subtitle={'すべて'} />;
  }

  return (
    <TimeLinePage
      posts={posts}
      currentUserId={session.user.id}
      title={'タイムライン'}
      target={'すべて'}
    />
  );
};

export default TimelineAll;
