import Link from "next/link";
import { notFound } from "next/navigation";

/**
 * Conteúdos Free
 * Depois isso pode vir de CMS, banco ou markdown
 */
const CONTEUDOS: Record<
  string,
  {
    title: string;
    description: string;
    body: string[];
  }
> = {
  fundamentos: {
    title: "Fundamentos da Consistência",
    description:
      "Por que você começa motivado e para no meio do caminho.",
    body: [
      "A maioria das pessoas não falha por falta de capacidade. Falha por falta de estrutura.",
      "Motivação é volátil. Disciplina é construída.",
      "Quando você entende isso, para de se culpar e começa a se organizar.",
    ],
  },

  mentalidade: {
    title: "Mentalidade e Identidade",
    description:
      "Você não age diferente porque pensa diferente — você age diferente porque se vê diferente.",
    body: [
      "Toda mudança real começa na identidade.",
      "Enquanto você se vê como alguém inconsistente, qualquer técnica falha.",
      "O jogo não é fazer mais. É se tornar alguém diferente.",
    ],
  },
};

export default function ConteudoPage({
  params,
}: {
  params: { slug: string };
}) {
  const conteudo = CONTEUDOS[params.slug];

  if (!conteudo) return notFound();

  return (
    <main className="min-h-screen px-6 py-20 max-w-3xl mx-auto">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2">
        {conteudo.title}
      </h1>

      <p className="text-gray-600 mb-10">
        {conteudo.description}
      </p>

      {/* BODY */}
      <div className="space-y-6 text-lg leading-relaxed">
        {conteudo.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {/* CTA SUAVE */}
      <div className="mt-16 border-t pt-8 text-center">
        <p className="text-gray-600 mb-4">
          Isso é apenas o começo.
        </p>

        <Link
          href="/biblioteca"
          className="inline-block bg-black text-white px-6 py-3 rounded hover:opacity-90"
        >
          Explorar a Biblioteca
        </Link>
      </div>
    </main>
  );
}
