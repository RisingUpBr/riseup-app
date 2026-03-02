import Link from "next/link";

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO - IDENTIDADE */}
      <section className="relative overflow-hidden bg-gradient-to-b from-black via-neutral-900 to-black py-32 px-4 sm:px-6 lg:px-16">
        <div className="max-w-[1600px] mx-auto">
          {/* Background decorativo dourado */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D4AF37] opacity-5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-4xl">
            <div className="inline-block mb-6 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full">
              <span className="text-[#D4AF37] text-sm font-medium">Sobre o Rise Up</span>
            </div>
            
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              Rise Up
            </h1>
            
            <p className="text-2xl sm:text-3xl text-neutral-300 mb-6 leading-relaxed">
              Um ecossistema inteligente de desenvolvimento pessoal que integra mentalidade, organização e tecnologia.
            </p>
            
            <p className="text-xl text-neutral-400 leading-relaxed max-w-3xl">
              Não acreditamos em fórmulas mágicas ou promessas vazias. Acreditamos em sistemas, clareza mental e consistência.
            </p>
          </div>
        </div>
      </section>

      {/* ESSÊNCIA - O QUE É */}
      <section className="py-24 px-4 sm:px-6 lg:px-16 bg-neutral-950">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm uppercase tracking-wider text-[#D4AF37] mb-4 font-semibold">
                Essência
              </h2>
              <h3 className="text-4xl sm:text-5xl font-bold mb-6">
                Não é apenas conteúdo.
                <br />
                <span className="text-neutral-400">É um sistema para viver melhor.</span>
              </h3>
            </div>
            
            <div className="space-y-6 text-lg text-neutral-300 leading-relaxed">
              <p>
                Vivemos em um mundo cheio de informação, mas com pouca direção. 
                A Rise Up nasceu para resolver isso.
              </p>
              
              <p>
                Transformamos <span className="text-white font-semibold">confusão em clareza</span>, 
                <span className="text-white font-semibold"> intenção em ação</span>, e 
                <span className="text-white font-semibold"> potencial em resultado</span>.
              </p>
              
              <p className="text-[#D4AF37] font-semibold">
                Evoluir não é sobre fazer mais. É sobre fazer melhor — todos os dias.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MISSÃO + VISÃO + VALORES - BENTO GRID */}
      <section className="py-24 px-4 sm:px-6 lg:px-16 bg-black">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* MISSÃO */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 rounded-2xl border border-neutral-800 hover:border-[#D4AF37]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold mb-4">Nossa Missão</h3>
              
              <p className="text-neutral-300 leading-relaxed">
                Ajudar pessoas a organizarem suas vidas, pensamentos e rotinas para viverem com mais eficiência, consciência e equilíbrio.
              </p>
            </div>

            {/* VISÃO */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 rounded-2xl border border-neutral-800 hover:border-[#D4AF37]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold mb-4">Nossa Visão</h3>
              
              <p className="text-neutral-300 leading-relaxed mb-4">
                Criar um ecossistema completo que una conteúdo, método e tecnologia.
              </p>
              
              <p className="text-[#D4AF37] font-semibold">
                Ser o "Canva da organização pessoal e mentalidade"
              </p>
            </div>

            {/* VALORES */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 rounded-2xl border border-neutral-800 hover:border-[#D4AF37]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold mb-4">Nossos Valores</h3>
              
              <ul className="space-y-3 text-neutral-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] mt-1">•</span>
                  <span>Honestidade e transparência</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] mt-1">•</span>
                  <span>Autenticidade e empatia</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] mt-1">•</span>
                  <span>Evolução contínua</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] mt-1">•</span>
                  <span>Eficiência e performance real</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* POR QUÊ? - PROBLEMA → SOLUÇÃO */}
      <section className="py-24 px-4 sm:px-6 lg:px-16 bg-neutral-950">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-wider text-[#D4AF37] mb-4 font-semibold">
              Origem
            </h2>
            <h3 className="text-4xl sm:text-5xl font-bold mb-6">
              Por que a Rise Up existe?
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* PROBLEMA */}
            <div className="bg-gradient-to-br from-red-950/20 to-neutral-900 p-10 rounded-2xl border border-red-900/30">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              
              <h4 className="text-2xl font-bold mb-6 text-red-300">O Problema</h4>
              
              <ul className="space-y-4 text-neutral-300">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 text-xl">×</span>
                  <span>Não sabem por onde começar</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 text-xl">×</span>
                  <span>Se sentem sobrecarregadas</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 text-xl">×</span>
                  <span>Tentam de tudo, mas nada se sustenta</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 text-xl">×</span>
                  <span>Dependem de motivação constante</span>
                </li>
              </ul>
            </div>

            {/* SOLUÇÃO */}
            <div className="bg-gradient-to-br from-[#D4AF37]/10 to-neutral-900 p-10 rounded-2xl border border-[#D4AF37]/30">
              <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h4 className="text-2xl font-bold mb-6 text-[#D4AF37]">A Solução</h4>
              
              <ul className="space-y-4 text-neutral-300">
                <li className="flex items-start gap-3">
                  <span className="text-[#D4AF37] text-xl">✓</span>
                  <span>Caminho estruturado e claro</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4AF37] text-xl">✓</span>
                  <span>Sistema inteligente de organização</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4AF37] text-xl">✓</span>
                  <span>Aplicação prática do conteúdo</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4AF37] text-xl">✓</span>
                  <span>Acompanhamento do progresso</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="text-center text-xl text-neutral-400 mt-12 max-w-3xl mx-auto">
            Um lugar onde você não apenas <span className="text-white">consome</span> conteúdo, 
            mas <span className="text-[#D4AF37] font-semibold">aplica, acompanha e evolui</span>.
          </p>
        </div>
      </section>

      {/* ECOSSISTEMA - DIAGRAMA */}
      <section className="py-24 px-4 sm:px-6 lg:px-16 bg-black relative overflow-hidden">
        {/* Background decorativo */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl opacity-10"></div>
        </div>

        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-wider text-[#D4AF37] mb-4 font-semibold">
              Como funciona
            </h2>
            <h3 className="text-4xl sm:text-5xl font-bold mb-6">
              O Ecossistema Rise Up
            </h3>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Três pilares integrados para evolução real e sustentável
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* CONTEÚDO */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 rounded-2xl border border-neutral-800 group-hover:border-[#D4AF37]/50 transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                
                <h4 className="text-2xl font-bold mb-4">Conteúdo</h4>
                
                <p className="text-neutral-400 mb-6">
                  Infoprodutos práticos e aplicáveis
                </p>
                
                <ul className="space-y-3 text-neutral-300 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                    <span>Ebooks e guias</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                    <span>Planners e templates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                    <span>Desafios e treinamentos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                    <span>Mapas mentais</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* SISTEMA */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 rounded-2xl border border-neutral-800 group-hover:border-[#D4AF37]/50 transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                
                <h4 className="text-2xl font-bold mb-4">Sistema</h4>
                
                <p className="text-neutral-400 mb-6">
                  Métodos estruturados de aplicação
                </p>
                
                <ul className="space-y-3 text-neutral-300 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                    <span>Clareza mental</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                    <span>Planejamento estruturado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                    <span>Execução disciplinada</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                    <span>Acompanhamento contínuo</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* TECNOLOGIA */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 rounded-2xl border border-neutral-800 group-hover:border-[#D4AF37]/50 transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                
                <h4 className="text-2xl font-bold mb-4">Tecnologia</h4>
                
                <p className="text-neutral-400 mb-6">
                  App inteligente para organização
                </p>
                
                <ul className="space-y-3 text-neutral-300 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                    <span>Anotações ramificadas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                    <span>Metas e tarefas integradas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                    <span>Flashcards com IA</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                    <span>Relatórios de progresso</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Conexão visual */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-4 text-neutral-500">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
              <span className="text-sm uppercase tracking-wider">Integração completa</span>
              <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* PARA QUEM? */}
      <section className="py-24 px-4 sm:px-6 lg:px-16 bg-neutral-950">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-wider text-[#D4AF37] mb-4 font-semibold">
              Público
            </h2>
            <h3 className="text-4xl sm:text-5xl font-bold mb-6">
              Para quem é a Rise Up?
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-neutral-900 to-black p-6 rounded-2xl border border-neutral-800 hover:border-[#D4AF37]/30 transition-all duration-300">
              <div className="text-4xl mb-4">🎯</div>
              <h4 className="text-lg font-semibold mb-2">Quer evoluir de verdade</h4>
              <p className="text-neutral-400 text-sm">Não apenas consumir conteúdo</p>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-br from-neutral-900 to-black p-6 rounded-2xl border border-neutral-800 hover:border-[#D4AF37]/30 transition-all duration-300">
              <div className="text-4xl mb-4">🔄</div>
              <h4 className="text-lg font-semibold mb-2">Cansado de tentar e parar</h4>
              <p className="text-neutral-400 text-sm">Busca consistência real</p>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-br from-neutral-900 to-black p-6 rounded-2xl border border-neutral-800 hover:border-[#D4AF37]/30 transition-all duration-300">
              <div className="text-4xl mb-4">🧭</div>
              <h4 className="text-lg font-semibold mb-2">Busca clareza e foco</h4>
              <p className="text-neutral-400 text-sm">Quer organização mental</p>
            </div>

            {/* Card 4 */}
            <div className="bg-gradient-to-br from-neutral-900 to-black p-6 rounded-2xl border border-neutral-800 hover:border-[#D4AF37]/30 transition-all duration-300">
              <div className="text-4xl mb-4">📈</div>
              <h4 className="text-lg font-semibold mb-2">Valoriza crescimento</h4>
              <p className="text-neutral-400 text-sm">Eficiência e propósito</p>
            </div>
          </div>

          <p className="text-center text-xl text-neutral-400 mt-12 max-w-3xl mx-auto">
            Não importa onde você está hoje. O que importa é estar disposto a 
            <span className="text-[#D4AF37] font-semibold"> construir algo melhor</span>, um passo de cada vez.
          </p>
        </div>
      </section>

      {/* CTA FINAL - ONDAS DOURADAS */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#D4AF37] via-[#C5A028] to-[#B8941F] py-24 px-4 sm:px-6 lg:px-16">
        {/* Ondas decorativas */}
        <div className="absolute inset-0 opacity-20">
          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="currentColor" fillOpacity="0.3" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="currentColor" fillOpacity="0.2" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,213.3C960,203,1056,181,1152,181.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6">
            Evoluir é uma escolha diária
          </h2>
          
          <p className="text-xl sm:text-2xl text-black/80 mb-10 leading-relaxed max-w-2xl mx-auto">
            A Rise Up não promete uma vida perfeita. Promete algo melhor: 
            <span className="font-bold"> direção, clareza e consistência</span>.
          </p>

          <p className="text-lg text-black/70 mb-10">
            Se você está pronto para dar o próximo passo, nós estamos aqui para caminhar com você.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/produtos"
              className="w-full sm:w-auto px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-neutral-900 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Explorar produtos
            </Link>
            
            <Link
              href="/app"
              className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-xl font-semibold hover:bg-neutral-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Conhecer o App
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}