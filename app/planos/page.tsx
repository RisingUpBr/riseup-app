"use client";

import { PlanCard } from "@/components/PlanCard";
import { useAuthUser } from "@/lib/useAuthUser";

type PlanType = "quinzenal" | "mensal" | "anual";

export default function PlanosPage() {
  const { user, loading } = useAuthUser();

  async function handleCheckout(plan: PlanType) {
    if (!user) {
      window.location.href = "/register";
      return;
    }

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          plan,
        }),
      });

      if (!res.ok) {
        throw new Error("Erro ao iniciar checkout");
      }

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
      alert("Não foi possível iniciar o pagamento. Tente novamente.");
    }
  }

  if (loading) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* TÍTULO */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">
          Escolha seu plano
        </h1>
        <p className="text-gray-500">
          Comece grátis e evolua quando quiser
        </p>
      </div>

      {/* PLANOS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* FREE */}
        <PlanCard
          title="Free"
          price="R$ 0"
          description="Para conhecer a plataforma"
          features={[
            "Acesso básico ao app",
            "Limites mensais",
            "Ideal para começar",
          ]}
          buttonText={user ? "Plano atual" : "Começar grátis"}
          onClick={() => {
            if (!user) {
              window.location.href = "/register";
            }
          }}
        />

        {/* QUINZENAL */}
        <PlanCard
          title="Quinzenal"
          price="R$ 19"
          description="Teste completo sem compromisso"
          features={[
            "Acesso premium completo",
            "Sem fidelidade",
            "Cancele quando quiser",
          ]}
          buttonText="Testar agora"
          onClick={() => handleCheckout("quinzenal")}
        />

        {/* MENSAL */}
        <PlanCard
          title="Mensal"
          price="R$ 29"
          description="O plano mais escolhido"
          highlight
          features={[
            "Tudo do quinzenal",
            "Melhor custo-benefício",
            "Acesso total ao app",
          ]}
          buttonText="Virar Premium"
          onClick={() => handleCheckout("mensal")}
        />

        {/* ANUAL */}
        <PlanCard
          title="Anual"
          price="R$ 244"
          description="Economize mais de 30%"
          features={[
            "Tudo do mensal",
            "Maior economia",
            "Prioridade em novidades",
          ]}
          buttonText="Economizar agora"
          onClick={() => handleCheckout("anual")}
        />
      </div>
    </div>
  );
}
