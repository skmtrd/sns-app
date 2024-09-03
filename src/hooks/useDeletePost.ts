import { useSWRConfig } from 'swr';
import { deletePost } from '../lib/deleteRequests';
import { Post } from '../lib/types';

export const useDeletePost = async (posts: Post[]) => {
  const { mutate } = useSWRConfig();
  const handleDeletePost = async (postId: string) => {
    const optimisticData = posts.filter((post) => post.id !== postId);
    try {
      await mutate(
        '/api/post',
        async () => {
          await deletePost(postId);
          return optimisticData;
        },
        {
          optimisticData,
          revalidate: false,
          populateCache: true,
          rollbackOnError: true,
        },
      );
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };
  return handleDeletePost;
};
