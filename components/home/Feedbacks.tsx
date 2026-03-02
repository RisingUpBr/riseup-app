// components/home/Feedbacks.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface Feedback {
  id: number;
  name: string;
  avatar: string;
  role: string;
  shortQuote: string;
  fullQuote: string;
  product: "app" | "infoproduto";
}

const feedbacks: Feedback[] = [
  {
    id: 1,
    name: "Marina Costa",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
    role: "Analista de Marketing",
    shortQuote: "Consegui finalmente organizar minha rotina caótica. O app me ajudou a focar no que realmente importa.",
    fullQuote: "Eu vivia sempre correndo atrás do tempo, fazendo mil coisas ao mesmo tempo e não terminando nada direito. Depois que comecei a usar o app da Rise Up, consegui enxergar minhas prioridades de verdade. Agora eu planejo meu dia em 5 minutos de manhã e executo sem ficar travada pensando no que fazer depois. A diferença é enorme.",
    product: "app",
  },
  {
    id: 2,
    name: "Rafael Oliveira",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
    role: "Desenvolvedor",
    shortQuote: "O conteúdo é direto ao ponto. Sem enrolação, só o que funciona de verdade.",
    fullQuote: "Já tinha comprado vários cursos que prometiam produtividade mas eram 20 horas de vídeo com muita teoria e pouca prática. O infoproduto da Rise Up é completamente diferente. Em 2 semanas eu já tinha aplicado as técnicas principais e vi resultado real. É objetivo, honesto e funcional.",
    product: "infoproduto",
  },
  {
    id: 3,
    name: "Juliana Mendes",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
    role: "Empreendedora",
    shortQuote: "Não dependo mais de motivação. Finalmente tenho um sistema que funciona mesmo nos dias ruins.",
    fullQuote: "Meu maior problema era a inconsistência. Alguns dias eu rendia muito, outros eu não fazia nada porque esperava estar motivada. Com o app, eu aprendi que disciplina é sistema, não sentimento. Agora eu executo todo dia, independente de como estou me sentindo. É libertador.",
    product: "app",
  },
  {
    id: 4,
    name: "Pedro Almeida",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
    role: "Designer",
    shortQuote: "A clareza mental que eu ganhei foi inesperada. Consigo pensar melhor e tomar decisões mais rápido.",
    fullQuote: "Eu estava sempre com a cabeça cheia, pensando em 15 coisas ao mesmo tempo e tomando decisões ruins por pura ansiedade. O infoproduto me ensinou a organizar meus pensamentos antes de agir. Parece simples, mas mudou completamente minha forma de trabalhar e viver.",
    product: "infoproduto",
  },
  {
    id: 5,
    name: "Camila Rodrigues",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
    role: "Psicóloga",
    shortQuote: "Uso com meus pacientes também. É prático, simples e realmente ajuda a sair da paralisia.",
    fullQuote: "Como psicóloga, eu vejo muita gente travada por excesso de informação e falta de estrutura. O app da Rise Up é perfeito para quem precisa de algo simples e funcional. Comecei a recomendar para meus pacientes e os resultados têm sido muito bons. É uma ferramenta honesta.",
    product: "app",
  },
  {
    id: 6,
    name: "Lucas Ferreira",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces",
    role: "Estudante de Engenharia",
    shortQuote: "Consegui equilibrar faculdade, estágio e vida pessoal sem surtar. Valeu cada centavo.",
    fullQuote: "Estava no limite tentando dar conta de tudo. O infoproduto me mostrou que eu não precisava fazer mais, mas sim fazer melhor e no momento certo. Aprendi a definir prioridades de verdade e parei de me cobrar tanto. Minha produtividade aumentou e minha ansiedade diminuiu bastante.",
    product: "infoproduto",
  },
];

export default function Feedbacks() {
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Auto-scroll MAIS RÁPIDO com transição suave
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = scrollContainer.scrollLeft || 0;
    const scrollSpeed = 0.5; // Mais rápido (era 0.32)

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += scrollSpeed;
        scrollContainer.scrollLeft = scrollPosition;

        // Reset suave quando chegar ao fim
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
          scrollContainer.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  return (
    <section className="py-16 md:py-24 bg-neutral-50 dark:bg-neutral-950 transition-colors overflow-hidden">
      {/* HEADER CENTRALIZADO */}
      <div className="text-center mb-12 px-4">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="text-3xl">❤️</span>
          <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            Usado por +1.200 pessoas
          </span>
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-4 leading-tight">
          Quem usa,{" "}
          <span className="text-[#D4AF37]">transforma</span>
        </h2>
        
        <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
          Histórias reais de pessoas que saíram do caos para a clareza.
        </p>

        {/* CTA ABAIXO DO TEXTO */}
        <Link
          href="/auth"
          className="inline-flex items-center gap-2 px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold hover:scale-105 transition-transform"
        >
          Começar grátis
        </Link>
      </div>

      {/* CONTAINER COM FADE */}
      <div className="relative mt-12">
        {/* Gradient Fade à Esquerda */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-neutral-50 dark:from-neutral-950 to-transparent z-10 pointer-events-none" />
        
        {/* Gradient Fade à Direita */}
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-neutral-50 dark:from-neutral-950 to-transparent z-10 pointer-events-none" />

        {/* CARROSSEL INFINITO */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden pl-4 md:pl-6"
          style={{ 
            scrollbarWidth: "none", 
            msOverflowStyle: "none",
            scrollBehavior: "auto" // Remove scroll suave nativo
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {[...feedbacks, ...feedbacks, ...feedbacks].map((feedback, index) => (
            <div
              key={`${feedback.id}-${index}`}
              onClick={() => setSelectedFeedback(feedback)}
              className="flex-shrink-0 w-[320px] md:w-[380px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 cursor-pointer hover:border-[#D4AF37] dark:hover:border-[#D4AF37] transition-all hover:shadow-xl group"
            >
              {/* Avatar + Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-neutral-200 dark:border-neutral-700">
                  <Image
                    src={feedback.avatar}
                    alt={feedback.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-black dark:text-white">{feedback.name}</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{feedback.role}</p>
                </div>
              </div>

              {/* Quote */}
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4 line-clamp-3">
                "{feedback.shortQuote}"
              </p>

              {/* Badge + Learn More */}
              <div className="flex items-center justify-between">
                <span className="text-xs px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] font-medium">
                  {feedback.product === "app" ? "App" : "Infoproduto"}
                </span>
                <button className="text-sm text-neutral-500 dark:text-neutral-400 group-hover:text-[#D4AF37] dark:group-hover:text-[#D4AF37] transition-colors flex items-center gap-1">
                  Ver mais
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedFeedback && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedFeedback(null)}
        >
          <div
            className="bg-white dark:bg-neutral-900 rounded-3xl max-w-2xl w-full p-8 md:p-12 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedFeedback(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:scale-110 transition-transform font-bold"
            >
              ✕
            </button>

            {/* Avatar + Info */}
            <div className="flex items-center gap-4 mb-8">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#D4AF37]">
                <Image
                  src={selectedFeedback.avatar}
                  alt={selectedFeedback.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-xl text-black dark:text-white">{selectedFeedback.name}</p>
                <p className="text-neutral-600 dark:text-neutral-400">{selectedFeedback.role}</p>
              </div>
            </div>

            {/* Full Quote */}
            <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed mb-8">
              "{selectedFeedback.fullQuote}"
            </p>

            {/* Badge */}
            <div className="inline-block px-4 py-2 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] font-medium text-sm">
              {selectedFeedback.product === "app" ? "Rise Up App" : "Infoproduto Rise Up"}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}