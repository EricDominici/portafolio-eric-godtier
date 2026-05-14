'use client';

import { motion } from 'framer-motion';

const CERTIFICATIONS = [
  { name: "Agile Planning for Software Products", issuer: "University of Alberta", url: "https://coursera.org/share/10905fe2276e1ff98ff7dbaed6e631e8" },
  { name: "Reviews & Metrics for Software Improvements", issuer: "University of Alberta", url: "https://coursera.org/share/9dd161fb494137f2a92a9e03ddd23308" },
  { name: "Client Needs and Software Requirements", issuer: "University of Alberta", url: "https://coursera.org/share/13fd3638dd6e9e1209f9bf3a0d3670e0" },
  { name: "JavaScript Algorithms & Data Structures", issuer: "freeCodeCamp", url: "https://www.freecodecamp.org/certification/fccf5582527-cf4f-480a-8445-3bbaf1a2767a/javascript-algorithms-and-data-structures-v8" },
  { name: "Software Processes and Agile Practices", issuer: "University of Alberta", url: "https://coursera.org/share/778deea64af0f2d59c9e97fcddd6512e" },
  { name: "Introduction to Software Product Management", issuer: "University of Alberta", url: "https://coursera.org/share/db127aa20fa22c3dac51ba0f63f08a72" },
  { name: "Software Product Management Capstone", issuer: "University of Alberta", url: "https://coursera.org/share/3c8e5f27521412c111c3f7818271f7ce" }
];

export default function ContactTerminal() {
  return (
    <section className="relative min-h-screen w-full bg-[#030303] z-20 pointer-events-auto flex flex-col justify-center items-center overflow-hidden border-t border-white/10 p-8 md:p-24">
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-10" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-24">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-brand-magenta font-mono text-sm tracking-[0.3em] uppercase mb-4">[ El Vínculo No Desechable ]</p>
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mix-blend-difference">CONTACTO.</h2>
        </motion.div>

        {/* Social Links Brutalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {[
            { label: 'LinkedIn', url: 'https://www.linkedin.com/in/eric-dominici-7643791a9/', color: 'hover:text-brand-cyan' },
            { label: 'GitHub', url: 'https://github.com/ericd', color: 'hover:text-white' },
            { label: 'Email', url: 'mailto:ericdominici54@gmail.com', color: 'hover:text-brand-magenta' },
            { label: 'WhatsApp', url: 'https://wa.me/18298576561', color: 'hover:text-brand-orange' }
          ].map((link, i) => (
            <motion.a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`group flex flex-col items-center justify-center p-8 border border-white/10 bg-black/50 backdrop-blur-md transition-all duration-500 hover:bg-white/5 cursor-crosshair`}
            >
              <span className="text-white/30 font-mono text-xs mb-4">{"// " + link.label.toUpperCase()}</span>
              <span className={`text-2xl md:text-3xl font-bold text-white transition-colors duration-300 ${link.color}`}>
                {link.label}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Certifications Array */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full mt-12"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] bg-white/20 flex-grow"></div>
            <p className="text-white/40 font-mono text-xs tracking-widest uppercase">Validación Formal</p>
            <div className="h-[1px] bg-white/20 flex-grow"></div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {CERTIFICATIONS.map((cert, i) => (
              <a 
                key={i} 
                href={cert.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 border border-white/10 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-crosshair group"
              >
                <div className="w-2 h-2 rounded-full bg-brand-cyan group-hover:bg-brand-magenta transition-colors shadow-[0_0_8px_rgba(0,255,255,0.5)]"></div>
                <div className="flex flex-col">
                  <span className="text-white text-sm font-medium">{cert.name}</span>
                  <span className="text-white/40 text-xs font-mono">{cert.issuer}</span>
                </div>
              </a>
            ))}
            <div className="flex items-center gap-3 px-4 py-3 border border-white/5 rounded-full bg-transparent opacity-50">
              <span className="text-white/40 text-xs font-mono italic">+ Más certificaciones en LinkedIn</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
