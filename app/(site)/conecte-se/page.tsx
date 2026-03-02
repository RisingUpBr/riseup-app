import Link from "next/link";

export default function ConectePage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* HERO - APRESENTAÇÃO */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-16">
        {/* Partículas douradas de fundo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse delay-100"></div>
          <div className="absolute top-60 left-1/4 w-1 h-1 bg-[#D4AF37] rounded-full animate-pulse delay-200"></div>
          <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse delay-300"></div>
          <div className="absolute top-1/2 right-10 w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse delay-500"></div>
          
          {/* Glow backgrounds */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37] opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D4AF37] opacity-5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full">
              <svg className="w-4 h-4 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span className="text-[#D4AF37] text-sm font-semibold uppercase tracking-wider">Ecossistema</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Conecte-se ao<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#C5A028]">
                ecossistema Rise Up
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-neutral-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Conteúdos, ferramentas e caminhos diferentes — todos levando ao mesmo objetivo: 
              <span className="text-[#D4AF37] font-semibold"> evolução real</span>.
            </p>

            {/* Decorative line */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO - O ECOSSISTEMA */}
      <section className="py-20 px-4 sm:px-6 lg:px-16 bg-neutral-950">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Como funciona o ecossistema
            </h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              Cada ponto do ecossistema Rise Up foi criado para se complementar. 
              Você pode começar por onde fizer mais sentido para você.
            </p>
          </div>

          {/* Diagrama visual hexagonal */}
          <div className="relative max-w-3xl mx-auto mb-12">
            {/* Linhas conectando (SVG) - atrás de tudo */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0">
              {/* Linhas do centro para cada ponto */}
              <line x1="50%" y1="50%" x2="50%" y2="8%" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="50%" y1="50%" x2="86%" y2="25%" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="50%" y1="50%" x2="86%" y2="75%" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="50%" y1="50%" x2="50%" y2="92%" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="50%" y1="50%" x2="14%" y2="75%" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="50%" y1="50%" x2="14%" y2="25%" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 4" />
            </svg>

            <div className="relative w-full h-[500px] sm:h-[600px]">
              {/* Centro - Rise Up (clicável para Home) */}
              <Link href="/" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 group">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-[#D4AF37] to-[#C5A028] rounded-full flex items-center justify-center shadow-2xl shadow-[#D4AF37]/20 group-hover:scale-110 transition-all duration-300">
                    <span className="text-black font-bold text-xl">Rise Up</span>
                  </div>
                  {/* Label no hover */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-black px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Ir para Home
                  </div>
                </div>
              </Link>

              {/* Recursos - Topo */}
              <Link href="/recursos" className="absolute top-0 left-1/2 -translate-x-1/2 group">
                <div className="relative">
                  <div className="w-24 h-24 bg-neutral-900 border-2 border-[#D4AF37]/30 rounded-full flex items-center justify-center group-hover:border-[#D4AF37] group-hover:scale-125 transition-all duration-300">
                    <svg className="w-8 h-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-neutral-900 border border-[#D4AF37] text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Recursos Gratuitos
                  </div>
                </div>
              </Link>

              {/* App - Direita Superior */}
              <Link href="/app" className="absolute top-1/4 right-0 sm:right-4 group">
                <div className="relative">
                  <div className="w-24 h-24 bg-neutral-900 border-2 border-[#D4AF37]/30 rounded-full flex items-center justify-center group-hover:border-[#D4AF37] group-hover:scale-125 transition-all duration-300">
                    <svg className="w-8 h-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-neutral-900 border border-[#D4AF37] text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    App Rise Up
                  </div>
                </div>
              </Link>

              {/* Produtos - Direita Inferior */}
              <Link href="/produtos" className="absolute bottom-1/4 right-0 sm:right-4 group">
                <div className="relative">
                  <div className="w-24 h-24 bg-neutral-900 border-2 border-[#D4AF37]/30 rounded-full flex items-center justify-center group-hover:border-[#D4AF37] group-hover:scale-125 transition-all duration-300">
                    <svg className="w-8 h-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-neutral-900 border border-[#D4AF37] text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Infoprodutos
                  </div>
                </div>
              </Link>

              {/* Comunidade - Base */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 group cursor-pointer">
                <div className="relative">
                  <div className="w-24 h-24 bg-neutral-900 border-2 border-[#D4AF37]/30 rounded-full flex items-center justify-center group-hover:border-[#D4AF37] group-hover:scale-125 transition-all duration-300">
                    <svg className="w-8 h-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-neutral-900 border border-[#D4AF37] text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Comunidade
                  </div>
                </div>
              </div>

              {/* Sobre - Esquerda Inferior */}
              <Link href="/sobre" className="absolute bottom-1/4 left-0 sm:left-4 group">
                <div className="relative">
                  <div className="w-24 h-24 bg-neutral-900 border-2 border-[#D4AF37]/30 rounded-full flex items-center justify-center group-hover:border-[#D4AF37] group-hover:scale-125 transition-all duration-300">
                    <svg className="w-8 h-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-neutral-900 border border-[#D4AF37] text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Sobre o Rise Up
                  </div>
                </div>
              </Link>

              {/* Conecte-se - Esquerda Superior */}
              <Link href="/conecte-se" className="absolute top-1/4 left-0 sm:left-4 group">
                <div className="relative">
                  <div className="w-24 h-24 bg-neutral-900 border-2 border-[#D4AF37]/30 rounded-full flex items-center justify-center group-hover:border-[#D4AF37] group-hover:scale-125 transition-all duration-300">
                    <svg className="w-8 h-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-neutral-900 border border-[#D4AF37] text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Conecte-se
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LINKS DO ECOSSISTEMA */}
      <section className="py-20 px-4 sm:px-6 lg:px-16 bg-black">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Explore o ecossistema
            </h2>
            <p className="text-neutral-400 text-lg">
              Escolha por onde começar sua jornada
            </p>
          </div>

          {/* Grid de Links */}
          <div className="grid gap-6">
            {/* CONTEÚDO */}
            <div className="space-y-4">
              <h3 className="text-sm uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Conteúdo
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Recursos Gratuitos */}
                <Link href="/recursos" className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-xl p-6 group-hover:border-[#D4AF37]/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xl font-bold">Recursos Gratuitos</h4>
                      <svg className="w-5 h-5 text-neutral-600 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                    <p className="text-neutral-400 text-sm">
                      Materiais práticos para organizar sua vida e clarear sua mente.
                    </p>
                  </div>
                </Link>

                {/* Sobre */}
                <Link href="/sobre" className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-xl p-6 group-hover:border-[#D4AF37]/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xl font-bold">Sobre o Rise Up</h4>
                      <svg className="w-5 h-5 text-neutral-600 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                    <p className="text-neutral-400 text-sm">
                      Conheça nossa missão, visão e valores que guiam tudo.
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* PRODUTOS */}
            <div className="space-y-4">
              <h3 className="text-sm uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Produtos
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {/* App Rise Up */}
                <Link href="/app" className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-xl p-6 group-hover:border-[#D4AF37]/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xl font-bold">App Rise Up</h4>
                      <span className="px-2 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded text-[#D4AF37] text-xs font-bold">
                        NOVO
                      </span>
                    </div>
                    <p className="text-neutral-400 text-sm">
                      Organize sua mente com anotações ramificadas e metas integradas.
                    </p>
                  </div>
                </Link>

                {/* Infoprodutos */}
                <Link href="/produtos" className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-xl p-6 group-hover:border-[#D4AF37]/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xl font-bold">Infoprodutos</h4>
                      <svg className="w-5 h-5 text-neutral-600 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                    <p className="text-neutral-400 text-sm">
                      Ebooks, planners, treinamentos e materiais completos.
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* COMUNIDADE & REDES */}
            <div className="space-y-4">
              <h3 className="text-sm uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Comunidade & Redes
              </h3>
              
              <div className="grid sm:grid-cols-3 gap-4">
                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/riseup.vibe/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-xl p-6 group-hover:border-purple-500/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <svg className="w-5 h-5 text-neutral-600 group-hover:text-purple-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <h4 className="font-semibold">Instagram</h4>
                  </div>
                </a>

                {/* YouTube */}
                <a 
                  href="https://www.youtube.com/@canalRiseUp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-xl p-6 group-hover:border-red-500/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <svg className="w-5 h-5 text-neutral-600 group-hover:text-red-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <h4 className="font-semibold">YouTube</h4>
                  </div>
                </a>

                {/* TikTok */}
                <a 
                  href="https://www.tiktok.com/@riseup.vibe" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-xl p-6 group-hover:border-pink-500/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <svg className="w-8 h-8 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                      </svg>
                      <svg className="w-5 h-5 text-neutral-600 group-hover:text-pink-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <h4 className="font-semibold">TikTok</h4>
                  </div>
                </a>

                {/* Email */}
                <a 
                  href="mailto:ris3upbr@gmail.com" 
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-xl p-6 group-hover:border-[#D4AF37]/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <svg className="w-8 h-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <svg className="w-5 h-5 text-neutral-600 group-hover:text-[#D4AF37] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-neutral-500 text-xs mt-1">ris3upbr@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEEDBACKS RÁPIDOS */}
      <section className="py-20 px-4 sm:px-6 lg:px-16 bg-neutral-950">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Resultados de quem já começou
            </h2>
            <p className="text-neutral-400">
              Pessoas reais, transformações reais
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feedback 1 - 4 estrelas */}
            <div className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-2xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(4)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <svg className="w-5 h-5 text-neutral-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="text-neutral-300 mb-4 italic">
                "Os recursos gratuitos já me ajudaram muito. Finalmente consegui criar uma rotina que funciona pra mim."
              </p>
              <div className="flex items-center gap-3">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria&backgroundColor=d4af37" 
                  alt="Maria Silva"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">Maria Silva</p>
                  <p className="text-neutral-500 text-sm">Designer</p>
                </div>
              </div>
            </div>

            {/* Feedback 2 - 4.5 estrelas */}
            <div className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-2xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(4)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <svg className="w-5 h-5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                  <defs>
                    <linearGradient id="half-star">
                      <stop offset="50%" stopColor="currentColor" />
                      <stop offset="50%" stopColor="rgb(64 64 64)" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#half-star)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="text-neutral-300 mb-4 italic">
                "O App é sensacional. A forma de organizar as anotações em árvore mudou completamente meu jeito de estudar e trabalhar."
              </p>
              <div className="flex items-center gap-3">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro&backgroundColor=d4af37" 
                  alt="Pedro Oliveira"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">Pedro Oliveira</p>
                  <p className="text-neutral-500 text-sm">Desenvolvedor</p>
                </div>
              </div>
            </div>

            {/* Feedback 3 - 5 estrelas */}
            <div className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-2xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-neutral-300 mb-4 italic">
                "Melhor investimento que fiz. Os infoprodutos são diretos, sem enrolação, e realmente aplicáveis no dia a dia."
              </p>
              <div className="flex items-center gap-3">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ana&backgroundColor=d4af37" 
                  alt="Ana Costa"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">Ana Costa</p>
                  <p className="text-neutral-500 text-sm">Empreendedora</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#D4AF37] via-[#C5A028] to-[#B8941F] py-20 px-4 sm:px-6 lg:px-16">
        {/* Ondas decorativas */}
        <div className="absolute inset-0 opacity-20">
          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="currentColor" fillOpacity="0.3" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6">
            Escolha por onde começar
          </h2>
          
          <p className="text-xl text-black/80 mb-10 max-w-2xl mx-auto">
            Cada ponto do ecossistema Rise Up te leva mais perto da melhor versão de você mesmo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/recursos"
              className="w-full sm:w-auto px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-neutral-900 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Começar com recursos gratuitos
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