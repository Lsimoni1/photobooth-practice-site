import { useState } from "react";
import { frameProducts } from "../siteConfig";
import { useCart } from "../context/CartContext";

export default function Order() {
  const { items, addItem, updateQuantity, totalItems, totalPrice } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setError(null);
    setCheckingOut(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.product.id,
            quantity: item.quantity,
          })),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Checkout failed. Please try again.");
      }

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned.");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong starting checkout."
      );
      setCheckingOut(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 bg-cream">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-serif font-bold text-ink">
          Order Custom Photostrip Frames
        </h1>
        <p className="mt-4 text-ink/70">
          Choose a frame design for your event's photostrips. Each order
          includes a print-ready template for your booth.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {frameProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border border-ink/10 overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
            >
              <div
                className="aspect-[3/2] flex items-center justify-center text-4xl"
                style={{ background: product.image, color: product.accent }}
              >
                🎞️
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-serif font-bold text-ink">{product.name}</h3>
                <p className="text-sm text-ink/70 mt-1 flex-1">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-bold text-lg text-ink">
                    ${product.price}
                  </span>
                  <button
                    onClick={() => addItem(product.id)}
                    className="px-4 py-2 rounded-full bg-crimson text-cream text-sm font-semibold hover:bg-crimson-dark transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-ink/10 p-6 bg-cream">
            <h2 className="font-serif font-bold text-lg text-ink mb-4">
              Your Order ({totalItems})
            </h2>

            {items.length === 0 ? (
              <p className="text-sm text-ink/50">
                Your cart is empty. Add a frame design to get started.
              </p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg shrink-0"
                      style={{ background: item.product.image }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-ink truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-ink/50">
                        ${item.product.price} each
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-6 h-6 rounded-full border border-ink/20 text-ink/70 hover:bg-ink/5"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-4 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-6 h-6 rounded-full border border-ink/20 text-ink/70 hover:bg-ink/5"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t border-ink/10 flex items-center justify-between font-bold text-ink">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                {error && (
                  <p className="text-sm text-crimson bg-crimson/5 rounded-lg p-3">
                    {error}
                  </p>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={checkingOut}
                  className="w-full py-3 rounded-full bg-crimson text-cream font-semibold hover:bg-crimson-dark transition-colors disabled:opacity-60"
                >
                  {checkingOut ? "Redirecting to checkout…" : "Checkout with Stripe"}
                </button>
                <p className="text-xs text-ink/40 text-center">
                  Test mode — no real payment will be charged.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
