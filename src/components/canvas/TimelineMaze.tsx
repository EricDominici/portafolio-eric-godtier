'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';

function ChaosGate({ year, desc, z, color }: any) {
  const textRef = useRef<any>(null);
  const descRef = useRef<any>(null);
  const fragmentsRef = useRef<THREE.InstancedMesh>(null);
  
  const fragmentCount = 150;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Posiciones entrópicas aleatorias iniciales
  const fragmentsData = useMemo(() => {
    return Array.from({ length: fragmentCount }, () => ({
      x: (Math.random() - 0.5) * 60,
      y: (Math.random() - 0.5) * 60,
      z: (Math.random() - 0.5) * 60,
      rx: Math.random() * Math.PI * 2,
      ry: Math.random() * Math.PI * 2,
      rz: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    if (!fragmentsRef.current || !textRef.current || !descRef.current) return;
    
    const rawProgress = useStore.getState().scrollProgress;
    const timelineProgress = Math.max(0, (rawProgress - 0.4) * 2.5);
    const globalZ = timelineProgress * 200; 
    
    // Z absoluto respecto a la cámara
    const absoluteZ = z + globalZ; 

    let assemblyFactor = 1; // 1 = Entropía total (esparcidos)
    let shatterFactor = 0;  // 1 = Explosión Kinética (cámara los atraviesa)
    
    if (absoluteZ < -80) {
      assemblyFactor = 1; 
    } else if (absoluteZ >= -80 && absoluteZ < -15) {
      // Ensamblaje magnético
      assemblyFactor = Math.abs(absoluteZ + 15) / 65; 
    } else if (absoluteZ >= -15 && absoluteZ <= 10) {
      // Orden perfecto -> Explosión
      assemblyFactor = 0;
      shatterFactor = (absoluteZ + 15) / 25; 
    } else if (absoluteZ > 10) {
      assemblyFactor = 0;
      shatterFactor = 1; 
    }

    // Actualizar matriz de fragmentos
    fragmentsData.forEach((frag, i) => {
      // Orden: Un muro o anillo rectangular arquitectónico rodeando el texto
      const t = i / fragmentCount;
      const radiusX = 20;
      const radiusY = 10;
      const orderedX = Math.cos(t * Math.PI * 2) * radiusX;
      const orderedY = Math.sin(t * Math.PI * 2) * radiusY;
      const orderedZ = Math.sin(t * Math.PI * 8) * 2; // Ligera ondulación

      // Explosión: Salen disparados hacia los extremos violentamente
      const shatteredX = frag.x * 4;
      const shatteredY = frag.y * 4;
      const shatteredZ = frag.z * 4 + 20;

      // Interpolación Caos -> Orden
      let currentX = orderedX + (frag.x - orderedX) * assemblyFactor;
      let currentY = orderedY + (frag.y - orderedY) * assemblyFactor;
      let currentZ = orderedZ + (frag.z - orderedZ) * assemblyFactor;

      // Interpolación Orden -> Explosión
      if (shatterFactor > 0) {
        currentX += (shatteredX - currentX) * shatterFactor;
        currentY += (shatteredY - currentY) * shatterFactor;
        currentZ += (shatteredZ - currentZ) * shatterFactor;
      }

      dummy.position.set(currentX, currentY, currentZ);
      
      // Rotación
      dummy.rotation.set(
        frag.rx * assemblyFactor + (state.clock.elapsedTime * 3) * shatterFactor,
        frag.ry * assemblyFactor + (state.clock.elapsedTime * 3) * shatterFactor,
        frag.rz * assemblyFactor + (state.clock.elapsedTime * 3) * shatterFactor
      );
      
      dummy.scale.setScalar(1 + shatterFactor * 3);
      dummy.updateMatrix();
      fragmentsRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    fragmentsRef.current.instanceMatrix.needsUpdate = true;

    // Kinesis Tipográfica (El texto reacciona elásticamente)
    if (shatterFactor > 0) {
      // El texto se estira hacia la cámara y se desvanece
      textRef.current.scale.z = 1 + shatterFactor * 20;
      textRef.current.scale.x = 1 + shatterFactor * 0.5;
      textRef.current.scale.y = 1 + shatterFactor * 0.5;
      textRef.current.fillOpacity = Math.max(0, 1 - shatterFactor * 1.5);
      
      descRef.current.fillOpacity = Math.max(0, 1 - shatterFactor * 2);
    } else {
      textRef.current.scale.set(1, 1, 1);
      // El texto aparece del caos
      textRef.current.fillOpacity = 1 - assemblyFactor * 0.9; 
      descRef.current.fillOpacity = 1 - assemblyFactor;
    }
  });

  return (
    <group position={[0, 0, z]}>
      {/* Fragmentos Arquitectónicos */}
      <instancedMesh ref={fragmentsRef} args={[undefined, undefined, fragmentCount]}>
        <boxGeometry args={[1, 0.2, 0.2]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} wireframe={false} blending={THREE.AdditiveBlending} />
      </instancedMesh>

      {/* Luz puntual que nace del orden */}
      <pointLight color={color} intensity={5} distance={40} />

      {/* Tipografía Monumental */}
      <Text
        ref={textRef}
        position={[0, 2, 0]}
        fontSize={14}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={-0.05}
        fontWeight="bold"
      >
        {year}
      </Text>
      
      <Text
        ref={descRef}
        position={[0, -6, 0]}
        fontSize={1.5}
        color={color}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.2}
      >
        {desc}
      </Text>
    </group>
  );
}

export default function TimelineMaze() {
  const groupRef = useRef<THREE.Group>(null);

  const gates = useMemo(() => [
    { year: "2021", desc: "LOS FUNDAMENTOS", z: -40, color: "#FF0055" }, // Magenta
    { year: "2023", desc: "FULL-STACK", z: -100, color: "#FF5A00" }, // Naranja
    { year: "2024", desc: "ARQUITECTURAS MASIVAS", z: -160, color: "#00F0FF" }, // Cian
    { year: "PRESENTE", desc: "ARQUITECTO DE REALIDADES", z: -220, color: "#ffffff" }
  ], []);

  useFrame((state) => {
    const rawProgress = useStore.getState().scrollProgress;
    
    if (groupRef.current) {
      // Inercia de avance global
      const timelineProgress = Math.max(0, (rawProgress - 0.4) * 2.5);
      const targetZ = timelineProgress * 250; 
      
      groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.05;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, -10]}>
      {gates.map((gate, i) => (
        <ChaosGate key={i} {...gate} />
      ))}
    </group>
  );
}
