# Snap Squad Photo Booth

A photo booth business site built with React, TypeScript, Vite, and Tailwind CSS. Includes a product ordering flow with Stripe Checkout and a booking form that emails requests via EmailJS.

Placeholder business details live in `src/siteConfig.ts` — swap in the real business name, owner, contact info, and product designs there.

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- React Router
- Stripe Checkout (test mode) via a Vercel serverless function
- EmailJS for booking notification emails
- react-day-picker for date selection

## One-time setup

### 1. Install dependencies

```bash
npm install
```

### 2. Stripe (test mode)

1. Create a free account at https://dashboard.stripe.com/register
2. Go to **Developers → API keys** (make sure you're in **test mode**, toggle top right)
3. Copy the **Secret key** (`sk_test_...`)

### 3. EmailJS

1. Create a free account at https://www.emailjs.com
2. Add an email service (e.g. connect your Gmail) under **Email Services**
3. Create a template under **Email Templates** with these variables in the body:
   `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{event_type}}`, `{{event_date}}`, `{{event_time}}`, `{{location}}`, `{{guest_count}}`, `{{message}}` — and set the template's **To email** to `{{to_email}}`
4. Copy your **Service ID**, **Template ID**, and **Public Key** (under Account → General)

### 4. Environment variables

```bash
cp .env.example .env.local
```

Fill in the four values from steps 2–3.

## Running locally

This project uses a Vercel serverless function (`api/create-checkout-session.ts`) for Stripe, so plain `vite dev` won't run the API route. Use the Vercel CLI instead, which runs the frontend and the API together:

```bash
npx vercel dev
```

First run will ask you to link the project — choose "no" to link to an existing one and let it create a new one, or link it to your Vercel account. It reads env vars from `.env.local` automatically.

If you're only working on styling/content and don't need checkout to work, `npm run dev` is faster.

## Deploying

```bash
npx vercel
```

Then add the same four environment variables from `.env.local` in the Vercel dashboard under **Project → Settings → Environment Variables**, and redeploy (`npx vercel --prod`).

## Notes

- Stripe is in **test mode** — use [test card `4242 4242 4242 4242`](https://docs.stripe.com/testing), any future expiry, any CVC.
- Product prices are validated server-side in `api/create-checkout-session.ts` against a hardcoded catalog, so the checkout amount can't be tampered with from the browser. Keep that catalog in sync with `src/siteConfig.ts`.
- The booking form's calendar just marks past dates as disabled — it doesn't check against a real availability calendar. Wiring it up to Google Calendar would be a natural next step.
