import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ParticleField } from './ParticleField';
import { NetworkCore } from './NetworkCore';
import { INTRO_CONFIG } from './introConfig';

interface NexoraSceneProps {
  progress: number | React.RefObject<number>;
  scrollProgress?: number;
  mousePos: { x: number; y: number };
  isMobile: boolean;
}

export const NexoraScene: React.FC<NexoraSceneProps> = ({
  progress,
  scrollProgress = 0,
  mousePos,
  isMobile
}) => {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  // Premium 2D Fallback if WebGL is unavailable
  if (!hasWebGL) {
    const rawProgress = typeof progress === 'number' ? progress : (progress.current ?? 0);
    return (
      <div className="absolute inset-0 bg-[#050505] flex items-center justify-center pointer-events-none overflow-hidden">
        <div
          className="w-96 h-96 rounded-full bg-gradient-to-tr from-[#8B0D1A]/25 via-[#8B0D1A]/10 to-transparent blur-3xl transition-transform duration-1000"
          style={{ transform: `scale(${0.8 + rawProgress * 0.5 + scrollProgress * 0.3})` }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
          precision: isMobile ? 'mediump' : 'highp',
        }}
        dpr={isMobile ? 1 : [1, 2]}
        className="w-full h-full"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color={INTRO_CONFIG.colors.crimsonAccent} />
        {!isMobile && (
          <pointLight position={[-10, -10, -10]} intensity={1.0} color={INTRO_CONFIG.colors.crimsonAccent} />
        )}

        <ParticleField progress={progress} isMobile={isMobile} />
        <NetworkCore progress={progress} scrollProgress={scrollProgress} mousePos={mousePos} isMobile={isMobile} />
      </Canvas>
    </div>
  );
};
