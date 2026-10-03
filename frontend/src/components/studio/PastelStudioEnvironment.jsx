import { useMemo } from "react";
import * as THREE from "three";

/**
 * PastelStudioEnvironment
 * Soft lavender, pale blue, lilac studio environment matching Image 2 reference.
 * Provides:
 * - Studio three-point lighting tuned for glass transparency and soft contact shadows
 * - Wide beveled circular studio podium in pastel blue/lavender
 * - Contact shadow disc under the glass architecture
 * - Luminous atmospheric studio backdrop halo
 */
export function PastelStudioLighting() {
  return (
    <>
      {/* Bright, clean, airy ambient studio fill */}
      <ambientLight intensity={0.88} color="#f7f5fd" />

      {/* Main warm soft key light */}
      <directionalLight
        position={[6, 9, 5]}
        intensity={1.3}
        color="#fffaf0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={24}
        shadow-camera-left={-4.8}
        shadow-camera-right={4.8}
        shadow-camera-top={4.8}
        shadow-camera-bottom={-4.8}
        shadow-bias={-0.0004}
      />

      {/* Soft pastel lilac/lavender fill light from left */}
      <directionalLight position={[-6, 4, -1]} intensity={0.55} color="#e5ddfa" />

      {/* Cool sky blue rim / backlight highlighting glass edges */}
      <directionalLight position={[1, 5, -6]} intensity={0.65} color="#d4e8fc" />
    </>
  );
}

export function PastelStudioPlatform({ groundRef }) {
  const podiumMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#dce8f5",
        roughness: 0.75,
        metalness: 0.05,
      }),
    []
  );

  const bevelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#e8eff8",
        roughness: 0.5,
        metalness: 0.1,
      }),
    []
  );

  return (
    <group position={[0.55, -0.92, 0]}>
      {/* Main Studio Podium (Receives soft shadows) */}
      <mesh ref={groundRef} position={[0, 0.11, 0]} receiveShadow>
        <cylinderGeometry args={[4.3, 4.45, 0.22, 64]} />
        <primitive object={podiumMaterial} attach="material" />
      </mesh>

      {/* Rounded Bevel Edge on the Podium Rim */}
      <mesh position={[0, 0.21, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4.28, 0.035, 16, 64]} />
        <primitive object={bevelMaterial} attach="material" />
      </mesh>

      {/* Contact Shadow & Under-Podium Ambient Occlusion Ring */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.1, 5.2, 64]} />
        <meshBasicMaterial color="#cfdaf0" transparent opacity={0.6} />
      </mesh>

      {/* Inner building contact shadow plane */}
      <mesh position={[0, 0.225, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.5, 32]} />
        <meshBasicMaterial color="#bacde5" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export function PastelStudioBackdropHalo() {
  return (
    <group position={[0.55, 1.9, -2.4]}>
      {/* Outer luminous halo ring */}
      <mesh>
        <ringGeometry args={[3.8, 4.9, 64]} />
        <meshBasicMaterial
          color="#e6ddfa"
          transparent
          opacity={0.38}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Soft inner glow disc */}
      <mesh position={[0, 0, -0.05]}>
        <circleGeometry args={[4.2, 64]} />
        <meshBasicMaterial
          color="#f3effc"
          transparent
          opacity={0.45}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
