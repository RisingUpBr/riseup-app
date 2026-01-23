"use client";

import Link from "next/link";
import { useUserPlan } from "@/lib/useUserPlan";

export default function ProdutosClient() {
  const { isPremium } = useUserPlan();
  const desconto = isPremium ? "20%" : null;

  return (
    <main className="min-h-screen px-6 py-16 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-4">
        Produtos Rise Up
      </h1>

      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        Não são atalhos.  
        São estruturas para quem decidiu parar de viver no automático
        e começar a agir com clareza, disciplina e consciência.
      </p>

      {desconto && (
        <div className="mb-10 text-center text-green-600 font-semibold">
          🎉 Você tem {desconto} de desconto por já ser Premium no App
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-4">
        <Card
          title="Free"
          description="Um primeiro passo para sair do automático"
          features={[
            "Conteúdo introdutório",
            "Reflexões essenciais",
            "Acesso gratuito",
          ]}
          cta="Começar gratuitamente"
          href="/produtos/free"
        />

        <Card
          title="Básico"
          description="Para quem percebeu que algo precisa mudar"
          features={[
            "Clareza mental",
            "Organização interna",
            "Direção mínima para a vida",
          ]}
          cta="Entender se faz sentido"
          href="/produtos/basico"
        />

        <Card
          title="Essencial"
          description="Para quem cansou de começar e nunca continuar"
          highlight
          features={[
            "Consistência prática",
            "Disciplina aplicada",
            "Estrutura para a vida real",
          ]}
          cta="Ver se é para mim"
          href="/produtos/essencial"
        />

        <Card
          title="Avançado"
          description="Para quem quer viver com domínio e consciência"
          features={[
            "Controle emocional",
            "Visão de longo prazo",
            "Execução consciente",
          ]}
          cta="Conhecer o caminho"
          href="/produtos/avancado"
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
