"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useUserPlan } from "@/lib/useUserPlan";
import { extractNameFromEmail } from "@/lib/extractName";
import { subscribeToRecentActivity, Activity } from "@/lib/activityService";
import { getStreak, StreakData, DEFAULT_STREAK, ACHIEVEMENTS } from "@/lib/streakService";
import { generateWeeklyReport, WeeklyReport } from "@/lib/weeklyReportService";
import { subscribeToGoals, calcProgress, Goal } from "@/lib/goalsService";
import { subscribeToTemplates, getBlocksForDate, getTodayStr } from "@/lib/routineService";
import ShareAchievement from "@/components/ShareAchievement";
import UpgradeModal from "@/components/UpgradeModal";

const MOTIVATIONS = [
  "Cada passo conta. Você está construindo algo sólido.",
  "Consistência é a chave. Continue.",
  "O progresso é invisível até que de repente não é.",
  "Disciplina é liberdade.",
  "Foco no processo. Os resultados vêm.",
  "Um dia de cada vez. Você consegue.",
  "O melhor momento para começar foi ontem. O segundo melhor é agora.",
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

function hasDiaryToday(userData: any): boolean {
  const last = userData?.lastDiaryEntry as string | undefined;
  if (!last) return false;
  return last.startsWith(new Date().toISOString().slice(0, 10));
}

function timeAgo(ms: number): string {
  const diff = Math.floor((Date.now() - ms) / 1000);
  if (diff < 60) return "Agora";
  if (diff < 3600) return `${Math.floor(diff / 60)}min atrás`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h atrás`;
  if (diff < 172800) return "Ontem";
  return new Date(ms).toLocaleDateString("pt-BR", { day: "numeric", month: "short" });
}

const WEEK_DAYS = ["D","S","T","Q","Q","S","S"];
const TYPE_LABELS: Record<string, string> = {
  notes: "Notas", diary: "Diário", flashcards: "Flashcards",
  routine: "Rotina", goals: "Metas", biblioteca: "Biblioteca",
  mindmap: "Mapa Mental", premium: "2º Cérebro",
};

const QUICK_ACCESS = [
  { key: "diary",      href: "/diario",       label: "Diário",        emoji: "📔", color: "#4ade80" },
  { key: "notes",      href: "/notes/simple", label: "Notas",         emoji: "📝", color: "#D4AF37" },
  { key: "routine",    href: "/routine",       label: "Rotina",        emoji: "⚡", color: "#fb923c" },
  { key: "goals",      href: "/goals",         label: "Metas",         emoji: "🎯", color: "#c084fc" },
  { key: "flashcards", href: "/flashcards/ai", label: "Flashcards",    emoji: "🎴", color: "#60a5fa" },
  { key: "mindmap",    href: "/mindmap",       label: "Mapa Mental",   emoji: "🧠", color: "#f472b6" },
  { key: "premium",    href: "/premium",       label: "2º Cérebro",    emoji: "✦",  color: "#D4AF37" },
  { key: "biblioteca", href: "/biblioteca",    label: "Biblioteca",    emoji: "📚", color: "#888"   },
];

// ── MINI GRÁFICO DE BARRAS ────────────────────────────────
function BarChart({ data, color, label }: {
  data: number[]; color: string; label: string;
}) {
  const max = Math.max(...data, 1);
  const days = ["D","S","T","Q","Q","S","S"];
  const today = new Date().getDay();
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-faint)" }}>{label}</p>
      <div className="flex items-end gap-1 h-10">
        {data.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
            <div className="w-full rounded-sm transition-all"
              style={{
                height: `${Math.max((v / max) * 36, v > 0 ? 4 : 2)}px`,
                background: i === today ? color : `${color}40`,
                minHeight: 2,
              }}/>
            <span className="text-[8px]" style={{ color: i === today ? "var(--text-muted)" : "var(--text-faint)" }}>
              {days[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── GRÁFICO DE PROGRESSO CIRCULAR ────────────────────────
function CircleProgress({ pct, color, size = 64, strokeWidth = 5 }: {
  pct: number; color: string; size?: number; strokeWidth?: number;
}) {
  const r = (size - strokeWidth * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r}
        fill="none" stroke="var(--app-border)" strokeWidth={strokeWidth}/>
      <circle cx={size/2} cy={size/2} r={r}
        fill="none" stroke={color} strokeWidth={strokeWidth}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.5s ease" }}/>
    </svg>
  );
}

// ── SPARKLINE ────────────────────────────────────────────
function Sparkline({ data, color, height = 32 }: {
  data: number[]; color: string; height?: number;
}) {
  if (data.length < 2) return null;
  const max = Math.max(...data, 1);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 100; const h = height;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return `${x},${y}`;
  }).join(" ");
  const areaBottom = `${(data.length-1)/(data.length-1)*w},${h} 0,${h}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full" style={{ height }}>
      <defs>
        <linearGradient id={`spark-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polygon points={`${pts} ${areaBottom}`}
        fill={`url(#spark-${color.replace("#","")})`}/>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, userData } = useAuthUser();
  const { isPremium, plan } = useUserPlan();

  const name = userData?.name
    ? userData.name.split(" ")[0]
    : extractNameFromEmail(user?.email ?? "");
  const diaryDone = hasDiaryToday(userData);
  const motivation = MOTIVATIONS[new Date().getDay() % MOTIVATIONS.length];

  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [streak, setStreak] = useState<StreakData>(DEFAULT_STREAK);
  const [report, setReport] = useState<WeeklyReport | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [routineTemplates, setRoutineTemplates] = useState<any[]>([]);
  const [shareTarget, setShareTarget] = useState<{ title: string; subtitle: string; emoji: string; color: string } | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [newAchievement, setNewAchievement] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const unsubs = [
      subscribeToRecentActivity(user.uid, setRecentActivity),
      subscribeToGoals(user.uid, setGoals),
      subscribeToTemplates(user.uid, setRoutineTemplates),
    ];
    getStreak(user.uid).then(s => {
      setStreak(s);
      const prev = s.achievements ?? [];
      if (prev.length > 0) setNewAchievement(prev[prev.length - 1]);
    });
    generateWeeklyReport(user.uid).then(setReport);
    return () => unsubs.forEach(u => u());
  }, [user]);

  const today = getTodayStr();
  const todayBlocks = getBlocksForDate(routineTemplates, today);
  const activeGoals = goals.filter(g => g.status === "active");
  const topGoal = [...activeGoals].sort((a, b) => calcProgress(b) - calcProgress(a))[0];
  const unlockedAchievements = ACHIEVEMENTS.filter(a => streak.achievements?.includes(a.id));
  const nextAchievement = ACHIEVEMENTS.find(a => !streak.achievements?.includes(a.id));
  const newAchievementData = newAchievement ? ACHIEVEMENTS.find(a => a.id === newAchievement) : null;

  function getPlanLabel() {
    if (!isPremium) return "Gratuito";
    const labels: Record<string, string> = { quinzenal: "Quinzenal", mensal: "Mensal", anual: "Anual" };
    return labels[plan ?? ""] ?? "Premium";
  }

  const weekActivityData = streak.weekActivity?.map(v => v ? 1 : 0) ?? [0,0,0,0,0,0,0];
  const activityByDay = [0,0,0,0,0,0,0].map((_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toLocaleDateString("pt-BR", { day: "numeric", month: "short" });
    return recentActivity.filter(a => {
      const ms = a.timestamp?.toDate?.()?.getTime() ?? 0;
      const aDate = new Date(ms).toLocaleDateString("pt-BR", { day: "numeric", month: "short" });
      return aDate === dateStr;
    }).length;
  });

  return (
    <div className="min-h-screen px-8 py-8" style={{ background: "var(--app-bg)", maxWidth: 1100, margin: "0 auto" }}>

      {/* ── CABEÇALHO ── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-[11px] uppercase tracking-widest mb-1 font-semibold" style={{ color: "var(--text-faint)" }}>
            {getTodayLabel()}
          </p>
          <h1 className="text-[28px] font-bold mb-1" style={{ color: "var(--text-primary)" }}>
            {getGreeting()}, {name} 👋
          </h1>
          <p className="text-[14px]" style={{ color: "var(--text-muted)" }}>{motivation}</p>
        </div>
        {streak.currentStreak > 0 && (
          <button
            onClick={() => setShareTarget({ title: `${streak.currentStreak} dias seguidos!`, subtitle: "Streak no Rise Up", emoji: "🔥", color: "#D4AF37" })}
            className="flex flex-col items-center px-5 py-3 rounded-2xl border cursor-pointer transition-all hover:scale-[1.02]"
            style={{ background: "var(--gold-bg)", borderColor: "var(--gold)" }}>
            <span className="text-[28px] font-black" style={{ color: "var(--gold)", lineHeight: 1 }}>
              {streak.currentStreak}
            </span>
            <span className="text-[11px] font-bold mt-0.5" style={{ color: "var(--gold)" }}>dias 🔥</span>
          </button>
        )}
      </div>

      {/* ── ALERTAS ── */}
      {((!diaryDone) || todayBlocks.length > 0 || newAchievementData) && (
        <div className="flex flex-wrap gap-2 mb-6">
          {!diaryDone && (
            <button onClick={() => router.push("/diario")}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border text-[12px] font-semibold transition-all hover:scale-[1.01]"
              style={{ background: "var(--gold-bg)", borderColor: "var(--gold)", color: "var(--gold)" }}>
              📔 Check-in do diário pendente — fazer agora
            </button>
          )}
          {todayBlocks.length > 0 && (
            <button onClick={() => router.push("/routine")}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border text-[12px] font-semibold transition-all"
              style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)", color: "var(--text-secondary)" }}>
              ⚡ {todayBlocks.length} bloco{todayBlocks.length !== 1 ? "s" : ""} na rotina hoje
            </button>
          )}
          {newAchievementData && (
            <button onClick={() => setShareTarget({ title: newAchievementData.label, subtitle: newAchievementData.desc, emoji: newAchievementData.emoji, color: "#D4AF37" })}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border text-[12px] font-semibold"
              style={{ background: "var(--gold-bg)", borderColor: "var(--gold)", color: "var(--gold)" }}>
              {newAchievementData.emoji} Nova conquista: {newAchievementData.label} — compartilhar!
            </button>
          )}
        </div>
      )}

      {/* ── LINHA 1: STREAK + META + ATIVIDADE ── */}
      <div className="grid grid-cols-3 gap-4 mb-4">

        {/* STREAK VISUAL */}
        <div className="p-5 rounded-2xl border" style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
          <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
            Sequência
          </p>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-shrink-0">
              <CircleProgress pct={Math.min((streak.currentStreak / 30) * 100, 100)} color="#D4AF37" size={64}/>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[18px] font-black" style={{ color: "var(--gold)", lineHeight: 1 }}>
                  {streak.currentStreak}
                </span>
                <span className="text-[8px]" style={{ color: "var(--text-faint)" }}>dias</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-[10px]" style={{ color: "var(--text-faint)" }}>Recorde</p>
                  <p className="text-[18px] font-black" style={{ color: "var(--text-primary)" }}>{streak.longestStreak}</p>
                </div>
                <div>
                  <p className="text-[10px]" style={{ color: "var(--text-faint)" }}>Total</p>
                  <p className="text-[18px] font-black" style={{ color: "var(--text-primary)" }}>{streak.totalDaysActive}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            {WEEK_DAYS.map((d, i) => {
              const active = streak.weekActivity?.[i] ?? false;
              const isToday = i === new Date().getDay();
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full h-7 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all"
                    style={{
                      background: active ? "var(--gold)" : isToday ? "var(--gold-bg)" : "var(--app-bg-3)",
                      color: active ? "#000" : isToday ? "var(--gold)" : "var(--text-faint)",
                      border: isToday && !active ? "1px solid var(--gold)" : "none",
                    }}>
                    {active ? "✓" : d}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* META EM FOCO */}
        <div className="p-5 rounded-2xl border cursor-pointer transition-all"
          style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}
          onClick={() => router.push("/goals")}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--app-border-2)"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--app-border)"}>
          <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
            Meta em foco
          </p>
          {topGoal ? (
            <>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[22px]">{topGoal.emoji}</span>
                  <div className="min-w-0">
                    <p className="text-[14px] font-bold truncate" style={{ color: "var(--text-primary)" }}>{topGoal.title}</p>
                    <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                      {topGoal.milestones?.filter((m: any) => m.completed).length ?? 0}/{topGoal.milestones?.length ?? 0} marcos
                    </p>
                  </div>
                </div>
                <div className="relative flex-shrink-0 ml-2">
                  <CircleProgress pct={calcProgress(topGoal)} color={topGoal.color} size={52}/>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[12px] font-black" style={{ color: topGoal.color }}>{calcProgress(topGoal)}%</span>
                  </div>
                </div>
              </div>
              {topGoal.why && (
                <p className="text-[11px] italic mb-3 pl-2 border-l-2 leading-relaxed"
                  style={{ color: "var(--text-muted)", borderColor: topGoal.color }}>
                  "{topGoal.why.slice(0, 70)}{topGoal.why.length > 70 ? "..." : ""}"
                </p>
              )}
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--app-border)" }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${calcProgress(topGoal)}%`, background: topGoal.color }}/>
              </div>
              {activeGoals.length > 1 && (
                <p className="text-[10px] mt-2" style={{ color: "var(--text-faint)" }}>
                  +{activeGoals.length - 1} outra{activeGoals.length > 2 ? "s" : ""} meta{activeGoals.length > 2 ? "s" : ""} ativa{activeGoals.length > 2 ? "s" : ""}
                </p>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 gap-2">
              <span className="text-[32px]">🎯</span>
              <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>Nenhuma meta ativa</p>
              <button className="text-[12px] font-bold px-3 py-1.5 rounded-lg"
                style={{ background: "var(--gold)", color: "#000" }}>
                Criar meta
              </button>
            </div>
          )}
        </div>

        {/* ATIVIDADE DA SEMANA */}
        <div className="p-5 rounded-2xl border" style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
          <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
            Atividade da semana
          </p>
          <div className="mb-4">
            <Sparkline data={activityByDay.length > 0 ? activityByDay : [0,0,0,0,0,0,0]} color="#D4AF37"/>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Ações", value: recentActivity.length, color: "var(--gold)" },
              { label: "Diário", value: report?.diaryEntries ?? 0, color: "#4ade80" },
              { label: "Notas", value: report?.notesCreated ?? 0, color: "#60a5fa" },
            ].map(m => (
              <div key={m.label} className="text-center">
                <p className="text-[18px] font-black" style={{ color: m.color }}>{m.value}</p>
                <p className="text-[10px]" style={{ color: "var(--text-faint)" }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── LINHA 2: PROGRESSO DE METAS ── */}
      {activeGoals.length > 0 && (
        <div className="p-5 rounded-2xl border mb-4" style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
              Progresso das metas
            </p>
            <button onClick={() => router.push("/goals")} className="text-[11px]" style={{ color: "var(--gold)" }}>
              Ver todas →
            </button>
          </div>
          <div className="flex gap-4">
            {activeGoals.slice(0, 5).map(goal => {
              const pct = calcProgress(goal);
              return (
                <div key={goal.id} className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-[14px] flex-shrink-0">{goal.emoji}</span>
                      <span className="text-[11px] truncate font-medium" style={{ color: "var(--text-secondary)" }}>
                        {goal.title.slice(0, 16)}{goal.title.length > 16 ? "..." : ""}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold flex-shrink-0 ml-1" style={{ color: goal.color }}>{pct}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--app-border)" }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: goal.color }}/>
                  </div>
                  <div className="flex gap-1 mt-1.5">
                    {(goal.milestones ?? []).slice(0, 6).map((m: any, i: number) => (
                      <div key={i} className="flex-1 h-1 rounded-full"
                        style={{ background: m.completed ? goal.color : "var(--app-border-2)" }}/>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── ACESSO RÁPIDO ── */}
      <div className="mb-4">
        <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-faint)" }}>
          Acesso rápido
        </p>
        <div className="grid grid-cols-4 gap-2.5">
          {QUICK_ACCESS.map(card => {
            const isDiaryAlert = card.key === "diary" && !diaryDone;
            return (
              <button key={card.key} onClick={() => router.push(card.href)}
                className="group flex items-center gap-3 p-4 rounded-2xl border text-left transition-all"
                style={{ background: "var(--app-bg-2)", borderColor: isDiaryAlert ? `${card.color}60` : "var(--app-border)" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${card.color}60`; el.style.background = "var(--app-bg-3)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = isDiaryAlert ? `${card.color}60` : "var(--app-border)"; el.style.background = "var(--app-bg-2)"; }}>
                <span className="text-[22px] flex-shrink-0">{card.emoji}</span>
                <span className="text-[13px] font-semibold" style={{ color: isDiaryAlert ? card.color : "var(--text-primary)" }}>
                  {card.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── LINHA 3: ATIVIDADE RECENTE + CONQUISTAS + PLANO ── */}
      <div className="grid grid-cols-5 gap-4">

        {/* ATIVIDADE RECENTE */}
        <div className="col-span-2 rounded-2xl border p-5" style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
              Atividade recente
            </p>
            <div className="flex items-end gap-1 h-5">
              {activityByDay.map((v, i) => (
                <div key={i} className="w-1 rounded-full"
                  style={{ height: `${Math.max((v / Math.max(...activityByDay, 1)) * 18, 2)}px`, background: i === new Date().getDay() ? "var(--gold)" : "var(--app-border-2)" }}/>
              ))}
            </div>
          </div>
          {recentActivity.length === 0 ? (
            <div className="py-4 text-center">
              <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>Nenhuma atividade ainda</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentActivity.slice(0, 6).map(item => {
                const ms = item.timestamp?.toDate?.()?.getTime() ?? 0;
                return (
                  <button key={item.id} onClick={() => router.push(item.href)}
                    className="w-full flex items-center gap-3 text-left group">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--gold)" }}/>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: "var(--gold)" }}>
                          {TYPE_LABELS[item.type] ?? item.type}
                        </span>
                        <span className="text-[10px]" style={{ color: "var(--text-faint)" }}>·</span>
                        <span className="text-[10px]" style={{ color: "var(--text-faint)" }}>{timeAgo(ms)}</span>
                      </div>
                      <p className="text-[12px] truncate mt-0.5" style={{ color: "var(--text-secondary)" }}>{item.label}</p>
                    </div>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                      className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                      style={{ color: "var(--text-muted)" }}>
                      <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* CONQUISTAS */}
        <div className="col-span-2 rounded-2xl border p-5" style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
          <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
            Conquistas
          </p>
          <div className="mb-4">
            <BarChart data={weekActivityData} color="#D4AF37" label="Dias ativos esta semana"/>
          </div>
          {unlockedAchievements.length === 0 ? (
            <div className="py-2 text-center">
              <p className="text-[12px]" style={{ color: "var(--text-muted)" }}>Nenhuma conquista ainda</p>
            </div>
          ) : (
            <div className="space-y-2">
              {unlockedAchievements.slice(0, 2).map(a => (
                <div key={a.id}
                  className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all"
                  style={{ background: "var(--app-bg-3)" }}
                  onClick={() => setShareTarget({ title: a.label, subtitle: a.desc, emoji: a.emoji, color: "#D4AF37" })}>
                  <span className="text-[20px]">{a.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold" style={{ color: "var(--text-primary)" }}>{a.label}</p>
                    <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {nextAchievement && (
            <div className="mt-3 p-2.5 rounded-xl border border-dashed"
              style={{ borderColor: "var(--app-border)" }}>
              <p className="text-[9px] font-bold uppercase tracking-wide mb-1" style={{ color: "var(--text-faint)" }}>
                Próxima conquista
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[14px] opacity-40">{nextAchievement.emoji}</span>
                <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>{nextAchievement.desc}</p>
              </div>
            </div>
          )}
        </div>

        {/* PLANO */}
        <div className="col-span-1 rounded-2xl border p-5 flex flex-col" style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
          <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>Plano</p>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[15px] font-bold" style={{ color: "var(--text-primary)" }}>{getPlanLabel()}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
              style={{ background: isPremium ? "var(--gold-bg)" : "var(--app-bg-4)", color: isPremium ? "var(--gold)" : "var(--text-muted)" }}>
              {isPremium ? "Ativo" : "Free"}
            </span>
          </div>
          {!isPremium && (
            <div className="space-y-2.5 flex-1">
              {[
                { label: "Notas", used: (userData?.usage as any)?.notes ?? 0, max: 10, color: "#D4AF37" },
                { label: "Metas", used: activeGoals.length, max: 3, color: "#c084fc" },
                { label: "2º Cérebro", used: 0, max: 10, color: "#fb923c" },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-[10px] mb-1" style={{ color: "var(--text-faint)" }}>
                    <span>{item.label}</span>
                    <span>{item.used}/{item.max}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--app-border)" }}>
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${Math.min((item.used / item.max) * 100, 100)}%`, background: item.color }}/>
                  </div>
                </div>
              ))}
            </div>
          )}
          {isPremium ? (
            <p className="text-[12px] flex-1" style={{ color: "var(--text-muted)" }}>✓ Todos os recursos desbloqueados</p>
          ) : (
            <button onClick={() => setShowUpgrade(true)}
              className="mt-4 w-full text-[12px] font-bold py-2.5 rounded-xl transition-all hover:scale-[1.01]"
              style={{ background: "var(--gold)", color: "#000" }}>
              Fazer upgrade ⭐
            </button>
          )}
        </div>
      </div>

      {shareTarget && (
        <ShareAchievement title={shareTarget.title} subtitle={shareTarget.subtitle}
          emoji={shareTarget.emoji} color={shareTarget.color}
          onClose={() => setShareTarget(null)}/>
      )}
      {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}
    </div>
  );
}
