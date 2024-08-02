import { formatTime } from '@/lib/formatTime';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import UserTag from '../element/UserTag';

type PostProps = {
  username: string;
  clerkId: string;
  userId: string;
  timestamp: string;
  content: string;
};

type Tag = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const fetchUserTag = async (userId: string) => {
  const res = await fetch('http://localhost:3000/api/tag/tagGetById', {
    method: 'POST',
    body: JSON.stringify({ userId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data.data;
};

export const Post: React.FC<PostProps> = ({ username, timestamp, clerkId, userId, content }) => {
  const [postTags, setPostTags] = useState<Tag[]>([]);
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const updateDate = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(updateDate);
  }, []);

  useEffect(() => {
    // console.log('userId:', userId);
    const getUserTag = async () => {
      try {
        const userTag = await fetchUserTag(userId);
        setPostTags(userTag.tags);
      } catch (error) {
        console.error('Failed to fetch user tag:', error);
      }
    };
    getUserTag();
  }, []);

  return (
    <div className='w-11/12 rounded-lg bg-white p-4 shadow'>
      <div className='mb-2 flex items-start justify-between'>
        <div>
          <Link href={`/profile/${clerkId}`}>
            <div className='inline-block rounded-md hover:bg-gray-100'>
              <h3 className='px-1 py-0.5 font-bold transition-colors duration-100 hover:text-blue-600'>
                {username}
              </h3>
            </div>
          </Link>
          <p className='px-1 py-0.5 text-xs text-gray-500'>@{userId}</p>
        </div>
        <p className='mr-1 text-sm text-gray-500'>{formatTime(timestamp, time)}</p>
      </div>
      <p className='mb-2 ml-1'>{content}</p>
      <div className='flex flex-wrap gap-2'>
        {postTags && postTags.map((tag: Tag) => <UserTag key={tag.id} tagName={tag.name} />)}
      </div>
    </div>
  );
};
