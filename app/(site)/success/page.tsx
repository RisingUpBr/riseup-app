export default function SuccessPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center gap-4 px-4">
      <h1 className="text-3xl font-bold text-green-600">
        Pagamento confirmado 🎉
      </h1>

      <p className="text-lg max-w-md">
        Sua assinatura foi ativada com sucesso.  
        Agora você já pode acessar todo o conteúdo premium da RiseUp.
      </p>

      <a
        href="/dashboard"
        className="mt-4 rounded bg-black px-6 py-3 text-yellow-400 font-semibold"
      >
        Ir para o app
      </a>
    </main>
  );
}
