import { getSession } from '@/app/actions/getSession';
import { getSpecificPost } from '@/app/actions/getSpecificPost';
import SpecificPostPage from '@/components/timeline/ReplyElement/SpecificPostPage';
type Props = {
  params: {
    id: string;
  };
};
export const generateMetadata = async (props: Props) => {
  const id = props.params.id;
  const post = await getSpecificPost(id);
  return {
    title: `${post.author.name}のポスト / INIAD`,
  };
};

const TimelineAll = async (props: Props) => {
  const params = props.params;
  const [session, post] = await Promise.all([getSession(), getSpecificPost(params.id)]);

  return <SpecificPostPage currentUserId={session.id} post={post} />;
};

export default TimelineAll;
