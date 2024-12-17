import { getUserId } from '@/app/api/lib/getUserId';
import {
  Antenna,
  BookHeart,
  BookMarked,
  CircleUser,
  ClipboardList,
  FilePenLine,
  FolderClock,
  Hand,
  HelpCircle,
  Home,
} from 'lucide-react';
import Link from 'next/link';
import SidebarLinkingButton from '../element/SidebarButton';
import SidebarPostingButton from '../element/SidebarPostingButton';
type NavItem = {
  page: string;
  label: string;
  icon: React.ReactNode;
};

const SideBar = async () => {
  const userId = await getUserId();

  const navItems1: NavItem[] = [
    { page: '/timeline', label: 'タイムライン', icon: <Home /> },
    { page: '/assignmentshare', label: '課題共有', icon: <ClipboardList /> },
    { page: '/question', label: '質問スペース', icon: <HelpCircle /> },
  ];

  const navItems2: NavItem[] = [
    { page: '/likes', label: 'いいねしたポスト', icon: <BookHeart /> },
    { page: '/my-assignments', label: '登録した課題', icon: <FolderClock /> },
    { page: '/bookmarks', label: 'ブックマークした質問', icon: <BookMarked /> },
  ];

  const navItems3: NavItem[] = [
    {
      page: `/profile/${userId}`,
      label: 'プロフィール',
      icon: <CircleUser size={22} />,
    },
  ];

  const postingItems: NavItem[] = [
    { page: '/post/new', label: 'ポスト', icon: <Antenna size={22} /> },
    { page: '/question/new', label: '質問', icon: <Hand size={22} /> },
    { page: '/assignment/new', label: '課題', icon: <FilePenLine size={22} /> },
  ];

  return (
    <div className='z-20 flex w-16 flex-col items-center overflow-y-auto overflow-x-hidden border-r border-gray-200 bg-white p-4 transition-all duration-300 ease-in-out xl:w-80'>
      <Link href={'/timeline/all'}>
        <h1 className='mb-4 hidden text-2xl font-bold text-blue-600 xl:block'>INIAD SNS</h1>
      </Link>

      {navItems1.map(({ page, label, icon: Icon }) => (
        <SidebarLinkingButton key={page} page={page} label={label} icon={Icon} />
      ))}
      <div className='my-[10px] h-[3px] w-full bg-gray-200' />
      {navItems2.map(({ page, label, icon: Icon }) => (
        <SidebarLinkingButton key={page} page={page} label={label} icon={Icon} />
      ))}
      <div className='my-[10px] h-[3px] w-full bg-gray-200' />
      {navItems3.map(({ page, label, icon: Icon }) => (
        <SidebarLinkingButton key={page} page={page} label={label} icon={Icon} />
      ))}
      {postingItems.map(({ label, icon: Icon }) => (
        <SidebarPostingButton key={label} label={label as 'ポスト' | '質問' | '課題'} icon={Icon} />
      ))}
    </div>
  );
};

export default SideBar;
