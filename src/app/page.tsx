import Scene from '@/components/canvas/Scene';
import MagneticButton from '@/components/dom/MagneticButton';
import ScrambleText from '@/components/dom/ScrambleText';
import ProjectArchive from '@/components/dom/ProjectArchive';
import CreatorConsole from '@/components/dom/CreatorConsole';
import Essays from '@/components/dom/Essays';
import TechBento from '@/components/dom/TechBento';
import ContactTerminal from '@/components/dom/ContactTerminal';
import TimelineDOM from '@/components/dom/TimelineDOM';

export default function Home() {
  return (
    <main className="relative w-full selection:bg-brand-orange selection:text-white">
      {/* 3D Global Scene (Underlay) */}
      <Scene />

      {/* DOM Overlay (Z-index 10) */}
      <div className="relative z-10 w-full">
        
        {/* HERO SECTION */}
        <section className="h-[200vh] w-full flex flex-col items-center justify-start pt-[30vh] pointer-events-none">
          <div className="text-center mix-blend-difference pointer-events-auto px-4">
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white uppercase leading-[0.9]">
              Eric <br className="md:hidden" />Dominici
            </h1>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="h-[1px] w-12 bg-brand-cyan hidden md:block"></div>
              <p className="text-lg md:text-2xl uppercase text-brand-cyan">
                <ScrambleText />
              </p>
              <div className="h-[1px] w-12 bg-brand-cyan hidden md:block"></div>
            </div>
            {/* Hard Metrics Impact */}
            <div className="mt-8 flex justify-center gap-8 font-mono text-xs md:text-sm text-white/50 tracking-widest">
                <span>[ 28+ PROYECTOS ]</span>
                <span>[ 4+ ROLES ]</span>
                <span>[ 3+ AÑOS IMPACTO ]</span>
            </div>
          </div>
          
          <div className="absolute top-[80vh] flex flex-col items-center gap-2 pointer-events-auto mix-blend-difference">
            <p className="font-mono text-xs text-white/50 uppercase tracking-widest">Desciende al laberinto</p>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
          </div>
        </section>
        
        {/* INVENTARIO DE ACTIVOS (Tech Specs) */}
        <section className="min-h-screen w-full relative pointer-events-auto bg-[#050505] py-32 z-20 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-8 mb-16">
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8">
                <div>
                  <h2 className="text-4xl md:text-7xl font-bold text-white uppercase tracking-tighter leading-none mb-2">
                    Especificaciones<br/>
                    <span className="text-white/30 italic font-mono text-2xl md:text-5xl tracking-normal">del sistema.</span>
                  </h2>
                </div>
                <p className="text-sm md:text-base text-white/50 font-mono mt-6 md:mt-0 max-w-sm text-left md:text-right border-l md:border-l-0 md:border-r border-brand-cyan/50 pl-4 md:pl-0 md:pr-4">
                  Inventario exhaustivo de activos operativos, capacidades de ingeniería y validación formal.
                </p>
              </div>
            </div>
            
            <TechBento />
        </section>

        {/* CREADOR CONSOLE (Split Screen) */}
        <CreatorConsole />

        {/* TIMELINE (El Laberinto Horizontal) */}
        <TimelineDOM />
        {/* THE ARCHIVE (28+ Proyectos) */}
        <section className="w-full pointer-events-auto bg-black border-t border-white/10">
          <ProjectArchive />
        </section>

        {/* CORRIENTE DE CONSCIENCIA (Ensayos) */}
        <Essays />

        {/* CONTACTO (El Vínculo No Desechable) */}
        <ContactTerminal />

      </div>
    </main>
  );
}
