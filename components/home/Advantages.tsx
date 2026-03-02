// components/home/Advantages.tsx
export default function Advantages() {
  const advantages = [
    {
      title: "Planejamento em minutos",
      description: "Organize seu dia inteiro em menos de 5 minutos. Sem complexidade.",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="text-8xl font-bold text-[#D4AF37] opacity-20">3</div>
          <div className="absolute text-2xl text-white font-bold">min</div>
        </div>
      ),
    },
    {
      title: "Progresso visível",
      description: "Acompanhe sua evolução com métricas simples e objetivas.",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center">
          <svg className="w-32 h-32" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="rgba(212, 175, 55, 0.2)"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="8"
              strokeDasharray="251.2"
              strokeDashoffset="62.8"
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              className="transition-all duration-1000"
            />
            <text
              x="50"
              y="50"
              textAnchor="middle"
              dy="7"
              fontSize="20"
              fill="white"
              fontWeight="bold"
            >
              75%
            </text>
          </svg>
        </div>
      ),
    },
    {
      title: "Execução sem travamento",
      description: "Sistema de blocos que elimina procrastinação e paralisia por análise.",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="grid grid-cols-2 gap-2">
            <div className="w-16 h-16 bg-[#D4AF37] rounded-lg opacity-100"></div>
            <div className="w-16 h-16 bg-[#D4AF37] rounded-lg opacity-60"></div>
            <div className="w-16 h-16 bg-[#D4AF37] rounded-lg opacity-40"></div>
            <div className="w-16 h-16 bg-[#D4AF37] rounded-lg opacity-20"></div>
          </div>
        </div>
      ),
    },
    {
      title: "Conteúdos diretos",
      description: "Sem enrolação. Só o que funciona, do jeito que você precisa aplicar.",
      visual: (
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-3">
          <div className="w-24 h-2 bg-[#D4AF37] rounded-full"></div>
          <div className="w-20 h-2 bg-[#D4AF37] rounded-full opacity-70"></div>
          <div className="w-16 h-2 bg-[#D4AF37] rounded-full opacity-50"></div>
          <div className="w-12 h-2 bg-[#D4AF37] rounded-full opacity-30"></div>
        </div>
      ),
    },
    {
      title: "Acesso vitalício",
      description: "Comprou uma vez, é seu para sempre. Sem mensalidades nos infoprodutos.",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* SÍMBOLO INFINITO CORRETO - IGUAL AO DAS IMAGENS */}
          <svg className="w-48 h-32" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 20,50 Q 20,20 50,20 Q 65,20 75,30 Q 85,40 100,50 Q 115,60 125,70 Q 135,80 150,80 Q 180,80 180,50 Q 180,20 150,20 Q 135,20 125,30 Q 115,40 100,50 Q 85,60 75,70 Q 65,80 50,80 Q 20,80 20,50 Z"
              stroke="#D4AF37"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
      ),
    },
    {
      title: "App + Infoprodutos",
      description: "Ecossistema integrado. Aprenda nos cursos, execute no app.",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#D4AF37] flex items-center justify-center text-2xl">
            📱
          </div>
          <div className="text-[#D4AF37] text-3xl font-bold">+</div>
          <div className="w-12 h-12 rounded-xl bg-[#D4AF37] flex items-center justify-center text-2xl">
            📚
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-black transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* HEADER - ESTILO BOLT */}
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

        {/* GRID DE ADVANTAGES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="group relative bg-neutral-900 border border-neutral-800 rounded-2xl p-8 hover:border-[#D4AF37] transition-all duration-300 overflow-hidden"
            >
              {/* Visual/Ícone */}
              <div className="relative h-40 mb-6 flex items-center justify-center">
                {advantage.visual}
              </div>

              {/* Título */}
              <h3 className="relative text-xl font-bold text-white mb-3 leading-tight">
                {advantage.title}
              </h3>

              {/* Descrição */}
              <p className="relative text-sm text-neutral-400 leading-relaxed">
                {advantage.description}
              </p>

              {/* Glow Effect no Hover */}
              <div className="absolute inset-0 bg-[#D4AF37] opacity-0 group-hover:opacity-5 blur-3xl transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
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