'use client';
import Header from '@/components/element/Header';
import FixedHeader from '@/components/layout/FixedHeader';
import TimelineSkeltonLoading from '@/components/loading/TimelineSkeltonLoading';
import { Post } from '@/components/timeline/Post';
import useData from '@/hooks/useData';
import { deletePost } from '@/lib/deleteRequests';
import { postSchema } from '@/lib/schemas';
import { scrollToTop } from '@/lib/scrollToTop';
import { usePathname } from 'next/navigation';
import { useSWRConfig } from 'swr';
import { toHiragana } from 'wanakana';

const SearchedTimeline = () => {
  const pathName = usePathname();
  const searchedWord = decodeURIComponent(pathName.split('/search/')[1]).trim();
  const searchWords = searchedWord.split(' ').filter((term) => term.trim() !== '');
  const containsAllWords = (content: string, searchTerms: string[]): boolean => {
    const hiraganaContent = toHiragana(content);
    return searchTerms.every(
      (term) => hiraganaContent.includes(toHiragana(term)) || content.includes(term),
    );
  };
  console.log(searchedWord);
  const { mutate } = useSWRConfig();
  const { data: posts, error, isLoading } = useData('/api/post', postSchema);

  if (error && error.status === 429) {
    setTimeout(() => {
      mutate(`/api/post`);
    }, 2000);
  } else if (error) {
    return <div>Error</div>;
  }

  if (isLoading || !posts) {
    return <TimelineSkeltonLoading title={'検索'} subtitle={'...'} />;
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
    <div className='flex w-full flex-1 grow flex-col items-center gap-4 overflow-y-scroll bg-gray-100'>
      <FixedHeader title={'検索'} target={searchedWord} scrollToTop={scrollToTop} />
      <Header title={''} />
      <div className='flex w-full grow flex-col items-center gap-y-4 p-3'>
        {filteredPosts.length === 0 ? (
          <p>検索結果に一致するポストがありません</p>
        ) : (
          filteredPosts.map((post) => (
            <Post
              key={post.id}
              postId={post.id}
              postContent={post.content}
              timestamp={post.createdAt}
              likes={post.likes}
              replyCount={post.replies.filter((reply) => reply.parentReplyId === null).length}
              postAuthorName={post.author.name}
              postAuthorId={post.author.id}
              postAuthorClerkId={post.author.clerkId}
              postAuthorIntroduction={post.author.introduction}
              postAuthorTags={post.author.tags}
              postAuthorAvatar={post.avatar}
              handleDeletePost={handleDeletePost}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchedTimeline;
