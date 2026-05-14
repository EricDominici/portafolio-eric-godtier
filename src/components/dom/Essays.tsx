'use client';
import { motion } from 'framer-motion';

export default function Essays() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true, margin: "-200px" }}
      className="min-h-[150vh] w-full bg-black flex flex-col items-center justify-center py-32 px-4 relative z-20 pointer-events-auto border-t border-white/10"
    >
      <div className="max-w-3xl mx-auto text-center space-y-24">
        
        <div className="space-y-6">
          <p className="text-brand-cyan font-mono text-sm tracking-widest uppercase">[ Corriente de Consciencia ]</p>
          <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
            La Realidad no se descubre.<br/>
            <span className="text-brand-magenta italic">Se construye.</span>
          </h2>
        </div>

        <div className="space-y-12 text-left">
          <article className="border-l-2 border-white/20 pl-8 hover:border-brand-orange transition-colors duration-500">
            <h3 className="text-2xl text-white font-bold mb-4">Arquitecto de sí mismo</h3>
            <p className="text-lg text-white/60 leading-relaxed font-serif">
              El caos es el estado natural de la experiencia subjetiva, es la inercia social. El orden, por el contrario, es una arquitectura interna deliberada, un acto de rebeldía extraordinaria. Habitar el vacío no es una tragedia, es el cimiento para reconstruirse.
            </p>
          </article>

          <article className="border-l-2 border-white/20 pl-8 hover:border-brand-cyan transition-colors duration-500">
            <h3 className="text-2xl text-white font-bold mb-4">El Vínculo Desechable</h3>
            <p className="text-lg text-white/60 leading-relaxed font-serif">
              La tecnología nos ahoga en dopamina instantánea. Perfiles curados, rapidez de descarte. La verdadera disonancia ocurre cuando detienes el tiempo, cuando eliges arder en lugar de solo durar, cuando rechazas la superficialidad.
            </p>
          </article>

          <article className="border-l-2 border-white/20 pl-8 hover:border-brand-magenta transition-colors duration-500">
            <h3 className="text-2xl text-white font-bold mb-4">El Fuego Insubordinado</h3>
            <p className="text-lg text-white/60 leading-relaxed font-serif">
              No busco adaptarme al mundo; busco follármele la mente. Extraer ideas hasta la última gota. No pido permiso, insinúo, provoco y construyo mis propios colores.
            </p>
          </article>
        </div>

      </div>
    </motion.section>
  );
}
