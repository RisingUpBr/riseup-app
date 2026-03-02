"use client";

import Link from "next/link";
import { useState } from "react";

export default function PlanosPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Função para detectar idioma e redirecionar
  const handleCheckout = (plan: string) => {
    // Detecta o idioma do navegador
    const userLang = navigator.language.toLowerCase();
    
    // URLs da Kiwify (PT-BR)
    const kiwifyUrls: { [key: string]: string } = {
      essencial: "https://pay.kiwify.com.br/riseup-essencial",
      avancado: "https://pay.kiwify.com.br/riseup-avancado",
      completo: "https://pay.kiwify.com.br/riseup-completo"
    };

    // URLs do Lemon Squeezy (EN/ES)
    const lemonUrls: { [key: string]: string } = {
      essencial: "https://riseup.lemonsqueezy.com/checkout/buy/essential",
      avancado: "https://riseup.lemonsqueezy.com/checkout/buy/advanced",
      completo: "https://riseup.lemonsqueezy.com/checkout/buy/complete"
    };

    // Verifica se é PT-BR
    if (userLang.startsWith('pt')) {
      window.location.href = kiwifyUrls[plan];
    } else {
      // EN ou ES vai para Lemon Squeezy
      window.location.href = lemonUrls[plan];
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO - CHAMADA */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-16 bg-gradient-to-b from-black via-neutral-900 to-black">
        {/* Background decorativo */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D4AF37] opacity-5 rounded-full blur-3xl"></div>

        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full">
              <svg className="w-4 h-4 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span className="text-[#D4AF37] text-sm font-semibold uppercase tracking-wider">Planos de Infoprodutos</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Escolha o plano certo para evoluir sua vida
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-neutral-300 mb-8 leading-relaxed">
              Um ecossistema completo de conteúdo + sistemas + tecnologia para organizar 
              sua rotina, fortalecer sua mentalidade e transformar intenção em ação.
            </p>

            {/* Microbenefícios */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-neutral-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Acesso imediato</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Sem letras miúdas</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Cancele quando quiser</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OS 4 PLANOS */}
      <section className="py-20 px-4 sm:px-6 lg:px-16 bg-neutral-950">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* PLANO FREE */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-8 h-full flex flex-col group-hover:border-green-500/50 transition-all duration-300">
                {/* Badge FREE */}
                <div className="mb-6">
                  <span className="inline-block px-4 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-xs font-bold uppercase tracking-wider">
                    Grátis
                  </span>
                </div>

                {/* Nome e Preço */}
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">R$ 0</span>
                </div>

                {/* Descrição */}
                <p className="text-neutral-400 mb-6">
                  Experimente primeiro com recursos essenciais
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Recursos gratuitos selecionados</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>1 Guia básico em PDF</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Acesso à comunidade</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Newsletters semanais</span>
                  </li>
                </ul>

                {/* CTA */}
                <Link
                  href="/recursos"
                  className="w-full py-4 bg-green-500 hover:bg-green-600 text-black font-bold rounded-xl transition-all duration-300 hover:scale-105 text-center"
                >
                  Começar grátis
                </Link>
              </div>
            </div>

            {/* PLANO ESSENCIAL */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-neutral-600 to-neutral-700 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-8 h-full flex flex-col group-hover:border-neutral-600/50 transition-all duration-300">
                {/* Nome e Preço */}
                <h3 className="text-2xl font-bold mb-2">Essencial</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-white">R$ <span className="text-[#D4AF37]">97</span></span>
                </div>
                <p className="text-neutral-500 text-sm mb-4">Pagamento único</p>

                {/* Descrição */}
                <p className="text-neutral-400 mb-6">
                  Fundamentos para começar com clareza e estrutura
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>2 Ebooks principais</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>1 Planner completo</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>3 Guias em PDF</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Templates práticos</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Acesso vitalício</span>
                  </li>
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handleCheckout('essencial')}
                  className="w-full py-4 bg-white hover:bg-neutral-100 text-black font-bold rounded-xl transition-all duration-300 hover:scale-105 text-center"
                >
                  Começar agora
                </button>
              </div>
            </div>

            {/* PLANO AVANÇADO - MAIS VENDIDO */}
            <div className="group relative lg:scale-105 lg:-my-6">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] rounded-2xl opacity-30 blur transition-all duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-neutral-900 to-black border-2 border-[#D4AF37] rounded-2xl p-8 h-full flex flex-col">
                {/* Badge MAIS VENDIDO */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-6 py-2 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider rounded-full shadow-xl">
                    Mais Vendido
                  </span>
                </div>

                {/* Nome e Preço */}
                <h3 className="text-2xl font-bold mb-2 mt-4">Avançado</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-[#D4AF37]">R$ 197</span>
                </div>
                <p className="text-neutral-500 text-sm mb-4">Pagamento único</p>

                {/* Descrição */}
                <p className="text-neutral-300 mb-6">
                  Tudo do Essencial + conteúdo avançado
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start gap-3 text-sm text-neutral-200">
                    <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-semibold">Tudo do Essencial</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-200">
                    <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>3 Treinamentos avançados</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-200">
                    <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>2 Mapas mentais exclusivos</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-200">
                    <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Acesso a desafios práticos</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-200">
                    <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Comunidade privada</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-200">
                    <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Acesso vitalício</span>
                  </li>
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handleCheckout('avancado')}
                  className="w-full py-4 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-bold rounded-xl transition-all duration-300 hover:scale-105 text-center shadow-xl shadow-[#D4AF37]/20"
                >
                  Evoluir agora
                </button>
              </div>
            </div>

            {/* PLANO COMPLETO */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-8 h-full flex flex-col group-hover:border-[#D4AF37]/50 transition-all duration-300">
                {/* Nome e Preço */}
                <h3 className="text-2xl font-bold mb-2">Completo</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-white">R$ <span className="text-[#D4AF37]">397</span></span>
                </div>
                <p className="text-neutral-500 text-sm mb-4">Pagamento único</p>

                {/* Descrição */}
                <p className="text-neutral-400 mb-6">
                  Pacote completo com acesso vitalício a tudo
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-semibold">Tudo do Avançado</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Módulo exclusivo (4 PDFs)</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Acesso vitalício garantido</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Bônus especiais</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Suporte prioritário</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Benefícios no App Rise Up</span>
                  </li>
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handleCheckout('completo')}
                  className="w-full py-4 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-bold rounded-xl transition-all duration-300 hover:scale-105 text-center"
                >
                  Acesso total
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEEDBACKS DINÂMICOS */}
      <section className="py-20 px-4 sm:px-6 lg:px-16 bg-black">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Feedback 1 - 4 estrelas */}
            <div className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(4)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <svg className="w-4 h-4 text-neutral-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="text-neutral-300 italic mb-4">
                "Os materiais são bons, mas senti falta de mais exemplos práticos em alguns guias. No geral, valeu a pena."
              </p>
              <div className="flex items-center gap-3">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos&backgroundColor=d4af37" 
                  alt="Carlos Mendes"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-sm">Carlos Mendes</p>
                  <p className="text-neutral-500 text-xs">Estudante</p>
                </div>
              </div>
            </div>

            {/* Feedback 2 - 4.5 estrelas */}
            <div className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(4)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <div className="relative w-4 h-4">
                  <svg className="absolute inset-0 w-4 h-4 text-neutral-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="absolute inset-0 w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20" style={{ clipPath: 'inset(0 50% 0 0)' }}>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <p className="text-neutral-300 italic mb-4">
                "Conteúdo direto e bem estruturado. Tiraria meia estrela apenas pela falta de vídeos explicativos, mas os PDFs compensam bem."
              </p>
              <div className="flex items-center gap-3">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Julia&backgroundColor=d4af37" 
                  alt="Júlia Santos"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-sm">Júlia Santos</p>
                  <p className="text-neutral-500 text-xs">Analista de Marketing</p>
                </div>
              </div>
            </div>

            {/* Feedback 3 - 5 estrelas */}
            <div className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-neutral-300 italic mb-4">
                "Exatamente o que eu precisava. Sistema claro, sem enrolação. Finalmente consegui organizar minha rotina de verdade."
              </p>
              <div className="flex items-center gap-3">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rafael&backgroundColor=d4af37" 
                  alt="Rafael Costa"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-sm">Rafael Costa</p>
                  <p className="text-neutral-500 text-xs">Empreendedor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARAÇÃO DE PLANOS */}
      <section className="py-20 px-4 sm:px-6 lg:px-16 bg-neutral-950">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Compare os planos
            </h2>
            <p className="text-neutral-400 text-lg">
              Escolha o que faz sentido para o seu momento
            </p>
          </div>

          {/* Tabela */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="text-left py-4 px-6 text-neutral-400 font-semibold">Recurso</th>
                  <th className="text-center py-4 px-6">
                    <Link href="/recursos" className="font-bold hover:text-[#D4AF37] transition-colors">
                      Free
                    </Link>
                  </th>
                  <th className="text-center py-4 px-6">
                    <button onClick={() => handleCheckout('essencial')} className="font-bold hover:text-[#D4AF37] transition-colors">
                      Essencial
                    </button>
                  </th>
                  <th className="text-center py-4 px-6">
                    <button onClick={() => handleCheckout('avancado')} className="font-bold text-[#D4AF37] hover:text-[#C5A028] transition-colors">
                      Avançado
                    </button>
                  </th>
                  <th className="text-center py-4 px-6">
                    <button onClick={() => handleCheckout('completo')} className="font-bold hover:text-[#D4AF37] transition-colors">
                      Completo
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-800 hover:bg-neutral-900/50 transition-colors">
                  <td className="py-4 px-6 text-neutral-300">Ebooks principais</td>
                  <td className="text-center py-4 px-6 text-neutral-500">—</td>
                  <td className="text-center py-4 px-6">2</td>
                  <td className="text-center py-4 px-6 text-[#D4AF37]">2</td>
                  <td className="text-center py-4 px-6">2</td>
                </tr>
                <tr className="border-b border-neutral-800 hover:bg-neutral-900/50 transition-colors">
                  <td className="py-4 px-6 text-neutral-300">Guias em PDF</td>
                  <td className="text-center py-4 px-6">1</td>
                  <td className="text-center py-4 px-6">3</td>
                  <td className="text-center py-4 px-6 text-[#D4AF37]">3</td>
                  <td className="text-center py-4 px-6">7</td>
                </tr>
                <tr className="border-b border-neutral-800 hover:bg-neutral-900/50 transition-colors">
                  <td className="py-4 px-6 text-neutral-300">Método Rise Up (módulos)</td>
                  <td className="text-center py-4 px-6 text-neutral-500">—</td>
                  <td className="text-center py-4 px-6">1</td>
                  <td className="text-center py-4 px-6 text-[#D4AF37]">2</td>
                  <td className="text-center py-4 px-6">4</td>
                </tr>
                <tr className="border-b border-neutral-800 hover:bg-neutral-900/50 transition-colors">
                  <td className="py-4 px-6 text-neutral-300">Treinamentos avançados</td>
                  <td className="text-center py-4 px-6 text-neutral-500">—</td>
                  <td className="text-center py-4 px-6 text-neutral-500">—</td>
                  <td className="text-center py-4 px-6 text-[#D4AF37]">3</td>
                  <td className="text-center py-4 px-6">3</td>
                </tr>
                <tr className="border-b border-neutral-800 hover:bg-neutral-900/50 transition-colors">
                  <td className="py-4 px-6 text-neutral-300">Mapas mentais</td>
                  <td className="text-center py-4 px-6 text-neutral-500">—</td>
                  <td className="text-center py-4 px-6 text-neutral-500">—</td>
                  <td className="text-center py-4 px-6 text-[#D4AF37]">2</td>
                  <td className="text-center py-4 px-6">2</td>
                </tr>
                <tr className="border-b border-neutral-800 hover:bg-neutral-900/50 transition-colors">
                  <td className="py-4 px-6 text-neutral-300">Desafios (PDFs)</td>
                  <td className="text-center py-4 px-6 text-neutral-500">—</td>
                  <td className="text-center py-4 px-6 text-neutral-500">—</td>
                  <td className="text-center py-4 px-6 text-[#D4AF37]">2</td>
                  <td className="text-center py-4 px-6">2</td>
                </tr>
                <tr className="border-b border-neutral-800 hover:bg-neutral-900/50 transition-colors">
                  <td className="py-4 px-6 text-neutral-300">Ebooks exclusivos</td>
                  <td className="text-center py-4 px-6 text-neutral-500">—</td>
                  <td className="text-center py-4 px-6 text-neutral-500">—</td>
                  <td className="text-center py-4 px-6 text-neutral-500">—</td>
                  <td className="text-center py-4 px-6">3</td>
                </tr>
                <tr className="border-b border-neutral-800 hover:bg-neutral-900/50 transition-colors">
                  <td className="py-4 px-6 text-neutral-300">Acesso vitalício</td>
                  <td className="text-center py-4 px-6">
                    <svg className="w-5 h-5 mx-auto text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                  <td className="text-center py-4 px-6">
                    <svg className="w-5 h-5 mx-auto text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                  <td className="text-center py-4 px-6">
                    <svg className="w-5 h-5 mx-auto text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                  <td className="text-center py-4 px-6">
                    <svg className="w-5 h-5 mx-auto text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                </tr>
                <tr className="border-b border-neutral-800 hover:bg-neutral-900/50 transition-colors">
                  <td className="py-4 px-6 text-neutral-300">Benefícios no App</td>
                  <td className="text-center py-4 px-6 text-neutral-500">—</td>
                  <td className="text-center py-4 px-6 text-neutral-500">—</td>
                  <td className="text-center py-4 px-6 text-neutral-500">—</td>
                  <td className="text-center py-4 px-6">
                    <svg className="w-5 h-5 mx-auto text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-center text-neutral-500 text-sm mt-8">
            Você pode mudar de plano a qualquer momento.
          </p>
        </div>
      </section>

      {/* PREVIEW DO APP */}
      <section className="py-20 px-4 sm:px-6 lg:px-16 bg-black">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Quer mais? Conheça o App Rise Up
            </h2>
            <p className="text-neutral-400 text-lg">
              Transforme conteúdo em ação com tecnologia inteligente
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* App Free */}
            <div className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-2xl p-8">
              <div className="mb-6">
                <span className="inline-block px-4 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-xs font-bold uppercase tracking-wider">
                  Grátis
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-4">App Rise Up Free</h3>
              
              <p className="text-neutral-400 mb-6">
                Experimente gratuitamente as funcionalidades básicas de organização
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm text-neutral-300">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Anotações simples</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-neutral-300">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Tarefas básicas</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-neutral-300">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Calendário simples</span>
                </li>
              </ul>

              <Link
                href="/app#download"
                className="block w-full py-4 bg-green-500 hover:bg-green-600 text-black font-bold rounded-xl transition-all duration-300 text-center"
              >
                Começar grátis
              </Link>
            </div>

            {/* App Premium */}
            <div className="bg-gradient-to-br from-neutral-900 to-black border-2 border-[#D4AF37] rounded-2xl p-8">
              <div className="mb-6">
                <span className="inline-block px-4 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                  Premium
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-4">App Rise Up Premium</h3>
              
              <p className="text-neutral-400 mb-6">
                Acesso completo às funcionalidades avançadas de organização e IA
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm text-neutral-300">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Anotações ramificadas ilimitadas</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-neutral-300">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Flashcards com IA</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-neutral-300">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Blocos de tempo avançados</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-neutral-300">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Relatórios de progresso</span>
                </li>
              </ul>

              <Link
                href="/app"
                className="block w-full py-4 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-bold rounded-xl transition-all duration-300 text-center"
              >
                Saiba mais
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ DOS PLANOS */}
      <section className="py-20 px-4 sm:px-6 lg:px-16 bg-neutral-950">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D4AF37]/10 rounded-full mb-4">
              <svg className="w-8 h-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-neutral-400">
              Dúvidas comuns sobre o app e os infoprodutos. Se não encontrar sua resposta aqui, fale com a gente.
            </p>
          </div>

          <div className="space-y-4">
            {/* Q1 */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-800/50 transition-colors"
              >
                <h3 className="font-semibold text-lg pr-4">
                  Os infoprodutos têm acesso vitalício ou é mensalidade?
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
                <div className="px-6 pb-6">
                  <p className="text-neutral-400 leading-relaxed">
                    Acesso vitalício. Você compra uma vez e tem acesso para sempre ao conteúdo. Sem mensalidades, sem renovações. O material é seu permanentemente, incluindo todas as atualizações futuras que fizermos.
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
                  Qual a diferença entre o app e os infoprodutos?
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
                <div className="px-6 pb-6">
                  <p className="text-neutral-400 leading-relaxed">
                    Os <span className="text-white font-semibold">infoprodutos</span> são materiais de conteúdo (ebooks, guias, planners, treinamentos) com acesso vitalício. O <span className="text-white font-semibold">App</span> é uma ferramenta tecnológica para organizar sua rotina, anotações e metas em tempo real, com assinatura mensal ou anual. Eles se complementam: o conteúdo te ensina, o app te ajuda a aplicar.
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
                  Os conteúdos são atualizados?
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
                <div className="px-6 pb-6">
                  <p className="text-neutral-400 leading-relaxed">
                    Sim. A Rise Up evolui constantemente. Quando houver melhorias, novos materiais ou atualizações relacionadas ao seu plano, você terá acesso automaticamente. Sem custo adicional.
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
                  O App está incluso nos planos de infoprodutos?
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
                <div className="px-6 pb-6">
                  <p className="text-neutral-400 leading-relaxed">
                    Os infoprodutos e o App são produtos separados. No entanto, o plano <span className="text-[#D4AF37] font-semibold">Completo</span> inclui benefícios especiais relacionados ao App Rise Up. Os detalhes ficam claros na página de checkout antes da compra.
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
                  Qual plano devo escolher?
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
                <div className="px-6 pb-6">
                  <p className="text-neutral-400 leading-relaxed">
                    Se estiver em dúvida, comece pelo <span className="text-[#D4AF37] font-semibold">Avançado</span> — ele entrega o melhor equilíbrio entre profundidade e valor. Se quiser experimentar primeiro, comece pelo <span className="text-green-400 font-semibold">Free</span> e evolua quando se sentir pronto. Se busca o máximo de conteúdo e benefícios, vá direto para o <span className="text-[#D4AF37] font-semibold">Completo</span>.
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
            Comece hoje a organizar sua vida
          </h2>
          
          <p className="text-xl text-black/80 mb-10 max-w-2xl mx-auto">
            Escolha seu plano e dê o próximo passo com clareza, disciplina e propósito.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#planos"
              className="w-full sm:w-auto px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-neutral-900 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Ver planos novamente
            </a>
            
            <button
              onClick={() => handleCheckout('avancado')}
              className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-xl font-semibold hover:bg-neutral-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Começar agora
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}