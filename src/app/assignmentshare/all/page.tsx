import { getAssignments } from '@/app/actions/getAssignmnets';
import AssignmnetSharePage from '@/components/assignmentshare/AssignmnetSharePage';
import { auth } from '../../../../auth';

const AssignmentAll = async () => {
  const assignments = await getAssignments();
  const session = await auth();

  return (
    <AssignmnetSharePage
      currentUserId={session?.user?.id ?? ''}
      initialAssignments={assignments}
      title={'課題共有'}
      target={'すべて'}
      shouldPolling={true}
    />
  );
};

export default AssignmentAll;
