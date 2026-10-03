import { RoundedBox } from "@react-three/drei";

/**
 * Stylized modern architectural home inspired by Concept 2 ("Modern Minimal Studio").
 * Features gabled roof with eaves, warm glowing interior windows, entrance steps,
 * chimney, and rounded organic studio shrubs on the podium.
 */
export default function Concept2House() {
  return (
    <group position={[0, 0, 0]}>
      {/* Main House Body with Soft Rounded Corners */}
      <RoundedBox
        args={[2.25, 1.65, 1.85]}
        radius={0.07}
        smoothness={4}
        position={[0, 0.98, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#fbfbfa"
          roughness={0.4}
          metalness={0.03}
        />
      </RoundedBox>

      {/* Main Gabled Roof in ServiceHub Green */}
      <mesh
        position={[0, 2.12, 0]}
        rotation={[0, Math.PI / 4, 0]}
        castShadow
        receiveShadow
      >
        <coneGeometry args={[1.72, 0.98, 4]} />
        <meshStandardMaterial
          color="#17734a"
          roughness={0.45}
          metalness={0.05}
        />
      </mesh>

      {/* Roof Dormer Window Detail (Concept 2 feature) */}
      <group position={[0, 2.2, 0.55]} rotation={[0.4, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.38, 0.35, 0.32]} />
          <meshStandardMaterial color="#17734a" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.17]}>
          <planeGeometry args={[0.22, 0.22]} />
          <meshStandardMaterial
            color="#fff0c2"
            emissive="#f3a54a"
            emissiveIntensity={0.6}
          />
        </mesh>
      </group>

      {/* Chimney with Beveled Cap */}
      <group position={[0.72, 2.3, -0.32]}>
        <mesh castShadow>
          <boxGeometry args={[0.28, 0.58, 0.28]} />
          <meshStandardMaterial color="#e5eae6" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[0.34, 0.08, 0.34]} />
          <meshStandardMaterial color="#17734a" roughness={0.4} />
        </mesh>
      </group>

      {/* Recessed Front Door */}
      <group position={[0, 0.56, 0.94]}>
        {/* Door Frame */}
        <mesh castShadow>
          <boxGeometry args={[0.52, 0.92, 0.04]} />
          <meshStandardMaterial color="#d4e0d8" roughness={0.5} />
        </mesh>
        {/* Door Leaf */}
        <mesh position={[0, 0, 0.02]} castShadow>
          <boxGeometry args={[0.44, 0.84, 0.04]} />
          <meshStandardMaterial color="#13231d" roughness={0.55} />
        </mesh>
        {/* Brass Handle */}
        <mesh position={[0.15, 0, 0.05]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial color="#f3a54a" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Two Clean Entrance Steps */}
      <group position={[0, 0.12, 1.05]}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.75, 0.1, 0.28]} />
          <meshStandardMaterial color="#edf2ee" roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.06, 0.12]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 0.1, 0.28]} />
          <meshStandardMaterial color="#edf2ee" roughness={0.6} />
        </mesh>
      </group>

      {/* Warm Glowing Windows (Left & Right Front) */}
      {/* Front Left Window */}
      <group position={[-0.66, 1.15, 0.94]}>
        <mesh castShadow>
          <boxGeometry args={[0.44, 0.44, 0.05]} />
          <meshStandardMaterial color="#d4e0d8" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[0.36, 0.36, 0.02]} />
          <meshStandardMaterial
            color="#fff2cc"
            emissive="#f3a54a"
            emissiveIntensity={0.65}
          />
        </mesh>
        {/* Window Mullions */}
        <mesh position={[0, 0, 0.04]}>
          <boxGeometry args={[0.03, 0.36, 0.02]} />
          <meshStandardMaterial color="#13231d" />
        </mesh>
        <mesh position={[0, 0, 0.04]}>
          <boxGeometry args={[0.36, 0.03, 0.02]} />
          <meshStandardMaterial color="#13231d" />
        </mesh>
      </group>

      {/* Front Right Window */}
      <group position={[0.66, 1.15, 0.94]}>
        <mesh castShadow>
          <boxGeometry args={[0.44, 0.44, 0.05]} />
          <meshStandardMaterial color="#d4e0d8" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[0.36, 0.36, 0.02]} />
          <meshStandardMaterial
            color="#fff2cc"
            emissive="#f3a54a"
            emissiveIntensity={0.65}
          />
        </mesh>
        {/* Window Mullions */}
        <mesh position={[0, 0, 0.04]}>
          <boxGeometry args={[0.03, 0.36, 0.02]} />
          <meshStandardMaterial color="#13231d" />
        </mesh>
        <mesh position={[0, 0, 0.04]}>
          <boxGeometry args={[0.36, 0.03, 0.02]} />
          <meshStandardMaterial color="#13231d" />
        </mesh>
      </group>

      {/* Side Windows for 3D Orbit Angles */}
      <mesh position={[1.14, 1.15, 0]}>
        <boxGeometry args={[0.04, 0.38, 0.38]} />
        <meshStandardMaterial
          color="#fff2cc"
          emissive="#f3a54a"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[-1.14, 1.15, 0]}>
        <boxGeometry args={[0.04, 0.38, 0.38]} />
        <meshStandardMaterial
          color="#fff2cc"
          emissive="#f3a54a"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Stylized Rounded Foliage & Studio Shrubs (from Concept 2) */}
      {/* Front Left Tree/Bush */}
      <group position={[-1.4, 0.36, 0.75]}>
        <mesh castShadow>
          <sphereGeometry args={[0.38, 24, 24]} />
          <meshStandardMaterial color="#1e8556" roughness={0.7} />
        </mesh>
        <mesh position={[0.18, -0.1, 0.15]} castShadow>
          <sphereGeometry args={[0.24, 20, 20]} />
          <meshStandardMaterial color="#2da86f" roughness={0.75} />
        </mesh>
      </group>

      {/* Front Right Bush */}
      <group position={[1.4, 0.34, 0.7]}>
        <mesh castShadow>
          <sphereGeometry args={[0.36, 24, 24]} />
          <meshStandardMaterial color="#17734a" roughness={0.7} />
        </mesh>
        <mesh position={[-0.16, -0.08, 0.18]} castShadow>
          <sphereGeometry args={[0.22, 20, 20]} />
          <meshStandardMaterial color="#2da86f" roughness={0.75} />
        </mesh>
      </group>

      {/* Rear Soft Shrubs */}
      <mesh position={[-1.25, 0.3, -0.8]} castShadow>
        <sphereGeometry args={[0.32, 20, 20]} />
        <meshStandardMaterial color="#86bfa3" roughness={0.8} />
      </mesh>
      <mesh position={[1.3, 0.32, -0.75]} castShadow>
        <sphereGeometry args={[0.35, 20, 20]} />
        <meshStandardMaterial color="#86bfa3" roughness={0.8} />
      </mesh>
    </group>
  );
}
