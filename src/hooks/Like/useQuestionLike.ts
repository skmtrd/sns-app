import { bookmarkQuestion, unBookmarkQuestion } from '@/app/actions/like/bookmarkQuestion';
import { Like } from '@/lib/types';
import { useState } from 'react';
import { mutate } from 'swr';

export const useQuestionLike = (likes: Like[], currentUserId: string) => {
  const [likesCount, setLikesCount] = useState(likes.length);
  const [isLiked, setIsLiked] = useState(likes.some((like) => like.user.id === currentUserId));
  const [isLiking, setIsLiking] = useState(false);

  const handleToggleLike = async (questionId: string) => {
    if (isLiking) return;

    setIsLiking(true);
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);

    try {
      if (isLiked) {
        await unBookmarkQuestion(questionId);
      } else {
        await bookmarkQuestion(questionId);
      }
    } catch (error) {
      setIsLiked(isLiked);
      setLikesCount(likesCount);
    } finally {
      setIsLiking(false);
      mutate('getQuestions');
    }
  };

  return { likesCount, isLiked, isLiking, handleToggleLike };
};
