import Link from 'next/link';
import PostIcon from './PostIcon';

const PostHeader = ({
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
      <div className='flex items-start'>
        <p className='mr-1 whitespace-nowrap text-sm text-gray-500'>{timeAgo}</p>
      </div>
    </div>
  );
};

export default PostHeader;
