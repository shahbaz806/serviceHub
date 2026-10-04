import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Menu,
  Pencil,
  Plus,
  Settings,
  Trash2,
  Users,
  Wrench,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";
import Loader from "../components/Loader";
import StatusBadge from "../components/StatusBadge";

const categories = [
  "AC Repair",
  "Electrician",
  "Plumber",
  "Cleaning",
  "Appliance Repair",
];
const statuses = [
  "pending",
  "confirmed",
  "in_progress",
  "completed",
  "cancelled",
];
const blankService = {
  title: "",
  category: "AC Repair",
  description: "",
  price: "",
  duration: "60",
  image: "",
  rating: "4.8",
  providerName: "",
  location: "Greater local area",
  availableSlots: "09:00, 11:00, 14:00, 16:00",
  isActive: true,
};

function ServiceForm({ service, providers, onClose, onSaved }) {
  const [form, setForm] = useState(
    service
      ? {
          ...blankService,
          ...service,
          price: String(service.price),
          duration: String(service.duration || 60),
          rating: String(service.rating || 4.8),
          providerId: service.providerId?._id || service.providerId || "",
          availableSlots: (service.availableSlots || []).join(", "),
        }
      : blankService
  );

  const [busy, setBusy] = useState(false);
  const set = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));
  async function submit(event) {
    event.preventDefault();
    if (!form.title || !form.description || !form.price || !form.providerName)
      return toast.error(
        "Title, provider, description, and price are required."
      );
    setBusy(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        duration: Number(form.duration),
        rating: Number(form.rating),
        availableSlots: form.availableSlots
          .split(",")
          .map((slot) => slot.trim())
          .filter(Boolean),
      };
      if (service) await api.patch(`/services/${service._id}`, payload);
      else await api.post("/services", payload);
      toast.success(service ? "Service updated." : "Service added.");
      onSaved();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not save service.");
    } finally {
      setBusy(false);
    }
  }
  return (
    // <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/60 backdrop-blur-sm p-4 flex items-center justify-center">
    //   <div className="card w-full min-w-0 max-w-3xl border border-slate-200/80 p-5 sm:p-8 shadow-lift animate-slide-up">
    //     <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100">
    //       <h2 className="min-w-0 break-words text-xl font-bold text-ink sm:text-2xl">
    //         {service ? "Edit service" : "Add service"}
    //       </h2>
    //       <button
    //         onClick={onClose}
    //         aria-label="Close"
    //         className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-ink"
    //       >
    //         <X size={18} />
    //       </button>
    //     </div>
    //     <form onSubmit={submit} className="mt-6 grid gap-5 sm:grid-cols-2">
    //       <div>
    //         <label className="label">Service title</label>
    //         <input
    //           className="input"
    //           value={form.title}
    //           onChange={(e) => set("title", e.target.value)}
    //         />
    //       </div>
    //       <div>
    //         <label className="label">Category</label>
    //         <select
    //           className="input"
    //           value={form.category}
    //           onChange={(e) => set("category", e.target.value)}
    //         >
    //           {categories.map((category) => (
    //             <option key={category}>{category}</option>
    //           ))}
    //         </select>
    //       </div>
    //       <div>
    //         <label className="label">Provider</label>
    //         <select
    //           className="input"
    //           value={form.providerId}
    //           onChange={(e) => {
    //             const provider = providers.find(
    //               (item) => item._id === e.target.value
    //             );
    //             setForm((current) => ({
    //               ...current,
    //               providerId: e.target.value,
    //               providerName: provider?.name || current.providerName,
    //             }));
    //           }}
    //         >
    //           <option value="">Use provider name below</option>
    //           {providers.map((provider) => (
    //             <option value={provider._id} key={provider._id}>
    //               {provider.name}
    //             </option>
    //           ))}
    //         </select>
    //       </div>
    //       <div>
    //         <label className="label">Provider display name</label>
    //         <input
    //           className="input"
    //           value={form.providerName}
    //           onChange={(e) => set("providerName", e.target.value)}
    //         />
    //       </div>
    //       <div className="sm:col-span-2">
    //         <label className="label">Description</label>
    //         <textarea
    //           className="input resize-none"
    //           rows="3"
    //           value={form.description}
    //           onChange={(e) => set("description", e.target.value)}
    //         />
    //       </div>
    //       <div>
    //         <label className="label">Price ($)</label>
    //         <input
    //           className="input"
    //           type="number"
    //           min="0"
    //           step="0.01"
    //           value={form.price}
    //           onChange={(e) => set("price", e.target.value)}
    //         />
    //       </div>
    //       <div>
    //         <label className="label">Duration (minutes)</label>
    //         <input
    //           className="input"
    //           type="number"
    //           min="15"
    //           step="15"
    //           value={form.duration}
    //           onChange={(e) => set("duration", e.target.value)}
    //         />
    //       </div>
    //       <div>
    //         <label className="label">Rating</label>
    //         <input
    //           className="input"
    //           type="number"
    //           min="0"
    //           max="5"
    //           step="0.1"
    //           value={form.rating}
    //           onChange={(e) => set("rating", e.target.value)}
    //         />
    //       </div>
    //       <div>
    //         <label className="label">Location</label>
    //         <input
    //           className="input"
    //           value={form.location}
    //           onChange={(e) => set("location", e.target.value)}
    //         />
    //       </div>
    //       <div className="sm:col-span-2">
    //         <label className="label">Available time slots</label>
    //         <input
    //           className="input"
    //           value={form.availableSlots}
    //           onChange={(e) => set("availableSlots", e.target.value)}
    //           placeholder="09:00, 11:00, 14:00"
    //         />
    //       </div>
    //       <div className="sm:col-span-2">
    //         <label className="label">Image URL</label>
    //         <input
    //           className="input"
    //           type="url"
    //           value={form.image}
    //           onChange={(e) => set("image", e.target.value)}
    //         />
    //       </div>
    //       <label className="flex items-center gap-2 text-sm font-bold sm:col-span-2">
    //         <input
    //           type="checkbox"
    //           checked={form.isActive}
    //           onChange={(e) => set("isActive", e.target.checked)}
    //         />{" "}
    //         Service is publicly available
    //       </label>
    //       <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
    //         <button disabled={busy} className="btn-primary w-full sm:w-auto">
    //           {busy ? "Saving..." : "Save service"}
    //         </button>
    //         <button type="button" onClick={onClose} className="btn-secondary w-full sm:w-auto">
    //           Cancel
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/60 backdrop-blur-sm">
  <div className="flex min-h-full items-start justify-center p-4 sm:p-6">
    <div className="card w-full min-w-0 max-w-3xl border border-slate-200/80 p-5 shadow-lift animate-slide-up sm:p-8">
      
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
        <h2 className="min-w-0 break-words text-xl font-bold text-ink sm:text-2xl">
          {service ? "Edit service" : "Add service"}
        </h2>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-ink"
        >
          <X size={18} />
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={submit}
        className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2"
      >
        {/* Service Title */}
        <div className="min-w-0">
          <label className="label block">
            Service title
          </label>

          <input
            type="text"
            className="input w-full"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="min-w-0">
          <label className="label block">
            Category
          </label>

          <select
            className="input w-full"
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Provider */}
        <div className="min-w-0">
          <label className="label block">
            Provider
          </label>

          <select
            className="input w-full"
            value={form.providerId}
            onChange={(e) => {
              const provider = providers.find(
                (item) => item._id === e.target.value
              );

              setForm((current) => ({
                ...current,
                providerId: e.target.value,
                providerName:
                  provider?.name || current.providerName,
              }));
            }}
          >
            <option value="">
              Use provider name below
            </option>

            {providers.map((provider) => (
              <option
                value={provider._id}
                key={provider._id}
              >
                {provider.name}
              </option>
            ))}
          </select>
        </div>

        {/* Provider Display Name */}
        <div className="min-w-0">
          <label className="label block">
            Provider display name
          </label>

          <input
            type="text"
            className="input w-full"
            value={form.providerName}
            onChange={(e) =>
              set("providerName", e.target.value)
            }
          />
        </div>

        {/* Description */}
        <div className="min-w-0 sm:col-span-2">
          <label className="label block">
            Description
          </label>

          <textarea
            className="input w-full resize-none"
            rows={3}
            value={form.description}
            onChange={(e) =>
              set("description", e.target.value)
            }
          />
        </div>

        {/* Price */}
        <div className="min-w-0">
          <label className="label block">
            Price ($)
          </label>

          <input
            className="input w-full"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={(e) =>
              set("price", e.target.value)
            }
          />
        </div>

        {/* Duration */}
        <div className="min-w-0">
          <label className="label block">
            Duration (minutes)
          </label>

          <input
            className="input w-full"
            type="number"
            min="15"
            step="15"
            value={form.duration}
            onChange={(e) =>
              set("duration", e.target.value)
            }
          />
        </div>

        {/* Rating */}
        <div className="min-w-0">
          <label className="label block">
            Rating
          </label>

          <input
            className="input w-full"
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={form.rating}
            onChange={(e) =>
              set("rating", e.target.value)
            }
          />
        </div>

        {/* Location */}
        <div className="min-w-0">
          <label className="label block">
            Location
          </label>

          <input
            type="text"
            className="input w-full"
            value={form.location}
            onChange={(e) =>
              set("location", e.target.value)
            }
          />
        </div>

        {/* Available Slots */}
        <div className="min-w-0 sm:col-span-2">
          <label className="label block">
            Available time slots
          </label>

          <input
            type="text"
            className="input w-full"
            value={form.availableSlots}
            onChange={(e) =>
              set("availableSlots", e.target.value)
            }
            placeholder="09:00, 11:00, 14:00"
          />
        </div>

        {/* Image URL */}
        <div className="min-w-0 sm:col-span-2">
          <label className="label block">
            Image URL
          </label>

          <input
            className="input w-full"
            type="url"
            value={form.image}
            onChange={(e) =>
              set("image", e.target.value)
            }
          />
        </div>

        {/* Active */}
        <label className="flex min-w-0 items-center gap-2 text-sm font-bold sm:col-span-2">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) =>
              set("isActive", e.target.checked)
            }
            className="shrink-0"
          />

          <span>
            Service is publicly available
          </span>
        </label>

        {/* Buttons */}
        <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:col-span-2 sm:flex-row">
          <button
            type="submit"
            disabled={busy}
            className="btn-primary w-full sm:w-auto"
          >
            {busy ? "Saving..." : "Save service"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="btn-secondary w-full sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </form>

    </div>
  </div>
</div>
  );
}

export default function Admin() {
  const [stats, setStats] = useState(null);
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [section, setSection] = useState("dashboard");
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingSearch, setBookingSearch] = useState("");
  const [bookingStatus, setBookingStatus] = useState("all");
  const [navOpen, setNavOpen] = useState(false);
  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [dashboard, serviceResult, bookingResult, userResult] =
        await Promise.all([
          api.get("/admin/dashboard"),
          api.get("/services/admin/all"),
          api.get("/bookings"),
          api.get("/admin/users"),
        ]);
      setStats(dashboard.data.stats);
      setServices(serviceResult.data.services);
      setBookings(bookingResult.data.bookings);
      setUsers(userResult.data.users);
    } catch (e) {
      const message =
        e.response?.data?.message || "Could not load the admin dashboard.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);
  const providers = users.filter((user) => user.role === "provider");
  const visibleBookings = useMemo(
    () =>
      bookings.filter(
        (booking) =>
          (bookingStatus === "all" || booking.status === bookingStatus) &&
          `${booking.bookingNumber || ""} ${booking.userId?.name || ""} ${
            booking.serviceId?.title || ""
          }`
            .toLowerCase()
            .includes(bookingSearch.toLowerCase())
      ),
    [bookings, bookingSearch, bookingStatus]
  );
  async function remove(service) {
    if (!window.confirm(`Delete “${service.title}”? This cannot be undone.`))
      return;
    try {
      await api.delete(`/services/${service._id}`);
      toast.success("Service deleted.");
      load();
    } catch (e) {
      toast.error(e.response?.data?.message || "Could not delete service.");
    }
  }
  async function updateStatus(id, status) {
    try {
      await api.patch(`/bookings/${id}/status`, { status });
      toast.success("Booking status updated.");
      load();
    } catch (e) {
      toast.error(e.response?.data?.message || "Could not update booking.");
    }
  }
  async function updateRole(id, role) {
    try {
      await api.patch(`/admin/users/${id}/role`, { role });
      toast.success("User role updated.");
      load();
    } catch (e) {
      toast.error(e.response?.data?.message || "Could not update role.");
    }
  }
  if (loading) return <Loader label="Loading dashboard..." />;
  if (error || !stats)
    return (
      <main className="container-page py-16 min-w-0 max-w-full">
        <div className="card mx-auto max-w-xl p-8 text-center">
          <h1 className="text-3xl">Admin dashboard unavailable</h1>
          <p className="mt-3 text-slate-600">
            {error || "Dashboard data could not be loaded."}
          </p>
          <button onClick={load} className="btn-primary mt-6">
            Try again
          </button>
        </div>
      </main>
    );
  const metrics = [
    [Users, "Customers", stats.users],
    [Users, "Providers", stats.providers],
    [Wrench, "Services", stats.services],
    [CalendarDays, "Bookings", stats.bookings],
    [Clock3, "Pending", stats.pending],
    [CheckCircle2, "Completed", stats.completed],
  ];
  const nav = [
    ["dashboard", "Dashboard"],
    ["services", "Manage services"],
    ["bookings", "Manage bookings"],
    ["users", "Manage users"],
    ["providers", "Service providers"],
    ["categories", "Categories"],
    ["settings", "Settings"],
  ];
  return (
    <div className="min-h-screen w-full min-w-0 max-w-full bg-[#fbfcfa]">
      {/* Concept 2: Executive Studio dark ink header */}
      <div className="relative overflow-hidden bg-ink pb-8 pt-8 sm:pb-10 sm:pt-12">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/12 blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 rounded-full bg-emerald-400/8 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-30" />
        <div className="container-page relative z-10 min-w-0">
          <p className="text-xs font-bold uppercase tracking-widest text-[#a9dcbf]">
            Control center
          </p>
          <h1 className="mt-2 break-words text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Admin dashboard
          </h1>
        </div>
      </div>
      <main className="container-page min-w-0 max-w-full py-6 sm:py-14">
        <div className="mb-4 flex items-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setNavOpen(true)}
            aria-label="Open admin menu"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-ink"
          >
            <Menu size={18} />
          </button>
          <p className="min-w-0 truncate text-sm font-bold text-ink">
            {nav.find((item) => item[0] === section)?.[1] || "Admin dashboard"}
          </p>
        </div>
        <div className="grid min-w-0 max-w-full gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8">
        <aside className="card hidden h-fit border border-slate-200/80 p-4 shadow-card lg:block">
          <p className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-brand">
            Admin panel
          </p>
          <nav className="mt-2 flex flex-col gap-1">
            {nav.map(([id, label]) => (
              <button
                key={id}
                onClick={() => setSection(id)}
                className={`rounded-xl px-3.5 py-2.5 text-left text-sm font-bold transition-all ${
                  section === id
                    ? "bg-brand text-white shadow-sm shadow-brand/20"
                    : "text-slate-600 hover:bg-sage/60 hover:text-ink"
                }`}
              >
                {id === "settings" && (
                  <Settings size={15} className="mr-2 inline" />
                )}
                {label}
              </button>
            ))}
          </nav>
        </aside>
        {navOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-ink/60"
              aria-label="Close admin menu"
              onClick={() => setNavOpen(false)}
            />
            <aside className="relative flex h-full w-[min(18rem,calc(100%-1.5rem))] max-w-full flex-col border-r border-slate-200 bg-white p-4 shadow-lift">
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="px-1 text-xs font-bold uppercase tracking-widest text-brand">
                  Admin panel
                </p>
                <button
                  type="button"
                  onClick={() => setNavOpen(false)}
                  aria-label="Close"
                  className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 text-slate-500"
                >
                  <X size={18} />
                </button>
              </div>
              <nav className="mt-2 flex min-w-0 flex-col gap-1">
                {nav.map(([id, label]) => (
                  <button
                    key={id}
                    onClick={() => {
                      setSection(id);
                      setNavOpen(false);
                    }}
                    className={`rounded-xl px-3.5 py-2.5 text-left text-sm font-bold transition-all ${
                      section === id
                        ? "bg-brand text-white shadow-sm shadow-brand/20"
                        : "text-slate-600 hover:bg-sage/60 hover:text-ink"
                    }`}
                  >
                    {id === "settings" && (
                      <Settings size={15} className="mr-2 inline" />
                    )}
                    {label}
                  </button>
                ))}
              </nav>
            </aside>
          </div>
        ) : null}
        <div className="w-full min-w-0 max-w-full">
          <p className="section-overline">
            Control center
          </p>
          <h1 className="mt-1 display-md break-words text-ink">
            {nav.find((item) => item[0] === section)?.[1] || "Admin dashboard"}
          </h1>
          {section === "dashboard" && (
            <>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {metrics.map(([Icon, label, value]) => (
                  <div
                    className="card w-full min-w-0 border border-slate-200/80 p-4 sm:p-5 transition-all duration-200 hover:-translate-y-1 hover:border-brand/25 hover:shadow-lift"
                    key={label}
                  >
                    <div className="flex min-w-0 items-center justify-between gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sage text-brand shadow-2xs">
                        <Icon size={20} />
                      </span>
                      <span className="min-w-0 break-all text-3xl font-extrabold text-ink">{value}</span>
                    </div>
                    <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="card mt-5 w-full min-w-0 max-w-full overflow-hidden border border-slate-200/80 p-4 sm:p-6 bg-gradient-to-br from-white to-slate-50/50">
                <div className="flex min-w-0 flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 break-words">
                      Confirmed, active, and completed booking value
                    </p>
                    <p className="mt-1 break-all text-3xl font-extrabold text-brand tracking-tight sm:text-4xl">
                      ${stats.revenue.toFixed(2)}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-emerald-50 border border-emerald-200/60 px-3 py-1 text-xs font-bold text-emerald-700">
                    <CheckCircle2 size={13} /> Active Revenue Track
                  </span>
                </div>
              </div>
            </>
          )}
         
          {section === "services" && (
            <section className="mt-8 min-w-0">
              <button onClick={() => setAdding(true)} className="btn-primary w-full sm:w-auto">
                <Plus size={18} /> Add service
              </button>
              <div className="mt-5 space-y-3 md:hidden">
                {services.map((service) => (
                  <article
                    className="card min-w-0 border border-slate-200/80 p-4 shadow-card"
                    key={service._id}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="break-words font-bold text-ink">{service.title}</p>
                        <p className="mt-1 text-xs text-slate-500">
                          {service.category} · {service.duration} min
                        </p>
                      </div>
                      <p className="shrink-0 font-bold text-brand">${service.price}</p>
                    </div>
                    <p className="mt-3 break-words text-sm text-slate-700">
                      {service.providerId?.name || service.providerName}
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          service.isActive
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${service.isActive ? "bg-emerald-500" : "bg-slate-400"}`} />
                        {service.isActive ? "Active" : "Disabled"}
                      </span>
                      <div className="flex shrink-0">
                        <button
                          className="text-brand hover:opacity-75 p-1 rounded-lg hover:bg-sage/40 transition"
                          onClick={() => setEditing(service)}
                          title="Edit"
                        >
                          <Pencil size={17} />
                        </button>
                        <button
                          className="text-rose-600 hover:opacity-75 p-1 rounded-lg hover:bg-rose-50 transition"
                          onClick={() => remove(service)}
                          title="Delete"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className="card mt-5 hidden w-full min-w-0 max-w-full overflow-x-auto border border-slate-200/80 shadow-card rounded-2xl md:block">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead className="border-b border-slate-100 bg-slate-50/80 text-xs uppercase font-bold text-slate-500">
                    <tr>
                      <th className="p-4">Service</th>
                      <th className="p-4">Provider</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Availability</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service) => (
                      <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors" key={service._id}>
                        <td className="p-4 font-bold text-ink">
                          <span className="break-words">{service.title}</span>
                          <br />
                          <span className="text-xs font-normal text-slate-500">
                            {service.category} · {service.duration} min
                          </span>
                        </td>
                        <td className="p-4 text-slate-700">
                          {service.providerId?.name || service.providerName}
                        </td>
                        <td className="p-4 font-bold text-brand">
                          ${service.price}
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                              service.isActive
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${service.isActive ? "bg-emerald-500" : "bg-slate-400"}`} />
                            {service.isActive ? "Active" : "Disabled"}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            className="mr-3 text-brand hover:opacity-75 p-1 rounded-lg hover:bg-sage/40 transition"
                            onClick={() => setEditing(service)}
                            title="Edit"
                          >
                            <Pencil size={17} />
                          </button>
                          <button
                            className="text-rose-600 hover:opacity-75 p-1 rounded-lg hover:bg-rose-50 transition"
                            onClick={() => remove(service)}
                            title="Delete"
                          >
                            <Trash2 size={17} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
          {section === "bookings" && (
            <section className="mt-8 min-w-0">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  className="input w-full min-w-0"
                  placeholder="Search booking, customer, service"
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                />
                <select
                  className="input w-full min-w-0"
                  value={bookingStatus}
                  onChange={(e) => setBookingStatus(e.target.value)}
                >
                  <option value="all">All statuses</option>
                  {statuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div className="mt-5 space-y-3 md:hidden">
                {visibleBookings.length ? (
                  visibleBookings.map((booking) => (
                    <article
                      className="card min-w-0 border border-slate-200/80 p-4 shadow-card"
                      key={booking._id}
                    >
                      <p className="break-all font-bold text-ink">
                        {booking.bookingNumber || booking._id.slice(-6)}
                      </p>
                      <p className="mt-2 break-words text-sm font-semibold text-slate-800">
                        {booking.userId?.name}
                      </p>
                      <p className="break-words text-xs text-slate-500">{booking.phone}</p>
                      <p className="mt-2 break-words text-sm font-semibold text-slate-800">
                        {booking.serviceId?.title}
                      </p>
                      <p className="text-xs font-bold text-brand">${booking.price}</p>
                      <p className="mt-2 text-sm text-slate-600">
                        {booking.date}{" "}
                        <span className="text-xs text-slate-500">{booking.time}</span>
                      </p>
                      <div className="mt-3 flex min-w-0 flex-wrap items-center gap-2">
                        <StatusBadge status={booking.status} />
                        <select
                          className="min-w-0 flex-1 rounded-lg border border-slate-200 p-1 text-xs outline-none bg-white hover:border-brand/40"
                          value={booking.status}
                          onChange={(e) =>
                            updateStatus(booking._id, e.target.value)
                          }
                        >
                          {statuses.map((status) => (
                            <option key={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                    </article>
                  ))
                ) : (
                  <p className="card p-6 text-center text-slate-500">
                    No bookings match these filters.
                  </p>
                )}
              </div>
              <div className="card mt-5 hidden w-full min-w-0 max-w-full overflow-x-auto border border-slate-200/80 shadow-card rounded-2xl md:block">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead className="border-b border-slate-100 bg-slate-50/80 text-xs uppercase font-bold text-slate-500">
                    <tr>
                      <th className="p-4">Booking</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Service</th>
                      <th className="p-4">When</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleBookings.length ? (
                      visibleBookings.map((booking) => (
                        <tr
                          className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors"
                          key={booking._id}
                        >
                          <td className="p-4 font-bold text-ink">
                            {booking.bookingNumber || booking._id.slice(-6)}
                          </td>
                          <td className="p-4">
                            <span className="font-semibold text-slate-800">{booking.userId?.name}</span>
                            <br />
                            <span className="text-xs text-slate-500">
                              {booking.phone}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="font-semibold text-slate-800">{booking.serviceId?.title}</span>
                            <br />
                            <span className="text-xs font-bold text-brand">
                              ${booking.price}
                            </span>
                          </td>
                          <td className="p-4 text-slate-600">
                            {booking.date}
                            <br />
                            <span className="text-xs text-slate-500">{booking.time}</span>
                          </td>
                          <td className="p-4">
                            <div className="flex min-w-0 flex-wrap items-center gap-2">
                              <StatusBadge status={booking.status} />
                              <select
                                className="min-w-0 rounded-lg border border-slate-200 p-1 text-xs outline-none bg-white hover:border-brand/40"
                                value={booking.status}
                                onChange={(e) =>
                                  updateStatus(booking._id, e.target.value)
                                }
                              >
                                {statuses.map((status) => (
                                  <option key={status}>{status}</option>
                                ))}
                              </select>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          className="p-8 text-center text-slate-500"
                          colSpan="5"
                        >
                          No bookings match these filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}
          {["users", "providers"].includes(section) && (
            <section className="mt-8 min-w-0">
              <div className="space-y-3 md:hidden">
                {users
                  .filter((user) =>
                    section === "providers"
                      ? user.role === "provider"
                      : true
                  )
                  .map((user) => (
                    <article
                      className="card min-w-0 border border-slate-200/80 p-4 shadow-card"
                      key={user._id}
                    >
                      <p className="break-words font-bold text-ink">{user.name}</p>
                      <p className="mt-1 break-all text-sm text-slate-600">{user.email}</p>
                      <p className="mt-1 text-sm text-slate-500">{user.phone || "—"}</p>
                      <select
                        className="mt-3 w-full min-w-0 rounded-lg border border-slate-200 px-2 py-1.5 text-xs font-semibold outline-none bg-white hover:border-brand/40"
                        value={user.role}
                        onChange={(e) =>
                          updateRole(user._id, e.target.value)
                        }
                      >
                        {["user", "provider", "admin"].map((role) => (
                          <option key={role}>{role}</option>
                        ))}
                      </select>
                    </article>
                  ))}
              </div>
              <div className="card hidden w-full min-w-0 max-w-full overflow-x-auto border border-slate-200/80 shadow-card rounded-2xl md:block">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="border-b border-slate-100 bg-slate-50/80 text-xs uppercase font-bold text-slate-500">
                    <tr>
                      <th className="p-4">Name</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Phone</th>
                      <th className="p-4">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users
                      .filter((user) =>
                        section === "providers"
                          ? user.role === "provider"
                          : true
                      )
                      .map((user) => (
                        <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors" key={user._id}>
                          <td className="p-4 font-bold text-ink break-words">{user.name}</td>
                          <td className="p-4 text-slate-600 break-all">{user.email}</td>
                          <td className="p-4 text-slate-500">{user.phone || "—"}</td>
                          <td className="p-4">
                            <select
                              className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold outline-none bg-white hover:border-brand/40"
                              value={user.role}
                              onChange={(e) =>
                                updateRole(user._id, e.target.value)
                              }
                            >
                              {["user", "provider", "admin"].map((role) => (
                                <option key={role}>{role}</option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
          {section === "categories" && (
            <section className="card mt-8 min-w-0 p-4 sm:p-6 border border-slate-200/80 shadow-card rounded-2xl">
              <p className="text-slate-600 font-medium">
                Service categories are managed through service records.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <span
                    className="rounded-xl border border-brand/20 bg-sage px-3.5 py-1.5 text-xs font-bold text-brand"
                    key={category}
                  >
                    {category}
                  </span>
                ))}
              </div>
            </section>
          )}
          {section === "settings" && (
            <section className="card mt-8 min-w-0 p-4 sm:p-6 border border-slate-200/80 shadow-card rounded-2xl">
              <h2 className="break-words text-xl font-bold text-ink sm:text-2xl">Marketplace settings</h2>
              <p className="mt-3 text-slate-600 leading-relaxed text-sm">
                Use the environment configuration for database, JWT, client URL,
                and production cookie settings. No sensitive settings are shown
                in the dashboard.
              </p>
            </section>
          )}
        </div>
      </div>
      {adding && (
        <ServiceForm
          providers={providers}
          onClose={() => setAdding(false)}
          onSaved={load}
        />
      )}{" "}
      {editing && (
        <ServiceForm
          service={editing}
          providers={providers}
          onClose={() => setEditing(null)}
          onSaved={load}
        />
      )}
    </main>
    </div>
  );
}
