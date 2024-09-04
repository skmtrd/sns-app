'use client';
import AssignmnetSharePage from '@/components/assignmentshare/AssignmnetSharePage';
import QuestionSkeltonLoading from '@/components/loading/QuestionSkeltonLoading';
import useData from '@/hooks/useData';
import { AssignmentSchema } from '@/lib/schemas';
import { useAuth } from '@clerk/nextjs';
import { z } from 'zod';

const AssignmentAll = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const {
    data: assignments,
    error,
    isLoading,
  } = useData('/api/assignment', z.array(AssignmentSchema));
  const { userId: currentClerkId } = useAuth();

  if (isLoading) {
    return <QuestionSkeltonLoading title={'課題共有'} subtitle={'すべて'} />;
  }
  if (error || !assignments || !currentClerkId) {
    return <div>Error</div>;
  }

  return (
    <AssignmnetSharePage
      currentClerkId={currentClerkId}
      assignments={assignments}
      title={'課題共有'}
      target={'すべて'}
    />
  );
};

export default AssignmentAll;
