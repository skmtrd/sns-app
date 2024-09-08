'use client';

import Header from '@/components/element/Header';
import { TagPicker } from '@/components/element/TagPicker';
import useUserInfo from '@/hooks/useUserInfo';
import { ProfileSchema } from '@/lib/schemas';
import { Tag } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import useSWR from 'swr';
import { z } from 'zod';

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
    .max(100, '自己紹介は100文字以内で入力してください'),
  // avatar: z.custom<File>((value) => value instanceof File).optional(),
});

const tagFetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => data.data)
    .then((tags) =>
      tags.map((tag: { id: string; name: string }) => ({ id: tag.id, name: tag.name })),
    );

const ProfileEditForm = ({
  userInfo,
  tags,
  clerkId,
}: {
  userInfo: any;
  tags: Tag[];
  clerkId: string;
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const pageclerkId = pathname.split('/profile/')[1].split('/')[0];

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
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    const pathUserId = pathname.split('/profile/')[1].split('/')[0];

    const updatePromise = toast.promise(
      (async () => {
        const userInfoRes = await fetch(`/api/profile/${pathUserId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
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
            tagNames: userInfo?.tags.map((tag: Tag) => tag.name),
            userId: pathUserId,
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
  };

  // const onFileChange = async (file: File) => {
  //   setValue('avatar', file);
  // };

  if (session?.user?.id !== pageclerkId) return <div>アクセス権がありません。</div>;

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
            {/* <ChangeAvatar onFileChange={onFileChange} value={user?.imageUrl} className='mr-6' /> */}
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
            <TagPicker tags={tags} clerkId={clerkId} userInfo={userInfo} />
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

const ProfileEditPage = () => {
  const clerkId = usePathname().split('/profile/')[1].split('/')[0];

  const { userInfo, isLoading, isError } = useUserInfo(clerkId, ProfileSchema);

  const {
    data: tags,
    error: tagError,
    isLoading: isTagLoading,
    mutate: mutateTags,
  } = useSWR('/api/tag', tagFetcher);

  if (isLoading || isTagLoading) {
    return <div>ロード中...</div>;
  }

  if (isError || tagError) {
    return <div>エラーが発生しました。</div>;
  }

  if (userInfo && tags && clerkId) {
    return <ProfileEditForm userInfo={userInfo} tags={tags} clerkId={clerkId} />;
  }

  return null;
};

export default ProfileEditPage;
