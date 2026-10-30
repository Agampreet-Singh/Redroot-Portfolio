# RedRoot website

Next.js 16 + Tailwind CSS 4. Pages: Home, Course (Professional Penetration Testing + enrollment),
1:1 sessions, Framework, Projects, About, Contact.

## Edit your content
Almost everything lives in **`lib/site.ts`**: course price and payment plans, duration, format, modules and topics,
consultation fee, email, social links, projects and timeline.

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
1. The student fills in the form and clicks **Pay securely**.
2. Razorpay Checkout opens (UPI QR / UPI apps, cards, net banking, wallets). The QR belongs to
   Razorpay's merchant account, so **your personal UPI ID and phone number are never shown or encoded**.
3. The server verifies the payment with Razorpay (signature + amount check), then the page shows a green tick.
4. The student automatically gets a receipt email, and you get a "new payment" email with all their details.
5. A Razorpay webhook does the same confirmation if the student closes the tab right after paying.

Prices are set on the server from `lib/site.ts`, so nobody can change the amount in their browser.

## Payment setup (one time)
1. **Razorpay account**: sign up at razorpay.com. Individuals can choose *Unregistered* business type
   and complete KYC with PAN + Aadhaar + bank account. Settlements go to your bank (usually T+2).
2. **API keys**: Dashboard → Account & Settings → API Keys. Start with **Test mode** keys.
3. **Webhook**: Dashboard → Account & Settings → Webhooks → Add new webhook
   - URL: `https://<your-domain>/api/payment/webhook`
   - Secret: any long random string (also put it in `RAZORPAY_WEBHOOK_SECRET`)
   - Active events: `payment.captured`
4. **Emails** (pick one):
   - Gmail: turn on 2-Step Verification, create an App Password at
     https://myaccount.google.com/apppasswords, set `GMAIL_USER` and `GMAIL_APP_PASSWORD`.
   - Resend: needs a domain you own and verified in Resend; set `RESEND_API_KEY` and `MAIL_FROM`.
5. Add all variables from `.env.example` in **Vercel → Settings → Environment Variables**, then redeploy.
6. Test with Razorpay test mode (test UPI ID `success@razorpay`), then switch to live keys.
