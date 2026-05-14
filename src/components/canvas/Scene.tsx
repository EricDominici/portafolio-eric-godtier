'use client';

import { Canvas } from '@react-three/fiber';
import { Preload, Environment, PerformanceMonitor } from '@react-three/drei';
import { Suspense, useState } from 'react';
import HeroParticles from './HeroParticles';
import AboutMonet from './AboutMonet';
import TimelineMaze from './TimelineMaze';
import ProjectsFluid from './ProjectsFluid';

export default function Scene() {
  const [dpr, setDpr] = useState(1.5);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={dpr as [number, number] | number}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(2)}>
          <Suspense fallback={null}>
            <fog attach="fog" args={['#050505', 5, 40]} />
            <HeroParticles />
            <AboutMonet />
            <TimelineMaze />
            <ProjectsFluid />
            
            <ambientLight intensity={0.5} />
            <Environment preset="city" />
            
            <Preload all />
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}
