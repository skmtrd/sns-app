import RightSideBar from '@/components/layout/RightSideBar';
import SideBar from '@/components/layout/SideBar';
import { ClerkProvider, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { userId } = auth();

  return (
    <ClerkProvider>
      <html lang='ja'>
        <body>
          <SignedOut>
            <SignInButton></SignInButton>
          </SignedOut>
          <SignedIn>
            <SideBar userId={userId!}></SideBar>
            {children}
            <RightSideBar></RightSideBar>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
