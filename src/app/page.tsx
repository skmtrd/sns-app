import { auth } from '@/auth';
import SignInButton from '@/components/element/SignInButton';
import SignOutButton from '@/components/element/SignOutButton';
import { redirect } from 'next/navigation';

const Home = async () => {
  const session = await auth();
  if (session) redirect('/timeline');

  return (
    <div className='flex w-full flex-1 grow flex-col items-center justify-center overflow-y-scroll bg-gray-100'>
      <div className='flex'>{!session ? <SignInButton /> : <SignOutButton />}</div>
    </div>
  );
};
export default Home;
