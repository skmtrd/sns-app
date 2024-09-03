'use client';
import TimelineSkeltonLoading from '@/components/loading/TimelineSkeltonLoading';
import TimeLinePage from '@/components/timeline/TimeLinePage';
import useData from '@/hooks/useData';
import { postSchema } from '@/lib/schemas';
import { useAuth } from '@clerk/nextjs';

const TimelineAll = () => {
  const { data: posts, error, isLoading } = useData('/api/post', postSchema);
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
