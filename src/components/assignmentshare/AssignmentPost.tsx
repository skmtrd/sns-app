import { useDeadline } from '@/hooks/useDeadline';
import { useRelativeTime } from '@/hooks/useRelativeTime';
import { addAssignmentLike, deleteAssignmentLike } from '@/lib/likeRequests';
import { BookmarkPlus, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import KebabMenu from '../element/KebabMenu';
import TextContent from '../element/TextContent';

type AssignmentPostProps = {
  assignmentId: string;
  title: string;
  description: string;
  deadline: string;
  timestamp: string;
  likes: { user: { name: string; clerkId: string; id: string } }[];
  assignmentAuthorId: string;
  assignmentAuthorName: string;
  assignmentAuthorClerkId: string;
  assignmentAuthorIntroduction: string;
  handleDeleteAssignment: (e: React.MouseEvent<HTMLButtonElement>, assignmentId: string) => void;
  currentClerkId: string;
};

const AssignmentPost = ({
  assignmentId,
  title,
  description,
  deadline,
  timestamp,
  likes,
  assignmentAuthorId,
  assignmentAuthorName,
  assignmentAuthorClerkId,
  assignmentAuthorIntroduction,
  handleDeleteAssignment,
  currentClerkId,
}: AssignmentPostProps) => {
  const timeAgo = useRelativeTime(timestamp);
  const limited = useDeadline(deadline);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(
    likes.some((like) => like.user.clerkId === currentClerkId),
  );
  const [isLiking, setIsLiking] = useState(false);

  const [year, month, day] = deadline.split('/')[0].split('-');
  const [hour, minute] = deadline.split('/')[1].split(':');
  const deadlineContent = `${year}年${month}月${day}日 ${hour}時${minute}分`;

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    setIsLiked(!isLiked);

    try {
      isLiked ? await deleteAssignmentLike(assignmentId) : await addAssignmentLike(assignmentId);
    } catch (error) {
      setIsLiked(isLiked);
    } finally {
      setIsLiking(false);
    }
  };

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
        <p className='text-base text-red-500'>{deadlineContent}まで</p>
        <div className='flex items-center'>
          {limited === 'over' ? (
            <p className='text-base font-bold text-red-500'>締め切りを過ぎています！！！</p>
          ) : (
            <p className='text-base font-bold text-red-500'>あと{limited}</p>
          )}
        </div>
      </div>
      <div className='relative mt-3 flex justify-between text-blue-600'>
        <button onClick={handleLike}>
          {isLiked ? (
            <BookmarkPlus size={27} fill={'rgb(37 99 235)'} />
          ) : (
            <BookmarkPlus size={27} />
          )}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsDropdownOpen(!isDropdownOpen);
          }}
          className='text-gray-500 hover:text-gray-700'
        >
          <MoreVertical size={20} fill='red' />
        </button>
        {isDropdownOpen && (
          <KebabMenu
            currentClerkId={currentClerkId}
            authorClerkId={assignmentAuthorClerkId}
            contentId={assignmentId}
            handleDelete={handleDeleteAssignment}
          />
        )}
      </div>
    </div>
  );
};

export default AssignmentPost;
