import { forwardRef } from "react";

/**
 * Clean dual-tiered circular studio podium from Concept 2 ("Modern Minimal Studio").
 * Features an upper platform receiving soft contact shadows and a lower platform with warm under-glow.
 */
const StudioPlatform = forwardRef(function StudioPlatform(
  {
    upperRadius = 3.2,
    lowerRadius = 3.6,
    height = 0.16,
    color = "#e8f0eb",
    underglowColor = "#f8ebd4",
  },
  ref
) {
  return (
    <group ref={ref} position={[0, -0.02, 0]}>
      {/* Upper Main Platform */}
      <mesh position={[0, height / 2, 0]} receiveShadow>
        <cylinderGeometry args={[upperRadius, upperRadius, height, 64]} />
        <meshStandardMaterial
          color={color}
          roughness={0.85}
          metalness={0.02}
        />
      </mesh>

      {/* Recessed Platform Under-glow Ring */}
      <mesh position={[0, 0.01, 0]}>
        <cylinderGeometry args={[lowerRadius, lowerRadius, 0.04, 64]} />
        <meshStandardMaterial
          color={underglowColor}
          roughness={0.5}
          emissive="#f5dfb8"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Subtle Base Floor Shadow Disc */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[upperRadius, lowerRadius + 0.4, 64]} />
        <meshBasicMaterial color="#dbe5de" transparent opacity={0.6} />
      </mesh>
    </group>
  );
});

export default StudioPlatform;
