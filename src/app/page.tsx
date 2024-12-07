import Image from 'next/image';
import { auth } from './../../auth';

import SignInButton from '@/components/element/SignInButton';
import SignOutButton from '@/components/element/SignOutButton';

const Home = async () => {
  const session = await auth();

  return (
    <div className='flex w-full flex-1 grow flex-col items-center justify-center overflow-y-scroll bg-gray-100'>
      <div className='flex'>
        {!session?.user?.image ? (
          <SignInButton />
        ) : (
          <div className='flex gap-4'>
            <SignOutButton />
            <Image
              src={session.user.image}
              style={{ borderRadius: '50%', objectFit: 'cover' }}
              alt='image of user'
              width={60}
              height={20}
            />
          </div>
        )}
      </div>
      <div className='w-10/12 rounded-xl bg-slate-200'>
        <div className='rounded-t-xl bg-slate-400 p-3'>current session</div>
        <pre className='break-words p-3'>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  );
};
export default Home;
