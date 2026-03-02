"use client";

import { PlanCard } from "@/components/PlanCard";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useRouter } from "next/navigation";

type PlanType = "quinzenal" | "mensal" | "anual";

export default function PlanosPage() {
  const router = useRouter();
  const { user, userData, loading } = useAuthUser();

  // Pega o plano específico do Stripe, se existir
  const currentPlan = userData?.stripe?.plan || null;
  const isPremium = userData?.stripe?.status === "active";

  async function handleCheckout(planType: PlanType) {
    if (!user) {
      router.push("/auth?redirect=/planos");
      return;
    }

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          plan: planType,
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* TÍTULO */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">
          {user && isPremium ? "Gerenciar Plano" : "Escolha seu plano"}
        </h1>
        
        {/* SE LOGADO, MOSTRA PLANO ATUAL */}
        {user && (
          <div className="mb-6">
            <p className="text-gray-600">
              Plano atual: <strong className="text-black">
                {currentPlan === "quinzenal" && "Quinzenal"}
                {currentPlan === "mensal" && "Mensal"}
                {currentPlan === "anual" && "Anual"}
                {!currentPlan && "Free"}
              </strong>
            </p>
            {isPremium && (
              <p className="text-sm text-gray-500 mt-2">
                Você já tem acesso premium! Escolha outro plano abaixo se desejar mudar.
              </p>
            )}
          </div>
        )}

        {/* SE NÃO LOGADO */}
        {!user && (
          <p className="text-gray-500">
            Comece grátis e evolua quando quiser
          </p>
        )}
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
          buttonText={
            user 
              ? (!currentPlan ? "Plano atual" : "Voltar ao Free")
              : "Começar grátis"
          }
          onClick={() => {
            if (!user) {
              router.push("/auth");
            } else if (currentPlan) {
              alert("Para voltar ao Free, cancele sua assinatura no painel.");
            }
          }}
          disabled={!currentPlan && user !== null}
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
          buttonText={
            currentPlan === "quinzenal" ? "Plano atual" : "Testar agora"
          }
          onClick={() => handleCheckout("quinzenal")}
          disabled={currentPlan === "quinzenal"}
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
          buttonText={
            currentPlan === "mensal" ? "Plano atual" : "Virar Premium"
          }
          onClick={() => handleCheckout("mensal")}
          disabled={currentPlan === "mensal"}
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
          buttonText={
            currentPlan === "anual" ? "Plano atual" : "Economizar agora"
          }
          onClick={() => handleCheckout("anual")}
          disabled={currentPlan === "anual"}
        />
      </div>

      {/* BOTÃO VOLTAR (SE LOGADO) */}
      {user && (
        <div className="text-center mt-10">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-gray-600 hover:text-black transition"
          >
            ← Voltar para o dashboard
          </button>
        </div>
      )}

      {/* INFO ADICIONAL */}
      <div className="mt-16 text-center text-sm text-gray-500">
        <p>
          Todos os planos incluem acesso completo ao app Rise Up.
          Cancele quando quiser, sem burocracia.
        </p>
      </div>
    </div>
  );
}