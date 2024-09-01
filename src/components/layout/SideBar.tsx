'use client';

import {
  Antenna,
  BookHeart,
  BookMarked,
  BookOpen,
  FilePenLine,
  FolderClock,
  Hand,
  HelpCircle,
  Home,
  LucideIcon,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AddAssignment } from '../assignmentshare/AddAssignmentModal';
import { AddQuestion } from '../question/AddQuestionModal';
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
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const handleTogglePostModal = () => setIsPostModalOpen(!isPostModalOpen);
  const handleToggleQuestionModal = () => setIsQuestionModalOpen(!isQuestionModalOpen);
  const handleToggleAssignmentModal = () => setIsAssignmentModalOpen(!isAssignmentModalOpen);
  const pathname = usePathname();

  const navItems1: NavItem[] = [
    { page: '/timeline/all', label: 'タイムライン', icon: Home },
    { page: '/assignmentshare/all', label: '課題共有', icon: BookOpen },
    { page: '/question/all', label: '質問スペース', icon: HelpCircle },
    { page: `/profile/${userId}`, label: 'プロフィール', icon: User },
  ];

  const navItems2: NavItem[] = [
    { page: '/likes', label: 'いいねしたポスト', icon: BookHeart },
    { page: '/bookmarks', label: 'ブックマークした質問', icon: BookMarked },
    { page: '/my-assignments', label: '登録した課題', icon: FolderClock },
  ];

  const isActive = (page: string) => {
    if (page === '/timeline/all') {
      return pathname === page || pathname.startsWith('/timeline');
    }
    return pathname === page || pathname.startsWith(page);
  };

  return (
    <div className='z-20 flex w-16 flex-col items-center border-r border-gray-200 bg-white p-4 transition-all duration-300 ease-in-out xl:w-80'>
      {isPostModalOpen && <AddPost closeModal={handleTogglePostModal} />}
      {isQuestionModalOpen && <AddQuestion closeModal={handleToggleQuestionModal} />}
      {isAssignmentModalOpen && <AddAssignment closeModal={handleToggleAssignmentModal} />}
      <Link href={'/timeline/all'}>
        <h1 className='mb-4 hidden text-2xl font-bold text-blue-600 xl:block'>INIAD SNS</h1>
      </Link>
      {navItems1.map(({ page, label, icon: Icon }) => (
        <Link
          key={page}
          href={page}
          className={`mb-2 flex w-full items-center justify-center rounded px-6 py-1 font-bold transition-colors duration-200 ${
            isActive(page) ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 hover:text-blue-600'
          } xl:mb-4 xl:justify-start xl:px-4 xl:py-2`}
        >
          <div className='flex size-10 items-center justify-center'>
            <Icon size={24} />
          </div>
          <span className='hidden xl:ml-3 xl:inline'>{label}</span>
        </Link>
      ))}
      <div className='mt-4'></div>
      {navItems2.map(({ page, label, icon: Icon }) => (
        <Link
          key={page}
          href={page}
          className={`mb-2 flex w-full items-center justify-center rounded px-6 py-1 font-bold transition-colors duration-200 ${
            isActive(page) ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 hover:text-blue-600'
          } xl:mb-4 xl:justify-start xl:px-4 xl:py-2`}
        >
          <div className='flex size-10 items-center justify-center'>
            <Icon size={24} />
          </div>
          <span className='hidden xl:ml-3 xl:inline'>{label}</span>
        </Link>
      ))}
      <div
        className='mt-4 flex w-full items-center justify-center rounded bg-blue-600 px-6 py-3 font-bold text-white transition-colors duration-200 hover:bg-blue-800 xl:w-2/4'
        onClick={handleTogglePostModal}
      >
        <div className='flex w-full items-center justify-center'>
          <div className='flex items-center xl:mr-2'>
            <Antenna size={22} />
          </div>
          <span className='hidden xl:inline'>ポスト</span>
        </div>
      </div>
      <div
        className='mt-4 flex w-full items-center justify-center rounded bg-blue-600 px-6 py-3 font-bold text-white transition-colors duration-200 hover:bg-blue-800 xl:w-2/4'
        onClick={handleToggleQuestionModal}
      >
        <div className='flex w-full items-center justify-center'>
          <div className='flex items-center xl:mr-2'>
            <Hand size={22} />
          </div>
          <span className='hidden xl:inline'>質問</span>
        </div>
      </div>
      <div
        className='mt-4 flex w-full items-center justify-center rounded bg-blue-600 px-6 py-3 font-bold text-white transition-colors duration-200 hover:bg-blue-800 xl:w-2/4'
        onClick={handleToggleAssignmentModal}
      >
        <div className='flex w-full items-center justify-center'>
          <div className='flex items-center xl:mr-2'>
            <FilePenLine size={22} />
          </div>
          <span className='hidden xl:inline'>課題</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
