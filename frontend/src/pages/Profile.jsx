import { useState } from "react";
import toast from "react-hot-toast";
import {
  Camera,
  ShieldCheck,
  UserRound,
  Mail,
  Lock,
  Calendar,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import ScrollReveal from "../components/ui/ScrollReveal";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    name: user.name,
    profileImage: user.profileImage || "",
  });
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    if (form.name.trim().length < 2) return toast.error("Please enter your name.");
    setBusy(true);
    try {
      const { data } = await api.patch("/users/profile", form);
      setUser(data.user);
      toast.success("Profile updated.");
    } catch (e) {
      toast.error(e.response?.data?.message || "Could not update profile.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-offwhite">
      {/* ── Identity Sanctuary Studio Header ── */}
      <div className="relative overflow-hidden bg-sage pb-12 pt-12">
        <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-30" />

        {/* Decorative architectural circle */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-12 top-1/2 hidden -translate-y-1/2 lg:block"
          style={{ width: "240px", height: "240px" }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: "1.5px solid rgba(163,220,192,0.35)",
              background:
                "radial-gradient(ellipse at center, rgba(234,243,237,0.5) 0%, transparent 75%)",
            }}
          />
        </div>

        <div className="container-page relative z-10 max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-widest text-brand">
            Account settings
          </p>
          <h1 className="mt-2 display-lg text-ink">
            Your profile
          </h1>
          <p className="mt-2 text-slate-600 body-lg">
            Manage your personal information and service preferences.
          </p>
        </div>
      </div>

      <main className="container-page max-w-4xl py-10 sm:py-14">
        <div className="grid gap-8 md:grid-cols-[1fr_280px]">
          {/* Main Edit Form */}
          <ScrollReveal>
            <form
              onSubmit={submit}
              className="card border border-slate-200/80 p-6 sm:p-8"
            >
              {/* Avatar & Identity Header */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 pb-6 border-b border-slate-100">
                <div className="relative grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-full bg-sage text-brand shadow-sm">
                  {form.profileImage ? (
                    <img
                      className="h-full w-full object-cover"
                      src={form.profileImage}
                      alt="Profile"
                    />
                  ) : (
                    <UserRound size={34} />
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-ink">{user.name}</h2>
                  <p className="mt-0.5 text-sm text-slate-500">{user.email}</p>
                  <div className="mt-2.5 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-sage px-3 py-0.5 text-xs font-bold capitalize text-brand">
                      <ShieldCheck size={13} /> {user.role}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                      <CheckCircle2 size={12} /> Verified Member
                    </span>
                  </div>
                </div>
              </div>

              {/* Form Fields — all existing fields preserved */}
              <div className="mt-6 space-y-5">
                <div>
                  <label className="label">Full name</label>
                  <div className="relative">
                    <UserRound size={17} className="absolute left-4 top-3.5 text-slate-400" />
                    <input
                      className="input pl-11"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="label flex items-center gap-2">
                    <Camera size={16} /> Profile image URL{" "}
                    <span className="font-normal text-slate-400">(optional)</span>
                  </label>
                  <input
                    className="input"
                    type="url"
                    placeholder="https://example.com/your-photo.jpg"
                    value={form.profileImage}
                    onChange={(e) =>
                      setForm({ ...form, profileImage: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="label">Email address</label>
                  <div className="relative">
                    <Mail size={17} className="absolute left-4 top-3.5 text-slate-400" />
                    <input
                      className="input pl-11 bg-slate-50 text-slate-500 cursor-not-allowed"
                      disabled
                      value={user.email}
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-slate-400">
                    Email address is tied to your account authentication and cannot be changed here.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-end border-t border-slate-100 pt-6">
                <button disabled={busy} className="btn-primary !px-7">
                  {busy ? "Saving..." : "Save changes"}
                </button>
              </div>
            </form>
          </ScrollReveal>

          {/* Sidebar Info Card */}
          <ScrollReveal direction="right" delay={0.1}>
            <div className="space-y-6">
              <div className="card p-6 border border-slate-200/80">
                <div className="flex items-center gap-2 text-sm font-bold text-ink">
                  <ShieldCheck size={18} className="text-brand" />
                  <span>Account Security</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  Your password protects your account and saved booking history. Keep your login information secure.
                </p>
                <div className="mt-4 border-t border-slate-100 pt-4 text-xs text-slate-600 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-brand" />
                    <span>Encrypted Credentials</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-brand" />
                    <span>Verified Local Pros</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-brand/20 bg-sage/60 p-5">
                <div className="flex items-center gap-2 text-xs font-bold text-brand uppercase tracking-wider">
                  <Sparkles size={14} /> Need Help?
                </div>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Have an active service inquiry or questions about your bookings? Our support team is ready to assist.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
    </div>
  );
}
