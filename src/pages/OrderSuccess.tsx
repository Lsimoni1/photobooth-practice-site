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
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-24 text-center">
      <div className="text-6xl mb-6">🎉</div>
      <h1 className="text-3xl font-extrabold text-slate-900">
        Order confirmed!
      </h1>
      <p className="mt-4 text-slate-600">
        Thanks for your order. A confirmation has been sent to your email,
        and we'll follow up with next steps for your custom frame design.
      </p>
      <Link
        to="/"
        className="inline-block mt-8 px-6 py-3 rounded-full bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
