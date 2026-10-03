import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/60 backdrop-blur-sm p-4 flex items-center justify-center">
      <div className="card w-full max-w-3xl border border-slate-200/80 p-6 sm:p-8 shadow-lift animate-slide-up">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h2 className="text-2xl font-bold text-ink">
            {service ? "Edit service" : "Add service"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-ink"
          >
            <X size={18} />
          </button>
        </div>
        <form onSubmit={submit} className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label">Service title</label>
            <input
              className="input"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
            />
          </div>
          <div>
            <label className="label">Category</label>
            <select
              className="input"
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Provider</label>
            <select
              className="input"
              value={form.providerId}
              onChange={(e) => {
                const provider = providers.find(
                  (item) => item._id === e.target.value
                );
                setForm((current) => ({
                  ...current,
                  providerId: e.target.value,
                  providerName: provider?.name || current.providerName,
                }));
              }}
            >
              <option value="">Use provider name below</option>
              {providers.map((provider) => (
                <option value={provider._id} key={provider._id}>
                  {provider.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Provider display name</label>
            <input
              className="input"
              value={form.providerName}
              onChange={(e) => set("providerName", e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="label">Description</label>
            <textarea
              className="input resize-none"
              rows="3"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </div>
          <div>
            <label className="label">Price ($)</label>
            <input
              className="input"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
            />
          </div>
          <div>
            <label className="label">Duration (minutes)</label>
            <input
              className="input"
              type="number"
              min="15"
              step="15"
              value={form.duration}
              onChange={(e) => set("duration", e.target.value)}
            />
          </div>
          <div>
            <label className="label">Rating</label>
            <input
              className="input"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={form.rating}
              onChange={(e) => set("rating", e.target.value)}
            />
          </div>
          <div>
            <label className="label">Location</label>
            <input
              className="input"
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="label">Available time slots</label>
            <input
              className="input"
              value={form.availableSlots}
              onChange={(e) => set("availableSlots", e.target.value)}
              placeholder="09:00, 11:00, 14:00"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="label">Image URL</label>
            <input
              className="input"
              type="url"
              value={form.image}
              onChange={(e) => set("image", e.target.value)}
            />
          </div>
          <label className="flex items-center gap-2 text-sm font-bold sm:col-span-2">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => set("isActive", e.target.checked)}
            />{" "}
            Service is publicly available
          </label>
          <div className="flex gap-3 sm:col-span-2">
            <button disabled={busy} className="btn-primary">
              {busy ? "Saving..." : "Save service"}
            </button>
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
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
      <main className="container-page py-16">
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
    <div className="min-h-screen bg-[#fbfcfa]">
      {/* Concept 2: Executive Studio dark ink header */}
      <div className="relative overflow-hidden bg-ink pb-10 pt-12">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/12 blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 rounded-full bg-emerald-400/8 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-30" />
        <div className="container-page relative z-10">
          <p className="text-xs font-bold uppercase tracking-widest text-[#a9dcbf]">
            Control center
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Admin dashboard
          </h1>
        </div>
      </div>
      <main className="container-page py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="card h-fit border border-slate-200/80 p-4 shadow-card">
          <p className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-brand">
            Admin panel
          </p>
          <nav className="mt-2 flex gap-1 overflow-x-auto lg:flex-col">
            {nav.map(([id, label]) => (
              <button
                key={id}
                onClick={() => setSection(id)}
                className={`whitespace-nowrap rounded-xl px-3.5 py-2.5 text-left text-sm font-bold transition-all ${
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
        <div>
          <p className="section-overline">
            Control center
          </p>
          <h1 className="mt-1 display-md text-ink">
            {nav.find((item) => item[0] === section)?.[1] || "Admin dashboard"}
          </h1>
          {section === "dashboard" && (
            <>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {metrics.map(([Icon, label, value]) => (
                  <div
                    className="card border border-slate-200/80 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-brand/25 hover:shadow-lift"
                    key={label}
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-sage text-brand shadow-2xs">
                        <Icon size={20} />
                      </span>
                      <span className="text-3xl font-extrabold text-ink">{value}</span>
                    </div>
                    <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="card mt-5 border border-slate-200/80 p-6 bg-gradient-to-br from-white to-slate-50/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Confirmed, active, and completed booking value
                    </p>
                    <p className="mt-1 text-4xl font-extrabold text-brand tracking-tight">
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
            <section className="mt-8">
              <button onClick={() => setAdding(true)} className="btn-primary">
                <Plus size={18} /> Add service
              </button>
              <div className="card mt-5 overflow-x-auto border border-slate-200/80 shadow-card rounded-2xl">
                <table className="w-full min-w-[750px] text-left text-sm">
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
                          {service.title}
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
            <section className="mt-8">
              <div className="flex flex-wrap gap-3">
                <input
                  className="input max-w-sm"
                  placeholder="Search booking, customer, service"
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                />
                <select
                  className="input max-w-48"
                  value={bookingStatus}
                  onChange={(e) => setBookingStatus(e.target.value)}
                >
                  <option value="all">All statuses</option>
                  {statuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div className="card mt-5 overflow-x-auto border border-slate-200/80 shadow-card rounded-2xl">
                <table className="w-full min-w-[850px] text-left text-sm">
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
                            <div className="flex items-center gap-2">
                              <StatusBadge status={booking.status} />
                              <select
                                className="rounded-lg border border-slate-200 p-1 text-xs outline-none bg-white hover:border-brand/40"
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
            <section className="mt-8">
              <div className="card overflow-x-auto border border-slate-200/80 shadow-card rounded-2xl">
                <table className="w-full min-w-[650px] text-left text-sm">
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
                          <td className="p-4 font-bold text-ink">{user.name}</td>
                          <td className="p-4 text-slate-600">{user.email}</td>
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
            <section className="card mt-8 p-6 border border-slate-200/80 shadow-card rounded-2xl">
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
            <section className="card mt-8 p-6 border border-slate-200/80 shadow-card rounded-2xl">
              <h2 className="text-2xl font-bold text-ink">Marketplace settings</h2>
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
