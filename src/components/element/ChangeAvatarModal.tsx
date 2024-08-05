import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useState } from 'react';
import { Dropzone } from './Dropzone';

type changeAvatarModalProps = {
  onSave: (file: File) => void;
  className?: string;
  onClose: () => void;
};

export const ChangeAvatarModal: React.FC<changeAvatarModalProps> = ({
  onSave,
  onClose,
  className,
}) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = (files: File[]) => {
    files && setFile(files[0]);
  };

  const _onSave = () => {
    // save & close
    file && onSave(file);
    onClose();
  };

  return (
    <div
      className={cn(
        'absolute left-0 top-0 z-50 flex min-h-svh w-screen items-center justify-center bg-black/30',
        className,
      )}
      onClick={onClose}
    >
      <div
        className='flex max-h-[95svh] w-[90vw] flex-col items-center justify-center gap-y-2 rounded-md bg-white p-3 sm:max-h-[90svh] sm:w-[400px]'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex size-full justify-between'>
          <div className='flex items-center gap-x-2'>
            <button type='button' onClick={onClose}>
              <X />
            </button>
            <h2 className='w-full text-start font-bold'>アバターをアップロード</h2>
          </div>
          <button
            type='button'
            onClick={_onSave}
            className='rounded-md bg-blue-500 px-3 py-1 text-white'
          >
            保存
          </button>
        </div>
        <Dropzone onDrop={onDrop} className='w-full overflow-y-auto' />
      </div>
    </div>
  );
};
