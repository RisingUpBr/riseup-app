"use client";

import { useRouter } from "next/navigation";
import { useAuthUser } from "@/hooks/useAuthUser";

const MOTIVATIONS = [
  "Cada passo conta. Você está construindo algo sólido.",
  "Consistência é a chave. Continue.",
  "O progresso é invisível até que de repente não é.",
  "Disciplina é liberdade.",
  "Foco no processo. Os resultados vêm.",
];

function getTodayLabel() {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());
}

function getMotivation() {
  const day = new Date().getDay();
  return MOTIVATIONS[day % MOTIVATIONS.length];
}

function extractName(userData: Record<string, unknown> | null, email?: string | null): string {
  if (userData?.name && typeof userData.name === "string") return userData.name.split(" ")[0];
  if (email) {
    const local = email.split("@")[0].replace(/[^a-zA-ZÀ-ÿ]/g, " ").trim().split(" ")[0];
    return local.charAt(0).toUpperCase() + local.slice(1).toLowerCase();
  }
  return "Você";
}

function getMeta(userData: Record<string, unknown> | null, key: string): number {
  const usage = userData?.usage as Record<string, number> | undefined;
  return usage?.[key] ?? 0;
}

function hasDiaryToday(userData: Record<string, unknown> | null): boolean {
  const lastEntry = userData?.lastDiaryEntry as string | undefined;
  if (!lastEntry) return false;
  return lastEntry.startsWith(new Date().toISOString().slice(0, 10));
}

const FEATURE_CARDS = [
  {
    key: "notes",
    href: "/notas",
    label: "Notas",
    desc: (meta: number) => meta === 0 ? "Nenhuma nota ainda" : `${meta} nota${meta > 1 ? "s" : ""} salva${meta > 1 ? "s" : ""}`,
    usageKey: "notes",
    locked: false,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    key: "diary",
    href: "/diario",
    label: "Diário",
    desc: (meta: number) => meta === 0 ? "Comece seu check-in hoje" : `${meta} entrada${meta > 1 ? "s" : ""} registrada${meta > 1 ? "s" : ""}`,
    usageKey: "diary",
    locked: false,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    key: "flashcards",
    href: "/flashcards",
    label: "Flashcards",
    desc: (meta: number) => meta === 0 ? "Nenhum deck criado" : `${meta} deck${meta > 1 ? "s" : ""} ativo${meta > 1 ? "s" : ""}`,
    usageKey: "flashcards",
    locked: false,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    key: "rotina",
    href: "/rotinas",
    label: "Rotina",
    desc: (meta: number) => meta === 0 ? "Nenhuma rotina definida" : `${meta} rotina${meta > 1 ? "s" : ""} ativa${meta > 1 ? "s" : ""}`,
    usageKey: "routines",
    locked: false,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    key: "metas",
    href: "/metas",
    label: "Metas",
    desc: (meta: number) => meta === 0 ? "Nenhuma meta definida" : `${meta} meta${meta > 1 ? "s" : ""} em andamento`,
    usageKey: "goals",
    locked: false,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    key: "mindmap",
    href: "/mapa-mental",
    label: "Mapa Mental",
    desc: () => "Disponível no plano premium",
    usageKey: "mindmaps",
    locked: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, userData } = useAuthUser();

  const name = extractName(userData, user?.email);
  const plan = (userData?.plan as string) ?? "free";
  const diaryDone = hasDiaryToday(userData);

  return (
    <div className="min-h-screen bg-[#0A0A0A] px-8 py-10">

      {/* ZONA 1 — SAUDAÇÃO */}
      <div className="mb-10">
        <p className="text-xs text-neutral-600 uppercase tracking-widest mb-2">
          {getTodayLabel()}
        </p>
        <h1 className="text-2xl font-medium text-white mb-1">
          Olá, {name}.
        </h1>
        <p className="text-sm text-neutral-500">{getMotivation()}</p>

        {!diaryDone && (
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="text-xs text-[#D4AF37]">Check-in do diário pendente hoje</span>
          </div>
        )}
      </div>

      {/* ZONA 2 — ACESSO RÁPIDO */}
      <div className="mb-10">
        <h2 className="text-xs text-neutral-600 uppercase tracking-widest mb-5">Ferramentas</h2>
        <div className="grid grid-cols-3 gap-3">
          {FEATURE_CARDS.map((card) => {
            const meta = getMeta(userData, card.usageKey);
            const isLocked = card.locked && plan === "free";

            return (
              <button
                key={card.key}
                onClick={() => !isLocked && router.push(card.href)}
                className={`group relative text-left p-5 rounded-xl border transition-all duration-200 ${
                  isLocked
                    ? "border-neutral-800 bg-neutral-900/50 cursor-default opacity-60"
                    : "border-neutral-800 bg-neutral-900 hover:border-neutral-700 hover:bg-neutral-800 cursor-pointer"
                }`}
              >
                {isLocked && (
                  <div className="absolute top-3 right-3">
                    <svg className="w-3.5 h-3.5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                )}

                <div className={`mb-3 transition-colors ${isLocked ? "text-neutral-600" : "text-neutral-400 group-hover:text-[#D4AF37]"}`}>
                  {card.icon}
                </div>
                <div className={`text-sm font-medium mb-1 ${isLocked ? "text-neutral-600" : "text-neutral-200"}`}>
                  {card.label}
                </div>
                <div className="text-xs text-neutral-600">
                  {card.desc(meta)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ZONA 3 — VISÃO GERAL */}
      <div className="grid grid-cols-5 gap-4">

        {/* ATIVIDADE RECENTE — col 3 */}
        <div className="col-span-3 bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h3 className="text-xs text-neutral-600 uppercase tracking-widest mb-5">Atividade recente</h3>
          <div className="space-y-3">
            {[
              { label: "Nenhuma atividade registrada ainda", sub: "Use as ferramentas acima para começar", active: false },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-700 flex-shrink-0" />
                <div>
                  <p className="text-sm text-neutral-400">{item.label}</p>
                  <p className="text-xs text-neutral-600 mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PLANO — col 2 */}
        <div className="col-span-2 bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col">
          <h3 className="text-xs text-neutral-600 uppercase tracking-widest mb-5">Seu plano</h3>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-medium text-neutral-200 capitalize">
              {plan === "free" ? "Gratuito" : plan === "pro" ? "Pro" : "Essencial"}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-500 capitalize">
              {plan}
            </span>
          </div>

          <div className="space-y-2 mb-6 flex-1">
            {plan === "free" ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span className="text-xs text-neutral-500">Notas, Diário, Flashcards</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
                  <span className="text-xs text-neutral-600">IA e Mapa Mental — bloqueados</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span className="text-xs text-neutral-500">Todos os recursos desbloqueados</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span className="text-xs text-neutral-500">IA e Mapa Mental incluídos</span>
                </div>
              </>
            )}
          </div>

          {plan === "free" && (
            <button
              onClick={() => router.push("/planos")}
              className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-black text-xs font-bold py-2.5 rounded-lg transition-all hover:scale-[1.02]"
            >
              Fazer upgrade
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
