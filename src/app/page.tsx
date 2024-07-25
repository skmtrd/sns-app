import { auth } from "@clerk/nextjs/server";
import { SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  const { userId } = auth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Welcome to MySNS</h1>
      {userId ? (
        <>
          <p className="mb-4">You are signed in!</p>
          <Link
            href={`/profile/${userId}`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            View Profile
          </Link>
          <SignOutButton />
        </>
      ) : (
        <>
          <p className="mb-4">Please sign in to continue</p>
          <SignInButton />
        </>
      )}
    </div>
  );
}
