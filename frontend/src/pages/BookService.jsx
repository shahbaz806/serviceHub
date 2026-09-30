import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarCheck, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import Loader from '../components/Loader';

const minimumDate = new Date().toISOString().split('T')[0];

export default function BookService() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [form, setForm] = useState({ date: '', time: '', address: '' });
  const [busy, setBusy] = useState(false);

  useEffect(() => { api.get(`/services/${serviceId}`).then(({ data }) => setService(data.service)).catch(() => toast.error('Service is unavailable.')); }, [serviceId]);
  if (!service) return <Loader label="Loading booking details..."/>;

  async function submit(event) {
    event.preventDefault();
    if (!form.date || !form.time || form.address.trim().length < 8) return toast.error('Please enter a date, time, and full service address.');
    setBusy(true);
    try {
      await api.post('/bookings', { serviceId, ...form });
      toast.success('Booking request received!');
      navigate('/my-bookings');
    } catch (error) { toast.error(error.response?.data?.message || 'Could not create booking.'); }
    finally { setBusy(false); }
  }

  return <main className="container-page py-10 sm:py-16">
    <Link to={`/services/${serviceId}`} className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-brand"><ArrowLeft size={17}/> Service details</Link>
    <div className="mx-auto mt-8 grid max-w-5xl gap-7 lg:grid-cols-[1fr_1.25fr]">
      <aside className="card h-fit overflow-hidden">
        <img src={service.image} alt="" className="h-40 w-full object-cover"/>
        <div className="p-6"><p className="text-xs font-bold uppercase tracking-widest text-brand">Booking</p><h1 className="mt-2 text-3xl">{service.title}</h1><p className="mt-4 text-sm text-slate-600">Starting at <strong className="text-brand">${service.price}</strong></p></div>
      </aside>
      <form onSubmit={submit} className="card p-6 sm:p-8">
        <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-sage text-brand"><CalendarCheck size={21}/></span><div><p className="text-sm font-bold text-brand">Schedule your visit</p><h2 className="text-3xl">When works for you?</h2></div></div>
        <div className="mt-7 grid gap-5 sm:grid-cols-2"><div><label className="label">Preferred date</label><input required min={minimumDate} type="date" className="input" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}/></div><div><label className="label">Preferred time</label><input required type="time" className="input" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })}/></div></div>
        <div className="mt-5"><label className="label">Service address</label><div className="relative"><MapPin size={18} className="absolute left-4 top-3.5 text-slate-400"/><textarea required rows="3" className="input resize-none pl-11" placeholder="123 Main Street, Apt 4B, City, State" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })}/></div></div>
        <p className="mt-5 rounded-xl bg-sage p-4 text-sm leading-6 text-slate-600">Your request starts as pending. We’ll confirm it once a local professional is matched.</p>
        <button disabled={busy} className="btn-primary mt-6 w-full">{busy ? 'Sending request...' : 'Confirm booking request'}</button>
      </form>
    </div>
  </main>;
}
