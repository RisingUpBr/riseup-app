// components/home/Advantages.tsx
export default function Advantages() {
  return (
    <section className="py-20 md:py-32 bg-black transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-400 mb-3 leading-tight">
            Tudo o que você precisa para executar.
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            <span className="text-[#D4AF37]">Nada do que te distrai.</span>
          </h3>
          <p className="text-base md:text-lg text-neutral-500 max-w-3xl mx-auto leading-relaxed mt-6">
            Rise Up foi desenhado para reduzir fricção, não para adicionar complexidade.
          </p>
        </div>

        {/* BENTO GRID — 4 cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* Card 1 — col-span-7 — Planejamento em minutos */}
          <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-[#D4AF37]/40 transition-all flex flex-col gap-4">
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Planejamento em minutos</h3>
              <p className="text-neutral-400 text-sm">Organize seu dia inteiro em menos de 5 minutos. Sem complexidade.</p>
            </div>
            <svg viewBox="0 0 280 110" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Calendar grid 3×3 — diagonal in #D4AF37 */}
              <rect x="18" y="6"  width="38" height="24" rx="6" fill="#D4AF37" opacity="0.9"/>
              <rect x="66" y="6"  width="38" height="24" rx="6" fill="#333"/>
              <rect x="114" y="6" width="38" height="24" rx="6" fill="#333"/>
              <rect x="18" y="38" width="38" height="24" rx="6" fill="#333"/>
              <rect x="66" y="38" width="38" height="24" rx="6" fill="#D4AF37" opacity="0.9"/>
              <rect x="114" y="38" width="38" height="24" rx="6" fill="#333"/>
              <rect x="18" y="70" width="38" height="24" rx="6" fill="#333"/>
              <rect x="66" y="70" width="38" height="24" rx="6" fill="#333"/>
              <rect x="114" y="70" width="38" height="24" rx="6" fill="#D4AF37" opacity="0.9"/>
              {/* Clock outline — top-right */}
              <circle cx="228" cy="50" r="28" stroke="#D4AF37" strokeWidth="2"/>
              <circle cx="228" cy="50" r="2" fill="#D4AF37"/>
              <line x1="228" y1="50" x2="228" y2="26" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round"/>
              <line x1="228" y1="50" x2="240" y2="34" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Card 2 — col-span-5 — Conteúdos diretos */}
          <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-[#D4AF37]/40 transition-all flex flex-col gap-4">
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Conteúdos diretos</h3>
              <p className="text-neutral-400 text-sm">Sem enrolação. Só o que funciona, do jeito que você precisa aplicar.</p>
            </div>
            <svg viewBox="0 0 160 110" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4" width="152" height="102" rx="8" fill="#1a1a1a"/>
              <rect x="14" y="26" width="3" height="10" rx="1.5" fill="#D4AF37"/>
              <rect x="22" y="28" width="110" height="6" rx="3" fill="#555"/>
              <rect x="14" y="48" width="3" height="10" rx="1.5" fill="#D4AF37"/>
              <rect x="22" y="50" width="90" height="6" rx="3" fill="#444"/>
              <rect x="14" y="70" width="3" height="10" rx="1.5" fill="#D4AF37"/>
              <rect x="22" y="72" width="70" height="6" rx="3" fill="#3a3a3a"/>
            </svg>
          </div>

          {/* Card 3 — col-span-5 — Acesso vitalício */}
          <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-[#D4AF37]/40 transition-all flex flex-col gap-4">
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Acesso vitalício</h3>
              <p className="text-neutral-400 text-sm">Comprou uma vez, é seu para sempre. Sem mensalidades nos infoprodutos.</p>
            </div>
            <svg viewBox="0 0 200 110" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4" width="192" height="102" rx="8" fill="#1a1a1a"/>
              <path
                d="M 30,55 Q 30,30 55,30 Q 70,30 80,42 Q 90,52 100,55 Q 110,58 120,68 Q 130,80 145,80 Q 170,80 170,55 Q 170,30 145,30 Q 130,30 120,42 Q 110,52 100,55 Q 90,58 80,68 Q 70,80 55,80 Q 30,80 30,55 Z"
                stroke="#D4AF37"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text x="100" y="100" textAnchor="middle" fontSize="8" fill="#555" fontFamily="sans-serif">1× para sempre</text>
            </svg>
          </div>

          {/* Card 4 — col-span-7 — App + Infoprodutos */}
          <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-[#D4AF37]/40 transition-all flex flex-col gap-4">
            <div>
              <h3 className="font-bold text-white text-lg mb-1">App + Infoprodutos</h3>
              <p className="text-neutral-400 text-sm">Ecossistema integrado. Aprenda nos cursos, execute no app.</p>
            </div>
            <svg viewBox="0 0 280 110" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4" width="272" height="102" rx="8" fill="#1a1a1a"/>
              <rect x="20" y="20" width="88" height="70" rx="8" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.7"/>
              <rect x="44" y="30" width="40" height="50" rx="5" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
              <rect x="49" y="34" width="30" height="35" rx="2" fill="#D4AF37" fillOpacity="0.1"/>
              <circle cx="64" cy="75" r="3" fill="none" stroke="#D4AF37" strokeWidth="1.2"/>
              <text x="64" y="100" textAnchor="middle" fontSize="8" fill="#555" fontFamily="sans-serif">App</text>
              <text x="140" y="62" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#D4AF37" fontFamily="sans-serif">+</text>
              <line x1="110" y1="55" x2="127" y2="55" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 2"/>
              <line x1="153" y1="55" x2="170" y2="55" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 2"/>
              <rect x="172" y="20" width="88" height="70" rx="8" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.7"/>
              <rect x="196" y="28" width="40" height="50" rx="3" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
              <line x1="216" y1="28" x2="216" y2="78" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.5"/>
              <rect x="200" y="36" width="12" height="4" rx="1" fill="#D4AF37" fillOpacity="0.4"/>
              <rect x="200" y="44" width="12" height="4" rx="1" fill="#D4AF37" fillOpacity="0.3"/>
              <rect x="200" y="52" width="12" height="4" rx="1" fill="#D4AF37" fillOpacity="0.2"/>
              <text x="216" y="100" textAnchor="middle" fontSize="8" fill="#555" fontFamily="sans-serif">Conteúdo</text>
            </svg>
          </div>

        </div>

        {/* CTA FINAL */}
        <div className="text-center mt-16">
          <a
            href="/auth"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold rounded-xl transition-all hover:scale-105"
          >
            Começar agora
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
