import Image from 'next/image';

const ProfilePreview: React.FC<{
  authorName: string;
  authorAvatar: string | null;
  authorId: string;
  authorIntroduction?: string | undefined | null;
}> = ({ authorName, authorAvatar, authorId, authorIntroduction }) => {
  if (!authorAvatar) {
    return null;
  }
  return (
    <div className='absolute z-10 w-80 rounded-lg bg-white p-4 shadow-lg ring-1 ring-black/20'>
      <div className='flex items-center'>
        <Image
          src={authorAvatar}
          alt={authorName}
          width={40}
          height={40}
          className='rounded-full'
        />
        <div className='ml-3'>
          <p className='font-semibold'>{authorName}</p>
          <p className='text-sm text-gray-500'>@{authorId}</p>
        </div>
      </div>
      <p className='mt-2 break-words text-sm'>{authorIntroduction}</p>
    </div>
  );
};

export default ProfilePreview;
