import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';

export const metadata = {
  title: 'Bursary Hub',
  description: 'Student bursary applications made simple.'
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen bg-gray-50 text-gray-900">
          <header className="border-b bg-white">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
              <h1 className="font-bold">Bursary Hub</h1>
              <div className="space-x-3">
                <a href="/" className="hover:underline">Home</a>
                <a href="/dashboard/student" className="hover:underline">Dashboard</a>
              </div>
            </div>
          </header>
          <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
