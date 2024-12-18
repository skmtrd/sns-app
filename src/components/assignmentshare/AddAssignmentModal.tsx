'use client';
import { cn } from '@/lib/utils';
import { ImageIcon, X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';

type AddAssignmentProps = {
  closeModal: () => void;
};

type FormInputs = {
  title: string;
  description: string;
  deadlineDate: string;
  deadlineTime: string;
  image?: FileList;
};

const MAX_TITLE_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 500;

export const AddAssignment: React.FC<AddAssignmentProps> = ({ closeModal }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { mutate } = useSWRConfig();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<FormInputs>({
    defaultValues: {
      deadlineDate: new Date().toISOString().split('T')[0],
      deadlineTime: '23:59',
    },
  });

  const title = watch('title');
  const description = watch('description');

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

    if (image && image.length > 0) {
      formData.append('image', image[0]);
    }
    const deadlineDateTime = `${data.deadlineDate}/${data.deadlineTime}`;

    console.log(deadlineDateTime);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('deadLine', deadlineDateTime);

    // console.log(newAssignment);

    try {
      const response = await fetch('/api/assignment', {
        method: 'POST',

        body: formData,
      });

      if (!response.ok) {
        throw new Error('課題の投稿に失敗しました');
      }

      mutate('/api/assignment');
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
            課題を共有する
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
                placeholder='課題のタイトル'
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
                placeholder='課題の詳細'
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

            <div className='flex gap-2'>
              <div className='flex-1'>
                <input
                  id='deadlineDate'
                  type='date'
                  {...register('deadlineDate', {
                    required: '締め切り日を入力してください',
                  })}
                  className='w-full rounded-md border p-2 font-medium text-black outline-none'
                  aria-invalid={errors.deadlineDate ? 'true' : 'false'}
                />
                {errors.deadlineDate && (
                  <p className='mt-1 text-sm text-red-500'>{errors.deadlineDate.message}</p>
                )}
              </div>
              <div className='flex-1'>
                <input
                  id='deadlineTime'
                  type='time'
                  {...register('deadlineTime', {
                    required: '締め切り時刻を入力してください',
                  })}
                  className='w-full rounded-md border p-2 font-medium text-black outline-none'
                  aria-invalid={errors.deadlineTime ? 'true' : 'false'}
                />
                {errors.deadlineTime && (
                  <p className='mt-1 text-sm text-red-500'>{errors.deadlineTime.message}</p>
                )}
              </div>
            </div>
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
                (isSubmitting || !title || !description) && 'opacity-50',
              )}
              disabled={isSubmitting || !title || !description}
            >
              {isSubmitting ? '投稿中...' : '課題を共有する'}
            </button>
            {errors.root && <p className='text-red-500'>{errors.root.message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};
