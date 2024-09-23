import { useDeadline } from '@/hooks/useDeadline';
import { useRelativeTime } from '@/hooks/useRelativeTime';
import { Assignment } from '@/lib/types';
import { useState } from 'react';
import AssignmentPostBottomItems from './AssignmentPostElements/AssignmentPostButtonItems/AssignmentPostBottomItems';
import AssignmentPostHeader from './AssignmentPostElements/AssignmentPostHeader/AssignmentPostHeader';
import AssignmentPostMain from './AssignmentPostElements/AssignmentPostMain/AssignmentPostMain';
import Image from 'next/image';
import { POST_IMAGE_BASE_URL } from '@/lib/constants';

type AssignmentPostProps = {
  assignment: Assignment;
  handleDeleteAssignment: Promise<(assignmentId: string) => Promise<void>>;
  currentUserId: string;
};

const AssignmentPost = ({
  assignment,
  handleDeleteAssignment,
  currentUserId,
}: AssignmentPostProps) => {
  const timeAgo = useRelativeTime(assignment.createdAt);
  const limited = useDeadline(assignment.deadLine);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //ここら辺はコンポーネントに移植
  const [year, month, day] = assignment.deadLine.split('/')[0].split('-');
  const [hour, minute] = assignment.deadLine.split('/')[1].split(':');
  const deadlineContent = `${year}年${month}月${day}日 ${hour}時${minute}分`;

  //useLikeはコンポーネントに移植

  return (
    <div className='relative mb-4 w-11/12 rounded-lg bg-white p-6 shadow hover:bg-slate-50'>
      <AssignmentPostHeader
        title={assignment.title}
        name={assignment.author.name}
        timeAgo={timeAgo}
      />
      <div className='h-5' />
      <AssignmentPostMain
        deadlineContent={deadlineContent}
        limited={limited}
        description={assignment.description}
        imageUrl={assignment.imageUrl ? `${POST_IMAGE_BASE_URL}${assignment.imageUrl}` : null}
      />

      <div className='h-5' />
      <AssignmentPostBottomItems
        currentUserId={currentUserId}
        assignmentId={assignment.id}
        assignmentAuthorId={assignment.author.id}
        handleDeleteAssignment={handleDeleteAssignment}
        likes={assignment.likes}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      />
    </div>
  );
};

export default AssignmentPost;
