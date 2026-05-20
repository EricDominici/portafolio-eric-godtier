'use client';

import { motion } from 'framer-motion';

const SKILL_CATEGORIES = [
  {
    title: 'Ingeniería & Software',
    color: 'border-brand-cyan/30',
    headerColor: 'text-brand-cyan',
    skills: ['React 19', 'Next.js 15', 'TypeScript', 'Node.js', 'Python', 'TailwindCSS', 'Zustand', 'GraphQL', 'REST APIs', 'PostgreSQL', 'Framer Motion', 'Three.js']
  },
  {
    title: 'Gestión & Producto',
    color: 'border-brand-orange/30',
    headerColor: 'text-brand-orange',
    skills: ['Scrum a Escala', 'Agile Coach', 'Kanban', 'Product Discovery', 'Design Thinking', 'OKRs', 'KPIs', 'Jira', 'Métricas de Flujo', 'Liderazgo Técnico', 'Gestión de Equipos']
  },
  {
    title: 'Datos & IA',
    color: 'border-brand-magenta/30',
    headerColor: 'text-brand-magenta',
    skills: ['Machine Learning', 'LLMs', 'Prompt Engineering', 'TensorFlow', 'ETL Pipelines', 'Data Analysis', 'LangChain', 'Sistemas de Recomendación']
  },
  {
    title: 'Infra & Prácticas',
    color: 'border-white/20',
    headerColor: 'text-white/80',
    skills: ['Docker', 'AWS', 'Vercel', 'CI/CD', 'GitFlow', 'Clean Code', 'SOLID', 'Arquitectura Cloud', 'Sistemas Distribuidos', 'Microservicios', 'Performance', 'Web Vitals']
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

export default function TechBento() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 md:p-8"
    >
      {SKILL_CATEGORIES.map((category, idx) => (
        <motion.div
          key={idx}
          variants={itemVariants}
          className={`
            relative overflow-hidden rounded-2xl bg-[#0a0a0a] backdrop-blur-md 
            border ${category.color} p-6 md:p-8
            hover:bg-[#111] transition-colors duration-500
            group flex flex-col h-full
          `}
        >
          {/* Subtle background glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <h3 className={`text-xl font-mono uppercase tracking-widest font-bold mb-6 ${category.headerColor}`}>
            {category.title}
          </h3>
          
          <div className="flex flex-wrap gap-2 relative z-10 mt-auto">
            {category.skills.map((skill, i) => (
              <span 
                key={i}
                className="
                  px-3 py-1.5 text-xs md:text-sm font-sans font-medium text-white/70 
                  bg-white/5 border border-white/10 rounded-full
                  hover:text-white hover:bg-white/20 hover:border-white/30 
                  hover:scale-105 transition-all duration-300 cursor-default
                "
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
