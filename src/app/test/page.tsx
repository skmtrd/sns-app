'use client';
import { useSession } from 'next-auth/react';

const Page = () => {
  const { data: session } = useSession();
  return <div>{session?.user?.id}</div>;
};

export default Page;
