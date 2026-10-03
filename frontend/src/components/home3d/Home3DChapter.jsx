import { useCallback, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Search,
  ShieldCheck,
  Star,
  Wrench,
  PlayCircle,
} from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HomeScrollScene from "./HomeScrollScene";

const HOW_STEPS = [
  {
    icon: Search,
    stepNum: "01",
    tag: "Find",
    title: "Find your service",
    desc: "Browse certified local services with upfront starting prices. Compare transparent ratings and reviews from your neighborhood.",
    timeProgress: 0.25,
  },
  {
    icon: Clock3,
    stepNum: "02",
    tag: "Schedule",
    title: "Pick a convenient time",
    desc: "Select a real-time date and time slot that fits your schedule. Confirm your booking in under two minutes with instant confirmation.",
    timeProgress: 0.52,
  },
  {
    icon: CheckCircle2,
    stepNum: "03",
    tag: "Done",
    title: "Get it done right",
    desc: "A background-checked, insured professional arrives fully equipped. Relax while the job is completed to your complete satisfaction.",
    timeProgress: 0.78,
  },
];

export default function Home3DChapter() {
  const pinRef = useRef(null);
  const heroRef = useRef(null);
  const howRef = useRef(null);
  const step1 = useRef(null);
  const step2 = useRef(null);
  const step3 = useRef(null);

  const overlays = useMemo(
    () => ({
      hero: heroRef,
      how: howRef,
      steps: [step1, step2, step3],
    }),
    []
  );

  const handleScrollToProgress = useCallback((progressRatio) => {
    const st = ScrollTrigger.getById("home-3d-scroll");
    if (st) {
      const targetScroll = st.start + (st.end - st.start) * progressRatio;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    } else {
      const el = howRef.current || document.getElementById("how");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleScrollToHow = useCallback(
    (e) => {
      if (e?.preventDefault) e.preventDefault();
      handleScrollToProgress(0.26);
    },
    [handleScrollToProgress]
  );

  useEffect(() => {
    if (window.location.hash === "#how") {
      const timer = setTimeout(() => {
        handleScrollToHow();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [handleScrollToHow]);

  return (
    <section id="how" className="home-3d-chapter relative">
      <div
        ref={pinRef}
        className="home-3d-pin transition-colors duration-700"
        style={{
          background:
            "radial-gradient(circle at 72% 40%, #EDE6FA 0%, #DCE8F7 38%, #EAE4F6 70%, #F5F2F9 100%)",
        }}
      >
        {/* Luminous Soft Studio Backdrop Glows (matching Image 2) */}
        <div className="pointer-events-none absolute right-[12%] top-[18%] h-[32rem] w-[32rem] rounded-full bg-violet-200/40 blur-[110px]" />
        <div className="pointer-events-none absolute right-[28%] top-[30%] h-[24rem] w-[24rem] rounded-full bg-sky-200/45 blur-[90px]" />
        <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-indigo-100/40 blur-3xl" />

        {/* 3D Scene Layer */}
        <div className="home-3d-canvas pointer-events-none" aria-hidden="true">
          <HomeScrollScene pinRef={pinRef} overlays={overlays} />
        </div>

        {/* Pinned Content Container */}
        <div className="container-page relative z-10 grid h-full items-center gap-12 py-10 lg:grid-cols-12">
          {/* Left Column: Overlaid Story Panels */}
          <div className="relative min-h-[30rem] lg:col-span-7">
            {/* HERO PANEL */}
            <div ref={heroRef} className="home-3d-panel flex flex-col justify-center">
              {/* Eyebrow badge */}
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-3.5 py-1.5 text-xs font-bold tracking-wide text-brand shadow-xs backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                  </span>
                  Trusted local services, simplified
                </span>
              </div>

              {/* Headline matching Image 2 */}
              <h1 className="mt-5 max-w-xl text-5xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-7xl">
                Find trusted{" "}
                <span className="relative inline-block text-brand">
                  professionals.
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full text-brand/25"
                    height="8"
                    viewBox="0 0 200 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5.5C50 1.5 150 1.5 199 5.5"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <br />
                Get the job <em className="not-italic text-slate-800">done.</em>
              </h1>

              {/* Subtitle */}
              <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
                Connect with verified local experts for repairs, electrical, plumbing, and deep home cleaning. Transparent pricing, direct scheduling, and dependable results.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  className="btn-primary !px-7 !py-3.5 text-base shadow-md shadow-brand/25"
                  to="/services"
                >
                  Find a Service <ArrowRight size={18} />
                </Link>
                <button
                  type="button"
                  className="rounded-xl border border-white/80 bg-white/70 px-5 py-3.5 text-base font-bold text-slate-700 shadow-xs backdrop-blur-md transition-all hover:bg-white hover:text-brand hover:border-brand/30"
                  onClick={handleScrollToHow}
                >
                  <PlayCircle size={18} className="inline mr-2 text-brand" />
                  How It Works
                </button>
              </div>

              {/* Trust Row */}
              <div className="mt-9 flex flex-wrap items-center gap-4 sm:gap-6 border-t border-slate-200/50 pt-6">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/80 text-brand shadow-xs">
                    <CheckCircle2 size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink">2,000+</p>
                    <p className="text-[11px] text-slate-500">Jobs completed</p>
                  </div>
                </div>

                <div className="h-6 w-px bg-slate-300/50" />

                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/80 text-brand shadow-xs">
                    <ShieldCheck size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink">500+</p>
                    <p className="text-[11px] text-slate-500">Verified local pros</p>
                  </div>
                </div>

                <div className="h-6 w-px bg-slate-300/50" />

                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 shadow-xs">
                    <Star size={16} className="fill-amber-400 text-amber-400" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink">4.9 / 5</p>
                    <p className="text-[11px] text-slate-500">Customer rating</p>
                  </div>
                </div>
              </div>
            </div>

            {/* HOW IT WORKS STORY PANEL */}
            <div
              ref={howRef}
              className="home-3d-panel home-3d-panel--how flex flex-col justify-center text-white"
            >
              <div className="inline-flex items-center gap-2">
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold tracking-widest text-[#a9dcbf]">
                  HOW SERVICEHUB WORKS
                </span>
              </div>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white">
                From search to sorted in three simple steps.
              </h2>

              {/* Step Navigation Pills */}
              <div className="mt-6 flex flex-wrap gap-2">
                {HOW_STEPS.map((s) => (
                  <button
                    key={s.stepNum}
                    type="button"
                    onClick={() => handleScrollToProgress(s.timeProgress)}
                    className="group inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-bold text-slate-300 backdrop-blur-md transition hover:border-[#a9dcbf]/50 hover:bg-white/15 hover:text-white"
                  >
                    <span className="text-[#a9dcbf]">{s.stepNum}</span>
                    <span>{s.tag}</span>
                  </button>
                ))}
              </div>

              {/* Stacked Step Cards Container */}
              <div className="relative mt-8 min-h-[14rem]">
                {HOW_STEPS.map(({ icon: Icon, stepNum, title, desc }, i) => (
                  <div
                    key={title}
                    ref={[step1, step2, step3][i]}
                    className="home-3d-step rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl shadow-2xl"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/20 text-[#a9dcbf]">
                          <Icon size={22} />
                        </span>
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-[#a9dcbf]">
                            Step {stepNum}
                          </span>
                          <h3 className="text-2xl font-bold text-white leading-tight">
                            {title}
                          </h3>
                        </div>
                      </div>
                      <span className="text-3xl font-extrabold text-white/20">
                        {stepNum}
                      </span>
                    </div>
                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-300 sm:text-base">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Floating Glassmorphic Contextual Cards flanking 3D villa */}
          <div className="relative hidden h-full items-center justify-center lg:col-span-5 lg:flex">
            {/* Card 1: Same-Day Plumbing (Top Right, matching Image 2) */}
            <div className="absolute -top-3 right-0 z-20 animate-float-slow">
              <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/85 p-3.5 shadow-lg shadow-indigo-100/50 backdrop-blur-md">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-brand">
                  <Wrench size={19} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-ink">Same-Day Plumbing</p>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-brand">
                      Available
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    From $59 • Riverside Plumbing
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: AC Repair Tune-up (Bottom Right, matching Image 2) */}
            <div className="absolute bottom-8 -right-2 z-20 animate-float-delayed">
              <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/85 p-3.5 shadow-lg shadow-indigo-100/50 backdrop-blur-md">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-600">
                  <Star size={17} className="fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-ink">AC Repair & Tune-Up</p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <span className="font-bold text-amber-700">4.9 ★</span>
                    <span>(124 reviews) • Marcus Cooling</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Verified Badge Pill (Bottom Left) */}
            <div className="absolute -bottom-3 left-0 z-20 animate-float-slow">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/85 px-3.5 py-1.5 shadow-md backdrop-blur-md">
                <ShieldCheck size={15} className="text-brand" />
                <span className="text-xs font-bold text-slate-700">
                  100% Background-Checked Pros
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
