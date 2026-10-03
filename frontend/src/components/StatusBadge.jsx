const styles = {
  pending: "bg-amber-50 text-amber-700 border-amber-200/60 dot-amber-500",
  confirmed: "bg-sky-50 text-sky-700 border-sky-200/60 dot-sky-500",
  in_progress: "bg-emerald-50 text-emerald-700 border-emerald-200/60 dot-emerald-500",
  completed: "bg-emerald-50 text-emerald-800 border-emerald-300/70 dot-emerald-600",
  cancelled: "bg-rose-50 text-rose-700 border-rose-200/60 dot-rose-500",
};

const dotColors = {
  pending: "bg-amber-500",
  confirmed: "bg-sky-500",
  in_progress: "bg-emerald-500 animate-pulse",
  completed: "bg-emerald-600",
  cancelled: "bg-rose-500",
};

export default function StatusBadge({ status }) {
  const currentStyle = styles[status] || "bg-slate-50 text-slate-700 border-slate-200";
  const dotColor = dotColors[status] || "bg-slate-400";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-bold capitalize shadow-2xs backdrop-blur-sm ${currentStyle}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
      {String(status).replace("_", " ")}
    </span>
  );
}
