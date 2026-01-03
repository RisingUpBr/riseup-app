"use client";

import { PlanCard } from "@/components/PlanCard";
import { useAuthUser } from "@/lib/useAuthUser";

export default function PlanosPage() {
  const { user } = useAuthUser();

  async function handleCheckout(plan: "mensal" | "anual" | "quinzenal") {
    if (!user) {
      window.location.href = "/register";
      return;
    }

    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid: user.uid,
        email: user.email,
        plan,
      }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">
        Escolha seu plano
      </h1>
      <p className="text-center text-gray-500 mb-10">
        Comece grátis e evolua quando quiser
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* FREE */}
        <PlanCard
          title="Free"
          price="R$ 0"
          description="Para conhecer a plataforma"
          features={[
            "Acesso básico",
            "Conteúdo introdutório",
            "Comunidade limitada",
          ]}
          buttonText="Começar grátis"
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
            "Conteúdo premium",
            "Acesso total",
            "Cancelamento fácil",
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
            "Melhor custo mensal",
            "Atualizações constantes",
          ]}
          buttonText="Virar Premium"
          onClick={() => handleCheckout("mensal")}
        />

        {/* ANUAL */}
        <PlanCard
          title="Anual"
          price="R$ 244"
          description="Economize mais de 30% no longo prazo"
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
