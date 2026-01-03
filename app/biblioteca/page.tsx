import Link from "next/link";
import { useUserPlan } from "@/lib/useUserPlan";

export default function BibliotecaPage() {
  const { isPremium } = useUserPlan();

  return (
    <main className="min-h-screen px-6 py-16 max-w-6xl mx-auto">
      {/* HEADER */}
      <header className="mb-14 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Biblioteca Rise Up
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Um espaço para desenvolver clareza, disciplina
          e crescimento contínuo.
        </p>
      </header>

      {/* CONTEÚDOS GRATUITOS */}
      <Section
        title="Conteúdos Gratuitos"
        description="Para começar com consciência e direção."
      >
        <Grid>
          <Card
            title="Um começo consciente"
            description="Clareza antes da mudança."
            cta="Acessar"
            href="/conteudos/free"
            variant="free"
          />

          <Card
            title="Mentalidade e Identidade"
            description="O que muda quando você muda o jeito de pensar."
            cta="Acessar"
            href="/conteudos/mentalidade"
            variant="free"
          />
        </Grid>
      </Section>

      {/* CONTEÚDOS AVANÇADOS */}
      <Section
        title="Conteúdos Avançados"
        description="Para quem decidiu ir além do básico."
      >
        <Grid>
          <Card
            title="Básico"
            description="Consciência, organização mental e direção."
            cta="Ver detalhes"
            href="/produtos/basico"
          />

          <Card
            title="Essencial"
            description="Estrutura mental, disciplina e constância."
            cta="Ver detalhes"
            href="/produtos/essencial"
            highlight
          />

          <Card
            title="Pro"
            description="Domínio emocional e clareza interna."
            cta="Ver detalhes"
            href="/produtos/pro"
          />

          <Card
            title="Elite"
            description="Visão de longo prazo e domínio interno."
            cta="Ver detalhes"
            href="/produtos/elite"
          />
        </Grid>
      </Section>

      {/* CTA PREMIUM APP */}
      {!isPremium && (
        <section className="mt-20 text-center border rounded-xl p-8 bg-gray-50">
          <h2 className="text-2xl font-semibold mb-2">
            Premium do App Rise Up
          </h2>

          <p className="text-gray-600 mb-6">
            Usuários Premium do App têm descontos exclusivos
            nos infoprodutos e acesso antecipado a conteúdos.
          </p>

          <Link
            href="/planos"
            className="inline-block bg-black text-white px-6 py-3 rounded hover:opacity-90"
          >
            Ver planos do App
          </Link>
        </section>
      )}
    </main>
  );
}

/* COMPONENTES AUXILIARES */

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-1">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      {children}
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
      {children}
    </div>
  );
}

function Card({
  title,
  description,
  cta,
  href,
  variant = "paid",
  highlight = false,
}: {
  title: string;
  description: string;
  cta: string;
  href: string;
  variant?: "free" | "paid";
  highlight?: boolean;
}) {
  return (
    <div
      className={`border rounded-xl p-6 flex flex-col justify-between ${
        highlight
          ? "border-black shadow-lg"
          : "border-gray-300"
      }`}
    >
      <div>
        <h3 className="font-semibold text-lg mb-2">
          {title}
        </h3>

        <p className="text-gray-600 text-sm mb-6">
          {description}
        </p>
      </div>

      <Link
        href={href}
        className={`mt-auto text-center rounded py-2 transition ${
          variant === "free"
            ? "bg-black text-white hover:opacity-90"
            : "border border-black hover:bg-black hover:text-white"
        }`}
      >
        {cta}
      </Link>
    </div>
  );
}
