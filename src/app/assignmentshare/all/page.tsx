import { getAssignments } from '@/app/actions/getAssignmnets';
import AssignmnetSharePage from '@/components/assignmentshare/AssignmnetSharePage';
import { redirect } from 'next/navigation';
import { auth } from '../../../../auth';

const AssignmentAll = async () => {
  const assignments = await getAssignments();
  const session = await auth();
  if (!session) redirect('/');

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
