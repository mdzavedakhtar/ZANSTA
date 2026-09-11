import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { INTRO_CONFIG } from './introConfig';

interface NetworkCoreProps {
  progress: number | React.RefObject<number>;
  scrollProgress?: number; // 0 to 1 normalized scroll position
  mousePos: { x: number; y: number };
  isMobile?: boolean;
}

export const NetworkCore: React.FC<NetworkCoreProps> = ({
  progress,
  scrollProgress = 0,
  mousePos,
  isMobile = false
}) => {
  const outerCoreRef = useRef<THREE.Group>(null!);
  const innerCoreRef = useRef<THREE.Mesh>(null!);
  const ringRef1 = useRef<THREE.Mesh>(null!);
  const ringRef2 = useRef<THREE.Mesh>(null!);

  const innerMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const innerCrystalMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const ring1MatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const ring2MatRef = useRef<THREE.MeshBasicMaterial>(null!);

  useFrame((state, delta) => {
    if (!outerCoreRef.current) return;

    const p = typeof progress === 'number' ? progress : (progress.current ?? 0);

    // Continuous 3D rotation driven by time + scroll
    const scrollSpeedMultiplier = 1 + scrollProgress * 2;
    outerCoreRef.current.rotation.y += delta * 0.3 * scrollSpeedMultiplier;
    outerCoreRef.current.rotation.x += delta * 0.15 * scrollSpeedMultiplier;

    if (ringRef1.current) ringRef1.current.rotation.z += delta * 0.5 * scrollSpeedMultiplier;
    if (ringRef2.current) ringRef2.current.rotation.x -= delta * 0.4 * scrollSpeedMultiplier;

    // Mouse tilt interaction (dampened responsive 3D response)
    if (!isMobile) {
      outerCoreRef.current.rotation.y += (mousePos.x * 0.3 - outerCoreRef.current.rotation.y) * 0.05;
      outerCoreRef.current.rotation.x += (-mousePos.y * 0.3 - outerCoreRef.current.rotation.x) * 0.05;
    }

    // Spatial Scale & Depth Transformation based on Intro Progress & Scroll Progress
    const introScale = Math.min(1, Math.max(0, (p - 0.2) / 0.6));
    let currentScale = introScale * 1.2;

    if (p > 0.8) {
      // Intro exit expansion -> transition into persistent background
      const expansion = (p - 0.8) * 3;
      currentScale += expansion;
    }

    // Dynamic scroll transformation across sections:
    if (scrollProgress > 0) {
      const ctaConvergence = Math.max(0, (scrollProgress - 0.85) / 0.15);
      if (ctaConvergence > 0) {
        currentScale = (1 - ctaConvergence * 0.7);
      } else {
        currentScale = 1.8 + Math.sin(scrollProgress * Math.PI * 3) * 0.4;
      }
      outerCoreRef.current.position.z = -scrollProgress * 25;
    }

    outerCoreRef.current.scale.set(currentScale, currentScale, currentScale);

    // Update material opacities directly in useFrame
    if (innerMatRef.current) {
      innerMatRef.current.opacity = Math.min(0.85, Math.max(0.15, p > 0.8 ? 0.4 - scrollProgress * 0.2 : p));
    }
    if (innerCrystalMatRef.current) {
      innerCrystalMatRef.current.opacity = Math.min(0.35, Math.max(0.05, p > 0.8 ? 0.18 : p * 0.5));
    }
    if (ring1MatRef.current) {
      ring1MatRef.current.opacity = Math.min(0.65, Math.max(0.15, p > 0.8 ? 0.35 : p));
    }
    if (ring2MatRef.current) {
      ring2MatRef.current.opacity = Math.min(0.45, Math.max(0.08, p > 0.8 ? 0.22 : p * 0.7));
    }
  });

  return (
    <group ref={outerCoreRef}>
      {/* Outer Wireframe Icosahedron Core — Crimson */}
      <mesh ref={innerCoreRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          ref={innerMatRef}
          color={INTRO_CONFIG.colors.crimsonAccent}
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Inner Crystal Core — Deeper Crimson (reduced opacity for depth) */}
      <mesh scale={[0.55, 0.55, 0.55]}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          ref={innerCrystalMatRef}
          color={INTRO_CONFIG.colors.crimsonAccent}
          wireframe={false}
          transparent
          opacity={0.05}
        />
      </mesh>

      {/* Orbiting Ring 1 — Crimson */}
      <mesh ref={ringRef1} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.5, 0.015, 16, 100]} />
        <meshBasicMaterial
          ref={ring1MatRef}
          color={INTRO_CONFIG.colors.crimsonAccent}
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Orbiting Ring 2 — Subtle Crimson */}
      <mesh ref={ringRef2} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[1.8, 0.012, 16, 100]} />
        <meshBasicMaterial
          ref={ring2MatRef}
          color={INTRO_CONFIG.colors.crimsonAccent}
          transparent
          opacity={0.08}
        />
      </mesh>
    </group>
  );
};
