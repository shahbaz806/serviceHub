import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Wraps children in a GSAP scroll-triggered reveal.
 * delay: stagger delay in seconds (default 0)
 * direction: "up" | "left" | "right" (default "up")
 * distance: px to travel (default 36)
 */
export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  distance = 36,
  duration = 0.72,
  className = "",
  as: Tag = "div",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !ref.current) return;

    const xFrom = direction === "left" ? -distance : direction === "right" ? distance : 0;
    const yFrom = direction === "up" ? distance : 0;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: yFrom,
        x: xFrom,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [delay, direction, distance, duration]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
