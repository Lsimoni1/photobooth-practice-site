import { useState } from "react";
import emailjs from "@emailjs/browser";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { siteConfig } from "../siteConfig";

const eventTypes = [
  "Wedding",
  "Birthday Party",
  "Corporate Event",
  "School Dance / Prom",
  "Holiday Party",
  "Other",
];

const timeSlots = [
  "9:00 AM",
  "11:00 AM",
  "1:00 PM",
  "3:00 PM",
  "5:00 PM",
  "7:00 PM",
  "9:00 PM",
];

type Status = "idle" | "sending" | "success" | "error";

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!selectedDate) {
      setErrorMessage("Please select an event date.");
      return;
    }
    if (!selectedTime) {
      setErrorMessage("Please select a preferred start time.");
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      setErrorMessage(
        "Booking emails aren't configured yet. Add your EmailJS keys to .env.local."
      );
      return;
    }

    const formData = new FormData(e.currentTarget);

    setStatus("sending");
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: siteConfig.bookingNotifyEmail,
          from_name: formData.get("name"),
          from_email: formData.get("email"),
          phone: formData.get("phone"),
          event_type: formData.get("eventType"),
          event_date: selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          event_time: selectedTime,
          location: formData.get("location"),
          guest_count: formData.get("guestCount"),
          message: formData.get("message"),
        },
        { publicKey }
      );
      setStatus("success");
    } catch (err) {
      console.error("EmailJS send failed", err);
      setStatus("error");
      setErrorMessage(
        "Something went wrong sending your request. Please try again or email us directly."
      );
    }
  };

  if (status === "success") {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-24 text-center bg-cream">
        <div className="text-6xl mb-6">🗓️</div>
        <h1 className="text-3xl font-serif font-bold text-ink">
          Booking request sent!
        </h1>
        <p className="mt-4 text-ink/70">
          Thanks for reaching out. We'll review your requested date and get
          back to you within 24 hours to confirm.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 bg-cream">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-serif font-bold text-ink">
          Book Your Event
        </h1>
        <p className="mt-4 text-ink/70">
          Tell us about your event and pick a date — we'll follow up to
          confirm availability and details.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-10"
      >
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-ink/80 mb-1">
              Full name
            </label>
            <input
              name="name"
              type="text"
              required
              className="w-full rounded-xl border border-ink/15 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-crimson/30"
              placeholder="Jane Smith"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-ink/80 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-ink/15 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-crimson/30"
                placeholder="jane@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink/80 mb-1">
                Phone
              </label>
              <input
                name="phone"
                type="tel"
                required
                className="w-full rounded-xl border border-ink/15 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-crimson/30"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink/80 mb-1">
              Event type
            </label>
            <select
              name="eventType"
              required
              defaultValue=""
              className="w-full rounded-xl border border-ink/15 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-crimson/30"
            >
              <option value="" disabled>
                Select an event type
              </option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-ink/80 mb-1">
                Location / venue
              </label>
              <input
                name="location"
                type="text"
                required
                className="w-full rounded-xl border border-ink/15 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-crimson/30"
                placeholder="Venue name or address"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink/80 mb-1">
                Estimated guests
              </label>
              <input
                name="guestCount"
                type="number"
                min={1}
                className="w-full rounded-xl border border-ink/15 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-crimson/30"
                placeholder="100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink/80 mb-1">
              Anything else we should know?
            </label>
            <textarea
              name="message"
              rows={4}
              className="w-full rounded-xl border border-ink/15 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-crimson/30"
              placeholder="Theme, special requests, timeline..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink/80 mb-2">
            Select event date
          </label>
          <div className="rounded-2xl border border-ink/15 p-3 sm:p-4 flex justify-center">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={{ before: new Date() }}
              className="!m-0"
              style={
                {
                  "--rdp-accent-color": "var(--color-crimson)",
                  "--rdp-accent-background-color": "color-mix(in srgb, var(--color-crimson) 12%, transparent)",
                } as React.CSSProperties
              }
            />
          </div>

          <label className="block text-sm font-semibold text-ink/80 mb-2 mt-5">
            Preferred start time
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {timeSlots.map((time) => (
              <button
                type="button"
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`px-3 py-2 rounded-xl text-sm font-medium border transition-colors ${
                  selectedTime === time
                    ? "bg-crimson text-cream border-crimson"
                    : "border-ink/15 text-ink/70 hover:border-crimson/40"
                }`}
              >
                {time}
              </button>
            ))}
          </div>

          {errorMessage && (
            <p className="text-sm text-crimson bg-crimson/5 rounded-lg p-3 mt-5">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full mt-6 py-3.5 rounded-full bg-crimson text-cream font-semibold hover:bg-crimson-dark transition-colors disabled:opacity-60"
          >
            {status === "sending" ? "Sending request…" : "Request Booking"}
          </button>
          <p className="text-xs text-ink/40 text-center mt-3">
            This sends your request directly to {siteConfig.businessName} —
            we'll confirm availability by email.
          </p>
        </div>
      </form>
    </div>
  );
}
