'use client';
import Header from '@/components/element/Header';
import FixedHeader from '@/components/layout/FixedHeader';
import { Post } from '@/components/timeline/Post';
import useData from '@/hooks/useData';
import { LoaderCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { toHiragana } from 'wanakana';
import { z } from 'zod';

export const postSchema = z
  .object({
    author: z.object({
      name: z.string(),
      id: z.string(),
      clerkId: z.string(),
      tags: z.array(z.object({ name: z.string(), id: z.string() })),
      introduction: z.string(),
    }),
    createdAt: z.string(),
    id: z.string(),
    content: z.string(),
    avatar: z.string(),
    likes: z.array(
      z.object({ author: z.object({ name: z.string(), clerkId: z.string(), id: z.string() }) }),
    ),
    replies: z.array(
      z.object({
        id: z.string(),
        content: z.string(),
        author: z.object({ name: z.string(), id: z.string(), clerkId: z.string() }),
      }),
    ),
  })
  .array();

const TimelineAll = () => {
  const pathName = usePathname();
  const searchedWord = decodeURIComponent(pathName.split('/search/')[1]).trim();
  let firstWord = '';
  let secondWord = '';
  if (searchedWord.includes(' ')) {
    firstWord = searchedWord.split(' ')[0];
    secondWord = searchedWord.split(' ')[1];
  }
  console.log(firstWord);
  console.log(secondWord);
  console.log(searchedWord);
  const hiraganaSearchWord = toHiragana(searchedWord);
  const { data, error, isLoading } = useData('/api/post', postSchema);

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading || !data) {
    return (
      <div className='flex h-svh w-full flex-1 grow flex-col items-center justify-center gap-4 bg-gray-100'>
        <LoaderCircle size='64' className='animate-spin text-blue-600' />
        ロード中...
      </div>
    );
  }

  const posts = data;
  const filteredPosts = posts.filter(
    (post) =>
      post.content.includes(hiraganaSearchWord) ||
      post.content.includes(searchedWord) ||
      (post.content.includes(firstWord) && post.content.includes(secondWord)),
  );

  return (
    <div className='flex w-full flex-1 grow flex-col items-center gap-4 overflow-y-scroll bg-gray-100'>
      <FixedHeader title={'検索'} target={searchedWord} />
      <Header title={''} />
      <div className='flex w-full grow flex-col items-center gap-y-4 p-3'>
        {filteredPosts.length === 0 ? (
          <p>検索結果がありません</p>
        ) : (
          filteredPosts.map((post, index) => (
            <Post
              key={index}
              username={post.author.name}
              clerkId={post.author.clerkId}
              id={post.author.id}
              timestamp={post.createdAt}
              content={post.content}
              tags={post.author.tags}
              postId={post.id}
              avatar={post.avatar}
              likes={post.likes}
              replyCount={0}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TimelineAll;
