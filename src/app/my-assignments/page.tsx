import AssignmnetSharePage from '@/components/assignmentshare/AssignmnetSharePage';
import { Metadata } from 'next';
import { getAssignments } from '../actions/getAssignmnets';
import { getSession } from '../actions/getSession';
export const metadata: Metadata = {
  title: '登録した課題 / INIAD',
};

const MyAssignments = async () => {
  const assignments = await getAssignments();
  const session = await getSession();

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.likes.some((like) => like.user.id === session.id),
  );
  return (
    <AssignmnetSharePage
      currentUserId={session.id}
      initialAssignments={filteredAssignments}
      title={'登録した課題'}
      target={null}
      shouldPolling={false}
    />
  );
};

export default MyAssignments;
