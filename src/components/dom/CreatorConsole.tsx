'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, QuadraticBezierLine, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';

// Definición de Clústeres (MÁS ELEMENTOS PARA MAYOR DENSIDAD)
const CLUSTERS = [
  // LÓGICOS (Izquierda) - Cyan
  { id: 'l10', label: 'Patrones de Diseño', pos: [-6, 5.5, -1], type: 0, color: '#00ffff' },
  { id: 'l1', label: 'Arquitectura de Sistemas', pos: [-4.5, 4.5, 1], type: 0, color: '#00ffff' },
  { id: 'l8', label: 'DevOps & CI/CD', pos: [-7, 3.5, 0], type: 0, color: '#00ffff' },
  { id: 'l2', label: 'Estructuras de Datos', pos: [-5, 2.5, 2], type: 0, color: '#00ffff' },
  { id: 'l6', label: 'Bases de Datos Relacionales', pos: [-8, 1.5, -1], type: 0, color: '#00ffff' },
  { id: 'l3', label: 'Algoritmos CORE', pos: [-4, 0.5, 0], type: 0, color: '#00ffff' },
  { id: 'l4', label: 'Sistemas Escalables', pos: [-7.5, -0.5, 1], type: 0, color: '#00ffff' },
  { id: 'l11', label: 'Seguridad & Criptografía', pos: [-9, -1.5, -1], type: 0, color: '#00ffff' },
  { id: 'l5', label: 'Ingeniería de Software', pos: [-4.5, -2.5, 2], type: 0, color: '#00ffff' },
  { id: 'l7', label: 'Infraestructura Cloud', pos: [-6.5, -3.5, 0], type: 0, color: '#00ffff' },
  { id: 'l9', label: 'Optimización de Rendimiento', pos: [-3.5, -4.5, 1], type: 0, color: '#00ffff' },

  // CREATIVOS (Derecha) - Naranja
  { id: 'c10', label: 'Identidad de Marca', pos: [6, 5.5, -1], type: 1, color: '#ff5a00' },
  { id: 'c1', label: 'Estética Visual', pos: [4.5, 4.5, 1], type: 1, color: '#ff5a00' },
  { id: 'c8', label: 'Microinteracciones', pos: [7, 3.5, 0], type: 1, color: '#ff5a00' },
  { id: 'c6', label: 'Dirección de Arte', pos: [5, 2.5, -2], type: 1, color: '#ff5a00' },
  { id: 'c2', label: 'Narrativa Expandida', pos: [8, 1.5, 1], type: 1, color: '#ff5a00' },
  { id: 'c11', label: 'Composición Espacial', pos: [4, 0.5, 0], type: 1, color: '#ff5a00' },
  { id: 'c3', label: 'Diseño UI/UX', pos: [7.5, -0.5, -1], type: 1, color: '#ff5a00' },
  { id: 'c4', label: 'Psicología del Usuario', pos: [9, -1.5, 1], type: 1, color: '#ff5a00' },
  { id: 'c9', label: 'Pensamiento Lateral', pos: [4.5, -2.5, -2], type: 1, color: '#ff5a00' },
  { id: 'c7', label: 'Teoría del Color', pos: [6.5, -3.5, 0], type: 1, color: '#ff5a00' },
  { id: 'c5', label: 'Caos Fértil', pos: [3.5, -4.5, 1], type: 1, color: '#ff5a00' },
];

// 1. EL SISTEMA DE PARTÍCULAS DE FONDO
const BG_PARTICLES = 20000; // Incrementado para mayor densidad

function BackgroundParticles() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const { positions, isRight } = useMemo(() => {
    const pos = new Float32Array(BG_PARTICLES * 3);
    const isR = new Float32Array(BG_PARTICLES);
    
    const spacing = 0.7;

    for(let i=0; i<BG_PARTICLES; i++) {
       if (i % 2 === 0) {
          // Izquierda: Matriz estructurada (Grid)
          let x = -1 - Math.random() * 20; 
          x = Math.round(x / spacing) * spacing;
          let y = (Math.random() * 24 - 12);
          y = Math.round(y / spacing) * spacing;
          let z = (Math.random() * 12 - 6);
          z = Math.round(z / spacing) * spacing;
          
          pos[i*3] = x;
          pos[i*3+1] = y;
          pos[i*3+2] = z;
          isR[i] = 0.0;
       } else {
          // Derecha: Nube de Caos Orgánico
          pos[i*3] = 1 + Math.random() * 20;
          pos[i*3+1] = Math.random() * 24 - 12;
          pos[i*3+2] = Math.random() * 12 - 6;
          isR[i] = 1.0;
       }
    }
    return { positions: pos, isRight: isR };
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const vertexShader = `
    attribute float isRight;
    uniform float uTime;
    varying vec3 vColor;
    varying float vAlpha;
    
    void main() {
      vec3 pos = position;
      
      if (isRight < 0.5) {
        // Lógica: Datos fluyendo, estructura viva
        float wave = sin(pos.x * 2.0 + uTime * 3.0) * cos(pos.z * 2.0 + uTime * 2.0);
        pos.y += wave * 0.15;
        vColor = mix(vec3(0.0, 0.8, 1.0), vec3(0.0, 1.0, 0.8), wave);
        vAlpha = 0.6; // Visibilidad aumentada
      } else {
        // Creatividad: Tormenta caótica más dinámica
        float noise = sin(pos.y * 2.0 + uTime * 2.0) * cos(pos.z * 2.0 + uTime * 1.5);
        pos.x += noise * 0.5;
        pos.y += cos(pos.x * 2.0 + uTime * 2.0) * 0.5;
        pos.z += sin(pos.x * 1.0 + uTime) * 0.4;
        vColor = mix(vec3(1.0, 0.2, 0.0), vec3(1.0, 0.6, 0.0), noise); 
        vAlpha = 0.7; // Visibilidad aumentada
      }
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      
      // Efecto de tintineo (twinkling)
      float twinkle = 1.0 + sin(uTime * 5.0 + pos.x * 10.0) * 0.3;
      gl_PointSize = (10.0 / -mvPosition.z) * twinkle; 
      
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    varying vec3 vColor;
    varying float vAlpha;
    void main() {
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      float intensity = 1.0 - (dist * 2.0);
      gl_FragColor = vec4(vColor, intensity * vAlpha);
    }
  `;

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={BG_PARTICLES} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-isRight" count={BG_PARTICLES} array={isRight} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </points>
  );
}


// 2. EL SISTEMA FOREGROUND (Líneas desplegables y Nodos)
function ForegroundNetwork({ scrollRef, mouseXRef, instructionRef }: { scrollRef: any, mouseXRef: any, instructionRef: any }) {
  const lineMats = useRef<any[]>([]);
  const nodeMats = useRef<any[]>([]);
  const htmlRefs = useRef<(HTMLDivElement | null)[]>([]);
  const groupRef = useRef<THREE.Group>(null);
  
  const smoothProgress = useRef(0);
  const smoothMouseX = useRef(0.5);

  useFrame((state) => {
    smoothProgress.current += (scrollRef.current - smoothProgress.current) * 0.08;
    smoothMouseX.current += (mouseXRef.current - smoothMouseX.current) * 0.05;
    
    // Multiplicamos por 1.5 para que la animación se complete al 66% del scroll
    const p = Math.min(1, smoothProgress.current * 1.5);

    // Desplegar líneas
    const dashOffset = 25 - (p * 25);
    lineMats.current.forEach(mat => {
      if (mat) mat.dashOffset = dashOffset;
    });

    // Revelar nodos
    const elementOpacity = Math.max(0, Math.min(1, (p - 0.2) * 2.0));
    nodeMats.current.forEach(mat => {
      if (mat) mat.opacity = elementOpacity;
    });
    htmlRefs.current.forEach(el => {
      if (el) {
        el.style.opacity = elementOpacity.toString();
        el.style.transform = `scale(${0.8 + elementOpacity * 0.2})`;
      }
    });

    if (instructionRef.current) {
       instructionRef.current.style.opacity = Math.max(0, 1.0 - p * 5).toString();
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = (smoothMouseX.current - 0.5) * 0.2;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* NÚCLEO CENTRAL MEJORADO */}
      <mesh position={[0,0,0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Halo Exterior del Núcleo */}
      <mesh position={[0,0,0]}>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} wireframe />
      </mesh>
      
      <Html position={[0, -0.8, 0]} center className="pointer-events-none">
        <div className="flex flex-col items-center">
          <div className="text-white text-sm md:text-lg font-serif italic tracking-widest uppercase drop-shadow-[0_0_15px_rgba(255,255,255,1)] whitespace-nowrap">
            Núcleo de Procesamiento
          </div>
          <div className="text-white/60 text-[8px] md:text-[10px] font-mono tracking-[0.2em] uppercase mt-2 text-center w-48 border-t border-white/20 pt-2 whitespace-nowrap">
            Convergencia Analítico-Creativa
          </div>
        </div>
      </Html>

      {/* RAMIFICACIONES */}
      {CLUSTERS.map((cluster, i) => {
        const isLogical = cluster.type === 0;
        return (
          <group key={cluster.id}>
            
            {/* LÍNEAS */}
            {isLogical ? (
              <Line 
                ref={(el: any) => { if (el && el.material) lineMats.current.push(el.material) }}
                points={[[0,0,0], [cluster.pos[0], 0, 0], cluster.pos] as any}
                color={cluster.color}
                lineWidth={1.5}
                transparent
                opacity={0.8}
                dashed
                dashSize={25}
                gapSize={25}
              />
            ) : (
              <QuadraticBezierLine 
                ref={(el: any) => { if (el && el.material) lineMats.current.push(el.material) }}
                start={[0,0,0]}
                end={cluster.pos as any}
                mid={[cluster.pos[0] * 0.5, cluster.pos[1] * 0.5 + 4, cluster.pos[2] * 0.5] as any}
                color={cluster.color}
                lineWidth={1.5}
                transparent
                opacity={0.8}
                dashed
                dashSize={25}
                gapSize={25}
              />
            )}

            {/* NODOS */}
            <mesh position={cluster.pos as any}>
              {isLogical ? <boxGeometry args={[0.2, 0.2, 0.2]} /> : <sphereGeometry args={[0.15, 16, 16]} />}
              <meshBasicMaterial 
                ref={(el) => { if(el) nodeMats.current.push(el) }}
                color={cluster.color} 
                transparent 
                opacity={0} 
              />
            </mesh>

            {/* ETIQUETAS */}
            <Html position={cluster.pos as any} center className="pointer-events-none z-10">
              <div 
                ref={(el) => { if(el) htmlRefs.current[i] = el; }}
                style={{ opacity: 0 }}
                className={`whitespace-nowrap backdrop-blur-md px-3 py-1.5 mt-8 border 
                  ${isLogical 
                    ? 'text-brand-cyan font-mono text-[10px] md:text-xs uppercase tracking-widest bg-[#00ffff]/10 border-brand-cyan/30' 
                    : 'text-brand-orange font-serif text-[12px] md:text-sm italic tracking-wide bg-[#ff5a00]/10 border-brand-orange/40 rounded-r-full border-l-2 border-y-0 border-r-0'
                  }`}
              >
                {isLogical ? `[ ${cluster.label} ]` : cluster.label}
              </div>
            </Html>

          </group>
        )
      })}
    </group>
  );
}


export default function CreatorConsole() {
  const containerRef = useRef<HTMLDivElement>(null);
  const instructionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const scrollRef = useRef(0);
  const mouseXRef = useRef(0.5);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      scrollRef.current = latest;
    });
  }, [scrollYProgress]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseXRef.current = e.clientX / window.innerWidth;
  };

  return (
    <section 
      ref={containerRef}
      className="h-[250vh] w-full bg-[#030303] relative z-20 font-mono border-y border-white/10"
      onMouseMove={handleMouseMove}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* UI OVERLAYS - Hemisferios */}
        <div className="absolute top-8 left-8 z-20 pointer-events-none hidden md:block">
          <div className="flex items-center space-x-3 opacity-80">
            <div className="w-16 h-[1px] bg-brand-cyan/50"></div>
            <div>
              <h3 className="text-brand-cyan font-mono text-[10px] tracking-[0.4em] uppercase shadow-brand-cyan drop-shadow-md">Hemisferio Izquierdo</h3>
              <p className="text-white/40 text-[9px] font-mono tracking-widest uppercase mt-1">Lógica, Estructura & Ingeniería</p>
            </div>
          </div>
        </div>

        <div className="absolute top-8 right-8 z-20 pointer-events-none hidden md:block text-right">
          <div className="flex items-center justify-end space-x-3 opacity-80">
            <div>
              <h3 className="text-brand-orange font-serif italic text-sm tracking-[0.2em] shadow-brand-orange drop-shadow-md">Hemisferio Derecho</h3>
              <p className="text-white/40 text-[9px] font-mono tracking-widest uppercase mt-1">Creatividad, Intuición & Caos Fértil</p>
            </div>
            <div className="w-16 h-[1px] bg-brand-orange/50"></div>
          </div>
        </div>

        {/* CANVAS 3D */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 16], fov: 60 }} dpr={[1, 2]}>
            <color attach="background" args={['#020202']} />
            <BackgroundParticles />
            <ForegroundNetwork scrollRef={scrollRef} mouseXRef={mouseXRef} instructionRef={instructionRef} />
          </Canvas>
        </div>

        {/* TEXTURAS */}
        <div 
          className="absolute inset-0 pointer-events-none z-10 opacity-[0.05] mix-blend-screen"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        ></div>
        <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_200px_rgba(0,0,0,0.95)]"></div>

        {/* INSTRUCCIÓN DE SCROLL */}
        <div 
          ref={instructionRef}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none"
        >
           <div className="animate-bounce border border-white/20 bg-black/50 backdrop-blur-md px-6 py-2 rounded-full">
             <span className="text-white/60 text-[10px] md:text-xs uppercase tracking-[0.2em]">↓ Desplázate para mapear la red ↓</span>
           </div>
        </div>

      </div>
    </section>
  );
}
