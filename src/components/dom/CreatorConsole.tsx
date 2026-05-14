'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export default function CreatorConsole() {
  const [terminalText, setTerminalText] = useState("");
  const consoleRef = useRef(null);
  const isInView = useInView(consoleRef, { once: true, margin: "-100px" });

  const codeSnippet = `> Initializing TrafU Quantitative Algorithm...
> Establishing neural link to PostgreSQL DB...
> Loading TensorFlow models... [OK]
> Bypassing rate limits... [OK]
> Running ETL pipeline for Fiduciaria Reservas...
> Data normalized. 45 min saved per document.
> System Ready. Awaiting commands..._`;

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const interval = setInterval(() => {
      setTerminalText(codeSnippet.substring(0, i));
      i++;
      if (i > codeSnippet.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [isInView, codeSnippet]);

  return (
    <section ref={consoleRef} className="min-h-screen w-full bg-[#0a0a0a] relative z-20 pointer-events-auto border-y border-white/10 flex flex-col md:flex-row">
      
      {/* HEMISFERIO IZQUIERDO: EL INGENIERO (Terminal) */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10 bg-black z-10">
        <div className="mb-8">
          <p className="text-brand-cyan font-mono text-xs tracking-widest uppercase mb-2">[ Hemisferio Izquierdo ]</p>
          <h2 className="text-4xl font-bold text-white tracking-tighter">El Ingeniero.</h2>
          <p className="text-white/50 mt-4 text-sm max-w-sm">Algoritmos cuantitativos, arquitecturas escalables y automatización despiadada.</p>
        </div>
        
        {/* Terminal Window */}
        <div className="w-full h-64 bg-[#111] rounded-lg border border-white/10 p-4 font-mono text-sm text-green-500 overflow-hidden shadow-2xl relative">
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <pre className="whitespace-pre-wrap">{terminalText}</pre>
        </div>
      </div>

      {/* HEMISFERIO DERECHO: EL DISEÑADOR (Bento Box) */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-black z-10">
        <div className="mb-8 text-right">
          <p className="text-brand-magenta font-mono text-xs tracking-widest uppercase mb-2">[ Hemisferio Derecho ]</p>
          <h2 className="text-4xl font-bold text-white tracking-tighter">El Diseñador.</h2>
          <p className="text-white/50 mt-4 text-sm max-w-sm ml-auto">Interfaces paramétricas, Glassmorphism y experiencias centradas en la disonancia psicológica.</p>
        </div>
        
        {/* Bento Grid */}
        <div className="grid grid-cols-2 gap-4 h-64">
          <div 
            className="col-span-1 row-span-2 rounded-2xl border border-white/10 p-4 flex flex-col justify-end hover:scale-[1.02] transition-transform cursor-crosshair relative overflow-hidden group"
            style={{ backgroundImage: `url('/talentflow_mockup_1778733362032.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-500"></div>
            <div className="relative z-10">
              <h3 className="text-white font-bold drop-shadow-lg">TalentFlow UI</h3>
              <p className="text-white/80 text-xs font-mono">Ecosistema Web</p>
            </div>
          </div>
          <div 
            className="col-span-1 row-span-1 rounded-2xl border border-white/10 p-4 flex flex-col justify-end hover:scale-[1.02] transition-transform cursor-crosshair relative overflow-hidden group"
            style={{ backgroundImage: `url('/club10_mockup_1778733378300.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-brand-cyan/20 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-500"></div>
            <div className="relative z-10">
              <h3 className="text-white font-bold text-sm drop-shadow-lg">Club del 10%</h3>
              <p className="text-white/80 text-xs font-mono">Gamificación</p>
            </div>
          </div>
          <div 
            className="col-span-1 row-span-1 rounded-2xl border border-white/10 p-4 flex flex-col justify-end hover:scale-[1.02] transition-transform cursor-crosshair relative overflow-hidden group"
            style={{ backgroundImage: `url('/ptd_mockup_1778733423203.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-brand-orange/20 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-500"></div>
            <div className="relative z-10">
              <h3 className="text-white font-bold text-sm drop-shadow-lg">PTD Panel</h3>
              <p className="text-white/80 text-xs font-mono">Dashboard</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
