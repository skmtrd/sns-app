'use client';
import AssignmnetSharePage from '@/components/assignmentshare/AssignmnetSharePage';
import QuestionSkeltonLoading from '@/components/loading/QuestionSkeltonLoading';
import useData from '@/hooks/useData';
import { AssignmentSchema } from '@/lib/schemas';
import { useSession } from 'next-auth/react';
import { z } from 'zod';

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const AssignmentAll = () => {
  const { data: session, status } = useSession();
  const {
    data: assignments,
    error,
    isLoading,
  } = useData(`/api/assignment`, z.array(AssignmentSchema));

  if (isLoading) {
    return <QuestionSkeltonLoading title={'課題共有'} subtitle={'すべて'} />;
  }
  if (error || !assignments || !session?.user?.id) {
    return <div>Error</div>;
  }

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.likes.some((like) => like.user.id === session?.user?.id),
  );
  return (
    <AssignmnetSharePage
      currentUserId={session?.user?.id}
      assignments={filteredAssignments}
      title={'登録した課題'}
      target={null}
    />
  );
};

export default AssignmentAll;
