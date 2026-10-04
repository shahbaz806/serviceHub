import { useEffect, useState } from "react";

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}
1
function computeEnabled() {
  if (typeof window === "undefined") return false;
  const desktop = window.matchMedia("(min-width: 1024px)").matches;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return desktop && !reduce && hasWebGL();
}

export default function useHome3DEnabled() {
  const [enabled, setEnabled] = useState(computeEnabled);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(computeEnabled());
    desktop.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    sync();
    return () => {
      desktop.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);

  return enabled;
}
