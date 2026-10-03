import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  ShieldCheck,
  Star,
  UserRound,
  Wrench,
} from "lucide-react";
import api from "../services/api";
import Loader from "../components/Loader";
import ScrollReveal from "../components/ui/ScrollReveal";

export default function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState();
  const [error, setError] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    api
      .get(`/services/${id}`)
      .then(({ data }) => setService(data.service))
      .catch((e) =>
        setError(e.response?.data?.message || "Could not find this service.")
      );
  }, [id]);

  if (error)
    return (
      <main className="container-page py-20 text-center">
        <h1 className="text-3xl font-bold">{error}</h1>
        <Link className="btn-primary mt-6" to="/services">
          Back to services
        </Link>
      </main>
    );

  if (!service) return <Loader />;

  const provider =
    service.providerId?.name || service.providerName || "ServiceHub Pro";

  return (
    <div className="min-h-screen bg-offwhite">
      {/* ── Hero Image Band ─── */}
      <div className="relative h-72 overflow-hidden bg-ink sm:h-96 lg:h-[420px]">
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover opacity-85"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />

        {/* Overlay content */}
        <div className="absolute inset-x-0 bottom-0 container-page pb-8">
          <Link
            to="/services"
            className="mb-5 inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/15 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md transition hover:bg-white/25"
          >
            <ArrowLeft size={14} /> All services
          </Link>
          <span className="block text-xs font-bold uppercase tracking-widest text-[#a9dcbf]">
            {service.category}
          </span>
          <h1 className="mt-2 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            {service.title}
          </h1>
        </div>
      </div>

      <main className="container-page py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
          {/* ── Main Content ── */}
          <div>
            {/* Rating row */}
            <ScrollReveal>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 rounded-xl border border-amber-200/60 bg-amber-50 px-3 py-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} size={15} className="fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1 text-sm font-bold text-amber-800">
                    {service.rating?.toFixed(1) || "4.9"}
                  </span>
                  <span className="text-xs text-amber-700">
                    ({service.reviewCount || 0} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 rounded-xl border border-brand/20 bg-sage/60 px-3 py-2 text-sm font-bold text-brand">
                  <ShieldCheck size={15} /> Verified service
                </div>
              </div>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal delay={0.07}>
              <div className="mt-8">
                <h2 className="font-sans text-lg font-bold text-ink">About this service</h2>
                <p className="mt-3 text-base leading-8 text-slate-600">
                  {service.description}
                </p>
              </div>
            </ScrollReveal>

            {/* Meta row */}
            <ScrollReveal delay={0.12}>
              <div className="mt-8 grid gap-4 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-card sm:grid-cols-3">
                <div className="text-center">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Starting at</p>
                  <p className="mt-1 text-3xl font-bold text-brand">${service.price}</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 text-sm font-semibold text-slate-600">
                  <Clock3 size={20} className="text-brand" />
                  <span>{service.duration || 60} minutes</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 text-sm font-semibold text-slate-600">
                  <MapPin size={20} className="text-brand" />
                  <span>{service.location || "Your location"}</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Provider */}
            <ScrollReveal delay={0.16}>
              <div className="mt-6 flex items-center gap-4 rounded-2xl border border-brand/15 bg-sage/50 p-5">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand">
                  <UserRound size={26} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand">Your pro</p>
                  <p className="mt-0.5 text-base font-bold text-ink">{provider}</p>
                  <p className="text-xs text-slate-500">Verified local service provider</p>
                </div>
              </div>
            </ScrollReveal>

            {/* What's included */}
            <ScrollReveal delay={0.2}>
              <div className="mt-8">
                <h2 className="font-sans text-lg font-bold text-ink">What's included</h2>
                <div className="mt-4 space-y-3">
                  {[
                    "Fully equipped professional",
                    "Vetted and background-checked technician",
                    "All work confirmed before payment",
                    "Booking support available",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                      <CheckCircle2 size={18} className="shrink-0 text-brand" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* ── Sticky Booking Panel ── */}
          <div className="lg:sticky lg:top-24">
            <ScrollReveal direction="right">
              <div className="rounded-2xl border border-slate-200/80 bg-white shadow-lift overflow-hidden">
                {/* Panel Header */}
                <div className="bg-ink px-6 py-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#a9dcbf]">
                    Reserve your slot
                  </p>
                  <p className="mt-1 text-2xl font-bold text-white">
                    From ${service.price}
                  </p>
                  <p className="text-xs text-white/50">{service.duration || 60}-min visit</p>
                </div>

                <div className="p-6">
                  {/* Available slots */}
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Available times
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(service.availableSlots || []).map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`rounded-xl border px-3.5 py-2 text-xs font-bold transition-all ${
                          selectedSlot === slot
                            ? "border-brand bg-brand text-white"
                            : "border-slate-200 bg-slate-50 text-slate-600 hover:border-brand hover:bg-sage/50"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>

                  <Link
                    to={`/book/${service._id}`}
                    className="btn-primary mt-6 w-full justify-center !py-3.5"
                  >
                    <CalendarDays size={18} /> Book this service
                  </Link>

                  <div className="mt-5 flex flex-col gap-2 border-t border-slate-100 pt-5 text-xs text-slate-500">
                    <span className="flex items-center gap-2">
                      <ShieldCheck size={13} className="text-brand" /> Free booking cancellation
                    </span>
                    <span className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-brand" /> Instant confirmation
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>
    </div>
  );
}
