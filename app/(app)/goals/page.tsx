"use client";
import { useState, useEffect } from "react";
import { useAuthUser } from "@/hooks/useAuthUser";
import ConfirmModal from "@/components/ConfirmModal";
import {
  Goal, GoalCategory, Milestone,
  GOAL_CATEGORIES,
  subscribeToGoals, createGoal, updateGoal, deleteGoal,
  calcProgress, genMilestoneId, daysUntilDeadline,
  formatDeadline, overallProgress,
} from "@/lib/goalsService";

type Screen = "main" | "new-goal" | "edit-goal" | "goal-detail";
type GoalFormStep = "basic" | "why" | "milestones";

// ── MILESTONE ITEM ────────────────────────────────────────
function MilestoneItem({ ms, color, onToggle, onEdit, onDelete }: {
  ms: Milestone; color: string;
  onToggle: () => void; onEdit: (title: string) => void; onDelete: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(ms.title);
  return (
    <div className="flex items-center gap-3 group py-2 border-b last:border-0"
      style={{ borderColor: "var(--app-border)" }}>
      <button onClick={onToggle}
        className="w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all"
        style={{ borderColor: ms.completed ? color : "var(--app-border-2)", background: ms.completed ? `${color}20` : "transparent" }}>
        {ms.completed && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
      {editing ? (
        <input value={val} onChange={e => setVal(e.target.value)} autoFocus
          onBlur={() => { onEdit(val); setEditing(false); }}
          onKeyDown={e => { if (e.key === "Enter") { onEdit(val); setEditing(false); } if (e.key === "Escape") setEditing(false); }}
          className="flex-1 bg-transparent outline-none text-[13px] border-b"
          style={{ borderColor: color, color: "var(--text-primary)" }} />
      ) : (
        <span className="flex-1 text-[13px] cursor-pointer"
          style={{ color: ms.completed ? "var(--text-muted)" : "var(--text-primary)", textDecoration: ms.completed ? "line-through" : "none" }}
          onDoubleClick={() => setEditing(true)}>
          {ms.title}
        </span>
      )}
      <button onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded"
        style={{ color: "var(--text-faint)" }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--danger)"}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-faint)"}>
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <path d="M2 2l7 7M9 2l-7 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
}

// ── GOAL FORM ─────────────────────────────────────────────
function GoalForm({ initial, onSave, onCancel }: {
  initial?: Goal;
  onSave: (data: Omit<Goal, "id" | "userId" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}) {
  const [step, setStep] = useState<GoalFormStep>("basic");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [emoji, setEmoji] = useState(initial?.emoji ?? "🎯");
  const [category, setCategory] = useState<GoalCategory>(initial?.category ?? "personal");
  const [customCategory, setCustomCategory] = useState(initial?.customCategory ?? "");
  const [deadline, setDeadline] = useState(initial?.deadline ?? "");
  const [why, setWhy] = useState(initial?.why ?? "");
  const [vision, setVision] = useState(initial?.vision ?? "");
  const [milestones, setMilestones] = useState<Milestone[]>(initial?.milestones ?? []);
  const [newMs, setNewMs] = useState("");

  const cat = GOAL_CATEGORIES.find(c => c.id === category)!;

  function addMilestone() {
    if (!newMs.trim()) return;
    setMilestones(prev => [...prev, { id: genMilestoneId(), title: newMs.trim(), completed: false }]);
    setNewMs("");
  }

  function save() {
    onSave({
      title, emoji, category, customCategory,
      why, vision, deadline, status: initial?.status ?? "active",
      milestones, color: cat.color,
    });
  }

  const steps: GoalFormStep[] = ["basic", "why", "milestones"];
  const stepLabels = ["O quê", "Por quê", "Marcos"];

  return (
    <div className="max-w-lg mx-auto px-8 py-8" style={{ background: "var(--app-bg)" }}>
      <button onClick={onCancel} className="flex items-center gap-2 text-[13px] mb-6" style={{ color: "var(--text-tertiary)" }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Voltar
      </button>

      <h2 className="text-[20px] font-bold mb-6" style={{ color: "var(--text-primary)" }}>
        {initial ? "Editar meta" : "Nova meta"}
      </h2>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <button onClick={() => { if (i === 0 || title) setStep(s); }}
              className="flex items-center gap-1.5 text-[12px] font-semibold transition-all"
              style={{ color: step === s ? cat.color : "var(--text-muted)" }}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all"
                style={{ borderColor: step === s ? cat.color : "var(--app-border)", background: step === s ? `${cat.color}18` : "transparent", color: step === s ? cat.color : "var(--text-muted)" }}>
                {i + 1}
              </div>
              {stepLabels[i]}
            </button>
            {i < steps.length - 1 && <div className="w-6 h-px" style={{ background: "var(--app-border)" }} />}
          </div>
        ))}
      </div>

      {/* STEP 1: BÁSICO */}
      {step === "basic" && (
        <div className="space-y-4">
          <div className="flex gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>Emoji</p>
              <input value={emoji} onChange={e => setEmoji(e.target.value)}
                className="w-14 h-10 text-center text-[22px] rounded-xl border outline-none"
                style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }} />
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>Título da meta</p>
              <input value={title} onChange={e => setTitle(e.target.value)}
                placeholder="Ex: Lançar meu app" autoFocus
                className="w-full px-3 py-2.5 rounded-xl text-[14px] border outline-none"
                style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }}
                onFocus={e => (e.target.style.borderColor = cat.color)}
                onBlur={e => (e.target.style.borderColor = "var(--app-border-2)")} />
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>Categoria</p>
            <div className="flex flex-wrap gap-2">
              {GOAL_CATEGORIES.map(c => (
                <button key={c.id} onClick={() => setCategory(c.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold border transition-all"
                  style={{ background: category === c.id ? `${c.color}18` : "transparent", borderColor: category === c.id ? c.color : "var(--app-border)", color: category === c.id ? c.color : "var(--text-muted)" }}>
                  {c.emoji} {c.label}
                </button>
              ))}
            </div>
            {category === "custom" && (
              <input value={customCategory} onChange={e => setCustomCategory(e.target.value)}
                placeholder="Nome da categoria personalizada"
                className="mt-3 w-full px-3 py-2.5 rounded-xl text-[13px] border outline-none"
                style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }} />
            )}
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>Prazo</p>
            <input type="month" value={deadline.slice(0, 7)} onChange={e => setDeadline(e.target.value + "-01")}
              className="w-full px-3 py-2.5 rounded-xl text-[14px] border outline-none"
              style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }} />
          </div>

          <button onClick={() => setStep("why")} disabled={!title.trim() || !deadline}
            className="w-full py-3 rounded-xl text-[14px] font-bold disabled:opacity-40 mt-2"
            style={{ background: cat.color, color: "#fff" }}>
            Continuar →
          </button>
        </div>
      )}

      {/* STEP 2: POR QUÊ */}
      {step === "why" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border-l-4 mb-2"
            style={{ background: `${cat.color}08`, borderColor: cat.color }}>
            <p className="text-[13px] font-semibold" style={{ color: cat.color }}>{emoji} {title}</p>
            <p className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)" }}>Prazo: {formatDeadline(deadline)}</p>
          </div>

          <div>
            <p className="text-[13px] font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Por que esta meta é importante para você?</p>
            <p className="text-[12px] mb-2" style={{ color: "var(--text-muted)" }}>Esta âncora emocional vai te manter motivado nos dias difíceis.</p>
            <textarea value={why} onChange={e => setWhy(e.target.value)} rows={3}
              placeholder="Ex: Quero provar para mim mesmo que consigo construir algo do zero e ajudar outras pessoas..."
              className="w-full px-3 py-2.5 rounded-xl text-[13px] border outline-none resize-none"
              style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)", fontFamily: "inherit" }}
              onFocus={e => (e.target.style.borderColor = cat.color)}
              onBlur={e => (e.target.style.borderColor = "var(--app-border-2)")} />
          </div>

          <div>
            <p className="text-[13px] font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Como será sua vida ao alcançar esta meta?</p>
            <p className="text-[12px] mb-2" style={{ color: "var(--text-muted)" }}>Opcional — mas poderoso para visualização.</p>
            <textarea value={vision} onChange={e => setVision(e.target.value)} rows={2}
              placeholder="Ex: Terei liberdade financeira para trabalhar no que amo e impactar pessoas..."
              className="w-full px-3 py-2.5 rounded-xl text-[13px] border outline-none resize-none"
              style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)", fontFamily: "inherit" }}
              onFocus={e => (e.target.style.borderColor = cat.color)}
              onBlur={e => (e.target.style.borderColor = "var(--app-border-2)")} />
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep("basic")}
              className="px-5 py-2.5 rounded-xl text-[13px] border"
              style={{ borderColor: "var(--app-border-2)", color: "var(--text-secondary)" }}>
              ← Voltar
            </button>
            <button onClick={() => setStep("milestones")}
              className="flex-1 py-2.5 rounded-xl text-[14px] font-bold"
              style={{ background: cat.color, color: "#fff" }}>
              Continuar →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: MARCOS */}
      {step === "milestones" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border-l-4 mb-2"
            style={{ background: `${cat.color}08`, borderColor: cat.color }}>
            <p className="text-[13px] font-semibold" style={{ color: cat.color }}>{emoji} {title}</p>
            {why && <p className="text-[11px] mt-1 italic" style={{ color: "var(--text-muted)" }}>"{why.slice(0, 80)}{why.length > 80 ? "..." : ""}"</p>}
          </div>

          <div>
            <p className="text-[13px] font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Marcos da jornada</p>
            <p className="text-[12px] mb-3" style={{ color: "var(--text-muted)" }}>
              Divide a meta em 3–5 resultados intermediários. Marcos são conquistas, não tarefas.
            </p>

            {milestones.length > 0 && (
              <div className="mb-3 p-3 rounded-xl border"
                style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
                {milestones.map((ms, i) => (
                  <div key={ms.id} className="flex items-center gap-2 py-1.5 border-b last:border-0"
                    style={{ borderColor: "var(--app-border)" }}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                    <span className="flex-1 text-[13px]" style={{ color: "var(--text-primary)" }}>{ms.title}</span>
                    <button onClick={() => setMilestones(prev => prev.filter((_, j) => j !== i))}
                      className="text-[11px] p-1 rounded" style={{ color: "var(--text-faint)" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--danger)"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-faint)"}>✕</button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <input value={newMs} onChange={e => setNewMs(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addMilestone()}
                placeholder="Ex: Conseguir minha primeira venda"
                className="flex-1 px-3 py-2 rounded-xl text-[13px] border outline-none"
                style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }}
                onFocus={e => (e.target.style.borderColor = cat.color)}
                onBlur={e => (e.target.style.borderColor = "var(--app-border-2)")} />
              <button onClick={addMilestone}
                className="px-4 py-2 rounded-xl text-[13px] font-bold"
                style={{ background: cat.color, color: "#fff" }}>
                +
              </button>
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <button onClick={() => setStep("why")}
              className="px-5 py-2.5 rounded-xl text-[13px] border"
              style={{ borderColor: "var(--app-border-2)", color: "var(--text-secondary)" }}>
              ← Voltar
            </button>
            <button onClick={save} disabled={!title.trim()}
              className="flex-1 py-2.5 rounded-xl text-[14px] font-bold disabled:opacity-40"
              style={{ background: cat.color, color: "#fff" }}>
              {initial ? "Salvar alterações" : "Criar meta"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── GOAL DETAIL ───────────────────────────────────────────
function GoalDetail({ goal, onBack, onEdit, onDelete }: {
  goal: Goal; onBack: () => void;
  onEdit: () => void; onDelete: () => void;
}) {
  const cat = GOAL_CATEGORIES.find(c => c.id === goal.category)!;
  const progress = calcProgress(goal);
  const days = daysUntilDeadline(goal.deadline);
  const [newMs, setNewMs] = useState("");

  async function toggleMilestone(msId: string) {
    const updated = goal.milestones.map(m =>
      m.id === msId ? { ...m, completed: !m.completed } : m
    );
    await updateGoal(goal.id, { milestones: updated });
  }

  async function editMilestone(msId: string, title: string) {
    const updated = goal.milestones.map(m => m.id === msId ? { ...m, title } : m);
    await updateGoal(goal.id, { milestones: updated });
  }

  async function deleteMilestone(msId: string) {
    const updated = goal.milestones.filter(m => m.id !== msId);
    await updateGoal(goal.id, { milestones: updated });
  }

  async function addMilestone(title: string) {
    const updated = [...goal.milestones, { id: genMilestoneId(), title, completed: false }];
    await updateGoal(goal.id, { milestones: updated });
  }

  return (
    <div className="max-w-2xl mx-auto px-8 py-8" style={{ background: "var(--app-bg)" }}>
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-[13px]" style={{ color: "var(--text-tertiary)" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Voltar
        </button>
        <div className="flex gap-2">
          <button onClick={onEdit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] transition-all"
            style={{ borderColor: "var(--app-border-2)", color: "var(--text-secondary)" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--app-bg-4)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1.5 10.5l1.2-.4 6.5-6.5-1-1-6.5 6.5-.2 1.4z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Editar
          </button>
          <button onClick={onDelete}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] transition-all"
            style={{ borderColor: "var(--app-border)", color: "var(--text-muted)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--danger)"; (e.currentTarget as HTMLElement).style.color = "var(--danger)"; (e.currentTarget as HTMLElement).style.background = "var(--danger-bg)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--app-border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 3h8M4.5 1h3M3 3l.7 8h4.6l.7-8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
            Excluir
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="p-6 rounded-2xl border mb-6"
        style={{ background: `${goal.color}08`, borderColor: `${goal.color}40`, borderLeft: `4px solid ${goal.color}` }}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-[36px]">{goal.emoji}</span>
            <div>
              <h1 className="text-[22px] font-bold" style={{ color: "var(--text-primary)" }}>{goal.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[12px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${goal.color}18`, color: goal.color }}>
                  {cat.emoji} {goal.category === "custom" ? goal.customCategory : cat.label}
                </span>
                <span className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                  {formatDeadline(goal.deadline)}
                  {days > 0 ? ` · ${days} dia${days !== 1 ? "s" : ""}` : days === 0 ? " · Hoje!" : " · Vencido"}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[32px] font-black" style={{ color: goal.color, lineHeight: 1 }}>{progress}%</div>
            <div className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)" }}>
              {goal.milestones.filter(m => m.completed).length}/{goal.milestones.length} marcos
            </div>
          </div>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: `${goal.color}20` }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: goal.color }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {goal.why && (
          <div className="p-4 rounded-xl border col-span-2" style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>Por que isso importa</p>
            <p className="text-[14px] italic leading-relaxed" style={{ color: "var(--text-secondary)", borderLeft: `3px solid ${goal.color}`, paddingLeft: 12 }}>
              "{goal.why}"
            </p>
          </div>
        )}
        {goal.vision && (
          <div className="p-4 rounded-xl border col-span-2" style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>Visão de chegada</p>
            <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>{goal.vision}</p>
          </div>
        )}
      </div>

      {/* Marcos */}
      <div className="p-5 rounded-2xl border" style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
        <p className="text-[13px] font-bold mb-4" style={{ color: "var(--text-primary)" }}>Marcos da jornada</p>
        {goal.milestones.length === 0 ? (
          <p className="text-[13px] py-3" style={{ color: "var(--text-muted)" }}>Nenhum marco definido ainda.</p>
        ) : (
          goal.milestones.map(ms => (
            <MilestoneItem key={ms.id} ms={ms} color={goal.color}
              onToggle={() => toggleMilestone(ms.id)}
              onEdit={t => editMilestone(ms.id, t)}
              onDelete={() => deleteMilestone(ms.id)} />
          ))
        )}
        <div className="flex gap-2 mt-4">
          <input value={newMs} onChange={e => setNewMs(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") { addMilestone(newMs); setNewMs(""); } }}
            placeholder="Adicionar marco..."
            className="flex-1 px-3 py-2 rounded-xl text-[13px] border outline-none"
            style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }}
            onFocus={e => (e.target.style.borderColor = goal.color)}
            onBlur={e => (e.target.style.borderColor = "var(--app-border-2)")} />
          <button onClick={() => { addMilestone(newMs); setNewMs(""); }} disabled={!newMs.trim()}
            className="px-4 py-2 rounded-xl text-[13px] font-bold disabled:opacity-40"
            style={{ background: goal.color, color: "#fff" }}>+</button>
        </div>
      </div>
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────
export default function GoalsPage() {
  const { user } = useAuthUser();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [screen, setScreen] = useState<Screen>("main");
  const [activeGoal, setActiveGoal] = useState<Goal | null>(null);
  const [filterCat, setFilterCat] = useState<GoalCategory | "all">("all");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    return subscribeToGoals(user.uid, data => { setGoals(data); setLoading(false); });
  }, [user]);

  const filtered = filterCat === "all" ? goals : goals.filter(g => g.category === filterCat);
  const active = goals.filter(g => g.status === "active");
  const completed = goals.filter(g => g.status === "completed");
  const avg = overallProgress(active);

  async function handleSaveGoal(data: Omit<Goal, "id" | "userId" | "createdAt" | "updatedAt">) {
    if (!user) return;
    if (activeGoal) {
      await updateGoal(activeGoal.id, data);
    } else {
      await createGoal(user.uid, data);
    }
    setScreen("main");
    setActiveGoal(null);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    await deleteGoal(deleteTarget);
    if (activeGoal?.id === deleteTarget) { setActiveGoal(null); setScreen("main"); }
    setDeleteTarget(null);
  }

  async function toggleGoalStatus(goal: Goal) {
    await updateGoal(goal.id, { status: goal.status === "completed" ? "active" : "completed" });
  }

  // ── SCREENS ──
  if (screen === "new-goal" || screen === "edit-goal") return (
    <GoalForm
      initial={screen === "edit-goal" ? activeGoal ?? undefined : undefined}
      onSave={handleSaveGoal}
      onCancel={() => { setScreen(activeGoal ? "goal-detail" : "main"); }}
    />
  );

  if (screen === "goal-detail" && activeGoal) {
    const freshGoal = goals.find(g => g.id === activeGoal.id) ?? activeGoal;
    return (
      <GoalDetail
        goal={freshGoal}
        onBack={() => { setScreen("main"); setActiveGoal(null); }}
        onEdit={() => setScreen("edit-goal")}
        onDelete={() => setDeleteTarget(freshGoal.id)}
      />
    );
  }

  // ── TELA PRINCIPAL ────────────────────────────────────
  return (
    <div className="flex flex-col h-screen" style={{ background: "var(--app-bg)" }}>

      {/* TOPBAR */}
      <div className="border-b flex-shrink-0" style={{ borderColor: "var(--app-border)" }}>
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-[22px] font-bold" style={{ color: "var(--text-primary)" }}>Metas</h1>
            {active.length > 0 && (
              <p className="text-[12px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                {active.length} ativa{active.length !== 1 ? "s" : ""} · média {avg}%
              </p>
            )}
          </div>
          <button onClick={() => { setActiveGoal(null); setScreen("new-goal"); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-bold transition-all hover:scale-[1.01]"
            style={{ background: "var(--gold)", color: "#000" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            Nova meta
          </button>
        </div>
      </div>

      {goals.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="text-[48px]">🎯</div>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--text-primary)" }}>Nenhuma meta ainda</h2>
          <p className="text-[14px] text-center max-w-sm" style={{ color: "var(--text-muted)" }}>
            Defina o que você quer alcançar, por que isso importa, e os marcos da jornada.
          </p>
          <button onClick={() => setScreen("new-goal")}
            className="px-6 py-3 rounded-xl text-[14px] font-bold mt-2"
            style={{ background: "var(--gold)", color: "#000" }}>
            Criar primeira meta
          </button>
        </div>
      ) : (
        <div className="flex flex-1 overflow-hidden">

          {/* MAIN */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto px-6 py-6">

              {/* Filtros por categoria */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
                <button onClick={() => setFilterCat("all")}
                  className="flex-shrink-0 px-3 py-1.5 rounded-xl text-[12px] font-semibold border transition-all"
                  style={{ background: filterCat === "all" ? "var(--gold-bg)" : "transparent", borderColor: filterCat === "all" ? "var(--gold)" : "var(--app-border)", color: filterCat === "all" ? "var(--gold)" : "var(--text-muted)" }}>
                  Todas
                </button>
                {GOAL_CATEGORIES.filter(c => goals.some(g => g.category === c.id)).map(cat => (
                  <button key={cat.id} onClick={() => setFilterCat(cat.id)}
                    className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold border transition-all"
                    style={{ background: filterCat === cat.id ? `${cat.color}18` : "transparent", borderColor: filterCat === cat.id ? cat.color : "var(--app-border)", color: filterCat === cat.id ? cat.color : "var(--text-muted)" }}>
                    {cat.emoji} {cat.label}
                  </button>
                ))}
              </div>

              {/* Meta em destaque */}
              {(() => {
                const featured = [...filtered.filter(g => g.status === "active")].sort((a, b) => calcProgress(b) - calcProgress(a))[0];
                if (!featured) return null;
                const cat = GOAL_CATEGORIES.find(c => c.id === featured.category)!;
                const prog = calcProgress(featured);
                const days = daysUntilDeadline(featured.deadline);
                return (
                  <div className="p-5 rounded-2xl border mb-4 cursor-pointer transition-all"
                    style={{ background: `${featured.color}08`, borderColor: `${featured.color}40`, borderLeft: `4px solid ${featured.color}` }}
                    onClick={() => { setActiveGoal(featured); setScreen("goal-detail"); }}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-[32px]">{featured.emoji}</span>
                        <div>
                          <h2 className="text-[18px] font-bold" style={{ color: "var(--text-primary)" }}>{featured.title}</h2>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                              style={{ background: `${featured.color}18`, color: featured.color }}>
                              {cat.emoji} {cat.label}
                            </span>
                            <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                              {formatDeadline(featured.deadline)} · {days > 0 ? `${days} dias` : "Vencido"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-[28px] font-black" style={{ color: featured.color, lineHeight: 1 }}>{prog}%</div>
                        <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                          {featured.milestones.filter(m => m.completed).length}/{featured.milestones.length} marcos
                        </div>
                      </div>
                    </div>
                    {featured.why && (
                      <p className="text-[13px] italic mb-3 pl-3 border-l-2"
                        style={{ color: "var(--text-secondary)", borderColor: featured.color }}>
                        "{featured.why.slice(0, 100)}{featured.why.length > 100 ? "..." : ""}"
                      </p>
                    )}
                    <div className="h-2 rounded-full overflow-hidden mb-3" style={{ background: `${featured.color}20` }}>
                      <div className="h-full rounded-full transition-all" style={{ width: `${prog}%`, background: featured.color }} />
                    </div>
                    <div className="flex gap-2 overflow-x-auto">
                      {featured.milestones.map(ms => (
                        <div key={ms.id}
                          className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] border"
                          style={{
                            background: ms.completed ? `${featured.color}15` : "transparent",
                            borderColor: ms.completed ? `${featured.color}50` : "var(--app-border)",
                            color: ms.completed ? featured.color : "var(--text-muted)",
                          }}>
                          {ms.completed && "✓ "}{ms.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Demais metas */}
              <div className="grid grid-cols-2 gap-3">
                {filtered.filter(g => {
                  const featured = [...filtered.filter(x => x.status === "active")].sort((a, b) => calcProgress(b) - calcProgress(a))[0];
                  return g.id !== featured?.id;
                }).map(goal => {
                  const cat = GOAL_CATEGORIES.find(c => c.id === goal.category)!;
                  const prog = calcProgress(goal);
                  const days = daysUntilDeadline(goal.deadline);
                  return (
                    <div key={goal.id}
                      className="p-4 rounded-2xl border cursor-pointer transition-all"
                      style={{
                        background: "var(--app-bg-2)",
                        borderColor: "var(--app-border)",
                        borderLeft: `3px solid ${goal.color}`,
                        opacity: goal.status === "completed" ? 0.7 : 1,
                      }}
                      onClick={() => { setActiveGoal(goal); setScreen("goal-detail"); }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = `${goal.color}60`}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--app-border)"}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[22px]">{goal.emoji}</span>
                          <div>
                            <p className="text-[14px] font-bold leading-tight"
                              style={{ color: goal.status === "completed" ? "var(--text-muted)" : "var(--text-primary)", textDecoration: goal.status === "completed" ? "line-through" : "none" }}>
                              {goal.title}
                            </p>
                            <p className="text-[10px] mt-0.5" style={{ color: "var(--text-faint)" }}>
                              {formatDeadline(goal.deadline)}
                            </p>
                          </div>
                        </div>
                        <span className="text-[16px] font-black flex-shrink-0 ml-2"
                          style={{ color: goal.color }}>{prog}%</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden mb-2" style={{ background: "var(--app-border)" }}>
                        <div className="h-full rounded-full transition-all" style={{ width: `${prog}%`, background: goal.color }} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px]" style={{ color: "var(--text-faint)" }}>
                          {goal.milestones.filter(m => m.completed).length}/{goal.milestones.length} marcos
                        </span>
                        {goal.status === "completed" ? (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                            style={{ background: "rgba(74,222,128,0.1)", color: "var(--success)" }}>Concluída</span>
                        ) : (
                          <span className="text-[10px]" style={{ color: days < 30 && days > 0 ? "#ef4444" : "var(--text-faint)" }}>
                            {days > 0 ? `${days}d` : days === 0 ? "Hoje" : "Vencido"}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="w-60 border-l flex-shrink-0 overflow-y-auto px-4 py-5"
            style={{ borderColor: "var(--app-border)", background: "var(--app-bg-2)" }}>

            <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>Visão geral</p>
            <div className="grid grid-cols-2 gap-2 mb-5">
              {[
                { label: "Ativas", value: active.length, color: "var(--gold)" },
                { label: "Concluídas", value: completed.length, color: "var(--success)" },
                { label: "Média geral", value: `${avg}%`, color: "var(--text-primary)" },
                { label: "Marcos", value: goals.reduce((s, g) => s + g.milestones.filter(m => m.completed).length, 0), color: "var(--text-primary)" },
              ].map(m => (
                <div key={m.label} className="p-3 rounded-xl border"
                  style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border)" }}>
                  <p className="text-[10px] mb-1" style={{ color: "var(--text-muted)" }}>{m.label}</p>
                  <p className="text-[20px] font-black" style={{ color: m.color, lineHeight: 1 }}>{m.value}</p>
                </div>
              ))}
            </div>

            <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>Por categoria</p>
            <div className="space-y-3 mb-5">
              {GOAL_CATEGORIES.filter(cat => goals.some(g => g.category === cat.id)).map(cat => {
                const catGoals = goals.filter(g => g.category === cat.id && g.status === "active");
                if (!catGoals.length) return null;
                const pct = Math.round(catGoals.reduce((s, g) => s + calcProgress(g), 0) / catGoals.length);
                return (
                  <div key={cat.id}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[12px]">{cat.emoji}</span>
                        <span className="text-[12px] font-medium" style={{ color: "var(--text-secondary)" }}>{cat.label}</span>
                      </div>
                      <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>{pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--app-border)" }}>
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: cat.color }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3 rounded-xl border" style={{ borderColor: "var(--app-border)", background: "var(--app-bg-3)" }}>
              <p className="text-[11px] font-bold mb-1" style={{ color: "var(--text-primary)" }}>✦ Meta inteligente</p>
              <p className="text-[11px] mb-2" style={{ color: "var(--text-muted)" }}>
                Descreva sua meta e a IA sugere os marcos automaticamente.
              </p>
              <div className="text-[10px] px-2 py-1 rounded-lg text-center"
                style={{ background: "var(--app-bg-4)", color: "var(--text-faint)" }}>
                Em breve
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <ConfirmModal title="Excluir meta?" description="Esta meta e todos os seus marcos serão removidos permanentemente."
          confirmLabel="Excluir" cancelLabel="Cancelar" variant="danger"
          onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      )}
    </div>
  );
}
