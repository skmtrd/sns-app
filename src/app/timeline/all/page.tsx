'use client';
import Header from '@/components/element/Header';
import FixedHeader from '@/components/layout/FixedHeader';
import { Post } from '@/components/timeline/Post';
import useData from '@/hooks/useData';
import { postSchema } from '@/lib/schemas';
import { LoaderCircle } from 'lucide-react';
import { mutate } from 'swr';

const TimelineAll = () => {
  const { data: posts, error, isLoading } = useData('/api/post', postSchema);

  if (error && error.status === 429) {
    setTimeout(() => {
      mutate(`/api/post`);
    }, 2000);
  } else if (error) {
    return <div>Error</div>;
  }

  if (isLoading || !posts) {
    return (
      <div className='flex h-svh w-full flex-1 grow flex-col items-center justify-center gap-4 bg-gray-100'>
        <LoaderCircle size='64' className='animate-spin text-blue-600' />
        ロード中...
      </div>
    );
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
      <FixedHeader title={'タイムライン'} target={'すべて'} scrollToTop={scrollToTop} />
      <Header title={''} />
      <div className='flex w-full grow flex-col items-center gap-y-4 p-3'>
        {posts.map((post) => (
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
        ))}
      </div>
    </div>
  );
};

export default TimelineAll;
