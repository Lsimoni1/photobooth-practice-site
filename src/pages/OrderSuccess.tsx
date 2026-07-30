import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function OrderSuccess() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-24 text-center bg-cream">
      <div className="text-6xl mb-6">🎞️</div>
      <h1 className="text-3xl font-serif font-bold text-ink">
        Order confirmed!
      </h1>
      <p className="mt-4 text-ink/70">
        Thanks for your order. A confirmation has been sent to your email,
        and we'll follow up with next steps for your custom frame design.
      </p>
      <Link
        to="/"
        className="inline-block mt-8 px-6 py-3 rounded-full bg-crimson text-cream font-semibold hover:bg-crimson-dark transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
