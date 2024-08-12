'use client';

import Button from '@/components/element/Button';
import Header from '@/components/element/Header';
import UserTag from '@/components/element/UserTag';
import useData from '@/hooks/useData';
import { profileSchema } from '@/lib/schemas';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const ProfilePage = () => {
  const userId = usePathname().split('/profile/')[1];

  const { data, error, isLoading } = useData(`/api/profile/${userId}`, profileSchema);

  if (isLoading) {
    return (
      <div className='flex h-svh w-full flex-1 grow flex-col items-center justify-center gap-4 bg-gray-100'>
        <Loader2 size='64' className='animate-spin text-blue-600' />
        ロード中...
      </div>
    );
  }

  if (!data) return <div>ユーザー情報が見つかりません。</div>;

  return (
    <div className='flex flex-1 flex-col overflow-hidden'>
      <Header title={'プロフィール'} />
      <main className='flex-1 overflow-y-auto bg-gray-100 p-6'>
        <div className='rounded-lg bg-white p-6 shadow sm:p-8'>
          <div className='mb-6 flex flex-col items-center sm:flex-row sm:items-start'>
            <div className='mb-4 sm:mb-0 sm:mr-6'>
              {data?.avatar ? (
                <Image
                  src={data.avatar}
                  alt={`${data.name}のアバター`}
                  width={100}
                  height={100}
                  className='rounded-full'
                />
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
        </div>
        {userId === data.clerkId && <Button title={'編集'} href={`${userId}/edit`} />}
      </main>
    </div>
  );
};

export default ProfilePage;
