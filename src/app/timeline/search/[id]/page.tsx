'use client';
import Header from '@/components/element/Header';
import FixedHeader from '@/components/layout/FixedHeader';
import { Post } from '@/components/timeline/Post';
import useData from '@/hooks/useData';
import { LoaderCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { postSchema } from '../../all/page';

const TimelineAll = () => {
  const pathName = usePathname();
  const searchedWord = decodeURIComponent(pathName.split('/search/')[1]);
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
  const filteredPosts = posts.filter((post) => post.content.includes(searchedWord));

  return (
    <div className='flex w-full flex-1 grow flex-col items-center gap-4 overflow-y-scroll bg-gray-100'>
      <FixedHeader title={'検索'} target={searchedWord} />
      <Header title={''} />
      <div className='flex w-full grow flex-col items-center gap-y-4 p-3'>
        {filteredPosts.map((post, index) => (
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
            replyCount={post.replies.filter((reply) => reply.parentReplyId === null).length}
          />
        ))}
      </div>
    </div>
  );
};

export default TimelineAll;
