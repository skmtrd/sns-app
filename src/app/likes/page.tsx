import { getPosts } from '@/app/actions/getPosts';
import TimeLinePage from '@/components/timeline/TimeLinePage';
import { redirect } from 'next/navigation';
import { auth } from '../../../auth';
const Likes = async () => {
  const session = await auth();
  if (!session) redirect('/');
  const posts = await getPosts();

  const likedPosts = posts.filter((post) =>
    post.likes.some((like) => like.user.id === session?.user?.id),
  );

  return (
    <TimeLinePage
      initialPosts={likedPosts}
      currentUserId={session?.user?.id ?? ''}
      title={'いいねしたポスト一覧'}
      target={'いいね'}
      shouldPolling={false}
    />
  );
};

export default Likes;
