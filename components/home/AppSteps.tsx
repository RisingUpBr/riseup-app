// components/home/AppSteps.tsx
export default function AppSteps() {
  const steps = [
    {
      number: "01",
      title: "Crie sua conta",
      description:
        "Apenas o essencial para entender quem você é e como pode evoluir. Sem promessas irreais.",
    },
    {
      number: "02",
      title: "Organize seu dia",
      description:
        "Defina prioridades reais e transforme intenção em ação prática.",
    },
    {
      number: "03",
      title: "Execute com consistência",
      description:
        "O progresso acontece no ritmo certo, dentro da sua rotina — sem depender de motivação.",
    },
  ];

  return (
    <section className="bg-black py-28">
      <div className="max-w-6xl mx-auto px-6">

        {/* Cabeçalho */}
        <div className="max-w-2xl mb-24">
          <p className="text-sm uppercase tracking-widest text-[#D4AF37] mb-4">
            Como funciona
          </p>

          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            Começar é simples.
            <br />
            Continuar é natural.
          </h2>

          <p className="mt-6 text-[#B3B3B3] text-base md:text-lg">
            O app foi desenhado para reduzir fricção,
            <br />
            não para criar mais uma obrigação.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-[#1E1E1E] pl-10 space-y-20">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Número */}
              <div className="absolute -left-[2.15rem] top-1 w-10 h-10 rounded-full bg-black border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] text-sm font-medium">
                {step.number}
              </div>

              <h3 className="text-lg font-medium text-white mb-2">
                {step.title}
              </h3>

              <p className="text-sm text-[#B3B3B3] max-w-md leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
