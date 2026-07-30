import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

// Server-side source of truth for pricing — never trust price data sent
// from the client, or a tampered request could check out for $0.
// Keep this in sync with src/siteConfig.ts's frameProducts.
const PRODUCT_CATALOG: Record<string, { name: string; price: number }> = {
  "ivory-classic": { name: "Ivory Classic", price: 8 },
  "crimson-stamp": { name: "Crimson Stamp", price: 10 },
  "sepia-tone": { name: "Sepia Tone", price: 10 },
  "midnight-noir": { name: "Midnight Noir", price: 12 },
  "film-negative": { name: "Film Negative", price: 11 },
  "matte-minimal": { name: "Matte Minimal", price: 9 },
};

type CartItemInput = {
  id: string;
  quantity: number;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return res
      .status(500)
      .json({ error: "Stripe is not configured on the server." });
  }

  const items: CartItemInput[] = req.body?.items;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Cart is empty." });
  }

  const lineItems = items
    .filter(
      (item) =>
        typeof item.id === "string" &&
        typeof item.quantity === "number" &&
        item.quantity > 0 &&
        Number.isInteger(item.quantity) &&
        item.id in PRODUCT_CATALOG
    )
    .map((item) => {
      const product = PRODUCT_CATALOG[item.id];
      return {
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(product.price * 100),
          product_data: {
            name: product.name,
          },
        },
      };
    });

  if (lineItems.length === 0) {
    return res.status(400).json({ error: "Cart contains invalid items." });
  }

  const stripe = new Stripe(secretKey);

  const origin =
    (req.headers.origin as string) ||
    `https://${req.headers.host}`;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${origin}/order/success`,
      cancel_url: `${origin}/order`,
      // This account has Managed Payments on by default, which requires a
      // tax_code per product. We're not doing tax calculation for this demo,
      // so opt out rather than tagging every product with a tax code.
      managed_payments: { enabled: false },
    } as Stripe.Checkout.SessionCreateParams);

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout session error", err);
    return res.status(500).json({ error: "Unable to start checkout." });
  }
}
