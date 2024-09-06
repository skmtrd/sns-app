import RightSideBar from '@/components/layout/RightSideBar';
import SideBar from '@/components/layout/SideBar';
import { SessionProvider } from 'next-auth/react';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <body>
        <SessionProvider>
          <SideBar userId={'sadsad'}></SideBar>
          {children}
          <RightSideBar></RightSideBar>
        </SessionProvider>
      </body>
    </html>
  );
}
