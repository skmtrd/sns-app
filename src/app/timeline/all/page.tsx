'use client';
import TimelineSkeltonLoading from '@/components/loading/TimelineSkeltonLoading';
import TimeLinePage from '@/components/timeline/TimeLinePage';
import useData from '@/hooks/useData';
import { PostSchema } from '@/lib/schemas';
import { useAuth } from '@clerk/nextjs';
import { z } from 'zod';

const TimelineAll = () => {
  const { data: posts, error, isLoading } = useData('/api/post', z.array(PostSchema));
  const { userId: currentClerkId } = useAuth();

  if (isLoading || !posts || !currentClerkId) {
    return <TimelineSkeltonLoading title={'タイムライン'} subtitle={'すべて'} />;
  }

  return (
    <TimeLinePage
      posts={posts}
      currentClerkId={currentClerkId}
      title={'タイムライン'}
      target={'すべて'}
    />
  );
};

export default TimelineAll;
