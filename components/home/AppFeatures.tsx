// components/home/AppFeatures.tsx
export default function AppFeatures() {
  const features = [
    {
      title: "Planejamento diário guiado",
      description:
        "Organize prioridades em poucos minutos e elimine o excesso de decisões antes do dia começar.",
    },
    {
      title: "Execução por blocos",
      description:
        "Transforme tarefas em blocos claros de ação e mantenha o foco sem depender de motivação.",
    },
    {
      title: "Progresso visível",
      description:
        "Acompanhe sua evolução de forma simples e objetiva, sem gráficos desnecessários.",
    },
    {
      title: "Conteúdos acionáveis",
      description:
        "Aprenda apenas o que pode ser aplicado agora. Sem teoria vazia.",
    },
    {
      title: "Integração com a vida real",
      description:
        "O app se adapta à sua rotina. Não exige perfeição, exige consistência.",
    },
  ];

  return (
    <section className="bg-black py-28">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Cabeçalho */}
        <div className="max-w-2xl mb-20">
          <p className="text-sm uppercase tracking-widest text-[#D4AF37] mb-4">
            Funcionalidades essenciais
          </p>

          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            Tudo o que você precisa para executar.
            <br />
            Nada do que te distrai.
          </h2>

          <p className="mt-6 text-[#B3B3B3] text-base md:text-lg">
            O app não tenta fazer tudo.  
            Ele faz o que importa, do jeito certo.
          </p>
        </div>

        {/* Grid de features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="border border-[#1E1E1E] rounded-2xl p-8 bg-[#0E0E0E] hover:border-[#D4AF37]/40 transition-colors"
            >
              <h3 className="text-lg font-medium text-white mb-3">
                {feature.title}
              </h3>

              <p className="text-sm text-[#B3B3B3] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
