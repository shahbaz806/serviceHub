import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useHomeScrollTimeline({
  pinRef,
  overlays,
  house,
  wrench,
  clock,
  check,
  ground,
  camera,
  scene,
  invalidate,
}) {
  useEffect(() => {
    let ctx;
    let killed = false;
    let rafId;

    function init() {
      if (killed) return;

      const pin = pinRef?.current;
      const houseObj = house?.current;
      const wrenchObj = wrench?.current;
      const clockObj = clock?.current;
      const checkObj = check?.current;
      const groundObj = ground?.current;
      const heroEl = overlays?.hero?.current;
      const howEl = overlays?.how?.current;
      const steps = (overlays?.steps || [])
        .map((ref) => ref?.current)
        .filter(Boolean);

      // Wait for DOM refs & 3D objects
      if (
        !pin ||
        !houseObj ||
        !wrenchObj ||
        !clockObj ||
        !checkObj ||
        !camera ||
        !heroEl ||
        !howEl ||
        steps.length < 3
      ) {
        rafId = requestAnimationFrame(init);
        return;
      }

      ctx = gsap.context(() => {
        const look = { x: 0.45, y: 1.0, z: 0 };
        const bg = { t: 0 };
        // Pastel lavender / pale blue studio palette (matching reference)
        const pastel = { r: 237 / 255, g: 233 / 255, b: 247 / 255 }; // #EDE9F7
        const ink = { r: 19 / 255, g: 35 / 255, b: 29 / 255 }; // #13231D

        // Initial 3/4 isometric perspective matching Image 2
        camera.position.set(4.8, 2.7, 6.2);
        camera.lookAt(look.x, look.y, look.z);

        gsap.set(wrenchObj.scale, { x: 0, y: 0, z: 0 });
        gsap.set(clockObj.scale, { x: 0, y: 0, z: 0 });
        gsap.set(checkObj.scale, { x: 0, y: 0, z: 0 });
        gsap.set(heroEl, { autoAlpha: 1 });
        gsap.set(howEl, { autoAlpha: 0 });
        steps.forEach((el, i) => gsap.set(el, { autoAlpha: i === 0 ? 1 : 0 }));

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            id: "home-3d-scroll",
            trigger: pin,
            start: "top 4rem",
            end: "+=320%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: () => invalidate(),
          },
        });

        // Phase 1: Hero slight tilt and camera zoom
        tl.to(houseObj.rotation, { y: Math.PI * 0.14, duration: 0.18 }, 0);
        tl.to(camera.position, { x: 4.4, y: 2.5, z: 5.9, duration: 0.18 }, 0);

        // Transition from Hero to How It Works walkthrough
        tl.to(heroEl, { autoAlpha: 0, duration: 0.1 }, 0.2);
        tl.to(howEl, { autoAlpha: 1, duration: 0.1 }, 0.22);
        tl.to(bg, { t: 1, duration: 0.14 }, 0.2);

        // Step 1: Discover & Tool Mark
        tl.to(
          camera.position,
          { x: 3.2, y: 2.1, z: 5.2, duration: 0.22 },
          0.22
        );
        tl.to(look, { x: 1.1, y: 1.2, z: 0.2, duration: 0.22 }, 0.22);
        tl.to(houseObj.rotation, { y: Math.PI * 0.32, duration: 0.22 }, 0.22);
        tl.to(wrenchObj.scale, { x: 1, y: 1, z: 1, duration: 0.16 }, 0.26);
        tl.to(wrenchObj.rotation, { z: -0.45, y: 0.35, duration: 0.28 }, 0.26);

        // Step 2: Schedule & Clock Mark
        if (steps[1]) {
          tl.to(steps[0], { autoAlpha: 0, duration: 0.08 }, 0.46);
          tl.to(steps[1], { autoAlpha: 1, duration: 0.08 }, 0.48);
        }
        tl.to(
          camera.position,
          { x: 2.4, y: 2.9, z: 5.4, duration: 0.22 },
          0.48
        );
        tl.to(look, { x: 0.15, y: 1.6, z: 0.35, duration: 0.22 }, 0.48);
        tl.to(clockObj.scale, { x: 1, y: 1, z: 1, duration: 0.14 }, 0.52);
        tl.to(clockObj.rotation, { y: Math.PI * 0.4, duration: 0.24 }, 0.52);
        tl.to(wrenchObj.scale, { x: 0.15, y: 0.15, z: 0.15, duration: 0.12 }, 0.5);

        // Step 3: Complete & Check Mark
        if (steps[2]) {
          tl.to(steps[1], { autoAlpha: 0, duration: 0.08 }, 0.7);
          tl.to(steps[2], { autoAlpha: 1, duration: 0.08 }, 0.72);
        }
        tl.to(
          camera.position,
          { x: 4.0, y: 2.2, z: 4.6, duration: 0.24 },
          0.72
        );
        tl.to(look, { x: 0.5, y: 1.1, z: 0, duration: 0.24 }, 0.72);
        tl.to(houseObj.rotation, { y: Math.PI * 0.1, duration: 0.24 }, 0.72);
        tl.to(checkObj.scale, { x: 1, y: 1, z: 1, duration: 0.16 }, 0.76);
        tl.to(clockObj.scale, { x: 0.12, y: 0.12, z: 0.12, duration: 0.12 }, 0.74);

        if (groundObj?.material?.color) {
          tl.to(
            groundObj.material.color,
            { r: 0.12, g: 0.28, b: 0.22, duration: 0.22 },
            0.7
          );
        }

        tl.eventCallback("onUpdate", () => {
          camera.lookAt(look.x, look.y, look.z);
          if (scene?.background) {
            scene.background.setRGB(
              pastel.r + (ink.r - pastel.r) * bg.t,
              pastel.g + (ink.g - pastel.g) * bg.t,
              pastel.b + (ink.b - pastel.b) * bg.t
            );
          }
          if (pin) {
            if (bg.t > 0.45) {
              pin.style.background = "#13231d";
            } else {
              pin.style.background =
                "radial-gradient(circle at 72% 40%, #EDE6FA 0%, #DCE8F7 38%, #EAE4F6 70%, #F5F2F9 100%)";
            }
          }
          invalidate();
        });
      }, pin);

      ScrollTrigger.refresh();
    }

    rafId = requestAnimationFrame(init);

    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize, { passive: true });
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => {
      killed = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      if (ctx) ctx.revert();
      const existing = ScrollTrigger.getById("home-3d-scroll");
      if (existing) existing.kill();
    };
  }, [
    pinRef,
    overlays,
    house,
    wrench,
    clock,
    check,
    ground,
    camera,
    scene,
    invalidate,
  ]);
}
