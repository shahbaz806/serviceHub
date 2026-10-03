import { Link } from "react-router-dom";
import { Clock3, Star } from "lucide-react";

export default function ServiceCard({ service }) {
  const providerName =
    service.providerId?.name || service.providerName || "ServiceHub Pro";

  return (
    <article className="group card overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* ── Image Banner ── */}
      <Link to={`/services/${service._id}`} className="block">
        <div className="relative h-48 w-full overflow-hidden bg-sage">
          <img
            src={
              service.image ||
              "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80"
            }
            alt=""
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ink shadow-xs backdrop-blur">
            {service.category}
          </span>
        </div>
      </Link>

      {/* ── Card Content ── */}
      <div className="p-5">
        <Link to={`/services/${service._id}`}>
          <h3
            className="text-xl font-semibold leading-tight hover:text-brand"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {service.title}
          </h3>
        </Link>

        <p className="mt-2 truncate text-sm text-slate-500">
          By {providerName}
        </p>

        {/* Rating and Price */}
        <div className="mt-4 flex items-center justify-between">
          <span className="flex items-center gap-1 text-sm font-semibold text-slate-500">
            <Star size={15} className="fill-accent text-accent" />
            {service.rating?.toFixed(1) || "4.8"}{" "}
            <span className="font-normal text-slate-400">
              ({service.reviewCount || 0})
            </span>
          </span>
          <span className="text-lg font-bold text-brand">
            ${service.price}
          </span>
        </div>

        {/* Duration and Action Buttons */}
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-4">
          <span className="flex items-center gap-1 text-xs font-semibold text-slate-500">
            <Clock3 size={14} />
            {service.duration || 60} min
          </span>
          <div className="flex items-center gap-2">
            <Link
              to={`/services/${service._id}`}
              className="btn-secondary !px-3.5 !py-2 text-sm font-semibold"
            >
              Details
            </Link>
            <Link
              to={`/book/${service._id}`}
              className="btn-primary !px-3.5 !py-2 text-sm font-bold"
            >
              Book now
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
