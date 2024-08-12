'use client';
import Header from '@/components/element/Header';
import FixedHeader from '@/components/layout/FixedHeader';
import { Post } from '@/components/timeline/Post';
import PostReply from '@/components/timeline/PostReply';
import useData from '@/hooks/useData';
import { oneOfPostSchema } from '@/lib/schemas';
import { Reply } from '@/lib/types';
import { LoaderCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { mutate } from 'swr';

const TimelineAll = () => {
  const postId = usePathname().split('/posts/')[1];
  const { data: post, error, isLoading } = useData(`/api/post/${postId}`, oneOfPostSchema);

  if (error && error.status === 429) {
    setTimeout(() => {
      mutate(`/api/post/${postId}`);
    }, 2000);
  } else if (error) {
    return <div>Error</div>;
  }

  if (isLoading || !post) {
    return (
      <div className='flex h-svh w-full flex-1 grow flex-col items-center justify-center gap-4 bg-gray-100'>
        <LoaderCircle size='64' className='animate-spin text-blue-600' />
        ロード中...
      </div>
    );
  }

  const postData = Array.isArray(post) ? post[0] : post;

  if (!postData) {
    return <div>No post data available</div>;
  }

  const scrollToTop = () => {
    const element = document.getElementById('mainContent');
    element?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      id='mainContent'
      className='flex w-full flex-1 grow flex-col items-center gap-4 overflow-y-scroll bg-gray-100'
    >
      <FixedHeader title={'タイムライン'} target={''} scrollToTop={scrollToTop} />
      <Header title={''} />
      <div className='flex w-full grow flex-col items-center gap-y-4 p-3'>
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
        />
        <div className='h-0.5 w-full bg-gray-500'></div>
        {postData.replies
          .filter((reply: Reply) => reply.parentReplyId === null)
          .map((reply: Reply) => (
            <PostReply
              key={reply.id}
              replyId={reply.id}
              replyContent={reply.content}
              timestamp={reply.createdAt}
              // likes={reply.likes}
              replies={post.replies}
              parentPostId={post.id}
              toReplyPostAuthorId={post.author.id}
              replyAuthorName={reply.author.name}
              replyAuthorId={reply.author.id}
              replyAuthorClerkId={reply.author.clerkId}
              replyAuthorAvatar={reply.avatar}
              replyAuthorTags={reply.author.tags ?? []}
              replyAuthorIntroduction={reply.author.introduction}
            />
          ))}
      </div>
    </div>
  );
};

export default TimelineAll;
