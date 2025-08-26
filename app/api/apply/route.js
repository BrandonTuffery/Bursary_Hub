import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';
import { getOrCreateProfile } from '@/lib/auth';

export async function POST(req) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const form = await req.formData();
  const bursaryId = form.get('bursaryId');
  const statement = form.get('statement') || '';

  const me = await getOrCreateProfile();
  const app = await prisma.application.create({
    data: { studentId: me.id, bursaryId, statement }
  });
  return NextResponse.redirect(new URL('/dashboard/student', process.env.APP_URL || 'http://localhost:3000'));
}
