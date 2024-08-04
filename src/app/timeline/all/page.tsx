'use client';
import Header from '@/components/element/Header';
import TimeLineHeader from '@/components/layout/TimeLineHeader';
import { Post } from '@/components/timeline/Post';
import { Loader2 } from 'lucide-react';
import useSWR from 'swr';
import { z } from 'zod';

export const postSchema = z.object({
  author: z.object({
    name: z.string(),
    id: z.string(),
    clerkId: z.string(),
    tags: z.array(z.object({ name: z.string(), id: z.string() })),
  }),
  createdAt: z.string(),
  id: z.string(),
  content: z.string(),
});

const TimelineAll = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR('/api/post', fetcher, {
    refreshInterval: 20000,
    revalidateOnFocus: true,
  });

  if (isLoading) {
    return (
      <div className='flex h-svh w-full flex-1 grow flex-col items-center justify-center gap-4 bg-gray-100'>
        <Loader2 size='64' className='animate-spin text-blue-600' />
        ロード中...
      </div>
    );
  }
  if (error) {
    return <div>Error</div>;
  }

  const posts = postSchema.array().parse(data.data);

  return (
    <div className='flex w-full flex-1 grow flex-col items-center gap-4 overflow-y-scroll bg-gray-100'>
      <TimeLineHeader target={'すべて'} />
      <Header title={''} />
      <div className='flex w-full grow flex-col items-center gap-y-4 p-3'>
        {posts.map((post, index) => (
          <Post
            key={index}
            username={post.author.name}
            clerkId={post.author.clerkId}
            id={post.author.id}
            timestamp={post.createdAt}
            content={post.content}
            tags={post.author.tags}
            postId={post.id}
          />
        ))}
      </div>
    </div>
  );
};

export default TimelineAll;
