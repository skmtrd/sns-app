import { Calendar } from 'lucide-react';

type AssignmentPostProps = {
  assignmentId: string;
  title: string;
  description: string;
  deadline: string;
  authorName: string;
  authorId: string;
  authorClerkId: string;
  authorIntroduction: string;
  createdAt: string;
  // tags: { id: string; name: string }[];
};

const AssignmentPost = ({
  assignmentId,
  title,
  description,
  deadline,
  authorName,
  authorId,
  authorClerkId,
  authorIntroduction,
  createdAt,
  // tags,
}: AssignmentPostProps) => {
  return (
    <div className='relative mb-4 w-11/12 rounded-lg bg-white p-6 shadow-md'>
      <h2 className='mb-1 pr-20 text-xl font-bold text-gray-800'>{title}</h2>
      <p className='mb-3 text-sm text-gray-500'>{authorName}</p>
      <p className='mb-3 break-words text-black'>{description}</p>
      <div className='items-center text-sm text-red-500'>
        <div className='flex items-center'>
          <Calendar size={14} className='mr-1' />
          <p>{deadline}</p>
        </div>
        <p>あと３日</p>
      </div>
    </div>
  );
};

export default AssignmentPost;
