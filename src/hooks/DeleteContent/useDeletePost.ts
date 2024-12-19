import { deletePost } from '@/app/actions/delete/delete';
import { useGetPosts } from '../SWR/useGetPosts';

export const useDeletePost = async () => {
  const { data: posts, mutate } = useGetPosts(true, []);
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
