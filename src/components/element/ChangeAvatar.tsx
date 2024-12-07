'use client';
import { cn } from '@/lib/utils';
import { Pen } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { ChangeAvatarModal } from './ChangeAvatarModal';

type changeAvatarProps = {
  onFileChange: (file: File) => void;
  value?: string;
  className?: string;
};

export const ChangeAvatar: React.FC<changeAvatarProps> = ({ onFileChange, className, value }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(value ?? null);

  const _onFileChange = (file: File) => {
    onFileChange(file);
    setAvatar(URL.createObjectURL(file));
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      {isModalOpen && (
        <ChangeAvatarModal onSave={_onFileChange} onClose={() => setIsModalOpen(false)} />
      )}
      <div className='relative flex aspect-square size-28 select-none items-center justify-center sm:justify-normal'>
        {avatar ? (
          <Image
            src={avatar}
            alt='avatar'
            className='box-border size-28 cursor-pointer rounded-full border-2 border-gray-300 object-cover'
            width={160}
            height={160}
            onClick={() => setIsModalOpen(true)}
            draggable={false}
          />
        ) : (
          <div
            className='flex size-full cursor-pointer items-center justify-center rounded-full bg-gray-200 text-gray-500'
            onClick={() => setIsModalOpen(true)}
          >
            No Image
          </div>
        )}
        <button
          type='button'
          className='absolute bottom-3 left-[90px] -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-500 p-1.5 text-white'
          onClick={() => setIsModalOpen(true)}
        >
          <Pen size={16} />
        </button>
      </div>
    </div>
  );
};
