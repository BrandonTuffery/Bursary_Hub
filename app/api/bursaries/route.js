import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { ensureSeeded } from '@/lib/seed';

export async function GET() {
  await ensureSeeded();
  const items = await prisma.bursary.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(items);
}
