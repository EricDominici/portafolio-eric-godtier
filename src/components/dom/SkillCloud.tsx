'use client';

import { useEffect, useState } from 'react';

const SKILLS = [
  { name: 'Next.js 15', color: 'text-white', size: 'text-2xl' },
  { name: 'Python', color: 'text-brand-cyan', size: 'text-xl' },
  { name: 'Scrum a Escala', color: 'text-brand-orange', size: 'text-3xl' },
  { name: 'WebGL', color: 'text-white/50', size: 'text-lg' },
  { name: 'PostgreSQL', color: 'text-brand-cyan', size: 'text-xl' },
  { name: 'OKRs', color: 'text-brand-magenta', size: 'text-2xl' },
  { name: 'Design Thinking', color: 'text-white/80', size: 'text-xl' },
  { name: 'TensorFlow', color: 'text-brand-cyan', size: 'text-sm' },
  { name: 'Agile Coach', color: 'text-brand-orange', size: 'text-2xl' },
  { name: 'React 19', color: 'text-white', size: 'text-xl' },
  { name: 'Strapi 5', color: 'text-white/60', size: 'text-lg' },
  { name: 'Kanban', color: 'text-brand-magenta', size: 'text-xl' },
  { name: 'Docker', color: 'text-brand-cyan', size: 'text-md' },
  { name: 'Figma', color: 'text-brand-magenta', size: 'text-xl' },
  { name: 'Jira', color: 'text-brand-orange', size: 'text-lg' },
  { name: 'CI/CD Pipelines', color: 'text-white/70', size: 'text-md' },
  { name: 'Three.js', color: 'text-white', size: 'text-xl' },
  { name: 'ETL Architecture', color: 'text-brand-cyan', size: 'text-lg' },
  { name: 'Product Discovery', color: 'text-brand-orange', size: 'text-xl' },
  { name: 'GitFlow', color: 'text-white/40', size: 'text-sm' },
  { name: 'Zustand', color: 'text-white/60', size: 'text-md' },
  { name: 'TailwindCSS', color: 'text-brand-cyan', size: 'text-lg' },
];

export default function SkillCloud() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full max-w-4xl mx-auto h-64 mt-16 overflow-hidden flex flex-wrap justify-center items-center gap-4 p-8">
      {SKILLS.map((skill, i) => {
        // Generar animaciones flotantes aleatorias en el cliente
        const delay = (Math.random() * 2).toFixed(2);
        const duration = (3 + Math.random() * 4).toFixed(2);
        
        return (
          <div 
            key={i}
            className={`${skill.size} ${skill.color} font-mono tracking-tighter cursor-crosshair hover:text-white transition-colors hover:scale-110 duration-300`}
            style={{
              animation: `float ${duration}s ease-in-out ${delay}s infinite alternate`
            }}
          >
            {skill.name}
          </div>
        );
      })}
      
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-15px) rotate(2deg); }
        }
      `}</style>
    </div>
  );
}
