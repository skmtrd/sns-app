import RightSideBar from '@/components/layout/RightSideBar';
import SideBar from '@/components/layout/SideBar';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <body>
        <SideBar userId={'sadsad'}></SideBar>
        {children}
        <RightSideBar></RightSideBar>
      </body>
    </html>
  );
}
