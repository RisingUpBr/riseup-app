// components/home/Benefits.tsx
"use client";

import Link from "next/link";

export default function Benefits() {
  const benefits = [
    {
      title: "Planeje em minutos",
      description: "Defina suas prioridades antes do caos começar. O app guia você pelas decisões mais importantes do dia em menos de 5 minutos. Sem sobrecarga, sem paralisia.",
      mockup: (
        <div className="relative w-full h-full flex items-center justify-center p-8">
          <div className="w-full max-w-md bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl p-6 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-white font-bold">
                ✓
              </div>
              <div>
                <h4 className="font-bold text-black dark:text-white">Suas prioridades</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">3 minutos para planejar</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
                <span className="text-sm text-neutral-700 dark:text-neutral-300">Terminar relatório do projeto</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-600"></div>
                <span className="text-sm text-neutral-700 dark:text-neutral-300">Revisar emails importantes</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-600"></div>
                <span className="text-sm text-neutral-700 dark:text-neutral-300">Planejar semana seguinte</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Execute com foco",
      description: "Transforme intenção em ação com blocos de tempo estruturados. Cada bloco tem um objetivo claro. Você sabe exatamente o que fazer e por quanto tempo.",
      mockup: (
        <div className="relative w-full h-full flex items-center justify-center p-8">
          <div className="w-full max-w-md bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl p-6 border border-neutral-200 dark:border-neutral-700">
            <div className="mb-6">
              <h4 className="font-bold text-black dark:text-white mb-2">Bloco de foco</h4>
              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                </svg>
                <span>09:00 - 11:00 (2h)</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#D4AF37]/10 to-transparent dark:from-[#D4AF37]/20 border-l-4 border-[#D4AF37] rounded-lg p-4 mb-4">
              <p className="font-medium text-black dark:text-white mb-1">Trabalho profundo</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Relatório de análise trimestral</p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-600 dark:text-neutral-400">Progresso</span>
              <span className="font-bold text-[#D4AF37]">45 min</span>
            </div>
            <div className="mt-2 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-[#D4AF37] rounded-full"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Aprenda o essencial",
      description: "Conteúdo direto ao ponto, sem enrolação. Técnicas comprovadas que você aplica no mesmo dia. Nada de teoria sem prática.",
      mockup: (
        <div className="relative w-full h-full flex items-center justify-center p-8">
          <div className="w-full max-w-md bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl p-6 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center text-white text-xl font-bold">
                📚
              </div>
              <div>
                <h4 className="font-bold text-black dark:text-white">Módulo 3</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Execução consistente</p>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center text-white text-xs">✓</div>
                <span className="text-sm text-neutral-700 dark:text-neutral-300">Como eliminar distrações</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center text-white text-xs">✓</div>
                <span className="text-sm text-neutral-700 dark:text-neutral-300">Sistema de blocos de tempo</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-neutral-300 dark:border-neutral-600"></div>
                <span className="text-sm text-neutral-400 dark:text-neutral-500">Manter consistência</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">Seu progresso</span>
              <span className="font-bold text-[#D4AF37]">67%</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Acompanhe sua evolução",
      description: "Veja seu progresso de forma simples e objetiva. Métricas que mostram o que funciona e o que ajustar. Sem dashboards complicados.",
      mockup: (
        <div className="relative w-full h-full flex items-center justify-center p-8">
          <div className="w-full max-w-md bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl p-6 border border-neutral-200 dark:border-neutral-700">
            <div className="mb-6">
              <h4 className="font-bold text-black dark:text-white mb-1">Últimos 7 dias</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Sua semana em números</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#D4AF37]/10 to-transparent dark:from-[#D4AF37]/20 rounded-lg p-4 border border-[#D4AF37]/20">
                <p className="text-2xl font-bold text-black dark:text-white">18</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">Tarefas concluídas</p>
              </div>
              <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                <p className="text-2xl font-bold text-black dark:text-white">94%</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">Taxa de execução</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-neutral-600 dark:text-neutral-400">Foco médio</span>
                  <span className="font-bold text-[#D4AF37]">2h 30min</span>
                </div>
                <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                  <div className="h-full w-4/5 bg-[#D4AF37] rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-neutral-600 dark:text-neutral-400">Consistência</span>
                  <span className="font-bold text-green-600 dark:text-green-400">+12%</span>
                </div>
                <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-black transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
            O que muda quando você tem um sistema.
          </h2>
          <p className="text-neutral-400 text-base max-w-[500px] mx-auto">
            Não é força de vontade. É estrutura.
          </p>
        </div>

        {/* Benefits Blocks — Base44 style */}
        <div className="space-y-4">
          {benefits.map((benefit, index) => (

            <div
              key={index}
              className={`flex flex-col md:flex-row rounded-2xl overflow-hidden ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Text card */}
              <div className="w-full md:w-1/2 bg-neutral-950 p-10 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-white leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-neutral-400 text-base mt-3 leading-relaxed">
                  {benefit.description}
                </p>
                <Link
                  href="/app"
                  className="mt-6 text-sm font-medium text-[#D4AF37] hover:text-[#E5C158] transition-colors w-fit"
                >
                  Começar →
                </Link>
              </div>

              {/* Visual card */}
              <div className="w-full md:w-1/2 bg-neutral-900 min-h-[360px] md:min-h-[420px] flex items-center justify-center">
                {benefit.mockup}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 flex justify-center">
          <Link
            href="/auth"
            className="bg-[#D4AF37] hover:bg-[#C5A028] text-black font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-lg shadow-[#D4AF37]/30"
          >
            Comece gratuitamente
          </Link>
        </div>
      </div>
    </section>
  );
}
