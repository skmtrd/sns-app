'use client';
import TimelineSkeltonLoading from '@/components/loading/TimelineSkeltonLoading';
import TimeLinePage from '@/components/timeline/TimeLinePage';
import useData from '@/hooks/useData';
import { postSchema } from '@/lib/schemas';
import { useAuth } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

const TagFilteredTimeline = () => {
  const { data: posts, error, isLoading } = useData('/api/post', postSchema);
  const { userId: currentClerkId } = useAuth();
  const tagId = usePathname().split('/timeline/')[1];

  if (isLoading || !posts || !currentClerkId) {
    return <TimelineSkeltonLoading title={'検索'} subtitle={'...'} />;
  }

  const filteredPosts = posts.filter((post) => post.author.tags?.some((tag) => tag.id === tagId));
  const filteredTagName = filteredPosts[0].author.tags?.find((tag) => tag.id === tagId)?.name;

  return (
    <TimeLinePage
      posts={filteredPosts}
      currentClerkId={currentClerkId}
      title={'タイムライン'}
      target={`タグ検索-"${filteredTagName}"`}
    />
  );
};

export default TagFilteredTimeline;
