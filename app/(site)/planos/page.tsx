"use client";

import Link from "next/link";
import { useState } from "react";

const starPath =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

const checkPath = "M5 13l4 4L19 7";

function Stars({ count, half = false }: { count: number; half?: boolean }) {
  return (
    <div className="flex items-center gap-1 mb-4">
      {[...Array(count)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
          <path d={starPath} />
        </svg>
      ))}
      {half && (
        <div className="relative w-4 h-4">
          <svg className="absolute inset-0 w-4 h-4 text-neutral-700" fill="currentColor" viewBox="0 0 20 20">
            <path d={starPath} />
          </svg>
          <svg className="absolute inset-0 w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20" style={{ clipPath: "inset(0 50% 0 0)" }}>
            <path d={starPath} />
          </svg>
        </div>
      )}
      {!half && (
        <svg className="w-4 h-4 text-neutral-700" fill="currentColor" viewBox="0 0 20 20">
          <path d={starPath} />
        </svg>
      )}
    </div>
  );
}

export default function PlanosPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCheckout = (plan: string) => {
    const userLang = navigator.language.toLowerCase();
    const kiwifyUrls: Record<string, string> = {
      essencial: "https://pay.kiwify.com.br/riseup-essencial",
      avancado: "https://pay.kiwify.com.br/riseup-avancado",
      completo: "https://pay.kiwify.com.br/riseup-completo",
    };
    const lemonUrls: Record<string, string> = {
      essencial: "https://riseup.lemonsqueezy.com/checkout/buy/essential",
      avancado: "https://riseup.lemonsqueezy.com/checkout/buy/advanced",
      completo: "https://riseup.lemonsqueezy.com/checkout/buy/complete",
    };
    if (userLang.startsWith("pt")) {
      window.location.href = kiwifyUrls[plan];
    } else {
      window.location.href = lemonUrls[plan];
    }
  };

  const faqs = [
    {
      q: "Os infoprodutos têm acesso vitalício ou é mensalidade?",
      a: "Acesso vitalício. Você compra uma vez e tem acesso para sempre ao conteúdo. Sem mensalidades, sem renovações. O material é seu permanentemente, incluindo todas as atualizações futuras que fizermos.",
    },
    {
      q: "Qual a diferença entre o app e os infoprodutos?",
      a: "Os infoprodutos são materiais de conteúdo (ebooks, guias, planners, treinamentos) com acesso vitalício. O App é uma ferramenta tecnológica para organizar sua rotina, anotações e metas em tempo real. Eles se complementam: o conteúdo te ensina, o app te ajuda a aplicar.",
    },
    {
      q: "Os conteúdos são atualizados?",
      a: "Sim. A Rise Up evolui constantemente. Quando houver melhorias, novos materiais ou atualizações relacionadas ao seu plano, você terá acesso automaticamente. Sem custo adicional.",
    },
    {
      q: "O App está incluso nos planos de infoprodutos?",
      a: "Os infoprodutos e o App são produtos separados. No entanto, o plano Completo inclui benefícios especiais relacionados ao App Rise Up. Os detalhes ficam claros na página de checkout antes da compra.",
    },
    {
      q: "Qual plano devo escolher?",
      a: "Se estiver em dúvida, comece pelo Avançado — ele entrega o melhor equilíbrio entre profundidade e valor. Se quiser experimentar primeiro, comece pelo Free e evolua quando se sentir pronto. Se busca o máximo de conteúdo e benefícios, vá direto para o Completo.",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section
        className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-16"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 70%), #000000",
        }}
      >
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Escolha seu nível de evolução.
            </h1>
            <p className="text-xl sm:text-2xl text-neutral-400 leading-relaxed">
              Do primeiro passo ao sistema completo. Comece onde quiser, evolua no seu ritmo.
            </p>
          </div>
        </div>
      </section>

      {/* ── OS 4 PLANOS ───────────────────────────────────────────────── */}
      <section id="planos" className="py-20 px-4 sm:px-6 lg:px-16 bg-neutral-950">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-4 gap-6">

            {/* PLANO FREE */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-8 h-full flex flex-col group-hover:border-neutral-500/50 transition-all duration-300">
                <div className="mb-6">
                  <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/30 rounded-full text-white text-xs font-bold uppercase tracking-wider">
                    Grátis
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">R$ 0</span>
                </div>
                <p className="text-neutral-400 mb-6">Experimente primeiro com recursos essenciais</p>
                <ul className="space-y-3 mb-8 flex-grow">
                  {[
                    "Guia em PDF para baixar",
                    "Newsletter diária (12 ou 30 dias)",
                    "Conteúdo prático e aplicável",
                    "Acesso ao conteúdo para sempre",
                  ].map((item) => (
                    <li key={item} className="flex items-start justify-between gap-3 text-sm text-neutral-300">
                      <span>{item}</span>
                      <svg className="w-4 h-4 text-neutral-300 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={checkPath} />
                      </svg>
                    </li>
                  ))}
                </ul>
                <Link href="/recursos" className="w-full py-4 bg-white hover:bg-neutral-100 text-black font-bold rounded-xl border border-neutral-300 transition-all duration-300 hover:scale-105 text-center">
                  Começar grátis
                </Link>
              </div>
            </div>

            {/* PLANO ESSENCIAL */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-neutral-600 to-neutral-700 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-8 h-full flex flex-col group-hover:border-neutral-600/50 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-2">Essencial</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-[#D4AF37]">R$ 97</span>
                </div>
                <p className="text-neutral-500 text-sm mb-4">Pagamento único</p>
                <p className="text-neutral-400 mb-6">Fundamentos para começar com clareza e estrutura</p>
                <ul className="space-y-3 mb-8 flex-grow">
                  {[
                    "1 Ebook principal",
                    "1 Guia prático em PDF",
                    "Módulo 1 do Método Rise Up",
                    "1 Planner e 1 Mapa mental",
                    "Acesso vitalício",
                  ].map((item) => (
                    <li key={item} className="flex items-start justify-between gap-3 text-sm text-neutral-300">
                      <span>{item}</span>
                      <svg className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={checkPath} />
                      </svg>
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleCheckout("essencial")} className="w-full py-4 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-bold rounded-xl transition-all duration-300 hover:scale-105 text-center">
                  Começar agora
                </button>
              </div>
            </div>

            {/* PLANO AVANÇADO — MAIS VENDIDO */}
            <div className="group relative lg:scale-105 lg:-my-6">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] rounded-2xl opacity-30 blur transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-neutral-900 to-black border-2 border-[#D4AF37] rounded-2xl p-8 h-full flex flex-col">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-6 py-2 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider rounded-full shadow-xl">
                    Mais Vendido
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2 mt-4">Avançado</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-[#D4AF37]">R$ 197</span>
                </div>
                <p className="text-neutral-500 text-sm mb-4">Pagamento único</p>
                <p className="text-neutral-300 mb-6">Tudo do Essencial + conteúdo avançado</p>
                <ul className="space-y-3 mb-8 flex-grow">
                  {[
                    ["Tudo do Essencial", true],
                    ["Módulo 2 do Método Rise Up", false],
                    ["Ebook 2 com resumo condensado", false],
                    ["1 Desafio e 1 Checklist", false],
                    ["Planner extra e Guia adicional", false],
                    ["Acesso vitalício", false],
                  ].map(([item, bold]) => (
                    <li key={item as string} className="flex items-start justify-between gap-3 text-sm text-neutral-200">
                      <span className={bold ? "font-semibold" : ""}>{item as string}</span>
                      <svg className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={checkPath} />
                      </svg>
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleCheckout("avancado")} className="w-full py-4 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-bold rounded-xl transition-all duration-300 hover:scale-105 text-center shadow-xl shadow-[#D4AF37]/20">
                  Evoluir agora
                </button>
              </div>
            </div>

            {/* PLANO COMPLETO */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-8 h-full flex flex-col group-hover:border-[#D4AF37]/50 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-2">Completo</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-[#D4AF37]">R$ 397</span>
                </div>
                <p className="text-neutral-500 text-sm mb-4">Pagamento único</p>
                <p className="text-neutral-400 mb-6">Pacote completo com acesso vitalício a tudo</p>
                <ul className="space-y-3 mb-8 flex-grow">
                  {[
                    ["Tudo do Avançado", true],
                    ["Módulos 3 e 4 do Método Rise Up", false],
                    ["3 Ebooks exclusivos", false],
                    ["Guia e Treinamento extras", false],
                    ["Desafio adicional", false],
                    ["Acesso vitalício", false],
                  ].map(([item, bold]) => (
                    <li key={item as string} className="flex items-start justify-between gap-3 text-sm text-neutral-300">
                      <span className={bold ? "font-semibold" : ""}>{item as string}</span>
                      <svg className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={checkPath} />
                      </svg>
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleCheckout("completo")} className="w-full py-4 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-bold rounded-xl transition-all duration-300 hover:scale-105 text-center">
                  Acesso total
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FEEDBACKS ─────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-16 bg-black">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Quem começou, não parou.</h2>
            <p className="text-neutral-400 text-lg">Resultados reais de quem já usa o ecossistema Rise Up.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">

            {/* Feedback 1 */}
            <div className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-xl p-6 flex flex-col">
              <Stars count={4} />
              <p className="text-neutral-300 italic mb-4 flex-grow">
                "Os materiais são bons, mas senti falta de mais exemplos práticos em alguns guias. No geral, valeu a pena."
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <img src="https://randomuser.me/api/portraits/men/54.jpg" alt="Diego Ferreira" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Diego Ferreira</p>
                  <p className="text-neutral-500 text-xs">Designer Gráfico</p>
                </div>
              </div>
            </div>

            {/* Feedback 2 */}
            <div className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-xl p-6 flex flex-col">
              <Stars count={4} half />
              <p className="text-neutral-300 italic mb-4 flex-grow">
                "Conteúdo direto e bem estruturado. Tiraria meia estrela apenas pela falta de vídeos explicativos, mas os PDFs compensam bem."
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Bruna Oliveira" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Bruna Oliveira</p>
                  <p className="text-neutral-500 text-xs">Professora</p>
                </div>
              </div>
            </div>

            {/* Feedback 3 */}
            <div className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-xl p-6 flex flex-col">
              <Stars count={5} half={false} />
              <p className="text-neutral-300 italic mb-4 flex-grow">
                "Exatamente o que eu precisava. Sistema claro, sem enrolação. Finalmente consegui organizar minha rotina de verdade."
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Lucas Teixeira" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Lucas Teixeira</p>
                  <p className="text-neutral-500 text-xs">Empreendedor</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── COMPARE OS PLANOS ─────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-16 bg-neutral-950">
        <div className="max-w-[1400px] mx-auto">
          <div className="overflow-x-auto">
            {/* ── Linha superior: título (esquerda) + botões (direita) ── */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", alignItems: "center", paddingBottom: "32px" }}>

              {/* Célula 1 — Título + subtítulo */}
              <div style={{ padding: 0 }}>
                <h2 style={{ margin: 0, padding: 0, fontSize: "clamp(2.5rem, 5vw, 3.75rem)", fontWeight: 900, lineHeight: 1.05 }}>
                  Compare<br />os planos
                </h2>
                <p style={{ margin: 0, padding: 0, marginTop: "10px", marginLeft: "4px", fontSize: "1.125rem", color: "#a3a3a3", fontWeight: 400 }}>
                  e escolha o seu nível
                </p>
              </div>

              {/* Célula 2 — Free (sem botão) */}
              <div />

              {/* Célula 3 — Essencial */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <button onClick={() => handleCheckout("essencial")} className="w-full px-4 py-2.5 border border-neutral-600 text-white rounded-xl font-semibold hover:border-neutral-400 hover:scale-105 transition-all duration-200 text-sm whitespace-nowrap">
                  Começar com Essencial
                </button>
                <p className="text-neutral-500 text-xs">R$ 97 — pagamento único</p>
              </div>

              {/* Célula 4 — Avançado */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <button onClick={() => handleCheckout("avancado")} className="w-full px-4 py-2.5 bg-[#D4AF37] text-black rounded-xl font-bold hover:bg-[#C5A028] hover:scale-105 transition-all duration-200 text-sm shadow-lg shadow-[#D4AF37]/20 whitespace-nowrap">
                  Evoluir com Avançado
                </button>
                <p className="text-neutral-500 text-xs">R$ 197 — mais vendido</p>
              </div>

              {/* Célula 5 — Completo */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <button onClick={() => handleCheckout("completo")} className="w-full px-4 py-2.5 border border-neutral-600 text-white rounded-xl font-semibold hover:border-neutral-400 hover:scale-105 transition-all duration-200 text-sm whitespace-nowrap">
                  Quero o Completo
                </button>
                <p className="text-neutral-500 text-xs">R$ 397 — acesso total</p>
              </div>
            </div>

            {/* Divisória */}
            <div className="border-b border-neutral-800 mb-0" />

            <table className="w-full border-collapse table-fixed">
              <colgroup>
                <col style={{ width: "calc(200% / 5)" }} />
                <col style={{ width: "calc(100% / 5)" }} />
                <col style={{ width: "calc(100% / 5)" }} />
                <col style={{ width: "calc(100% / 5)" }} />
                <col style={{ width: "calc(100% / 5)" }} />
              </colgroup>
              <thead>
                <tr>
                  <th className="text-left py-5 pb-2 px-6 text-base font-semibold text-neutral-300 align-middle">Recursos</th>
                  <th className="text-center py-5 px-6 align-middle">
                    <Link href="/recursos" className="font-bold hover:text-[#D4AF37] transition-colors translate-y-1 inline-block">Free</Link>
                  </th>
                  <th className="text-center py-5 px-6 align-middle">
                    <button onClick={() => handleCheckout("essencial")} className="font-bold hover:text-[#D4AF37] transition-colors translate-y-1 inline-block">Essencial</button>
                  </th>
                  <th className="text-center py-5 px-6 align-middle">
                    <button onClick={() => handleCheckout("avancado")} className="font-bold text-[#D4AF37] hover:text-[#C5A028] transition-colors translate-y-1 inline-block">Avançado</button>
                  </th>
                  <th className="text-center py-5 px-6 align-middle">
                    <button onClick={() => handleCheckout("completo")} className="font-bold hover:text-[#D4AF37] transition-colors translate-y-1 inline-block">Completo</button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Ebooks",                   free: "—",  ess: "1", av: "2", comp: "2" },
                  { label: "Exclusivos",               free: "—",  ess: "—", av: "—", comp: "3" },
                  { label: "Guias em PDF",              free: "2",  ess: "1", av: "2", comp: "3" },
                  { label: "Módulo Método Rise Up",     free: "—",  ess: "1", av: "2", comp: "4" },
                  { label: "Treinamentos",              free: "—",  ess: "1", av: "2", comp: "3" },
                  { label: "Mapas mentais",             free: "—",  ess: "1", av: "2", comp: "2" },
                  { label: "Planners",                  free: "—",  ess: "1", av: "2", comp: "2" },
                  { label: "Resumos condensados",       free: "—",  ess: "1", av: "2", comp: "2" },
                  { label: "Desafios",                  free: "—",  ess: "—", av: "1", comp: "2" },
                  { label: "Checklists",                free: "—",  ess: "—", av: "1", comp: "1" },
                ].map(({ label, free, ess, av, comp }, idx) => (
                  <tr key={label} className="border-b border-neutral-800 hover:bg-neutral-900/50 transition-colors">
                    <td className={`${idx === 0 ? "pt-8 pb-4" : "py-4"} px-6 text-neutral-300`}>{label}</td>
                    <td className={`text-center ${idx === 0 ? "pt-8 pb-4" : "py-4"} px-6 text-neutral-500`}>{free}</td>
                    <td className={`text-center ${idx === 0 ? "pt-8 pb-4" : "py-4"} px-6`}>{ess === "—" ? <span className="text-neutral-500">—</span> : ess}</td>
                    <td className={`text-center ${idx === 0 ? "pt-8 pb-4" : "py-4"} px-6 text-[#D4AF37]`}>{av === "—" ? <span className="text-neutral-500">—</span> : av}</td>
                    <td className={`text-center ${idx === 0 ? "pt-8 pb-4" : "py-4"} px-6`}>{comp === "—" ? <span className="text-neutral-500">—</span> : comp}</td>
                  </tr>
                ))}
                <tr className="border-b border-neutral-800 hover:bg-neutral-900/50 transition-colors">
                  <td className="py-4 px-6 text-neutral-300">Acesso vitalício</td>
                  {["text-neutral-400", "text-white", "text-[#D4AF37]", "text-[#D4AF37]"].map((color, i) => (
                    <td key={i} className="text-center py-4 px-6">
                      <svg className={`w-5 h-5 mx-auto ${color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={checkPath} />
                      </svg>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-neutral-800 hover:bg-neutral-900/50 transition-colors">
                  <td className="py-4 px-6 text-neutral-300">Newsletter</td>
                  <td className="text-center py-4 px-6">
                    <svg className="w-5 h-5 mx-auto text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={checkPath} />
                    </svg>
                  </td>
                  <td className="text-center py-4 px-6 text-neutral-500">—</td>
                  <td className="text-center py-4 px-6 text-neutral-500">—</td>
                  <td className="text-center py-4 px-6 text-neutral-500">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── APP ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-16 bg-black">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">O app que organiza sua mente.</h2>
            <p className="text-neutral-400 text-lg">Tecnologia a serviço da sua evolução. Gratuito para começar.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            {/* App Free */}
            <div className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-2xl p-8 flex flex-col">
              <div className="mb-6">
                <span className="inline-block px-4 py-1.5 bg-neutral-800 border border-neutral-700 rounded-full text-neutral-300 text-xs font-bold uppercase tracking-wider">
                  Grátis
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4">App Rise Up Free</h3>
              <p className="text-neutral-400 mb-6">Experimente o essencial e veja o sistema funcionando.</p>
              <ul className="space-y-3 mb-8 flex-grow">
                {["Até 20 notas e 5 entradas no diário", "20 flashcards manuais e 3 gerados por IA por mês", "1 rotina e 1 planejamento automático por mês"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-neutral-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={checkPath} />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Link href="/auth" className="block w-full py-4 bg-transparent border border-white text-white font-bold rounded-xl hover:scale-105 transition-transform duration-200 text-center">
                  Começar grátis
                </Link>
              </div>
            </div>

            {/* App Premium */}
            <div className="bg-gradient-to-br from-neutral-900 to-black border-2 border-[#D4AF37] rounded-2xl p-8 flex flex-col">
              <div className="mb-6">
                <span className="inline-block px-4 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                  Premium
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4">App Rise Up Premium</h3>
              <p className="text-neutral-400 mb-6">O sistema completo desbloqueado. Sem limites.</p>
              <ul className="space-y-3 mb-8 flex-grow">
                {["Anotações ramificadas e flashcards por IA ilimitados", "Rotinas e planejamentos automáticos ilimitados", "Biblioteca exclusiva de conteúdos Rise Up"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={checkPath} />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Link href="/app" className="block w-full py-4 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-bold rounded-xl hover:scale-105 transition-transform duration-200 text-center">
                  Conhecer os planos
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="pt-56 pb-48 px-4 sm:px-6 lg:px-16 bg-neutral-950">
        <div className="max-w-[700px] mx-auto">

          <div className="flex justify-center mb-8">
            <svg className="w-14 h-14 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>

          <h2 className="text-[3.75rem] font-black text-center mb-4 leading-tight">
            Perguntas <span className="text-[#D4AF37]">Frequentes</span>
          </h2>
          <p className="text-center text-neutral-400 mb-16">Dúvidas comuns sobre o app e os infoprodutos.</p>

          <div className="divide-y divide-neutral-800">
            {faqs.map((faq, i) => (
              <div key={i} className="hover:translate-x-1 transition-transform duration-200">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-8 text-left rounded-lg px-2 hover:bg-neutral-800/40 transition-colors duration-200"
                >
                  <span className="text-xl font-bold text-white pr-6 leading-snug">{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: openFaq === i ? "500px" : "0" }}
                >
                  <div className="pb-6 px-2">
                    <p className="text-neutral-400 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────────────────── */}
      <section
        className="relative py-32 px-4 sm:px-6 lg:px-16 flex items-center justify-center overflow-hidden"
        style={{ background: "#C5A028" }}
      >
        {/* Elipse superior direita — dourado mais vivo */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-30%",
            right: "-20%",
            width: "60%",
            paddingBottom: "60%",
            borderRadius: "50%",
            background: "#D4AF37",
            filter: "blur(0px)",
          }}
        />
        {/* Elipse inferior esquerda — dourado mais claro/arenoso */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "-35%",
            left: "-15%",
            width: "55%",
            paddingBottom: "55%",
            borderRadius: "50%",
            background: "rgba(229,193,88,0.6)",
            filter: "blur(0px)",
          }}
        />

        {/* Card central — creme claro */}
        <div
          className="relative z-10 w-full max-w-[520px] rounded-3xl p-12 shadow-2xl text-center"
          style={{ background: "#F0EDE6" }}
        >
          <h2 className="text-4xl font-bold mb-8 leading-tight" style={{ color: "#0A0A0A" }}>
            Pronto para começar?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#planos"
              className="w-full sm:w-auto px-7 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-200 whitespace-nowrap"
              style={{ background: "#000000", color: "#FFFFFF" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#1a1a1a")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#000000")}
            >
              Ver planos novamente
            </a>
            <Link
              href="/auth"
              className="w-full sm:w-auto px-7 py-4 rounded-xl font-bold hover:scale-105 transition-all duration-200 whitespace-nowrap text-center"
              style={{ background: "#C5A028", color: "#0A0A0A" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#B8941F")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#C5A028")}
            >
              Começar agora
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
