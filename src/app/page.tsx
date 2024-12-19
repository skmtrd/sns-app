import { auth } from '@/auth';
import SignInButton from '@/components/element/SignInButton';
import SignOutButton from '@/components/element/SignOutButton';

const Home = async () => {
  const session = await auth();
  console.log(session);
  // if (session) redirect('/timeline');

  return (
    <div className='flex w-full flex-1 grow flex-col items-center justify-center overflow-y-scroll bg-gray-100'>
      <div className='flex'>{!session ? <SignInButton /> : <SignOutButton />}</div>
      <div>{session?.user.id}</div>
      <div>{session?.user.name}</div>
    </div>
  );
};
export default Home;
