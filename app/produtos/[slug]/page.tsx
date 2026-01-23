import Link from "next/link";
import { notFound } from "next/navigation";

const PRODUTOS = {
  basico: {
    title: "Básico",
    subtitle: "Para quem decidiu sair do automático",
    description: [
      "A maioria das pessoas vive reagindo.",
      "Reage ao dia, aos problemas, às emoções.",
      "O Básico é sobre criar consciência.",
      "Organizar a mente e dar direção mínima à vida.",
    ],
    paraQuem: [
      "Percebe que algo precisa mudar",
      "Quer mais clareza sobre si",
      "Busca um começo honesto",
    ],
    naoParaQuem: [
      "Busca transformação instantânea",
      "Não quer refletir",
      "Espera respostas prontas",
    ],
    checkoutUrl: "https://SEU-CHECKOUT-BASICO",
  },

  essencial: {
    title: "Essencial",
    subtitle: "Para quem cansou de começar e nunca continuar",
    description: [
      "Saber o que fazer não é o problema.",
      "O problema é sustentar o processo.",
      "O Essencial é sobre estrutura.",
      "Disciplina aplicada à vida real.",
    ],
    paraQuem: [
      "Quer constância",
      "Cansou de recomeçar",
      "Busca clareza e disciplina",
    ],
    naoParaQuem: [
      "Procura atalhos",
      "Quer motivação momentânea",
      "Evita responsabilidade",
    ],
    checkoutUrl: "https://SEU-CHECKOUT-ESSENCIAL",
  },

  avancado: {
    title: "Avançado",
    subtitle: "Para quem quer viver com domínio interno",
    description: [
      "Quando a mente não está organizada, tudo pesa.",
      "Emoções mal resolvidas drenam energia.",
      "O Avançado é sobre consciência elevada.",
      "Agir com clareza, não por impulso.",
    ],
    paraQuem: [
      "Quer domínio emocional",
      "Busca visão de longo prazo",
      "Quer viver com intenção",
    ],
    naoParaQuem: [
      "Foge de autoconhecimento",
      "Não quer profundidade",
      "Busca soluções fáceis",
    ],
    checkoutUrl: "https://SEU-CHECKOUT-AVANCADO",
  },
};

export default function ProdutoPage({
  params,
}: {
  params: { slug: string };
}) {
  const produto = PRODUTOS[params.slug as keyof typeof PRODUTOS];

  if (!produto) return notFound();

  return (
    <main className="min-h-screen px-6 py-20 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{produto.title}</h1>
      <p className="text-xl text-gray-600 mb-10">
        {produto.subtitle}
      </p>

      <section className="space-y-4 mb-12 text-gray-700">
        {produto.description.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </section>

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

      <section className="mb-10 bg-gray-50 border rounded-xl p-6">
        <h3 className="font-semibold mb-2">
          O que este conteúdo NÃO promete
        </h3>
        <p className="text-gray-600 text-sm">
          Não prometemos mudança instantânea, motivação infinita
          ou resultados sem esforço.  
          Aqui existe estrutura, clareza e responsabilidade.
        </p>
      </section>

      <div className="text-center space-y-4">
        <Link
          href={produto.checkoutUrl}
          target="_blank"
          className="inline-block bg-black text-white px-8 py-4 rounded text-lg hover:opacity-90"
        >
          Quero dar esse passo
        </Link>

        <p className="text-sm text-gray-500">
          Acesso liberado automaticamente após confirmação.
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

