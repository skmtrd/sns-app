'use client';

import Button from '@/components/element/Button';
import Header from '@/components/element/Header';
import { ImageDisplayModal } from '@/components/element/ImageDisplayModal';
import UserTag from '@/components/element/UserTag';
import { Post } from '@/components/timeline/Post';
import useData from '@/hooks/useData';
import { profileSchema } from '@/lib/schemas';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { mutate } from 'swr';

const ProfilePage = () => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const userId = usePathname().split('/profile/')[1];

  const handleToggleIsImageModalOpen = () => {
    setIsImageModalOpen(!isImageModalOpen);
  };

  const { data, error, isLoading } = useData(`/api/profile/${userId}`, profileSchema);

  if (isLoading || !data) {
    return (
      <div className='flex h-svh w-full flex-1 grow flex-col items-center justify-center gap-4 bg-gray-100'>
        <Loader2 size='64' className='animate-spin text-blue-600' />
        ロード中...
      </div>
    );
  }

  if (error && error.status === 429) {
    setTimeout(() => {
      mutate(`/api/profile/${userId}`);
    }, 2000);
  } else if (error) {
    return <div>Error</div>;
  }

  const posts = data.posts;

  return (
    <div className='flex flex-1 flex-col overflow-hidden'>
      <Header title={'プロフィール'} />
      <main className='flex-1 overflow-y-auto bg-gray-100 p-6'>
        {isImageModalOpen && (
          <ImageDisplayModal closeModal={handleToggleIsImageModalOpen} src={data.avatar} />
        )}
        <div className='rounded-lg bg-white p-6 shadow sm:p-8'>
          <div className='sm:_flex-row mb-6 flex flex-col items-center sm:items-start'>
            <div className='mb-4 sm:mb-0 sm:mr-6'>
              {data?.avatar ? (
                <button onClick={handleToggleIsImageModalOpen}>
                  <Image
                    src={data.avatar}
                    alt={`${data.name}のアバター`}
                    width={100}
                    height={100}
                    className='rounded-full'
                  />
                </button>
              ) : (
                <div className='flex size-24 items-center justify-center rounded-full bg-gray-200 text-gray-500'>
                  No Image
                </div>
              )}
            </div>
            <div className='w-full text-center sm:text-left'>
              <h1 className='mb-2 text-2xl font-bold text-gray-900 sm:text-3xl'>{data?.name}</h1>
              <p className='mb-2 w-full text-sm text-gray-500 sm:text-base'>@{data?.id}</p>

              {data?.introduction && (
                <p className='mb-4 max-w-md break-words text-sm text-gray-700 sm:text-base'>
                  {data?.introduction}
                </p>
              )}
            </div>
          </div>
          <div className='mb-4'>
            <div className='flex flex-wrap gap-2'>
              {data?.tags && data?.tags.length > 0 ? (
                data?.tags.map((tag) => <UserTag key={tag.id} tagName={tag.name} />)
              ) : (
                <p className='text-sm text-gray-500'>タグが設定されていません</p>
              )}
            </div>
          </div>
          {userId === data.clerkId && (
            <div className='flex w-full justify-end'>
              <Button title={'編集'} href={`${userId}/edit`} />
            </div>
          )}
        </div>
        <div
          id='mainContent'
          className='flex w-full flex-1 grow flex-col items-center gap-4 overflow-y-scroll bg-gray-100'
        >
          <div className='flex w-full grow flex-col items-center gap-y-4 p-3'>
            <div className='h-0.5 w-full bg-gray-500 shadow-md'></div>
            {posts.map((post) => (
              <Post
                key={post.id}
                postId={post.id}
                postContent={post.content}
                timestamp={post.createdAt}
                likes={post.likes}
                replyCount={post.replies.filter((reply) => reply.parentReplyId === null).length}
                postAuthorName={data.name}
                postAuthorId={data.id}
                postAuthorClerkId={data.clerkId}
                postAuthorIntroduction={data.introduction}
                postAuthorTags={data.tags}
                postAuthorAvatar={data.avatar}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
