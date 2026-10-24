# RedRoot website

Next.js 16 + Tailwind CSS 4. Pages: Home, Course (Professional Penetration Testing + enrollment),
1:1 sessions, Framework, Projects, About, Contact.

## Edit your content
Almost everything lives in **`lib/site.ts`**: course price and payment plans, duration, format, modules and topics,
consultation fee, UPI ID, email, social links, projects and timeline.

## Run locally
```bash
npm install
npm run dev     # http://localhost:3000
```

## Deploy to Vercel
1. Push this folder to a GitHub repo.
2. On vercel.com → **Add New → Project** → import the repo. Vercel auto-detects Next.js; keep the defaults and click **Deploy**.
3. (Recommended) In **Settings → Environment Variables**, add `NEXT_PUBLIC_SITE_URL` with your final domain, then redeploy.

Or with the CLI: `npm i -g vercel && vercel --prod`.

## How enrollment and booking work
1. The student fills in the form.
2. They see a UPI QR code (generated on the page) for the exact amount, plus your UPI ID.
3. A pre-filled email opens with all their details. They attach the payment screenshot and send it to you.

### Optional: get an automatic copy of every form submission
Create a free account at resend.com, then add these Vercel environment variables:
- `RESEND_API_KEY` — your Resend API key
- `NOTIFY_EMAIL` — where to send notifications (e.g. th3redr00t@gmail.com)
- `NOTIFY_FROM` — a sender on a domain you verified in Resend (`RedRoot <onboarding@resend.dev>` works for testing)

Without them the site still works exactly as above; nothing breaks.
