'use client';
import { cn } from '@/lib/utils';
import { Image as ImageIcon, X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';

type AddPostProps = {
  closeModal: () => void;
};

type FormInputs = {
  content: string;
  image?: FileList;
};

const MAX_CONTENT_LENGTH = 500;

const addPost = async (newPost: FormData) => {
  const response = await fetch('/api/post', {
    method: 'POST',
    body: newPost,
  });

  if (!response.ok) {
    throw new Error('投稿に失敗しました');
  }
};

export const AddPost: React.FC<AddPostProps> = ({ closeModal }) => {
  const { mutate } = useSWRConfig();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<FormInputs>();

  const content = watch('content');
  const image = watch('image');

  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  }, [image]);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    clearErrors();
    const formData = new FormData();
    formData.append('content', data.content);
    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]);
    }

    try {
      await addPost(formData);
      mutate('/api/post');
      closeModal();
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: '投稿に失敗しました',
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' && e.ctrlKey) || (e.key === 'Enter' && e.metaKey)) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
    }
  };

  useEffect(() => {
    const textArea = document.getElementById('content');
    textArea?.focus();
  }, []);

  return (
    <div
      onKeyDown={handleKeyDown}
      onClick={(e) => {
        e.stopPropagation();
        closeModal();
      }}
      className='animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-md'
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='animate-scaleIn w-full max-w-md rounded-lg bg-white shadow-xl'
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-title'
      >
        <div className='flex items-center justify-between border-b p-4'>
          <h2 id='modal-title' className='text-lg font-semibold text-black'>
            ポストする
          </h2>
          <button
            onClick={() => {
              closeModal();
            }}
            className='z-50 text-gray-500 hover:text-gray-700'
            aria-label='閉じる'
          >
            <X size={20} />
          </button>
        </div>
        <div className='w-full p-4'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300'>
              <div className='flex gap-2 whitespace-nowrap'>
                {/* タグの内容 */}
              </div>
            </div>
            <textarea
              id='content'
              {...register('content', {
                required: '内容を入力してください',
                maxLength: {
                  value: MAX_CONTENT_LENGTH,
                  message: `${MAX_CONTENT_LENGTH}文字以内で入力してください`,
                },
              })}
              placeholder='内容を入力してください'
              maxLength={MAX_CONTENT_LENGTH}
              rows={10}
              className='w-full rounded-md border p-2 font-medium text-black outline-none'
              aria-invalid={errors.content ? 'true' : 'false'}
            />
            <div className='flex w-full justify-end'>
              <p
                className={cn(
                  'text-sm',
                  content?.length === MAX_CONTENT_LENGTH ? 'text-red-500' : 'text-gray-400',
                )}
              >
                {content?.length || 0} / {MAX_CONTENT_LENGTH}
              </p>
            </div>
            {errors.content && <p className='text-red-500'>{errors.content.message}</p>}
            <div className='flex items-center gap-2'>
              <label htmlFor='image' className='cursor-pointer'>
                <ImageIcon size={24} className='text-gray-500' />
              </label>
              <input
                type='file'
                id='image'
                accept='image/*'
                {...register('image')}
                className='hidden'
              />
              {previewImage && (
                <Image src={previewImage} alt='image preview' height={100} width={100} />
              )}
            </div>
            <button
              type='submit'
              className={cn(
                'rounded-md bg-blue-500 py-2 text-white',
                (isSubmitting || !content) && 'opacity-50',
              )}
              disabled={isSubmitting || !content}
            >
              {isSubmitting ? '投稿中...' : '投稿する'}
            </button>
            {errors.root && <p className='text-red-500'>{errors.root.message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};
