import { getAssignments } from '@/app/actions/getAssignmnets';
import { getSession } from '@/app/actions/getSession';
import AssignmnetSharePage from '@/components/assignmentshare/AssignmnetSharePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '課題共有 / INIAD',
};

const AssignmentAll = async () => {
  const assignments = await getAssignments();
  const session = await getSession();

  return (
    <AssignmnetSharePage
      currentUserId={session.id}
      initialAssignments={assignments}
      title={'課題共有'}
      target={'すべて'}
      shouldPolling={true}
    />
  );
};

export default AssignmentAll;
