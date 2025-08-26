import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { ensureSeeded } from '@/lib/seed';
import { getOrCreateProfile } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function StudentDashboard() {
  const { userId } = auth();
  if (!userId) redirect('/sign-in');
  await ensureSeeded();
  const me = await getOrCreateProfile();
  if (me.role !== 'STUDENT') redirect('/dashboard/staff');

  const bursaries = await prisma.bursary.findMany({ orderBy: { createdAt: 'desc' } });
  const applications = await prisma.application.findMany({
    where: { studentId: me.id },
    include: { bursary: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Available Bursaries</h2>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {bursaries.map(b => (
            <form key={b.id} action={`/api/apply`} method="post" className="border rounded p-4 bg-white">
              <h3 className="font-semibold">{b.title}</h3>
              <p className="text-sm text-gray-700">{b.description}</p>
              <p className="text-sm mt-1">Amount: £{b.amount}</p>
              <input type="hidden" name="bursaryId" value={b.id} />
              <textarea name="statement" className="mt-2 w-full border rounded p-2" placeholder="Why do you need this bursary?" required />
              <button className="mt-2 px-3 py-2 rounded bg-black text-white">Apply</button>
            </form>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold">My Applications</h2>
        <div className="mt-3 space-y-3">
          {applications.map(a => (
            <div key={a.id} className="border rounded p-3 bg-white">
              <div className="font-medium">{a.bursary.title}</div>
              <div className="text-sm text-gray-700">Status: {a.status.toLowerCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
