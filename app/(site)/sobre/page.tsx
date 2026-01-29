import Link from "next/link";

export default function SobrePage() {
  return (
    <main className="min-h-screen px-6 py-20 max-w-4xl mx-auto text-white">
      {/* ABERTURA */}
      <section className="mb-16 space-y-6">
        <h1 className="text-4xl font-bold">
          A Rise Up não foi criada para ocupar seu tempo.
        </h1>

        <h2 className="text-2xl text-neutral-400">
          Ela foi criada para te devolver controle.
        </h2>

        <p className="text-neutral-300 text-lg leading-relaxed">
          Em um mundo de distrações, excesso de informação e falta de direção,
          a Rise Up existe para ajudar pessoas a viverem com mais clareza,
          disciplina e propósito real.
        </p>
      </section>

      {/* O PROBLEMA */}
      <section className="mb-16 space-y-4">
        <h3 className="text-2xl font-semibold">
          O problema não é falta de capacidade.
        </h3>

        <p className="text-neutral-300">
          A maioria das pessoas sabe o que deveria fazer.
          Mesmo assim, vive cansada, dispersa e sem consistência.
        </p>

        <p className="text-neutral-300">
          Não é preguiça.
          Não é falta de inteligência.
        </p>

        <p className="text-neutral-300 font-semibold">
          É falta de estrutura mental.
        </p>
      </section>

      {/* A VIRADA */}
      <section className="mb-16 space-y-4">
        <h3 className="text-2xl font-semibold">
          Por que a Rise Up existe
        </h3>

        <p className="text-neutral-300">
          A Rise Up nasceu da necessidade real de organizar a mente,
          transformar intenção em ação e ação em disciplina diária.
        </p>

        <p className="text-neutral-300">
          Não prometemos atalhos.
          Criamos sistemas.
        </p>
      </section>

      {/* COMO FUNCIONA */}
      <section className="mb-16 space-y-6">
        <h3 className="text-2xl font-semibold">
          Como a Rise Up funciona
        </h3>

        <ul className="space-y-3 text-neutral-300">
          <li>📝 Escrita consciente para clareza mental</li>
          <li>🧠 Visualização de ideias e pensamentos</li>
          <li>🎯 Metas e rotinas com intenção</li>
          <li>🤖 IA como ferramenta — não como muleta</li>
        </ul>

        <p className="text-neutral-400">
          Tudo integrado. Tudo com propósito.
        </p>
      </section>

      {/* PARA QUEM É */}
      <section className="mb-16 space-y-4">
        <h3 className="text-2xl font-semibold">
          Para quem é a Rise Up
        </h3>

        <ul className="space-y-2 text-neutral-300">
          <li>✔ Pessoas que querem sair do automático</li>
          <li>✔ Quem busca evolução real, não motivação vazia</li>
          <li>✔ Quem entende que disciplina constrói liberdade</li>
        </ul>

        <p className="text-neutral-400 mt-4">
          Não é para quem busca soluções mágicas.
        </p>
      </section>

      {/* CTA */}
      <section className="text-center space-y-6">
        <p className="text-lg text-neutral-300">
          Se você sente que está pronto para evoluir,
          a Rise Up está pronta para caminhar com você.
        </p>

        <Link
          href="/planos"
          className="inline-block bg-yellow-400 text-black px-8 py-4 rounded-lg font-semibold hover:opacity-90"
        >
          Conhecer os planos
        </Link>
      </section>
    </main>
  );
}
