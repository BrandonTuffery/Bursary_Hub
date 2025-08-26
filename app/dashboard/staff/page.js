import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { ensureSeeded } from '@/lib/seed';
import { getOrCreateProfile } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function StaffDashboard() {
  const { userId } = auth();
  if (!userId) redirect('/sign-in');
  await ensureSeeded();
  const me = await getOrCreateProfile();
  if (me.role === 'STUDENT') redirect('/dashboard/student');

  const apps = await prisma.application.findMany({
    include: { bursary: true, student: true },
    orderBy: { createdAt: 'desc' }
  });

  async function approve(formData) {
    'use server';
    const id = formData.get('id');
    await prisma.application.update({ where: { id }, data: { status: 'APPROVED' } });
  }
  async function reject(formData) {
    'use server';
    const id = formData.get('id');
    await prisma.application.update({ where: { id }, data: { status: 'REJECTED' } });
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Applications</h2>
      <div className="space-y-3">
        {apps.map(a => (
          <div key={a.id} className="border rounded p-4 bg-white">
            <div className="font-medium">{a.bursary.title}</div>
            <div className="text-sm text-gray-700">Student: {a.student.name || a.student.email}</div>
            <div className="text-sm">Status: {a.status.toLowerCase()}</div>
            <div className="flex gap-2 mt-2">
              <form action={approve}>
                <input type="hidden" name="id" value={a.id} />
                <button className="px-3 py-2 rounded bg-green-600 text-white">Approve</button>
              </form>
              <form action={reject}>
                <input type="hidden" name="id" value={a.id} />
                <button className="px-3 py-2 rounded bg-red-600 text-white">Reject</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
