'use client';
import { Radar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const RightSideBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();
  const handleKeyInput = (event: React.KeyboardEvent) => {
    const key = event.key;
    if (key === 'Enter') {
      router.push(`/timeline/search/${searchInput}`);
    }
    return;
  };
  return (
    <div className='z-20 ml-auto hidden w-80 border-l border-gray-200 bg-white p-4 font-bold xl:flex xl:justify-center'>
      <div className='flex h-8 w-11/12 items-center justify-center gap-4 rounded-2xl ring-1 ring-blue-500'>
        <Radar size={20} color={'rgb(59 130 246)'} />
        <input
          className='w-9/12 outline-none'
          type='text'
          placeholder='検索'
          value={searchInput}
          onChange={(e) => setSearchInput(e.currentTarget.value)}
          onKeyDown={handleKeyInput}
        />
      </div>
    </div>
  );
};

export default RightSideBar;
