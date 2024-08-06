'use client';

import { formatTime } from '@/lib/formatTime';
import { Reply } from '@/lib/types';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const updateDate = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(updateDate);
    };
  }, []);

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
      {replies.length > 0 ? (
        <QuestionReply reply={replies[0]} />
      ) : (
        <p className='mt-4 font-semibold text-red-500'>まだ回答がありません</p>
      )}
    </div>
  );
};

export default QuestionPost;
