import { Link } from "react-router-dom";
import { Wrench } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink py-12 text-white">
      {/* Concept 2: Subtle studio depth glows */}
      <div className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-emerald-400/8 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-20" />

      <div className="container-page relative z-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2.5 text-xl font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand shadow-md shadow-brand/30">
              <Wrench size={18} />
            </span>
            ServiceHub
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
            The easy, dependable way to book help for your home.
          </p>
        </div>

        <div>
          <p className="font-bold text-white">Explore</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-slate-300">
            <Link className="transition hover:text-[#a9dcbf]" to="/services">All services</Link>
            <Link className="transition hover:text-[#a9dcbf]" to="/my-bookings">My bookings</Link>
          </div>
        </div>

        <div>
          <p className="font-bold text-white">Get started</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-slate-300">
            <Link className="transition hover:text-[#a9dcbf]" to="/signup">Create account</Link>
            <Link className="transition hover:text-[#a9dcbf]" to="/login">Log in</Link>
          </div>
        </div>
      </div>

      <div className="container-page relative z-10 mt-10 border-t border-white/10 pt-6 text-xs text-slate-400">
        © {new Date().getFullYear()} ServiceHub. Built for better home care.
      </div>
    </footer>
  );
}
