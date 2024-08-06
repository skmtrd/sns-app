'use client';

import { formatTime } from '@/lib/formatTime';
import { Reply } from '@/lib/types';
import { ChevronDown, ChevronUp, MessageCircle, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import QuestionReply from './QuestionReply';

type QuestionPostProps = {
  username: string;
  clerkId: string;
  id: string;
  postId: string;
  timestamp: string;
  title: string;
  description: string;
  replies: Reply[];
};

type ReplyFormData = {
  content: string;
};

const QuestionPost: React.FC<QuestionPostProps> = ({
  username,
  clerkId,
  postId,
  id,
  timestamp,
  title,
  description,
  replies,
}) => {
  const [time, setTime] = useState(new Date());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isReplyDrawerOpen, setIsReplyDrawerOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [replyContentHeight, setReplyContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const replyContentRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReplyFormData>();

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleReplyDrawerToggle = () => {
    setIsReplyDrawerOpen(!isReplyDrawerOpen);
  };

  const onSubmit = async (data: ReplyFormData) => {
    const newReply = {
      content: data.content,
      questionId: postId,
    };
    try {
      const response = await fetch(`/api/question/${postId}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReply),
      });
      mutate('/api/question');
      reset();
      setIsReplyDrawerOpen(false);
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    const updateDate = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(updateDate);
    };
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
    if (replyContentRef.current) {
      setReplyContentHeight(replyContentRef.current.scrollHeight);
    }
  }, [replies, isReplyDrawerOpen]);

  return (
    <div key={id} className='w-11/12 rounded-lg bg-white p-6 shadow'>
      <div className='flex items-start justify-between'>
        <div>
          <h3 className='text-lg font-bold'>{title}</h3>
          <p className='text-sm text-gray-600'>{username}さん</p>
          <p className='mt-2'>{description}</p>
        </div>
        <p className='mr-1 text-sm text-gray-500'>{formatTime(timestamp, time)}</p>
      </div>
      <h4 className='mt-4 font-semibold'>回答({replies.length})</h4>
      {replies.length > 0 ? (
        <>
          <QuestionReply reply={replies[0]} amountOfReply={replies.length} />
          {replies.length > 1 && (
            <>
              <div
                ref={contentRef}
                className='overflow-hidden transition-all duration-500 ease-in-out'
                style={{ height: isDrawerOpen ? `${contentHeight}px` : '0' }}
              >
                {replies.slice(1).map((reply, index) => (
                  <QuestionReply key={index} reply={reply} amountOfReply={replies.length} />
                ))}
              </div>
              <div className='mt-6 flex w-full items-center justify-between'>
                <button
                  onClick={handleReplyDrawerToggle}
                  className='flex items-center justify-center rounded-full bg-blue-400 px-4 py-2 text-white transition-all hover:bg-blue-600 hover:shadow-lg'
                >
                  <MessageCircle size={20} />
                </button>
                <button
                  onClick={handleDrawerToggle}
                  className='flex items-center justify-center rounded-full bg-blue-100 px-4 py-2 text-blue-600 transition-all hover:bg-blue-200'
                >
                  {isDrawerOpen ? <ChevronUp /> : <ChevronDown />}
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <p className='mt-4 font-semibold text-red-500'>まだ回答がありません</p>
      )}

      {replies.length <= 1 && (
        <div className='mt-6'>
          <button
            onClick={handleReplyDrawerToggle}
            className='flex items-center justify-center rounded-full bg-blue-400 px-4 py-2 text-white transition-all hover:bg-blue-600 hover:shadow-lg'
          >
            <MessageCircle size={20} />
          </button>
        </div>
      )}

      <div
        ref={replyContentRef}
        className='overflow-hidden transition-all duration-500 ease-in-out'
        style={{ height: isReplyDrawerOpen ? `${replyContentHeight}px` : '0' }}
      >
        <form
          onSubmit={async (e: React.FormEvent) => {
            e.preventDefault();
            handleSubmit(onSubmit)();
          }}
          className='mt-4'
        >
          <textarea
            {...register('content', { required: '回答を入力してください' })}
            className='w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200'
            rows={4}
            placeholder='回答を入力してください'
          />
          {errors.content && <p className='mt-1 text-sm text-red-500'>{errors.content.message}</p>}
          <div className='mt-3 text-right'>
            <button
              type='submit'
              className='mb-4 inline-flex items-center justify-center rounded-full bg-green-500 px-4 py-2 text-white transition-all hover:bg-green-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2'
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionPost;
