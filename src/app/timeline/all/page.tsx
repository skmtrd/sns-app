import { getPosts } from '@/app/actions';
import TimeLinePage from '@/components/timeline/TimeLinePage';
import { auth } from '../../../../auth';

const TimelineAll = async () => {
  const session = await auth();
  const posts = await getPosts();

  return (
    <TimeLinePage
      initialPosts={posts}
      currentUserId={session?.user?.id ?? ''}
      title={'タイムライン'}
      target={'すべて'}
    />
  );
};

export default TimelineAll;
