import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

type DropZoneProps = {
  onDrop: (files: File[]) => void;
  className?: string;
  status?: 'uploading' | 'success' | 'error' | 'idle';
  value?: string;
};

export const Dropzone: React.FC<DropZoneProps> = ({ onDrop, className, status, value }) => {
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
        'rounded-md border-2 border-dashed border-gray-300 p-4 text-center',
        className,
        isDragActive ? 'border-blue-500' : '',
      )}
    >
      {!acceptedFiles.length && value ? (
        <div className='flex flex-col items-center'>
          <p>現在の画像</p>
          <p>変更する場合は新しい画像をドロップまたはこのエリアをクリック</p>
          <Image src={value} alt='uploaded image' width={200} height={200} />
        </div>
      ) : !acceptedFiles.length ? (
        // if no files are selected or set
        <div>
          <input {...getInputProps()} />
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
          <div key={file.name} className='flex flex-col items-center'>
            <div className='flex w-full items-center justify-between'>
              <p>
                {file.name} ({Math.ceil(file.size / 1024)}KB)
              </p>
              {status == 'uploading' ? (
                <div className='size-6 animate-spin rounded-full border-b-2 border-gray-900' />
              ) : (
                <button
                  type='button'
                  className='rounded-md px-2 text-red-500 hover:bg-red-100 hover:text-red-700'
                  onClick={() => {
                    if (status == 'error') {
                      onDrop(acceptedFiles);
                      return;
                    }
                    setFiles([]);
                    acceptedFiles.splice(acceptedFiles.indexOf(file), 1);
                  }}
                >
                  {status == 'error' ? '再試行' : '削除'}
                </button>
              )}
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
