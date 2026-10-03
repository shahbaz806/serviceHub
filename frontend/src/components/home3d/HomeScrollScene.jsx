import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import useHomeScrollTimeline from "./useHomeScrollTimeline";
import ArchitecturalGlassBuilding from "../studio/ArchitecturalGlassBuilding";
import {
  PastelStudioLighting,
  PastelStudioPlatform,
  PastelStudioBackdropHalo,
} from "../studio/PastelStudioEnvironment";

// ─── Step 1: Stylized Service Tool Mark (Discovered Service) ───────────────────
function WrenchMark() {
  return (
    <group>
      <mesh rotation={[0, 0, 0.15]} castShadow>
        <cylinderGeometry args={[0.065, 0.065, 1.15, 16]} />
        <meshStandardMaterial color="#f3a54a" metalness={0.4} roughness={0.3} />
      </mesh>
      <mesh position={[0.12, 0.58, 0]} castShadow>
        <torusGeometry args={[0.18, 0.07, 12, 20, Math.PI]} />
        <meshStandardMaterial color="#17734a" metalness={0.35} roughness={0.38} />
      </mesh>
      <mesh position={[0, -0.58, 0]} castShadow>
        <boxGeometry args={[0.26, 0.15, 0.14]} />
        <meshStandardMaterial color="#13231d" roughness={0.5} />
      </mesh>
    </group>
  );
}

// ─── Step 2: Modern Studio Clock Mark (Scheduled Time) ─────────────────────────
function ClockMark() {
  return (
    <group>
      <mesh castShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.09, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.055]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.42, 0.038, 10, 28]} />
        <meshStandardMaterial color="#17734a" roughness={0.4} />
      </mesh>
      <mesh position={[0.08, 0.12, 0.07]} rotation={[0, 0, -0.45]} castShadow>
        <boxGeometry args={[0.045, 0.26, 0.035]} />
        <meshStandardMaterial color="#13231d" />
      </mesh>
      <mesh position={[0.12, -0.02, 0.07]} rotation={[0, 0, 1.1]} castShadow>
        <boxGeometry args={[0.035, 0.18, 0.035]} />
        <meshStandardMaterial color="#f3a54a" />
      </mesh>
    </group>
  );
}

// ─── Step 3: Verified Check Mark (Job Done Right) ──────────────────────────────
function CheckMark() {
  return (
    <group rotation={[0, 0, -0.15]}>
      <mesh position={[-0.18, -0.08, 0]} rotation={[0, 0, 0.7]} castShadow>
        <boxGeometry args={[0.11, 0.4, 0.11]} />
        <meshStandardMaterial color="#a9dcbf" roughness={0.4} />
      </mesh>
      <mesh position={[0.18, 0.08, 0]} rotation={[0, 0, -0.55]} castShadow>
        <boxGeometry args={[0.11, 0.7, 0.11]} />
        <meshStandardMaterial color="#17734a" roughness={0.35} />
      </mesh>
    </group>
  );
}

// ─── Main Scene Rig ──────────────────────────────────────────────────────────
function SceneRig({ pinRef, overlays }) {
  const buildingRef = useRef();
  const wrench = useRef();
  const clock = useRef();
  const check = useRef();
  const ground = useRef();

  const parallaxRig = useRef();
  const buildingFloat = useRef();
  const wrenchFloat = useRef();
  const clockFloat = useRef();
  const checkFloat = useRef();

  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  const { camera, scene, invalidate } = useThree();

  useEffect(() => {
    const handlePointerMove = (e) => {
      mouse.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useFrame((state) => {
    // Subtle mouse parallax
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.045;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.045;

    if (parallaxRig.current) {
      parallaxRig.current.rotation.y = mouse.current.x * 0.06;
      parallaxRig.current.rotation.x = -mouse.current.y * 0.035;
    }

    // Gentle breathing float
    const t = state.clock.getElapsedTime();
    if (buildingFloat.current) {
      buildingFloat.current.position.y = Math.sin(t * 1.3) * 0.03;
    }
    if (wrenchFloat.current) wrenchFloat.current.position.y = Math.sin(t * 1.6 + 0.4) * 0.035;
    if (clockFloat.current) clockFloat.current.position.y = Math.sin(t * 1.4 + 1.1) * 0.035;
    if (checkFloat.current) checkFloat.current.position.y = Math.sin(t * 1.5 + 2.0) * 0.035;
  });

  const overlayBag = useMemo(
    () => overlays,
    [overlays.hero, overlays.how, overlays.steps]
  );

  useHomeScrollTimeline({
    pinRef,
    overlays: overlayBag,
    house: buildingRef,
    wrench,
    clock,
    check,
    ground,
    camera,
    scene,
    invalidate,
  });

  return (
    <group ref={parallaxRig}>
      <PastelStudioLighting />
      <PastelStudioBackdropHalo />

      {/* Main Glass Architectural Building & Studio Podium */}
      <group ref={buildingRef} position={[0.55, -0.92, 0]}>
        <PastelStudioPlatform groundRef={ground} />
        <group ref={buildingFloat}>
          <ArchitecturalGlassBuilding />
        </group>
      </group>

      {/* Service story markers */}
      <group ref={wrench} position={[1.9, 1.4, 1.2]}>
        <group ref={wrenchFloat}>
          <WrenchMark />
        </group>
      </group>
      <group ref={clock} position={[-0.2, 2.4, 1.4]}>
        <group ref={clockFloat}>
          <ClockMark />
        </group>
      </group>
      <group ref={check} position={[0.55, 2.6, 1.2]}>
        <group ref={checkFloat}>
          <CheckMark />
        </group>
      </group>
    </group>
  );
}

// ─── Canvas Export ───────────────────────────────────────────────────────────
export default function HomeScrollScene({ pinRef, overlays }) {
  return (
    <Canvas
      shadows
      className="pointer-events-none"
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [4.8, 2.7, 6.2], fov: 38, near: 0.1, far: 50 }}
      onCreated={({ scene, gl }) => {
        // Transparent clear so the CSS radial pastel lavender/sky gradient shines through
        scene.background = null;
        gl.domElement.style.pointerEvents = "none";
      }}
    >
      <SceneRig pinRef={pinRef} overlays={overlays} />
    </Canvas>
  );
}
