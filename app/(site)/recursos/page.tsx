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
        className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-[80px]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          backgroundColor: "#000000",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at center bottom, rgba(212,175,55,0.10) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 flex flex-col items-center text-center max-w-[1400px] w-full">
          <span className="text-[#D4AF37] text-[11px] font-bold tracking-[0.3em] uppercase mb-4">
            CONTEÚDO GRATUITO
          </span>
          <h1 className="text-[64px] font-black leading-[1.05] text-[#F5F5F5] max-w-[800px] mb-10">
            Recursos práticos para organizar sua vida
          </h1>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["Métodos aplicáveis", "Organização prática", "Desenvolvimento real"].map((tag) => (
              <span key={tag} className="px-5 py-2 border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.08)] text-[#D4AF37] rounded-full text-[12px] font-bold tracking-wide">
                {tag}
              </span>
            ))}
          </div>
          <button
            onClick={scrollToMateriais}
            className="flex flex-col items-center gap-3 mt-4 opacity-60 hover:opacity-100 transition-opacity"
          >
            <span className="text-[10px] text-[#555] font-bold uppercase tracking-[0.2em]">ESCOLHA SEU MATERIAL</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#D4AF37" strokeWidth="2" className="animate-bounce">
              <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
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
                        <span className="text-[10px] font-bold tracking-[0.15em] text-[#D4AF37] bg-[rgba(212,175,55,0.10)] px-3 py-1 uppercase">
                          {resource.type === "pdf" ? "GUIA PRÁTICO" : "CURSO POR EMAIL"}
                        </span>
                        <span className="text-[10px] font-bold tracking-[0.15em] text-neutral-500 bg-neutral-900 px-3 py-1 uppercase">
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
                        className="w-full py-4 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#D4AF37]/20 flex items-center justify-center gap-2"
                      >
                        {resource.type === "pdf" ? (
                          <>
                            Acessar gratuitamente
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17v2a2 2 0 002 2h16a2 2 0 002-2v-2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </>
                        ) : (
                          <>
                            Inscrever-se agora
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </>
                        )}
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
              <div className="mt-6 space-y-3">
                {[
                  { done: true, text: "Clareza sobre o que fazer primeiro" },
                  { done: true, text: "Estrutura que cabe na sua rotina" },
                  { done: true, text: "Resultado visível desde o primeiro dia" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded border-2 border-[#D4AF37] flex items-center justify-center flex-shrink-0"
                      style={{ background: item.done ? "#D4AF37" : "transparent" }}
                    >
                      {item.done && (
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#000" strokeWidth="2.5">
                          <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className="text-[13px] text-[#888]">{item.text}</span>
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
              <div className="mt-6 flex flex-col items-center justify-center gap-1">
                <span className="text-[80px] font-black text-[#D4AF37] leading-none">3x</span>
                <span className="text-[11px] text-[#555] font-bold uppercase tracking-[0.15em]">mais foco</span>
              </div>
            </div>

            {/* Card 3 — normal */}
            <div className="bg-white/[0.03] border border-neutral-800 rounded-2xl p-8 hover:border-[#D4AF37]/40 hover:scale-[1.02] transition-all duration-300 flex flex-col">
              <h3 className="text-2xl font-bold mb-3">Sistemas que funcionam</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                Simples nos dias difíceis. Poderosos nos bons dias.
              </p>
              <div className="mt-6 space-y-4">
                {[
                  { label: "Planejamento", pct: 85 },
                  { label: "Execução", pct: 70 },
                  { label: "Revisão", pct: 60 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-[11px] font-bold mb-1.5">
                      <span className="text-[#666] uppercase tracking-[0.1em]">{item.label}</span>
                      <span className="text-[#D4AF37]">{item.pct}%</span>
                    </div>
                    <div className="h-[5px] bg-[#1A1A1A] rounded-full overflow-hidden">
                      <div className="h-full bg-[#D4AF37] rounded-full transition-all duration-700" style={{ width: `${item.pct}%` }} />
                    </div>
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
              <svg viewBox="0 0 400 140" fill="none" className="w-full mt-6">
                <defs>
                  <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                  </linearGradient>
                  <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="1" fill="rgba(212,175,55,0.06)" />
                  </pattern>
                </defs>
                <rect width="400" height="140" fill="url(#dots)" />
                <path d="M0 130 C80 125 160 100 240 60 C320 20 370 8 400 2 L400 140 L0 140 Z" fill="url(#curveGrad)" />
                <path d="M0 130 C80 125 160 100 240 60 C320 20 370 8 400 2" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
                <circle cx="400" cy="2" r="4" fill="#D4AF37" />
                <circle cx="400" cy="2" r="8" fill="#D4AF37" fillOpacity="0.2" />
              </svg>
            </div>

            {/* Card 5 — normal */}
            <div className="bg-white/[0.03] border border-neutral-800 rounded-2xl p-8 hover:border-[#D4AF37]/40 hover:scale-[1.02] transition-all duration-300 flex flex-col">
              <h3 className="text-2xl font-bold mb-3">Você sabe onde está?</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                Materiais para acompanhar sua evolução com clareza.
              </p>
              <div className="mt-6">
                <div className="flex justify-between text-[11px] mb-2">
                  <span className="text-[#555] font-bold uppercase tracking-[0.1em]">Início</span>
                  <span className="text-[#D4AF37] font-bold">65% lá</span>
                  <span className="text-[#555] font-bold uppercase tracking-[0.1em]">Meta</span>
                </div>
                <div className="relative h-[6px] bg-[#1A1A1A] rounded-full">
                  <div className="absolute top-0 left-0 h-full bg-[#D4AF37] rounded-full" style={{ width: "65%" }} />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#D4AF37] border-2 border-[#000]"
                    style={{ left: "65%" }}
                  />
                </div>
              </div>
            </div>

            {/* Card 6 — normal */}
            <div className="bg-white/[0.03] border border-neutral-800 rounded-2xl p-8 hover:border-[#D4AF37]/40 hover:scale-[1.02] transition-all duration-300 flex flex-col">
              <h3 className="text-2xl font-bold mb-3">Propósito que direciona</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                Desenvolvimento pessoal com ética, consciência e intenção real.
              </p>
              <div className="mt-6 flex flex-col gap-1">
                <span className="text-[20px] font-black text-[#333]">Propósito</span>
                <span className="text-[32px] font-black text-[#555]">Clareza</span>
                <span className="text-[48px] font-black text-[#D4AF37] leading-none">Ação</span>
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
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#D4AF37" strokeWidth="1.5">
                    <rect x="8" y="2" width="24" height="36" rx="4" />
                    <line x1="8" y1="8" x2="32" y2="8" />
                    <line x1="8" y1="32" x2="32" y2="32" />
                    <circle cx="20" cy="35" r="1.5" fill="#D4AF37" />
                    <line x1="14" y1="13" x2="26" y2="13" strokeLinecap="round" />
                    <line x1="14" y1="17" x2="22" y2="17" strokeLinecap="round" />
                    <rect x="14" y="21" width="12" height="7" rx="1.5" strokeWidth="1" />
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
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#D4AF37" strokeWidth="1.5">
                    <path d="M6 32V8a2 2 0 012-2h18a2 2 0 012 2v24" />
                    <path d="M6 32a2 2 0 012-2h20v4H8a2 2 0 01-2-2z" />
                    <line x1="14" y1="11" x2="24" y2="11" strokeLinecap="round" />
                    <line x1="14" y1="15" x2="24" y2="15" strokeLinecap="round" />
                    <line x1="14" y1="19" x2="20" y2="19" strokeLinecap="round" />
                    <path d="M24 6v16l3-2 3 2V6" strokeLinecap="round" strokeLinejoin="round" />
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
      <section className="py-8 px-4 sm:px-6 lg:px-16" style={{ background: "#000000" }}>
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
                className="px-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-neutral-100 transition-all duration-300 hover:scale-105 whitespace-nowrap"
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
