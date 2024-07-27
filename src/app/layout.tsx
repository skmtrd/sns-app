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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SignedOut>
            <SignInButton></SignInButton>
          </SignedOut>
          <SignedIn>
            <SideBar></SideBar>
            {children}
            <RightSideBar></RightSideBar>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
