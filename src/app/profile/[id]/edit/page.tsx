'use client';

import { Dropzone } from '@/components/element/DropZone';
import Header from '@/components/element/Header';
import RemovableUserTag from '@/components/element/RemovableUserTag';
import UserTag from '@/components/element/UserTag';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown, ChevronUp, Loader2, Plus } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, '名前は必須です'),
  userId: z
    .string()
    .regex(/^[a-zA-Z0-9_]+$/, 'ユーザーIDは半角英数字とアンダースコアのみ使用できます')
    .min(1, 'ユーザーIDは必須です'),
  introduction: z.string().min(1, '自己紹介は必須です'),
  tags: z.array(
    z.object({
      id: z.string().min(1),
      name: z.string().min(1),
    }),
  ),
  avatar: z.string().optional(),
});

export type Tag = z.infer<typeof formSchema>['tags'][0];

const fetchUserInfo = async (userId: string) =>
  fetch(`http://localhost:3000/api/profile/${userId}`)
    .then((res) => res.json())
    .then((data) => data.data);

const fetchTags = async () =>
  fetch('http://localhost:3000/api/tag', { cache: 'no-cache' })
    .then((res) => res.json())
    .then((data) => data.data);

const ProfileEditPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
    setValue,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const [pageError, setPageError] = useState<string | null>(null);
  const [availableTags, setAvailableTags] = useState<z.infer<typeof formSchema>['tags']>([]);
  const [uploadStatus, setUploadStatus] = useState<'uploading' | 'success' | 'error' | 'idle'>(
    'idle',
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const notOwnedTags = availableTags.filter(
    (tag) => !getValues('tags')?.some((ownedTag) => ownedTag.name === tag.name),
  );

  useEffect(() => {
    const fetchTagsAndSetAvailableTags = async () => {
      try {
        const tags = await fetchTags();
        const parsedTags = tags.map((tag: Tag) => ({ id: tag.id, name: tag.name }));
        if (parsedTags) setAvailableTags(parsedTags);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch tags:', error);
        setPageError('タグの読み込みに失敗しました。');
      }
    };
    fetchTagsAndSetAvailableTags();
  }, [pathname]);

  useEffect(() => {
    const fetchUserInfoAndSetDefaultValues = async () => {
      const userId = pathname.split('/profile/')[1].split('/')[0];
      try {
        const userInfo = await fetchUserInfo(userId);
        setValue('name', userInfo.name);
        setValue('userId', userInfo.id);
        setValue('introduction', userInfo.introduction ?? '');
        setValue('tags', userInfo.tags);
        setValue('avatar', userInfo.avatar ?? null);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        setPageError('ユーザー情報の読み込みに失敗しました。');
      }
    };
    fetchUserInfoAndSetDefaultValues();
  }, [pathname, setValue]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    const pathUserId = pathname.split('/profile/')[1].split('/')[0];

    try {
      const userInfoRes = await fetch(`http://localhost:3000/api/profile/${pathUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const tagRes = await fetch('http://localhost:3000/api/tag', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tagNames: data.tags?.map((tag) => tag.name),
          clerkId: pathUserId,
        }),
      });

      const tagData = await tagRes.json();
      console.log('Tag update response:', tagData);

      router.push(`/profile/${pathUserId}`);
    } catch (error) {
      console.error('Failed to update user info:', error);
      setError('root.error', { message: 'ユーザー情報の更新に失敗しました。' });
    }
  };

  const handleAddTag = (newTag: Tag) => {
    const newOwnedTags = structuredClone(getValues('tags'));
    newOwnedTags.push(newTag);
    setValue('tags', newOwnedTags);
    const newAvailableTags = structuredClone(availableTags);
    setAvailableTags(newAvailableTags);
  };

  const handleRemoveTag = (tagToRemove: Tag) => {
    const newAvailableTags = structuredClone(availableTags);
    const newOwnedTags = getValues('tags').filter((tag) => tag.id !== tagToRemove.id);
    setValue('tags', newOwnedTags);
    setAvailableTags(newAvailableTags);
  };

  const onDrop = async (files: File[]) => {
    setUploadStatus('uploading');
    const formData = new FormData();
    formData.append('file', files[0]);
    const { data } = await fetch(`http://localhost:3000/api/files/avatars/`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .catch((error) => {
        console.error('Failed to upload avatar:', error);
      });

    if (!data) {
      setUploadStatus('error');
      return;
    }
    setUploadStatus('success');
    setValue('avatar', data);
  };

  if (isLoading)
    return (
      <div className='flex h-svh w-full flex-1 grow flex-col items-center justify-center gap-4 bg-gray-100'>
        <Loader2 size='64' className='animate-spin text-blue-600' />
        ロード中...
      </div>
    );

  return (
    <div className='flex flex-1 flex-col overflow-hidden'>
      <Header title={'プロフィール編集'} />
      <main className='flex-1 overflow-y-auto bg-gray-100 p-6'>
        <form className='rounded-lg bg-white p-6 shadow' onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
              名前
            </label>
            <input
              {...register('name')}
              type='text'
              id='name'
              autoComplete='off'
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none focus:border-blue-300 focus:ring focus:ring-blue-200/50'
            />
            {errors.name && <p className='mt-2 text-sm text-red-500'>{errors.name.message}</p>}
          </div>
          <div className='mb-4'>
            <label htmlFor='userId' className='block text-sm font-medium text-gray-700'>
              ユーザーID
            </label>
            <div className='mt-1 flex rounded-md shadow-sm'>
              <span className='inline-flex items-center rounded-sm border border-gray-300 bg-gray-50 px-2 text-sm text-gray-500'>
                @
              </span>
              <input
                {...register('userId')}
                type='text'
                id='userId'
                className='block w-full flex-1 rounded-sm border-gray-300 outline-none focus:border-blue-300 focus:ring focus:ring-blue-200/50'
              />
            </div>
            {errors.userId && <p className='mt-2 text-sm text-red-500'>{errors.userId.message}</p>}
          </div>
          <div className='mb-4'>
            <label htmlFor='bio' className='block text-sm font-medium text-gray-700'>
              自己紹介
            </label>
            <textarea
              {...register('introduction')}
              id='bio'
              rows={3}
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none focus:border-blue-300 focus:ring focus:ring-blue-200/50'
            ></textarea>
            {errors.introduction && (
              <p className='mt-2 text-sm text-red-500'>{errors.introduction.message}</p>
            )}
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>タグ</label>
            <div className='mt-2 flex flex-wrap'>
              {getValues('tags')?.map((tag) => (
                <RemovableUserTag
                  key={tag.id}
                  tagName={tag.name}
                  handleRemoveTag={() => handleRemoveTag(tag)}
                />
              ))}
            </div>
            <button
              type='button'
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className='flex w-full items-center justify-between rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50'
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
                  id='tag-search'
                  className='mb-4 w-full rounded-md border px-3 py-2'
                />
                <div className='flex flex-wrap gap-2'>
                  {notOwnedTags.map((tag) => (
                    <div key={tag.id} onClick={() => handleAddTag(tag)}>
                      <UserTag tagName={tag.name}></UserTag>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {errors.tags && <p className='mt-2 text-sm text-red-500'>{errors.tags.message}</p>}
          </div>
          <div className='mt-4'>
            <label className='block text-sm font-medium text-gray-700'>アバター</label>
            <Dropzone
              onDrop={onDrop}
              className='mt-2'
              status={uploadStatus}
              value={getValues('avatar')}
            />
          </div>
        </form>
        <button
          className='mt-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-0 focus:ring-blue-500/50'
          onClick={handleSubmit(onSubmit)}
        >
          保存
        </button>
      </main>
    </div>
  );
};

export default ProfileEditPage;
