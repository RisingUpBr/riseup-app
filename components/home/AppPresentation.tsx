// components/home/AppPresentation.tsx
export default function AppPresentation() {
  return (
    <section className="py-16 md:py-24 bg-black transition-colors overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 items-stretch">
          
          {/* ESQUERDA - 3/5 do espaço */}
          <div className="lg:col-span-3 bg-neutral-950 p-8 md:p-12 lg:p-20 rounded-3xl lg:rounded-l-3xl lg:rounded-r-none border-2 border-neutral-800 lg:border-r-0 flex flex-col justify-center">
            <p className="text-xs md:text-sm font-semibold text-[#D4AF37] mb-4 uppercase tracking-wider">
              O sistema por trás da execução
            </p>
            
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-white mb-5 leading-tight max-w-2xl">
              O Rise Up App organiza o que sua mente não consegue sustentar sozinha.
            </h2>
            
            <p className="text-sm md:text-base text-neutral-400 mb-10 leading-relaxed max-w-xl">
              Menos decisão. Menos distração. Mais ação diária com propósito.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#D4AF37] mt-2"></div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-white mb-1">
                    Planeje o dia em minutos
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Sistema guiado que te ajuda a definir prioridades sem perder tempo decidindo.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#D4AF37] mt-2"></div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-white mb-1">
                    Execute sem depender de motivação
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Blocos de tempo estruturados que transformam intenção em ação prática.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#D4AF37] mt-2"></div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-white mb-1">
                    Visualize progresso real
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Métricas simples que mostram sua evolução sem gráficos complicados.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#D4AF37] mt-2"></div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-white mb-1">
                    Construa disciplina com consistência
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Sistema que funciona todo dia, não só quando você está motivado.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* DIREITA - 2/5 do espaço */}
          <div className="lg:col-span-2 bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 md:p-12 rounded-3xl lg:rounded-r-3xl lg:rounded-l-none border-2 border-neutral-800 lg:border-l-0 flex items-center justify-center">
            {/* Hub-and-spoke SVG — Rise Up system */}
            <svg
              viewBox="0 0 500 380"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="hub-glow" x="-40%" y="-40%" width="180%" height="180%">
                  <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#D4AF37" floodOpacity="0.35"/>
                </filter>
              </defs>

              {/* Dashed connection lines */}
              <line x1="148" y1="63" x2="185" y2="145" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.6"/>
              <line x1="352" y1="63" x2="315" y2="145" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.6"/>
              <line x1="148" y1="317" x2="185" y2="235" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.6"/>
              <line x1="352" y1="317" x2="315" y2="235" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.6"/>

              {/* Center hub — Rise Up */}
              <rect x="185" y="145" width="130" height="90" rx="14" fill="#D4AF37" fillOpacity="0.15" stroke="#D4AF37" strokeWidth="1.8" filter="url(#hub-glow)"/>
              <text x="250" y="186" textAnchor="middle" fontFamily="sans-serif" fontSize="16" fontWeight="bold" fill="#D4AF37">Rise Up</text>
              <text x="250" y="207" textAnchor="middle" fontFamily="sans-serif" fontSize="11" fill="#D4AF37" fillOpacity="0.55">sistema</text>

              {/* TL — Metas */}
              <rect x="18" y="18" width="130" height="76" rx="10" fill="#1a1a1a" stroke="#444" strokeWidth="1.2"/>
              <polyline points="36,58 44,66 60,50" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <text x="72" y="62" fontFamily="sans-serif" fontSize="14" fill="#aaa">Metas</text>
              <circle cx="148" cy="56" r="4" fill="#D4AF37" fillOpacity="0.7"/>

              {/* TR — Rotina */}
              <rect x="352" y="18" width="130" height="76" rx="10" fill="#1a1a1a" stroke="#444" strokeWidth="1.2"/>
              <circle cx="370" cy="56" r="11" stroke="#D4AF37" strokeWidth="1.6" fill="none"/>
              <line x1="370" y1="56" x2="370" y2="48" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="370" y1="56" x2="376" y2="61" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
              <text x="389" y="62" fontFamily="sans-serif" fontSize="14" fill="#aaa">Rotina</text>
              <circle cx="352" cy="56" r="4" fill="#D4AF37" fillOpacity="0.7"/>

              {/* BL — Notas */}
              <rect x="18" y="286" width="130" height="76" rx="10" fill="#1a1a1a" stroke="#444" strokeWidth="1.2"/>
              <rect x="35" y="298" width="22" height="30" rx="3" stroke="#D4AF37" strokeWidth="1.5" fill="none"/>
              <line x1="39" y1="307" x2="54" y2="307" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="39" y1="313" x2="54" y2="313" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="39" y1="319" x2="50" y2="319" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round"/>
              <text x="66" y="318" fontFamily="sans-serif" fontSize="14" fill="#aaa">Notas</text>
              <circle cx="148" cy="324" r="4" fill="#D4AF37" fillOpacity="0.7"/>

              {/* BR — Progresso */}
              <rect x="352" y="286" width="130" height="76" rx="10" fill="#1a1a1a" stroke="#444" strokeWidth="1.2"/>
              <rect x="362" y="318" width="8" height="20" rx="2" fill="#D4AF37" fillOpacity="0.5"/>
              <rect x="374" y="308" width="8" height="30" rx="2" fill="#D4AF37" fillOpacity="0.75"/>
              <rect x="386" y="313" width="8" height="25" rx="2" fill="#D4AF37" fillOpacity="0.9"/>
              <text x="401" y="322" fontFamily="sans-serif" fontSize="14" fill="#aaa">Progresso</text>
              <circle cx="352" cy="324" r="4" fill="#D4AF37" fillOpacity="0.7"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}