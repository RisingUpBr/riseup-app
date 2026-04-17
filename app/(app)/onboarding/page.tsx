"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuthUser } from "@/hooks/useAuthUser";
import { extractNameFromEmail } from "@/lib/extractName";

const GOALS = [
  { value: "estudar", label: "Estudar mais", desc: "Concursos, faculdade, idiomas" },
  { value: "produtividade", label: "Ser produtivo", desc: "Tarefas, projetos, trabalho" },
  { value: "habitos", label: "Criar hábitos", desc: "Rotina, saúde, consistência" },
  { value: "crescimento", label: "Crescer pessoal", desc: "Metas, reflexão, foco" },
];


export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useAuthUser();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("estudar");
  const [saving, setSaving] = useState(false);

  const emailName = user?.email ? extractNameFromEmail(user.email) : "Você";
  const displayName = name.trim() || emailName;

  async function save(overrideName?: string) {
    if (!user) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, "users", user.uid), {
        name: overrideName ?? displayName,
        goal,
        onboardingCompleted: true,
      });
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  }

  return (
    <div className="flex h-screen bg-[#0A0A0A] items-center justify-center p-6">
      <div className="w-full max-w-md">

        {/* Barra de progresso */}
        <div className="flex gap-1.5 mb-10">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-0.5 flex-1 rounded-full transition-all duration-300"
              style={{
                background:
                  i < step ? "#D4AF37" :
                  i === step ? "rgba(212,175,55,0.35)" :
                  "#1f1f1f",
              }}
            />
          ))}
        </div>

        {/* STEP 0 — Nome */}
        {step === 0 && (
          <div>
            <h1 className="text-2xl font-medium text-neutral-100 mb-1.5">
              Como quer ser chamado?
            </h1>
            <p className="text-sm text-neutral-500 mb-8">
              Vamos personalizar sua experiência.
            </p>
            <div className="mb-6">
              <label className="block text-xs text-neutral-600 mb-2 tracking-wide uppercase">
                Seu nome
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setStep(1)}
                placeholder={emailName}
                className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-3 text-sm text-neutral-100 placeholder-neutral-700 outline-none focus:border-[#D4AF37] transition-colors"
                autoFocus
              />
              <p className="text-xs text-neutral-700 mt-2">
                Deixe em branco para usar o nome detectado do seu email.
              </p>
            </div>
            <button
              onClick={() => setStep(1)}
              className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-black font-medium text-sm py-3.5 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              Continuar
            </button>
            <button
              onClick={() => save(emailName)}
              className="w-full mt-3 text-xs text-neutral-700 hover:text-neutral-500 transition-colors py-2"
            >
              Pular configuração inicial
            </button>
          </div>
        )}

        {/* STEP 1 — Objetivo */}
        {step === 1 && (
          <div>
            <h1 className="text-2xl font-medium text-neutral-100 mb-1.5">
              Qual é seu foco principal?
            </h1>
            <p className="text-sm text-neutral-500 mb-8">
              Isso ajuda o app a se organizar para você.
            </p>
            <div className="grid grid-cols-2 gap-2.5 mb-8">
              {GOALS.map((g) => (
                <button
                  key={g.value}
                  onClick={() => setGoal(g.value)}
                  className="text-left p-3.5 rounded-xl border transition-all"
                  style={{
                    background: goal === g.value ? "#0f0d00" : "#111",
                    borderColor: goal === g.value ? "#D4AF37" : "#1e1e1e",
                  }}
                >
                  <div
                    className="text-sm font-medium mb-0.5 transition-colors"
                    style={{ color: goal === g.value ? "#D4AF37" : "#bbb" }}
                  >
                    {g.label}
                  </div>
                  <div className="text-xs text-neutral-700">{g.desc}</div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-black font-medium text-sm py-3.5 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              Continuar
            </button>
            <button
              onClick={() => save()}
              className="w-full mt-3 text-xs text-neutral-700 hover:text-neutral-500 transition-colors py-2"
            >
              Pular
            </button>
          </div>
        )}

        {/* STEP 2 — Confirmação */}
        {step === 2 && (
          <div>
            <h1 className="text-2xl font-medium text-neutral-100 mb-1.5">
              Tudo pronto, {displayName}.
            </h1>
            <p className="text-sm text-neutral-500 mb-8">
              Sua área de trabalho está configurada.
            </p>
            <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-5 mb-8 space-y-3.5">
              {[
                { text: "Notas, Diário e Flashcards desbloqueados", on: true },
                { text: "Rotinas e Metas disponíveis para criar", on: true },
                { text: "Recursos de IA e Mapa Mental — plano premium", on: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: item.on ? "#D4AF37" : "#2a2a2a" }}
                  />
                  <span className="text-sm" style={{ color: item.on ? "#888" : "#444" }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => save()}
              disabled={saving}
              className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-black font-medium text-sm py-3.5 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {saving ? "Entrando..." : "Entrar no dashboard"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
