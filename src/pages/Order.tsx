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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900">
          Order Custom Photostrip Frames
        </h1>
        <p className="mt-4 text-slate-600">
          Choose a frame design for your event's photostrips. Each order
          includes a print-ready template for your booth.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {frameProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
            >
              <div
                className="aspect-[3/2] flex items-center justify-center text-4xl"
                style={{ background: product.image, color: product.accent }}
              >
                🎞️
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-slate-900">{product.name}</h3>
                <p className="text-sm text-slate-600 mt-1 flex-1">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-extrabold text-lg text-slate-900">
                    ${product.price}
                  </span>
                  <button
                    onClick={() => addItem(product.id)}
                    className="px-4 py-2 rounded-full bg-fuchsia-600 text-white text-sm font-semibold hover:bg-fuchsia-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-slate-100 p-6">
            <h2 className="font-bold text-lg text-slate-900 mb-4">
              Your Order ({totalItems})
            </h2>

            {items.length === 0 ? (
              <p className="text-sm text-slate-500">
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
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        ${item.product.price} each
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-6 h-6 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
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
                        className="w-6 h-6 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between font-bold text-slate-900">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 rounded-lg p-3">
                    {error}
                  </p>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={checkingOut}
                  className="w-full py-3 rounded-full bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700 transition-colors disabled:opacity-60"
                >
                  {checkingOut ? "Redirecting to checkout…" : "Checkout with Stripe"}
                </button>
                <p className="text-xs text-slate-400 text-center">
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
