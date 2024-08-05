'use client';

import { Antenna, BookOpen, HelpCircle, Home, LucideIcon, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AddPost } from '../timeline/AddPostModal';

type NavItem = {
  page: string;
  label: string;
  icon: LucideIcon;
};

type Props = {
  userId: string;
};

const SideBar: React.FC<Props> = ({ userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { page: '/timeline/all', label: 'タイムライン', icon: Home },
    { page: '/assignmentshare/all', label: '課題共有', icon: BookOpen },
    { page: '/question/all', label: '質問スペース', icon: HelpCircle },
    { page: `/profile/${userId}`, label: 'プロフィール', icon: User },
  ];

  const isActive = (page: string) => {
    if (page === '/timeline/all') {
      return pathname === page || pathname.startsWith('/timeline');
    }
    return pathname === page || pathname.startsWith(page);
  };

  return (
    <div className='flex w-20 flex-col items-center border-r border-gray-200 bg-white p-4 transition-all duration-300 ease-in-out xl:w-80'>
      {isModalOpen && <AddPost closeModal={closeModal} />}
      <Link href={'/timeline/all'}>
        <h1 className='mb-4 hidden text-2xl font-bold text-blue-600 xl:block'>INIAD SNS</h1>
      </Link>
      {navItems.map(({ page, label, icon: Icon }) => (
        <Link
          key={page}
          href={page}
          className={`mb-2 flex w-full items-center justify-center rounded p-2 font-bold transition-colors duration-200 ${
            isActive(page) ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 hover:text-blue-600'
          } xl:justify-start`}
        >
          <div className='flex size-10 items-center justify-center'>
            <Icon size={24} />
          </div>
          <span className='hidden xl:ml-3 xl:inline'>{label}</span>
        </Link>
      ))}
      <div
        className='mt-4 flex w-full items-center justify-center rounded bg-blue-600 p-2 font-bold text-white transition-colors duration-200 hover:bg-blue-800 xl:w-2/4'
        onClick={openModal}
      >
        <div className='flex w-full items-center justify-center'>
          <div className='flex items-center xl:mr-2'>
            <Antenna size={24} />
          </div>
          <span className='hidden xl:inline'>ポスト</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
