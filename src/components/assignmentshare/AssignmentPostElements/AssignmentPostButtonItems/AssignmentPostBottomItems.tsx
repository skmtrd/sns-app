import KebabMenu from '@/components/element/KebabMenu';
import { useAssignmentLike } from '@/hooks/Like/useAssignmentLike';
import { Like } from '@/lib/types';
import { Folder, FolderOpen, MoreVertical } from 'lucide-react';

type Props = {
  likes: Like[];
  currentUserId: string;
  handleDeleteAssignment: Promise<(postId: string) => Promise<void>>;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isDropdownOpen: boolean) => void;
  assignmentId: string;
  assignmentAuthorId: string;
};

const AssignmentPostBottomItems: React.FC<Props> = ({
  likes,
  currentUserId,
  handleDeleteAssignment,
  isDropdownOpen,
  setIsDropdownOpen,
  assignmentId,
  assignmentAuthorId,
}) => {
  const { likesCount, isLiked, isLiking, handleToggleLike } = useAssignmentLike(
    likes,
    currentUserId,
  );

  return (
    <div className='relative mt-3 flex justify-between text-blue-600'>
      <button onClick={() => handleToggleLike(assignmentId)}>
        {isLiked ? <Folder size={27} fill={'rgb(37 99 235)'} /> : <FolderOpen size={27} />}
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
          currentUserId={currentUserId}
          authorUserId={assignmentAuthorId}
          contentId={assignmentId}
          handleDelete={handleDeleteAssignment}
        />
      )}
    </div>
  );
};

export default AssignmentPostBottomItems;
