import Link from "next/link";

const PRODUCTS: Record<string, {
  title: string;
  subtitle: string;
  cta: string;
}> = {
  basico: {
    title: "Básico",
    subtitle: "Para quem decidiu começar",
    cta: "Ver oferta",
  },
  essencial: {
    title: "Essencial",
    subtitle: "Para quem busca consistência",
    cta: "Ver oferta",
  },
  elite: {
    title: "Elite",
    subtitle: "Para quem quer transformação real",
    cta: "Ver oferta",
  },
};

export default function ProdutoPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = PRODUCTS[params.slug];

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Produto não encontrado.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-20 max-w-3xl mx-auto">
      <section className="space-y-8 text-lg leading-relaxed text-gray-800">
        <p>
          Você não chegou até aqui por acaso.  
          Mas também não chegou porque alguém te prometeu uma vida perfeita.
        </p>

        <p>
          Você chegou porque, em algum momento, percebeu que
          <strong> algo precisava mudar</strong>.
        </p>

        <p>
          Não é sobre motivação.  
          É sobre decisão.
        </p>

        <p>
          Não é sobre intensidade.  
          É sobre consistência.
        </p>

        <p>
          Se este material fizer sentido para você, ele estará aqui.
        </p>
      </section>

      <section className="mt-16 border rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
        <p className="text-gray-600 mb-6">{product.subtitle}</p>

        <Link
          href={`/checkout/${params.slug}`}
          className="inline-block rounded bg-black px-6 py-3 text-white hover:opacity-90"
        >
          {product.cta}
        </Link>
      </section>
    </main>
  );
}
