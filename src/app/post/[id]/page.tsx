import { getSession } from '@/app/actions/getSession';
import { getSpecificPost } from '@/app/actions/getSpecificPost';
import SpecificPostPage from '@/components/timeline/ReplyElement/SpecificPostPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'タイムライン / INIAD',
};

const TimelineAll = async ({ params: { id } }: { params: { id: string } }) => {
  const [session, post] = await Promise.all([getSession(), getSpecificPost(id)]);

  return <SpecificPostPage currentUserId={session.id} post={post} />;
};

export default TimelineAll;
