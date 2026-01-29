export default function CancelPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center gap-4 px-4">
      <h1 className="text-3xl font-bold text-red-500">
        Pagamento não concluído ❌
      </h1>

      <p className="text-lg max-w-md">
        Seu pagamento foi cancelado ou não finalizado.  
        Você pode tentar novamente quando quiser.
      </p>

      <div className="flex gap-4 mt-4">
        <a
          href="/planos"
          className="rounded bg-black px-6 py-3 text-yellow-400 font-semibold"
        >
          Ver planos
        </a>

        <a
          href="/dashboard"
          className="rounded border px-6 py-3"
        >
          Voltar ao app
        </a>
      </div>
    </main>
  );
}
