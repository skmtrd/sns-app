import { getSession } from '@/app/actions/getSession';
import { getSpecificPost } from '@/app/actions/getSpecificPost';
import SpecificPostPage from '@/components/timeline/ReplyElement/SpecificPostPage';
type PageProps = {
  params: Promise<{
    id: string;
  }>;
};
export const generateMetadata = async (props: PageProps) => {
  const params = await props.params;
  const id = params.id;
  const post = await getSpecificPost(id);
  return {
    title: `${post.author.name}のポスト / INIAD`,
  };
};

const TimelineAll = async (props: PageProps) => {
  const params = await props.params;
  const id = params.id;
  const [session, post] = await Promise.all([getSession(), getSpecificPost(id)]);

  return <SpecificPostPage currentUserId={session.id} post={post} />;
};

export default TimelineAll;
