import { Link } from "react-router-dom";
import { siteConfig } from "../siteConfig";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream/70 mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-4 gap-8">
        <div className="sm:col-span-2">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-9 h-9 rounded-full bg-cream border-2 border-crimson-light flex items-center justify-center font-serif font-bold text-crimson-light text-sm">
              D
            </span>
            <span className="font-serif font-bold text-lg text-cream tracking-tight">
              {siteConfig.businessName}
            </span>
          </div>
          <p className="text-sm max-w-xs">{siteConfig.tagline}.</p>
          <p className="text-sm mt-1 max-w-xs">{siteConfig.bioLine}</p>
        </div>

        <div>
          <h3 className="text-cream font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-crimson-light transition-colors">About Us</Link></li>
            <li><Link to="/order" className="hover:text-crimson-light transition-colors">Order Frames</Link></li>
            <li><Link to="/booking" className="hover:text-crimson-light transition-colors">Book an Event</Link></li>
            <li><a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-crimson-light transition-colors">Instagram</a></li>
            <li><a href={siteConfig.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-crimson-light transition-colors">TikTok</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-cream font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>{siteConfig.email}</li>
            <li>{siteConfig.phone}</li>
            <li>{siteConfig.serviceArea}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 py-4 text-center text-xs text-cream/40">
        © {new Date().getFullYear()} {siteConfig.businessName}. All rights reserved.
      </div>
    </footer>
  );
}
