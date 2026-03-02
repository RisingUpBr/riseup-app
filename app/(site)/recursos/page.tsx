"use client";

import { useEffect, useState } from "react";
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

export default function RecursosPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

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

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO - CHAMADA DIRETA */}
      <section className="relative overflow-hidden bg-gradient-to-b from-black via-neutral-900 to-black py-24 sm:py-32 px-4 sm:px-6 lg:px-16">
        {/* Background decorativo */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D4AF37] opacity-5 rounded-full blur-3xl"></div>

        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full">
              <svg className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-[#D4AF37] text-sm font-semibold uppercase tracking-wider">100% Gratuito</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Recursos práticos para organizar sua vida
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-neutral-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Materiais gratuitos criados para ajudar você a clarear a mente, 
              construir rotinas melhores e evoluir com consistência.
            </p>

            {/* Bullets */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-neutral-400 mb-12">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                <span className="text-sm">Métodos aplicáveis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                <span className="text-sm">Organização prática</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                <span className="text-sm">Desenvolvimento real</span>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="flex flex-col items-center gap-2 text-neutral-500">
              <span className="text-sm">Escolha seu material abaixo</span>
              <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* GRID DE MATERIAIS - FOCO PRINCIPAL */}
      <section className="py-20 px-4 sm:px-6 lg:px-16 bg-neutral-950">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Materiais Disponíveis
            </h2>
            <p className="text-neutral-400 text-lg">
              Escolha o recurso que mais faz sentido para você agora
            </p>
          </div>

          {/* Loading state */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-neutral-400">Carregando recursos...</p>
              </div>
            </div>
          ) : resources.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {resources.map((resource, index) => (
                <div
                  key={resource.id}
                  className="group relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>

                  {/* Card */}
                  <div className="relative bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-2xl p-8 h-full flex flex-col group-hover:border-[#D4AF37]/50 transition-all duration-300">
                    {/* Badge tipo */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-lg text-xs font-semibold uppercase tracking-wider">
                        {resource.type === "pdf" ? (
                          <>
                            <svg className="w-4 h-4 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            <span className="text-neutral-300">Download PDF</span>
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

                      {/* Badge gratuito */}
                      <span className="px-3 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                        Grátis
                      </span>
                    </div>

                    {/* Título */}
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-[#D4AF37] transition-colors duration-300">
                      {resource.title}
                    </h3>

                    {/* Descrição */}
                    <p className="text-neutral-400 mb-6 leading-relaxed flex-grow">
                      {resource.description}
                    </p>

                    {/* Duração (se tiver) */}
                    {resource.duration && (
                      <div className="flex items-center gap-2 mb-6 text-sm text-neutral-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{resource.duration}</span>
                      </div>
                    )}

                    {/* Benefícios (se tiver) */}
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

                    {/* CTA Button */}
                    <button
                      onClick={() => handleAccessResource(resource.id)}
                      className="w-full py-4 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#D4AF37]/20"
                    >
                      Acessar gratuitamente
                    </button>

                    {/* Info adicional */}
                    <p className="text-xs text-neutral-500 text-center mt-4">
                      {user ? "Acesso liberado" : "Cadastro rápido • Sem custo"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 bg-neutral-800 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-neutral-400 text-lg">
                Nenhum recurso disponível no momento.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* SEÇÃO - O QUE VOCÊ VAI RECEBER */}
      <section className="py-20 px-4 sm:px-6 lg:px-16 bg-black">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              O que você vai encontrar aqui
            </h2>
            <p className="text-xl text-neutral-400 leading-relaxed">
              Os recursos da Rise Up não são conteúdos genéricos. São materiais pensados 
              para quem quer parar de viver no automático e começar a construir uma vida 
              mais organizada, consciente e eficiente.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 rounded-2xl border border-neutral-800 hover:border-[#D4AF37]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Guias práticos</h3>
              <p className="text-neutral-400 text-sm">
                Métodos claros para organizar rotina, estudos, trabalho e projetos pessoais.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 rounded-2xl border border-neutral-800 hover:border-[#D4AF37]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Clareza mental</h3>
              <p className="text-neutral-400 text-sm">
                Ferramentas para entender padrões, tomar decisões melhores e reduzir sobrecarga.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 rounded-2xl border border-neutral-800 hover:border-[#D4AF37]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Organização inteligente</h3>
              <p className="text-neutral-400 text-sm">
                Sistemas simples que funcionam mesmo em dias difíceis.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 rounded-2xl border border-neutral-800 hover:border-[#D4AF37]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Performance real</h3>
              <p className="text-neutral-400 text-sm">
                Mais foco, menos dispersão, mais resultado com menos esforço desperdiçado.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 rounded-2xl border border-neutral-800 hover:border-[#D4AF37]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Autoavaliação</h3>
              <p className="text-neutral-400 text-sm">
                Materiais para acompanhar sua evolução ao longo do tempo.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 rounded-2xl border border-neutral-800 hover:border-[#D4AF37]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Base de valores</h3>
              <p className="text-neutral-400 text-sm">
                Desenvolvimento pessoal com propósito, ética e consciência.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONEXÃO COM PLANOS E APP */}
      <section className="py-20 px-4 sm:px-6 lg:px-16 bg-neutral-950">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* App Card */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-2xl p-8 h-full group-hover:border-[#D4AF37]/50 transition-all duration-300">
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
                  <li className="flex items-center gap-3 text-sm text-neutral-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                    <span>Planejamento inteligente</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-neutral-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                    <span>Organização visual</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-neutral-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                    <span>Check-ins e acompanhamento</span>
                  </li>
                </ul>

                <Link
                  href="/app"
                  className="inline-block w-full text-center py-3 bg-white hover:bg-neutral-100 text-black font-semibold rounded-xl transition-all duration-300"
                >
                  Conhecer o App
                </Link>
              </div>
            </div>

            {/* Planos Card */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-2xl p-8 h-full group-hover:border-[#D4AF37]/50 transition-all duration-300">
                <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold mb-4">Planos Completos</h3>
                
                <p className="text-neutral-400 mb-6">
                  Aprofunde com infoprodutos estratégicos: ebooks, treinamentos, 
                  planners e muito mais para acelerar sua evolução.
                </p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-sm text-neutral-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                    <span>Conteúdo aprofundado</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-neutral-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                    <span>Acesso vitalício</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-neutral-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                    <span>Sistema completo</span>
                  </li>
                </ul>

                <Link
                  href="/produtos"
                  className="inline-block w-full text-center py-3 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-semibold rounded-xl transition-all duration-300"
                >
                  Ver Produtos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ CURTO */}
      <section className="py-20 px-4 sm:px-6 lg:px-16 bg-black">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Perguntas Frequentes
          </h2>

          <div className="space-y-6">
            {/* Q1 */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h3 className="font-semibold mb-2 text-lg">
                Os recursos são realmente gratuitos?
              </h3>
              <p className="text-neutral-400">
                Sim. Você pode acessar todos os materiais gratuitos sem custo algum. 
                Apenas fazemos um cadastro simples para organizar o envio.
              </p>
            </div>

            {/* Q2 */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h3 className="font-semibold mb-2 text-lg">
                Preciso comprar algo depois?
              </h3>
              <p className="text-neutral-400">
                Não. Os recursos gratuitos já entregam valor real. Os planos pagos 
                são para quem quer aprofundar e acelerar resultados.
              </p>
            </div>

            {/* Q3 */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h3 className="font-semibold mb-2 text-lg">
                Para quem esses recursos são indicados?
              </h3>
              <p className="text-neutral-400">
                Para quem busca mais organização, clareza mental, disciplina e 
                evolução pessoal de forma prática e aplicável.
              </p>
            </div>

            {/* Q4 */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h3 className="font-semibold mb-2 text-lg">
                Posso sair da lista quando quiser?
              </h3>
              <p className="text-neutral-400">
                Sim. Você pode cancelar o recebimento de emails a qualquer momento 
                com um clique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#D4AF37] via-[#C5A028] to-[#B8941F] py-20 px-4 sm:px-6 lg:px-16">
        {/* Ondas decorativas */}
        <div className="absolute inset-0 opacity-20">
          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="currentColor" fillOpacity="0.3" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">
            Evoluir não precisa ser confuso
          </h2>
          
          <p className="text-xl text-black/80 mb-10 max-w-2xl mx-auto">
            Com a estrutura certa, o processo se torna mais claro, leve e possível.
          </p>

          <p className="text-lg text-black/70 mb-10">
            Comece agora. É gratuito.
          </p>

          <div className="inline-flex flex-col items-center gap-2">
            <svg className="w-6 h-6 text-black/60 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            <span className="text-black/60 text-sm font-semibold">
              Role para cima e escolha seu material
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}