import { getAssignments } from '@/app/actions/getAssignments';
import { getSession } from '@/app/actions/getSession';
import { getUserInfo } from '@/app/actions/getUserInfo';
import AssignmnetSharePage from '@/components/assignmentshare/AssignmentSharePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '課題共有 / INIAD',
};

const AssignmentAll = async () => {
  const [assignments, session] = await Promise.all([getAssignments(), getSession()]);
  const userInfo = await getUserInfo(session.id);

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
