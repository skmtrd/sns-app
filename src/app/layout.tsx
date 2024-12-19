import { auth } from '@/auth';
import RightSideBar from '@/components/layout/RightSideBar';
import SideBar from '@/components/layout/SideBar';
import { SessionProvider } from 'next-auth/react';
import './globals.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
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
