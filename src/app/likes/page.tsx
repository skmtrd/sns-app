import { getPosts } from '@/app/actions/getPosts';
import TimeLinePage from '@/components/timeline/TimeLinePage';
import { Metadata } from 'next';
import { getSession } from '../actions/getSession';
import { getUserInfo } from '../actions/getUserInfo';
export const metadata: Metadata = {
  title: 'いいねしたポスト / INIAD',
};

export const dynamic = 'force-dynamic';

const Likes = async () => {
  const [session, posts] = await Promise.all([getSession(), getPosts()]);
  const userInfo = await getUserInfo(session.id);

  const likedPosts = posts.filter((post) => post.likes.some((like) => like.user.id === session.id));

  return (
    <TimeLinePage
      initialPosts={likedPosts}
      currentUserId={session.id}
      shouldPolling={false}
      userInfo={userInfo}
    />
  );
};

export default Likes;
