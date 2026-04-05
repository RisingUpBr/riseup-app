// app/(site)/como-funciona/page.tsx

import Link from "next/link";

export default function ComoFuncionaPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black transition-colors">
      {/* HERO */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-black dark:to-neutral-900" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center z-10">
          <p className="text-neutral-400 text-sm font-semibold uppercase tracking-widest mb-8">O SISTEMA RISE UP</p>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black dark:text-white mb-6 leading-tight whitespace-nowrap">
            Como funciona a <span style={{ color: "#D4AF37" }}>Rise Up</span>
          </h1>
          <p className="text-neutral-400 text-base text-center">
            Do aprendizado à execução, tudo conectado.
          </p>
        </div>
      </section>

      {/* SEÇÃO 1: VISÃO GERAL */}
      <section className="py-16 md:py-20 bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
              Dois produtos que se complementam
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Um te ensina. O outro te faz executar. Juntos, criam o sistema completo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* INFOPRODUTOS */}
            <div className="bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 hover:border-[#D4AF37] dark:hover:border-[#D4AF37] transition-all">
              <div className="mb-4">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  <line x1="8" y1="7" x2="16" y2="7"/>
                  <line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-3">
                Infoprodutos
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                Conteúdos estruturados para você entender como organizar sua mente, 
                planejar com clareza e construir disciplina sustentável.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">3 níveis de profundidade</span>
                  <span className="text-[#D4AF37] flex-shrink-0">✓</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">Acesso vitalício</span>
                  <span className="text-[#D4AF37] flex-shrink-0">✓</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">Área de membros na Kiwify</span>
                  <span className="text-[#D4AF37] flex-shrink-0">✓</span>
                </div>
              </div>
            </div>

            {/* APP */}
            <div className="bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 hover:border-[#D4AF37] dark:hover:border-[#D4AF37] transition-all">
              <div className="mb-4">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="7" y="2" width="10" height="20" rx="2" ry="2"/>
                  <line x1="7" y1="6" x2="17" y2="6"/>
                  <line x1="7" y1="18" x2="17" y2="18"/>
                  <circle cx="12" cy="20.5" r="0.5" fill="#D4AF37"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-3">
                Rise Up App
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                Ferramenta prática para planejar seu dia em minutos, executar com foco 
                e acompanhar seu progresso de forma visual e objetiva.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">Planejamento diário guiado</span>
                  <span className="text-[#D4AF37] flex-shrink-0">✓</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">Execução por blocos</span>
                  <span className="text-[#D4AF37] flex-shrink-0">✓</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">Assinatura mensal ou anual</span>
                  <span className="text-[#D4AF37] flex-shrink-0">✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: INFOPRODUTOS DETALHADOS */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <svg className="w-10 h-10 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              <line x1="8" y1="7" x2="16" y2="7"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
              Três níveis de conteúdo
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Escolha o plano que faz sentido para o seu momento. Cada nível oferece mais profundidade.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* ESSENCIAL */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8">
              <div className="inline-block px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-4">
                NÍVEL 1
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-3">Essencial</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-sm leading-relaxed">
                Fundamentos para começar<br />com clareza, estrutura<br />e método consistente.
              </p>
              <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                <li className="flex items-center justify-between gap-2">
                  <span>Módulos básicos de organização mental</span>
                  <span className="text-[#D4AF37] flex-shrink-0">✓</span>
                </li>
                <li className="flex items-center justify-between gap-2">
                  <span>Ferramentas de planejamento</span>
                  <span className="text-[#D4AF37] flex-shrink-0">✓</span>
                </li>
                <li className="flex items-center justify-between gap-2">
                  <span>Acesso vitalício ao conteúdo</span>
                  <span className="text-[#D4AF37] flex-shrink-0">✓</span>
                </li>
                <li className="flex items-center justify-between gap-2">
                  <span>1 Treinamento e 1 Guia prático</span>
                  <span className="text-[#D4AF37] flex-shrink-0">✓</span>
                </li>
              </ul>
            </div>

            {/* AVANÇADO */}
            <div className="bg-gradient-to-br from-[#D4AF37]/5 to-transparent dark:from-[#D4AF37]/10 border-2 border-[#D4AF37] rounded-2xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-black text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                MAIS POPULAR
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-[#D4AF37]/20 text-xs font-bold text-[#D4AF37] mb-4">
                NÍVEL 2
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-3">Avançado</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-sm leading-relaxed">
                Aprofunde sua transformação com estratégias avançadas e técnicas comprovadas.
              </p>
              <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                <li className="flex items-center justify-between gap-2">
                  <span>Tudo do plano Essencial</span>
                  <span className="text-[#D4AF37] flex-shrink-0">✓</span>
                </li>
                <li className="flex items-center justify-between gap-2">
                  <span>Técnicas avançadas de execução</span>
                  <span className="text-[#D4AF37] flex-shrink-0">✓</span>
                </li>
                <li className="flex items-center justify-between gap-2">
                  <span>Frameworks de produtividade</span>
                  <span className="text-[#D4AF37] flex-shrink-0">✓</span>
                </li>
                <li className="flex items-center justify-between gap-2">
                  <span>Desafio e Checklist inclusos</span>
                  <span className="text-[#D4AF37] flex-shrink-0">✓</span>
                </li>
              </ul>
            </div>

            {/* COMPLETO */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8">
              <div className="inline-block px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-4">
                NÍVEL 3
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-3">Completo</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-sm leading-relaxed">
                Experiência completa com acompanhamento personalizado e comunidade exclusiva.
              </p>
              <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                <li className="flex items-center justify-between gap-2">
                  <span>Tudo do Avançado</span>
                  <span className="text-[#D4AF37] flex-shrink-0">✓</span>
                </li>
                <li className="flex items-center justify-between gap-2">
                  <span>Módulos 3 e 4 do Método Rise Up</span>
                  <span className="text-[#D4AF37] flex-shrink-0">✓</span>
                </li>
                <li className="flex items-center justify-between gap-2">
                  <span>3 Ebooks exclusivos</span>
                  <span className="text-[#D4AF37] flex-shrink-0">✓</span>
                </li>
                <li className="flex items-center justify-between gap-2">
                  <span>Guia e Treinamento extras</span>
                  <span className="text-[#D4AF37] flex-shrink-0">✓</span>
                </li>
                <li className="flex items-center justify-between gap-2">
                  <span>Desafio adicional</span>
                  <span className="text-[#D4AF37] flex-shrink-0">✓</span>
                </li>
                <li className="flex items-center justify-between gap-2">
                  <span>Acesso vitalício</span>
                  <span className="text-[#D4AF37] flex-shrink-0">✓</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/planos"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold rounded-xl transition-all hover:scale-105"
            >
              Ver preços e escolher plano
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: COMO APP E INFOPRODUTOS SE COMPLEMENTAM */}
      <section className="py-16 md:py-20 bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium mb-4">
              🔗 Ecossistema integrado
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
              Como eles trabalham juntos
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Os produtos foram criados para se complementarem. Um te ensina, o outro te faz executar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8">
              <div className="mb-4">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="7" y="2" width="10" height="20" rx="2" ry="2"/>
                  <line x1="7" y1="6" x2="17" y2="6"/>
                  <line x1="7" y1="18" x2="17" y2="18"/>
                  <circle cx="12" cy="20.5" r="0.5" fill="#D4AF37"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-3">
                Aprenda e aplique imediatamente
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Consuma o conteúdo dos infoprodutos e aplique na prática através do app. 
                Sem perder tempo entre teoria e execução. Cada conceito se transforma em ação.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8">
              <div className="mb-4">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  <line x1="8" y1="7" x2="16" y2="7"/>
                  <line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-3">
                Progresso em todas as frentes
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                O app organiza seu dia a dia enquanto os infoprodutos aprofundam seu conhecimento. 
                Você evolui na execução prática e no entendimento conceitual simultaneamente.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-10">
            <h3 className="text-2xl font-black text-white text-center border-b border-[#D4AF37]/30 pb-4 mb-8">
              Exemplo prático
            </h3>
            <div className="max-w-[520px] mx-auto">
              {/* Item 1 */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-black font-black flex items-center justify-center text-sm">1</div>
                  <div className="w-[2px] h-8 bg-gradient-to-b from-[#D4AF37] to-[#D4AF37]/20 mx-auto mt-1"></div>
                </div>
                <div className="pt-2">
                  <p className="font-bold text-white text-base">Você aprende no infoproduto:</p>
                  <p className="text-neutral-400 text-sm mt-1">Como identificar suas prioridades reais e eliminar distrações mentais</p>
                </div>
              </div>
              {/* Item 2 */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-black font-black flex items-center justify-center text-sm">2</div>
                  <div className="w-[2px] h-8 bg-gradient-to-b from-[#D4AF37] to-[#D4AF37]/20 mx-auto mt-1"></div>
                </div>
                <div className="pt-2">
                  <p className="font-bold text-white text-base">Você pratica no app:</p>
                  <p className="text-neutral-400 text-sm mt-1">Define suas 3 prioridades do dia em menos de 2 minutos e executa sem perder foco</p>
                </div>
              </div>
              {/* Item 3 */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-black font-black flex items-center justify-center text-sm">3</div>
                </div>
                <div className="pt-2">
                  <p className="font-bold text-white text-base">Resultado:</p>
                  <p className="text-neutral-400 text-sm mt-1">Progresso consistente porque você entendeu o conceito e aplicou na prática</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4: DESCONTOS E VANTAGENS */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span className="text-[#D4AF37] text-sm font-semibold uppercase tracking-wider">Vantagens exclusivas</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
              Descontos ao combinar produtos
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-[420px] mx-auto text-center">
              Benefícios pensados para quem leva a sério a própria evolução. Sem atalhos, sem enrolação.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37]/5 to-transparent dark:from-[#D4AF37]/20 dark:via-[#D4AF37]/10 border-l-4 border-[#D4AF37] rounded-xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
                    <path d="M8 12 Q8 8 12 8 L28 8 Q32 8 32 12 L32 30 Q32 34 28 34 L12 34 Q8 34 8 30 Z" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="20" cy="8" r="3" stroke="#D4AF37" strokeWidth="1.5"/>
                    <circle cx="15" cy="19" r="2.5" fill="#D4AF37"/>
                    <circle cx="25" cy="27" r="2.5" fill="#D4AF37"/>
                    <line x1="25" y1="17" x2="15" y2="29" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-black dark:text-white mb-2">
                    Comprou infoproduto? Ganhe desconto no app
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Ao adquirir qualquer plano de infoproduto, você ganha desconto especial na recorrência do app por tempo determinado.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37]/5 to-transparent dark:from-[#D4AF37]/20 dark:via-[#D4AF37]/10 border-l-4 border-[#D4AF37] rounded-xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
                    <path d="M8 20C8 15 12 11 17 14L20 17L23 14C28 11 32 15 32 20C32 25 28 29 23 26L20 23L17 26C12 29 8 25 8 20Z" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-black dark:text-white mb-2">
                    Pagou anual no app? Economize nos infoprodutos
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Assinantes anuais do app recebem descontos progressivos em todos os planos de infoprodutos.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37]/5 to-transparent dark:from-[#D4AF37]/20 dark:via-[#D4AF37]/10 border-l-4 border-[#D4AF37] rounded-xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
                    <rect x="14" y="6" width="20" height="16" rx="3" stroke="#888" strokeWidth="1.5"/>
                    <rect x="6" y="16" width="20" height="16" rx="3" stroke="#D4AF37" strokeWidth="1.5"/>
                    <text x="20" y="27" textAnchor="middle" fill="#D4AF37" fontSize="14" fontWeight="bold" fontFamily="sans-serif">+</text>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-black dark:text-white mb-2">
                    Combo: Assinatura mensal + Plano Essencial
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Combine a flexibilidade da assinatura mensal com o plano básico de infoprodutos e ganhe desconto especial no pacote.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5: COMO RECEBER OS PRODUTOS */}
      <section className="py-16 md:py-20 bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
              Como você recebe tudo
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Acesso simples, rápido e totalmente organizado.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* INFOPRODUTOS */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 flex flex-col">
              <div className="min-h-[80px] flex flex-col justify-start mb-6">
                <svg className="w-8 h-8 mb-4" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  <line x1="8" y1="7" x2="16" y2="7"/>
                  <line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
                <h3 className="text-2xl font-bold text-black dark:text-white">
                  Infoprodutos
                </h3>
              </div>
              <ol className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D4AF37] text-black text-sm font-bold flex items-center justify-center">1</div>
                  <div>
                    <p className="font-medium text-black dark:text-white mb-1">Escolha e compre</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Selecione seu plano e finalize a compra de forma segura
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D4AF37] text-black text-sm font-bold flex items-center justify-center">2</div>
                  <div>
                    <p className="font-medium text-black dark:text-white mb-1">Receba o acesso</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Email automático com login e senha para a área de membros na Kiwify
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D4AF37] text-black text-sm font-bold flex items-center justify-center">3</div>
                  <div>
                    <p className="font-medium text-black dark:text-white mb-1">Acesse vitalício</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Todo o conteúdo disponível para sempre, sem prazo de validade
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            {/* APP */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 flex flex-col">
              <div className="min-h-[80px] flex flex-col justify-start mb-6">
                <svg className="w-8 h-8 mb-4" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="7" y="2" width="10" height="20" rx="2" ry="2"/>
                  <line x1="7" y1="6" x2="17" y2="6"/>
                  <line x1="7" y1="18" x2="17" y2="18"/>
                  <circle cx="12" cy="20.5" r="0.5" fill="#D4AF37"/>
                </svg>
                <h3 className="text-2xl font-bold text-black dark:text-white">
                  App Rise Up
                </h3>
              </div>
              <ol className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D4AF37] text-black text-sm font-bold flex items-center justify-center">1</div>
                  <div>
                    <p className="font-medium text-black dark:text-white mb-1">Escolha seu plano</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Assinatura mensal ou anual conforme sua preferência
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D4AF37] text-black text-sm font-bold flex items-center justify-center">2</div>
                  <div>
                    <p className="font-medium text-black dark:text-white mb-1">Pagamento processado</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      <strong>PIX:</strong> Liberado imediatamente <br/>
                      <strong>Cartão:</strong> Após aprovação (geralmente minutos)
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D4AF37] text-black text-sm font-bold flex items-center justify-center">3</div>
                  <div>
                    <p className="font-medium text-black dark:text-white mb-1">Comece a usar</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Faça login no app e comece a planejar seu dia em minutos
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-black via-neutral-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Pronto para transformar sua rotina?
          </h2>
          <p className="text-neutral-400 text-base mb-10 text-center whitespace-nowrap">
            Dois produtos. Um sistema. Sua transformação começa agora.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/planos"
              className="px-8 py-4 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold rounded-xl transition-all hover:scale-105 w-full sm:w-auto"
            >
              Ver todos os planos
            </Link>
            <Link
              href="/app"
              className="px-8 py-4 bg-transparent border-2 border-neutral-700 text-white font-bold rounded-xl hover:scale-105 transition-transform duration-200 w-full sm:w-auto"
            >
              Conhecer o app
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}