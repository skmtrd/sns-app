'use client';

import { Profile } from '@/lib/types';
import { usePathname } from 'next/navigation';

type TimeLineHeaderProps = {
  userInfo: Profile;
  handleTagClick: (tagId: string) => void;
  currentTagId: string | null;
};

const FixedHeader: React.FC<TimeLineHeaderProps> = ({ userInfo, handleTagClick, currentTagId }) => {
  const pathname = usePathname();

  const tags = [
    {
      id: 'all',
      name: 'すべて',
    },
    ...(userInfo?.tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
    })) || []),
  ];

  if (currentTagId === null) {
    const path = pathname.split('/');
    const tagId = path[path.length - 1];
    handleTagClick(tagId);
  }

  return (
    <div className='fixed left-16 top-0 z-10 w-[calc(100%-4rem)] flex-col items-center justify-center overflow-x-hidden border-x-gray-200 border-t-gray-200 bg-white px-4 py-5 xl:left-80 xl:w-[calc(100%-40rem)]'>
      <div className='flex justify-evenly'>
        {tags.map((tag) => (
          <div key={tag.id} className='flex flex-col items-center'>
            <button className='text-base font-bold' onClick={() => handleTagClick(tag.id)}>
              {tag.name}
            </button>
            <div
              className={`h-[3px] w-full rounded-full ${currentTagId === tag.id ? 'bg-blue-600' : 'bg-transparent'}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FixedHeader;
