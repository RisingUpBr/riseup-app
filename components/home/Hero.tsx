
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Hero() {
  const [focused, setFocused] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-black transition-colors py-20 md:py-0">
      {/* BACKGROUND GRADIENTE - ADAPTA AO TEMA */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-black dark:to-neutral-900" />
      
      {/* EFEITO DE GLOW SUTIL */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[600px] md:h-[900px] bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center z-10">
        {/* BADGE - ESPAÇAMENTO GENEROSO (como Base44) */}
        <Link 
          href="/app"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-600 dark:text-neutral-300 mb-12 md:mb-16 hover:border-[#D4AF37] dark:hover:border-[#D4AF37] transition-all"
        >
          <span className="text-[#D4AF37]">✨</span>
          <span className="hidden sm:inline">Transforme sua rotina em 3 minutos por dia</span>
          <span className="sm:hidden">3 minutos para transformar seu dia</span>
        </Link>

        {/* HEADLINE PRINCIPAL - ESPAÇAMENTO AUMENTADO */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white leading-[1.1] mb-6 md:mb-8 px-2">
          Clareza para pensar.
          <br />
          Estrutura para executar.
        </h1>

        {/* SUBHEADLINE - ESPAÇAMENTO AUMENTADO */}
        <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-12 md:mb-16 leading-relaxed px-4">
          Organize sua mente, planeje seu dia e construa progresso consistente. 
          Sem depender de motivação passageira.
        </p>

        {/* INPUT FIELD PRINCIPAL - ESPAÇAMENTO AUMENTADO */}
        <div className="max-w-2xl mx-auto mb-12 md:mb-16 px-4">
          <div 
            className={`relative bg-white dark:bg-neutral-900 rounded-xl md:rounded-2xl shadow-xl dark:shadow-2xl overflow-hidden transition-all duration-300 border border-neutral-200 dark:border-neutral-800 ${
              focused ? "ring-4 ring-[#D4AF37]/30" : ""
            }`}
          >
            <input
              type="email"
              placeholder="Digite seu email para começar"
              className="w-full px-5 md:px-6 py-5 md:py-6 pr-28 md:pr-36 text-black dark:text-white bg-transparent placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none text-sm md:text-base"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
            <Link
              href="/auth"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold px-5 md:px-7 py-3 md:py-3.5 rounded-lg md:rounded-xl transition-all hover:scale-105 text-sm md:text-base whitespace-nowrap"
            >
              Começar
            </Link>
          </div>
          <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-500 mt-4">
            Gratuito. Sem cartão. Cancele quando quiser.
          </p>
        </div>

        {/* "NOT SURE WHERE TO START?" - ESPAÇAMENTO AUMENTADO */}
        <div className="mt-16 md:mt-20">
          <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 mb-6 md:mb-8">
            Não sabe por onde começar? Explore:
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 px-4">
            <Link
              href="/app"
              className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-sm md:text-base text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:border-[#D4AF37] dark:hover:border-[#D4AF37] transition-all"
            >
              <span>📱</span>
              <span className="hidden sm:inline">Conhecer o App</span>
              <span className="sm:hidden">App</span>
            </Link>
            
            <Link
              href="/produtos"
              className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-sm md:text-base text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:border-[#D4AF37] dark:hover:border-[#D4AF37] transition-all"
            >
              <span>📚</span>
              <span className="hidden sm:inline">Infoprodutos</span>
              <span className="sm:hidden">Produtos</span>
            </Link>
            
            <Link
              href="/planos"
              className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-sm md:text-base text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:border-[#D4AF37] dark:hover:border-[#D4AF37] transition-all"
            >
              <span>💎</span>
              <span className="hidden sm:inline">Ver Planos</span>
              <span className="sm:hidden">Planos</span>
            </Link>
            
            <Link
              href="/como-funciona"
              className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-sm md:text-base text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:border-[#D4AF37] dark:hover:border-[#D4AF37] transition-all"
            >
              <span>⚡</span>
              <span className="hidden sm:inline">Como funciona</span>
              <span className="sm:hidden">Tutorial</span>
            </Link>
          </div>
        </div>

        {/* SOCIAL PROOF COM AVATARES REAIS DO UNSPLASH - ESPAÇAMENTO AUMENTADO */}
        <div className="mt-16 md:mt-20 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-neutral-500 dark:text-neutral-500 px-4">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex -space-x-3">
              {/* Avatar 1 - Homem */}
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-white dark:border-black overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
                  alt="Usuário"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Avatar 2 - Mulher */}
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-white dark:border-black overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
                  alt="Usuário"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Avatar 3 - Homem */}
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-white dark:border-black overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                <Image
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces"
                  alt="Usuário"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Avatar 4 - Mulher */}
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-white dark:border-black overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                <Image
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces"
                  alt="Usuário"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span className="text-center sm:text-left font-medium">
              <span className="hidden sm:inline">+1.200 pessoas transformando suas vidas</span>
              <span className="sm:hidden">+1.200 usuários ativos</span>
            </span>
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR - OCULTO NO MOBILE */}
      <div className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg 
          className="w-6 h-6 text-[#D4AF37]" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </div>
    </section>
  );
}