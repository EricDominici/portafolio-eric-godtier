import Scene from '@/components/canvas/Scene';
import ProjectList from '@/components/dom/ProjectList';
import MagneticButton from '@/components/dom/MagneticButton';
import ScrambleText from '@/components/dom/ScrambleText';
import ProjectArchive from '@/components/dom/ProjectArchive';
import CreatorConsole from '@/components/dom/CreatorConsole';
import Essays from '@/components/dom/Essays';
import SkillCloud from '@/components/dom/SkillCloud';
import ContactTerminal from '@/components/dom/ContactTerminal';

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
        
        {/* ABOUT (Máscara de Monet) */}
        <section className="min-h-[200vh] w-full pointer-events-none flex flex-col items-center justify-center pt-32">
            <div className="max-w-4xl mx-auto px-8 pointer-events-auto mix-blend-difference text-center">
              <h2 className="text-4xl md:text-7xl font-bold text-white mb-8">La forma sigue<br/><span className="text-brand-magenta italic">al contenido.</span></h2>
              <p className="text-xl md:text-3xl text-white/80 font-sans leading-relaxed">
                Transformando el caos técnico y operativo en flujos ágiles y precisos. El orden no se descubre, se construye.
              </p>
              
              {/* Stack Cloud */}
              <SkillCloud />
            </div>
        </section>

        {/* CREADOR CONSOLE (Split Screen) */}
        <CreatorConsole />

        {/* TIMELINE (El Laberinto Z-Axis) */}
        <section className="h-[300vh] w-full pointer-events-none flex flex-col items-center justify-center relative">
            <div className="sticky top-1/2 -translate-y-1/2 text-center mix-blend-difference pointer-events-auto">
                <p className="text-brand-cyan font-mono tracking-widest uppercase text-sm mb-4">Crecimiento mediante la Disonancia</p>
                <h2 className="text-3xl md:text-5xl font-bold text-white uppercase">El Laberinto</h2>
            </div>
        </section>

        {/* PROYECTOS (Fuego Insubordinado) */}
        <section className="w-full pointer-events-none flex flex-col items-center justify-center relative bg-black/50 backdrop-blur-sm pt-32">
            <div className="w-full max-w-6xl mx-auto px-8 pointer-events-auto mb-32">
                <h2 className="text-4xl md:text-7xl font-bold text-white mb-24 mix-blend-difference">Casos de <span className="text-brand-orange italic">Estudio.</span></h2>
                <ProjectList />
            </div>
            
            {/* THE ARCHIVE (28+ Proyectos) */}
            <div className="w-full pointer-events-auto bg-black border-t border-white/10">
              <ProjectArchive />
            </div>
        </section>

        {/* CORRIENTE DE CONSCIENCIA (Ensayos) */}
        <Essays />

        {/* CONTACTO (El Vínculo No Desechable) */}
        <ContactTerminal />

      </div>
    </main>
  );
}
