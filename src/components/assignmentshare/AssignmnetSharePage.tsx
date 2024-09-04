import { useDeleteAssignment } from '@/hooks/DeleteContent/useDeleteAssignment';
import { scrollToTop } from '@/lib/scrollToTop';
import { Assignment } from '@/lib/types';
import FixedHeader from '../layout/FixedHeader';
import AssignmentPost from './AssignmentPost';

type AssignmnetSharePageProps = {
  assignments: Assignment[];
  currentClerkId: string;
  title: string;
  target: string | null;
};

const AssignmnetSharePage: React.FC<AssignmnetSharePageProps> = ({
  assignments,
  currentClerkId,
  title,
  target,
}) => {
  const handleDeleteAssignment = useDeleteAssignment(assignments);
  return (
    <div
      id='mainContent'
      className='flex w-full flex-1 grow flex-col items-center overflow-y-scroll bg-gray-100'
    >
      <FixedHeader title={title} target={target} scrollToTop={scrollToTop} />
      <div className='mx-auto mt-10 w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center space-y-6'>
          {assignments.map((assignment) => (
            <AssignmentPost
              key={assignment.id}
              assignment={assignment}
              currentClerkId={currentClerkId}
              handleDeleteAssignment={handleDeleteAssignment}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssignmnetSharePage;
