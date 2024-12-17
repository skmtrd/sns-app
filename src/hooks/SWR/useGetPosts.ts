import { getPosts } from '@/app/actions/getPosts';
import { Post } from '@prisma/client';
import useSWR from 'swr';

export const useGetPosts = (shouldPolling: boolean, initialPosts: Post[]) => {
  const { data, error, isLoading, mutate } = useSWR(shouldPolling ? 'getPosts' : null, getPosts, {
    refreshInterval: 10000,
    revalidateOnFocus: true,
    fallback: initialPosts,
  });
  return { data, error, isLoading, mutate };
};
