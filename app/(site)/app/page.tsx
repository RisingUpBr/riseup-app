"use client";

import Link from "next/link";
import { useState } from "react";

export default function AppPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO CURTO */}
      <section className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-16 bg-gradient-to-b from-black via-neutral-900 to-black">
        {/* Background decorativo */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37] opacity-5 rounded-full blur-3xl"></div>

        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full">
              <svg className="w-4 h-4 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-[#D4AF37] text-sm font-semibold uppercase tracking-wider">Rise Up App</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Organize sua vida
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#C5A028]">
                com inteligência
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-neutral-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Transforme anotações, metas e rotinas em um sistema claro, conectado e funcional.
            </p>

            {/* Scroll indicator */}
            <div className="flex flex-col items-center gap-2 text-neutral-500">
              <span className="text-sm">Escolha seu plano abaixo</span>
              <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* PLANOS DE ASSINATURA */}
      <section id="planos" className="py-20 px-4 sm:px-6 lg:px-16 bg-neutral-950">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* PLANO FREE */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-8 h-full flex flex-col group-hover:border-green-500/50 transition-all duration-300">
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

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Acesso básico</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>20 notas</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>5 metas</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Funcionalidades limitadas</span>
                  </li>
                </ul>

                {/* CTA */}
                <Link
                  href="/cadastro"
                  className="w-full py-4 bg-green-500 hover:bg-green-600 text-black font-bold rounded-xl transition-all duration-300 hover:scale-105 text-center"
                >
                  Começar grátis
                </Link>
              </div>
            </div>

            {/* PLANO QUINZENAL */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-8 h-full flex flex-col group-hover:border-blue-500/50 transition-all duration-300">
                {/* Badge Trial */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-xs font-bold uppercase tracking-wider">
                    Teste 15 dias
                  </span>
                </div>

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

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Tudo ilimitado</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>IA completa</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Sem fidelidade</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Cancele quando quiser</span>
                  </li>
                </ul>

                {/* CTA */}
                <Link
                  href="/cadastro?plan=quinzenal"
                  className="w-full py-4 bg-white hover:bg-neutral-100 text-black font-bold rounded-xl transition-all duration-300 hover:scale-105 text-center"
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
                  <span className="text-neutral-400 text-sm ml-2">/mês</span>
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
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-8 h-full flex flex-col group-hover:border-purple-500/50 transition-all duration-300">
                {/* Nome */}
                <h3 className="text-2xl font-bold mb-2 text-purple-400">Anual</h3>
                
                {/* Preço */}
                <div className="mb-2">
                  <span className="text-5xl font-bold text-white">R$ 244</span>
                  <span className="text-neutral-400 text-sm ml-2">/ano</span>
                </div>

                {/* Economia dentro do card */}
                <div className="mb-2">
                  <span className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-xs font-bold">
                    Economize 30%
                  </span>
                </div>

                {/* Preço equivalente mensal */}
                <p className="text-neutral-500 text-sm mb-4">
                  ~R$ 20,33/mês
                </p>

                {/* Descrição */}
                <p className="text-neutral-400 mb-6 text-sm">
                  Melhor investimento de longo prazo
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Economia de 30%</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Tudo ilimitado</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Prioridade</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Melhor investimento</span>
                  </li>
                </ul>

                {/* CTA */}
                <Link
                  href="/cadastro?plan=anual"
                  className="w-full py-4 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 text-center"
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
            <h2 className="text-sm uppercase tracking-wider text-[#D4AF37] mb-4 font-semibold">
              Funcionalidades
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold mb-6">
              Um sistema que pensa com você
            </h3>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Informação sem organização vira frustração. O Rise Up App transforma 
              suas ideias em ação, constância e resultado.
            </p>
          </div>

          {/* Grid de Funcionalidades */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-8 hover:border-[#D4AF37]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-3">Anotações inteligentes</h4>
              <p className="text-neutral-400">
                Capture ideias e organize pensamentos de forma visual e conectada
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-8 hover:border-[#D4AF37]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-3">Organização em árvore</h4>
              <p className="text-neutral-400">
                Estruture suas notas em hierarquias visuais como o Miro
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-8 hover:border-[#D4AF37]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-3">Metas e tarefas conectadas</h4>
              <p className="text-neutral-400">
                Vincule objetivos, tarefas e rotinas em um único sistema
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-8 hover:border-[#D4AF37]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-3">Alertas e timers personalizados</h4>
              <p className="text-neutral-400">
                Gerencie tempo com timers de horas, dias, meses e anos
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-8 hover:border-[#D4AF37]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-3">Check-ins diários simples</h4>
              <p className="text-neutral-400">
                Acompanhe humor, rotina e energia todos os dias
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-8 hover:border-[#D4AF37]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-3">Relatórios de progresso</h4>
              <p className="text-neutral-400">
                Visualize sua evolução com relatórios semanais e mensais
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMO USAR */}
      <section className="py-20 px-4 sm:px-6 lg:px-16 bg-neutral-950">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-wider text-[#D4AF37] mb-4 font-semibold">
              Como funciona
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold mb-6">
              Simples, intuitivo e eficiente
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Passo 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#D4AF37]">
                <span className="text-2xl font-bold text-[#D4AF37]">1</span>
              </div>
              <h4 className="text-xl font-bold mb-3">Registre</h4>
              <p className="text-neutral-400">
                Anote ideias, metas e tarefas de forma rápida
              </p>
            </div>

            {/* Passo 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#D4AF37]">
                <span className="text-2xl font-bold text-[#D4AF37]">2</span>
              </div>
              <h4 className="text-xl font-bold mb-3">Organize</h4>
              <p className="text-neutral-400">
                Estruture tudo de forma visual e conectada
              </p>
            </div>

            {/* Passo 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#D4AF37]">
                <span className="text-2xl font-bold text-[#D4AF37]">3</span>
              </div>
              <h4 className="text-xl font-bold mb-3">Ajuste</h4>
              <p className="text-neutral-400">
                Adapte sua rotina com clareza e propósito
              </p>
            </div>

            {/* Passo 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#D4AF37]">
                <span className="text-2xl font-bold text-[#D4AF37]">4</span>
              </div>
              <h4 className="text-xl font-bold mb-3">Evolua</h4>
              <p className="text-neutral-400">
                Acompanhe seu progresso e resultados
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ DO APP */}
      <section className="py-20 px-4 sm:px-6 lg:px-16 bg-black">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D4AF37]/10 rounded-full mb-4">
              <svg className="w-8 h-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-4">
            {/* Q1 */}
            <div className="bg-neutral-900 border border-[#D4AF37] rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-800/50 transition-colors"
              >
                <h3 className="font-semibold text-lg pr-4">
                  Posso cancelar quando quiser?
                </h3>
                <svg 
                  className={`w-5 h-5 text-[#D4AF37] flex-shrink-0 transition-transform duration-300 ${openFaq === 1 ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 1 && (
                <div className="px-6 pb-6 border-t border-neutral-800">
                  <p className="text-neutral-400 leading-relaxed pt-4">
                    Sim! Você pode cancelar sua assinatura a qualquer momento, sem burocracia. 
                    Seu acesso continua até o fim do período já pago.
                  </p>
                </div>
              )}
            </div>

            {/* Q2 */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-800/50 transition-colors"
              >
                <h3 className="font-semibold text-lg pr-4">
                  Como funciona o período de teste?
                </h3>
                <svg 
                  className={`w-5 h-5 text-[#D4AF37] flex-shrink-0 transition-transform duration-300 ${openFaq === 2 ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 2 && (
                <div className="px-6 pb-6 border-t border-neutral-800">
                  <p className="text-neutral-400 leading-relaxed pt-4">
                    O plano de 15 dias te dá acesso completo por R$ 19. Se gostar, 
                    pode migrar para mensal ou anual. Se não, simplesmente não renova.
                  </p>
                </div>
              )}
            </div>

            {/* Q3 */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-800/50 transition-colors"
              >
                <h3 className="font-semibold text-lg pr-4">
                  Meus dados ficam salvos se eu cancelar?
                </h3>
                <svg 
                  className={`w-5 h-5 text-[#D4AF37] flex-shrink-0 transition-transform duration-300 ${openFaq === 3 ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 3 && (
                <div className="px-6 pb-6 border-t border-neutral-800">
                  <p className="text-neutral-400 leading-relaxed pt-4">
                    Sim. Seus dados ficam salvos por 90 dias após o cancelamento. 
                    Se voltar nesse período, tudo estará lá esperando por você.
                  </p>
                </div>
              )}
            </div>

            {/* Q4 */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-800/50 transition-colors"
              >
                <h3 className="font-semibold text-lg pr-4">
                  Posso mudar de plano depois?
                </h3>
                <svg 
                  className={`w-5 h-5 text-[#D4AF37] flex-shrink-0 transition-transform duration-300 ${openFaq === 4 ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 4 && (
                <div className="px-6 pb-6 border-t border-neutral-800">
                  <p className="text-neutral-400 leading-relaxed pt-4">
                    Claro! Você pode fazer upgrade ou downgrade a qualquer momento. 
                    O ajuste é feito proporcionalmente ao período já pago.
                  </p>
                </div>
              )}
            </div>

            {/* Q5 */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === 5 ? null : 5)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-800/50 transition-colors"
              >
                <h3 className="font-semibold text-lg pr-4">
                  O app funciona offline?
                </h3>
                <svg 
                  className={`w-5 h-5 text-[#D4AF37] flex-shrink-0 transition-transform duration-300 ${openFaq === 5 ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 5 && (
                <div className="px-6 pb-6 border-t border-neutral-800">
                  <p className="text-neutral-400 leading-relaxed pt-4">
                    Funcionalidades básicas funcionam offline. Quando você voltar online, 
                    tudo sincroniza automaticamente entre seus dispositivos.
                  </p>
                </div>
              )}
            </div>

            {/* Q6 */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === 6 ? null : 6)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-800/50 transition-colors"
              >
                <h3 className="font-semibold text-lg pr-4">
                  Tem versão mobile e web?
                </h3>
                <svg 
                  className={`w-5 h-5 text-[#D4AF37] flex-shrink-0 transition-transform duration-300 ${openFaq === 6 ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 6 && (
                <div className="px-6 pb-6 border-t border-neutral-800">
                  <p className="text-neutral-400 leading-relaxed pt-4">
                    Sim! O Rise Up App funciona tanto na web quanto no celular (iOS e Android). 
                    Seus dados sincronizam automaticamente entre todos os dispositivos.
                  </p>
                </div>
              )}
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

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6">
            Comece com clareza.
            <br />
            Evolua com consistência.
          </h2>
          
          <p className="text-xl text-black/80 mb-10 max-w-2xl mx-auto">
            Pare de viver no automático. Organize sua mente, suas metas e sua rotina 
            em um único lugar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/cadastro"
              className="w-full sm:w-auto px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-neutral-900 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Começar grátis
            </Link>
            
            <a
              href="#planos"
              className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-xl font-semibold hover:bg-neutral-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Ver planos
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}