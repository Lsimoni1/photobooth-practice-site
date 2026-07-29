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
    title: "Quality you can see",
    description:
      "Professional-grade cameras and lighting mean your photostrips actually look good, not grainy or washed out.",
  },
];

const gallery = ["🎊", "💍", "🎂", "🏆", "🎓", "🥂"];

export default function About() {
  return (
    <div>
      <section className="bg-gradient-to-br from-amber-50 via-white to-fuchsia-50 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900">
            About {siteConfig.businessName}
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            We started {siteConfig.businessName} with one goal: make the photo
            booth the highlight of every event, not an afterthought.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="aspect-square rounded-3xl bg-gradient-to-br from-fuchsia-500 to-amber-400 p-3 shadow-xl">
          <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center text-8xl">
            🤳
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            Our story
          </h2>
          <p className="text-slate-600 mb-4">
            {siteConfig.ownerName} started {siteConfig.businessName} after
            running photo booths at friends' weddings for years as a favor —
            and realizing just how much people loved them. What began as a
            side hustle with a borrowed camera has grown into a full-service
            photo booth company serving weddings, birthdays, corporate
            events, and everything in between.
          </p>
          <p className="text-slate-600">
            Today, we've photographed thousands of smiling faces across the
            region, and we still show up to every event with the same
            excitement as our very first booking. {siteConfig.serviceArea}.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-12">
            What we care about
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="bg-white p-6 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-sm text-slate-600">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">
          Moments we've captured
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {gallery.map((emoji, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl bg-gradient-to-br from-fuchsia-100 to-amber-100 flex items-center justify-center text-4xl"
            >
              {emoji}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-slate-400 mt-4">
          Event photo gallery — swap in real photos from past bookings here.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Let's make your event memorable
        </h2>
        <Link
          to="/booking"
          className="inline-block mt-6 px-8 py-3.5 rounded-full bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700 transition-colors shadow-lg shadow-fuchsia-200"
        >
          Book Now
        </Link>
      </section>
    </div>
  );
}
