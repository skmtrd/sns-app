'use client';

import { formatTime } from '@/lib/formatTime';
import { Reply } from '@/lib/types';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
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
  }, [replies]);

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
              <div className='mt-2 flex w-full justify-end'>
                <button
                  onClick={handleDrawerToggle}
                  className='flex items-center justify-center rounded px-2 py-1 text-blue-600 transition-colors hover:bg-blue-200'
                >
                  {isDrawerOpen ? <ChevronUp className='mr-1' /> : <ChevronDown className='mr-1' />}
                  <p>{isDrawerOpen ? '閉じる' : 'もっと見る'}</p>
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <p className='mt-4 font-semibold text-red-500'>まだ回答がありません</p>
      )}
    </div>
  );
};

export default QuestionPost;
