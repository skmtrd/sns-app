import RightSideBar from '@/components/layout/RightSideBar';
import SideBar from '@/components/layout/SideBar';
import { SessionProvider } from 'next-auth/react';
import { auth } from '../../auth';
import './globals.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.id) {
    return <div>Loading...</div>;
  }
  return (
    <html lang='ja'>
      <body>
        <SessionProvider>
          <SideBar></SideBar>
          {children}
          <RightSideBar></RightSideBar>
        </SessionProvider>
      </body>
    </html>
  );
}
