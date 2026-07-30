import { Link } from "react-router-dom";
import { siteConfig } from "../siteConfig";

const values = [
  {
    title: "Genuine fun",
    description:
      "We're not just there to run equipment — we're on the floor hyping up your guests and making sure everyone gets in front of the camera.",
  },
  {
    title: "Reliable & on time",
    description:
      "We arrive early to set up so everything is ready before your first guest walks in. No last-minute scrambling.",
  },
  {
    title: "Film-quality prints",
    description:
      "Our custom-built booth and photo-lab-grade prints mean your photostrips have real texture and tone, not a washed-out phone photo.",
  },
];

export default function About() {
  return (
    <div className="bg-cream">
      <section className="bg-cream py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-ink">
            About {siteConfig.businessName}
          </h1>
          <p className="mt-6 text-lg text-ink/70 max-w-2xl mx-auto italic" style={{ fontFamily: "var(--font-serif)" }}>
            "{siteConfig.tagline}."
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="aspect-square rounded-3xl bg-ink p-3 shadow-xl relative">
          <div className="w-full h-full rounded-2xl bg-ink-soft flex items-center justify-center">
            <span className="w-24 h-24 rounded-full bg-cream border-4 border-crimson-light flex items-center justify-center font-serif font-bold text-crimson-light text-3xl">
              D
            </span>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-serif font-bold text-ink mb-4">
            Our story
          </h2>
          <p className="text-ink/70 mb-4">
            {siteConfig.ownerName} started {siteConfig.businessName} after
            running photo booths at friends' weddings for years as a favor —
            and realizing just how much people loved them. What began with a
            hand-built wooden booth has grown into a full-service photo booth
            company, with a booth built from scratch, board by board, to feel
            nothing like the generic prefab shells everyone else rents.
          </p>
          <p className="text-ink/70">
            You'll find us just as often at a handmade market or a junk
            journaling meetup as we are at a wedding — {siteConfig.businessName}{" "}
            is built on film-inspired, tangible moments, not just another
            digital photo dump. {siteConfig.serviceArea}.
          </p>
        </div>
      </section>

      <section className="bg-cream-dim py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-serif font-bold text-ink text-center mb-12">
            What we care about
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="bg-cream p-6 rounded-2xl border border-ink/10">
                <h3 className="font-serif font-bold text-ink mb-2">{v.title}</h3>
                <p className="text-sm text-ink/70">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-3xl font-serif font-bold text-ink text-center mb-10">
          Moments we've captured
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl bg-ink-soft border border-ink/10"
            />
          ))}
        </div>
        <p className="text-center text-sm text-ink/40 mt-4">
          Event photo gallery — swap in real photos from past bookings here.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 text-center">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink">
          Let's make your event memorable
        </h2>
        <Link
          to="/booking"
          className="inline-block mt-6 px-8 py-3.5 rounded-full bg-crimson text-cream font-semibold hover:bg-crimson-dark transition-colors shadow-lg shadow-crimson/20"
        >
          Book Now
        </Link>
      </section>
    </div>
  );
}
