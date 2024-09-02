'use client';
import TimelineSkeltonLoading from '@/components/loading/TimelineSkeltonLoading';
import TimeLinePage from '@/components/timeline/TimeLinePage';
import useData from '@/hooks/useData';
import { deletePost } from '@/lib/deleteRequests';
import { postSchema } from '@/lib/schemas';
import { useAuth } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { useSWRConfig } from 'swr';

const TagFilteredTimeline = () => {
  const { mutate } = useSWRConfig();
  const { data: posts, error, isLoading } = useData('/api/post', postSchema);
  const { userId: currentClerkId } = useAuth();
  const tagId = usePathname().split('/timeline/')[1];

  if (error && error.status === 429) {
    setTimeout(() => {
      mutate(`/api/post`);
    }, 2000);
  } else if (error) {
    return <div>Error</div>;
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

  if (isLoading || !posts || !currentClerkId) {
    return <TimelineSkeltonLoading title={'検索'} subtitle={'...'} />;
  }

  const filteredPosts = posts.filter((post) => post.author.tags?.some((tag) => tag.id === tagId));
  const filteredTagName = filteredPosts[0].author.tags?.find((tag) => tag.id === tagId)?.name;

  return (
    <TimeLinePage
      posts={filteredPosts}
      handleDeletePost={handleDeletePost}
      currentClerkId={currentClerkId}
      title={'タイムライン'}
      target={`タグ検索-"${filteredTagName}"`}
    />
  );
};

export default TagFilteredTimeline;
