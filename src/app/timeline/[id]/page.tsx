import { getPosts } from '@/app/actions/getPosts';
import TimeLinePage from '@/components/timeline/TimeLinePage';
import { auth } from '../../../../auth';

const TimelineAll = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  const posts = await getPosts();

  const { id } = params;
  const filteredPosts = posts.filter((post) => post.author.tags?.some((tag) => tag.id === id));
  const filteredTagName = filteredPosts[0].author.tags?.find((tag) => tag.id === id)?.name;

  return (
    <TimeLinePage
      initialPosts={posts}
      currentUserId={session?.user?.id ?? ''}
      title={'タイムライン'}
      target={`タグ検索: ${filteredTagName}`}
      shouldPolling={true}
    />
  );
};

export default TimelineAll;
