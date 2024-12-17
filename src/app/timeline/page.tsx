import { getPosts } from '@/app/actions/getPosts';
import { getSession } from '@/app/actions/getSession';
import { getUserInfo } from '@/app/actions/getUserInfo';
import TimeLinePage from '@/components/timeline/TimeLinePage';
import { Metadata } from 'next';

import { revalidatePath } from 'next/cache';

export const metadata: Metadata = {
  title: 'タイムライン / INIAD',
};

const TimelineAll = async () => {
  const [session, posts] = await Promise.all([getSession(), getPosts()]);
  const userInfo = await getUserInfo(session.id);
  revalidatePath('/timeline');
  return (
    <TimeLinePage
      initialPosts={posts}
      currentUserId={session.id}
      shouldPolling={true}
      userInfo={userInfo}
    />
  );
};

export default TimelineAll;
