const styles = { pending: 'bg-amber-100 text-amber-800', confirmed: 'bg-blue-100 text-blue-800', completed: 'bg-emerald-100 text-emerald-800', cancelled: 'bg-rose-100 text-rose-800' };
export default function StatusBadge({ status }) { return <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${styles[status] || 'bg-slate-100 text-slate-700'}`}>{status}</span>; }
