import { NextResponse } from 'next/server';

export async function POST(req) {
  // Placeholder; wire to OpenAI if OPENAI_API_KEY present
  const body = await req.json().catch(() => ({}));
  const q = body?.question || 'Hello';
  return NextResponse.json({ answer: `You asked: ${q}. Chatbot will be added soon.` });
}
