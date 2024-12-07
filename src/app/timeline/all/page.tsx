import { getPosts } from '@/app/actions/getPosts';
import { getSession } from '@/app/actions/getSession';
import TimeLinePage from '@/components/timeline/TimeLinePage';

import { revalidatePath } from 'next/cache';

const TimelineAll = async () => {
  const session = await getSession();
  const posts = await getPosts();
  revalidatePath('/timeline/all');
  return (
    <TimeLinePage
      initialPosts={posts}
      currentUserId={session.id}
      title={'タイムライン'}
      target={'すべて'}
      shouldPolling={true}
    />
  );
};

export default TimelineAll;
