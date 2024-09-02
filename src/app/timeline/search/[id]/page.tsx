'use client';
import TimelineSkeltonLoading from '@/components/loading/TimelineSkeltonLoading';
import TimeLinePage from '@/components/timeline/TimeLinePage';
import useData from '@/hooks/useData';
import { containsAllWords } from '@/lib/containAllWords';
import { deletePost } from '@/lib/deleteRequests';
import { postSchema } from '@/lib/schemas';
import { useAuth } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { useSWRConfig } from 'swr';

const TimelineSearched = () => {
  const pathName = usePathname();
  const searchedWord = decodeURIComponent(pathName.split('/search/')[1]).trim();
  const searchWords = searchedWord.split(' ').filter((term) => term.trim() !== '');
  const { userId: currentClerkId } = useAuth();
  const { mutate } = useSWRConfig();
  const { data: posts, error, isLoading } = useData('/api/post', postSchema);

  if (error && error.status === 429) {
    setTimeout(() => {
      mutate(`/api/post`);
    }, 2000);
  } else if (error) {
    return <div>Error</div>;
  }

  if (isLoading || !posts || !currentClerkId) {
    return <TimelineSkeltonLoading title={'検索'} subtitle={`検索-"${searchWords}"`} />;
  }

  const handleDeletePost = async (e: React.MouseEvent<HTMLButtonElement>, postId: string) => {
    e.stopPropagation();
    if (!posts) return;
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

  const filteredPosts = posts.filter((post) => containsAllWords(post.content, searchWords));

  return (
    <TimeLinePage
      posts={filteredPosts}
      handleDeletePost={handleDeletePost}
      currentClerkId={currentClerkId}
      title={'タイムライン'}
      target={`ワード検索-"${searchWords}"`}
    />
  );
};

export default TimelineSearched;
