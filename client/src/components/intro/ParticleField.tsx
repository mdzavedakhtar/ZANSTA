import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { INTRO_CONFIG } from './introConfig';

interface ParticleFieldProps {
  progress: number | React.RefObject<number>;
  isMobile?: boolean;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({ progress, isMobile = false }) => {
  const count = isMobile ? INTRO_CONFIG.mobileParticleCount : INTRO_CONFIG.desktopParticleCount;
  const pointsRef = useRef<THREE.Points>(null!);

  // Generate initial random particle positions and targeted center convergence positions
  const [positions, targetPositions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const targetPos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    // ZANSTA palette: crimson as primary, off-white as subtle highlights
    const crimsonColor  = new THREE.Color(INTRO_CONFIG.colors.crimsonAccent);
    const offwhiteColor = new THREE.Color(INTRO_CONFIG.colors.offwhiteAccent);

    for (let i = 0; i < count; i++) {
      // Wide initial spread
      const radius = 6 + Math.random() * 8;
      const theta  = Math.random() * Math.PI * 2;
      const phi    = Math.acos(Math.random() * 2 - 1);

      pos[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      // Targeted convergence closer to central geometric core
      const targetRadius = 1.2 + Math.random() * 2.2;
      targetPos[i * 3]     = targetRadius * Math.sin(phi) * Math.cos(theta);
      targetPos[i * 3 + 1] = targetRadius * Math.sin(phi) * Math.sin(theta);
      targetPos[i * 3 + 2] = targetRadius * Math.cos(phi);

      // 75% crimson, 25% off-white highlights — cinematic crimson field
      const mixedColor = Math.random() > 0.25 ? crimsonColor : offwhiteColor;
      cols[i * 3]     = mixedColor.r;
      cols[i * 3 + 1] = mixedColor.g;
      cols[i * 3 + 2] = mixedColor.b;
    }

    return [pos, targetPos, cols];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const currentProgress = typeof progress === 'number' ? progress : (progress.current ?? 0);

    // Slow rotational drift
    pointsRef.current.rotation.y += delta * 0.15;
    pointsRef.current.rotation.x += delta * 0.05;

    if (isMobile) {
      const factor = Math.min(1, Math.max(0, (currentProgress - 0.1) / 0.8));
      const expansion = currentProgress > 0.8 ? (currentProgress - 0.8) * 2.5 : 0;
      const s = Math.max(0.2, (1 - factor * 0.4) * (1 + expansion));
      pointsRef.current.scale.set(s, s, s);
      return;
    }

    // Interpolate positions toward target as timeline progresses (Desktop)
    const geo     = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    if (!posAttr) return;

    const currentArray = posAttr.array as Float32Array;

    // Convergence ratio based on timeline progress (0 -> 1)
    const factor          = Math.min(1, Math.max(0, (currentProgress - 0.1) / 0.8));
    const expansionFactor = currentProgress > 0.8 ? (currentProgress - 0.8) * 5 : 0;

    for (let i = 0; i < count; i++) {
      const idx    = i * 3;
      const startX = positions[idx];
      const startY = positions[idx + 1];
      const startZ = positions[idx + 2];

      const endX = targetPositions[idx];
      const endY = targetPositions[idx + 1];
      const endZ = targetPositions[idx + 2];

      let curX = startX + (endX - startX) * factor;
      let curY = startY + (endY - startY) * factor;
      let curZ = startZ + (endZ - startZ) * factor;

      // Expand outward during exit phase (3.2s -> 4.0s)
      if (expansionFactor > 0) {
        curX *= 1 + expansionFactor * 1.5;
        curY *= 1 + expansionFactor * 1.5;
        curZ *= 1 + expansionFactor * 1.5;
      }

      currentArray[idx]     = curX;
      currentArray[idx + 1] = curY;
      currentArray[idx + 2] = curZ;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.05 : 0.04}
        vertexColors
        transparent
        opacity={0.80}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
