import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, Clock3, MapPin, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";

const minimumDate = new Date().toISOString().split("T")[0];

const STEPS = [
  { num: 1, label: "Service" },
  { num: 2, label: "Date & Time" },
  { num: 3, label: "Details" },
  { num: 4, label: "Confirm" },
];

export default function BookService() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [service, setService] = useState(null);
  const [busy, setBusy] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    date: "",
    time: "",
    customerName: user?.name || "",
    phone: user?.phone || "",
    address: "",
    instructions: "",
  });

  useEffect(() => {
    api
      .get(`/services/${serviceId}`)
      .then(({ data }) => setService(data.service))
      .catch((e) =>
        toast.error(e.response?.data?.message || "Service is unavailable.")
      );
  }, [serviceId]);

  if (!service) return <Loader label="Loading booking details..." />;

  const provider = service.providerId?.name || service.providerName || "ServiceHub Pro";

  function nextStep() {
    if (step === 2 && (!form.date || !form.time))
      return toast.error("Please select a date and time slot.");
    if (step === 3 && (!form.customerName.trim() || !form.phone.trim() || form.address.trim().length < 8))
      return toast.error("Please fill in your contact and service address.");
    setStep((s) => Math.min(s + 1, 4));
  }

  async function submit() {
    setBusy(true);
    try {
      const { data } = await api.post("/bookings", { serviceId, ...form });
      toast.success(`Booking ${data.booking.bookingNumber} is confirmed!`);
      navigate("/my-bookings");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not create booking.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-offwhite">
      {/* ── Booking Studio Header ── */}
      <div className="relative overflow-hidden bg-sage pb-8 pt-10">
        <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-amber-400/8 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-30" />

        <div className="container-page relative z-10">
          <Link
            to={`/services/${serviceId}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-brand"
          >
            <ArrowLeft size={15} /> Back to details
          </Link>

          {/* Step Progress Indicator */}
          <div className="mt-6 flex items-center gap-2">
            {STEPS.map(({ num, label }) => (
              <div key={num} className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                    step === num
                      ? "bg-brand text-white shadow-sm shadow-brand/30"
                      : step > num
                      ? "bg-brand/20 text-brand"
                      : "bg-white/80 text-slate-400 border border-slate-200"
                  }`}
                >
                  {step > num ? <CheckCircle2 size={14} /> : num}
                </div>
                <span
                  className={`hidden text-xs font-bold sm:block ${
                    step === num ? "text-ink" : "text-slate-400"
                  }`}
                >
                  {label}
                </span>
                {num < 4 && (
                  <div
                    className={`h-px w-8 sm:w-12 ${
                      step > num ? "bg-brand" : "bg-slate-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <h1 className="mt-5 display-md">{service.title}</h1>
        </div>
      </div>

      <main className="container-page py-10 sm:py-14">
        <div className="mx-auto grid max-w-5xl gap-7 lg:grid-cols-[1fr_340px]">

          {/* ── Step Content ── */}
          <div className="card border border-slate-200/80 p-6 sm:p-8">

            {/* STEP 1: Service overview */}
            {step === 1 && (
              <div>
                <p className="section-overline">Step 1</p>
                <h2 className="mt-1 display-md">Your selected service</h2>
                <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100">
                  {service.image && (
                    <img src={service.image} alt={service.title} className="h-44 w-full object-cover" />
                  )}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-ink">{service.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">With {provider}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{service.description}</p>
                    <div className="mt-4 flex items-center gap-4 border-t border-slate-100 pt-4 text-sm">
                      <span className="flex items-center gap-1.5 font-semibold text-slate-600">
                        <Clock3 size={15} className="text-brand" /> {service.duration || 60} min
                      </span>
                      <span className="text-2xl font-bold text-brand">${service.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Date & Time */}
            {step === 2 && (
              <div>
                <p className="section-overline">Step 2</p>
                <h2 className="mt-1 display-md">Choose your date & time</h2>

                <div className="mt-6">
                  <label className="label">Preferred date</label>
                  <input
                    required
                    min={minimumDate}
                    type="date"
                    className="input max-w-xs"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value, time: "" })}
                  />
                </div>

                <div className="mt-6">
                  <label className="label">
                    Available time slots
                    {!form.date && <span className="ml-2 font-normal text-slate-400">(select date first)</span>}
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(service.availableSlots || []).map((slot) => (
                      <button
                        type="button"
                        disabled={!form.date}
                        onClick={() => setForm({ ...form, time: slot })}
                        key={slot}
                        className={`rounded-xl border px-4 py-2.5 text-sm font-bold transition-all ${
                          form.time === slot
                            ? "border-brand bg-brand text-white shadow-sm shadow-brand/20"
                            : "border-slate-200 bg-white text-slate-600 hover:border-brand hover:bg-sage/30"
                        } disabled:cursor-not-allowed disabled:opacity-40`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Contact Details */}
            {step === 3 && (
              <div>
                <p className="section-overline">Step 3</p>
                <h2 className="mt-1 display-md">Your contact details</h2>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label">Your name</label>
                    <div className="relative">
                      <UserRound size={17} className="absolute left-4 top-3.5 text-slate-400" />
                      <input
                        className="input pl-10"
                        value={form.customerName}
                        onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label">Phone number</label>
                    <input
                      className="input"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="(555) 000-0000"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="label">Service address</label>
                  <div className="relative">
                    <MapPin size={17} className="absolute left-4 top-3.5 text-slate-400" />
                    <textarea
                      required
                      rows={3}
                      className="input resize-none pl-10"
                      placeholder="123 Main Street, Apt 4B, City, State"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="label">
                    Additional instructions{" "}
                    <span className="font-normal text-slate-400">(optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    className="input resize-none"
                    placeholder="Access details or anything your pro should know"
                    value={form.instructions}
                    onChange={(e) => setForm({ ...form, instructions: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* STEP 4: Confirm */}
            {step === 4 && (
              <div>
                <p className="section-overline">Step 4</p>
                <h2 className="mt-1 display-md">Review & confirm</h2>

                <div className="mt-6 space-y-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
                  {[
                    ["Service", service.title],
                    ["Provider", provider],
                    ["Date", form.date],
                    ["Time", form.time],
                    ["Name", form.customerName],
                    ["Phone", form.phone],
                    ["Address", form.address],
                    ...(form.instructions ? [["Notes", form.instructions]] : []),
                  ].map(([key, val]) => (
                    <div key={key} className="flex gap-4 text-sm">
                      <span className="w-20 shrink-0 font-bold text-slate-500">{key}</span>
                      <span className="text-ink">{val}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-5 rounded-xl bg-sage/60 p-4 text-sm leading-6 text-slate-600">
                  You'll receive a booking ID and pending confirmation after submitting. The pro will confirm availability.
                </p>
              </div>
            )}

            {/* Step Navigation */}
            <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
              {step > 1 ? (
                <button className="btn-secondary" onClick={() => setStep((s) => s - 1)}>
                  <ArrowLeft size={16} /> Back
                </button>
              ) : (
                <Link to={`/services/${serviceId}`} className="btn-secondary">
                  <ArrowLeft size={16} /> Cancel
                </Link>
              )}

              {step < 4 ? (
                <button className="btn-primary" onClick={nextStep}>
                  Continue <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  disabled={busy}
                  className="btn-primary !px-7"
                  onClick={submit}
                >
                  {busy ? "Confirming…" : `Confirm booking · $${service.price}`}
                </button>
              )}
            </div>
          </div>

          {/* ── Booking Summary Sidebar ── */}
          <div className="card sticky top-24 h-fit overflow-hidden border border-slate-200/80">
            {service.image && (
              <img src={service.image} alt={service.title} className="h-36 w-full object-cover" />
            )}
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Your booking</p>
              <h3 className="mt-1 text-lg font-bold text-ink">{service.title}</h3>
              <p className="text-xs text-slate-500">With {provider}</p>

              <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-600">
                {form.date && (
                  <p className="flex items-center gap-2">
                    <CalendarDays size={13} className="text-brand" /> {form.date}
                  </p>
                )}
                {form.time && (
                  <p className="flex items-center gap-2">
                    <Clock3 size={13} className="text-brand" /> {form.time}
                  </p>
                )}
                {form.address && (
                  <p className="flex items-center gap-2">
                    <MapPin size={13} className="text-brand" /> {form.address.slice(0, 36)}…
                  </p>
                )}
              </div>

              <div className="mt-4 border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total</span>
                  <span className="text-2xl font-bold text-brand">${service.price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
