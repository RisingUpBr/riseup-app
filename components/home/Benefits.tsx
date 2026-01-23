// components/home/Benefits.tsx
export default function Benefits() {
  return (
    <section className="bg-[#0A0A0A] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
            Clareza para pensar. Estrutura para agir.
          </h2>
          <p className="mt-4 text-[#B3B3B3] text-base md:text-lg">
            A Rise Up organiza sua mente, sua rotina e suas decisões — sem ruído,
            sem distração.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Clareza mental diária",
              text: "Saiba exatamente no que focar, todos os dias.",
            },
            {
              title: "Execução com direção",
              text: "Ação guiada por estrutura, não por motivação.",
            },
            {
              title: "Disciplina prática",
              text: "Disciplina como sistema, não como força de vontade.",
            },
            {
              title: "Crescimento contínuo",
              text: "Evolução visível no tempo, não picos passageiros.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="group bg-[#111111] border border-[#1E1E1E] rounded-2xl p-8 transition-all duration-200 hover:border-[#D4AF37]"
            >
              <h3 className="text-lg font-semibold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-[#B3B3B3] leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
