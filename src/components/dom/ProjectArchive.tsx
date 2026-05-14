'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Datos extraídos del PRD
const ALL_PROJECTS = [
  { year: "2024", name: "MOPC Portal", role: "Arquitecto / PM", sector: "Público", tech: "React, Strapi, Looker", impact: "-20% Tiempo Dev" },
  { year: "2024", name: "DataHub Judicial", role: "PM / Data Eng", sector: "Público", tech: "Python, Power BI", impact: "Cero cuellos botella" },
  { year: "2024", name: "ADN Residuos", role: "Scrum Master", sector: "Público", tech: "AppSheet", impact: "Digitalización" },
  { year: "2024", name: "MOPC Cubicación", role: "Product Manager", sector: "Público", tech: "Angular, Spring", impact: "Doc AI Automático" },
  { year: "2023", name: "Citi Bot DUSA", role: "Arquitecto AI", sector: "ONG", tech: "Dialogflow, Node", impact: "Stress Test Pasado" },
  { year: "2023", name: "CitizenAudit", role: "Data Architect", sector: "ONG", tech: "Python, NLP", impact: "0 Pérdida Datos" },
  { year: "2023", name: "CONEP ETL", role: "Data Engineer", sector: "ONG", tech: "Python, Cloud", impact: "Ahorro Costos" },
  { year: "2023", name: "CONEP Prácticas", role: "Scrum Master", sector: "ONG", tech: "Next.js", impact: "Hard Deadline Hit" },
  { year: "2023", name: "LXP Plataforma", role: "Product Owner", sector: "Educación", tech: "Node, React", impact: "+30% Eficiencia" },
  { year: "2023", name: "Salome AI", role: "Creador", sector: "Educación", tech: "GenAI", impact: "MVP a tiempo" },
  { year: "2024", name: "IPL Intranet", role: "Architect / Dev", sector: "Educación", tech: "Next.js 15, Strapi 5", impact: "Modularidad" },
  { year: "2023", name: "Radar X CIC", role: "Data Lead", sector: "Educación", tech: "Tableau", impact: "Analítica" },
  { year: "2023", name: "Doc AI Expedientes", role: "Ingeniero", sector: "Educación", tech: "Python, OCR", impact: "-50% Búsqueda" },
  { year: "2024", name: "Fidu-Doc", role: "Developer", sector: "Privado", tech: "Python ETL", impact: "-45min/doc" },
  { year: "2023", name: "Club del 10%", role: "Creator", sector: "Startups", tech: "React Native", impact: "Gamificación" },
  { year: "2024", name: "TalentFlow", role: "Creator", sector: "Startups", tech: "Next.js", impact: "Ecosistema" },
  { year: "2022", name: "TrafU Algo", role: "Quant Dev", sector: "Personal", tech: "Python Math", impact: "Automatización" },
  { year: "2024", name: "PTD Cincinnatus", role: "Agile Coach", sector: "Liderazgo", tech: "Jira, SDLC", impact: "100% Inserción" }
];

const CATEGORIES = ["Todos", "Público", "ONG", "Educación", "Privado", "Startups", "Personal", "Liderazgo"];

export default function ProjectArchive() {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filteredProjects = activeFilter === "Todos" 
    ? ALL_PROJECTS 
    : ALL_PROJECTS.filter(p => p.sector === activeFilter);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 mt-32 mb-32 relative z-10 font-mono">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-white/20 pb-4">
        <div>
          <h2 className="text-3xl text-white uppercase tracking-tighter">[ El Archivo ]</h2>
          <p className="text-white/50 text-sm mt-2">Registro de operaciones tácticas y despliegues técnicos.</p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0 justify-end">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`text-xs px-3 py-1 border transition-colors ${activeFilter === cat ? 'border-brand-cyan text-brand-cyan' : 'border-white/10 text-white/40 hover:text-white hover:border-white/50'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Ledger Table */}
      <div className="overflow-x-auto border border-white/10 bg-[#050505] p-1 shadow-2xl">
        <table className="w-full text-left text-sm text-brand-cyan/70 font-mono">
          <thead className="text-xs text-brand-magenta border-b border-white/20 bg-white/5 uppercase tracking-widest">
            <tr>
              <th className="py-4 px-4 font-bold">[AÑO]</th>
              <th className="py-4 px-4 font-bold">[SISTEMA / PROYECTO]</th>
              <th className="py-4 px-4 font-bold">[ROL PRIMARIO]</th>
              <th className="py-4 px-4 font-bold">[STACK / TECH]</th>
              <th className="py-4 px-4 font-bold text-right">[IMPACTO CORE]</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((p, i) => (
              <motion.tr 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
                className="border-b border-white/5 hover:bg-brand-cyan/10 transition-colors group cursor-crosshair"
              >
                <td className="py-4 px-4 text-white/30 group-hover:text-white transition-colors">{p.year}</td>
                <td className="py-4 px-4 text-white font-bold group-hover:text-brand-cyan group-hover:tracking-wider transition-all">{p.name}</td>
                <td className="py-4 px-4 text-white/80">{p.role}</td>
                <td className="py-4 px-4 text-brand-magenta/60 group-hover:text-brand-magenta transition-colors">{p.tech}</td>
                <td className="py-4 px-4 text-right text-brand-orange font-bold drop-shadow-[0_0_8px_rgba(255,90,0,0.8)]">{p.impact}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {filteredProjects.length === 0 && (
          <div className="w-full text-center py-12 text-red-500 font-mono animate-pulse uppercase">
            [ ERROR: NO DATA FOUND IN MAINFRAME ]
          </div>
        )}
      </div>
    </div>
  );
}
