'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const RightSideBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();
  const keyHandler = (event: React.KeyboardEvent) => {
    const key = event.key;
    console.log(searchInput);
    if (key === 'Enter') {
      router.push(`/timeline/search/${searchInput}`);
    }
    return;
  };
  return (
    <div className='z-20 ml-auto hidden w-80 border-l border-gray-200 bg-white p-4 font-bold xl:inline'>
      <div>
        <input
          type='text'
          placeholder='検索'
          value={searchInput}
          onChange={(e) => setSearchInput(e.currentTarget.value)}
          onKeyDown={keyHandler}
        ></input>
      </div>
    </div>
  );
};

export default RightSideBar;
