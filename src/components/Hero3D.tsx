import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, useTexture, ContactShadows, Float, PresentationControls } from "@react-three/drei";
import * as THREE from "three";

/* Ecran textur (capture d'app) plaqu sur un plan */
function Screen({ src, args, position, z = 0 }: { src: string; args: [number, number]; position: [number, number, number]; z?: number }) {
  const tex = useTexture(src);
  tex.colorSpace = THREE.SRGBColorSpace;
  return (
    <mesh position={[position[0], position[1], position[2] + z]}>
      <planeGeometry args={args} />
      <meshBasicMaterial map={tex} toneMapped={false} />
    </mesh>
  );
}

/* L'app qui sort de l'iPhone : un ecran qui se detache et flotte devant */
function EmergingApp({ src }: { src: string }) {
  const ref = useRef<THREE.Group>(null);
  const t0 = useRef<number | null>(null);
  useFrame((state) => {
    if (!ref.current) return;
    if (t0.current === null) t0.current = state.clock.elapsedTime;
    const e = Math.min((state.clock.elapsedTime - t0.current) / 1.6, 1);
    const ease = 1 - Math.pow(1 - e, 3); // easeOutCubic, entree
    const z = THREE.MathUtils.lerp(0.06, 0.62, ease);
    const yFloat = Math.sin(state.clock.elapsedTime * 0.9) * 0.04 * ease;
    ref.current.position.set(0.1, 0.18 + yFloat, z);
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05 * ease;
    const s = THREE.MathUtils.lerp(0.7, 1, ease);
    ref.current.scale.setScalar(s);
  });
  return (
    <group ref={ref}>
      {/* fin contour blanc facon charte (bord 1px) */}
      <mesh position={[0, 0, -0.012]}>
        <planeGeometry args={[1.48, 3.04]} />
        <meshBasicMaterial color="#fcfbf8" toneMapped={false} />
      </mesh>
      <Screen src={src} args={[1.42, 2.98]} position={[0, 0, 0]} />
    </group>
  );
}

function PhoneScene() {
  return (
    <group>
      {/* corps du tlphone, charcoal */}
      <RoundedBox args={[1.78, 3.62, 0.24]} radius={0.26} smoothness={6} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1c1c1c" roughness={0.45} metalness={0.35} />
      </RoundedBox>
      {/* cran de fond dans le cadre */}
      <Screen src="/projects/RIDE.png" args={[1.5, 3.18]} position={[0, 0, 0.13]} />
      {/* encoche */}
      <mesh position={[0, 1.46, 0.135]}>
        <planeGeometry args={[0.5, 0.12]} />
        <meshBasicMaterial color="#1c1c1c" />
      </mesh>
      {/* l'app qui sort */}
      <EmergingApp src="/projects/MYTF1.png" />
      {/* petits accents sky en profondeur (harmonie charte) */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        <RoundedBox args={[0.34, 0.34, 0.08]} radius={0.06} position={[1.35, 1.1, 0.4]}>
          <meshStandardMaterial color="#5fa8d9" roughness={0.3} metalness={0.1} />
        </RoundedBox>
      </Float>
      <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.8}>
        <RoundedBox args={[0.22, 0.22, 0.06]} radius={0.05} position={[-1.3, -1.2, 0.5]}>
          <meshStandardMaterial color="#c7e0f1" roughness={0.4} />
        </RoundedBox>
      </Float>
    </group>
  );
}

function Rig() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    // parallaxe douce vers le pointeur
    const tx = state.pointer.y * 0.12;
    const ty = state.pointer.x * 0.25;
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, tx, 0.05);
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, ty, 0.05);
  });
  return (
    <group ref={ref} scale={0.82} position={[0.15, 0.1, 0]}>
      <PhoneScene />
    </group>
  );
}

export function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8.4], fov: 32 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} />
      <directionalLight position={[-5, 2, 2]} intensity={0.35} color="#c7e0f1" />
      <Suspense fallback={null}>
        <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.5}>
          <PresentationControls
            global
            cursor
            polar={[-0.25, 0.25]}
            azimuth={[-0.4, 0.4]}
            config={{ mass: 1, tension: 220, friction: 26 }}
          >
            <Rig />
          </PresentationControls>
        </Float>
        <ContactShadows position={[0, -2.1, 0]} opacity={0.18} scale={7} blur={2.6} far={3} color="#1c1c1c" />
      </Suspense>
    </Canvas>
  );
}
