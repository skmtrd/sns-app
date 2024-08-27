'use client';

import Button from '@/components/element/Button';
import Header from '@/components/element/Header';
import { ImageDisplayModal } from '@/components/element/ImageDisplayModal';
import UserTag from '@/components/element/UserTag';
import { Post } from '@/components/timeline/Post';
import useUserInfo from '@/hooks/useUserInfo';
import { Tag } from '@/lib/types';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { mutate } from 'swr';

import ProfileSkeltonLoading from '@/components/loading/ProfileSkeltonLoading';
import { profileSchema } from '@/lib/schemas';

const deletePost = async (postId: string) => {
  try {
    const res = await fetch(`/api/post/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const ProfilePage = () => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const userId = usePathname().split('/profile/')[1];

  const handleToggleIsImageModalOpen = () => {
    setIsImageModalOpen(!isImageModalOpen);
  };

  const { userInfo, isLoading, isError } = useUserInfo(userId, profileSchema);

  if (isLoading || !userInfo) {
    return <ProfileSkeltonLoading title={'タイムライン'} subtitle={'すべて'} />;
  }

  if (isError && isError.status === 429) {
    setTimeout(() => {
      mutate(`/api/post`);
    }, 2000);
  } else if (isError) {
    return <div>Error</div>;
  }

  if (isError) {
    console.log('error:', isError);
    setTimeout(() => {
      mutate(`/api/profile/${userId}`);
    }, 2000);
  } else if (isError) {
    return <div>Error</div>;
  }

  const handleDeletePost = async (e: React.MouseEvent<HTMLButtonElement>, postId: string) => {
    e.stopPropagation();
    const optimisticPostData = userInfo.posts.filter((post) => post.id !== postId);
    const optimisticData = { ...userInfo, posts: optimisticPostData };
    try {
      await mutate(
        `/api/profile/${userId}`,
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

  return (
    <div className='flex flex-1 flex-col overflow-hidden'>
      <Header title={'プロフィール'} />
      <main className='flex-1 overflow-y-auto bg-gray-100 p-6'>
        {isImageModalOpen && (
          <ImageDisplayModal closeModal={handleToggleIsImageModalOpen} src={userInfo.avatar} />
        )}
        <Toaster />
        <div className='rounded-lg bg-white p-6 shadow sm:p-8'>
          <div className='mb-6 flex flex-col items-center sm:flex-row sm:items-start'>
            <div className='mb-4 sm:mb-0 sm:mr-6'>
              {userInfo?.avatar ? (
                <button onClick={handleToggleIsImageModalOpen}>
                  <Image
                    src={userInfo.avatar}
                    alt={`${userInfo.name}のアバター`}
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
              <h1 className='mb-2 text-2xl font-bold text-gray-900 sm:text-3xl'>
                {userInfo?.name}
              </h1>
              <p className='mb-2 w-full text-sm text-gray-500 sm:text-base'>@{userInfo?.id}</p>

              {userInfo?.introduction && (
                <p className='mb-4 max-w-md break-words text-sm text-gray-700 sm:text-base'>
                  {userInfo?.introduction}
                </p>
              )}
            </div>
          </div>
          <div className='mb-4'>
            <div className='flex flex-wrap gap-2'>
              {userInfo?.tags && userInfo?.tags.length > 0 ? (
                userInfo?.tags.map((tag: Tag) => <UserTag key={tag.id} tagName={tag.name} />)
              ) : (
                <p className='text-sm text-gray-500'>タグが設定されていません</p>
              )}
            </div>
          </div>
          {userId === userInfo.clerkId && (
            <div className='flex w-full justify-end'>
              <Button title={'編集'} href={`${userId}/edit`} />
            </div>
          )}
        </div>
        <div
          id='mainContent'
          className='flex w-full flex-1 grow flex-col items-center gap-4 overflow-y-scroll bg-gray-100'
        >
          <div className='absolute mt-4 h-0.5 w-full bg-gray-500 shadow-md'></div>
          <div className='mt-5 flex w-full grow flex-col items-center gap-y-4 p-3'>
            {userInfo.posts.map((post) => (
              <Post
                key={post.id}
                postId={post.id}
                postContent={post.content}
                timestamp={post.createdAt}
                likes={post.likes}
                replyCount={post.replies.filter((reply) => reply.parentReplyId === null).length}
                postAuthorName={userInfo.name}
                postAuthorId={userInfo.id}
                postAuthorClerkId={userInfo.clerkId}
                postAuthorIntroduction={userInfo.introduction}
                postAuthorTags={userInfo.tags}
                postAuthorAvatar={userInfo.avatar}
                handleDeletePost={handleDeletePost}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
