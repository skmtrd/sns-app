import { cn } from '@/lib/utils';
import { Upload } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

type DropzoneProps = {
  onDrop: (files: File[]) => void;
  className?: string;
};

export const Dropzone: React.FC<DropzoneProps> = ({ onDrop, className }) => {
  const [files, setFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps, isDragActive, isDragReject, acceptedFiles } = useDropzone({
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'] },
    maxFiles: 1,
    onDrop: useCallback(
      (acceptedFiles: File[]) => {
        onDrop(acceptedFiles);
        setFiles(acceptedFiles);
      },
      [onDrop],
    ),
    disabled: files.length > 0,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'max-h-full max-w-full rounded-md border-2 border-dashed border-gray-300 p-4 text-center',
        className,
        isDragActive ? 'border-blue-500' : '',
      )}
    >
      {!acceptedFiles.length ? (
        // if no files are selected or set
        <div className='flex flex-col items-center gap-y-2'>
          <input {...getInputProps()} />
          <Upload size='50' />
          <p className='font-bold'>ファイルをドロップ</p>
          <p>または</p>
          <button type='button' className='rounded bg-blue-500 px-4 py-2 text-white'>
            ファイルを選択
          </button>
        </div>
      ) : isDragReject ? (
        // if file is rejected
        <p className='text-red-500'>画像ファイルのみアップロード可能です</p>
      ) : (
        // if file is accepted
        files.map((file) => (
          <div key={file.name} className='relative flex flex-col items-center'>
            <button
              type='button'
              className='absolute right-0 top-0 rounded-md px-2 py-0.5 text-red-500 hover:bg-red-400/30 hover:text-red-700'
              onClick={() => {
                setFiles([]);
                acceptedFiles.splice(acceptedFiles.indexOf(file), 1);
              }}
            >
              削除
            </button>
            <Image
              src={URL.createObjectURL(file)}
              alt={file.name}
              width={400}
              height={400}
              layout='responsive'
            />
          </div>
        ))
      )}
    </div>
  );
};
