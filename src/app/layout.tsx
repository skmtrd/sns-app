import RightSideBar from '@/components/layout/RightSideBar';
import SideBar from '@/components/layout/SideBar';
import { SessionProvider } from 'next-auth/react';
import { auth } from '../../auth';
import './globals.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  // if (!session?.user?.id) {
  //   return <div>Loading...</div>;
  // }
  return (
    <SessionProvider session={session}>
      <html lang='ja'>
        <body>
          <SideBar />
          {children}
          <RightSideBar />
        </body>
      </html>
    </SessionProvider>
  );
}
