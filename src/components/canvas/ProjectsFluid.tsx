'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';

const vertexShader = `
varying vec2 vUv;
varying float vElevation;
uniform float uTime;
uniform float uActive;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Añadir distorsión tipo ola/fluido
  float elevation = sin(pos.x * 2.0 + uTime) * 0.8 * uActive + cos(pos.y * 2.0 + uTime) * 0.8 * uActive;
  pos.z += elevation;
  vElevation = elevation;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
varying float vElevation;
uniform vec3 uColor;
uniform float uActive;

void main() {
  vec3 color = mix(vec3(0.0), uColor, (vElevation + 1.0) * 0.5 * uActive);
  
  // Efecto holográfico
  float grid = max(step(0.98, fract(vUv.x * 30.0)), step(0.98, fract(vUv.y * 30.0)));
  vec3 finalColor = mix(color, uColor * 2.0, grid);
  
  gl_FragColor = vec4(finalColor, uActive * 0.5);
}
`;

export default function ProjectsFluid() {
  const meshRef = useRef<THREE.Mesh>(null);
  const shaderRef = useRef<THREE.ShaderMaterial>(null);

  const colors = [
    new THREE.Color("#FF5A00"), // 1: Naranja
    new THREE.Color("#00F0FF"), // 2: Cian
    new THREE.Color("#FF0055"), // 3: Magenta
  ];

  useFrame((state) => {
    const activeProject = useStore.getState().activeProject;
    // Mostrar si hay un proyecto activo o si estamos en la zona de scroll de proyectos
    const rawProgress = useStore.getState().scrollProgress;
    const isSectionActive = rawProgress > 0.7 && rawProgress < 0.95;
    
    // Si pasamos el ratón por encima, max intensidad. Si solo estamos en la sección, intensidad leve.
    const targetActive = activeProject !== null ? 1.0 : (isSectionActive ? 0.3 : 0.0);
    
    if (shaderRef.current && meshRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Transición suave de estado
      shaderRef.current.uniforms.uActive.value += (targetActive - shaderRef.current.uniforms.uActive.value) * 0.1;
      
      // Cambiar color basado en el proyecto activo
      if (activeProject !== null) {
        shaderRef.current.uniforms.uColor.value.lerp(colors[activeProject - 1], 0.1);
      } else {
        // Color por defecto (blanco/gris espacial)
        shaderRef.current.uniforms.uColor.value.lerp(new THREE.Color("#444444"), 0.05);
      }
      
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.3;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.1) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <planeGeometry args={[30, 20, 128, 128]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uActive: { value: 0 },
          uColor: { value: new THREE.Color("#444444") }
        }}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        wireframe={true}
      />
    </mesh>
  );
}
