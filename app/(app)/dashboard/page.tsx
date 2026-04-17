"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useUserPlan } from "@/lib/useUserPlan";
import { extractNameFromEmail } from "@/lib/extractName";
import { subscribeToRecentActivity, Activity } from "@/lib/activityService";
import Link from "next/link";

const MOTIVATIONS = [
  "Cada passo conta. Você está construindo algo sólido.",
  "Consistência é a chave. Continue.",
  "O progresso é invisível até que de repente não é.",
  "Disciplina é liberdade.",
  "Foco no processo. Os resultados vêm.",
];

function getTodayLabel() {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long", day: "numeric", month: "long",
  }).format(new Date()).toUpperCase();
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}

function extractName(userData: any, email?: string | null): string {
  if (userData?.name && typeof userData.name === "string") {
    return userData.name.split(" ")[0];
  }
  if (email) return extractNameFromEmail(email);
  return "Você";
}

function hasDiaryToday(userData: any): boolean {
  const last = userData?.lastDiaryEntry as string | undefined;
  if (!last) return false;
  return last.startsWith(new Date().toISOString().slice(0, 10));
}

const FEATURE_CARDS = [
  {
    key: "notes", href: "/notes/simple", label: "Notas",
    usageKey: "notes", locked: false,
    desc: (n: number) => n === 0 ? "Nenhuma nota ainda" : `${n} nota${n > 1 ? "s" : ""} salva${n > 1 ? "s" : ""}`,
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M6.5 7h7M6.5 10.5h7M6.5 14h4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
  },
  {
    key: "diary", href: "/diario", label: "Diário",
    usageKey: "diary", locked: false,
    desc: (n: number) => n === 0 ? "Comece seu check-in hoje" : `${n} entrada${n > 1 ? "s" : ""} registrada${n > 1 ? "s" : ""}`,
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 3h9.5L17 6.5V18H4V3z" stroke="currentColor" strokeWidth="1.4"/><path d="M13 3v4h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M7 9h6M7 12h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
  },
  {
    key: "flashcards", href: "/flashcards/ai", label: "Flashcards",
    usageKey: "flashcards", locked: false,
    desc: (n: number) => n === 0 ? "Nenhum criado ainda" : `${n} flashcard${n > 1 ? "s" : ""} criado${n > 1 ? "s" : ""}`,
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="5" width="13" height="9" rx="2" stroke="currentColor" strokeWidth="1.4"/><rect x="5" y="7.5" width="13" height="9" rx="2" stroke="currentColor" strokeWidth="1.4" opacity="0.4"/></svg>,
  },
  {
    key: "routine", href: "/routine", label: "Rotina",
    usageKey: "routines", locked: false,
    desc: (n: number) => n === 0 ? "Nenhuma rotina definida" : `${n} rotina${n > 1 ? "s" : ""} ativa${n > 1 ? "s" : ""}`,
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4"/><path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  },
  {
    key: "goals", href: "/goals", label: "Metas",
    usageKey: "goals", locked: false,
    desc: (n: number) => n === 0 ? "Nenhuma meta ativa" : `${n} meta${n > 1 ? "s" : ""} em andamento`,
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4"/><circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/><circle cx="10" cy="10" r="1.2" fill="currentColor"/></svg>,
  },
  {
    key: "mindmap", href: "/mindmap", label: "Mapa Mental",
    usageKey: "mindmaps", locked: true,
    desc: () => "Disponível no plano premium",
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="2.5" fill="currentColor" opacity="0.4"/><circle cx="3.5" cy="6" r="1.8" fill="currentColor" opacity="0.3"/><circle cx="16.5" cy="6" r="1.8" fill="currentColor" opacity="0.3"/><circle cx="3.5" cy="14" r="1.8" fill="currentColor" opacity="0.3"/><circle cx="16.5" cy="14" r="1.8" fill="currentColor" opacity="0.3"/><path d="M7.7 8.7L5.2 7.2M12.3 8.7l2.5-1.5M7.7 11.3L5.2 12.8M12.3 11.3l2.5 1.5" stroke="currentColor" strokeWidth="1.2" opacity="0.3"/></svg>,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, userData } = useAuthUser();
  const { isPremium, plan } = useUserPlan();

  const name = extractName(userData, user?.email);
  const diaryDone = hasDiaryToday(userData);
  const motivation = MOTIVATIONS[new Date().getDay() % MOTIVATIONS.length];

  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);

  useEffect(() => {
    if (!user) return;
    return subscribeToRecentActivity(user.uid, setRecentActivity);
  }, [user]);

  function getPlanLabel() {
    if (!isPremium) return "Gratuito";
    const labels: Record<string, string> = { quinzenal: "Quinzenal", mensal: "Mensal", anual: "Anual" };
    return labels[plan ?? ""] ?? "Premium";
  }

  return (
    <div className="min-h-screen px-8 py-10" style={{ background: "var(--app-bg)" }}>

      {/* ZONA 1 — SAUDAÇÃO */}
      <div className="mb-10">
        <p className="text-[11px] uppercase tracking-widest mb-2 font-semibold" style={{ color: "var(--text-tertiary)" }}>
          {getTodayLabel()}
        </p>
        <h1 className="text-[26px] font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>
          {getGreeting()}, {name}.
        </h1>
        <p className="text-[14px]" style={{ color: "var(--text-secondary)" }}>{motivation}</p>

        {!diaryDone && (
          <div
            className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border"
            style={{ background: "var(--gold-bg)", borderColor: "var(--gold-bg-strong)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--gold)" }} />
            <span className="text-[12px]" style={{ color: "var(--gold)" }}>Check-in do diário pendente hoje</span>
          </div>
        )}
      </div>

      {/* ZONA 2 — ACESSO RÁPIDO */}
      <div className="mb-10">
        <h2 className="text-[11px] uppercase tracking-widest mb-4 font-semibold" style={{ color: "var(--text-tertiary)" }}>
          Acesso rápido
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {FEATURE_CARDS.map((card) => {
            const usage = (userData?.usage as any)?.[card.usageKey] ?? 0;
            const isLocked = card.locked && !isPremium;
            const isDiaryAlert = card.key === "diary" && !diaryDone;

            return (
              <button
                key={card.key}
                onClick={() => !isLocked && router.push(card.href)}
                className="group text-left p-5 rounded-xl border transition-all relative"
                style={{
                  background: "var(--app-bg-2)",
                  borderColor: "var(--app-border)",
                  cursor: isLocked ? "default" : "pointer",
                  opacity: isLocked ? 0.75 : 1,
                }}
                onMouseEnter={e => {
                  if (!isLocked) (e.currentTarget as HTMLElement).style.borderColor = "var(--app-border-3)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--app-border)";
                }}
              >
                {isLocked && (
                  <div className="absolute top-3 right-3" style={{ color: "var(--text-tertiary)" }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <rect x="1.5" y="5" width="9" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1"/>
                      <path d="M3.5 5V3.5a2.5 2.5 0 015 0V5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                    </svg>
                  </div>
                )}
                <div className="mb-3 transition-colors"
                  style={{ color: isLocked ? "var(--text-faint)" : "var(--text-tertiary)" }}>
                  {card.icon}
                </div>
                <div className="text-[14px] font-medium mb-1" style={{ color: isLocked ? "var(--text-secondary)" : "var(--text-primary)" }}>
                  {card.label}
                </div>
                <div className="text-[12px]" style={{ color: isDiaryAlert ? "var(--gold)" : isLocked ? "var(--text-tertiary)" : "var(--text-tertiary)" }}>
                  {card.desc(usage)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ZONA 3 — VISÃO GERAL */}
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3 rounded-xl border p-6" style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
          <h3 className="text-[11px] uppercase tracking-widest mb-5 font-semibold" style={{ color: "var(--text-tertiary)" }}>
            Atividade recente
          </h3>
          {recentActivity.length === 0 ? (
            <div className="flex items-start gap-3">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--app-border-3)" }} />
              <div>
                <p className="text-[13px]" style={{ color: "var(--text-secondary)" }}>Nenhuma atividade registrada ainda</p>
                <p className="text-[11px] mt-0.5" style={{ color: "var(--text-tertiary)" }}>Use as ferramentas acima para começar</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((item) => {
                const ms = item.timestamp?.toDate?.()?.getTime() ?? 0;
                const diff = Math.floor((Date.now() - ms) / 1000);
                const when = diff < 60 ? "Agora"
                  : diff < 3600 ? `${Math.floor(diff / 60)}min atrás`
                  : diff < 86400 ? `${Math.floor(diff / 3600)}h atrás`
                  : diff < 172800 ? "Ontem"
                  : new Date(ms).toLocaleDateString("pt-BR", { day: "numeric", month: "short" });

                const typeLabel: Record<string, string> = {
                  notes: "Notas", diary: "Diário", flashcards: "Flashcards",
                  routine: "Rotina", goals: "Metas", biblioteca: "Biblioteca",
                };

                return (
                  <button
                    key={item.id}
                    onClick={() => router.push(item.href)}
                    className="w-full flex items-center gap-3 text-left group transition-all"
                  >
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-0.5"
                      style={{ background: "var(--gold)" }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: "var(--gold)" }}>
                          {typeLabel[item.type] ?? item.type}
                        </span>
                        <span className="text-[11px]" style={{ color: "var(--text-faint)" }}>·</span>
                        <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>{when}</span>
                      </div>
                      <p className="text-[13px] truncate mt-0.5" style={{ color: "var(--text-secondary)" }}>
                        {item.label}
                      </p>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                      className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: "var(--text-muted)" }}>
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="col-span-2 rounded-xl border p-6 flex flex-col" style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
          <h3 className="text-[11px] uppercase tracking-widest mb-4 font-semibold" style={{ color: "var(--text-tertiary)" }}>
            Seu plano
          </h3>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[14px] font-medium" style={{ color: "var(--text-primary)" }}>
              {getPlanLabel()}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: isPremium ? "var(--gold-bg)" : "var(--app-bg-4)", color: isPremium ? "var(--gold)" : "var(--text-muted)" }}>
              {isPremium ? "Ativo" : "Free"}
            </span>
          </div>
          <div className="space-y-2 mb-5 flex-1">
            {isPremium ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--gold)" }} />
                  <span className="text-[12px]" style={{ color: "var(--text-secondary)" }}>Todos os recursos desbloqueados</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--gold)" }} />
                  <span className="text-[12px]" style={{ color: "var(--text-secondary)" }}>IA e Mapa Mental incluídos</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--gold)" }} />
                  <span className="text-[12px]" style={{ color: "var(--text-primary)" }}>Notas, Diário e Flashcards</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--text-faint)" }} />
                  <span className="text-[12px]" style={{ color: "var(--text-tertiary)" }}>IA e Mapa Mental — bloqueados</span>
                </div>
              </>
            )}
          </div>
          {!isPremium && (
            <Link
              href="/upgrade"
              className="flex items-center justify-center w-full text-[12px] font-bold py-2.5 rounded-lg transition-all hover:scale-[1.02]"
              style={{ background: "var(--gold)", color: "#000" }}
            >
              Fazer upgrade
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
