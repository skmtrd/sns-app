'use client';
import { formatTime } from '@/lib/formatTime';
import { Tag } from '@/lib/types';
import { MoreVertical, Share, Trash } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useSWRConfig } from 'swr';
import UserTag from '../element/UserTag';
type PostProps = {
  username: string;
  clerkId: string;
  userId: string;
  timestamp: string;
  content: string;
  tags: Tag[];
  postId: string;
};
// const deletePost = async (id: string) => {
//   const toDelete = `http://localhost:3000/api/post/${id}`;
//   try {
//     const res = await fetch(toDelete, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     return (await res).json();
//   } catch (error) {
//     console.error(error);
//   }
// };
export const Post: React.FC<PostProps> = ({
  username,
  timestamp,
  clerkId,
  userId,
  content,
  tags,
  postId,
}) => {
  const { mutate } = useSWRConfig();
  const [time, setTime] = useState(new Date());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // const handleDelete = async (id: string) => {
  //   await deletePost(id);
  //   router.refresh();
  // };

  const deletePost = async (id: string) => {
    const toDelete = `http://localhost:3000/api/post/${id}`;
    try {
      const res = await fetch(toDelete, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      mutate('/api/post');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const updateDate = setInterval(() => {
      setTime(new Date());
    }, 1000);
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      clearInterval(updateDate);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative w-11/12 rounded-lg bg-white p-4 shadow'>
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
        {tags &&
          tags.map((tag) => (
            <Link key={tag.id} href={`/timeline/${tag.id}`}>
              <UserTag tagName={tag.name} />
            </Link>
          ))}
      </div>
      <div className='absolute bottom-2 right-2'>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className='text-gray-500 hover:text-gray-700'
        >
          <MoreVertical size={20} />
        </button>
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className='absolute bottom-full right-0 mb-2 w-32 rounded-md bg-white shadow-lg ring-1 ring-black/50'
          >
            <div className='py-1'>
              <button
                onClick={() => {
                  deletePost(postId);
                }}
                className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100'
              >
                <Trash size={16} className='mr-2 inline-block' />
                削除
              </button>
              <button className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100'>
                <Share size={16} className='mr-2 inline-block' />
                共有
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
