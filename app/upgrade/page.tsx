"use client";

import { useRouter } from "next/navigation";
import { useAuthUser } from "@/lib/useAuthUser";
import { getAppCapabilities } from "@/lib/access";

export default function UpgradePage() {
  const router = useRouter();
  const { user, userData, loading } = useAuthUser();

  if (loading) return <p>Carregando...</p>;

  if (!user || !userData) {
    router.push("/auth");
    return null;
  }

  const currentPlan = userData.appPlan;
  const capabilities = getAppCapabilities(currentPlan);

  return (
    <main style={{ padding: 40, maxWidth: 600 }}>
      <h1>Upgrade de Plano 🚀</h1>

      <p>
        Plano atual: <strong>{currentPlan}</strong>
      </p>

      <hr />

      <h3>O que está limitado no seu plano:</h3>

      <ul>
        <li>📝 Notas: {capabilities.maxNotes}</li>
        <li>✅ Tarefas: {capabilities.maxTasks}</li>
        <li>
          ⏱️ Timers: {capabilities.timers ? "Ativo" : "Bloqueado"}
        </li>
        <li>
          📆 Check-in diário:{" "}
          {capabilities.dailyCheckins ? "Ativo" : "Bloqueado"}
        </li>
      </ul>

      <hr />

      <h3>Planos disponíveis</h3>

      <div style={{ marginBottom: 20 }}>
        <h4>🔥 Mensal</h4>
        <p>Recursos completos por 30 dias</p>
        <button onClick={() => alert("Pagamento em breve")}>
          Fazer upgrade
        </button>
      </div>

      <div>
        <h4>🏆 Anual</h4>
        <p>Recursos completos por 1 ano (melhor custo)</p>
        <button onClick={() => alert("Pagamento em breve")}>
          Fazer upgrade
        </button>
      </div>

      <br />

      <button onClick={() => router.push("/dashboard")}>
        Voltar para o app
      </button>
    </main>
  );
}
