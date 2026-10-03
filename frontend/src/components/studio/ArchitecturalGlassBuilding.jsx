import { useMemo } from "react";
import * as THREE from "three";

/**
 * ArchitecturalGlassBuilding
 * High-end modern architectural transparent glass villa inspired by the reference design.
 * Features:
 * - Multi-level cantilevered pavilions with floor-to-ceiling glass curtain walls
 * - Reflective ground terrace with cyan pool basin & glass railings
 * - Sleek structural columns & interior warm ambient light glows
 * - Cantilevered upper master suite with corner glass
 * - Flat modern roof deck equipped with a photovoltaic solar panel array
 * - Grounded on a beveled pastel blue/lavender studio podium
 */
export default function ArchitecturalGlassBuilding() {
  // Reusable materials
  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#dcebf7"),
        transparent: true,
        opacity: 0.38,
        roughness: 0.08,
        metalness: 0.15,
        transmission: 0.85,
        thickness: 0.45,
        ior: 1.5,
        reflectivity: 0.5,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    []
  );

  const whiteSlabMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#f6f8fb",
        roughness: 0.3,
        metalness: 0.1,
      }),
    []
  );

  const columnMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#e2e8f0",
        roughness: 0.25,
        metalness: 0.4,
      }),
    []
  );

  const poolWaterMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#46a8dc",
        roughness: 0.08,
        metalness: 0.2,
        transparent: true,
        opacity: 0.85,
      }),
    []
  );

  const warmInteriorMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ffe5a3",
        emissive: "#f3a54a",
        emissiveIntensity: 0.55,
        roughness: 0.5,
      }),
    []
  );

  const woodPartitionMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c2ab91",
        roughness: 0.6,
      }),
    []
  );

  const solarPanelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#182638",
        roughness: 0.22,
        metalness: 0.65,
      }),
    []
  );

  const solarFrameMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#cad4e0",
        roughness: 0.3,
        metalness: 0.5,
      }),
    []
  );

  return (
    <group position={[0, 0, 0]}>
      {/* ── 1. GROUND FOUNDATION SLAB & TERRACE ───────────────────── */}
      {/* Main Ground Slab */}
      <mesh position={[0, 0.08, 0]} receiveShadow castShadow>
        <boxGeometry args={[4.2, 0.16, 3.4]} />
        <primitive object={whiteSlabMaterial} attach="material" />
      </mesh>

      {/* Reflective Pool Basin & Sunken Deck */}
      <group position={[1.15, 0.1, 0.75]}>
        {/* Pool Water Surface */}
        <mesh position={[0, 0.02, 0]} receiveShadow>
          <boxGeometry args={[1.65, 0.05, 1.45]} />
          <primitive object={poolWaterMaterial} attach="material" />
        </mesh>
        {/* Pool Border / Curb */}
        <mesh position={[0, 0.03, 0.76]} castShadow>
          <boxGeometry args={[1.75, 0.07, 0.07]} />
          <primitive object={whiteSlabMaterial} attach="material" />
        </mesh>
        <mesh position={[0.86, 0.03, 0]} castShadow>
          <boxGeometry args={[0.07, 0.07, 1.55]} />
          <primitive object={whiteSlabMaterial} attach="material" />
        </mesh>

        {/* Transparent Glass Pool Railing */}
        <mesh position={[0, 0.24, 0.76]}>
          <boxGeometry args={[1.65, 0.36, 0.02]} />
          <primitive object={glassMaterial} attach="material" />
        </mesh>
        <mesh position={[0.86, 0.24, 0]}>
          <boxGeometry args={[0.02, 0.36, 1.45]} />
          <primitive object={glassMaterial} attach="material" />
        </mesh>
        {/* Thin metallic top handrail */}
        <mesh position={[0, 0.43, 0.76]}>
          <boxGeometry args={[1.67, 0.025, 0.03]} />
          <primitive object={columnMaterial} attach="material" />
        </mesh>
        <mesh position={[0.86, 0.43, 0]}>
          <boxGeometry args={[0.03, 0.025, 1.47]} />
          <primitive object={columnMaterial} attach="material" />
        </mesh>
      </group>

      {/* ── 2. GROUND FLOOR LIVING PAVILION ───────────────────────── */}
      <group position={[-0.65, 0.78, -0.15]}>
        {/* Front Panoramic Glass Facade */}
        <mesh position={[0, 0, 1.1]}>
          <boxGeometry args={[2.5, 1.25, 0.03]} />
          <primitive object={glassMaterial} attach="material" />
        </mesh>
        {/* Left Glass Facade */}
        <mesh position={[-1.25, 0, 0]}>
          <boxGeometry args={[0.03, 1.25, 2.2]} />
          <primitive object={glassMaterial} attach="material" />
        </mesh>
        {/* Rear Glass Facade */}
        <mesh position={[0, 0, -1.1]}>
          <boxGeometry args={[2.5, 1.25, 0.03]} />
          <primitive object={glassMaterial} attach="material" />
        </mesh>
        {/* Right Glass Divider / Patio Wall */}
        <mesh position={[1.25, 0, 0]}>
          <boxGeometry args={[0.03, 1.25, 2.2]} />
          <primitive object={glassMaterial} attach="material" />
        </mesh>

        {/* Architectural Curtain Wall Mullions (Grid) */}
        {/* Vertical Mullions */}
        {[-0.62, 0, 0.62].map((x) => (
          <mesh position={[x, 0, 1.105]} key={`m-v-${x}`}>
            <boxGeometry args={[0.025, 1.25, 0.02]} />
            <primitive object={columnMaterial} attach="material" />
          </mesh>
        ))}
        {/* Horizontal Mullion */}
        <mesh position={[0, 0.1, 1.105]}>
          <boxGeometry args={[2.5, 0.025, 0.02]} />
          <primitive object={columnMaterial} attach="material" />
        </mesh>

        {/* Interior Warm Ambient Core */}
        <group position={[0.1, -0.1, 0]}>
          {/* Glowing interior warm feature wall */}
          <mesh position={[-0.4, 0, 0]}>
            <boxGeometry args={[0.1, 0.9, 0.95]} />
            <primitive object={woodPartitionMaterial} attach="material" />
          </mesh>
          {/* Warm internal luminaire */}
          <mesh position={[0.2, 0.2, 0]}>
            <boxGeometry args={[0.7, 0.12, 0.5]} />
            <primitive object={warmInteriorMaterial} attach="material" />
          </mesh>
        </group>
      </group>

      {/* Sleek Structural Columns */}
      {[
        [-1.85, 0.78, 1.3],
        [-1.85, 0.78, -1.3],
        [0.45, 0.78, 1.3],
        [0.45, 0.78, -1.3],
        [1.85, 0.78, -1.3],
        [1.85, 0.78, -0.1],
      ].map(([x, y, z], i) => (
        <mesh position={[x, y, z]} key={`col-g-${i}`} castShadow>
          <cylinderGeometry args={[0.032, 0.032, 1.24, 16]} />
          <primitive object={columnMaterial} attach="material" />
        </mesh>
      ))}

      {/* ── 3. INTERMEDIATE CANTILEVERED SLAB (FLOOR 2 BASE) ──────── */}
      <mesh position={[0.1, 1.48, 0]} receiveShadow castShadow>
        <boxGeometry args={[4.4, 0.15, 3.5]} />
        <primitive object={whiteSlabMaterial} attach="material" />
      </mesh>

      {/* Upper Floor Balcony Glass Railing */}
      <mesh position={[1.4, 1.76, 0.85]}>
        <boxGeometry args={[1.5, 0.42, 0.025]} />
        <primitive object={glassMaterial} attach="material" />
      </mesh>
      <mesh position={[2.15, 1.76, 0]}>
        <boxGeometry args={[0.025, 0.42, 1.7]} />
        <primitive object={glassMaterial} attach="material" />
      </mesh>
      {/* Handrail trim */}
      <mesh position={[1.4, 1.98, 0.85]}>
        <boxGeometry args={[1.52, 0.025, 0.035]} />
        <primitive object={columnMaterial} attach="material" />
      </mesh>

      {/* ── 4. UPPER FLOOR CANTILEVERED GLASS PAVILION ─────────────── */}
      <group position={[-0.3, 2.15, -0.2]}>
        {/* Front Panoramic Glass Curtain */}
        <mesh position={[0, 0, 1.25]}>
          <boxGeometry args={[3.2, 1.2, 0.03]} />
          <primitive object={glassMaterial} attach="material" />
        </mesh>
        {/* Right Glass Curtain */}
        <mesh position={[1.6, 0, 0]}>
          <boxGeometry args={[0.03, 1.2, 2.5]} />
          <primitive object={glassMaterial} attach="material" />
        </mesh>
        {/* Left Glass Curtain */}
        <mesh position={[-1.6, 0, 0]}>
          <boxGeometry args={[0.03, 1.2, 2.5]} />
          <primitive object={glassMaterial} attach="material" />
        </mesh>
        {/* Rear Wall */}
        <mesh position={[0, 0, -1.25]}>
          <boxGeometry args={[3.2, 1.2, 0.03]} />
          <primitive object={glassMaterial} attach="material" />
        </mesh>

        {/* Upper Mullions */}
        {[-0.8, 0, 0.8].map((x) => (
          <mesh position={[x, 0, 1.255]} key={`m-u-v-${x}`}>
            <boxGeometry args={[0.025, 1.2, 0.02]} />
            <primitive object={columnMaterial} attach="material" />
          </mesh>
        ))}
        <mesh position={[0, 0.1, 1.255]}>
          <boxGeometry args={[3.2, 0.025, 0.02]} />
          <primitive object={columnMaterial} attach="material" />
        </mesh>

        {/* Upper Interior Warm Node */}
        <mesh position={[0.2, 0.15, 0]}>
          <boxGeometry args={[1.2, 0.1, 0.8]} />
          <primitive object={warmInteriorMaterial} attach="material" />
        </mesh>
      </group>

      {/* Upper Structural Columns */}
      {[
        [-1.85, 2.15, 0.95],
        [-1.85, 2.15, -1.35],
        [1.25, 2.15, 0.95],
        [1.25, 2.15, -1.35],
      ].map(([x, y, z], i) => (
        <mesh position={[x, y, z]} key={`col-u-${i}`} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 1.2, 16]} />
          <primitive object={columnMaterial} attach="material" />
        </mesh>
      ))}

      {/* ── 5. ROOF SLAB & SOLAR ARRAY DECK ───────────────────────── */}
      {/* Flat Architectural Roof Slab */}
      <mesh position={[-0.2, 2.82, -0.15]} receiveShadow castShadow>
        <boxGeometry args={[3.6, 0.14, 2.9]} />
        <primitive object={whiteSlabMaterial} attach="material" />
      </mesh>

      {/* Photovoltaic Solar Array (Grid of panels as in reference) */}
      <group position={[-0.25, 2.91, -0.15]}>
        {/* Array Base Rack */}
        <mesh position={[0, 0.01, 0]}>
          <boxGeometry args={[2.8, 0.02, 2.1]} />
          <primitive object={solarFrameMaterial} attach="material" />
        </mesh>

        {/* 8 Photovoltaic Panels */}
        {[-1.0, -0.35, 0.35, 1.0].map((x, colIdx) =>
          [-0.55, 0.55].map((z, rowIdx) => (
            <group position={[x, 0.025, z]} key={`solar-${colIdx}-${rowIdx}`}>
              {/* Frame */}
              <mesh>
                <boxGeometry args={[0.62, 0.02, 0.95]} />
                <primitive object={solarFrameMaterial} attach="material" />
              </mesh>
              {/* Dark Silicon Solar Cell */}
              <mesh position={[0, 0.01, 0]}>
                <boxGeometry args={[0.57, 0.01, 0.9]} />
                <primitive object={solarPanelMaterial} attach="material" />
              </mesh>
            </group>
          ))
        )}
      </group>
    </group>
  );
}
