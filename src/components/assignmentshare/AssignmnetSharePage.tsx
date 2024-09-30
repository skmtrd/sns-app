'use client';

import { getAssignments } from '@/app/actions/getAssignmnets';
import { Assignment } from '@/lib/types';
import useSWR from 'swr';
import FixedHeader from '../layout/FixedHeader';
import QuestionSkeltonLoading from '../loading/QuestionSkeltonLoading';
import AssignmentPost from './AssignmentPost';

type AssignmnetSharePageProps = {
  initialAssignments: Assignment[];
  currentUserId: string;
  title: string;
  target: string | null;
  shouldPolling: boolean;
};

const AssignmnetSharePage: React.FC<AssignmnetSharePageProps> = ({
  initialAssignments,
  currentUserId,
  title,
  target,
  shouldPolling,
}) => {
  const { data, error, isLoading } = useSWR(
    shouldPolling ? 'getAssignments' : null,
    getAssignments,
    {
      refreshInterval: 10000,
      fallback: initialAssignments,
    },
  );
  const assignments = data || initialAssignments;
  if (!assignments || isLoading)
    return <QuestionSkeltonLoading title={'課題共有'} subtitle={'すべて'} />;
  return (
    <div
      id='mainContent'
      className='flex w-full flex-1 grow flex-col items-center overflow-y-scroll bg-gray-100'
    >
      <FixedHeader title={title} target={target} />
      <div className='mx-auto mt-10 w-full max-w-5xl py-8 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center space-y-6'>
          {assignments.map((assignment) => (
            <AssignmentPost
              key={assignment.id}
              assignment={assignment}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssignmnetSharePage;
