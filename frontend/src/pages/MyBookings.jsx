import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  MapPin,
  ReceiptText,
  XCircle,
  Clock3,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Filter,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";
import Loader from "../components/Loader";
import StatusBadge from "../components/StatusBadge";
import ScrollReveal from "../components/ui/ScrollReveal";

const TIMELINE_STEPS = ["pending", "confirmed", "in_progress", "completed"];
const STEP_LABELS = {
  pending: "Booked",
  confirmed: "Confirmed",
  in_progress: "In Progress",
  completed: "Completed",
};

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const load = async () => {
    try {
      const { data } = await api.get("/bookings/my");
      setBookings(data.bookings);
    } catch (e) {
      toast.error(e.response?.data?.message || "Could not load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  async function cancel(id) {
    if (!window.confirm("Cancel this booking request?")) return;
    try {
      await api.patch(`/bookings/${id}/cancel`);
      toast.success("Booking cancelled.");
      load();
    } catch (e) {
      toast.error(e.response?.data?.message || "Could not cancel booking.");
    }
  }

  const filteredBookings = useMemo(() => {
    if (filter === "all") return bookings;
    if (filter === "active")
      return bookings.filter((b) =>
        ["pending", "confirmed", "in_progress"].includes(b.status)
      );
    if (filter === "completed")
      return bookings.filter((b) => b.status === "completed");
    if (filter === "cancelled")
      return bookings.filter((b) => b.status === "cancelled");
    return bookings;
  }, [bookings, filter]);

  if (loading) return <Loader label="Loading your bookings..." />;

  return (
    <div className="min-h-screen bg-offwhite">
      {/* ── Studio Hero Banner ── */}
      <div className="relative overflow-hidden bg-sage pb-12 pt-12">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-30" />

        <div className="container-page relative z-10">
          <p className="text-sm font-bold uppercase tracking-widest text-brand">
            Your schedule
          </p>
          <h1 className="mt-2 display-lg text-ink">
            My bookings
          </h1>
          <p className="mt-3 max-w-xl text-slate-600 body-lg">
            Keep track of every request, all in one place.
          </p>

          {/* Filter Pills */}
          {bookings.length > 0 && (
            <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-1">
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mr-1">
                <Filter size={13} className="text-brand" /> Filter:
              </span>
              {[
                { id: "all", label: `All (${bookings.length})` },
                {
                  id: "active",
                  label: `Active (${
                    bookings.filter((b) =>
                      ["pending", "confirmed", "in_progress"].includes(b.status)
                    ).length
                  })`,
                },
                {
                  id: "completed",
                  label: `Completed (${
                    bookings.filter((b) => b.status === "completed").length
                  })`,
                },
                {
                  id: "cancelled",
                  label: `Cancelled (${
                    bookings.filter((b) => b.status === "cancelled").length
                  })`,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`rounded-xl border px-3.5 py-1.5 text-xs font-bold transition-all ${
                    filter === tab.id
                      ? "border-brand bg-brand text-white shadow-xs"
                      : "border-slate-200/80 bg-white/90 text-slate-600 hover:border-brand/30 hover:bg-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <main className="container-page py-10 sm:py-14">
        {!bookings.length ? (
          <ScrollReveal>
            <div className="card py-16 text-center border border-slate-200/80 max-w-xl mx-auto">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-sage text-brand shadow-sm">
                <CalendarDays size={28} />
              </div>
              <h2 className="mt-5 text-2xl font-bold text-ink">Nothing booked yet</h2>
              <p className="mt-2 text-slate-500 max-w-sm mx-auto">
                Find a trusted local pro when you're ready.
              </p>
              <Link to="/services" className="btn-primary mt-6 inline-flex">
                Explore services <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        ) : !filteredBookings.length ? (
          <div className="card py-12 text-center border border-slate-200/80 max-w-md mx-auto">
            <p className="text-slate-500 font-medium">No bookings match this filter.</p>
            <button
              onClick={() => setFilter("all")}
              className="mt-3 text-xs font-bold text-brand hover:underline"
            >
              Show all bookings
            </button>
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {filteredBookings.map((booking, idx) => {
              const service = booking.serviceId;
              const provider =
                service?.providerId?.name ||
                service?.providerName ||
                "ServiceHub Pro";

              const stepIndex = TIMELINE_STEPS.indexOf(booking.status);
              const isCancelled = booking.status === "cancelled";

              return (
                <ScrollReveal key={booking._id} delay={Math.min(idx * 0.08, 0.3)}>
                  <article className="card overflow-hidden border border-slate-200/80 p-6 transition-all duration-300 hover:border-brand/30 hover:shadow-lift">
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-100">
                      <div className="flex items-start gap-4">
                        {service?.image && (
                          <img
                            className="h-20 w-20 rounded-2xl object-cover shadow-xs shrink-0"
                            src={service.image}
                            alt={service.title}
                          />
                        )}
                        <div>
                          <div className="flex flex-wrap items-center gap-2.5">
                            <h2 className="font-sans text-xl font-bold text-ink">
                              {service?.title || "Unavailable service"}
                            </h2>
                            <StatusBadge status={booking.status} />
                          </div>
                          <p className="mt-1 text-sm text-slate-500">
                            With <strong className="text-slate-700">{provider}</strong> ·{" "}
                            <span className="font-bold text-brand text-base">${booking.price}</span>
                          </p>
                        </div>
                      </div>

                      {/* Cancel Action */}
                      {!["completed", "cancelled", "in_progress"].includes(
                        booking.status
                      ) && (
                        <button
                          onClick={() => cancel(booking._id)}
                          className="btn-secondary self-start !border-rose-200 !text-rose-600 hover:!bg-rose-50 text-xs py-2 px-3"
                        >
                          <XCircle size={15} /> Cancel
                        </button>
                      )}
                    </div>

                    {/* Progress Journey Track (for active/completed bookings) */}
                    {!isCancelled ? (
                      <div className="py-5 border-b border-slate-100">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                          Service Progress
                        </p>
                        <div className="relative flex items-center justify-between">
                          {/* Connecting track line */}
                          <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2 h-1 bg-slate-100 rounded-full" />
                          <div
                            className="absolute left-3 top-1/2 -translate-y-1/2 h-1 bg-brand rounded-full transition-all duration-500"
                            style={{
                              width: `${
                                stepIndex >= 0
                                  ? (stepIndex / (TIMELINE_STEPS.length - 1)) * 96
                                  : 0
                              }%`,
                            }}
                          />

                          {TIMELINE_STEPS.map((s, i) => {
                            const isPast = stepIndex >= i;
                            const isCurrent = stepIndex === i;
                            return (
                              <div
                                key={s}
                                className="relative z-10 flex flex-col items-center gap-1.5"
                              >
                                <div
                                  className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-all ${
                                    isPast
                                      ? "bg-brand text-white shadow-xs"
                                      : "bg-white border-2 border-slate-200 text-slate-400"
                                  } ${isCurrent ? "ring-4 ring-brand/15 scale-110" : ""}`}
                                >
                                  {isPast ? <CheckCircle2 size={12} /> : i + 1}
                                </div>
                                <span
                                  className={`text-[11px] font-semibold ${
                                    isPast ? "text-ink font-bold" : "text-slate-400"
                                  }`}
                                >
                                  {STEP_LABELS[s]}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="py-3 px-4 my-4 rounded-xl bg-rose-50 border border-rose-100 text-xs text-rose-700 flex items-center gap-2">
                        <AlertCircle size={15} />
                        <span>This booking request was cancelled.</span>
                      </div>
                    )}

                    {/* Metadata Footer Row */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-y-2 text-xs text-slate-600">
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                        <span className="flex items-center gap-1.5">
                          <ReceiptText size={14} className="text-brand" />
                          <strong className="text-slate-700">{booking.bookingNumber}</strong>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={14} className="text-brand" />
                          {booking.date} at {booking.time}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-brand" />
                          {booking.address}
                        </span>
                      </div>
                      <p className="text-slate-400">
                        Booked {new Date(booking.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
