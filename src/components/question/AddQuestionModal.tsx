'use client';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';

type AddQuestionProps = {
  closeModal: () => void;
};

type FormInputs = {
  title: string;
  description: string;
};

const MAX_TITLE_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 500;

export const AddQuestion: React.FC<AddQuestionProps> = ({ closeModal }) => {
  const { mutate } = useSWRConfig();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<FormInputs>();

  const title = watch('title');
  const description = watch('description');

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    clearErrors();

    const newQuestion = {
      title: data.title,
      description: data.description,
    };

    try {
      const response = await fetch('/api/question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestion),
      });

      if (!response.ok) {
        throw new Error('質問の投稿に失敗しました');
      }

      mutate('/api/question');
      closeModal();
    } catch (err: any) {
      setError('root', {
        type: 'manual',
        message: err.message,
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
    const titleInput = document.getElementById('title');
    titleInput?.focus();
  }, []);

  return (
    <div
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
            質問する
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
            <div>
              <input
                id='title'
                type='text'
                {...register('title', {
                  required: 'タイトルを入力してください',
                  maxLength: {
                    value: MAX_TITLE_LENGTH,
                    message: `${MAX_TITLE_LENGTH}文字以内で入力してください`,
                  },
                })}
                maxLength={MAX_TITLE_LENGTH}
                placeholder='質問のタイトル'
                className='w-full rounded-md border p-2 font-medium text-black outline-none'
                aria-invalid={errors.title ? 'true' : 'false'}
                onKeyDown={handleKeyDown}
              />
              <div className='mt-1 flex w-full justify-end'>
                <p
                  className={cn(
                    'text-sm',
                    title?.length === MAX_TITLE_LENGTH ? 'text-red-500' : 'text-gray-400',
                  )}
                >
                  {title?.length || 0} / {MAX_TITLE_LENGTH}
                </p>
              </div>
              {errors.title && <p className='mt-1 text-sm text-red-500'>{errors.title.message}</p>}
            </div>

            <div>
              <textarea
                id='description'
                {...register('description', {
                  required: '詳細を入力してください',
                  maxLength: {
                    value: MAX_DESCRIPTION_LENGTH,
                    message: `${MAX_DESCRIPTION_LENGTH}文字以内で入力してください`,
                  },
                })}
                placeholder='質問の詳細'
                maxLength={MAX_DESCRIPTION_LENGTH}
                rows={6}
                className='w-full rounded-md border p-2 font-medium text-black outline-none'
                aria-invalid={errors.description ? 'true' : 'false'}
                onKeyDown={handleKeyDown}
              />
              <div className='mt-1 flex w-full justify-end'>
                <p
                  className={cn(
                    'text-sm',
                    description?.length === MAX_DESCRIPTION_LENGTH
                      ? 'text-red-500'
                      : 'text-gray-400',
                  )}
                >
                  {description?.length || 0} / {MAX_DESCRIPTION_LENGTH}
                </p>
              </div>
              {errors.description && (
                <p className='mt-1 text-sm text-red-500'>{errors.description.message}</p>
              )}
            </div>

            <button
              type='submit'
              className={cn(
                'rounded-md bg-blue-500 py-2 text-white',
                (isSubmitting || !title || !description) && 'opacity-50',
              )}
              disabled={isSubmitting || !title || !description}
            >
              {isSubmitting ? '投稿中...' : '質問を投稿する'}
            </button>
            {errors.root && <p className='text-red-500'>{errors.root.message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};
