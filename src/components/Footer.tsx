import { Link } from "react-router-dom";
import { siteConfig } from "../siteConfig";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">📸</span>
            <span className="font-extrabold text-lg text-white">
              {siteConfig.businessName}
            </span>
          </div>
          <p className="text-sm text-slate-400">{siteConfig.tagline}</p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-fuchsia-400">About Us</Link></li>
            <li><Link to="/order" className="hover:text-fuchsia-400">Order Frames</Link></li>
            <li><Link to="/booking" className="hover:text-fuchsia-400">Book an Event</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>{siteConfig.email}</li>
            <li>{siteConfig.phone}</li>
            <li>{siteConfig.serviceArea}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {siteConfig.businessName}. All rights reserved.
      </div>
    </footer>
  );
}
