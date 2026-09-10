import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { INTRO_CONFIG } from './introConfig';

interface NetworkCoreProps {
  progress: number;
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

  useFrame((state, delta) => {
    if (!outerCoreRef.current) return;

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
    const introScale = Math.min(1, Math.max(0, (progress - 0.2) / 0.6));
    let currentScale = introScale * 1.2;

    if (progress > 0.8) {
      // Intro exit expansion -> transition into persistent background
      const expansion = (progress - 0.8) * 3;
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
  });

  return (
    <group ref={outerCoreRef}>
      {/* Outer Wireframe Icosahedron Core — Crimson */}
      <mesh ref={innerCoreRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color={INTRO_CONFIG.colors.crimsonAccent}
          wireframe
          transparent
          opacity={Math.min(0.85, Math.max(0.15, progress > 0.8 ? 0.4 - scrollProgress * 0.2 : progress))}
        />
      </mesh>

      {/* Inner Crystal Core — Deeper Crimson (reduced opacity for depth) */}
      <mesh scale={[0.55, 0.55, 0.55]}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          color={INTRO_CONFIG.colors.crimsonAccent}
          wireframe={false}
          transparent
          opacity={Math.min(0.35, Math.max(0.05, progress > 0.8 ? 0.18 : progress * 0.5))}
        />
      </mesh>

      {/* Orbiting Ring 1 — Crimson */}
      <mesh ref={ringRef1} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.5, 0.015, 16, 100]} />
        <meshBasicMaterial
          color={INTRO_CONFIG.colors.crimsonAccent}
          transparent
          opacity={Math.min(0.65, Math.max(0.15, progress > 0.8 ? 0.35 : progress))}
        />
      </mesh>

      {/* Orbiting Ring 2 — Subtle Crimson */}
      <mesh ref={ringRef2} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[1.8, 0.012, 16, 100]} />
        <meshBasicMaterial
          color={INTRO_CONFIG.colors.crimsonAccent}
          transparent
          opacity={Math.min(0.45, Math.max(0.08, progress > 0.8 ? 0.22 : progress * 0.7))}
        />
      </mesh>
    </group>
  );
};
