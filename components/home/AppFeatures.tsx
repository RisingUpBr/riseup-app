// components/home/AppFeatures.tsx
export default function AppFeatures() {
  return (
    <section className="py-16 md:py-24 bg-black transition-colors overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-xs md:text-sm font-semibold text-[#D4AF37] mb-4 uppercase tracking-wider">
            Funcionalidades essenciais
          </p>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto">
            Tudo o que você precisa para executar.{" "}
            <span className="text-neutral-400">Nada do que te distrai.</span>
          </h2>
          
          <p className="text-base md:text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            O app não tenta fazer tudo. Ele faz o que importa, do jeito certo.
          </p>
        </div>

        {/* GRID DE FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Feature 1: Planejamento diário guiado */}
          <div className="bg-neutral-950 border-2 border-neutral-800 rounded-3xl p-6 md:p-8 hover:border-[#D4AF37] transition-all duration-300 group">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              Planejamento diário guiado
            </h3>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
              Organize prioridades em poucos minutos e elimine o excesso de decisões antes do dia começar.
            </p>
            
            {/* Mockup: Lista de prioridades */}
            <div className="bg-neutral-900 rounded-xl p-4 border border-neutral-800">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded border-2 border-[#D4AF37]"></div>
                  <div className="flex-1 h-2 bg-gradient-to-r from-[#D4AF37] to-transparent rounded-full opacity-60"></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded border-2 border-[#D4AF37] bg-[#D4AF37]">
                    <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div className="flex-1 h-2 bg-neutral-700 rounded-full opacity-40"></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded border-2 border-neutral-700"></div>
                  <div className="flex-1 h-2 bg-neutral-700 rounded-full opacity-20"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Execução por blocos */}
          <div className="bg-neutral-950 border-2 border-neutral-800 rounded-3xl p-6 md:p-8 hover:border-[#D4AF37] transition-all duration-300 group">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              Execução por blocos
            </h3>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
              Transforme tarefas em blocos claros de ação e mantenha o foco sem depender de motivação.
            </p>
            
            {/* Mockup: Bloco de tempo */}
            <div className="bg-gradient-to-br from-orange-500/10 to-transparent rounded-xl p-4 border border-orange-500/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-orange-400">BLOCO ATIVO</span>
                <span className="text-xs text-neutral-400">45 min</span>
              </div>
              <div className="h-2 bg-neutral-800 rounded-full overflow-hidden mb-2">
                <div className="h-full w-3/4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"></div>
              </div>
              <span className="text-[10px] text-neutral-500">75% concluído</span>
            </div>
          </div>

          {/* Feature 3: Progresso visível */}
          <div className="bg-neutral-950 border-2 border-neutral-800 rounded-3xl p-6 md:p-8 hover:border-[#D4AF37] transition-all duration-300 group">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              Progresso visível
            </h3>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
              Acompanhe sua evolução de forma simples e objetiva, sem gráficos desnecessários.
            </p>
            
            {/* Mockup: Métricas */}
            <div className="bg-neutral-900 rounded-xl p-4 border border-neutral-800">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-2xl font-bold text-[#D4AF37]">18</div>
                  <div className="text-[10px] text-neutral-500">Tarefas completas</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">94%</div>
                  <div className="text-[10px] text-neutral-500">Taxa de execução</div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 4: Conteúdos acionáveis */}
          <div className="bg-neutral-950 border-2 border-neutral-800 rounded-3xl p-6 md:p-8 hover:border-[#D4AF37] transition-all duration-300 group">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              Conteúdos acionáveis
            </h3>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
              Aprenda apenas o que pode ser aplicado agora. Sem teoria vazia.
            </p>
            
            {/* Mockup: Módulo de conteúdo */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-transparent rounded-xl p-4 border border-emerald-500/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-emerald-400">MÓDULO 2</span>
                <span className="text-xs text-neutral-400">67%</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                  <div className="text-[10px] text-neutral-400">Como priorizar tarefas</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-600"></div>
                  <div className="text-[10px] text-neutral-500">Blocos de tempo na prática</div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 5: Integração com a vida real */}
          <div className="bg-neutral-950 border-2 border-neutral-800 rounded-3xl p-6 md:p-8 hover:border-[#D4AF37] transition-all duration-300 group">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              Integração com a vida real
            </h3>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
              O app se adapta à sua rotina. Não exige perfeição, exige consistência.
            </p>
            
            {/* Mockup: Calendário/Rotina */}
            <div className="bg-neutral-900 rounded-xl p-4 border border-neutral-800">
              <div className="grid grid-cols-7 gap-1">
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <div
                    key={day}
                    className={`aspect-square rounded ${
                      day <= 5 ? 'bg-[#D4AF37]' : 'bg-neutral-800'
                    } opacity-${day <= 5 ? '100' : '40'}`}
                  ></div>
                ))}
              </div>
              <div className="text-[10px] text-neutral-500 mt-2 text-center">5 dias consecutivos</div>
            </div>
          </div>

          {/* Feature 6: Anotações ramificadas - CTA ESPECIAL */}
          <div className="bg-gradient-to-br from-[#D4AF37]/10 to-transparent border-2 border-[#D4AF37] rounded-3xl p-6 md:p-8 hover:border-[#E5C158] transition-all duration-300 group">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              Anotações ramificadas
            </h3>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
              Conecte ideias, tarefas e recursos em um sistema visual que sua mente consegue acompanhar.
            </p>
            
            {/* Mockup mini: Ramificação */}
            <div className="relative h-24">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100">
                <path d="M 100,50 L 60,25" stroke="#D4AF37" strokeWidth="1.5" opacity="0.4"/>
                <path d="M 100,50 L 140,25" stroke="#D4AF37" strokeWidth="1.5" opacity="0.4"/>
                <path d="M 100,50 L 60,75" stroke="#D4AF37" strokeWidth="1.5" opacity="0.4"/>
                <path d="M 100,50 L 140,75" stroke="#D4AF37" strokeWidth="1.5" opacity="0.4"/>
              </svg>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded bg-[#D4AF37]"></div>
              <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded bg-neutral-700"></div>
              <div className="absolute top-1/4 right-1/4 w-4 h-4 rounded bg-neutral-700"></div>
              <div className="absolute bottom-1/4 left-1/4 w-4 h-4 rounded bg-neutral-700"></div>
              <div className="absolute bottom-1/4 right-1/4 w-4 h-4 rounded bg-neutral-700"></div>
            </div>
            
            <a
              href="/auth"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] hover:text-[#E5C158] transition-colors"
            >
              Ver mais detalhes
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}