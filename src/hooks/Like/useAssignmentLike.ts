import { addAssignmentLike, deleteAssignmentLike } from '@/lib/likeRequests';
import { Like } from '@/lib/types';
import { useState } from 'react';

export const useAssignmentLike = (likes: Like[], currentUserId: string) => {
  const [likesCount, setLikesCount] = useState(likes.length);
  const [isLiked, setIsLiked] = useState(likes.some((like) => like.user.id === currentUserId));
  const [isLiking, setIsLiking] = useState(false);

  const handleToggleLike = async (assignmentId: string) => {
    if (isLiking) return;

    setIsLiking(true);
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);

    try {
      if (isLiked) {
        await deleteAssignmentLike(assignmentId);
      } else {
        await addAssignmentLike(assignmentId);
      }
    } catch (error) {
      setIsLiked(isLiked);
      setLikesCount(likesCount);
    } finally {
      setIsLiking(false);
    }
  };

  return { likesCount, isLiked, isLiking, handleToggleLike };
};
