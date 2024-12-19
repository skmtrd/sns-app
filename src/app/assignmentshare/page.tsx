import { getSession } from '@/app/actions/getSession';
import AssignmnetSharePage from '@/components/assignmentshare/AssignmentSharePage';
import { Metadata } from 'next';
import { revalidatePath } from 'next/cache';
import { getAssignments } from '../actions/getAssignments';
import { getUserInfo } from '../actions/getUserInfo';
export const metadata: Metadata = {
  title: '課題共有 / INIAD',
};

const AssignmentAll = async () => {
  const [assignments, session] = await Promise.all([getAssignments(), getSession()]);
  const userInfo = await getUserInfo(session.id);
  revalidatePath('/assignmentshare');

  return (
    <AssignmnetSharePage
      currentUserId={session.id}
      initialAssignments={assignments}
      shouldPolling={true}
      userInfo={userInfo}
    />
  );
};

export default AssignmentAll;
