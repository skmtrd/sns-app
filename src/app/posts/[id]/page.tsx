'use client';
import Header from '@/components/element/Header';
import FixedHeader from '@/components/layout/FixedHeader';
import { Post } from '@/components/timeline/Post';
import PostReply from '@/components/timeline/PostReply';
import useData from '@/hooks/useData';
import { LoaderCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { z } from 'zod';

const onePostSchema = z.object({
  id: z.string(),
  content: z.string(),
  avatar: z.string(),
  authorId: z.string(),
  createdAt: z.string(),
  author: z.object({
    id: z.string(),
    name: z.string(),
    clerkId: z.string(),
    introduction: z.string().optional(),
    tags: z.array(z.object({ id: z.string(), name: z.string() })).optional(), // tagsをオプションにする
  }),
  likes: z.array(
    z.object({
      author: z.object({ id: z.string(), name: z.string(), clerkId: z.string() }),
    }),
  ),
  replies: z.array(
    z.object({
      id: z.string(),
      content: z.string(),
      createdAt: z.string(),
      avatar: z.string(),
      parentReplyId: z.string().nullable(),
      author: z.object({
        id: z.string(),
        name: z.string(),
        clerkId: z.string(),
        tags: z.array(z.object({ id: z.string(), name: z.string() })).optional(), // tagsをオプションにする
      }),
    }),
  ),
});

const TimelineAll = () => {
  const postId = usePathname().split('/posts/')[1];
  const { data, error, isLoading } = useData(`/api/post/${postId}`, onePostSchema);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading || !data) {
    return (
      <div className='flex h-svh w-full flex-1 grow flex-col items-center justify-center gap-4 bg-gray-100'>
        <LoaderCircle size='64' className='animate-spin text-blue-600' />
        ロード中...
      </div>
    );
  }

  const postData = Array.isArray(data) ? data[0] : data;

  if (!postData) {
    return <div>No post data available</div>;
  }

  return (
    <div className='flex w-full flex-1 grow flex-col items-center gap-4 overflow-y-scroll bg-gray-100'>
      <FixedHeader title={'タイムライン'} target={''} />
      <Header title={''} />
      <div className='flex w-full grow flex-col items-center gap-y-4 p-3'>
        <Post
          key={postData.id}
          username={postData.author.name}
          clerkId={postData.author.clerkId}
          id={postData.author.id}
          timestamp={postData.createdAt}
          content={postData.content}
          tags={postData.author.tags}
          introduction={postData.author.introduction}
          postId={postData.id}
          avatar={postData.avatar}
          likes={postData.likes}
          replies={postData.replies}
        />

        {postData.replies
          .filter((reply) => reply.parentReplyId === null)
          .map((reply) => (
            <PostReply
              key={reply.id}
              username={reply.author.name}
              clerkId={reply.author.clerkId}
              id={reply.author.id}
              timestamp={reply.createdAt}
              content={reply.content}
              avatar={reply.avatar}
              likes={reply.likes}
              tags={reply.author.tags}
              replyId={reply.id}
              postId={postData.id}
              toReplyUserId={postData.author.id}
              replies={postData.replies}
            />
          ))}
      </div>
    </div>
  );
};

export default TimelineAll;
