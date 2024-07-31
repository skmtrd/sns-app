'use client';

import Button from '@/components/element/Button';
import Header from '@/components/element/Header';
import UserTag from '@/components/element/UserTag';
import { UserInfo } from '@/lib/types';
import { Loader2 } from 'lucide-react';
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
        <div className='rounded-lg bg-white p-6 shadow'>
          <div className='mb-4 flex items-center'>
            <div>
              <h1 className='text-2xl font-bold'>{userInfo.name}</h1>
              <p className='text-gray-600'>@{userInfo.id}</p>
            </div>
          </div>
          <p className='mb-4 text-gray-700'>{userInfo.introduction}</p>
          <div className='mb-4 flex flex-wrap gap-2'>
            {userInfo.tags && userInfo.tags.length > 0 ? (
              userInfo.tags.map((tag) => <UserTag key={tag.id} tagName={tag.name} />)
            ) : (
              <p>タグがありません</p>
            )}
          </div>
        </div>
        <Button title={'編集'} href={`${pathname}/edit`} />
      </main>
    </div>
  );
};

export default ProfilePage;
