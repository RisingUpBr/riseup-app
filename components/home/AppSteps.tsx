// components/home/AppSteps.tsx
export default function AppSteps() {
  return (
    <section className="py-20 md:py-32 bg-white dark:bg-neutral-950 transition-colors overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-3xl">🚀</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-6 leading-tight">
            Comece a executar em{" "}
            <span className="text-[#D4AF37]">3 passos simples</span>
          </h2>
          
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Sem curva de aprendizado complexa. Cadastre, acesse e use.
          </p>
        </div>

        {/* STEPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* STEP 1: Cadastro */}
          <div className="group">
            {/* Mockup Visual */}
            <div className="relative bg-gradient-to-br from-[#FFE600] to-[#FFD000] rounded-2xl aspect-[4/3] mb-6 overflow-hidden flex items-center justify-center p-8">
              {/* Formulário simplificado */}
              <div className="w-full max-w-xs">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-2xl">
                  <div className="space-y-3 mb-4">
                    <div className="h-10 bg-neutral-100 rounded-lg"></div>
                    <div className="h-10 bg-neutral-100 rounded-lg"></div>
                    <div className="h-10 bg-neutral-100 rounded-lg"></div>
                  </div>
                  <div className="h-11 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">CRIAR CONTA GRÁTIS</span>
                  </div>
                </div>
              </div>
              
              {/* Ícone decorativo */}
              <div className="absolute bottom-4 right-4 text-4xl opacity-50">✨</div>
            </div>
            
            {/* Texto */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-2">
                Passo 1: Crie sua conta grátis
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Cadastro rápido sem cartão de crédito. Leva menos de 1 minuto.
              </p>
            </div>
          </div>

          {/* STEP 2: Dashboard */}
          <div className="group">
            {/* Mockup Visual */}
            <div className="relative bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950/30 dark:to-pink-950/30 rounded-2xl aspect-[4/3] mb-6 overflow-hidden p-6">
              {/* Dashboard com menu lateral */}
              <div className="flex gap-3 h-full">
                {/* Menu lateral */}
                <div className="w-16 bg-white dark:bg-neutral-900 rounded-lg p-2 space-y-2 shadow-xl">
                  <div className="w-full aspect-square bg-[#D4AF37] rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">📝</span>
                  </div>
                  <div className="w-full aspect-square bg-neutral-200 dark:bg-neutral-800 rounded-lg flex items-center justify-center">
                    <span className="text-neutral-600 dark:text-neutral-400 text-xl">🎯</span>
                  </div>
                  <div className="w-full aspect-square bg-neutral-200 dark:bg-neutral-800 rounded-lg flex items-center justify-center">
                    <span className="text-neutral-600 dark:text-neutral-400 text-xl">📊</span>
                  </div>
                  <div className="w-full aspect-square bg-neutral-200 dark:bg-neutral-800 rounded-lg flex items-center justify-center">
                    <span className="text-neutral-600 dark:text-neutral-400 text-xl">🗂️</span>
                  </div>
                </div>
                
                {/* Área de conteúdo */}
                <div className="flex-1 bg-white dark:bg-neutral-900 rounded-lg p-4 shadow-xl">
                  <div className="space-y-2">
                    <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4"></div>
                    <div className="h-4 bg-neutral-100 dark:bg-neutral-800 rounded w-full"></div>
                    <div className="h-4 bg-neutral-100 dark:bg-neutral-800 rounded w-5/6"></div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="h-12 bg-[#D4AF37]/20 rounded"></div>
                      <div className="h-12 bg-[#D4AF37]/20 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Ícone decorativo */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-sm">✓</span>
              </div>
            </div>
            
            {/* Texto */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-2">
                Passo 2: Acesse o dashboard
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Todas as funcionalidades no menu lateral: anotações, flashcards, blocos de tempo e mais.
              </p>
            </div>
          </div>

          {/* STEP 3: Uso */}
          <div className="group">
            {/* Mockup Visual */}
            <div className="relative bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl aspect-[4/3] mb-6 overflow-hidden p-6">
              {/* Lista de funcionalidades */}
              <div className="bg-white dark:bg-neutral-900 rounded-lg p-4 shadow-xl h-full space-y-3">
                <div className="flex items-center gap-3 p-3 bg-[#D4AF37]/10 rounded-lg border-l-4 border-[#D4AF37]">
                  <div className="text-2xl">📝</div>
                  <div className="flex-1">
                    <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4"></div>
                  </div>
                  <div className="w-16 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">USAR</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <div className="text-2xl">🎴</div>
                  <div className="flex-1">
                    <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-2/3"></div>
                  </div>
                  <div className="w-16 h-8 bg-neutral-200 dark:bg-neutral-700 rounded-full flex items-center justify-center">
                    <span className="text-neutral-600 dark:text-neutral-400 text-xs font-bold">USAR</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <div className="text-2xl">📅</div>
                  <div className="flex-1">
                    <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6"></div>
                  </div>
                  <div className="w-16 h-8 bg-neutral-200 dark:bg-neutral-700 rounded-full flex items-center justify-center">
                    <span className="text-neutral-600 dark:text-neutral-400 text-xs font-bold">USAR</span>
                  </div>
                </div>
              </div>
              
              {/* Ícone decorativo */}
              <div className="absolute bottom-4 right-4 text-4xl opacity-50">🎯</div>
            </div>
            
            {/* Texto */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-2">
                Passo 3: Escolha e execute
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Anotações ramificadas, flashcards com IA, blocos de tempo. Use o que precisa, quando precisa.
              </p>
            </div>
          </div>

        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/auth"
            className="inline-flex items-center gap-2 px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold hover:scale-105 transition-transform text-center"
          >
            Começar grátis agora
          </a>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-black dark:border-white text-black dark:text-white rounded-full font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-center"
          >
            Ver planos
          </a>
        </div>

      </div>
    </section>
  );
}