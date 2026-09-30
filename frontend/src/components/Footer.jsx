import { Link } from 'react-router-dom';
import { Wrench } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-ink py-12 text-white">
      <div className="container-page grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand"><Wrench size={19}/></span>
            ServiceHub
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">The easy, dependable way to book help for your home.</p>
        </div>
        <div>
          <p className="font-bold">Explore</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-slate-300"><Link to="/services">All services</Link><Link to="/my-bookings">My bookings</Link></div>
        </div>
        <div>
          <p className="font-bold">Get started</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-slate-300"><Link to="/signup">Create account</Link><Link to="/login">Log in</Link></div>
        </div>
      </div>
      <div className="container-page mt-10 border-t border-white/10 pt-6 text-xs text-slate-400">© {new Date().getFullYear()} ServiceHub. Built for better home care.</div>
    </footer>
  );
}
