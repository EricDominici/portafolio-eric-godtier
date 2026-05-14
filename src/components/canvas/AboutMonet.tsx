'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Text, Float, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';

export default function AboutMonet() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const rawProgress = useStore.getState().scrollProgress;
    
    if (groupRef.current) {
      // Parallax inercial masivo: 
      // Queremos que esté en Y=0 cuando rawProgress sea 0.35
      // Si rawProgress < 0.35, targetY es negativo (abajo)
      // Si rawProgress > 0.35, targetY es positivo (arriba)
      const targetY = (0.35 - rawProgress) * -80; 
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.08;
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -15, -2]}>
      {/* Tipografía WebGL trasera que será refractada por el cristal */}
      <Text
        position={[-1, 1.5, -3]}
        fontSize={1.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.1}
      >
        PRODUCT
      </Text>
      <Text
        position={[1, 0, -3]}
        fontSize={1.2}
        color="#FF5A00" // Fuego Insubordinado (Naranja)
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.1}
      >
        MANAGER
      </Text>
      <Text
        position={[0, -1.5, -3]}
        fontSize={1.2}
        color="#00F0FF" // Cian Metálico
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.1}
      >
        ENGINEER
      </Text>

      {/* Cristal Físico (La Máscara) */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <Icosahedron ref={meshRef} args={[2.5, 0]} position={[0, 0, 0]}>
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={2}
            chromaticAberration={0.2}
            anisotropy={0.3}
            distortion={0.8}
            distortionScale={0.5}
            temporalDistortion={0.2}
            color="#ffffff"
            transmission={1}
            roughness={0.1}
          />
        </Icosahedron>
      </Float>
    </group>
  );
}
