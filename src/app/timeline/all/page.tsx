import { getPosts } from '@/app/actions/getPosts';
import TimeLinePage from '@/components/timeline/TimeLinePage';
import { revalidatePath } from 'next/cache';
import { auth } from '../../../../auth';

const TimelineAll = async () => {
  const session = await auth();
  const posts = await getPosts();
  revalidatePath('/timeline/all');
  return (
    <TimeLinePage
      initialPosts={posts}
      currentUserId={session?.user?.id ?? ''}
      title={'タイムライン'}
      target={'すべて'}
      shouldPolling={true}
    />
  );
};

export default TimelineAll;
