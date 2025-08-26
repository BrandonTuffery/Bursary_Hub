import { NextResponse } from 'next/server';

export async function POST() {
  // Placeholder for document verification (OpenAI / KYC provider)
  return NextResponse.json({ status: 'pending', reason: 'Verification service not yet connected.' });
}
