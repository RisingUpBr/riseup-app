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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-600 dark:text-neutral-300 mb-8">
            <span className="text-[#D4AF37]">📖</span>
            Guia completo
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6 leading-tight">
            Como funciona a Rise Up
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Entenda nossos produtos, planos e como eles se complementam para transformar sua rotina.
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
              A Rise Up oferece infoprodutos para aprender e um app para executar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* INFOPRODUTOS */}
            <div className="bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 hover:border-[#D4AF37] dark:hover:border-[#D4AF37] transition-all">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-3">
                Infoprodutos
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                Conteúdos estruturados para você entender como organizar sua mente, 
                planejar com clareza e construir disciplina sustentável.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-[#D4AF37] mt-1">✓</span>
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">
                    3 níveis de profundidade
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#D4AF37] mt-1">✓</span>
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">
                    Acesso vitalício
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#D4AF37] mt-1">✓</span>
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">
                    Área de membros na Kiwify
                  </span>
                </div>
              </div>
            </div>

            {/* APP */}
            <div className="bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 hover:border-[#D4AF37] dark:hover:border-[#D4AF37] transition-all">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-3">
                Rise Up App
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                Ferramenta prática para planejar seu dia em minutos, executar com foco 
                e acompanhar seu progresso de forma visual e objetiva.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-[#D4AF37] mt-1">✓</span>
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">
                    Planejamento diário guiado
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#D4AF37] mt-1">✓</span>
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">
                    Execução por blocos
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#D4AF37] mt-1">✓</span>
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">
                    Assinatura mensal ou anual
                  </span>
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
            <span className="inline-block px-4 py-2 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium mb-4">
              📚 Infoprodutos
            </span>
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
                Fundamentos para organizar sua mente e rotina. Ideal para quem está começando.
              </p>
              <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">✓</span>
                  <span>Módulos básicos de organização mental</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">✓</span>
                  <span>Ferramentas essenciais de planejamento</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">✓</span>
                  <span>Acesso vitalício ao conteúdo</span>
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
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">✓</span>
                  <span>Tudo do plano Essencial</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">✓</span>
                  <span>Técnicas avançadas de execução</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">✓</span>
                  <span>Frameworks de produtividade</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">✓</span>
                  <span>Bônus exclusivos</span>
                </li>
              </ul>
            </div>

            {/* PREMIUM */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8">
              <div className="inline-block px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-4">
                NÍVEL 3
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-3">Premium</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-sm leading-relaxed">
                Experiência completa com acompanhamento personalizado e comunidade exclusiva.
              </p>
              <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">✓</span>
                  <span>Tudo do plano Avançado</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">✓</span>
                  <span>Mentorias ao vivo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">✓</span>
                  <span>Comunidade VIP</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">✓</span>
                  <span>Suporte prioritário</span>
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
              <div className="text-3xl mb-4">📚→📱</div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-3">
                Aprenda e aplique imediatamente
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Consuma o conteúdo dos infoprodutos e aplique na prática através do app. 
                Sem perder tempo entre teoria e execução. Cada conceito se transforma em ação.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-3">
                Progresso em todas as frentes
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                O app organiza seu dia a dia enquanto os infoprodutos aprofundam seu conhecimento. 
                Você evolui na execução prática e no entendimento conceitual simultaneamente.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#D4AF37]/5 to-transparent dark:from-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-black dark:text-white mb-6 text-center">
              Exemplo prático
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center">1</div>
                <div>
                  <p className="font-medium text-black dark:text-white">Você aprende no infoproduto:</p>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">
                    Como identificar suas prioridades reais e eliminar distrações mentais
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center">2</div>
                <div>
                  <p className="font-medium text-black dark:text-white">Você pratica no app:</p>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">
                    Define suas 3 prioridades do dia em menos de 2 minutos e executa sem perder foco
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center">3</div>
                <div>
                  <p className="font-medium text-black dark:text-white">Resultado:</p>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">
                    Progresso consistente porque você entendeu o conceito e aplicou na prática
                  </p>
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
            <span className="inline-block px-4 py-2 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium mb-4">
              💎 Vantagens exclusivas
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
              Descontos ao combinar produtos
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Quanto mais você investe na sua transformação, mais economia e vantagens você recebe.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37]/5 to-transparent dark:from-[#D4AF37]/20 dark:via-[#D4AF37]/10 border-l-4 border-[#D4AF37] rounded-xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 text-3xl">📚</div>
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
                <div className="flex-shrink-0 text-3xl">📱</div>
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
                <div className="flex-shrink-0 text-3xl">🎁</div>
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
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8">
              <div className="text-4xl mb-6">📚</div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-6">
                Infoprodutos
              </h3>
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
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8">
              <div className="text-4xl mb-6">📱</div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-6">
                App Rise Up
              </h3>
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
          <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Comece agora e construa progresso real, dia após dia. Sem promessas vazias.
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
              className="px-8 py-4 bg-transparent border-2 border-neutral-700 hover:border-[#D4AF37] text-white font-bold rounded-xl transition-all w-full sm:w-auto"
            >
              Conhecer o app
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}