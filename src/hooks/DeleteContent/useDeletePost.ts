import { getPosts } from '@/app/actions/getPosts';
import useSWR from 'swr';
import { deletePost } from '../../lib/deleteRequests';

export const useDeletePost = async () => {
  const { data: posts, mutate } = useSWR('getPosts', getPosts);
  const handleDeletePost = async (postId: string) => {
    if (!posts) return;
    const optimisticData = posts.filter((post) => post.id !== postId);
    try {
      await mutate(
        async () => {
          await deletePost(postId);
          return optimisticData;
        },
        {
          optimisticData,
        },
      );
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };
  return handleDeletePost;
};
