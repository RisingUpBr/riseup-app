// components/home/BeforeAfter.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function BeforeAfter() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Inicia quando o card chega no topo da viewport
      const scrollStart = rect.top;
      const scrollEnd = -rect.height + windowHeight;
      
      // Progresso de 0 a 1
      let progress = 0;
      if (scrollStart <= 0) {
        progress = Math.min(1, Math.abs(scrollStart) / Math.abs(scrollEnd));
      }
      
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const beforePoints = [
    "Cabeça cheia, sem saber por onde começar.",
    "Planejamento complexo que nunca é executado.",
    "Motivação passageira que some no dia seguinte.",
    "Procrastinação por excesso de opções.",
  ];

  const afterPoints = [
    "Prioridades claras definidas em minutos.",
    "Sistema simples que você executa sem pensar.",
    "Disciplina prática que não depende de humor.",
    "Ação consistente com progresso visível.",
  ];

  // Sobreposição RÁPIDA: acontece nos primeiros 40% do scroll
  const overlapPhase = Math.min(scrollProgress / 0.4, 1);
  
  // BEFORE: move para direita (até 50% no máximo)
  const beforeX = overlapPhase * 50;
  
  // AFTER: move para esquerda (até -50% no máximo)
  const afterX = overlapPhase * -50;
  
  // Z-index muda quando sobreposição começar
  const beforeZ = scrollProgress > 0.1 ? 1 : 2;
  const afterZ = scrollProgress > 0.1 ? 3 : 2;

  return (
    <section
      ref={sectionRef}
      className="relative bg-white dark:bg-black transition-colors"
      style={{ minHeight: "200vh" }} // Altura para permitir scroll
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          {/* TÍTULO */}
          <div className="text-center mb-10">
            <h2 className="text-6xl md:text-7xl font-black text-black dark:text-white leading-tight">
              Sua vida:
              <br />
              antes &amp; depois.
            </h2>
            <p className="text-neutral-400 text-base max-w-[480px] mx-auto mt-5">
              A diferença entre quem evolui e quem fica parado é um sistema.
            </p>
          </div>

          {/* CARDS LADO A LADO */}
          <div className="relative flex flex-col md:flex-row items-stretch justify-center gap-6">
            
            {/* BEFORE - Card Esquerdo */}
            <div
              className="relative w-full md:w-[550px] bg-neutral-900 rounded-3xl p-10 md:p-12 border-2 border-neutral-800 transition-all duration-500 flex flex-col"
              style={{
                transform: `translateX(${beforeX}%)`,
                zIndex: beforeZ,
                minHeight: "480px"
              }}
            >
              <div className="min-h-[120px]">
                <p className="text-sm font-semibold text-neutral-500 mb-4 uppercase tracking-wider">
                  Antes da Rise Up:
                </p>
                <h3 className="text-[34px] md:text-[46px] font-bold text-white leading-tight">
                  Caos e paralisia
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                {beforePoints.map((point, index) => (
                  <div key={index} className="flex items-center justify-between gap-4">
                    <span className="text-base text-neutral-300 leading-relaxed flex-1">
                      {point}
                    </span>
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-neutral-700 flex items-center justify-center">
                      <svg className="w-4 h-4 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/auth"
                className="w-full mt-auto flex items-center justify-center px-8 py-4 bg-white text-black rounded-full font-semibold hover:scale-[1.02] transition-transform text-lg"
              >
                Sair do caos
              </Link>
            </div>

            {/* AFTER - Card Direito */}
            <div
              className="relative w-full md:w-[550px] bg-gradient-to-br from-[#0D4D3D] to-[#0A3D2F] rounded-3xl p-10 md:p-12 border-2 border-[#D4AF37] shadow-2xl transition-all duration-500 flex flex-col"
              style={{
                transform: `translateX(${afterX}%)`,
                zIndex: afterZ,
                minHeight: "480px"
              }}
            >
              <div className="min-h-[120px]">
                <p className="text-sm font-semibold text-[#D4AF37] mb-4 uppercase tracking-wider">
                  Depois da Rise Up:
                </p>
                <h3 className="text-[34px] md:text-[46px] font-bold text-white leading-tight whitespace-nowrap">
                  Clareza e execução
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                {afterPoints.map((point, index) => (
                  <div key={index} className="flex items-center justify-between gap-4">
                    <span className="text-base text-white leading-relaxed flex-1">
                      {point}
                    </span>
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#D4AF37] flex items-center justify-center">
                      <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/auth"
                className="w-full mt-auto flex items-center justify-center px-8 py-4 bg-[#D4AF37] hover:bg-[#E5C158] text-black rounded-full font-semibold hover:scale-[1.02] transition-transform text-lg"
              >
                Começar agora
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}