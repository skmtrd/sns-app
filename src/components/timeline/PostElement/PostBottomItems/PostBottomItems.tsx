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
import { ICON_IMAGE_BASE_URL } from '@/lib/constants';
import { Like, Reply } from '@/lib/types';
import { Heart, MessageCircleReply, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import PostIcon from '../PostHeader/PostIcon';

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
                <ScrollArea className='h-[300px] w-full rounded-md px-10 py-7'>
                  {likes.length === 0 && <p>いいねしているユーザーはいません</p>}
                  {likes.length > 0 && (
                    <div className='flex w-full flex-col justify-center gap-4'>
                      {likes.map((like) => (
                        <div key={like.user.id} className='flex items-center gap-4'>
                          <PostIcon
                            src={
                              like.user.iconUrl
                                ? `${ICON_IMAGE_BASE_URL}${like.user.iconUrl}`
                                : like.user.image
                                  ? like.user.image
                                  : ''
                            }
                          />
                          <div className='flex flex-col items-start'>
                            <p className='text-black'>{like.user.name}</p>
                            <p>@{like.user.id}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
