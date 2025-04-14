import Link from 'next/link';
import PostIcon from '../PostElement/PostHeader/PostIcon';

const ReplyHeader = ({
  src,
  timeAgo,
  name,
  id,
}: {
  src: string;
  timeAgo: string;
  name: string;
  id: string;
}) => {
  return (
    <div className='flex w-full flex-col items-start justify-center'>
      <div className='mb-3 flex w-full items-start justify-between'>
        <div className='px-1 text-sm text-gray-500'>返信先 : さかもとそーや</div>
        <div className='flex items-start'>
          <p className='mr-1 whitespace-nowrap text-sm text-gray-500'>{timeAgo}</p>
        </div>
      </div>
      <div className='flex w-full items-start justify-between'>
        <div className='flex items-center justify-center gap-x-2'>
          <PostIcon src={src} />
          <div className='flex flex-col justify-center'>
            <Link href={`/profile/${id}`}>
              <p className='break-words text-lg font-bold transition-colors duration-100 hover:text-blue-600'>
                {name}
              </p>
            </Link>
            <p className='text-sm text-gray-500'>@{id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyHeader;
