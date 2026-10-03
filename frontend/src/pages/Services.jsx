import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, Zap, Thermometer, CircuitBoard, Droplets, Sparkles, Wrench } from "lucide-react";
import api from "../services/api";
import ServiceCard from "../components/ServiceCard";
import Loader from "../components/Loader";
import ScrollReveal from "../components/ui/ScrollReveal";

const CATEGORIES = [
  { label: "All", icon: Sparkles },
  { label: "AC Repair", icon: Thermometer },
  { label: "Electrician", icon: Zap },
  { label: "Plumber", icon: Droplets },
  { label: "Cleaning", icon: Sparkles },
  { label: "Appliance Repair", icon: Wrench },
];

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const go = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/services", {
          params: { search, category: category === "All" ? "" : category },
        });
        setServices(data.services);
        setError("");
      } catch (e) {
        setError(e.response?.data?.message || "Could not load services.");
      } finally {
        setLoading(false);
      }
    };
    const t = setTimeout(go, 250);
    return () => clearTimeout(t);
  }, [search, category]);

  return (
    <div className="min-h-screen bg-offwhite">

      {/* ── Hero: Service Discovery Studio ─────────────────────────── */}
      <div className="relative overflow-hidden bg-sage pt-12 pb-0">
        {/* Ambient studio depth blobs */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-emerald-400/18 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-emerald-300/12 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-35" />

        {/* Concept 2 halo arc — decorative */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[8%] top-[10%] hidden lg:block"
          style={{ width: "280px", height: "280px" }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: "1.5px solid rgba(163,220,192,0.35)",
              background:
                "radial-gradient(ellipse at center, rgba(234,243,237,0.6) 0%, transparent 75%)",
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-brand/25"
            style={{ fontSize: "56px" }}
          >
            ✦
          </div>
        </div>

        <div className="container-page relative z-10">
          <p className="section-overline">Find your fix</p>
          <h1 className="mt-2 display-xl max-w-2xl">
            Services for every home.
          </h1>
          <p className="mt-4 max-w-lg body-lg">
            Browse dependable help for the things that matter at home. All providers verified, priced transparently.
          </p>
        </div>

        {/* ── Sticky Search + Filter Card ── */}
        <div className="container-page relative z-10 mt-8 pb-0">
          <div className="rounded-t-2xl border border-slate-200/80 border-b-0 bg-white/95 px-5 py-4 shadow-soft backdrop-blur-md">
            {/* Search */}
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-ink outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20 placeholder:text-slate-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search repairs, cleaning, electrical…"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1">
              <SlidersHorizontal size={15} className="shrink-0 text-brand" />
              {CATEGORIES.map(({ label, icon: Icon }) => {
                const isActive = category === label;
                return (
                  <button
                    key={label}
                    onClick={() => setCategory(label)}
                    className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl border px-3.5 py-2 text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? "border-brand bg-brand text-white shadow-sm shadow-brand/20"
                        : "border-slate-200 bg-white text-slate-600 hover:border-brand/30 hover:bg-sage/50 hover:text-brand"
                    }`}
                  >
                    <Icon size={12} />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Results Grid ─────────────────────────────────────────────── */}
      <main className="container-page py-8 sm:py-12">
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="skeleton h-96 rounded-2xl" />
            ))}
          </div>
        ) : error ? (
          <div className="card py-20 text-center border border-rose-100">
            <p className="text-lg font-bold text-rose-600">{error}</p>
          </div>
        ) : services.length ? (
          <>
            <p className="mb-5 text-xs font-semibold text-slate-400">
              {services.length} service{services.length !== 1 ? "s" : ""} found
              {category !== "All" && ` in ${category}`}
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => (
                <ScrollReveal key={s._id} delay={Math.min(i * 0.07, 0.4)}>
                  <ServiceCard service={s} />
                </ScrollReveal>
              ))}
            </div>
          </>
        ) : (
          <div className="card py-20 text-center border border-slate-200/80">
            <Search size={38} className="mx-auto text-slate-300" />
            <h2 className="mt-4 text-2xl font-bold text-ink">No services found</h2>
            <p className="mt-2 text-slate-500">
              Try adjusting your search or selecting a different category.
            </p>
            <button
              onClick={() => { setSearch(""); setCategory("All"); }}
              className="btn-primary mt-6"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
