'use client';
import { motion } from 'framer-motion';

export default function EssaysClient({ posts }: { posts: any[] }) {
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
            Transmisiones desde el<br/>
            <span className="text-brand-orange italic">Substack.</span>
          </h2>
          <a href="https://ericdominici18.substack.com" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-brand-magenta hover:text-white font-mono text-sm uppercase tracking-widest transition-colors duration-300">
            [ Suscribirse a la red ]
          </a>
        </div>

        <div className="space-y-12 text-left">
          {posts.map((post, i) => (
            <a key={i} href={post.link} target="_blank" rel="noopener noreferrer" className="block group">
              <article className="border-l-2 border-white/20 pl-8 group-hover:border-brand-cyan transition-colors duration-500">
                <span className="text-brand-cyan/60 font-mono text-xs mb-2 block">{post.pubDate}</span>
                <h3 className="text-2xl text-white font-bold mb-4 group-hover:text-brand-cyan transition-colors">{post.title}</h3>
                <p className="text-lg text-white/60 leading-relaxed font-serif line-clamp-3">
                  {post.contentSnippet}
                </p>
                <span className="text-brand-cyan font-mono text-xs mt-4 inline-block opacity-0 group-hover:opacity-100 transition-opacity">LEER MÁS -{'>'}</span>
              </article>
            </a>
          ))}
          {posts.length === 0 && (
            <p className="text-white/40 font-mono text-center">Iniciando conexión neuronal con Substack... (No se encontraron artículos)</p>
          )}
        </div>
      </div>
    </motion.section>
  );
}
