import { useDeadline } from '@/hooks/useDeadline';
import { useRelativeTime } from '@/hooks/useRelativeTime';
import { Calendar } from 'lucide-react';
import TextContent from '../element/TextContent';

type AssignmentPostProps = {
  assignmentId: string;
  title: string;
  description: string;
  deadline: string;
  timestamp: string;
  assignmentAuthorId: string;
  assignmentAuthorName: string;
  assignmentAuthorClerkId: string;
  assignmentAuthorIntroduction: string;
};

const AssignmentPost = ({
  assignmentId,
  title,
  description,
  deadline,
  timestamp,
  assignmentAuthorId,
  assignmentAuthorName,
  assignmentAuthorClerkId,
  assignmentAuthorIntroduction,
}: AssignmentPostProps) => {
  const timeAgo = useRelativeTime(timestamp);
  const limited = useDeadline(deadline);
  return (
    <div className='relative mb-4 w-11/12 rounded-lg bg-white p-6 shadow'>
      <div className='flex justify-between'>
        <div>
          <h2 className='mb-1 pr-20 text-xl font-bold text-gray-800'>{title}</h2>
          <p className='mb-3 text-sm text-gray-500'>{assignmentAuthorName}さん</p>
        </div>
        <p className='mr-1 whitespace-nowrap text-sm text-gray-500'>{timeAgo}</p>
      </div>
      <TextContent textContent={description} />
      <div className='mt-4 items-center text-sm'>
        <div className='flex items-center'>
          <Calendar size={20} className='mr-1 text-red-500' />
          {limited === 'over' ? (
            <p className='text-base font-bold text-red-500'>締め切りを過ぎています！！！</p>
          ) : (
            <p className='text-base font-bold text-red-500'>あと{limited}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentPost;
