// components/home/FinalCTA.tsx
export default function FinalCTA() {
  return (
    <section className="py-20 md:py-32 bg-[#D4AF37] overflow-hidden relative">
      {/* Background com Ondas Estilo Base44 */}
      <div className="absolute inset-0">
        {/* Onda 1 - Topo */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#E5C158] to-[#D4AF37] opacity-60"></div>
        
        {/* Onda 2 - Meio */}
        <div className="absolute top-1/4 left-0 w-full h-1/2">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 320">
            <path
              fill="#C9A532"
              fillOpacity="0.4"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,122.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>

        {/* Onda 3 - Baixo */}
        <div className="absolute bottom-0 left-0 w-full h-1/2">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 320">
            <path
              fill="#B8941F"
              fillOpacity="0.3"
              d="M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,112C672,107,768,149,864,165.3C960,181,1056,171,1152,149.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* CARD CENTRAL - MENOR E MAIS DIRETO */}
        <div className="bg-neutral-900 rounded-3xl p-8 md:p-10 text-center shadow-2xl">
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
            Pare de planejar.
            <br />
            Comece a executar.
          </h2>

          <p className="text-sm md:text-base text-neutral-400 mb-8 max-w-xl mx-auto leading-relaxed">
            O sistema está pronto. Só falta você.
          </p>

          {/* CTA Principal */}
          <div className="mb-4">
            <a
              href="/auth"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold rounded-full transition-all hover:scale-105 shadow-lg"
            >
              Criar conta gratuita
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Nota pequena */}
          <p className="text-xs text-neutral-500">
            Sem cartão. Cancelamento a qualquer momento.
          </p>

        </div>

      </div>
    </section>
  );
}