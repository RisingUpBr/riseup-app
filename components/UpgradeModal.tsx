"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type BillingPeriod = "monthly" | "yearly" | "biweekly";

const PLANS = [
  {
    id: "monthly" as BillingPeriod,
    label: "Mensal",
    price: "R$29",
    priceNum: 29,
    period: "/mês",
    desc: "Renovação automática todo mês. Cancele quando quiser.",
    highlight: false,
  },
  {
    id: "yearly" as BillingPeriod,
    label: "Anual",
    price: "R$244",
    priceNum: 244,
    period: "/ano",
    desc: "Equivale a R$20/mês. Cobrado uma vez por ano.",
    badge: "Economize 30%",
    highlight: true,
  },
  {
    id: "biweekly" as BillingPeriod,
    label: "Quinzenal",
    price: "R$19",
    priceNum: 19,
    period: "/15 dias",
    desc: "Pagamento único. Não renova automaticamente.",
    highlight: false,
  },
];

const FEATURES = [
  { icon: "🎯", label: "Metas ilimitadas" },
  { icon: "🧠", label: "Segundo Cérebro completo" },
  { icon: "🗺️", label: "Mapas mentais ilimitados" },
  { icon: "🎴", label: "Flashcards ilimitados" },
  { icon: "📔", label: "Diário sem limite de entradas" },
  { icon: "📊", label: "Relatórios semanais" },
  { icon: "🔔", label: "Lembretes personalizados" },
  { icon: "⚡", label: "Rotinas e templates ilimitados" },
];

export default function UpgradeModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [selected, setSelected] = useState<BillingPeriod>("yearly");
  const [step, setStep] = useState<"plans" | "confirm">("plans");
  const plan = PLANS.find(p => p.id === selected)!;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>

      <div className="w-full max-w-2xl rounded-3xl border overflow-hidden flex flex-col"
        style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border-2)", maxHeight: "90vh" }}>

        {/* Header */}
        <div className="flex-shrink-0 relative px-10 pt-8 pb-6 text-center border-b overflow-hidden"
          style={{ borderColor: "var(--app-border)", background: "var(--app-bg-3)" }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.12) 0%, transparent 70%)" }}/>

          <button onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-xl flex items-center justify-center border transition-all z-10"
            style={{ borderColor: "var(--app-border-2)", color: "var(--text-muted)", background: "transparent" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--app-bg-4)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 2l9 9M11 2l-9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </button>

          {step === "confirm" && (
            <button onClick={() => setStep("plans")}
              className="absolute top-5 left-5 w-9 h-9 rounded-xl flex items-center justify-center border transition-all z-10"
              style={{ borderColor: "var(--app-border-2)", color: "var(--text-muted)", background: "transparent" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--app-bg-4)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          {step === "plans" ? (
            <div className="relative">
              <div className="mb-1">
                <span className="text-[13px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: "var(--gold)", letterSpacing: "0.18em" }}>
                  Rise Up
                </span>
              </div>
              <h2 className="text-[32px] font-black mb-2 leading-tight"
                style={{
                  background: "linear-gradient(135deg, #D4AF37 0%, #f5d96b 50%, #b8920a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                Premium
              </h2>
              <p className="text-[14px]" style={{ color: "var(--text-muted)" }}>
                Desbloqueie tudo e eleve seu potencial
              </p>
            </div>
          ) : (
            <div className="relative">
              <div className="mb-1">
                <span className="text-[13px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: "var(--gold)" }}>
                  Rise Up Premium
                </span>
              </div>
              <h2 className="text-[24px] font-black mb-1" style={{ color: "var(--text-primary)" }}>
                Confirmar assinatura
              </h2>
              <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>
                Revise os detalhes antes de continuar
              </p>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {step === "plans" && (
            <div className="px-10 py-7">
              {/* Features grid */}
              <div className="grid grid-cols-4 gap-3 mb-7">
                {FEATURES.map(f => (
                  <div key={f.label} className="flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center"
                    style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border)" }}>
                    <span className="text-[22px]">{f.icon}</span>
                    <span className="text-[11px] font-medium leading-tight" style={{ color: "var(--text-secondary)" }}>{f.label}</span>
                  </div>
                ))}
              </div>

              {/* Planos */}
              <div className="space-y-2.5 mb-7">
                <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
                  Escolha seu plano
                </p>
                {PLANS.map(p => (
                  <button key={p.id} onClick={() => setSelected(p.id)}
                    className="w-full flex items-center gap-5 p-5 rounded-2xl border text-left transition-all relative"
                    style={{
                      background: selected === p.id ? "var(--gold-bg)" : "var(--app-bg-3)",
                      borderColor: selected === p.id ? "var(--gold)" : p.highlight ? "var(--app-border-2)" : "var(--app-border)",
                    }}>
                    {p.badge && (
                      <div className="absolute -top-2.5 left-5 text-[10px] font-black px-2.5 py-0.5 rounded-full"
                        style={{ background: "var(--gold)", color: "#000" }}>
                        {p.badge}
                      </div>
                    )}
                    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
                      style={{ borderColor: selected === p.id ? "var(--gold)" : "var(--app-border-2)" }}>
                      {selected === p.id && (
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--gold)" }}/>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[16px] font-bold" style={{ color: "var(--text-primary)" }}>{p.label}</span>
                      <p className="text-[12px] mt-0.5" style={{ color: "var(--text-muted)" }}>{p.desc}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-[22px] font-black" style={{ color: selected === p.id ? "var(--gold)" : "var(--text-primary)" }}>
                        {p.price}
                      </div>
                      <div className="text-[12px]" style={{ color: "var(--text-muted)" }}>{p.period}</div>
                    </div>
                  </button>
                ))}
              </div>

              <button onClick={() => setStep("confirm")}
                className="w-full py-4 rounded-2xl text-[16px] font-black transition-all hover:scale-[1.01]"
                style={{ background: "var(--gold)", color: "#000" }}>
                Continuar →
              </button>
              <p className="text-center text-[11px] mt-3" style={{ color: "var(--text-faint)" }}>
                🔒 Pagamento seguro via Stripe · SSL 256-bit · Cancele quando quiser
              </p>
              <p className="text-center text-[10px] mt-2 leading-relaxed" style={{ color: "var(--text-faint)", opacity: 0.7 }}>
                Ao continuar, você concorda com os{" "}
                <a href="/termos" target="_blank" style={{ color: "var(--gold)", textDecoration: "underline" }}>Termos de Uso</a>
                {" "}e a{" "}
                <a href="/privacidade" target="_blank" style={{ color: "var(--gold)", textDecoration: "underline" }}>Política de Privacidade</a>
                {" "}do Rise Up.
              </p>
            </div>
          )}

          {step === "confirm" && (
            <div className="px-10 py-7">
              {/* Resumo */}
              <div className="p-6 rounded-2xl mb-6"
                style={{ background: "var(--app-bg-3)", border: "1.5px solid var(--gold)" }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-[16px] font-bold" style={{ color: "var(--text-primary)" }}>
                      Rise Up Premium — {plan.label}
                    </p>
                    <p className="text-[13px] mt-1" style={{ color: "var(--text-muted)" }}>{plan.desc}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-[28px] font-black" style={{ color: "var(--gold)" }}>{plan.price}</div>
                    <div className="text-[12px]" style={{ color: "var(--text-muted)" }}>{plan.period}</div>
                  </div>
                </div>
                {plan.badge && (
                  <div className="inline-block text-[11px] font-bold px-3 py-1 rounded-full"
                    style={{ background: "var(--gold)", color: "#000" }}>
                    {plan.badge}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 mb-6">
                {FEATURES.map(f => (
                  <div key={f.label} className="flex items-center gap-2.5 text-[13px]"
                    style={{ color: "var(--text-secondary)" }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7l3.5 4L12 3" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f.label}
                  </div>
                ))}
              </div>

              <button onClick={() => { router.push(`/checkout?plan=${selected}`); onClose(); }}
                className="w-full py-4 rounded-2xl text-[16px] font-black transition-all hover:scale-[1.01] mb-3"
                style={{ background: "var(--gold)", color: "#000" }}>
                Assinar {plan.label} — {plan.price}{plan.period}
              </button>
              <p className="text-center text-[11px]" style={{ color: "var(--text-faint)" }}>
                🔒 Pagamento seguro via Stripe · SSL 256-bit
                {plan.id !== "biweekly" ? " · Cancele quando quiser" : " · Pagamento único, sem renovação automática"}
              </p>
              <p className="text-center text-[10px] mt-2 leading-relaxed" style={{ color: "var(--text-faint)", opacity: 0.7 }}>
                Ao assinar, você concorda com os{" "}
                <a href="/termos" target="_blank" style={{ color: "var(--gold)", textDecoration: "underline" }}>Termos de Uso</a>
                {" "}e a{" "}
                <a href="/privacidade" target="_blank" style={{ color: "var(--gold)", textDecoration: "underline" }}>Política de Privacidade</a>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
