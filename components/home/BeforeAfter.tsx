// components/home/BeforeAfter.tsx
export default function BeforeAfter() {
  return (
    <section className="bg-[#0A0A0A] py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            O antes é confuso. O depois é estruturado.
          </h2>
          <p className="mt-4 text-[#B3B3B3] text-base md:text-lg">
            A diferença não é quem você é. É o sistema que você usa todos os dias.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Linha central */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-[#D4AF37]/30" />

          {/* BEFORE */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-red-400">
              Antes da Rise Up
            </h3>

            {[
              "Falta de clareza sobre prioridades",
              "Excesso de informação e distração",
              "Começa motivado e abandona rápido",
              "Depende de força de vontade",
              "Progresso inconsistente",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-[#111111] border border-[#1E1E1E] rounded-xl p-6"
              >
                <p className="text-sm text-[#B3B3B3]">{item}</p>
              </div>
            ))}
          </div>

          {/* AFTER */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-[#D4AF37]">
              Depois da Rise Up
            </h3>

            {[
              "Prioridades claras todos os dias",
              "Sistema simples e objetivo",
              "Execução consistente",
              "Disciplina prática e sustentável",
              "Evolução visível no tempo",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-[#111111] border border-[#D4AF37]/30 rounded-xl p-6"
              >
                <p className="text-sm text-[#E5E5E5]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
