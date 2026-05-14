'use client';

import { useState, useEffect } from 'react';

const ROLES = [
  "SOFTWARE ENGINEER",
  "PRODUCT MANAGER",
  "AGILE COACH",
  "SCRUM MASTER",
  "PRODUCT CREATOR",
  "ESCRITOR"
];

const CHARS = "!<>-_\\\\/[]{}—=+*^?#________";

export default function ScrambleText() {
  const [text, setText] = useState(ROLES[0]);
  
  useEffect(() => {
    let roleIndex = 0;
    let intervalId: NodeJS.Timeout;
    
    const scramble = () => {
      const nextRole = ROLES[(roleIndex + 1) % ROLES.length];
      let frame = 0;
      const maxFrames = 20; // 20 frames de desencriptación
      
      clearInterval(intervalId);
      
      intervalId = setInterval(() => {
        let output = "";
        for (let i = 0; i < nextRole.length; i++) {
          if (frame >= maxFrames || Math.random() > 0.5) {
            output += nextRole[i];
          } else {
            output += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        
        setText(output);
        
        if (frame >= maxFrames) {
          clearInterval(intervalId);
          roleIndex = (roleIndex + 1) % ROLES.length;
          // Esperar 3 segundos antes de desencriptar el siguiente
          setTimeout(scramble, 3000); 
        }
        frame++;
      }, 50); // 50ms por frame = muy rápido y caótico
    };

    // Iniciar el ciclo inicial
    const initialTimeout = setTimeout(scramble, 3000);
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <span className="font-mono text-brand-cyan tracking-widest relative inline-block min-w-[280px]">
      {text}
      <span className="animate-pulse ml-1">_</span>
    </span>
  );
}
