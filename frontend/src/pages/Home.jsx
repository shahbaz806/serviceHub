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
const benefits = [
  [
    "Verified pros",
    "We match you with dependable, experienced local professionals.",
  ],
  [
    "Easy scheduling",
    "Choose a time that works for your day in just a few clicks.",
  ],
  ["Clear pricing", "Know your starting price before you book."],
];
export default function Home() {
  const [services, setServices] = useState([]);
  useEffect(() => {
    api
      .get("/services")
      .then(({ data }) => setServices(data.services.slice(0, 3)))
      .catch(() => {});
  }, []);
  return (
    <>
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
      <section className="container-page py-20">
        <div className="mb-9 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-brand">
              Popular right now
            </p>
            <h2 className="mt-2 text-4xl">A hand for every home task.</h2>
          </div>
          <Link
            to="/services"
            className="hidden items-center gap-1 text-sm font-bold text-brand sm:flex"
          >
            See all services <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {services.length
            ? services.map((s) => <ServiceCard key={s._id} service={s} />)
            : [1, 2, 3].map((n) => (
                <div
                  className="h-80 animate-pulse rounded-2xl bg-slate-100"
                  key={n}
                />
              ))}
        </div>
        <Link to="/services" className="btn-secondary mt-7 w-full sm:hidden">
          See all services
        </Link>
      </section>
      <section id="how" className="bg-ink py-20 text-white">
        <div className="container-page">
          <p className="text-sm font-bold uppercase tracking-widest text-[#a9dcbf]">
            Simple by design
          </p>
          <h2 className="mt-2 text-4xl">
            From search to sorted in three steps.
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              [
                Search,
                "Find your service",
                "Browse services and choose the help your home needs.",
              ],
              [
                Clock3,
                "Pick a time",
                "Schedule a convenient date, time, and location.",
              ],
              [
                CheckCircle2,
                "Get it done",
                "A trusted pro arrives ready to get the job done.",
              ],
            ].map(([Icon, title, text], i) => (
              <div key={title} className="border-t border-white/20 pt-6">
                <span className="text-sm font-bold text-[#a9dcbf]">
                  0{i + 1}
                </span>
                <Icon className="my-5" size={28} />
                <h3 className="text-2xl">{title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="container-page py-20">
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-brand">
              Why ServiceHub
            </p>
            <h2 className="mt-2 text-4xl">
              Home services that feel refreshingly reliable.
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {benefits.map(([title, text]) => (
              <div key={title}>
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-sage text-brand">
                  <CheckCircle2 size={21} />
                </div>
                <h3 className="font-sans text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#f9f4ed] py-20">
        <div className="container-page">
          <div className="card max-w-3xl p-8 sm:p-12">
            <div className="flex gap-1 text-accent">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} size={18} className="fill-current" />
              ))}
            </div>
            <blockquote className="mt-5 text-2xl leading-relaxed sm:text-3xl">
              “ServiceHub made it ridiculously easy to find a great electrician.
              I booked in the morning and had the issue sorted that afternoon.”
            </blockquote>
            <p className="mt-6 font-bold">
              Maya R.{" "}
              <span className="font-normal text-slate-500">
                — Happy homeowner
              </span>
            </p>
          </div>
        </div>
      </section>
      <section className="container-page py-20">
        <div className="rounded-[2rem] bg-brand px-7 py-12 text-center text-white sm:px-12">
          <h2 className="text-4xl">Ready to cross something off?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Find the right local pro and book your service today.
          </p>
          <Link
            to="/services"
            className="btn mt-7 bg-white text-brand hover:bg-sage"
          >
            Explore services <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
