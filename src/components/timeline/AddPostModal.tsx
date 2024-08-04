'use client';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useSWRConfig } from 'swr';

type AddPostProps = {
  closeModal: () => void;
};

export const AddPost: React.FC<AddPostProps> = ({ closeModal }) => {
  const { mutate } = useSWRConfig();
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const textAriaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    const newPost = {
      author: { name: authorName },
      createdAt: new Date().toISOString(),
      content,
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
      setAuthorName('');
      setContent('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
    }
  };

  useEffect(() => {
    textAriaRef.current?.focus();
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
            新規投稿
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
          <form
            className='flex flex-col gap-4'
            onSubmit={async (e: React.FormEvent) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <textarea
              placeholder='内容を入力してください'
              value={content}
              rows={10}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              className='w-full rounded-md border p-2 outline-none'
              ref={textAriaRef}
              required
            />
            <button
              type='submit'
              className={cn(
                'rounded-md bg-blue-500 py-2 text-white',
                (loading || !content) && 'opacity-50',
              )}
              disabled={loading || content.length < 1}
            >
              {loading ? '投稿中...' : '投稿する'}
            </button>
            {error && <p className='text-red-500'>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};
