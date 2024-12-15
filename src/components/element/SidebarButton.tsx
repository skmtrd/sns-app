'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarButton = ({
  page,
  label,
  icon,
}: {
  page: string;
  label: string;
  icon: React.ReactNode;
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
      <div className='flex size-10 items-center justify-center'>{icon}</div>
      <span className='hidden xl:ml-3 xl:inline'>{label}</span>
    </Link>
  );
};

export default SidebarButton;
