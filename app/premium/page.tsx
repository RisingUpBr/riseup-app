import ProtectedRoute from "@/components/ProtectedRoute";

export default function PremiumPage() {
  return (
    <ProtectedRoute requirePremium>
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">
          Conteúdo Premium 🔥
        </h1>

        <p className="text-gray-600 mb-6">
          Aqui está o conteúdo exclusivo para assinantes da RiseUp.
        </p>

        {/* Exemplo de conteúdo */}
        <div className="rounded border p-6 bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">
            Módulo 1 – Mentalidade
          </h2>
          <p>
            Aprenda a construir disciplina, foco e propósito.
          </p>
        </div>
      </main>
    </ProtectedRoute>
  );
}
