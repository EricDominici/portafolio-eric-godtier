'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const eras = [
  {
    year: "2021",
    title: "LOS FUNDAMENTOS",
    desc: "Bases sólidas y construcción algorítmica desde cero.",
    tech: "React, Algorithms, Frontend",
    color: "text-brand-magenta",
    borderColor: "border-brand-magenta"
  },
  {
    year: "2023",
    title: "FULL-STACK",
    desc: "Transición a arquitecturas backend con Python y despliegues web masivos.",
    tech: "Python, Backend, Full-Stack",
    color: "text-brand-orange",
    borderColor: "border-brand-orange"
  },
  {
    year: "2024",
    title: "ARQUITECTURAS MASIVAS",
    desc: "Construcción de sistemas institucionales, intranets y dashboards financieros.",
    tech: "TypeScript, Next.js, Node",
    color: "text-brand-cyan",
    borderColor: "border-brand-cyan"
  },
  {
    year: "PRESENTE",
    title: "ARQUITECTO DE REALIDADES",
    desc: "Dominio absoluto de la integración técnica y narrativa visual. Creador de ecosistemas digitales completos.",
    tech: "Systems Architecture, PM, 3D",
    color: "text-white",
    borderColor: "border-white"
  }
];

export default function TimelineDOM() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform the vertical scroll (0 to 1) into a horizontal translation.
  // We have 4 items, so we want to slide horizontally across them.
  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={containerRef} className="relative h-[400vh] w-full bg-black">
      {/* Sticky container that stays in view while we scroll down */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        
        {/* Title layer */}
        <div className="absolute top-16 left-8 md:left-24 z-10 mix-blend-difference">
          <p className="text-brand-cyan font-mono tracking-widest uppercase text-xs md:text-sm mb-2">
            [ Crecimiento mediante la Disonancia ]
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter">
            La Arquitectura<br/>del Tiempo.
          </h2>
        </div>

        {/* Horizontal scroll track */}
        <motion.div 
          style={{ x: xTransform }}
          className="flex w-[400vw] h-[60vh] md:h-[70vh] items-center"
        >
          {eras.map((era, index) => (
            <div 
              key={index} 
              className="w-[100vw] h-full flex flex-col justify-center px-8 md:px-24 flex-shrink-0"
            >
              <div className={`relative border-l-4 ${era.borderColor} pl-8 md:pl-16 py-12 max-w-4xl group`}>
                {/* Background Noise / Texture (optional) */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                {/* Massive Typography */}
                <h3 className={`text-7xl md:text-[12rem] leading-none font-black tracking-tighter mb-4 ${era.color} opacity-90 mix-blend-screen`}>
                  {era.year}
                </h3>
                
                <h4 className="text-2xl md:text-4xl font-serif text-white mb-6 uppercase tracking-tight">
                  {era.title}
                </h4>
                
                <p className="text-lg md:text-2xl text-white/60 font-serif leading-relaxed mb-8 max-w-2xl">
                  {era.desc}
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="h-[1px] w-12 bg-brand-cyan/50" />
                  <span className="font-mono text-xs md:text-sm text-brand-cyan tracking-widest uppercase">
                    {era.tech}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Progress Bar indicator */}
        <div className="absolute bottom-16 left-8 md:left-24 right-8 md:right-24 h-[1px] bg-white/20">
          <motion.div 
            style={{ scaleX: scrollYProgress, transformOrigin: "left" }} 
            className="h-full bg-brand-cyan"
          />
        </div>

      </div>
    </section>
  );
}
