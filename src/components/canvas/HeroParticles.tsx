'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';

const COUNT = 15000; // 15,000 partículas para mantener 60fps constantes

const vertexShader = `
uniform float uProgress;
uniform float uTime;
attribute vec3 aTargetPosition;
varying float vProgress;

void main() {
  vec3 pos = position;
  
  // Caos: Añadir un poco de ruido físico basado en el tiempo
  pos.x += sin(uTime * 0.5 + position.y * 5.0) * 0.1 * (1.0 - uProgress);
  pos.y += cos(uTime * 0.3 + position.x * 5.0) * 0.1 * (1.0 - uProgress);
  pos.z += sin(uTime * 0.4 + position.z * 5.0) * 0.1 * (1.0 - uProgress);

  // El núcleo de la narrativa: Mezclar matemáticamente de Caos a Estructura (Orden)
  vec3 finalPos = mix(pos, aTargetPosition, uProgress);
  
  vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
  
  // Tamaño adaptativo según la profundidad y el progreso
  gl_PointSize = (15.0 / -mvPosition.z) * (1.0 + uProgress * 1.5); 
  gl_Position = projectionMatrix * mvPosition;
  
  vProgress = uProgress;
}
`;

const fragmentShader = `
varying float vProgress;
uniform float uOpacity;

void main() {
  // Paleta narrativa: De Blanco/Gris Caótico a Cian Metálico (El Orden)
  vec3 colorChaos = vec3(0.4, 0.4, 0.4);
  vec3 colorOrder = vec3(0.0, 0.94, 1.0); // #00F0FF (Cian)
  
  vec3 finalColor = mix(colorChaos, colorOrder, vProgress);
  
  // Shader para hacer la partícula esférica y luminosa (Gaussian blur-like)
  float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
  float alpha = 0.05 / distanceToCenter - 0.1;
  
  gl_FragColor = vec4(finalColor, alpha * uOpacity);
}
`;

export default function HeroParticles() {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  const [positions, targetPositions] = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const target = new Float32Array(COUNT * 3);
    
    const gridSize = Math.floor(Math.cbrt(COUNT));
    const spacing = 0.15;
    const offset = (gridSize * spacing) / 2;
    
    for(let i = 0; i < COUNT; i++) {
      // Posición Inicial: Esfera aleatoria esparcida (Caos)
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 2 + Math.random() * 4;
      
      pos[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      
      // Posición Objetivo: Cubo Perfecto Estructurado (Orden)
      const x = (i % gridSize);
      const y = (Math.floor(i / gridSize) % gridSize);
      const z = (Math.floor(i / (gridSize * gridSize)));
      
      target[i * 3 + 0] = x * spacing - offset;
      target[i * 3 + 1] = y * spacing - offset;
      target[i * 3 + 2] = z * spacing - offset;
    }
    
    return [pos, target];
  }, []);

  useFrame((state) => {
    if (shaderRef.current && groupRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Obtener el progreso de scroll sin bloquear el main thread de React
      const rawProgress = useStore.getState().scrollProgress;
      
      // Amplificamos la ventana de progreso (0 -> 0.25 en scroll equivale a 0 -> 1 en shader)
      const localProgress = Math.min(rawProgress * 4.0, 1.0); 
      
      // Lerp para suavizado inercial en la GPU
      shaderRef.current.uniforms.uProgress.value += (localProgress - shaderRef.current.uniforms.uProgress.value) * 0.05;
      
      // Rotar la galaxia lentamente
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.02;

      // Desvanecer partículas al salir de la sección Hero (progreso > 0.3)
      const targetOpacity = rawProgress < 0.3 ? 1.0 - (rawProgress / 0.3) : 0.0;
      shaderRef.current.uniforms.uOpacity.value += (targetOpacity - shaderRef.current.uniforms.uOpacity.value) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute 
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute 
            attach="attributes-aTargetPosition"
            args={[targetPositions, 3]}
          />
        </bufferGeometry>
        <shaderMaterial 
          ref={shaderRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uProgress: { value: 0 },
            uOpacity: { value: 1 }
          }}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
