import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Wrench, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Keep navbar sticky and add subtle border/shadow when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  const close = () => setOpen(false);

  const handleLogout = async () => {
    await logout();
    toast.success("You're logged out.");
    navigate("/");
    close();
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors duration-150 ${
      isActive
        ? "text-brand bg-brand-light font-bold"
        : "text-muted hover:text-ink hover:bg-surface-subtle"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-all duration-200 ${
        scrolled
          ? "border-slate-200/90 shadow-sm"
          : "border-slate-100/80"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 font-bold text-ink"
        >
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand text-white shadow-sm shadow-brand/25 transition group-hover:shadow-md group-hover:shadow-brand/30">
            <Wrench size={16} />
          </span>
          <span className="text-base tracking-tight">
            ServiceHub
            <span className="ml-1 inline-block h-1.5 w-1.5 translate-y-[-2px] rounded-full bg-accent" />
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/services" className={navLinkClass}>Services</NavLink>
          <NavLink to="/my-bookings" className={navLinkClass}>My Bookings</NavLink>
          {user?.role === "provider" && (
            <NavLink to="/profile" className={navLinkClass}>Provider Profile</NavLink>
          )}
          {user?.role === "admin" && (
            <NavLink to="/admin" className={navLinkClass}>Admin</NavLink>
          )}
        </nav>

        {/* Desktop auth */}
        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-1.5 text-sm font-semibold text-ink shadow-subtle transition hover:border-brand/30 hover:text-brand"
              >
                <span className="grid h-6 w-6 place-items-center rounded-lg bg-brand-light text-xs font-bold text-brand">
                  {user.name[0].toUpperCase()}
                </span>
                {user.name.split(" ")[0]}
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-xl border border-border px-3 py-1.5 text-xs font-bold text-muted transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg px-3 py-1.5 text-sm font-semibold text-muted transition hover:text-ink"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-sm font-bold text-white shadow-sm shadow-brand/20 transition hover:bg-brand-hover hover:-translate-y-0.5 hover:shadow-md hover:shadow-brand/25"
              >
                Get started <ArrowRight size={14} />
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="grid h-9 w-9 place-items-center rounded-xl border border-border text-muted transition hover:text-ink md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-out md:hidden ${
          open ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="border-t border-border bg-white px-4 py-4">
          <nav className="flex flex-col gap-1">
            {[
              ["Home", "/"],
              ["Services", "/services"],
              ["My Bookings", "/my-bookings"],
              ...(user?.role === "provider" ? [["Provider Profile", "/profile"]] : []),
              ...(user?.role === "admin" ? [["Admin Dashboard", "/admin"]] : []),
            ].map(([label, to]) => (
              <NavLink
                key={to}
                to={to}
                onClick={close}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    isActive ? "bg-brand-light text-brand font-bold" : "text-ink hover:bg-surface-subtle"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
            {user ? (
              <>
                <div className="flex items-center gap-2.5 rounded-xl bg-surface-subtle px-3 py-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-sm font-bold text-white">
                    {user.name[0].toUpperCase()}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink">{user.name}</p>
                    <p className="text-xs text-muted">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn-secondary w-full !text-red-600 !border-red-200 hover:!bg-red-50"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={close} className="btn-secondary w-full">
                  Log in
                </Link>
                <Link to="/signup" onClick={close} className="btn-primary w-full justify-center">
                  Get started <ArrowRight size={15} />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
