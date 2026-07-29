import { Link } from "react-router-dom";
import { siteConfig } from "../siteConfig";

const features = [
  {
    icon: "✨",
    title: "Open-Air Booth",
    description:
      "A sleek, modern setup with professional lighting — no cramped enclosures, just great photos.",
  },
  {
    icon: "🖼️",
    title: "Custom Frames",
    description:
      "Choose from a range of photostrip designs, or we'll create one to match your event's theme.",
  },
  {
    icon: "⚡",
    title: "Instant Prints",
    description:
      "Guests walk away with printed photostrips in seconds, plus digital copies to share instantly.",
  },
  {
    icon: "🎉",
    title: "Props & Backdrops",
    description:
      "A curated prop box and backdrop options included with every booking, no extra charge.",
  },
];

const steps = [
  { number: "01", title: "Book your date", description: "Fill out our quick booking form and we'll confirm within 24 hours." },
  { number: "02", title: "Pick your frame", description: "Order a custom photostrip design from our shop, or use a classic template." },
  { number: "03", title: "We show up & set up", description: "We arrive early, set up the booth, and handle everything for your event." },
  { number: "04", title: "Guests snap away", description: "Unlimited photos all night, with instant prints and digital sharing." },
];

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-fuchsia-50 via-white to-amber-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-fuchsia-100 text-fuchsia-700 text-sm font-semibold mb-6">
              Now booking for 2026 events
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
              Photo booth memories,{" "}
              <span className="text-fuchsia-600">picture perfect.</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-xl">
              {siteConfig.tagline}. We bring the booth, the props, and the fun —
              you bring the guest list.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/booking"
                className="px-6 py-3 rounded-full bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700 transition-colors shadow-lg shadow-fuchsia-200"
              >
                Book Your Event
              </Link>
              <Link
                to="/order"
                className="px-6 py-3 rounded-full bg-white text-slate-900 font-semibold border border-slate-200 hover:border-slate-300 transition-colors"
              >
                Browse Frame Designs
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] max-w-sm mx-auto rounded-[2rem] bg-gradient-to-br from-fuchsia-500 to-amber-400 p-3 shadow-2xl rotate-2">
              <div className="w-full h-full rounded-[1.6rem] bg-white grid grid-cols-1 gap-2 p-3">
                {["😄", "🥳", "😎", "🤩"].map((emoji, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-xl bg-slate-100 flex items-center justify-center text-4xl"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl px-5 py-4 -rotate-3 hidden sm:block">
              <p className="font-caveat text-2xl text-fuchsia-600 font-bold" style={{ fontFamily: "Caveat, cursive" }}>
                "Best part of the wedding!"
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Everything you need for unforgettable photos
          </h2>
          <p className="mt-4 text-slate-600">
            From setup to strike-down, we handle the details so you can enjoy your event.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl border border-slate-100 hover:border-fuchsia-200 hover:shadow-lg transition-all"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-600">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              How it works
            </h2>
            <p className="mt-4 text-slate-400">
              Booking your photo booth is simple — here's what to expect.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s) => (
              <div key={s.number}>
                <div className="text-fuchsia-400 font-extrabold text-3xl mb-3">
                  {s.number}
                </div>
                <h3 className="text-white font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-slate-400">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Ready to make your event unforgettable?
        </h2>
        <p className="mt-4 text-slate-600">
          Dates fill up fast — reserve yours today.
        </p>
        <Link
          to="/booking"
          className="inline-block mt-8 px-8 py-3.5 rounded-full bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700 transition-colors shadow-lg shadow-fuchsia-200"
        >
          Check Availability
        </Link>
      </section>
    </div>
  );
}
