import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';

export const runtime = 'nodejs'; // enable formData (node not edge)

export async function POST(req) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const form = await req.formData();
  const applicationId = form.get('applicationId');
  const file = form.get('file');
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  // For production, upload to S3 or UploadThing; here we just simulate a URL
  const url = `data:application/octet-stream;base64,placeholder`;

  const doc = await prisma.document.create({
    data: { applicationId, fileUrl: url, verification: 'PENDING' }
  });

  return NextResponse.json({ document: doc, verification: { status: 'pending' } });
}
