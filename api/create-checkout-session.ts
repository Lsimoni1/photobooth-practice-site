import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

// Server-side source of truth for pricing — never trust price data sent
// from the client, or a tampered request could check out for $0.
// Keep this in sync with src/siteConfig.ts's frameProducts.
const PRODUCT_CATALOG: Record<string, { name: string; price: number }> = {
  "classic-white": { name: "Classic White Strip", price: 8 },
  "blush-floral": { name: "Blush Floral", price: 10 },
  "gold-foil": { name: "Gold Foil Elegance", price: 12 },
  "neon-nights": { name: "Neon Nights", price: 10 },
  "corporate-clean": { name: "Corporate Clean", price: 9 },
  "holiday-cheer": { name: "Holiday Cheer", price: 9 },
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
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout session error", err);
    return res.status(500).json({ error: "Unable to start checkout." });
  }
}
