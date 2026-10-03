import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Wrench,
} from "lucide-react";
import api from "../services/api";
import ServiceCard from "../components/ServiceCard";

const HOW_STEPS = [
  {
    num: "01",
    icon: Search,
    title: "Find your service",
    text: "Browse certified local services with upfront starting prices. Compare transparent ratings and reviews from your neighborhood.",
  },
  {
    num: "02",
    icon: Clock3,
    title: "Pick a time",
    text: "Schedule a convenient date, time, and location. Book in just a few clicks—no phone calls, no waiting.",
  },
  {
    num: "03",
    icon: CheckCircle2,
    title: "Get it done",
    text: "A trusted pro arrives ready to get the job done right. Relax while your home is taken care of.",
  },
];

const VALUE_PILLARS = [
  {
    icon: ShieldCheck,
    title: "Verified & Insured Pros",
    text: "Every technician is background-checked, credentialed, and fully insured before they join the ServiceHub network.",
  },
  {
    icon: Sparkles,
    title: "Clear, Upfront Pricing",
    text: "Know your starting price before you confirm. No hidden fees, no surprise charges, and no dispatch costs.",
  },
  {
    icon: Clock3,
    title: "Effortless Scheduling",
    text: "Choose an exact date and time that fits your day. Booking takes under two minutes with instant confirmation.",
  },
  {
    icon: CheckCircle2,
    title: "Workmanship Guarantee",
    text: "Direct communication with your provider and full booking support ensuring every job is completed right.",
  },
];

const TESTIMONIALS = [
  {
    quote: "ServiceHub made it ridiculously easy to find a great electrician. I booked in the morning and had the issue sorted that afternoon.",
    name: "Maya R.",
    role: "Happy homeowner · Electrical",
    initials: "MR",
  },
  {
    quote: "Everything was transparent from start to finish. The pricing was exactly what was quoted and the plumber arrived on time.",
    name: "James T.",
    role: "Verified customer · Plumbing",
    initials: "JT",
  },
  {
    quote: "I've used ServiceHub three times now. Each time the booking process has been seamless and the quality of work has been excellent.",
    name: "Sara K.",
    role: "Repeat customer · Home Cleaning",
    initials: "SK",
  },
];

export default function Home() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/services")
      .then(({ data }) => setServices(data.services.slice(0, 3)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          HERO — Exact original layout before changes
         ══════════════════════════════════════════════════════════════ */}
      <section className="overflow-hidden bg-sage">
        <div className="container-page grid min-h-[610px] items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-[.16em] text-brand">
              <Sparkles size={16} /> Local help, made easy
            </p>
            <h1 className="max-w-xl text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              Your home’s to-do list, <em className="text-brand">handled.</em>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
              Book trusted local pros for the jobs that keep your home running
              beautifully—from repairs to deep cleaning.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn-primary" to="/services">
                Find a service <ArrowRight size={18} />
              </Link>
              <a className="btn-secondary" href="#how">
                How it works
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm font-semibold text-slate-600">
              <span className="flex items-center gap-2">
                <ShieldCheck className="text-brand" size={19} /> Trusted pros
              </span>
              <span className="flex items-center gap-2">
                <Clock3 className="text-brand" size={19} /> Book in minutes
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/35" />
            <img
              className="relative h-[430px] w-full rounded-[2rem] object-cover shadow-2xl lg:h-[520px]"
              src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=85"
              alt="A clean, welcoming home"
            />
            <div className="absolute -bottom-5 -left-4 rounded-2xl bg-white p-4 shadow-soft sm:left-6">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-sage text-brand">
                  <Wrench size={20} />
                </div>
                <div>
                  <p className="font-bold">2,000+ jobs done</p>
                  <p className="text-sm text-slate-500">
                    by trusted local pros
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          POPULAR SERVICES
         ══════════════════════════════════════════════════════════════ */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container-page">
          {/* Header */}
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-overline">Popular right now</p>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.025em] text-ink sm:text-4xl">
                A hand for every home task.
              </h2>
              <p className="mt-3 max-w-lg text-base text-muted">
                Explore frequently requested home services with upfront starting rates and verified local ratings.
              </p>
            </div>
            <Link
              to="/services"
              className="hidden shrink-0 items-center gap-1.5 rounded-xl border border-border bg-white px-4 py-2.5 text-xs font-bold text-brand shadow-subtle transition hover:border-brand/30 sm:inline-flex"
            >
              See all services <ArrowRight size={14} />
            </Link>
          </div>

          {/* Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {loading
              ? [1, 2, 3].map((n) => (
                  <div key={n} className="skeleton h-[380px] rounded-2xl" />
                ))
              : services.map((s) => <ServiceCard key={s._id} service={s} />)}
          </div>

          <div className="mt-7 sm:hidden">
            <Link to="/services" className="btn-secondary w-full justify-center">
              See all services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          HOW IT WORKS
         ══════════════════════════════════════════════════════════════ */}
      <section id="how" className="bg-ink py-20 lg:py-28 relative overflow-hidden">
        {/* Subtle green glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 opacity-30"
          style={{ background: "radial-gradient(ellipse, #17734a 0%, transparent 65%)" }}
          aria-hidden="true"
        />

        <div className="container-page relative z-10">
          <div className="mb-16">
            <p className="section-overline text-brand-light">Simple by design</p>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.025em] text-white sm:text-4xl">
              From search to sorted in three steps.
            </h2>
          </div>

          {/* Steps */}
          <div className="relative grid gap-8 md:grid-cols-3">
            {/* Connector line */}
            <div className="pointer-events-none absolute left-[16.5%] right-[16.5%] top-8 hidden h-px bg-white/10 md:block" aria-hidden="true" />

            {HOW_STEPS.map(({ num, icon: Icon, title, text }) => (
              <div
                key={title}
                className="relative rounded-2xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-sm"
              >
                <span className="absolute right-5 top-5 text-5xl font-bold text-white/[0.06]">
                  {num}
                </span>
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand/20 text-brand-light">
                  <Icon size={22} />
                </div>
                <h3 className="mt-6 text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          WHY SERVICEHUB — Two-column editorial
         ══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-page">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:items-start">
            {/* Left: statement */}
            <div className="lg:sticky lg:top-28">
              <p className="section-overline">Why ServiceHub</p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.025em] text-ink sm:text-4xl">
                Home services that feel refreshingly reliable.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted">
                Built from the ground up to eliminate the friction, uncertainty, and phone tag of booking local contractors.
              </p>
              <Link to="/services" className="btn-primary mt-8 inline-flex px-6">
                Browse services <ArrowRight size={17} />
              </Link>
            </div>

            {/* Right: feature rows */}
            <div className="flex flex-col gap-px rounded-2xl border border-border overflow-hidden">
              {VALUE_PILLARS.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="flex gap-4 bg-white p-6 transition hover:bg-surface-subtle"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-tint text-brand">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ink">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          TESTIMONIALS
         ══════════════════════════════════════════════════════════════ */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container-page">
          <div className="mb-12">
            <p className="section-overline">What customers say</p>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.025em] text-ink sm:text-4xl">
              Loved by homeowners.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map(({ quote, name, role, initials }) => (
              <div
                key={name}
                className="flex flex-col gap-5 rounded-2xl border border-border bg-white p-6 shadow-subtle transition hover:-translate-y-1 hover:shadow-card"
              >
                {/* Stars */}
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="flex-1 text-sm leading-relaxed text-ink">
                  "{quote}"
                </blockquote>
                <div className="flex items-center gap-3 border-t border-border pt-4">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-brand text-xs font-bold text-white">
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink">{name}</p>
                    <p className="text-xs text-muted">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FINAL CTA — Dark green banner
         ══════════════════════════════════════════════════════════════ */}
      <section className="bg-ink py-20 lg:py-28">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-brand px-8 py-16 text-center sm:px-14">
            {/* Background glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.12) 0%, transparent 60%)" }}
              aria-hidden="true"
            />

            <div className="relative z-10 mx-auto max-w-2xl">
              <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-white/80">
                Ready to start?
              </span>
              <h2 className="mt-5 text-3xl font-bold tracking-[-0.025em] text-white sm:text-4xl lg:text-5xl">
                Your home's to-do list,{" "}
                <span className="text-white/70">handled today.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-base text-white/70">
                Find verified local professionals, view transparent starting rates, and reserve convenient time slots in minutes.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-bold text-brand shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Find a Service <ArrowRight size={18} />
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-base font-bold text-white transition hover:bg-white/20 hover:-translate-y-0.5"
                >
                  Create Account
                </Link>
              </div>
              <p className="mt-6 text-xs text-white/40">
                No credit card required to browse · Instant online booking
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
