import KebabMenu from '@/components/element/KebabMenu';
import { AddReplyModal } from '@/components/timeline/AddReplyModal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDeletePost } from '@/hooks/DeleteContent/useDeletePost';
import { usePostLike } from '@/hooks/Like/usePostLike';
import { Like, Reply } from '@/lib/types';
import { Heart, MessageCircleReply, MoreVertical } from 'lucide-react';
import { useState } from 'react';

type PostBottomItemsProps = {
  replies: Reply[];
  likes: Like[];
  postId: string;
  currentUserId: string;
  postAuthorId: string;
};

const PostBottomItems: React.FC<PostBottomItemsProps> = ({
  replies,
  postId,
  currentUserId,
  postAuthorId,
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

  const handleDeletePost = useDeletePost();

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
        <Dialog>
          <DialogTrigger>{likesCount}</DialogTrigger>
          <DialogContent className='rounded-md'>
            <DialogHeader>
              <DialogTitle>いいねしているユーザー</DialogTitle>
              <DialogDescription className='p-0'>
                <ScrollArea className='h-[300px] w-full rounded-md p-4'>
                  Jokester began sneaking into the castle in the middle of the night and leaving
                  jokes all over the place: under the kins pillow, in his soup, even in the royal
                  toilet. The king was furious, but he t seem to stop Jokester. And then, one day,
                  the people of the kingdom discovered that the jokes left by Jokester were so funny
                  that they couldnt help but laugh. And once they started laughing, they couldt
                  stop. Jokester began sneaking into the castle in the middle of the night
                </ScrollArea>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
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
