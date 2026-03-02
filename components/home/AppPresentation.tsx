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

          {/* DIREITA - 2/5 do espaço - MOCKUP MAIOR */}
          <div className="lg:col-span-2 bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 md:p-12 lg:p-16 rounded-3xl lg:rounded-r-3xl lg:rounded-l-none border-2 border-neutral-800 lg:border-l-0 flex items-center justify-center">
            <div className="relative w-full h-full min-h-[500px] lg:min-h-[600px]">
              {/* SVG para as linhas de conexão */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 600" style={{ zIndex: 1 }}>
                {/* Linha central → superior esquerda */}
                <path
                  d="M 250,300 Q 160,200 110,120"
                  stroke="#D4AF37"
                  strokeWidth="2.5"
                  fill="none"
                  opacity="0.6"
                />
                {/* Linha central → superior direita */}
                <path
                  d="M 250,300 Q 340,200 390,120"
                  stroke="#D4AF37"
                  strokeWidth="2.5"
                  fill="none"
                  opacity="0.6"
                />
                {/* Linha central → inferior esquerda */}
                <path
                  d="M 250,300 Q 160,400 110,480"
                  stroke="#D4AF37"
                  strokeWidth="2.5"
                  fill="none"
                  opacity="0.6"
                />
                {/* Linha central → inferior direita */}
                <path
                  d="M 250,300 Q 340,400 390,480"
                  stroke="#D4AF37"
                  strokeWidth="2.5"
                  fill="none"
                  opacity="0.6"
                />
              </svg>

              {/* Bloco Central - Anotação Principal */}
              <div 
                className="absolute bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl p-4 md:p-5 shadow-2xl border-2 border-[#D4AF37]"
                style={{ 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%)',
                  width: '180px',
                  zIndex: 2
                }}
              >
                <div className="text-xs md:text-sm font-bold text-black mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0"></span>
                  <span>📝 Projeto Q1</span>
                </div>
                <div className="text-[10px] md:text-xs text-black/80 leading-relaxed">
                  Lançamento do produto principal até março
                </div>
              </div>

              {/* Bloco Superior Esquerdo */}
              <div 
                className="absolute bg-neutral-800 rounded-lg p-3 md:p-4 shadow-xl border border-neutral-700"
                style={{ 
                  top: '12%', 
                  left: '8%',
                  width: '140px',
                  zIndex: 2
                }}
              >
                <div className="text-xs font-bold text-white mb-1.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0"></span>
                  <span>✓ Tarefa</span>
                </div>
                <div className="text-[10px] text-neutral-400 leading-relaxed">
                  Validar protótipo
                </div>
              </div>

              {/* Bloco Superior Direito */}
              <div 
                className="absolute bg-neutral-800 rounded-lg p-3 md:p-4 shadow-xl border border-neutral-700"
                style={{ 
                  top: '12%', 
                  right: '8%',
                  width: '140px',
                  zIndex: 2
                }}
              >
                <div className="text-xs font-bold text-white mb-1.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0"></span>
                  <span>🎯 Meta</span>
                </div>
                <div className="text-[10px] text-neutral-400 leading-relaxed">
                  +10k usuários ativos
                </div>
              </div>

              {/* Bloco Inferior Esquerdo */}
              <div 
                className="absolute bg-neutral-800 rounded-lg p-3 md:p-4 shadow-xl border border-neutral-700"
                style={{ 
                  bottom: '12%', 
                  left: '8%',
                  width: '140px',
                  zIndex: 2
                }}
              >
                <div className="text-xs font-bold text-white mb-1.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0"></span>
                  <span>💡 Ideia</span>
                </div>
                <div className="text-[10px] text-neutral-400 leading-relaxed">
                  Feature premium
                </div>
              </div>

              {/* Bloco Inferior Direito */}
              <div 
                className="absolute bg-neutral-800 rounded-lg p-3 md:p-4 shadow-xl border border-neutral-700"
                style={{ 
                  bottom: '12%', 
                  right: '8%',
                  width: '140px',
                  zIndex: 2
                }}
              >
                <div className="text-xs font-bold text-white mb-1.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0"></span>
                  <span>📄 Doc</span>
                </div>
                <div className="text-[10px] text-neutral-400 leading-relaxed">
                  Estratégia.pdf
                </div>
              </div>

              {/* Pontos de conexão nas linhas */}
              <div className="absolute w-3 h-3 rounded-full bg-[#D4AF37]" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 3 }}></div>
              <div className="absolute w-2 h-2 rounded-full bg-[#D4AF37]" style={{ top: '15%', left: '15%', zIndex: 3 }}></div>
              <div className="absolute w-2 h-2 rounded-full bg-[#D4AF37]" style={{ top: '15%', right: '15%', zIndex: 3 }}></div>
              <div className="absolute w-2 h-2 rounded-full bg-[#D4AF37]" style={{ bottom: '15%', left: '15%', zIndex: 3 }}></div>
              <div className="absolute w-2 h-2 rounded-full bg-[#D4AF37]" style={{ bottom: '15%', right: '15%', zIndex: 3 }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}