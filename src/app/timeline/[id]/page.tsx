import { getPosts } from '@/app/actions/getPosts';
import { getSession } from '@/app/actions/getSession';
import TimeLinePage from '@/components/timeline/TimeLinePage';
import { revalidatePath } from 'next/cache';

const TimelineTag = async ({ params }: { params: { id: string } }) => {
  const session = await getSession();
  const posts = await getPosts();
  const tagId = params.id;
  const filteredPosts = posts.filter((post) => post.author.tags?.some((tag) => tag.id === tagId));
  const filteredTagName = filteredPosts[0].author.tags?.find((tag) => tag.id === tagId)?.name;
  revalidatePath('/timeline/all');
  return (
    <TimeLinePage
      initialPosts={filteredPosts}
      currentUserId={session.id}
      title={'タイムライン'}
      target={`タグ検索: ${filteredTagName}`}
      shouldPolling={false}
    />
  );
};

export default TimelineTag;
