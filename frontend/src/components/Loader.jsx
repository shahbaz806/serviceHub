export default function Loader({ label = "Loading..." }) {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center gap-3.5 py-12 text-slate-500">
      <div className="relative flex h-8 w-8 items-center justify-center">
        <span className="absolute h-8 w-8 animate-ping rounded-full bg-brand/20" />
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-brand border-t-transparent" />
      </div>
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p>
    </div>
  );
}
