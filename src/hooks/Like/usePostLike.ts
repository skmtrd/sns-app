import { likePost, unLikePost } from '@/app/actions/like/likePost';
import { Like } from '@/lib/types';
import { useState } from 'react';
import { mutate } from 'swr';

export const usePostLike = (likes: Like[], currentUserId: string) => {
  const [likesCount, setLikesCount] = useState(likes.length);
  const [isLiked, setIsLiked] = useState(likes.some((like) => like.user.id === currentUserId));
  const [isLiking, setIsLiking] = useState(false);

  const handleToggleLike = async (postId: string) => {
    if (isLiking) return;

    setIsLiking(true);
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);

    try {
      if (isLiked) {
        await unLikePost(postId);
      } else {
        await likePost(postId);
      }
    } catch (error) {
      setIsLiked(isLiked);
      setLikesCount(likesCount);
    } finally {
      setIsLiking(false);
      mutate('getPosts');
    }
  };

  return { likesCount, isLiked, isLiking, handleToggleLike };
};
