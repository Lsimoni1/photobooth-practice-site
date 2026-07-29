import { useState } from "react";
import { NavLink } from "react-router-dom";
import { siteConfig } from "../siteConfig";
import { useCart } from "../context/CartContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/order", label: "Order Frames" },
  { to: "/booking", label: "Book Now" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-full text-sm font-medium transition-colors ${
      isActive
        ? "bg-fuchsia-100 text-fuchsia-700"
        : "text-slate-600 hover:text-fuchsia-600 hover:bg-fuchsia-50"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">📸</span>
            <span className="font-extrabold text-lg text-slate-900">
              {siteConfig.businessName}
            </span>
          </NavLink>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === "/"}>
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/order"
              className="ml-2 relative px-4 py-2 rounded-full bg-fuchsia-600 text-white text-sm font-semibold hover:bg-fuchsia-700 transition-colors"
            >
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </NavLink>
          </nav>

          <button
            className="md:hidden p-2 text-slate-700"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <nav className="md:hidden pb-4 flex flex-col gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClass}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/order"
              onClick={() => setOpen(false)}
              className="mt-1 px-4 py-2 rounded-full bg-fuchsia-600 text-white text-sm font-semibold text-center"
            >
              Cart {totalItems > 0 ? `(${totalItems})` : ""}
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}
