import {
  ClerkProvider,
  RedirectToSignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import SideBar from "@/components/layout/SideBar";
import RightSideBar from "@/components/layout/RightSideBar";
import { auth } from "@clerk/nextjs/server";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SignedOut>
            <SignInButton></SignInButton>
          </SignedOut>
          <SignedIn>
            <SideBar userId={userId}></SideBar>
            {children}
            <RightSideBar></RightSideBar>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
