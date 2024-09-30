import AssignmnetSharePage from '@/components/assignmentshare/AssignmnetSharePage';
import { auth } from '../../../auth';
import { getAssignments } from '../actions/getAssignmnets';

const MyAssignments = async () => {
  const assignments = await getAssignments();
  const session = await auth();

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.likes.some((like) => like.user.id === session?.user?.id),
  );
  return (
    <AssignmnetSharePage
      currentUserId={session?.user?.id ?? ''}
      initialAssignments={filteredAssignments}
      title={'登録した課題'}
      target={null}
      shouldPolling={false}
    />
  );
};

export default MyAssignments;
