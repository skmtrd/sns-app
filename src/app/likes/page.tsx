import { getPosts } from '@/app/actions/getPosts';
import TimeLinePage from '@/components/timeline/TimeLinePage';
import { Metadata } from 'next';
import { getSession } from '../actions/getSession';

export const metadata: Metadata = {
  title: 'いいねしたポスト / INIAD',
};

const Likes = async () => {
  const session = await getSession();
  const posts = await getPosts();

  const likedPosts = posts.filter((post) => post.likes.some((like) => like.user.id === session.id));

  return (
    <TimeLinePage
      initialPosts={likedPosts}
      currentUserId={session.id}
      title={'いいねしたポスト一覧'}
      target={'いいね'}
      shouldPolling={false}
    />
  );
};

export default Likes;
