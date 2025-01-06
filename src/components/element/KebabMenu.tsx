'use client';

import { MoreVertical, Trash } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { isAdminUser } from '../../app/api/lib/isAdminUser';

type KebabMenuProps = {
  currentUserId: string;
  authorUserId: string;
  contentId: string;
  handleDelete: Promise<(postId: string) => Promise<void>>;
};

const KebabMenu: React.FC<KebabMenuProps> = ({
  currentUserId,
  authorUserId,
  handleDelete,
  contentId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isAdmin = isAdminUser(currentUserId);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative' ref={menuRef}>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleMenu();
        }}
        className='text-gray-500 hover:text-gray-700'
      >
        <MoreVertical size={20} fill='red' />
      </button>
      {isOpen && (
        <div className='absolute bottom-full right-0 mb-2 w-48 rounded-lg bg-white shadow-lg transition-all hover:bg-gray-100'>
          <div className='py-1'>
            {(currentUserId === authorUserId || isAdmin) && (
              <button
                onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  (await handleDelete)(contentId);
                }}
                className='flex w-full items-center px-4 py-2.5 text-left text-sm text-gray-700 transition-colors hover:text-red-600 focus:outline-none active:bg-gray-100'
              >
                <Trash size={16} className='mr-3 inline-block' />
                削除
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default KebabMenu;
