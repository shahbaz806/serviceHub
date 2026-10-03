import { useRef } from "react";
import * as THREE from "three";

/**
 * Architectural illuminated halo arch inspired by Concept 2 ("Modern Minimal Studio").
 * Creates the glowing studio ring backdrop behind the 3D subject.
 */
export default function StudioBackdropHalo({ radius = 3.6, tube = 0.08, color = "#d4ece0", glowColor = "#a3dcc0" }) {
  const haloRef = useRef();

  return (
    <group position={[0, 1.8, -1.8]}>
      {/* Outer subtle architectural arch */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[radius, tube, 24, 64, Math.PI]} />
        <meshStandardMaterial
          color={color}
          roughness={0.25}
          metalness={0.1}
          emissive={glowColor}
          emissiveIntensity={0.45}
        />
      </mesh>

      {/* Inner diffuse backdrop disc / soft sun-disc */}
      <mesh position={[0, 0, -0.05]}>
        <circleGeometry args={[radius - 0.05, 64]} />
        <meshBasicMaterial
          color="#f4faf6"
          transparent
          opacity={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Subtle warm rim light strip */}
      <mesh position={[0, -0.02, 0.02]}>
        <torusGeometry args={[radius - 0.1, 0.03, 16, 64, Math.PI]} />
        <meshBasicMaterial color="#fff4dc" />
      </mesh>
    </group>
  );
}
