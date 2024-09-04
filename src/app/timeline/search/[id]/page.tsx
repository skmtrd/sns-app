'use client';
import TimelineSkeltonLoading from '@/components/loading/TimelineSkeltonLoading';
import TimeLinePage from '@/components/timeline/TimeLinePage';
import useData from '@/hooks/useData';
import { containsAllWords } from '@/lib/containAllWords';
import { PostSchema } from '@/lib/schemas';
import { useAuth } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { z } from 'zod';

const TimelineSearched = () => {
  const pathName = usePathname();
  const searchedWord = decodeURIComponent(pathName.split('/search/')[1]).trim();
  const searchWords = searchedWord.split(' ').filter((term) => term.trim() !== '');
  const { userId: currentClerkId } = useAuth();
  const { data: posts, error, isLoading } = useData('/api/post', z.array(PostSchema));

  if (isLoading || !posts || !currentClerkId) {
    return <TimelineSkeltonLoading title={'検索'} subtitle={`検索-"${searchWords}"`} />;
  }

  const filteredPosts = posts.filter((post) => containsAllWords(post.content, searchWords));

  return (
    <TimeLinePage
      posts={filteredPosts}
      currentClerkId={currentClerkId}
      title={'タイムライン'}
      target={`ワード検索-"${searchWords}"`}
    />
  );
};

export default TimelineSearched;
