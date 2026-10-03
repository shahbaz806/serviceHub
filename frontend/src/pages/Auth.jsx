import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck, Wrench } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Auth({ signup = false }) {
  const { login, signup: register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (signup && !form.name.trim()) return toast.error("Please enter your name.");
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters.");
    setBusy(true);
    try {
      const user = signup ? await register(form) : await login(form);
      toast.success(`Welcome${signup ? " to ServiceHub" : ""}, ${user.name.split(" ")[0]}!`);
      navigate(
        user.role === "admin" ? "/admin" : location.state?.from?.pathname || "/services"
      );
    } catch (e) {
      toast.error(e.response?.data?.message || "Could not authenticate.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="grid min-h-[calc(100vh-73px)] lg:grid-cols-2">
      {/* ── Left: Brand Panel with Concept 2 Studio atmosphere ── */}
      <div className="relative hidden overflow-hidden bg-ink lg:flex lg:flex-col lg:justify-between p-12 text-white">
        {/* Subtle radial glow blobs for studio depth */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-1/4 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="pointer-events-none absolute right-10 top-10 h-40 w-40 rounded-full bg-amber-400/8 blur-2xl" />

        {/* Studio Halo Ring — Concept 2 signature — pure CSS */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: "420px", height: "420px" }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(234,243,237,0.12) 0%, rgba(23,115,74,0.06) 50%, transparent 75%)",
              border: "1px solid rgba(163,220,192,0.25)",
              boxShadow: "0 0 60px 8px rgba(163,220,192,0.12) inset",
            }}
          />
        </div>

        {/* Studio platform circle under the icon */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/4"
          style={{
            width: "220px",
            height: "28px",
            background:
              "radial-gradient(ellipse at center, rgba(234,243,237,0.18) 0%, transparent 75%)",
            borderRadius: "50%",
          }}
        />

        {/* Brand Logo */}
        <Link to="/" className="relative z-10 flex items-center gap-2.5 text-xl font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand shadow-md shadow-brand/30">
            <Wrench size={18} />
          </span>
          ServiceHub
        </Link>

        {/* Decorative 3D-like service icon cluster */}
        <div className="relative z-10 flex flex-col items-center py-4">
          {/* Central house icon on mini studio platform */}
          <div className="relative">
            <div
              className="mb-3 grid h-24 w-24 place-items-center rounded-3xl shadow-2xl"
              style={{
                background: "linear-gradient(145deg, #1e3d2f, #17734a)",
                boxShadow: "0 20px 60px rgba(23,115,74,0.35), 0 0 0 1px rgba(163,220,192,0.2)",
              }}
            >
              <Wrench size={40} className="text-white/90" />
            </div>
            {/* Floating accent dots */}
            <div className="absolute -right-3 -top-3 h-4 w-4 rounded-full bg-accent/80 shadow-sm shadow-accent/40" />
            <div className="absolute -left-2 bottom-0 h-2.5 w-2.5 rounded-full bg-[#a9dcbf]/60" />
          </div>
          {/* Studio platform ellipse under icon */}
          <div
            className="mt-1"
            style={{
              width: "120px",
              height: "14px",
              background:
                "radial-gradient(ellipse at center, rgba(234,243,237,0.22) 0%, transparent 70%)",
              borderRadius: "50%",
            }}
          />
        </div>

        {/* Brand copy — preserved exactly */}
        <div className="relative z-10">
          <p className="text-sm font-bold uppercase tracking-widest text-[#a9dcbf]">
            Home help, simplified
          </p>
          <h1 className="mt-4 text-5xl font-extrabold leading-tight">
            A better way to care for your home.
          </h1>
          <div className="mt-7 flex items-center gap-3">
            <ShieldCheck size={17} className="text-[#a9dcbf]" />
            <p className="text-sm text-white/65">
              Trusted services, neatly organized in one place.
            </p>
          </div>
        </div>
      </div>

      {/* ── Right: Auth Form ── */}
      <div className="flex items-center justify-center bg-[#fbfcfa] px-4 py-12">
        <form onSubmit={submit} className="w-full max-w-md">
          {/* Mobile back link */}
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-brand lg:hidden">
            <Wrench size={16} /> ServiceHub
          </Link>

          <p className="mt-8 text-xs font-bold uppercase tracking-widest text-brand">
            {signup ? "Create account" : "Welcome back"}
          </p>
          <h1 className="mt-2 text-4xl font-extrabold leading-tight text-ink">
            {signup ? "Let's get started." : "Log in to ServiceHub."}
          </h1>

          {signup && (
            <div className="mt-7">
              <label className="label">Full name</label>
              <input
                className="input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Alex Morgan"
              />
            </div>
          )}

          <div className="mt-5">
            <label className="label">Email address</label>
            <input
              required
              type="email"
              className="input"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
            />
          </div>

          <div className="mt-5">
            <label className="label">Password</label>
            <input
              required
              type="password"
              className="input"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="At least 6 characters"
            />
          </div>

          <button
            disabled={busy}
            className="btn-primary mt-7 w-full justify-center"
          >
            {busy
              ? "Please wait..."
              : signup
              ? "Create account"
              : "Log in"}
            {!busy && <ArrowRight size={16} />}
          </button>

          <p className="mt-6 text-center text-sm text-slate-600">
            {signup ? "Already have an account?" : "New to ServiceHub?"}{" "}
            <Link
              className="font-bold text-brand"
              to={signup ? "/login" : "/signup"}
            >
              {signup ? "Log in" : "Create an account"}
            </Link>
          </p>

          {!signup && (
            <p className="mt-6 rounded-xl bg-sage/60 p-3 text-center text-xs text-slate-600">
              Admin demo: admin@servicehub.local / Admin123!
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
