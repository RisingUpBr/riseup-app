import Link from "next/link";
import { notFound } from "next/navigation";

const PRODUTOS: Record<
  string,
  {
    title: string;
    subtitle: string;
    description: string[];
    paraQuem: string[];
    naoParaQuem: string[];
    checkoutUrl: string;
  }
> = {
  basico: {
    title: "Básico",
    subtitle: "Para quem quer parar de viver no automático",
    description: [
      "A maioria das pessoas vive reagindo.",
      "Reage ao dia, aos problemas, às emoções.",
      "O Básico é sobre sair do modo automático.",
      "Criar consciência, organização mental e direção mínima para a vida.",
    ],
    paraQuem: [
      "Quer mais clareza sobre si mesmo",
      "Sente que vive sem direção",
      "Quer começar de forma leve e consciente",
    ],
    naoParaQuem: [
      "Busca transformação profunda imediata",
      "Não quer refletir",
      "Espera respostas prontas",
    ],
    checkoutUrl: "https://SEU-CHECKOUT-BASICO",
  },

  essencial: {
    title: "Essencial",
    subtitle: "Para quem cansou de começar e nunca continuar",
    description: [
      "A maioria das pessoas sabe o que deveria fazer.",
      "Poucas conseguem manter constância.",
      "O Essencial não é sobre motivação momentânea.",
      "É sobre estrutura mental, clareza e disciplina aplicada à vida real.",
    ],
    paraQuem: [
      "Quer mais controle sobre a própria vida",
      "Sente que está sempre recomeçando",
      "Busca clareza e consistência",
    ],
    naoParaQuem: [
      "Procura soluções mágicas",
      "Não está disposto a refletir",
      "Quer resultados sem esforço",
    ],
    checkoutUrl: "https://SEU-CHECKOUT-ESSENCIAL",
  },

  pro: {
    title: "Pro",
    subtitle: "Para quem quer viver com domínio emocional e clareza",
    description: [
      "Quando a mente não está organizada, tudo pesa.",
      "Emoções mal resolvidas drenam energia e foco.",
      "O Pro é sobre entender seus padrões internos.",
      "E aprender a agir com consciência, não impulsividade.",
    ],
    paraQuem: [
      "Quer mais controle emocional",
      "Busca maturidade mental",
      "Deseja alta performance pessoal",
    ],
    naoParaQuem: [
      "Evita olhar para si",
      "Não aceita responsabilidade",
      "Quer atalhos fáceis",
    ],
    checkoutUrl: "https://SEU-CHECKOUT-PRO",
  },

  elite: {
    title: "Elite",
    subtitle: "Para quem quer visão, estrutura e domínio interno",
    description: [
      "Poucas pessoas vivem com clareza real.",
      "Menos ainda constroem uma visão sólida de longo prazo.",
      "Elite não é sobre status.",
      "É sobre domínio interno, estratégia de vida e consciência elevada.",
    ],
    paraQuem: [
      "Quer viver com intencionalidade",
      "Busca visão de longo prazo",
      "Quer alinhar mente, identidade e propósito",
    ],
    naoParaQuem: [
      "Quer apenas motivação",
      "Não quer se aprofundar",
      "Busca conteúdo superficial",
    ],
    checkoutUrl: "https://SEU-CHECKOUT-ELITE",
  },
};

export default function ProdutoPage({
  params,
}: {
  params: { slug: string };
}) {
  const produto = PRODUTOS[params.slug];

  if (!produto) return notFound();

  return (
    <main className="min-h-screen px-6 py-20 max-w-3xl mx-auto">
      {/* TÍTULO */}
      <h1 className="text-4xl font-bold mb-4">
        {produto.title}
      </h1>

      <p className="text-xl text-gray-600 mb-10">
        {produto.subtitle}
      </p>

      {/* HISTÓRIA */}
      <section className="space-y-4 mb-12 text-gray-700">
        {produto.description.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </section>

      {/* PARA QUEM É */}
      <section className="mb-10">
        <h2 className="font-semibold mb-2">
          Este conteúdo é para você se:
        </h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-1">
          {produto.paraQuem.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {/* NÃO É PARA QUEM */}
      <section className="mb-12">
        <h2 className="font-semibold mb-2">
          Não é para você se:
        </h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-1">
          {produto.naoParaQuem.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <div className="text-center space-y-4">
        <Link
          href={produto.checkoutUrl}
          target="_blank"
          className="inline-block bg-black text-white px-8 py-4 rounded text-lg hover:opacity-90"
        >
          Quero dar esse passo
        </Link>

        <p className="text-sm text-gray-500">
          Acesso liberado automaticamente após a confirmação da plataforma.
        </p>

        <Link
          href="/produtos"
          className="block text-sm text-gray-500 hover:underline"
        >
          Ver todos os produtos
        </Link>
      </div>
    </main>
  );
}
