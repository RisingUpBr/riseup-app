import Link from "next/link";

export default function FreeContentPage() {
  return (
    <main className="min-h-screen px-6 py-16 max-w-3xl mx-auto">
      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-6">
        Um começo consciente
      </h1>

      {/* TEXTO */}
      <p className="text-gray-700 mb-4">
        A maioria das pessoas não falha por falta de capacidade.
        Falha por falta de clareza.
      </p>

      <p className="text-gray-700 mb-4">
        Clareza sobre quem é, sobre o que está fazendo e
        sobre para onde está indo.
      </p>

      <p className="text-gray-700 mb-8">
        Este material gratuito não resolve tudo — e nem deve.
        Ele existe para te ajudar a enxergar com mais honestidade
        qual é o próximo passo.
      </p>

      {/* REFLEXÃO */}
      <div className="border rounded-xl p-6 bg-gray-50 mb-10">
        <h2 className="font-semibold mb-2">
          Pergunta para reflexão
        </h2>
        <p className="text-gray-700">
          Se você continuasse exatamente como está hoje,
          onde isso te levaria em 1 ano?
        </p>
      </div>

      {/* CTA */}
      <div className="text-center space-y-4">
        <Link
          href="/produtos/essencial"
          className="inline-block bg-black text-white px-6 py-3 rounded hover:opacity-90"
        >
          Dar o próximo passo
        </Link>

        <div>
          <Link
            href="/biblioteca"
            className="text-sm text-gray-500 hover:underline"
          >
            Voltar para a biblioteca
          </Link>
        </div>
      </div>
    </main>
  );
}

