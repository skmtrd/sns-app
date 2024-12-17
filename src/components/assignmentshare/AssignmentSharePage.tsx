'use client';

import { useGetAssignment } from '@/hooks/SWR/useGetAssignment';
import { useTagTab } from '@/hooks/useTagTab';
import { Assignment, Profile } from '@/lib/types';
import FixedHeader from '../layout/FixedHeader';
import QuestionSkeltonLoading from '../loading/QuestionSkeltonLoading';
import AssignmentPost from './AssignmentPost';

type AssignmnetSharePageProps = {
  initialAssignments: Assignment[];
  currentUserId: string;
  shouldPolling: boolean;
  userInfo: Profile;
};

const AssignmnetSharePage: React.FC<AssignmnetSharePageProps> = ({
  initialAssignments,
  currentUserId,
  shouldPolling,
  userInfo,
}) => {
  const { data, error, isLoading } = useGetAssignment(shouldPolling, initialAssignments);
  const assignments = data || initialAssignments;
  const { currentTagId, handleTagClick } = useTagTab();

  const filteredAssignments =
    currentTagId === 'all'
      ? assignments
      : assignments.filter((assignment) =>
          assignment.author.tags?.some((tag) => tag.id === currentTagId),
        );

  if (!assignments || isLoading)
    return <QuestionSkeltonLoading title={'課題共有'} subtitle={'すべて'} />;

  return (
    <div
      id='mainContent'
      className='flex w-full flex-1 grow flex-col items-center overflow-y-scroll bg-gray-100'
    >
      <FixedHeader
        userInfo={userInfo}
        handleTagClick={handleTagClick}
        currentTagId={currentTagId}
      />
      <div className='mx-auto mt-16 w-full max-w-5xl py-8 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center space-y-6'>
          {filteredAssignments.map((assignment) => (
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
