'use client';

import RemovableUserTag from '@/components/element/RemovableUserTag';
import UserTag from '@/components/element/UserTag';
import { Tag, UserInfo } from '@/lib/types';
import { ChevronDown, ChevronUp, Loader2, Plus } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ProfileEditPage = () => {
  const nameRef = React.useRef<HTMLInputElement>();
  const userIdRef = React.useRef<HTMLInputElement>();
  const introRef = React.useRef<HTMLTextAreaElement>();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ownedTags, setOwnedTags] = useState<Tag[]>([]);
  const [notOwnedTags, setNotOwnedTags] = useState<Tag[]>([]);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = pathname.split('/profile/')[1].split('/edit')[0];
        const res = await fetch(`http://localhost:3000/api/profile/${userId}`, {
          cache: 'no-cache',
        });
        const data = await res.json();
        setUserInfo(data.data);
        setOwnedTags(data.data.tags);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        setError('ユーザー情報の読み込みに失敗しました。');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [pathname]);

  useEffect(() => {
    if (nameRef.current && userIdRef.current && introRef.current && userInfo) {
      nameRef.current.value = userInfo.name;
      userIdRef.current.value = userInfo.id;
      introRef.current.value = userInfo.introduction;
    }
  }, [userInfo, nameRef, userIdRef, introRef]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/tag', {
          cache: 'no-cache',
        });
        const data = await res.json();

        const notOwnedTags = data.data.filter(
          (tag: Tag) => !userInfo?.tags.some((ownedTag: Tag) => ownedTag.name === tag.name),
        );

        setNotOwnedTags(notOwnedTags);
      } catch (error) {
        console.error('Failed to fetch tags:', error);
        setError('タグの読み込みに失敗しました。');
      }
    };

    fetchTags();
  }, [userInfo]);

  const handleSubmit = async () => {
    const name = nameRef.current?.value;
    const newId = userIdRef.current?.value;
    const introduction = introRef.current?.value;
    const userId = pathname.split('/profile/')[1].split('/')[0];

    try {
      console.log({ name, introduction, newId });
      console.log('やあ');
      const userInfoRes = await fetch(`http://localhost:3000/api/profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, introduction, id: newId }),
      });

      const tagRes = await fetch('http://localhost:3000/api/tag', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tagNames: ownedTags.map((tag) => tag.name),
          clerkId: userId,
        }),
      });

      const tagData = await tagRes.json();
      console.log('Tag update response:', tagData);

      router.push(`/profile/${userId}`);
    } catch (error) {
      console.error('Failed to update user info:', error);
      setError('ユーザー情報の更新に失敗しました。');
    }
  };

  const handleAddTag = (tagName: string) => {
    console.log(ownedTags, notOwnedTags);
    const newOwnedTags = structuredClone(ownedTags);
    const newNotOwnedTags = structuredClone(notOwnedTags);

    newOwnedTags.push({ id: '', name: tagName });

    setNotOwnedTags(newNotOwnedTags.filter((tag) => tag.name !== tagName));
    setOwnedTags(newOwnedTags);
  };

  const handleRemoveTag = (tagName: string) => {
    const newOwnedTags = structuredClone(ownedTags);
    const newNotOwnedTags = structuredClone(notOwnedTags);

    newNotOwnedTags.push({ id: '', name: tagName });

    setOwnedTags(newOwnedTags.filter((tag) => tag.name !== tagName));
    setNotOwnedTags(newNotOwnedTags);
  };

  if (isLoading)
    return (
      <div className='flex h-svh w-full flex-1 grow flex-col items-center justify-center gap-4 bg-gray-100'>
        <Loader2 size='64' className='animate-spin text-blue-600' />
        ロード中...
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className='flex flex-1 flex-col overflow-hidden'>
      <header className='flex items-center justify-between border-b border-gray-200 bg-white p-4'>
        <h2 className='text-xl font-bold'>プロフィール編集</h2>
      </header>
      <main className='flex-1 overflow-y-auto bg-gray-100 p-6'>
        <form className='rounded-lg bg-white p-6 shadow'>
          <div className='mb-4'>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
              名前
            </label>
            <input
              ref={nameRef}
              type='text'
              id='name'
              className='focus:ring-opacity-50/50 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='username' className='block text-sm font-medium text-gray-700'>
              ユーザーID
            </label>
            <div className='mt-1 flex rounded-md shadow-sm'>
              <span className='inline-flex items-center rounded-sm border border-gray-300 bg-gray-50 px-3 text-sm text-gray-500'>
                @
              </span>
              <input
                ref={userIdRef}
                type='text'
                id='username'
                className='block w-full flex-1 rounded-sm border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
              />
            </div>
          </div>
          <div className='mb-4'>
            <label htmlFor='bio' className='block text-sm font-medium text-gray-700'>
              自己紹介
            </label>
            <textarea
              ref={introRef}
              id='bio'
              rows={3}
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
            ></textarea>
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>タグ</label>
            <div className='mt-2 flex flex-wrap'>
              {ownedTags.map((tag) => (
                <RemovableUserTag
                  key={tag.id}
                  tagName={tag.name}
                  handleRemoveTag={handleRemoveTag}
                />
              ))}
            </div>
          </div>
          <div>
            <button
              type='button'
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className='flex w-full items-center justify-between rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
            >
              <span className='flex items-center'>
                <Plus size={20} className='mr-2' />
                タグを追加
              </span>
              {isDrawerOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            <div
              className={`mt-2 overflow-scroll rounded-md border border-gray-200 bg-white transition-all duration-300 ease-in-out ${
                isDrawerOpen ? 'max-h-64' : 'max-h-0'
              }`}
            >
              <div className='p-4'>
                <input
                  type='text'
                  placeholder='タグを検索'
                  className='mb-4 w-full rounded-md border px-3 py-2'
                />
                <div className='flex flex-wrap gap-2'>
                  {notOwnedTags.map((tag) => (
                    <div key={tag.id} onClick={() => handleAddTag(tag.name)}>
                      <UserTag tagName={tag.name}></UserTag>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </form>
        <button
          className='mt-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
          onClick={handleSubmit}
        >
          保存
        </button>
      </main>
    </div>
  );
};

export default ProfileEditPage;
