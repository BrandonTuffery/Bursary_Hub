# Bursary Hub — Next.js 14 + Clerk + Prisma (Vercel-ready)

## Features
- Clerk authentication (preconfigured)
- Student & staff dashboards (role-based)
- Neon PostgreSQL via Prisma
- Auto-seed bursaries on first run
- API routes for apply, upload, chatbot, verify

## Deploy (Vercel)
1) Create a Neon DB and copy the `DATABASE_URL` (make sure `sslmode=require`).
2) Create a Clerk application and copy the API keys.
3) Push this project to GitHub, import to Vercel.
4) Add Environment Variables:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `STAFF_EMAILS` (comma-separated emails that should be staff)
   - `APP_URL` (e.g. https://your-vercel-url.vercel.app)
5) Deploy.

## Local Dev
```bash
cp .env.example .env.local
# Fill in DATABASE_URL and Clerk keys
npm install
npm run dev
```

## Notes
- On first run, the DB auto-seeds bursaries.
- When a user signs in, they are created in the DB; if their email is in `STAFF_EMAILS`, role is STAFF.
- File uploads are placeholders. Use S3/UploadThing in production.
