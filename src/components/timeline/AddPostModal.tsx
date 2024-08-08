'use client';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';

type AddPostProps = {
  closeModal: () => void;
};

type FormInputs = {
  content: string;
};

const MAX_CONTENT_LENGTH = 500;

export const AddPost: React.FC<AddPostProps> = ({ closeModal }) => {
  const { mutate } = useSWRConfig();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<FormInputs>();

  const content = watch('content');

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    clearErrors();

    const newPost = {
      createdAt: new Date().toISOString(),
      content: data.content,
    };

    try {
      const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error('投稿に失敗しました');
      }

      mutate('/api/post');
      closeModal();
    } catch (err: any) {
      setError('root', {
        type: 'manual',
        message: err.message,
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
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
    <div className='animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'>
      <div
        className='animate-scaleIn w-full max-w-md rounded-lg bg-white shadow-xl'
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-title'
      >
        <div className='flex items-center justify-between border-b p-4'>
          <h2 id='modal-title' className='text-lg font-semibold'>
            ポストする
          </h2>
          <button
            onClick={closeModal}
            className='text-gray-500 hover:text-gray-700'
            aria-label='閉じる'
          >
            <X size={20} />
          </button>
        </div>
        <div className='w-full p-4'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
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
              onKeyDown={handleKeyDown}
              className='w-full rounded-md border p-2 outline-none'
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
