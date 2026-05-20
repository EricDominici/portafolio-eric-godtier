'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ASSET_LEDGER = [
  {
    id: "01",
    title: "Producto & Orquestación",
    roles: ["Product Manager", "Product Owner", "Agile Coach", "Scrum Master"],
    stack: ["Jira", "Confluence", "Miro", "Figma", "SDLC Tools"],
    capabilities: ["Scrum a Escala", "Kanban", "Product Discovery", "Design Thinking", "OKRs & KPIs", "Métricas de Flujo"],
    validation: [
      "Software Product Management Capstone (U of Alberta)",
      "Agile Planning for Software Products (U of Alberta)",
      "Software Processes and Agile Practices (U of Alberta)",
      "Reviews & Metrics for Software Improvements (U of Alberta)",
      "Client Needs and Software Requirements (U of Alberta)",
      "Intro to Software Product Management (U of Alberta)"
    ],
    color: "text-brand-orange"
  },
  {
    id: "02",
    title: "Ingeniería & Arquitectura",
    roles: ["Arquitecto de Software", "Data Engineer", "Quant Dev"],
    stack: ["Python", "Node.js", "PostgreSQL", "Docker", "AWS", "GraphQL", "REST APIs"],
    capabilities: ["ETL Pipelines", "Arquitectura Cloud", "Microservicios", "Sistemas Distribuidos", "Mitigación de Riesgos", "Automatización Cuantitativa"],
    validation: [
      "JavaScript Algorithms & Data Structures (freeCodeCamp)",
      "Auditoría de 15 años de datos IRS (0 Pérdida)",
      "Diseño Algorítmico y Matemático"
    ],
    color: "text-green-500"
  },
  {
    id: "03",
    title: "Inteligencia & Lógica",
    roles: ["Arquitecto AI", "ML Engineer"],
    stack: ["TensorFlow", "LangChain", "Dialogflow CX", "Python"],
    capabilities: ["Modelos LLM", "Prompt Engineering", "Sistemas de Recomendación", "IA Conversacional", "Análisis Predictivo"],
    validation: [
      "Stress Testing superado en Chatbots Bancarios",
      "Implementación de Modelos GenAI en Producción"
    ],
    color: "text-brand-magenta"
  },
  {
    id: "04",
    title: "Interfaz & Experiencia",
    roles: ["Frontend Engineer", "UI/UX Designer"],
    stack: ["React 19", "Next.js 15", "TypeScript", "TailwindCSS", "Zustand"],
    capabilities: ["Glassmorphism", "Interfaces Paramétricas", "State Management", "Framer Motion", "Three.js", "WebGL", "GSAP"],
    validation: [
      "Sistemas de Diseño Escalables",
      "Desarrollo de Experiencias 3D y Alta Fidelidad",
      "Optimización Estricta de Web Vitals"
    ],
    color: "text-brand-cyan"
  }
];

export default function TechBento() {
  // Inicialmente expandimos el primer acordeón
  const [expandedId, setExpandedId] = useState<string | null>("01");

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
      <div className="flex flex-col border-t border-white/20">
        {ASSET_LEDGER.map((asset) => {
          const isExpanded = expandedId === asset.id;

          return (
            <div key={asset.id} className="border-b border-white/20">
              {/* Accordion Header */}
              <button
                onClick={() => toggleAccordion(asset.id)}
                className="w-full flex items-center justify-between py-6 md:py-8 text-left group focus:outline-none focus:bg-white/5 transition-colors cursor-crosshair"
              >
                <div className="flex items-center gap-6 md:gap-12">
                  <span className={`font-mono text-xl md:text-3xl font-bold transition-colors ${isExpanded ? asset.color : 'text-white/30 group-hover:text-white/50'}`}>
                    [{asset.id}]
                  </span>
                  <h3 className={`text-2xl md:text-5xl font-bold uppercase tracking-tighter transition-colors ${isExpanded ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                    {asset.title}
                  </h3>
                </div>
                <div className="flex items-center justify-center w-12 h-12 shrink-0">
                  <motion.div
                    animate={{ rotate: isExpanded ? 45 : 0 }}
                    className={`text-2xl font-mono transition-colors ${isExpanded ? asset.color : 'text-white/40 group-hover:text-white'}`}
                  >
                    +
                  </motion.div>
                </div>
              </button>

              {/* Accordion Content */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2 pb-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 border border-white/10 bg-black/50 backdrop-blur-sm p-6 md:p-8">
                        
                        {/* ROLES */}
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-4 border-b border-white/10 pb-2">
                            [ Roles_Capaces ]
                          </p>
                          <ul className="flex flex-col gap-2">
                            {asset.roles.map((role, i) => (
                              <li key={i} className="text-sm font-sans text-white/90 flex items-start gap-2">
                                <span className={`font-mono text-xs mt-0.5 ${asset.color}`}>›</span> {role}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* STACK */}
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-4 border-b border-white/10 pb-2">
                            [ Stack_Operativo ]
                          </p>
                          <ul className="flex flex-col gap-2">
                            {asset.stack.map((item, i) => (
                              <li key={i} className="text-sm font-sans text-white/70 flex items-start gap-2">
                                <span className="font-mono text-xs text-white/20 mt-0.5">-</span> {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* CAPACIDADES */}
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-4 border-b border-white/10 pb-2">
                            [ Capacidades_Core ]
                          </p>
                          <ul className="flex flex-col gap-2">
                            {asset.capabilities.map((cap, i) => (
                              <li key={i} className="text-sm font-sans text-white/90 flex items-start gap-2">
                                <span className={`font-mono text-xs mt-0.5 ${asset.color}`}>›</span> {cap}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* VALIDACIÓN */}
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-4 border-b border-white/10 pb-2">
                            [ Validación_Formal ]
                          </p>
                          <ul className="flex flex-col gap-3">
                            {asset.validation.map((val, i) => (
                              <li key={i} className="text-xs font-mono leading-relaxed text-white/60 flex items-start gap-2">
                                <span className="text-white/20 mt-0.5">■</span> {val}
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
