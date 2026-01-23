// components/home/Hero.tsx
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-black pt-36 pb-32 overflow-hidden">
      {/* Background sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-90" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">

        {/* Eyebrow */}
        <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-6">
          Plataforma de crescimento pessoal
        </p>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-semibold text-white tracking-tight leading-tight">
          Clareza para a mente.
          <br />
          Estrutura para agir.
        </h1>

        {/* Subheadline */}
        <p className="mt-8 text-base md:text-lg text-[#B3B3B3] max-w-2xl mx-auto leading-relaxed">
          A Rise Up combina app e conteúdos práticos para ajudar você
          a sair da confusão mental e construir progresso real,
          dia após dia.
        </p>

        {/* CTAs */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/dashboard"
            className="px-8 py-4 rounded-full bg-[#D4AF37] text-black font-medium text-sm tracking-wide hover:opacity-90 transition"
          >
            Começar gratuitamente
          </Link>

          <Link
            href="#benefits"
            className="text-sm text-[#B3B3B3] hover:text-white transition"
          >
            Conhecer a plataforma
          </Link>
        </div>
      </div>
    </section>
  );
}