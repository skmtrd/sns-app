import Image from 'next/image';

const ProfilePreview: React.FC<{
  username: string;
  avatar: string;
  id: string;
  introduction?: string;
}> = ({ username, avatar, id, introduction }) => {
  return (
    <div className='absolute z-10 w-80 rounded-lg bg-white p-4 shadow-lg ring-1 ring-black/20'>
      <div className='flex items-center'>
        <Image src={avatar} alt={username} width={40} height={40} className='rounded-full' />
        <div className='ml-3'>
          <p className='font-semibold'>{username}</p>
          <p className='text-sm text-gray-500'>@{id}</p>
        </div>
      </div>
      <p className='mt-2 break-words text-sm'>{introduction}</p>
    </div>
  );
};

export default ProfilePreview;
