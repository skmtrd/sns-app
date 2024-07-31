'use client';

import { BookOpen, HelpCircle, Home, LucideIcon, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = {
  page: string;
  label: string;
  icon: LucideIcon;
};

type Props = {
  userId: string;
};

const SideBar: React.FC<Props> = ({ userId }) => {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { page: '/timeline/all', label: 'タイムライン', icon: Home },
    { page: '/assiignment', label: '課題共有', icon: BookOpen },
    { page: '/question', label: '質問スペース', icon: HelpCircle },
    { page: `/profile/${userId}`, label: 'プロフィール', icon: User },
  ];

  const isActive = (page: string) => {
    if (page === '/timeline/all') {
      return pathname === page || pathname.startsWith('/timeline');
    }
    return pathname === page || pathname.startsWith(page);
  };

  return (
    <div className='w-20 border-r border-gray-200 bg-white p-4 transition-all duration-300 ease-in-out md:w-80'>
      <Link href={'/timeline/all'}>
        <h1 className='mb-4 hidden text-2xl font-bold text-blue-600 md:block'>INIAD SNS</h1>
      </Link>
      {navItems.map(({ page, label, icon: Icon }) => (
        <Link
          key={page}
          href={page}
          className={`mb-2 flex w-full items-center justify-center rounded p-2 font-bold transition-colors duration-200 ${
            isActive(page) ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 hover:text-blue-600'
          } md:justify-start`}
        >
          <div className='flex size-10 items-center justify-center'>
            <Icon size={24} />
          </div>
          <span className='hidden md:ml-3 md:inline'>{label}</span>
        </Link>
      ))}
    </div>
  );
};

export default SideBar;
