import { SignInButton, SignOutButton, UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';

export default async function Home() {
  const { userId } = auth();

  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      <h1 className='mb-4 text-4xl font-bold'>Welcome to MySNS</h1>
      {userId ? (
        <>
          <p className='mb-4'>You are signssssssssed in!</p>
          <Link
            href={`/profile/${userId}`}
            className='mb-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
          >
            View Profile
            <UserButton></UserButton>
          </Link>
          <SignOutButton />
        </>
      ) : (
        <>
          <p className='mb-4'>Please sisssssssgn in to continue</p>
          <SignInButton />
        </>
      )}
    </div>
  );
}
