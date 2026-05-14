'use client';

import { useStore } from '@/store/useStore';

const projects = [
  { id: 1, name: 'CitizenAudit', desc: '15 años de datos IRS · Migración · Mitigación de Riesgo', color: 'hover:text-brand-orange' },
  { id: 2, name: 'DataHub Judicial', desc: 'Arquitectura de Datos · Python · Power BI · Kanban', color: 'hover:text-brand-cyan' },
  { id: 3, name: 'Citi Bot DUSA', desc: 'IA Conversacional · Dialogflow CX · Node.js · ROI', color: 'hover:text-brand-magenta' },
  { id: 4, name: 'Salome AI & TalentFlow', desc: 'Plataformas de Crecimiento · Next.js · Mentoría', color: 'hover:text-white' },
];

export default function ProjectList() {
  const setActiveProject = useStore((state) => state.setActiveProject);

  return (
    <div className="flex flex-col gap-12 w-full max-w-5xl mx-auto px-4">
      {projects.map((proj) => (
        <div 
          key={proj.id}
          tabIndex={0}
          role="button"
          aria-label={`Ver detalles del proyecto ${proj.name}`}
          className="group border-b border-white/20 pb-8 cursor-crosshair focus:outline-none focus:border-brand-orange"
          onMouseEnter={() => setActiveProject(proj.id)}
          onMouseLeave={() => setActiveProject(null)}
          onFocus={() => setActiveProject(proj.id)}
          onBlur={() => setActiveProject(null)}
        >
          <h3 className={`text-4xl md:text-7xl text-white ${proj.color} transition-colors duration-500 uppercase tracking-tighter`}>
            {proj.id}. {proj.name}
          </h3>
          <p className="font-mono text-white/50 mt-4 text-lg group-hover:text-white transition-colors duration-500">
            {proj.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
