"use client";

import Link from "next/link";
import { useState, useRef } from "react";

export default function AppPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const planosRef = useRef<HTMLElement>(null);

  const scrollToPlanos = () => {
    const el = planosRef.current;
    if (el) {
      window.scrollTo({ top: el.offsetTop - 90, behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO CURTO */}
      <section className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-16 bg-gradient-to-b from-black via-neutral-900 to-black">
        {/* Background decorativo */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37] opacity-5 rounded-full blur-3xl"></div>

        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Sua mente organizada.
              <br />
              <span className="text-[#D4AF37]">
                Sua vida em movimento.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-neutral-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Notas, metas, rotinas e hábitos em um só lugar. Simples de usar, poderoso o suficiente para mudar sua vida.
            </p>

            {/* Scroll indicator */}
            <button
              onClick={scrollToPlanos}
              className="inline-flex flex-col items-center gap-2 hover:opacity-75 transition-opacity"
            >
              <span className="text-xs text-neutral-400 font-semibold uppercase tracking-widest">Escolha seu plano</span>
              <svg
                className="w-9 h-9 text-neutral-400 animate-bounce"
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

      {/* PLANOS DE ASSINATURA */}
      <section id="planos-app" ref={planosRef} className="py-20 px-4 sm:px-6 lg:px-16 bg-neutral-950">
        <div className="max-w-[1600px] mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Escolha seu plano
            </h2>
            <p className="text-neutral-400 text-lg mb-8">
              Comece grátis. Faça upgrade quando quiser.
            </p>
          </div>

          {/* Grid de Planos */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-16">
            {/* PLANO FREE */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-neutral-600 to-neutral-700 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>

              <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-8 h-full flex flex-col group-hover:border-neutral-600/50 transition-all duration-300">
                <div className="min-h-[160px]">
                  {/* Nome */}
                  <h3 className="text-2xl font-bold mb-2">Free</h3>

                  {/* Preço */}
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-white">R$ 0</span>
                    <span className="text-neutral-500 text-sm ml-2">sempre</span>
                  </div>

                  {/* Descrição */}
                  <p className="text-neutral-400 mb-6 text-sm">
                    Acesso básico para experimentar o app
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Acesso básico</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>20 notas</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>5 metas</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Funcionalidades limitadas</span>
                  </li>
                </ul>

                {/* CTA */}
                <Link
                  href="/cadastro"
                  className="mt-auto w-full py-4 bg-white hover:bg-neutral-100 text-black font-bold rounded-xl transition-all duration-300 hover:scale-105 text-center"
                >
                  Começar grátis
                </Link>
              </div>
            </div>

            {/* PLANO QUINZENAL */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-neutral-600 to-neutral-700 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>

              <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-8 h-full flex flex-col group-hover:border-neutral-600/50 transition-all duration-300">
                <div className="min-h-[160px]">
                  {/* Nome */}
                  <h3 className="text-2xl font-bold mb-2">Quinzenal</h3>

                  {/* Preço */}
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-white">R$ 19</span>
                    <span className="text-neutral-500 text-sm ml-2">/15 dias</span>
                  </div>

                  {/* Descrição */}
                  <p className="text-neutral-400 mb-6 text-sm">
                    Teste completo por 15 dias
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Tudo ilimitado</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>IA completa</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Sem fidelidade</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Cancele quando quiser</span>
                  </li>
                </ul>

                {/* CTA */}
                <Link
                  href="/cadastro?plan=quinzenal"
                  className="mt-auto w-full py-4 bg-white hover:bg-neutral-100 text-black font-bold rounded-xl transition-all duration-300 hover:scale-105 text-center"
                >
                  Testar agora
                </Link>
              </div>
            </div>

            {/* PLANO MENSAL - MAIS ESCOLHIDO */}
            <div className="group relative lg:scale-105 lg:-my-6">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] rounded-2xl opacity-30 blur transition-all duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-neutral-900 to-black border-2 border-[#D4AF37] rounded-2xl p-8 h-full flex flex-col">
                {/* Badge MAIS ESCOLHIDO */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-6 py-2 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider rounded-full shadow-xl">
                    Mais Escolhido
                  </span>
                </div>

                {/* Nome */}
                <h3 className="text-2xl font-bold mb-2 mt-4 text-[#D4AF37]">Mensal</h3>
                
                {/* Preço */}
                <div className="mb-2">
                  <span className="text-5xl font-bold text-[#D4AF37]">R$ 29</span>
                  <span className="text-[#D4AF37] text-sm ml-2">/mês</span>
                </div>

                {/* Economia dentro do card */}
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-xs font-bold">
                    Economize 24% vs quinzenal
                  </span>
                </div>

                {/* Descrição */}
                <p className="text-neutral-300 mb-6 text-sm">
                  Tudo ilimitado + melhor custo
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start gap-3 text-sm text-neutral-200">
                    <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Tudo ilimitado</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-200">
                    <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Melhor custo-benefício</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-200">
                    <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Acesso premium</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-200">
                    <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Cancele quando quiser</span>
                  </li>
                </ul>

                {/* CTA */}
                <Link
                  href="/cadastro?plan=mensal"
                  className="w-full py-4 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-bold rounded-xl transition-all duration-300 hover:scale-105 text-center shadow-xl shadow-[#D4AF37]/20"
                >
                  Virar Premium
                </Link>
              </div>
            </div>

            {/* PLANO ANUAL */}
            <div className="group relative">
              {/* Badge MELHOR INVESTIMENTO */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <span className="inline-block px-4 py-2 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider rounded-full shadow-xl whitespace-nowrap">
                  Melhor Investimento
                </span>
              </div>

              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>

              <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-8 h-full flex flex-col group-hover:border-[#D4AF37]/50 transition-all duration-300">
                <div className="min-h-[160px]">
                  {/* Nome */}
                  <h3 className="text-2xl font-bold mb-2 text-[#D4AF37]">Anual</h3>

                  {/* Preço + badge + equivalente mensal */}
                  <div className="mb-6">
                    <div className="mb-2">
                      <span className="text-5xl font-bold text-[#D4AF37]">R$ 244</span>
                      <span className="text-[#D4AF37] text-sm ml-2">/ano</span>
                    </div>
                    <span className="inline-block px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-xs font-bold mb-1">
                      Economize 30%
                    </span>
                    <p className="text-neutral-500 text-sm mt-1">~R$ 20,33/mês</p>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Economia de 30%</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Tudo ilimitado</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Prioridade</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Melhor investimento</span>
                  </li>
                </ul>

                {/* CTA */}
                <Link
                  href="/cadastro?plan=anual"
                  className="mt-auto w-full py-4 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-bold rounded-xl transition-all duration-300 hover:scale-105 text-center"
                >
                  Economizar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FUNCIONALIDADES E BENEFÍCIOS */}
      <section className="py-20 px-4 sm:px-6 lg:px-16 bg-black">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-[#D4AF37] text-sm font-bold uppercase tracking-widest mb-4">
              Funcionalidades
            </p>
            <h3 className="text-3xl sm:text-4xl font-bold mb-6">
              Um sistema que pensa com você
            </h3>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Cada funcionalidade foi pensada para eliminar o caos e criar clareza. Nada supérfluo. Tudo conectado.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid lg:grid-cols-3 gap-4">

            {/* Feature 1 — Anotações inteligentes — wide */}
            <div className="lg:col-span-2 bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-8 hover:border-[#D4AF37]/50 transition-all duration-300">
              <div className="flex items-center justify-center h-44 mb-6">
                <svg viewBox="0 0 220 110" className="w-full max-w-[320px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Connection lines */}
                  <line x1="42" y1="55" x2="100" y2="28" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.35">
                    <animate attributeName="stroke-opacity" values="0.2;0.6;0.2" dur="2.4s" repeatCount="indefinite" />
                  </line>
                  <line x1="42" y1="55" x2="100" y2="72" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.35">
                    <animate attributeName="stroke-opacity" values="0.2;0.6;0.2" dur="2.4s" begin="0.4s" repeatCount="indefinite" />
                  </line>
                  <line x1="100" y1="28" x2="168" y2="18" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.35">
                    <animate attributeName="stroke-opacity" values="0.2;0.6;0.2" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
                  </line>
                  <line x1="100" y1="28" x2="168" y2="50" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.35">
                    <animate attributeName="stroke-opacity" values="0.2;0.6;0.2" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
                  </line>
                  <line x1="100" y1="72" x2="168" y2="82" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.35">
                    <animate attributeName="stroke-opacity" values="0.2;0.6;0.2" dur="2.4s" begin="1.6s" repeatCount="indefinite" />
                  </line>
                  {/* Central node */}
                  <circle cx="42" cy="55" r="10" fill="#D4AF37" fillOpacity="0.12" stroke="#D4AF37" strokeWidth="1.5">
                    <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" values="0.12;0.25;0.12" dur="2s" repeatCount="indefinite" />
                  </circle>
                  {/* Mid nodes */}
                  <circle cx="100" cy="28" r="7" fill="#D4AF37" fillOpacity="0.12" stroke="#D4AF37" strokeWidth="1.5">
                    <animate attributeName="r" values="5;8;5" dur="2s" begin="0.5s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" values="0.1;0.22;0.1" dur="2s" begin="0.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="100" cy="72" r="7" fill="#D4AF37" fillOpacity="0.12" stroke="#D4AF37" strokeWidth="1.5">
                    <animate attributeName="r" values="5;8;5" dur="2s" begin="1s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" values="0.1;0.22;0.1" dur="2s" begin="1s" repeatCount="indefinite" />
                  </circle>
                  {/* Leaf nodes */}
                  <circle cx="168" cy="18" r="5" fill="#D4AF37" fillOpacity="0.1" stroke="#D4AF37" strokeWidth="1.5">
                    <animate attributeName="r" values="4;6;4" dur="2s" begin="0.8s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="168" cy="50" r="5" fill="#D4AF37" fillOpacity="0.1" stroke="#D4AF37" strokeWidth="1.5">
                    <animate attributeName="r" values="4;6;4" dur="2s" begin="1.4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="168" cy="82" r="5" fill="#D4AF37" fillOpacity="0.1" stroke="#D4AF37" strokeWidth="1.5">
                    <animate attributeName="r" values="4;6;4" dur="2s" begin="1.9s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-3">Anotações inteligentes</h4>
              <p className="text-neutral-400">Capture ideias e organize pensamentos de forma visual e conectada</p>
            </div>

            {/* Feature 2 — Organização em árvore */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-8 hover:border-[#D4AF37]/50 transition-all duration-300">
              <div className="flex items-center justify-center h-44 mb-6">
                <svg viewBox="0 0 110 150" className="w-full max-w-[130px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Root node */}
                  <rect x="35" y="6" width="40" height="18" rx="5" fill="#D4AF37" fillOpacity="0.2" stroke="#D4AF37" strokeWidth="1.5" />
                  {/* Level 1 lines */}
                  <line x1="55" y1="24" x2="26" y2="54" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="36">
                    <animate attributeName="stroke-dashoffset" values="36;0;36" dur="2.5s" repeatCount="indefinite" />
                  </line>
                  <line x1="55" y1="24" x2="84" y2="54" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="36">
                    <animate attributeName="stroke-dashoffset" values="36;0;36" dur="2.5s" begin="0.3s" repeatCount="indefinite" />
                  </line>
                  {/* Level 1 nodes */}
                  <rect x="8" y="54" width="36" height="16" rx="4" fill="#D4AF37" fillOpacity="0.14" stroke="#D4AF37" strokeWidth="1.5" />
                  <rect x="66" y="54" width="36" height="16" rx="4" fill="#D4AF37" fillOpacity="0.14" stroke="#D4AF37" strokeWidth="1.5" />
                  {/* Level 2 lines */}
                  <line x1="26" y1="70" x2="14" y2="100" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="32">
                    <animate attributeName="stroke-dashoffset" values="32;0;32" dur="2.5s" begin="0.6s" repeatCount="indefinite" />
                  </line>
                  <line x1="26" y1="70" x2="38" y2="100" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="32">
                    <animate attributeName="stroke-dashoffset" values="32;0;32" dur="2.5s" begin="0.9s" repeatCount="indefinite" />
                  </line>
                  <line x1="84" y1="70" x2="72" y2="100" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="32">
                    <animate attributeName="stroke-dashoffset" values="32;0;32" dur="2.5s" begin="1.2s" repeatCount="indefinite" />
                  </line>
                  <line x1="84" y1="70" x2="96" y2="100" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="32">
                    <animate attributeName="stroke-dashoffset" values="32;0;32" dur="2.5s" begin="1.5s" repeatCount="indefinite" />
                  </line>
                  {/* Level 2 nodes */}
                  <rect x="5" y="100" width="18" height="12" rx="3" fill="#D4AF37" fillOpacity="0.1" stroke="#D4AF37" strokeWidth="1.5" />
                  <rect x="29" y="100" width="18" height="12" rx="3" fill="#D4AF37" fillOpacity="0.1" stroke="#D4AF37" strokeWidth="1.5" />
                  <rect x="63" y="100" width="18" height="12" rx="3" fill="#D4AF37" fillOpacity="0.1" stroke="#D4AF37" strokeWidth="1.5" />
                  <rect x="87" y="100" width="18" height="12" rx="3" fill="#D4AF37" fillOpacity="0.1" stroke="#D4AF37" strokeWidth="1.5" />
                  {/* Level 3 hints */}
                  <line x1="14" y1="112" x2="10" y2="132" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="22">
                    <animate attributeName="stroke-dashoffset" values="22;0;22" dur="2.5s" begin="1.8s" repeatCount="indefinite" />
                  </line>
                  <line x1="38" y1="112" x2="42" y2="132" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="22">
                    <animate attributeName="stroke-dashoffset" values="22;0;22" dur="2.5s" begin="2.1s" repeatCount="indefinite" />
                  </line>
                  <circle cx="10" cy="136" r="4" fill="#D4AF37" fillOpacity="0.12" stroke="#D4AF37" strokeWidth="1">
                    <animate attributeName="fill-opacity" values="0.08;0.2;0.08" dur="2s" begin="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="42" cy="136" r="4" fill="#D4AF37" fillOpacity="0.12" stroke="#D4AF37" strokeWidth="1">
                    <animate attributeName="fill-opacity" values="0.08;0.2;0.08" dur="2s" begin="2.3s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-3">Organização em árvore</h4>
              <p className="text-neutral-400">Estruture suas notas em hierarquias visuais claras e expansíveis</p>
            </div>

            {/* Feature 3 — Metas e tarefas conectadas */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-8 hover:border-[#D4AF37]/50 transition-all duration-300">
              <div className="flex items-center justify-center h-44 mb-6">
                <svg viewBox="0 0 100 100" className="w-36 h-36" xmlns="http://www.w3.org/2000/svg">
                  {/* Track */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#D4AF37" strokeWidth="5" strokeOpacity="0.12" />
                  {/* Progress arc */}
                  <circle
                    cx="50" cy="50" r="36"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="5"
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    strokeDasharray="0 226"
                  >
                    <animate attributeName="stroke-dasharray" values="0 226;169 226;169 226" dur="2.5s" repeatCount="indefinite" keyTimes="0;0.6;1" />
                    <animate attributeName="stroke-opacity" values="1;1;0.3" dur="2.5s" repeatCount="indefinite" keyTimes="0;0.6;1" />
                  </circle>
                  {/* Inner ring */}
                  <circle cx="50" cy="50" r="26" fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.12" />
                  {/* Percentage label */}
                  <text x="50" y="46" textAnchor="middle" fill="#D4AF37" fontSize="14" fontWeight="bold" fontFamily="sans-serif">75%</text>
                  <text x="50" y="60" textAnchor="middle" fill="#D4AF37" fontSize="7" fontFamily="sans-serif" opacity="0.6">concluído</text>
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-3">Metas e tarefas conectadas</h4>
              <p className="text-neutral-400">Vincule objetivos, tarefas e rotinas em um único sistema</p>
            </div>

            {/* Feature 4 — Alertas e timers — wide */}
            <div className="lg:col-span-2 bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-8 hover:border-[#D4AF37]/50 transition-all duration-300">
              <div className="flex items-center justify-center h-44 mb-6">
                <svg viewBox="0 0 100 100" className="w-36 h-36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Clock face outer */}
                  <circle cx="50" cy="50" r="44" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.2" />
                  {/* Clock face inner glow */}
                  <circle cx="50" cy="50" r="44" fill="#D4AF37" fillOpacity="0.03" />
                  {/* Hour markers */}
                  <line x1="50" y1="8" x2="50" y2="14" stroke="#D4AF37" strokeWidth="2.5" strokeOpacity="0.7" strokeLinecap="round" />
                  <line x1="92" y1="50" x2="86" y2="50" stroke="#D4AF37" strokeWidth="2.5" strokeOpacity="0.7" strokeLinecap="round" />
                  <line x1="50" y1="92" x2="50" y2="86" stroke="#D4AF37" strokeWidth="2.5" strokeOpacity="0.7" strokeLinecap="round" />
                  <line x1="8" y1="50" x2="14" y2="50" stroke="#D4AF37" strokeWidth="2.5" strokeOpacity="0.7" strokeLinecap="round" />
                  {/* Minor markers */}
                  <line x1="71.5" y1="11.5" x2="68.8" y2="16.2" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round" />
                  <line x1="88.5" y1="28.5" x2="83.8" y2="31.2" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round" />
                  <line x1="88.5" y1="71.5" x2="83.8" y2="68.8" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round" />
                  <line x1="71.5" y1="88.5" x2="68.8" y2="83.8" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round" />
                  <line x1="28.5" y1="88.5" x2="31.2" y2="83.8" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round" />
                  <line x1="11.5" y1="71.5" x2="16.2" y2="68.8" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round" />
                  <line x1="11.5" y1="28.5" x2="16.2" y2="31.2" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round" />
                  <line x1="28.5" y1="11.5" x2="31.2" y2="16.2" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round" />
                  {/* Hour hand */}
                  <line x1="50" y1="50" x2="50" y2="26" stroke="#D4AF37" strokeWidth="3.5" strokeLinecap="round" strokeOpacity="0.9">
                    <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="86400s" repeatCount="indefinite" />
                  </line>
                  {/* Minute hand */}
                  <line x1="50" y1="50" x2="50" y2="14" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7">
                    <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="10s" repeatCount="indefinite" />
                  </line>
                  {/* Second hand */}
                  <line x1="50" y1="54" x2="50" y2="12" stroke="white" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5">
                    <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1.2s" repeatCount="indefinite" />
                  </line>
                  {/* Center cap */}
                  <circle cx="50" cy="50" r="4" fill="#D4AF37" />
                  <circle cx="50" cy="50" r="2" fill="#1a1a1a" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-3">Alertas e timers personalizados</h4>
              <p className="text-neutral-400">Gerencie tempo com timers de horas, dias, meses e anos</p>
            </div>

            {/* Feature 5 — Check-ins diários — wide */}
            <div className="lg:col-span-2 bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-8 hover:border-[#D4AF37]/50 transition-all duration-300">
              <div className="flex items-center justify-center h-44 mb-6">
                <svg viewBox="0 0 160 110" className="w-full max-w-[240px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Calendar frame */}
                  <rect x="8" y="16" width="144" height="90" rx="8" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.3" />
                  {/* Header */}
                  <rect x="8" y="16" width="144" height="24" rx="8" fill="#D4AF37" fillOpacity="0.08" />
                  <line x1="8" y1="40" x2="152" y2="40" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.2" />
                  {/* Top bumps */}
                  <line x1="45" y1="8" x2="45" y2="24" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
                  <line x1="115" y1="8" x2="115" y2="24" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
                  {/* Month label */}
                  <rect x="60" y="24" width="40" height="6" rx="3" fill="#D4AF37" fillOpacity="0.2" />
                  {/* Day cells — 7 columns x 3 rows */}
                  {[0,1,2,3,4,5,6].map(col =>
                    [0,1,2].map(row => {
                      const cx = 22 + col * 19;
                      const cy = 56 + row * 18;
                      const idx = col + row * 7;
                      const isChecked = idx < 11;
                      const isToday = idx === 10;
                      return (
                        <g key={`cal-${col}-${row}`}>
                          <rect
                            x={cx - 7} y={cy - 7} width="14" height="14" rx="4"
                            fill={isToday ? '#D4AF37' : isChecked ? '#D4AF37' : 'transparent'}
                            fillOpacity={isToday ? 0.25 : isChecked ? 0.08 : 0}
                            stroke="#D4AF37"
                            strokeWidth="1"
                            strokeOpacity={isChecked ? 0.35 : 0.12}
                          />
                          {isChecked && (
                            <path
                              d={`M${cx - 3} ${cy + 1} l2.5 2.5 5-5`}
                              stroke="#D4AF37"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeDasharray="12"
                              strokeDashoffset="12"
                            >
                              <animate
                                attributeName="stroke-dashoffset"
                                values="12;0"
                                dur="0.5s"
                                begin={`${idx * 0.12}s`}
                                fill="freeze"
                                repeatCount="indefinite"
                              />
                            </path>
                          )}
                        </g>
                      );
                    })
                  )}
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-3">Check-ins diários simples</h4>
              <p className="text-neutral-400">Acompanhe humor, rotina e energia todos os dias</p>
            </div>

            {/* Feature 6 — Relatórios de progresso */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-8 hover:border-[#D4AF37]/50 transition-all duration-300">
              <div className="flex items-center justify-center h-44 mb-6">
                <svg viewBox="0 0 110 90" className="w-full max-w-[160px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Axes */}
                  <line x1="14" y1="10" x2="14" y2="76" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.25" />
                  <line x1="14" y1="76" x2="100" y2="76" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.25" />
                  {/* Grid lines */}
                  <line x1="14" y1="58" x2="100" y2="58" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.1" strokeDasharray="3 3" />
                  <line x1="14" y1="40" x2="100" y2="40" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.1" strokeDasharray="3 3" />
                  <line x1="14" y1="22" x2="100" y2="22" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.1" strokeDasharray="3 3" />
                  {/* Bar 1 — short */}
                  <rect x="20" y="58" width="14" height="18" rx="3" fill="#D4AF37" fillOpacity="0.18" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.5">
                    <animate attributeName="height" values="0;18" dur="1.8s" begin="0s" repeatCount="indefinite" />
                    <animate attributeName="y" values="76;58" dur="1.8s" begin="0s" repeatCount="indefinite" />
                  </rect>
                  {/* Bar 2 — medium */}
                  <rect x="40" y="44" width="14" height="32" rx="3" fill="#D4AF37" fillOpacity="0.28" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.65">
                    <animate attributeName="height" values="0;32" dur="1.8s" begin="0.2s" repeatCount="indefinite" />
                    <animate attributeName="y" values="76;44" dur="1.8s" begin="0.2s" repeatCount="indefinite" />
                  </rect>
                  {/* Bar 3 — tall */}
                  <rect x="60" y="30" width="14" height="46" rx="3" fill="#D4AF37" fillOpacity="0.4" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.8">
                    <animate attributeName="height" values="0;46" dur="1.8s" begin="0.4s" repeatCount="indefinite" />
                    <animate attributeName="y" values="76;30" dur="1.8s" begin="0.4s" repeatCount="indefinite" />
                  </rect>
                  {/* Bar 4 — tallest */}
                  <rect x="80" y="14" width="14" height="62" rx="3" fill="#D4AF37" fillOpacity="0.65" stroke="#D4AF37" strokeWidth="2" strokeOpacity="1">
                    <animate attributeName="height" values="0;62" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
                    <animate attributeName="y" values="76;14" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
                  </rect>
                  {/* Top dots */}
                  <circle cx="27" cy="58" r="2.5" fill="#D4AF37" fillOpacity="0.7" />
                  <circle cx="47" cy="44" r="2.5" fill="#D4AF37" fillOpacity="0.8" />
                  <circle cx="67" cy="30" r="2.5" fill="#D4AF37" fillOpacity="0.9" />
                  <circle cx="87" cy="14" r="3" fill="#D4AF37" />
                  {/* Trend line */}
                  <polyline points="27,58 47,44 67,30 87,14" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.35" strokeDasharray="4 3" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-3">Relatórios de progresso</h4>
              <p className="text-neutral-400">Visualize sua evolução com relatórios semanais e mensais</p>
            </div>

          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-20 px-4 sm:px-6 lg:px-16 bg-neutral-950">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#D4AF37] text-sm font-bold uppercase tracking-widest mb-4">
              Como funciona
            </p>
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              Simples, intuitivo e eficiente
            </h3>
            <p className="text-lg text-neutral-400">
              Quatro passos. Uma transformação. Sem complicação.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Passo 1 — Crie sua conta */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-300 group flex flex-col">
              {/* Mockup — tela de login/cadastro Rise Up */}
              <div className="bg-neutral-800/40 p-5 border-b border-neutral-800/60 flex-1">
                <svg viewBox="0 0 160 148" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* App frame */}
                  <rect x="4" y="4" width="152" height="140" rx="10" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1" />

                  {/* Logo "RiseUp" */}
                  <text x="80" y="22" textAnchor="middle" fill="#D4AF37" fontSize="10" fontWeight="bold" fontFamily="serif" letterSpacing="2">RiseUp</text>

                  {/* Subtitle "Bem-vindo de volta!" */}
                  <text x="80" y="34" textAnchor="middle" fill="#aaa" fontSize="6" fontFamily="sans-serif">Bem-vindo de volta!</text>

                  {/* Tab container */}
                  <rect x="14" y="40" width="132" height="18" rx="6" fill="#2a2a2a" />
                  {/* Tab Entrar — active gold */}
                  <rect x="16" y="42" width="62" height="14" rx="5" fill="#D4AF37" />
                  <text x="47" y="52" textAnchor="middle" fill="#000" fontSize="6" fontWeight="bold" fontFamily="sans-serif">Entrar</text>
                  {/* Tab Criar conta — inactive */}
                  <text x="111" y="52" textAnchor="middle" fill="#888" fontSize="6" fontFamily="sans-serif">Criar conta</text>

                  {/* Email label */}
                  <text x="14" y="70" fill="#ccc" fontSize="5.5" fontFamily="sans-serif">Email</text>
                  {/* Email field */}
                  <rect x="14" y="73" width="132" height="14" rx="4" fill="#252525" stroke="#3a3a3a" strokeWidth="1" />
                  <text x="20" y="82" fill="#555" fontSize="5.5" fontFamily="sans-serif">seu@email.com</text>

                  {/* Senha label */}
                  <text x="14" y="97" fill="#ccc" fontSize="5.5" fontFamily="sans-serif">Senha</text>
                  {/* Senha field */}
                  <rect x="14" y="100" width="132" height="14" rx="4" fill="#252525" stroke="#3a3a3a" strokeWidth="1" />
                  {/* Dots */}
                  {[0,1,2,3,4,5,6,7].map(i => (
                    <circle key={i} cx={21 + i * 8} cy={107} r={2} fill="#555" />
                  ))}

                  {/* Botão Entrar */}
                  <rect x="14" y="120" width="132" height="14" rx="5" fill="#D4AF37">
                    <animate attributeName="fill-opacity" values="1;0.85;1" dur="3s" repeatCount="indefinite" />
                  </rect>
                  <text x="80" y="130" textAnchor="middle" fill="#000" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">Entrar</text>

                  {/* Esqueceu a senha */}
                  <text x="80" y="142" textAnchor="middle" fill="#666" fontSize="5" fontFamily="sans-serif">Esqueceu a senha?</text>
                </svg>
              </div>
              {/* Text */}
              <div className="p-5">
                <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-1">Passo 1:</p>
                <h4 className="font-bold text-white mb-1.5">Crie sua conta</h4>
                <p className="text-neutral-400 text-sm leading-snug">Cadastre-se em segundos e tenha acesso imediato ao app</p>
              </div>
            </div>

            {/* Passo 2 — Organize */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-300 group flex flex-col">
              {/* Mockup — hierarquia / árvore visual */}
              <div className="bg-neutral-800/40 p-5 border-b border-neutral-800/60 flex-1">
                <svg viewBox="0 0 160 118" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* App frame */}
                  <rect x="4" y="4" width="152" height="110" rx="10" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
                  {/* Status bar */}
                  <rect x="4" y="4" width="152" height="18" rx="10" fill="#222" />
                  <rect x="4" y="14" width="152" height="8" fill="#222" />
                  <circle cx="20" cy="13" r="3" fill="#D4AF37" fillOpacity="0.5" />
                  <rect x="28" y="10" width="50" height="6" rx="3" fill="#444" />
                  {/* Sidebar strip */}
                  <rect x="4" y="22" width="28" height="92" fill="#1c1c1c" />
                  <rect x="4" y="22" width="28" height="92" rx="0" />
                  <circle cx="18" cy="32" r="5" fill="#D4AF37" fillOpacity="0.25" />
                  <circle cx="18" cy="46" r="5" fill="#333" />
                  <circle cx="18" cy="60" r="5" fill="#333" />
                  <circle cx="18" cy="74" r="5" fill="#333" />
                  {/* Main content — tree */}
                  {/* Root */}
                  <rect x="38" y="28" width="42" height="12" rx="4" fill="#D4AF37" fillOpacity="0.2" stroke="#D4AF37" strokeOpacity="0.5" strokeWidth="1" />
                  <rect x="42" y="31" width="28" height="5" rx="2" fill="#D4AF37" fillOpacity="0.5" />
                  {/* Level 1 connectors */}
                  <line x1="59" y1="40" x2="52" y2="56" stroke="#D4AF37" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 2">
                    <animate attributeName="stroke-opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite" />
                  </line>
                  <line x1="59" y1="40" x2="80" y2="56" stroke="#D4AF37" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 2">
                    <animate attributeName="stroke-opacity" values="0.2;0.5;0.2" dur="2s" begin="0.4s" repeatCount="indefinite" />
                  </line>
                  {/* Level 1 nodes */}
                  <rect x="38" y="56" width="28" height="10" rx="3" fill="#252525" stroke="#444" strokeWidth="1" />
                  <rect x="42" y="58.5" width="18" height="4" rx="2" fill="#666" />
                  <rect x="66" y="56" width="28" height="10" rx="3" fill="#252525" stroke="#444" strokeWidth="1" />
                  <rect x="70" y="58.5" width="18" height="4" rx="2" fill="#666" />
                  {/* Level 2 */}
                  <line x1="52" y1="66" x2="48" y2="78" stroke="#555" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="80" y1="66" x2="84" y2="78" stroke="#555" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="80" y1="66" x2="104" y2="78" stroke="#555" strokeWidth="1" strokeDasharray="2 2" />
                  <rect x="36" y="78" width="24" height="9" rx="3" fill="#1e1e1e" stroke="#333" strokeWidth="1" />
                  <rect x="40" y="80.5" width="14" height="4" rx="2" fill="#444" />
                  <rect x="72" y="78" width="24" height="9" rx="3" fill="#1e1e1e" stroke="#333" strokeWidth="1" />
                  <rect x="76" y="80.5" width="14" height="4" rx="2" fill="#444" />
                  <rect x="98" y="78" width="44" height="9" rx="3" fill="#D4AF37" fillOpacity="0.1" stroke="#D4AF37" strokeOpacity="0.3" strokeWidth="1">
                    <animate attributeName="fill-opacity" values="0.05;0.18;0.05" dur="2s" repeatCount="indefinite" />
                  </rect>
                  <rect x="102" y="80.5" width="28" height="4" rx="2" fill="#D4AF37" fillOpacity="0.4" />
                  {/* New item indicator */}
                  <circle cx="148" cy="79" r="5" fill="#D4AF37" fillOpacity="0.9">
                    <animate attributeName="fill-opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                  <line x1="145.5" y1="79" x2="150.5" y2="79" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="148" y1="76.5" x2="148" y2="81.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="p-5">
                <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-1">Passo 2:</p>
                <h4 className="font-bold text-white mb-1.5">Organize</h4>
                <p className="text-neutral-400 text-sm leading-snug">Estruture tudo em hierarquias visuais e conectadas</p>
              </div>
            </div>

            {/* Passo 3 — Ajuste */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-300 group flex flex-col">
              {/* Mockup — sliders / toggles de configuração */}
              <div className="bg-neutral-800/40 p-5 border-b border-neutral-800/60 flex-1">
                <svg viewBox="0 0 160 118" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* App frame */}
                  <rect x="4" y="4" width="152" height="110" rx="10" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
                  {/* Status bar */}
                  <rect x="4" y="4" width="152" height="18" rx="10" fill="#222" />
                  <rect x="4" y="14" width="152" height="8" fill="#222" />
                  <circle cx="20" cy="13" r="3" fill="#D4AF37" fillOpacity="0.5" />
                  <rect x="28" y="10" width="50" height="6" rx="3" fill="#444" />
                  {/* Header */}
                  <rect x="4" y="22" width="152" height="14" fill="#1e1e1e" />
                  <rect x="12" y="25" width="55" height="7" rx="3" fill="#D4AF37" fillOpacity="0.15" />
                  {/* Toggle rows */}
                  {/* Row 1 */}
                  <rect x="12" y="42" width="136" height="14" rx="4" fill="#252525" />
                  <rect x="16" y="45" width="30" height="5" rx="2" fill="#555" />
                  <rect x="116" y="43" width="26" height="12" rx="6" fill="#D4AF37" fillOpacity="0.8">
                    <animate attributeName="fill-opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
                  </rect>
                  <circle cx="136" cy="49" r="5" fill="white" fillOpacity="0.9" />
                  {/* Row 2 */}
                  <rect x="12" y="60" width="136" height="14" rx="4" fill="#252525" />
                  <rect x="16" y="63" width="40" height="5" rx="2" fill="#555" />
                  <rect x="116" y="61" width="26" height="12" rx="6" fill="#444" />
                  <circle cx="122" cy="67" r="5" fill="#666" />
                  {/* Row 3 — slider */}
                  <rect x="12" y="78" width="136" height="14" rx="4" fill="#252525" />
                  <rect x="16" y="81" width="35" height="5" rx="2" fill="#555" />
                  <rect x="16" y="87" width="92" height="3" rx="1.5" fill="#333" />
                  <rect x="16" y="87" width="60" height="3" rx="1.5" fill="#D4AF37" fillOpacity="0.7">
                    <animate attributeName="width" values="40;70;40" dur="3s" repeatCount="indefinite" />
                  </rect>
                  <circle cx="76" cy="88.5" r="5" fill="#D4AF37">
                    <animate attributeName="cx" values="56;86;56" dur="3s" repeatCount="indefinite" />
                  </circle>
                  {/* Row 4 — toggle on */}
                  <rect x="12" y="96" width="136" height="12" rx="4" fill="#252525" />
                  <rect x="16" y="99" width="45" height="5" rx="2" fill="#555" />
                  <rect x="116" y="97" width="26" height="10" rx="5" fill="#D4AF37" fillOpacity="0.7" />
                  <circle cx="135" cy="102" r="4" fill="white" fillOpacity="0.9" />
                </svg>
              </div>
              <div className="p-5 min-h-[8rem]">
                <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-1">Passo 3:</p>
                <h4 className="font-bold text-white mb-1.5">Ajuste</h4>
                <p className="text-neutral-400 text-sm leading-snug">Adapte sua rotina com clareza e propósito</p>
              </div>
            </div>

            {/* Passo 4 — Evolua */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-300 group flex flex-col">
              {/* Mockup — dashboard de progresso */}
              <div className="bg-neutral-800/40 p-5 border-b border-neutral-800/60 flex-1">
                <svg viewBox="0 0 160 118" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* App frame */}
                  <rect x="4" y="4" width="152" height="110" rx="10" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
                  {/* Status bar */}
                  <rect x="4" y="4" width="152" height="18" rx="10" fill="#222" />
                  <rect x="4" y="14" width="152" height="8" fill="#222" />
                  <circle cx="20" cy="13" r="3" fill="#D4AF37" fillOpacity="0.5" />
                  <rect x="28" y="10" width="50" height="6" rx="3" fill="#444" />
                  {/* Header */}
                  <rect x="4" y="22" width="152" height="14" fill="#1e1e1e" />
                  <rect x="12" y="25" width="40" height="7" rx="3" fill="#D4AF37" fillOpacity="0.15" />
                  {/* Progress ring mini */}
                  <circle cx="32" cy="56" r="18" fill="none" stroke="#333" strokeWidth="4" />
                  <circle cx="32" cy="56" r="18" fill="none" stroke="#D4AF37" strokeWidth="4" strokeLinecap="round"
                    transform="rotate(-90 32 56)" strokeDasharray="0 113">
                    <animate attributeName="stroke-dasharray" values="0 113;85 113;85 113" dur="2.5s" repeatCount="indefinite" keyTimes="0;0.6;1" />
                  </circle>
                  <text x="32" y="59" textAnchor="middle" fill="#D4AF37" fontSize="8" fontWeight="bold" fontFamily="sans-serif">75%</text>
                  {/* Stats right */}
                  <rect x="58" y="40" width="90" height="12" rx="4" fill="#252525" />
                  <rect x="62" y="43" width="25" height="5" rx="2" fill="#555" />
                  <rect x="118" y="43" width="24" height="5" rx="2" fill="#D4AF37" fillOpacity="0.5" />
                  <rect x="58" y="56" width="90" height="12" rx="4" fill="#252525" />
                  <rect x="62" y="59" width="35" height="5" rx="2" fill="#555" />
                  <rect x="124" y="59" width="18" height="5" rx="2" fill="#D4AF37" fillOpacity="0.5" />
                  <rect x="58" y="72" width="90" height="12" rx="4" fill="#252525" />
                  <rect x="62" y="75" width="28" height="5" rx="2" fill="#555" />
                  <rect x="120" y="75" width="22" height="5" rx="2" fill="#D4AF37" fillOpacity="0.5" />
                  {/* Streak bar */}
                  <rect x="12" y="84" width="136" height="22" rx="6" fill="#252525" stroke="#D4AF37" strokeOpacity="0.2" strokeWidth="1" />
                  <rect x="18" y="89" width="28" height="6" rx="2" fill="#555" />
                  {/* Streak dots */}
                  {[0,1,2,3,4,5,6].map(i => (
                    <circle key={i} cx={68 + i * 11} cy={95} r={4}
                      fill={i < 5 ? '#D4AF37' : '#333'}
                      fillOpacity={i < 5 ? (i === 4 ? 0.6 : 0.9) : 1}>
                      {i === 4 && <animate attributeName="fill-opacity" values="0.4;1;0.4" dur="1.2s" repeatCount="indefinite" />}
                    </circle>
                  ))}
                </svg>
              </div>
              <div className="p-5">
                <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-1">Passo 4:</p>
                <h4 className="font-bold text-white mb-1.5">Evolua</h4>
                <p className="text-neutral-400 text-sm leading-snug">Acompanhe seu progresso e celebre resultados</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ DO APP */}
      <section className="pt-28 pb-32 px-4 sm:px-6 lg:px-16 bg-black">
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
            {[
              {
                id: 1,
                q: "Posso cancelar quando quiser?",
                a: "Sim! Você pode cancelar sua assinatura a qualquer momento, sem burocracia. Seu acesso continua até o fim do período já pago.",
              },
              {
                id: 2,
                q: "Como funciona o período de teste?",
                a: "O plano de 15 dias te dá acesso completo por R$ 19. Se gostar, pode migrar para mensal ou anual. Se não, simplesmente não renova.",
              },
              {
                id: 3,
                q: "Meus dados ficam salvos se eu cancelar?",
                a: "Sim. Seus dados ficam salvos por 90 dias após o cancelamento. Se voltar nesse período, tudo estará lá esperando por você.",
              },
              {
                id: 4,
                q: "Posso mudar de plano depois?",
                a: "Claro! Você pode fazer upgrade ou downgrade a qualquer momento. O ajuste é feito proporcionalmente ao período já pago.",
              },
              {
                id: 5,
                q: "O app funciona offline?",
                a: "Funcionalidades básicas funcionam offline. Quando você voltar online, tudo sincroniza automaticamente entre seus dispositivos.",
              },
              {
                id: 6,
                q: "Tem versão mobile e web?",
                a: "Sim! O Rise Up App funciona tanto na web quanto no celular (iOS e Android). Seus dados sincronizam automaticamente entre todos os dispositivos.",
              },
            ].map(({ id, q, a }) => (
              <div key={id} className="hover:translate-x-1 transition-transform duration-200">
                <button
                  onClick={() => setOpenFaq(openFaq === id ? null : id)}
                  className="w-full flex items-center justify-between py-8 text-left rounded-lg px-2 hover:bg-neutral-800/40 transition-colors duration-200"
                >
                  <span className="text-xl font-bold text-white pr-6 leading-snug">{q}</span>
                  <svg
                    className={`w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform duration-300 ${openFaq === id ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: openFaq === id ? "500px" : "0" }}
                >
                  <div className="pb-6 px-2">
                    <p className="text-neutral-400 leading-relaxed">{a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA FINAL */}
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
          }}
        />

        {/* Card central — creme claro */}
        <div
          className="relative z-10 w-full max-w-[520px] rounded-3xl p-12 shadow-2xl text-center"
          style={{ background: "#F0EDE6" }}
        >
          <h2 className="text-4xl font-black mb-8 leading-tight" style={{ color: "#0A0A0A" }}>
            Sua melhor versão
            <br />
            começa agora.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/cadastro"
              className="w-full sm:w-auto px-7 py-4 rounded-xl font-bold hover:scale-105 transition-all duration-200 text-center"
              style={{ background: "#D4AF37", color: "#000000" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#C5A028")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#D4AF37")}
            >
              Começar grátis
            </Link>
            <a
              href="#planos-app"
              className="w-full sm:w-auto px-7 py-4 rounded-xl font-bold hover:scale-105 transition-all duration-200 text-center"
              style={{ background: "#000000", color: "#FFFFFF" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#1a1a1a")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#000000")}
            >
              Ver planos
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}