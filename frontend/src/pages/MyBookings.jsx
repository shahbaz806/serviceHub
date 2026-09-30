import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import Loader from '../components/Loader';
import StatusBadge from '../components/StatusBadge';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]); const [loading, setLoading] = useState(true);
  const load = async () => { try { const { data } = await api.get('/bookings/my'); setBookings(data.bookings); } catch (e) { toast.error(e.response?.data?.message || 'Could not load bookings.'); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  async function cancel(id) { if (!window.confirm('Cancel this booking request?')) return; try { await api.patch(`/bookings/${id}/cancel`); toast.success('Booking cancelled.'); load(); } catch (e) { toast.error(e.response?.data?.message || 'Could not cancel booking.'); } }
  if (loading) return <Loader label="Loading your bookings..."/>;
  return <main className="container-page py-12 sm:py-16"><p className="text-sm font-bold uppercase tracking-widest text-brand">Your schedule</p><h1 className="mt-2 text-5xl">My bookings</h1><p className="mt-4 text-slate-600">Keep track of every request, all in one place.</p>{!bookings.length ? <div className="card mt-9 py-16 text-center"><CalendarDays className="mx-auto text-brand" size={35}/><h2 className="mt-4 text-2xl">Nothing booked yet</h2><p className="mt-2 text-slate-500">Find a trusted local pro when you’re ready.</p><Link to="/services" className="btn-primary mt-6">Explore services</Link></div> : <div className="mt-9 space-y-4">{bookings.map(booking => { const service = booking.serviceId; return <article className="card flex flex-col gap-5 p-5 sm:flex-row sm:items-center" key={booking._id}>{service?.image && <img className="h-20 w-full rounded-xl object-cover sm:w-28" src={service.image} alt=""/>}<div className="flex-1"><div className="flex flex-wrap items-center gap-3"><h2 className="font-sans text-lg font-bold">{service?.title || 'Unavailable service'}</h2><StatusBadge status={booking.status}/></div><div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600"><span className="flex items-center gap-1.5"><CalendarDays size={16} className="text-brand"/>{booking.date} at {booking.time}</span><span className="flex items-center gap-1.5"><MapPin size={16} className="text-brand"/>{booking.address}</span></div></div>{!['completed', 'cancelled'].includes(booking.status) && <button onClick={() => cancel(booking._id)} className="btn-secondary !border-rose-200 !text-rose-600 hover:!bg-rose-50"><XCircle size={17}/> Cancel</button>}</article>; })}</div>}</main>;
}
