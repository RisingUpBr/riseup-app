// components/home/AppPresentation.tsx
export default function AppPresentation() {
  return (
    <section className="bg-black py-28">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        
        {/* Conteúdo */}
        <div>
          <p className="text-sm uppercase tracking-widest text-[#D4AF37] mb-4">
            O sistema por trás da execução
          </p>

          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            O Rise Up App organiza o que sua mente não consegue sustentar sozinha.
          </h2>

          <p className="mt-6 text-[#B3B3B3] text-base md:text-lg max-w-lg">
            Menos decisão. Menos distração.  
            Mais ação diária com propósito.
          </p>

          <ul className="mt-10 space-y-4">
            {[
              "Planeje o dia em minutos",
              "Execute sem depender de motivação",
              "Visualize progresso real",
              "Construa disciplina com consistência",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-3 text-sm text-[#E5E5E5]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Mockup abstrato */}
        <div className="relative">
          <div className="bg-[#0E0E0E] border border-[#1E1E1E] rounded-2xl p-8 space-y-6">
            <div className="h-4 w-24 bg-[#1E1E1E] rounded-full" />
            <div className="space-y-3">
              <div className="h-12 bg-[#141414] rounded-lg" />
              <div className="h-12 bg-[#141414] rounded-lg" />
              <div className="h-12 bg-[#141414] rounded-lg" />
            </div>
            <div className="h-10 w-32 bg-[#D4AF37]/20 rounded-full" />
          </div>

          {/* Glow sutil */}
          <div className="absolute -inset-4 bg-[#D4AF37]/10 blur-3xl -z-10" />
        </div>
      </div>
    </section>
  );
}
