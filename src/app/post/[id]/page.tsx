import { getSession } from '@/app/actions/getSession';
import { getSpecificPost } from '@/app/actions/getSpecificPost';
import SpecificPostPage from '@/components/timeline/ReplyElement/SpecificPostPage';

export const generateMetadata = async ({ params: { id } }: { params: { id: string } }) => {
  const post = await getSpecificPost(id);
  return {
    title: `${post.author.name}のポスト / INIAD`,
  };
};

const TimelineAll = async ({ params: { id } }: { params: { id: string } }) => {
  const [session, post] = await Promise.all([getSession(), getSpecificPost(id)]);

  return <SpecificPostPage currentUserId={session.id} post={post} />;
};

export default TimelineAll;
