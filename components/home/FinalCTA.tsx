// components/home/FinalCTA.tsx
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="bg-black py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">

        {/* Headline */}
        <h2 className="text-3xl md:text-5xl font-semibold text-white leading-tight">
          Comece com clareza.
          <br />
          Evolua com estrutura.
        </h2>

        {/* Subheadline */}
        <p className="mt-6 text-base md:text-lg text-[#B3B3B3] max-w-2xl mx-auto leading-relaxed">
          Crie uma base sólida para sua mente, hábitos e decisões.
          Sem exagero. Sem atalhos. Sem promessas vazias.
        </p>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center">
          <Link
            href="/dashboard"
            className="px-10 py-4 rounded-full bg-[#D4AF37] text-black font-medium text-sm tracking-wide hover:opacity-90 transition"
          >
            Criar conta gratuita
          </Link>

          <span className="mt-4 text-xs text-[#777]">
            Acesso gratuito. Sem cartão. Cancelamento a qualquer momento.
          </span>
        </div>
      </div>
    </section>
  );
}
