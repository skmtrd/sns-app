'use client';
import AssignmnetSharePage from '@/components/assignmentshare/AssignmnetSharePage';
import QuestionSkeltonLoading from '@/components/loading/QuestionSkeltonLoading';
import useData from '@/hooks/useData';
import { AssignmentSchema } from '@/lib/schemas';
import { useSession } from 'next-auth/react';
import { z } from 'zod';

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const AssignmentAll = () => {
  const {
    data: assignments,
    error,
    isLoading,
  } = useData('/api/assignment', z.array(AssignmentSchema));
  const { data: session, status } = useSession();

  if (isLoading || !assignments || !session?.user?.id) {
    return <QuestionSkeltonLoading title={'課題共有'} subtitle={'すべて'} />;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <AssignmnetSharePage
      currentUserId={session.user.id}
      assignments={assignments}
      title={'課題共有'}
      target={'すべて'}
    />
  );
};

export default AssignmentAll;
