import { getAssignments } from '@/app/actions/getAssignments';
import { getSession } from '@/app/actions/getSession';
import { getUserInfo } from '@/app/actions/getUserInfo';
import AssignmnetSharePage from '@/components/assignmentshare/AssignmentSharePage';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: '登録した課題 / INIAD',
};

const MyAssignments = async () => {
  const [assignments, session] = await Promise.all([getAssignments(), getSession()]);
  const userInfo = await getUserInfo(session.id);

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.likes.some((like) => like.user.id === session.id),
  );

  return (
    <AssignmnetSharePage
      currentUserId={session.id}
      initialAssignments={filteredAssignments}
      shouldPolling={false}
      userInfo={userInfo}
    />
  );
};

export default MyAssignments;
