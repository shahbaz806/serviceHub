/**
 * Three-point studio lighting rig for Concept 2 ("Modern Minimal Studio").
 * Provides a warm key light with soft shadow mapping, cool sage fill, and glowing rim backlight.
 */
export default function StudioLighting({ intensity = 1.0 }) {
  return (
    <>
      {/* Soft Ambient Fill */}
      <ambientLight intensity={0.65 * intensity} color="#fcfaf5" />

      {/* Main Warm Key Light with Performance-conscious Soft Shadows */}
      <directionalLight
        position={[4.5, 7.5, 5]}
        intensity={1.1 * intensity}
        color="#fff5e4"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={22}
        shadow-camera-left={-3.8}
        shadow-camera-right={3.8}
        shadow-camera-top={3.8}
        shadow-camera-bottom={-3.8}
        shadow-bias={-0.0004}
      />

      {/* Cool Sage Fill Light */}
      <directionalLight
        position={[-4.5, 3.5, 2.5]}
        intensity={0.35 * intensity}
        color="#c2e6d2"
      />

      {/* Studio Rim / Backlight for Halo Definition */}
      <directionalLight
        position={[0, 4, -4.5]}
        intensity={0.5 * intensity}
        color="#e3f6ec"
      />
    </>
  );
}
