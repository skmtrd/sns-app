'use client';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { useSWRConfig } from 'swr';

export const AddPost = () => {
  const { mutate } = useSWRConfig();
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className='w-full p-4'>
      <form
        onSubmit={async (e: React.FormEvent) => {
          e.preventDefault();
          handleSubmit();
        }}
        className='flex flex-col gap-4'
      >
        <textarea
          placeholder='内容を入力してください'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          className='rounded-md border p-2'
          required
        />
        <button
          type='submit'
          className={cn(
            'bg-blue-500 py-2 text-white rounded-md',
            loading || (!content && 'opacity-50'),
          )}
          disabled={loading || content.length < 1}
        >
          {loading ? '投稿中...' : '投稿する'}
        </button>
        {error && <p className='text-red-500'>{error}</p>}
      </form>
    </div>
  );
};
