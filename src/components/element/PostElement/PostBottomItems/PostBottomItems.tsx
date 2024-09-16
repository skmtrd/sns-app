import { AddReplyModal } from '@/components/timeline/AddReplyModal';
import { usePostLike } from '@/hooks/Like/usePostLike';
import { Like, Reply } from '@/lib/types';
import { Heart, MessageCircleReply, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import KebabMenu from '../../KebabMenu';

type PostBottomItemsProps = {
  replies: Reply[];
  likes: Like[];
  postId: string;
  currentUserId: string;
  postAuthorId: string;
  handleDeletePost: Promise<(postId: string) => Promise<void>>;
};

const PostBottomItems: React.FC<PostBottomItemsProps> = ({
  replies,
  postId,
  currentUserId,
  postAuthorId,
  handleDeletePost,
  likes,
}) => {
  const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  const { likesCount, isLiked, handleToggleLike } = usePostLike(likes, currentUserId);

  const handleToggleKebabMenu = () => {
    setIsKebabMenuOpen(!isKebabMenuOpen);
  };

  const handleToggleReplyModal = () => {
    setIsReplyModalOpen(!isReplyModalOpen);
  };

  return (
    <div className='relative flex w-full items-center justify-between'>
      {isReplyModalOpen && <AddReplyModal closeModal={handleToggleReplyModal} postId={postId} />}
      <div onClick={(e) => e.stopPropagation()} className='flex items-center justify-center gap-2'>
        <button
          onClick={() => handleToggleReplyModal()}
          className='flex items-center justify-center rounded-full bg-blue-400 px-4 py-2 text-white transition-all hover:bg-blue-600 hover:shadow-lg'
        >
          <MessageCircleReply size={20} />
          <span className='ml-1'>
            {replies.filter((reply) => reply.parentReplyId === null).length}
          </span>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleToggleLike(postId);
          }}
        >
          <Heart size={20} color={'#dc143c'} fill={isLiked ? '#dc143c' : 'white'} />
        </button>
        <span>{likesCount}</span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsKebabMenuOpen(!isKebabMenuOpen);
        }}
        className='text-gray-500 hover:text-gray-700'
      >
        <MoreVertical size={20} fill='red' />
      </button>
      {isKebabMenuOpen && (
        <KebabMenu
          currentUserId={currentUserId}
          authorUserId={postAuthorId}
          contentId={postId}
          handleDelete={handleDeletePost}
        />
      )}
    </div>
  );
};

export default PostBottomItems;
