'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';

export default function TimelineMaze() {
  const groupRef = useRef<THREE.Group>(null);

  // Generamos anillos/puertas lógicas para el laberinto
  const gates = useMemo(() => [
    { year: "2021", desc: "Los Fundamentos", z: -30, color: "#FF0055" }, // Magenta
    { year: "2023", desc: "Desarrollo Full-Stack", z: -60, color: "#FF5A00" }, // Naranja
    { year: "2024", desc: "Arquitecturas Empresariales", z: -90, color: "#00F0FF" }, // Cian
    { year: "PRESENTE", desc: "Arquitecto de Realidades", z: -120, color: "#ffffff" }
  ], []);

  useFrame((state) => {
    const rawProgress = useStore.getState().scrollProgress;
    
    if (groupRef.current) {
      // El scroll empuja todo el laberinto hacia la cámara
      // Empieza a avanzar drásticamente a partir del 40% del scroll
      const timelineProgress = Math.max(0, (rawProgress - 0.4) * 2.5); // Multiplicador para velocidad
      const targetZ = timelineProgress * 150; 
      
      // Interpolación suave para el avance inercial
      groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.05;
      
      // Pequeña oscilación para dar sensación de flotabilidad espacial
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, -10]}>
      {gates.map((gate, i) => (
        <group key={i} position={[0, 0, gate.z]}>
          {/* Marco / Puerta Wireframe Estructurada */}
          <mesh>
            <boxGeometry args={[16, 10, 2]} />
            <meshBasicMaterial color={gate.color} wireframe={true} transparent opacity={0.15} />
          </mesh>
          
          {/* Luz interna del portal */}
          <pointLight color={gate.color} intensity={2} distance={20} />

          {/* Textos Flotantes (Se leen mientras la cámara los atraviesa) */}
          <Text 
            position={[0, 2.5, 0]} 
            fontSize={1.8} 
            color="#ffffff" 
            anchorX="center" 
            anchorY="middle" 
            letterSpacing={0.1}
          >
            {gate.year}
          </Text>
          <Text 
            position={[0, -2.5, 0]} 
            fontSize={0.8} 
            color={gate.color} 
            anchorX="center" 
            anchorY="middle" 
            letterSpacing={0.2}
          >
            {gate.desc}
          </Text>
        </group>
      ))}
    </group>
  );
}
