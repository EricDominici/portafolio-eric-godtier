'use client';

import { useMemo } from 'react';

const MASSIVE_SKILLS = [
  // Core Frontend
  { name: 'Next.js 15', color: 'text-white' },
  { name: 'React 19', color: 'text-brand-cyan' },
  { name: 'TypeScript', color: 'text-white/80' },
  { name: 'TailwindCSS', color: 'text-brand-magenta' },
  { name: 'Framer Motion', color: 'text-brand-orange' },
  { name: 'Zustand', color: 'text-white/60' },
  { name: 'Three.js', color: 'text-brand-cyan' },
  { name: 'WebGL', color: 'text-white/40' },
  { name: 'GSAP', color: 'text-brand-orange' },
  
  // Backend & Architecture
  { name: 'Python', color: 'text-white' },
  { name: 'Node.js', color: 'text-brand-cyan' },
  { name: 'PostgreSQL', color: 'text-brand-magenta' },
  { name: 'Docker', color: 'text-white/70' },
  { name: 'Microservicios', color: 'text-brand-orange' },
  { name: 'Sistemas Distribuidos', color: 'text-white/50' },
  { name: 'GraphQL', color: 'text-brand-cyan' },
  { name: 'REST APIs', color: 'text-white/60' },
  { name: 'Arquitectura Cloud', color: 'text-brand-magenta' },
  { name: 'CI/CD', color: 'text-white/40' },
  
  // Data & AI
  { name: 'TensorFlow', color: 'text-brand-cyan' },
  { name: 'Machine Learning', color: 'text-white/80' },
  { name: 'LLMs', color: 'text-brand-orange' },
  { name: 'Prompt Engineering', color: 'text-white/70' },
  { name: 'ETL Pipelines', color: 'text-brand-magenta' },
  { name: 'Data Analysis', color: 'text-white/50' },

  // Agile & Management
  { name: 'Scrum a Escala', color: 'text-white' },
  { name: 'Agile Coach', color: 'text-brand-orange' },
  { name: 'OKRs', color: 'text-brand-magenta' },
  { name: 'Kanban', color: 'text-white/90' },
  { name: 'Product Discovery', color: 'text-brand-cyan' },
  { name: 'Design Thinking', color: 'text-white/80' },
  { name: 'Gestión de Equipos', color: 'text-brand-orange' },
  { name: 'Liderazgo Técnico', color: 'text-white/70' },
  { name: 'Jira', color: 'text-brand-cyan' },
  { name: 'Métricas de Flujo', color: 'text-white/60' },
  { name: 'KPIs', color: 'text-brand-magenta' },

  // Tools & Practices
  { name: 'Figma', color: 'text-white/60' },
  { name: 'GitFlow', color: 'text-white/40' },
  { name: 'Clean Code', color: 'text-brand-cyan' },
  { name: 'SOLID', color: 'text-white/50' },
  { name: 'Performance', color: 'text-brand-orange' },
  { name: 'UX/UI', color: 'text-brand-magenta' },
  { name: 'Web Vitals', color: 'text-white/40' },
  { name: 'Strapi', color: 'text-white/30' },
  { name: 'Vercel', color: 'text-brand-cyan' },
  { name: 'AWS', color: 'text-brand-orange' },
];

export default function SkillCloud() {
  // Dividir las skills en 4 filas para las cintas
  const rows = useMemo(() => {
    const shuffled = [...MASSIVE_SKILLS].sort(() => Math.random() - 0.5);
    const itemsPerRow = Math.ceil(shuffled.length / 4);
    
    return [
      shuffled.slice(0, itemsPerRow),
      shuffled.slice(itemsPerRow, itemsPerRow * 2),
      shuffled.slice(itemsPerRow * 2, itemsPerRow * 3),
      shuffled.slice(itemsPerRow * 3)
    ];
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center pointer-events-none opacity-30 mix-blend-screen z-0">
      {/* Contenedor rotado */}
      <div className="flex flex-col justify-center gap-12 md:gap-20 w-[150vw] -rotate-[8deg] scale-110 translate-x-[-10vw]">
        
        {rows.map((row, rowIndex) => {
          // Alternar dirección: filas pares a la izquierda, impares a la derecha
          const isLeft = rowIndex % 2 === 0;
          const animationClass = isLeft ? 'animate-marquee-left' : 'animate-marquee-right';
          // Alternar velocidades ligeramente
          const duration = 40 + (rowIndex * 10); 
          
          return (
            <div key={rowIndex} className="relative flex overflow-hidden w-full select-none">
              <div 
                className={`flex whitespace-nowrap items-center ${animationClass}`}
                style={{ animationDuration: `${duration}s` }}
              >
                {/* Renderizar 3 veces para asegurar el loop perfecto sin cortes */}
                {[0, 1, 2].map((dup) => (
                  <div key={dup} className="flex items-center">
                    {row.map((skill, i) => (
                      <div 
                        key={`${dup}-${i}`} 
                        className={`
                          mx-8 md:mx-16 font-mono text-4xl md:text-7xl font-bold uppercase tracking-tighter
                          ${skill.color} opacity-80
                          transition-opacity duration-300
                        `}
                      >
                        {skill.name}
                        <span className="text-white/10 ml-16 md:ml-32">/</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-33.3333%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right linear infinite;
        }
      `}</style>
    </div>
  );
}

