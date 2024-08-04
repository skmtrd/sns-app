'use client';

import Button from '@/components/element/Button';
import Header from '@/components/element/Header';
import UserTag from '@/components/element/UserTag';
import { UserInfo } from '@/lib/types';
import { useUser } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const API_BASE_URL = 'http://localhost:3000/api';

const fetchUserInfo = async (userId: string): Promise<UserInfo> => {
  const res = await fetch(`${API_BASE_URL}/profile/${userId}`, {
    cache: 'no-cache',
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const data = await res.json();
  return data.data;
};

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const { user } = useUser();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userId = pathname.split('/profile/')[1];
        const userData = await fetchUserInfo(userId);
        setUserInfo(userData);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        setError('ユーザー情報の読み込みに失敗しました。');
      } finally {
        setIsLoading(false);
      }
    };

    getUserInfo();
  }, [pathname]);

  if (isLoading) {
    return (
      <div className='flex h-svh w-full flex-1 grow flex-col items-center justify-center gap-4 bg-gray-100'>
        <Loader2 size='64' className='animate-spin text-blue-600' />
        ロード中...
      </div>
    );
  }

  if (error) return <div>{error}</div>;
  if (!userInfo) return <div>ユーザー情報が見つかりません。</div>;

  return (
    <div className='flex flex-1 flex-col overflow-hidden'>
      <Header title={'プロフィール'} />
      <main className='flex-1 overflow-y-auto bg-gray-100 p-6'>
        <div className='rounded-lg bg-white p-6 shadow sm:p-8'>
          <div className='mb-6 flex flex-col items-center sm:flex-row sm:items-start'>
            <div className='mb-4 sm:mb-0 sm:mr-6'>
              {user?.imageUrl ? (
                <Image
                  src={user?.imageUrl}
                  alt={`${userInfo.name}のアバター`}
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
              <h1 className='mb-2 text-2xl font-bold text-gray-900 sm:text-3xl'>{userInfo.name}</h1>
              <p className='mb-2 w-full text-sm text-gray-500 sm:text-base'>@{userInfo.id}</p>
              {userInfo.introduction && (
                <p className='mb-4 max-w-md break-words text-sm text-gray-700 sm:text-base'>
                  {userInfo.introduction}
                </p>
              )}
            </div>
          </div>
          <div className='mb-4'>
            <div className='flex flex-wrap gap-2'>
              {userInfo.tags && userInfo.tags.length > 0 ? (
                userInfo.tags.map((tag) => <UserTag key={tag.id} tagName={tag.name} />)
              ) : (
                <p className='text-sm text-gray-500'>タグが設定されていません</p>
              )}
            </div>
          </div>
        </div>
        {user?.id === userInfo.clerkId && <Button title={'編集'} href={`${pathname}/edit`} />}
      </main>
    </div>
  );
};

export default ProfilePage;
