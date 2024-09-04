'use client';
import AssignmnetSharePage from '@/components/assignmentshare/AssignmnetSharePage';
import QuestionSkeltonLoading from '@/components/loading/QuestionSkeltonLoading';
import useData from '@/hooks/useData';
import { AssignmentSchema } from '@/lib/schemas';
import { useAuth } from '@clerk/nextjs';
import { useSWRConfig } from 'swr';
import { z } from 'zod';

const AssignmentAll = () => {
  const { mutate } = useSWRConfig();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { userId: currentClerkId } = useAuth();
  const {
    data: assignments,
    error,
    isLoading,
  } = useData(`/api/assignment`, z.array(AssignmentSchema));

  if (isLoading) {
    return <QuestionSkeltonLoading title={'課題共有'} subtitle={'すべて'} />;
  }
  if (error || !assignments || !currentClerkId) {
    return <div>Error</div>;
  }

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.likes.some((like) => like.user.clerkId === currentClerkId),
  );
  return (
    <AssignmnetSharePage
      currentClerkId={currentClerkId}
      assignments={filteredAssignments}
      title={'登録した課題'}
      target={null}
    />
  );
};

export default AssignmentAll;
