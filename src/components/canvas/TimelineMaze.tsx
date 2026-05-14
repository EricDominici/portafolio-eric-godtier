'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';

// Partículas que simulan velocidad de luz / transferencia de datos
function WarpParticles() {
  const count = 400;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generar posiciones iniciales aleatorias en un tubo gigante
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 20; // Entre 5 y 25 de radio
      const x = Math.cos(theta) * radius;
      const y = Math.sin(theta) * radius;
      const z = Math.random() * -200; // Distribuidas a lo largo del túnel
      const speed = 0.5 + Math.random() * 2;
      temp.push({ x, y, z, speed });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;
    const scrollSpeed = Math.max(0, (useStore.getState().scrollProgress - 0.4) * 2.5);
    // Velocidad base + turbo por scroll
    const globalSpeed = 0.5 + scrollSpeed * 10;

    particles.forEach((particle, i) => {
      particle.z += particle.speed * globalSpeed;
      if (particle.z > 20) {
        particle.z = -200; // Resetear cuando pasan la cámara
      }

      dummy.position.set(particle.x, particle.y, particle.z);
      // Alargamos la partícula en Z para dar sensación de velocidad
      dummy.scale.set(1, 1, globalSpeed * 2);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.05, 0.05, 2]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
    </instancedMesh>
  );
}

export default function TimelineMaze() {
  const groupRef = useRef<THREE.Group>(null);
  const gateRefs = useRef<(THREE.Group | null)[]>([]);

  // Generamos anillos cuánticos para el laberinto
  const gates = useMemo(() => [
    { year: "2021", desc: "Los Fundamentos", z: -40, color: "#FF0055", speed: 0.005 }, // Magenta
    { year: "2023", desc: "Desarrollo Full-Stack", z: -80, color: "#FF5A00", speed: -0.004 }, // Naranja
    { year: "2024", desc: "Arquitecturas Empresariales", z: -120, color: "#00F0FF", speed: 0.006 }, // Cian
    { year: "PRESENTE", desc: "Arquitecto de Realidades", z: -160, color: "#ffffff", speed: -0.003 }
  ], []);

  useFrame((state) => {
    const rawProgress = useStore.getState().scrollProgress;
    
    if (groupRef.current) {
      // El scroll empuja todo el laberinto hacia la cámara
      const timelineProgress = Math.max(0, (rawProgress - 0.4) * 2.5);
      const targetZ = timelineProgress * 200; 
      
      // Interpolación suave para el avance inercial
      groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.05;
      
      // Oscilación global
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;

      // Actualizar cada puerta individualmente
      gateRefs.current.forEach((gate, i) => {
        if (!gate) return;
        
        // Rotación de vórtice constante
        gate.rotation.z += gates[i].speed;

        // Calcular posición absoluta en Z de esta puerta respecto a la cámara
        const absoluteZ = gates[i].z + groupRef.current!.position.z;
        
        // Reactividad: Si la cámara está a punto de cruzar (distancia entre -10 y 5)
        if (absoluteZ > -15 && absoluteZ < 5) {
          // Efecto de pulso/expansión cuántica
          const scaleTarget = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.05;
          gate.scale.setScalar(gate.scale.x + (scaleTarget - gate.scale.x) * 0.1);
        } else {
          // Escala normal
          gate.scale.setScalar(gate.scale.x + (1 - gate.scale.x) * 0.1);
        }
      });
    }
  });

  return (
    <>
      <WarpParticles />
      <group ref={groupRef} position={[0, -2, -10]}>
        {gates.map((gate, i) => (
          <group 
            key={i} 
            position={[0, 0, gate.z]} 
            ref={(el) => { gateRefs.current[i] = el; }}
          >
            {/* Anillo Cuántico (Torus Wireframe) */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[12, 0.5, 4, 16]} />
              <meshStandardMaterial 
                color={gate.color} 
                emissive={gate.color} 
                emissiveIntensity={2} 
                wireframe={true} 
                transparent 
                opacity={0.4} 
                blending={THREE.AdditiveBlending} 
              />
            </mesh>
            
            {/* Segundo anillo interior cruzado para mayor complejidad */}
            <mesh rotation={[0, 0, 0]}>
              <torusGeometry args={[10, 0.2, 3, 24]} />
              <meshStandardMaterial 
                color={gate.color} 
                emissive={gate.color} 
                emissiveIntensity={1} 
                wireframe={true} 
                transparent 
                opacity={0.2} 
                blending={THREE.AdditiveBlending} 
              />
            </mesh>

            {/* Luz interna del portal */}
            <pointLight color={gate.color} intensity={5} distance={30} />

            {/* Textos Flotantes Inalterables por la rotación del anillo */}
            <group rotation={[0, 0, 0]}>
              <Text 
                position={[0, 3, 0]} 
                fontSize={2} 
                color="#ffffff" 
                anchorX="center" 
                anchorY="middle" 
                letterSpacing={0.1}
              >
                {gate.year}
              </Text>
              <Text 
                position={[0, -3, 0]} 
                fontSize={1} 
                color={gate.color} 
                anchorX="center" 
                anchorY="middle" 
                letterSpacing={0.2}
              >
                {gate.desc}
              </Text>
            </group>
          </group>
        ))}
      </group>
    </>
  );
}
