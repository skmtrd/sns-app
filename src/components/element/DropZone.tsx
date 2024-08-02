import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

type DropZoneProps = {
  onDrop?: (files: File[]) => void;
  className?: string;
};

export const Dropzone: React.FC<DropZoneProps> = ({ onDrop, className }) => {
  const [files, setFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps, isDragActive, isDragReject, acceptedFiles } = useDropzone({
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'] },
    maxFiles: 1,
    onDrop: (acceptedFiles: File[]) => {
      onDrop && onDrop(acceptedFiles);
      setFiles(acceptedFiles);
    },
    disabled: files.length > 0,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'rounded-md border-2 border-dashed border-gray-300 p-4 text-center',
        className,
        isDragActive ? 'border-blue-500' : '',
      )}
    >
      {!acceptedFiles.length ? (
        <div>
          <input {...getInputProps()} />
          <p className='font-bold'>ファイルをドロップ</p>
          <p>または</p>
          <button type='button' className='rounded bg-blue-500 px-4 py-2 text-white'>
            ファイルを選択
          </button>
        </div>
      ) : isDragReject ? (
        <p className='text-red-500'>画像ファイルのみアップロード可能です</p>
      ) : (
        files.map((file) => (
          <div key={file.name} className='flex flex-col items-center'>
            <div className='flex w-full items-center justify-between'>
              <p>
                {file.name} ({Math.ceil(file.size / 1024)}KB)
              </p>
              <button
                type='button'
                className='rounded-md px-2 text-red-500 hover:bg-red-100 hover:text-red-700'
                onClick={(e) => {
                  setFiles([]);
                  acceptedFiles.splice(acceptedFiles.indexOf(file), 1);
                }}
              >
                削除
              </button>
            </div>
            <Image
              src={URL.createObjectURL(file)}
              alt={file.name}
              className='size-32 object-cover'
              width={400}
              height={400}
            />
          </div>
        ))
      )}
    </div>
  );
};
