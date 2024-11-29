'use client';

import { ICON_IMAGE_BASE_URL } from '@/lib/constants';
import { ProfileSchema, tagSchema } from '@/lib/schemas';
import { Tag } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { z } from 'zod';
import { ChangeAvatar } from '../element/ChangeAvatar';
import Header from '../element/Header';
import { TagPicker } from '../element/TagPicker';

const formSchema = z.object({
  name: z.string().min(1, '名前は必須です').max(20, '名前は20文字以内で入力してください'),
  userId: z
    .string()
    .regex(/^[a-zA-Z0-9_]+$/, 'ユーザーIDは半角英数字とアンダースコアのみ使用できます')
    .min(1, 'ユーザーIDは必須です')
    .max(20, 'ユーザーIDは20文字以内で入力してください'),
  introduction: z
    .string()
    .min(1, '自己紹介は必須です')
    .max(100, '自己紹介は100文字以内で入力してください')
    .nullable(),
  icon: z
    .union([z.custom<File>((value) => value instanceof File), z.string()])
    .optional()
    .nullable(),
});

type userInfo = z.infer<typeof ProfileSchema>;
type tag = z.infer<typeof tagSchema>;

const ProfileEditForm = ({ userInfo, allTags }: { userInfo: userInfo; allTags: tag[] }) => {
  const [updatedTags, setUpdatedTags] = useState<Tag[]>(userInfo.tags);
  const router = useRouter();
  const { update } = useSession();

  const updateTags = (newTags: Tag[]) => {
    setUpdatedTags(newTags);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    values: {
      name: userInfo.name,
      userId: userInfo.id,
      introduction: userInfo.introduction,
      icon: userInfo.iconUrl,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('userId', data.userId);
    formData.append('introduction', data.introduction ? data.introduction : '');
    if (data.icon instanceof File) {
      formData.append('icon', data.icon);
    } else {
      formData.append(
        'iconUrl',
        userInfo.iconUrl ? userInfo.iconUrl : `${ICON_IMAGE_BASE_URL}user.png`,
      );
    }

    const updatePromise = toast.promise(
      (async () => {
        const userInfoRes = await fetch(`/api/profile/${userInfo.id}`, {
          method: 'PUT',
          body: formData,
        });

        if (!userInfoRes.ok) {
          throw new Error('Failed to update user info');
        }

        const tagRes = await fetch('/api/tag', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tagNames: updatedTags.map((tag: Tag) => tag.name),
          }),
        });

        if (!tagRes.ok) {
          throw new Error('Failed to update tags');
        }

        return await tagRes.json();
      })(),
      {
        loading: 'プロフィールを更新中...',
        success: 'プロフィールを更新しました！',
        error: '更新に失敗しました。もう一度お試しください。',
      },
      {
        style: {
          fontSize: '1rem',
          fontWeight: 'bold',
          borderRadius: '10px',
          background: '#e8e9fc',
          color: '#3147d4',
          padding: '1rem',
        },
      },
    );

    try {
      await updatePromise;
      router.push(`/profile/${data.userId}`);
    } catch (error) {
      console.error('Failed to update user info:', error);
      setError('root.error', { message: 'ユーザー情報の更新に失敗しました。' });
    }
    update();
  };

  const onFileChange = async (file: File | null) => {
    if (file) {
      setValue('icon', file);
    } else {
      // ファイルが選択されていない場合、既存のアイコンURLを設定
      setValue('icon', userInfo.iconUrl);
    }
  };

  const imageUrl = userInfo.iconUrl
    ? `${ICON_IMAGE_BASE_URL}${userInfo.iconUrl}`
    : userInfo.image
      ? userInfo.image
      : '';

  return (
    <div className='flex flex-1 flex-col overflow-hidden'>
      <Header title={'プロフィール編集'} />
      <main className='flex-1 overflow-y-auto bg-gray-100 p-6'>
        <Toaster />
        <form
          className='space-y-4 rounded-lg bg-white p-6 shadow'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='flex'>
            <ChangeAvatar onFileChange={onFileChange} value={imageUrl} className='mr-6' />
            <div className='w-full space-y-4'>
              <div>
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
              <div>
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
                    className='ml-2 block w-full flex-1 rounded-sm border-gray-300 outline-none focus:border-blue-300 focus:ring focus:ring-blue-200/50'
                  />
                </div>
                {errors.userId && (
                  <p className='mt-2 text-sm text-red-500'>{errors.userId.message}</p>
                )}
              </div>
            </div>
          </div>
          <div>
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
          <div>
            <TagPicker allTags={allTags} updateTags={updateTags} updatedTags={updatedTags} />
          </div>
          <button
            type='submit'
            className='mt-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-0 focus:ring-blue-500/50'
          >
            保存
          </button>
        </form>
      </main>
    </div>
  );
};

export default ProfileEditForm;
