'use client';

import { ICON_IMAGE_BASE_URL } from '@/lib/constants/baseUrl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const SidebarProfileLinkButton = ({
  page,
  label,
  iconUrl,
}: {
  page: string;
  label: string;
  iconUrl: string;
}) => {
  const pathname = usePathname();
  const activePage = pathname;
  return (
    <Link
      key={page}
      href={page}
      className={`flex w-full items-center justify-center rounded px-6 py-1 font-bold transition-colors duration-200 ${
        activePage === page ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 hover:text-blue-600'
      } xl:justify-start xl:px-4 xl:py-2`}
    >
      <div className='flex size-10 items-center justify-center'>
        <Avatar>
          <AvatarImage src={`${ICON_IMAGE_BASE_URL}${iconUrl}`} alt='icon' />
          <AvatarFallback>INIAD</AvatarFallback>
        </Avatar>
      </div>
      <span className='hidden xl:ml-3 xl:block'>{label}</span>
    </Link>
  );
};

export default SidebarProfileLinkButton;
