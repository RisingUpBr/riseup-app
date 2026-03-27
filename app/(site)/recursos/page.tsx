"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

type Resource = {
  id: string;
  title: string;
  description: string;
  type: "pdf" | "email";
  accessLevel: "free";
  benefits?: string[];
  duration?: string;
};

const categoryMap: Record<string, string> = {
  "Os 7 Pilares da Disciplina Magnética": "DISCIPLINA",
  "Emails 30 dias": "HÁBITOS",
  "Emails que mudam vidas": "MENTALIDADE",
  "Os 25 Livros que os Bilionários Leem em Segredo": "LEITURA",
};

const faqs = [
  {
    question: "Os recursos são realmente gratuitos?",
    answer:
      "Sim. Você pode acessar todos os materiais gratuitos sem custo algum. Apenas fazemos um cadastro simples para organizar o envio.",
  },
  {
    question: "Preciso comprar algo depois?",
    answer:
      "Não. Os recursos gratuitos já entregam valor real. Os planos pagos são para quem quer aprofundar e acelerar resultados.",
  },
  {
    question: "Para quem esses recursos são indicados?",
    answer:
      "Para quem busca mais organização, clareza mental, disciplina e evolução pessoal de forma prática e aplicável.",
  },
  {
    question: "Posso sair da lista quando quiser?",
    answer:
      "Sim. Você pode cancelar o recebimento de emails a qualquer momento com um clique.",
  },
];

export default function RecursosPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [showAll, setShowAll] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const router = useRouter();
  const materiaisRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function loadResources() {
      const q = query(
        collection(db, "resources"),
        where("accessLevel", "==", "free"),
        where("active", "==", true)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Resource, "id">),
      }));
      setResources(data);
      setLoading(false);
    }
    loadResources();
  }, []);

  const handleAccessResource = (slug: string) => {
    if (!user) {
      router.push(`/cadastro?redirect=/recursos/${slug}/acessar`);
    } else {
      router.push(`/recursos/${slug}/conteudo`);
    }
  };

  const scrollToMateriais = () => {
    materiaisRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const visibleResources = showAll ? resources : resources.slice(0, 2);

  return (
    <main className="min-h-screen bg-black text-white">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-24 sm:py-32 px-4 sm:px-6 lg:px-16"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 65% 50%, rgba(212,175,55,0.10) 0%, rgba(212,175,55,0.04) 50%, transparent 80%), #000000",
        }}
      >
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Recursos práticos para organizar sua vida
            </h1>

            <p className="text-xl sm:text-2xl text-neutral-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Materiais gratuitos criados para ajudar você a clarear a mente,
              construir rotinas melhores e evoluir com consistência.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-neutral-400 mb-16">
              {["Métodos aplicáveis", "Organização prática", "Desenvolvimento real"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* Scroll indicator — abaixo de todo o conteúdo */}
            <button
              onClick={scrollToMateriais}
              className="inline-flex flex-col items-center gap-2 text-[#D4AF37] hover:opacity-75 transition-opacity"
            >
              <span className="text-xs font-semibold uppercase tracking-widest">Escolha seu material</span>
              <svg
                className="w-9 h-9 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

          </div>
        </div>
      </section>

      {/* ── GRID DE MATERIAIS ─────────────────────────────────────────────── */}
      <section ref={materiaisRef} className="py-16 px-4 sm:px-6 lg:px-16 bg-neutral-950 scroll-mt-20">
        <div className="max-w-[1600px] mx-auto">

          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Materiais Disponíveis</h2>
            <p className="text-neutral-400 text-lg">
              Escolha o recurso que mais faz sentido para você agora
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
                <p className="text-neutral-400">Carregando recursos...</p>
              </div>
            </div>
          ) : resources.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 gap-8">
                {visibleResources.map((resource, index) => (
                  <div
                    key={resource.id}
                    className="group relative"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500" />

                    <div className="relative bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-2xl p-8 h-full flex flex-col group-hover:border-[#D4AF37]/50 transition-all duration-300">

                      {/* Badges */}
                      <div className="flex items-center gap-2 mb-6">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-lg text-xs font-semibold uppercase tracking-wider">
                          {resource.type === "pdf" ? (
                            <>
                              <svg className="w-4 h-4 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                              <span className="text-neutral-300">Guia Prático</span>
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <span className="text-neutral-300">Curso por Email</span>
                            </>
                          )}
                        </span>
                        <span className="px-3 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                          {categoryMap[resource.title] ?? "CONTEÚDO"}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold mb-4 group-hover:text-[#D4AF37] transition-colors duration-300">
                        {resource.title}
                      </h3>

                      <p className="text-neutral-400 mb-6 leading-relaxed flex-grow">
                        {resource.description}
                      </p>

                      {resource.duration && (
                        <div className="flex items-center gap-2 mb-6 text-sm text-neutral-500">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{resource.duration}</span>
                        </div>
                      )}

                      {resource.benefits && resource.benefits.length > 0 && (
                        <ul className="space-y-2 mb-6">
                          {resource.benefits.slice(0, 3).map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-neutral-300">
                              <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <button
                        onClick={() => handleAccessResource(resource.id)}
                        className="w-full py-4 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#D4AF37]/20"
                      >
                        Acessar gratuitamente
                      </button>

                      <p className="text-xs text-neutral-500 text-center mt-4">
                        {user ? "Acesso liberado" : "Cadastro rápido • Sem custo"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {resources.length > 2 && (
                <div className="text-center mt-10">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="px-8 py-3.5 bg-transparent border border-[#D4AF37] text-[#D4AF37] font-bold rounded-xl hover:scale-105 transition-transform duration-200 text-sm uppercase tracking-wider"
                  >
                    {showAll ? "Mostrar menos" : "Ver todos os materiais"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 bg-neutral-800 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-neutral-400 text-lg">Nenhum recurso disponível no momento.</p>
            </div>
          )}
        </div>
      </section>

      {/* Linha divisória entre materiais e seção de 6 cards */}
      <div className="px-4 sm:px-6 lg:px-16 bg-neutral-950">
        <div className="max-w-[1600px] mx-auto py-12">
          <div className="border-t" style={{ borderColor: "rgba(212,175,55,0.15)" }} />
        </div>
      </div>

      {/* ── O QUE VOCÊ VAI ENCONTRAR AQUI ─────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-16 bg-black">
        <div className="max-w-[1600px] mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Conteúdo que organiza.{" "}
              <span className="text-neutral-400">Método que sustenta.</span>
            </h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              Cada material foi criado para sair da teoria e entrar na prática.
              Sem enrolação, sem superficialidade.
            </p>
          </div>

          {/* Grid assimétrico estilo Bolt.new */}
          <div className="grid sm:grid-cols-3 gap-4">

            {/* Card 1 — largo */}
            <div className="sm:col-span-2 bg-white/[0.03] border border-neutral-800 rounded-2xl p-8 hover:border-[#D4AF37]/40 hover:scale-[1.02] transition-all duration-300 flex flex-col">
              <h3 className="text-2xl font-bold mb-3">Guias que você aplica hoje</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                Métodos claros para organizar rotina, estudos, trabalho e projetos pessoais.
              </p>
              <div className="mt-auto space-y-2.5">
                {[
                  "Clareza sobre o que fazer primeiro",
                  "Estrutura que cabe na sua rotina",
                  "Resultado visível desde o primeiro dia",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded bg-[#D4AF37] flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-neutral-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2 — normal */}
            <div className="bg-white/[0.03] border border-neutral-800 rounded-2xl p-8 hover:border-[#D4AF37]/40 hover:scale-[1.02] transition-all duration-300 flex flex-col">
              <h3 className="text-2xl font-bold mb-3">Menos ruído. Mais foco.</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                Ferramentas para entender padrões e tomar decisões melhores.
              </p>
              <div className="mt-auto text-center">
                <p className="text-6xl font-black text-[#D4AF37] leading-none">3x</p>
                <p className="text-xs text-neutral-500 mt-2 uppercase tracking-wider">mais foco</p>
              </div>
            </div>

            {/* Card 3 — normal */}
            <div className="bg-white/[0.03] border border-neutral-800 rounded-2xl p-8 hover:border-[#D4AF37]/40 hover:scale-[1.02] transition-all duration-300 flex flex-col">
              <h3 className="text-2xl font-bold mb-3">Sistemas que funcionam</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                Simples nos dias difíceis. Poderosos nos bons dias.
              </p>
              <div className="mt-auto space-y-2">
                {["Planejamento", "Execução", "Revisão"].map((block, i) => (
                  <div
                    key={block}
                    className="h-8 rounded-lg flex items-center px-3"
                    style={{
                      background: `rgba(212,175,55,${0.15 + i * 0.08})`,
                      width: `${100 - i * 10}%`,
                    }}
                  >
                    <span className="text-[#D4AF37] text-xs font-bold">{block}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 4 — largo */}
            <div className="sm:col-span-2 bg-white/[0.03] border border-neutral-800 rounded-2xl p-8 hover:border-[#D4AF37]/40 hover:scale-[1.02] transition-all duration-300 flex flex-col">
              <h3 className="text-2xl font-bold mb-3">
                Mais resultado. Menos esforço desperdiçado.
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                Foco, execução e consistência como hábito, não como exceção.
              </p>
              <div className="mt-auto">
                <svg viewBox="0 0 280 80" className="w-full opacity-70">
                  <line x1="10" y1="70" x2="10" y2="5" stroke="#444" strokeWidth="0.8" />
                  <line x1="10" y1="70" x2="275" y2="70" stroke="#444" strokeWidth="0.8" />
                  {[0, 1, 2, 3].map((i) => (
                    <line key={i} x1="10" y1={70 - i * 20} x2="275" y2={70 - i * 20} stroke="#333" strokeWidth="0.4" />
                  ))}
                  <path
                    d="M15 65 C40 60 60 58 80 50 C100 42 120 35 140 28 C160 21 180 16 200 12 C220 8 240 8 265 7"
                    stroke="#D4AF37"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <circle cx="265" cy="7" r="4" fill="#D4AF37" />
                </svg>
              </div>
            </div>

            {/* Card 5 — normal */}
            <div className="bg-white/[0.03] border border-neutral-800 rounded-2xl p-8 hover:border-[#D4AF37]/40 hover:scale-[1.02] transition-all duration-300 flex flex-col">
              <h3 className="text-2xl font-bold mb-3">Você sabe onde está?</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                Materiais para acompanhar sua evolução com clareza.
              </p>
              <div className="mt-auto space-y-2">
                <div className="flex justify-between text-xs text-neutral-500 mb-1">
                  <span>Hoje</span>
                  <span className="text-[#D4AF37]">Meta</span>
                </div>
                <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full w-[62%] bg-gradient-to-r from-[#D4AF37] to-[#C5A028] rounded-full" />
                </div>
                <p className="text-xs text-neutral-600 text-right">62% do caminho</p>
              </div>
            </div>

            {/* Card 6 — normal */}
            <div className="bg-white/[0.03] border border-neutral-800 rounded-2xl p-8 hover:border-[#D4AF37]/40 hover:scale-[1.02] transition-all duration-300 flex flex-col">
              <h3 className="text-2xl font-bold mb-3">Propósito que direciona</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                Desenvolvimento pessoal com ética, consciência e intenção real.
              </p>
              <div className="mt-auto">
                <p className="text-3xl font-black text-[#D4AF37] leading-tight">Propósito</p>
                <p className="text-xl font-bold text-neutral-400 leading-tight">Clareza</p>
                <p className="text-base font-semibold text-neutral-600 leading-tight">Ação</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── APP + PLANOS ──────────────────────────────────────────────────── */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-16 bg-black">
        <div className="max-w-[1600px] mx-auto">

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3">O sistema completo Rise Up</h2>
            <p className="text-base text-neutral-400 max-w-2xl mx-auto">
              Cada peça foi projetada para funcionar junto. Conteúdo, método e tecnologia integrados.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            {/* App Card */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-2xl p-8 h-full flex flex-col group-hover:border-[#D4AF37]/50 transition-all duration-300">

                <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold mb-4">App Rise Up</h3>
                <p className="text-neutral-400 mb-6">
                  Transforme conteúdo em ação com tecnologia inteligente:
                  anotações ramificadas, metas integradas e evolução visível.
                </p>

                <ul className="space-y-3 mb-8">
                  {["Planejamento inteligente", "Organização visual", "Check-ins e acompanhamento"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-neutral-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/app"
                  className="mt-auto inline-block w-full text-center py-3 bg-white hover:bg-neutral-100 text-black font-semibold rounded-xl transition-all duration-300"
                >
                  Conhecer o App
                </Link>
              </div>
            </div>

            {/* Planos Card */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-2xl p-8 h-full flex flex-col group-hover:border-[#D4AF37]/50 transition-all duration-300">

                <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold mb-4">Aprofunde com método</h3>
                <p className="text-neutral-400 mb-6">
                  Infoprodutos estratégicos para quem quer resultados reais e duradouros.
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    "Ebooks e treinamentos exclusivos",
                    "Planners e mapas mentais",
                    "Método Rise Up completo",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-neutral-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/planos"
                  className="mt-auto inline-block w-full text-center py-3 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-semibold rounded-xl transition-all duration-300"
                >
                  Ver Produtos
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────────────────────── */}
      <section
        className="py-8 px-4 sm:px-6 lg:px-16"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 70%), #000000",
        }}
      >
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16">

            <div className="sm:max-w-lg">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-3">
                Evoluir não precisa ser confuso.
              </h2>
              <p className="text-xl text-neutral-400">
                Com a estrutura certa, o processo se torna mais claro, leve e possível.
              </p>
            </div>

            <div className="flex flex-row gap-4 flex-shrink-0">
              <button
                onClick={scrollToMateriais}
                className="px-8 py-4 bg-transparent border border-neutral-600 text-white rounded-xl font-bold hover:border-neutral-400 transition-all duration-300 hover:scale-105 whitespace-nowrap"
              >
                Escolher meu material
              </button>
              <Link
                href="/planos"
                className="px-8 py-4 bg-[#D4AF37] text-black rounded-xl font-bold hover:bg-[#C5A028] transition-all duration-300 hover:scale-105 whitespace-nowrap text-center"
              >
                Ver o sistema completo
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="pt-56 pb-48 px-4 sm:px-6 lg:px-16 bg-black">
        <div className="max-w-[700px] mx-auto">

          <div className="flex justify-center mb-8">
            <svg className="w-14 h-14 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>

          <h2 className="text-[3.75rem] font-black text-center mb-20 leading-tight">
            Perguntas <span className="text-[#D4AF37]">Frequentes</span>
          </h2>

          <div className="divide-y divide-neutral-800">
            {faqs.map((faq, i) => (
              <div key={i} className="hover:translate-x-1 transition-transform duration-200">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-8 text-left rounded-lg px-2 hover:bg-neutral-800/40 transition-colors duration-200"
                >
                  <span className="text-xl font-bold text-white pr-6 leading-snug">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
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
                    <p className="text-neutral-400 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
}
