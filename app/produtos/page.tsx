import Link from "next/link";
import { useUserPlan } from "@/lib/useUserPlan";

export default function ProdutosPage() {
  const { isPremium } = useUserPlan();

  const desconto = isPremium ? "20%" : null;

  return (
    <main className="min-h-screen px-6 py-16 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-4">
        Produtos Rise Up
      </h1>

      <p className="text-center text-gray-600 mb-12">
        Conteúdos criados para gerar clareza, disciplina e evolução real.
        Escolha o nível que faz sentido para você agora.
      </p>

      {desconto && (
        <div className="mb-10 text-center text-green-600 font-semibold">
          🎉 Você tem {desconto} de desconto por ser Premium no App
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-4">
        {/* FREE */}
        <Card
          title="Free"
          description="Um primeiro passo para clareza e direção"
          features={[
            "Conteúdo introdutório",
            "Reflexões essenciais",
            "Acesso gratuito",
          ]}
          cta="Começar gratuitamente"
          href="/produtos/free"
        />

        {/* ESSENCIAL */}
        <Card
          title="Essencial"
          description="Para quem decidiu sair da estagnação"
          features={[
            "Mentalidade correta",
            "Disciplina prática",
            "Base sólida de crescimento",
          ]}
          highlight
          cta="Ver detalhes"
          href="/produtos/essencial"
        />

        {/* AVANÇADO */}
        <Card
          title="Avançado"
          description="Para quem busca controle e consistência"
          features={[
            "Controle emocional",
            "Execução consciente",
            "Evolução contínua",
          ]}
          cta="Ver detalhes"
          href="/produtos/avancado"
        />

        {/* ELITE */}
        <Card
          title="Elite"
          description="Para quem decidiu viver no máximo do potencial"
          features={[
            "Visão de longo prazo",
            "Alta performance pessoal",
            "Mentalidade inabalável",
          ]}
          cta="Ver detalhes"
          href="/produtos/elite"
        />
      </div>
    </main>
  );
}

function Card({
  title,
  description,
  features,
  cta,
  href,
  highlight = false,
}: {
  title: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`border rounded-xl p-6 flex flex-col justify-between transition ${
        highlight
          ? "border-black shadow-lg scale-[1.02]"
          : "border-gray-300"
      }`}
    >
      <div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>

        <ul className="text-sm space-y-2 mb-6">
          {features.map((f) => (
            <li key={f}>• {f}</li>
          ))}
        </ul>
      </div>

      <Link
        href={href}
        className="mt-auto text-center rounded bg-black text-white py-2 hover:opacity-90"
      >
        {cta}
      </Link>
    </div>
  );
}
