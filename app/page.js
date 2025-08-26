import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold">Welcome to Bursary Hub</h2>
      <p className="text-gray-700">Apply for bursaries, upload documents, and track your application status.</p>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="px-4 py-2 rounded bg-black text-white">Sign in</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <div className="flex items-center gap-3">
          <a href="/dashboard/student" className="px-4 py-2 rounded bg-black text-white">Go to Dashboard</a>
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
}
