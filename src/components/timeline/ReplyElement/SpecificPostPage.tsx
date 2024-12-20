'use client';

import { Post as PostType } from '@/lib/types';

import { Post } from '../Post';
import { Reply } from '../Reply';

type SpecificPostPageProps = {
  currentUserId: string;
  post: PostType;
};

const SpecificPostPage: React.FC<SpecificPostPageProps> = ({ currentUserId, post }) => {
  //   if (!post) return <TimelineSkeltonLoading title={'タイムライン'} subtitle={'すべて'} />;

  return (
    <div
      id='mainContent'
      className='flex w-full flex-1 grow flex-col items-center overflow-y-scroll bg-gray-100'
    >
      <div className='mx-auto w-full max-w-5xl py-8 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center space-y-6'>
          <Post currentUserId={currentUserId} post={post} />
          {post.replies.map((reply) => (
            <Reply key={reply.id} reply={reply} currentUserId={currentUserId} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecificPostPage;
