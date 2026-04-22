"use client";
import { useState, useEffect, useRef } from "react";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useUserPlan } from "@/lib/useUserPlan";
import ConfirmModal from "@/components/ConfirmModal";
import {
  RoutineBlock, RoutineTemplate, DayLog, CategoryType, RepeatType,
  CATEGORIES, PRESET_TEMPLATES,
  subscribeToTemplates, subscribeToLogs,
  createTemplate, updateTemplate, deleteTemplate, logDay,
  getBlocksForDate, getWeekDates, getTodayStr,
  formatDateLabel, formatDateShort, minutesDiff, formatDuration,
} from "@/lib/routineService";

const REPEAT_LABELS: Record<RepeatType, string> = {
  daily: "Todo dia", weekdays: "Dias úteis", weekends: "Fins de semana",
  custom: "Personalizado", once: "Uma vez",
};

const WEEK_DAY_LABELS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function genId() { return `b_${Date.now()}_${Math.random().toString(36).slice(2)}`; }

type Screen = "main" | "templates" | "new-template" | "edit-block";

export default function RoutinePage() {
  const { user } = useAuthUser();
  const { isPremium } = useUserPlan();

  const [templates, setTemplates] = useState<RoutineTemplate[]>([]);
  const [logs, setLogs] = useState<DayLog[]>([]);
  const [activeTemplate, setActiveTemplate] = useState<RoutineTemplate | null>(null);
  const [selectedDate, setSelectedDate] = useState(getTodayStr());
  const [screen, setScreen] = useState<Screen>("main");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Template form
  const [tplName, setTplName] = useState("");
  const [tplEmoji, setTplEmoji] = useState("📋");
  const [tplBlocks, setTplBlocks] = useState<RoutineBlock[]>([]);

  // Block form
  const [editingBlock, setEditingBlock] = useState<RoutineBlock | null>(null);
  const [blockTitle, setBlockTitle] = useState("");
  const [blockEmoji, setBlockEmoji] = useState("⭐");
  const [blockStart, setBlockStart] = useState("08:00");
  const [blockEnd, setBlockEnd] = useState("09:00");
  const [blockCategory, setBlockCategory] = useState<CategoryType>("work");
  const [blockRepeat, setBlockRepeat] = useState<RepeatType>("daily");
  const [blockRepeatDays, setBlockRepeatDays] = useState<number[]>([]);
  const [blockFlexible, setBlockFlexible] = useState(false);
  const [blockNotes, setBlockNotes] = useState("");

  const weekDates = getWeekDates();
  const today = getTodayStr();
  const todayLog = logs.find(l => l.date === selectedDate);
  const completed = todayLog?.completedBlocks ?? [];
  const activeBlocks = activeTemplate ? getBlocksForDate(activeTemplate.blocks, selectedDate) : [];
  const completionPct = activeBlocks.length > 0
    ? Math.round((completed.filter(id => activeBlocks.find(b => b.id === id)).length / activeBlocks.length) * 100)
    : 0;

  useEffect(() => {
    if (!user) return;
    const u1 = subscribeToTemplates(user.uid, data => {
      setTemplates(data);
      if (data.length > 0 && !activeTemplate) setActiveTemplate(data[0]);
      setLoading(false);
    });
    const u2 = subscribeToLogs(user.uid, setLogs);
    return () => { u1(); u2(); };
  }, [user]);

  async function toggleBlock(blockId: string) {
    if (!user) return;
    const newCompleted = completed.includes(blockId)
      ? completed.filter(id => id !== blockId)
      : [...completed, blockId];
    await logDay(user.uid, selectedDate, newCompleted, todayLog?.mood);
  }

  async function handleSaveTemplate() {
    if (!user || !tplName.trim()) return;
    await createTemplate(user.uid, { name: tplName, emoji: tplEmoji, blocks: tplBlocks, isPreset: false });
    setTplName(""); setTplEmoji("📋"); setTplBlocks([]);
    setScreen("main");
  }

  async function handleDeleteTemplate() {
    if (!deleteTarget) return;
    await deleteTemplate(deleteTarget);
    if (activeTemplate?.id === deleteTarget) setActiveTemplate(templates.find(t => t.id !== deleteTarget) ?? null);
    setDeleteTarget(null);
  }

  async function handleUsePreset(preset: typeof PRESET_TEMPLATES[0]) {
    if (!user) return;
    await createTemplate(user.uid, { ...preset, isPreset: false });
    setScreen("main");
  }

  function openNewBlock() {
    setEditingBlock(null);
    setBlockTitle(""); setBlockEmoji("⭐"); setBlockStart("08:00"); setBlockEnd("09:00");
    setBlockCategory("work"); setBlockRepeat("daily"); setBlockRepeatDays([]); setBlockFlexible(false); setBlockNotes("");
    setScreen("edit-block");
  }

  function openEditBlock(block: RoutineBlock) {
    setEditingBlock(block);
    setBlockTitle(block.title); setBlockEmoji(block.emoji); setBlockStart(block.startTime);
    setBlockEnd(block.endTime); setBlockCategory(block.category); setBlockRepeat(block.repeat);
    setBlockRepeatDays(block.repeatDays ?? []); setBlockFlexible(block.flexible); setBlockNotes(block.notes ?? "");
    setScreen("edit-block");
  }

  function handleSaveBlock() {
    const cat = CATEGORIES.find(c => c.id === blockCategory)!;
    const block: RoutineBlock = {
      id: editingBlock?.id ?? genId(),
      title: blockTitle, emoji: blockEmoji,
      startTime: blockStart, endTime: blockEnd,
      category: blockCategory, repeat: blockRepeat,
      repeatDays: blockRepeat === "custom" ? blockRepeatDays : undefined,
      flexible: blockFlexible, notes: blockNotes, color: cat.color,
    };
    if (activeTemplate) {
      const updatedBlocks = editingBlock
        ? activeTemplate.blocks.map(b => b.id === editingBlock.id ? block : b)
        : [...activeTemplate.blocks, block];
      updateTemplate(activeTemplate.id, { blocks: updatedBlocks });
      setActiveTemplate({ ...activeTemplate, blocks: updatedBlocks });
    } else {
      setTplBlocks(prev => editingBlock ? prev.map(b => b.id === editingBlock.id ? block : b) : [...prev, block]);
    }
    setScreen(activeTemplate ? "main" : "new-template");
  }

  function removeBlockFromTemplate(blockId: string) {
    if (!activeTemplate) return;
    const updated = activeTemplate.blocks.filter(b => b.id !== blockId);
    updateTemplate(activeTemplate.id, { blocks: updated });
    setActiveTemplate({ ...activeTemplate, blocks: updated });
  }

  // ── TELA: EDITAR BLOCO ─────────────────────────────────
  if (screen === "edit-block") return (
    <div className="max-w-lg mx-auto px-8 py-8" style={{ background: "var(--app-bg)", minHeight: "100vh" }}>
      <button onClick={() => setScreen(activeTemplate ? "main" : "new-template")}
        className="flex items-center gap-2 text-[13px] mb-6 transition-colors"
        style={{ color: "var(--text-tertiary)" }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Voltar
      </button>
      <h2 className="text-[20px] font-bold mb-6" style={{ color: "var(--text-primary)" }}>
        {editingBlock ? "Editar bloco" : "Novo bloco"}
      </h2>

      <div className="space-y-4">
        <div className="flex gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>Emoji</p>
            <input value={blockEmoji} onChange={e => setBlockEmoji(e.target.value)}
              className="w-14 h-10 text-center text-[22px] rounded-xl border outline-none"
              style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }}
            />
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>Título</p>
            <input value={blockTitle} onChange={e => setBlockTitle(e.target.value)}
              placeholder="Ex: Exercício matinal"
              className="w-full px-3 py-2.5 rounded-xl text-[14px] border outline-none"
              style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }}
              onFocus={e => (e.target.style.borderColor = "var(--gold)")}
              onBlur={e => (e.target.style.borderColor = "var(--app-border-2)")}
              autoFocus
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>Início</p>
            <input type="time" value={blockStart} onChange={e => setBlockStart(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl text-[14px] border outline-none"
              style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }}
            />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>Fim</p>
            <input type="time" value={blockEnd} onChange={e => setBlockEnd(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl text-[14px] border outline-none"
              style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }}
            />
          </div>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>Categoria</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setBlockCategory(cat.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold border transition-all"
                style={{
                  background: blockCategory === cat.id ? `${cat.color}18` : "transparent",
                  borderColor: blockCategory === cat.id ? cat.color : "var(--app-border)",
                  color: blockCategory === cat.id ? cat.color : "var(--text-muted)",
                }}>
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>Repetição</p>
          <div className="flex flex-wrap gap-2">
            {(Object.entries(REPEAT_LABELS) as [RepeatType, string][]).map(([key, label]) => (
              <button key={key} onClick={() => setBlockRepeat(key)}
                className="px-3 py-1.5 rounded-xl text-[12px] font-semibold border transition-all"
                style={{
                  background: blockRepeat === key ? "var(--gold-bg)" : "transparent",
                  borderColor: blockRepeat === key ? "var(--gold)" : "var(--app-border)",
                  color: blockRepeat === key ? "var(--gold)" : "var(--text-muted)",
                }}>
                {label}
              </button>
            ))}
          </div>
          {blockRepeat === "custom" && (
            <div className="flex gap-2 mt-3">
              {WEEK_DAY_LABELS.map((d, i) => (
                <button key={i}
                  onClick={() => setBlockRepeatDays(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])}
                  className="w-9 h-9 rounded-xl text-[12px] font-bold border transition-all"
                  style={{
                    background: blockRepeatDays.includes(i) ? "var(--gold-bg)" : "transparent",
                    borderColor: blockRepeatDays.includes(i) ? "var(--gold)" : "var(--app-border)",
                    color: blockRepeatDays.includes(i) ? "var(--gold)" : "var(--text-muted)",
                  }}>
                  {d[0]}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between py-3 px-4 rounded-xl border"
          style={{ borderColor: "var(--app-border)", background: "var(--app-bg-2)" }}>
          <div>
            <p className="text-[13px] font-semibold" style={{ color: "var(--text-primary)" }}>Bloco flexível</p>
            <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>Pode ser feito a qualquer hora dentro do dia</p>
          </div>
          <button onClick={() => setBlockFlexible(f => !f)}
            className="w-11 h-6 rounded-full transition-all relative"
            style={{ background: blockFlexible ? "var(--gold)" : "var(--app-border-2)" }}>
            <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all shadow-sm"
              style={{ left: blockFlexible ? "22px" : "2px" }} />
          </button>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>Notas (opcional)</p>
          <textarea value={blockNotes} onChange={e => setBlockNotes(e.target.value)}
            placeholder="Detalhes adicionais..."
            rows={2}
            className="w-full px-3 py-2.5 rounded-xl text-[13px] border outline-none resize-none"
            style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)", fontFamily: "inherit" }}
          />
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button onClick={handleSaveBlock} disabled={!blockTitle.trim()}
          className="flex-1 py-3 rounded-xl text-[14px] font-bold disabled:opacity-50 transition-all"
          style={{ background: "var(--gold)", color: "#000" }}>
          {editingBlock ? "Salvar alterações" : "Adicionar bloco"}
        </button>
        <button onClick={() => setScreen(activeTemplate ? "main" : "new-template")}
          className="px-6 py-3 rounded-xl text-[14px] border"
          style={{ borderColor: "var(--app-border-2)", color: "var(--text-secondary)" }}>
          Cancelar
        </button>
      </div>
    </div>
  );

  // ── TELA: TEMPLATES ────────────────────────────────────
  if (screen === "templates") return (
    <div className="max-w-2xl mx-auto px-8 py-8" style={{ background: "var(--app-bg)", minHeight: "100vh" }}>
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => setScreen("main")}
          className="flex items-center gap-2 text-[13px]" style={{ color: "var(--text-tertiary)" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Voltar
        </button>
      </div>
      <h2 className="text-[22px] font-bold mb-2" style={{ color: "var(--text-primary)" }}>Templates de rotina</h2>
      <p className="text-[13px] mb-8" style={{ color: "var(--text-muted)" }}>Escolha um pré-definido ou crie do zero.</p>

      <div className="mb-8">
        <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>Pré-definidos</p>
        <div className="grid grid-cols-2 gap-3">
          {PRESET_TEMPLATES.map((preset, i) => (
            <div key={i} className="p-4 rounded-2xl border transition-all"
              style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[22px]">{preset.emoji}</span>
                <p className="text-[14px] font-bold" style={{ color: "var(--text-primary)" }}>{preset.name}</p>
              </div>
              <p className="text-[12px] mb-3" style={{ color: "var(--text-muted)" }}>{preset.blocks.length} blocos</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {Array.from(new Set(preset.blocks.map(b => b.category))).map(cat => {
                  const c = CATEGORIES.find(x => x.id === cat)!;
                  return (
                    <span key={cat} className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                      style={{ background: `${c.color}15`, color: c.color }}>
                      {c.emoji} {c.label}
                    </span>
                  );
                })}
              </div>
              <button onClick={() => handleUsePreset(preset)}
                className="w-full py-2 rounded-xl text-[12px] font-bold transition-all hover:scale-[1.02]"
                style={{ background: "var(--gold)", color: "#000" }}>
                Usar este template
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>Meus templates</p>
        {templates.length === 0 ? (
          <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>Nenhum template criado ainda.</p>
        ) : (
          <div className="space-y-2">
            {templates.map(tpl => (
              <div key={tpl.id} className="flex items-center gap-3 p-4 rounded-xl border"
                style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
                <span className="text-[20px]">{tpl.emoji}</span>
                <div className="flex-1">
                  <p className="text-[14px] font-semibold" style={{ color: "var(--text-primary)" }}>{tpl.name}</p>
                  <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>{tpl.blocks.length} blocos</p>
                </div>
                <button onClick={() => { setActiveTemplate(tpl); setScreen("main"); }}
                  className="px-3 py-1.5 rounded-lg text-[12px] font-bold"
                  style={{ background: "var(--gold)", color: "#000" }}>Usar</button>
                <button onClick={() => setDeleteTarget(tpl.id)}
                  className="p-2 rounded-lg transition-all" style={{ color: "var(--text-muted)" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#ef4444"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 3h9M5 1h3M3.5 3l.7 8.5h4.6l.7-8.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            ))}
          </div>
        )}
        <button onClick={() => { setTplName(""); setTplEmoji("📋"); setTplBlocks([]); setScreen("new-template"); }}
          className="mt-4 w-full py-3 rounded-xl text-[13px] font-bold border border-dashed transition-all"
          style={{ borderColor: "var(--app-border-2)", color: "var(--text-muted)" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--app-border-2)"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}>
          + Criar template do zero
        </button>
      </div>

      {deleteTarget && (
        <ConfirmModal title="Excluir template?" description="Este template será removido permanentemente."
          confirmLabel="Excluir" cancelLabel="Cancelar" variant="danger"
          onConfirm={handleDeleteTemplate} onCancel={() => setDeleteTarget(null)} />
      )}
    </div>
  );

  // ── TELA: NOVO TEMPLATE ────────────────────────────────
  if (screen === "new-template") return (
    <div className="max-w-lg mx-auto px-8 py-8" style={{ background: "var(--app-bg)", minHeight: "100vh" }}>
      <button onClick={() => setScreen("templates")}
        className="flex items-center gap-2 text-[13px] mb-6" style={{ color: "var(--text-tertiary)" }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Voltar
      </button>
      <h2 className="text-[20px] font-bold mb-6" style={{ color: "var(--text-primary)" }}>Novo template</h2>

      <div className="flex gap-3 mb-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>Emoji</p>
          <input value={tplEmoji} onChange={e => setTplEmoji(e.target.value)}
            className="w-14 h-10 text-center text-[22px] rounded-xl border outline-none"
            style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }}
          />
        </div>
        <div className="flex-1">
          <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>Nome do template</p>
          <input value={tplName} onChange={e => setTplName(e.target.value)}
            placeholder="Ex: Minha rotina matinal"
            className="w-full px-3 py-2.5 rounded-xl text-[14px] border outline-none"
            style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }}
            autoFocus
          />
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
            Blocos ({tplBlocks.length})
          </p>
          <button onClick={openNewBlock}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold"
            style={{ background: "var(--gold)", color: "#000" }}>
            + Adicionar bloco
          </button>
        </div>
        {tplBlocks.length === 0 ? (
          <div className="py-8 text-center border border-dashed rounded-xl" style={{ borderColor: "var(--app-border)" }}>
            <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>Nenhum bloco ainda</p>
          </div>
        ) : (
          <div className="space-y-2">
            {tplBlocks.sort((a, b) => a.startTime.localeCompare(b.startTime)).map(block => {
              const cat = CATEGORIES.find(c => c.id === block.category)!;
              return (
                <div key={block.id} className="flex items-center gap-3 p-3 rounded-xl border"
                  style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
                  <span className="text-[18px]">{block.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold truncate" style={{ color: "var(--text-primary)" }}>{block.title}</p>
                    <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                      {block.startTime} – {block.endTime} · {REPEAT_LABELS[block.repeat]}
                    </p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${cat.color}15`, color: cat.color }}>{cat.label}</span>
                  <button onClick={() => openEditBlock(block)} style={{ color: "var(--text-muted)" }}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 11l1.5-.5 7-7-1-1-7 7L2 11z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                  <button onClick={() => setTplBlocks(prev => prev.filter(b => b.id !== block.id))} style={{ color: "var(--text-muted)" }}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 3h9M5 1h3M3.5 3l.7 8.5h4.6l.7-8.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-4">
        <button onClick={handleSaveTemplate} disabled={!tplName.trim()}
          className="flex-1 py-3 rounded-xl text-[14px] font-bold disabled:opacity-50"
          style={{ background: "var(--gold)", color: "#000" }}>
          Salvar template
        </button>
        <button onClick={() => setScreen("templates")}
          className="px-6 py-3 rounded-xl text-[14px] border"
          style={{ borderColor: "var(--app-border-2)", color: "var(--text-secondary)" }}>
          Cancelar
        </button>
      </div>
    </div>
  );

  // ── TELA PRINCIPAL ─────────────────────────────────────
  return (
    <div className="flex flex-col h-screen" style={{ background: "var(--app-bg)" }}>

      {/* TOPBAR */}
      <div className="flex items-center justify-between px-6 py-3 border-b flex-shrink-0"
        style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
        <div>
          <h1 className="text-[16px] font-bold" style={{ color: "var(--text-primary)" }}>Rotina</h1>
          {activeTemplate && (
            <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
              {activeTemplate.emoji} {activeTemplate.name}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setScreen("templates")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border text-[13px] font-semibold transition-all"
            style={{ borderColor: "var(--app-border-2)", color: "var(--text-secondary)" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--app-bg-4)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1"/><rect x="7" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1"/><rect x="1" y="7" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1"/><rect x="7" y="7" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1"/></svg>
            Templates
          </button>
          {activeTemplate && (
            <button onClick={openNewBlock}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-bold transition-all hover:scale-[1.02]"
              style={{ background: "var(--gold)", color: "#000" }}>
              + Bloco
            </button>
          )}
        </div>
      </div>

      {!activeTemplate ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center border"
            style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border)" }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="3" y="5" width="22" height="20" rx="3" stroke="var(--text-muted)" strokeWidth="1.5"/>
              <path d="M3 11h22M9 3v4M19 3v4" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h2 className="text-[18px] font-bold" style={{ color: "var(--text-primary)" }}>Nenhuma rotina ainda</h2>
          <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>Escolha um template para começar</p>
          <button onClick={() => setScreen("templates")}
            className="px-6 py-3 rounded-xl text-[14px] font-bold"
            style={{ background: "var(--gold)", color: "#000" }}>
            Ver templates
          </button>
        </div>
      ) : (
        <div className="flex flex-1 overflow-hidden">

          {/* MAIN: Timeline do dia */}
          <div className="flex-1 overflow-y-auto">

            {/* Mini semana */}
            <div className="px-6 py-3 border-b" style={{ borderColor: "var(--app-border)" }}>
              <div className="flex gap-1">
                {weekDates.map((date) => {
                  const dayBlocks = getBlocksForDate(activeTemplate.blocks, date);
                  const dayLog = logs.find(l => l.date === date);
                  const dayCompleted = dayBlocks.length > 0 &&
                    (dayLog?.completedBlocks ?? []).filter(id => dayBlocks.find(b => b.id === id)).length === dayBlocks.length;
                  const isSelected = date === selectedDate;
                  const isToday = date === today;
                  return (
                    <button key={date} onClick={() => setSelectedDate(date)}
                      className="flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition-all border"
                      style={{ background: isSelected ? "var(--gold-bg)" : "transparent", borderColor: isSelected ? "var(--gold)" : "transparent" }}>
                      <span className="text-[10px] uppercase font-bold"
                        style={{ color: isSelected ? "var(--gold)" : "var(--text-faint)" }}>
                        {formatDateShort(date)}
                      </span>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold"
                        style={{
                          background: isToday && isSelected ? "var(--gold)" : isToday ? "var(--gold-bg)" : "transparent",
                          color: isToday && isSelected ? "#000" : isSelected ? "var(--gold)" : "var(--text-secondary)",
                          border: isToday && !isSelected ? "1.5px solid var(--gold)" : "none",
                        }}>
                        {new Date(date + "T12:00:00").getDate()}
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full"
                        style={{ background: dayCompleted ? "#4ade80" : dayBlocks.length > 0 ? "var(--gold)" : "transparent" }} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dia selecionado */}
            <div className="px-6 py-6 max-w-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-[18px] font-bold capitalize" style={{ color: "var(--text-primary)" }}>
                    {formatDateLabel(selectedDate)}
                  </h2>
                  <p className="text-[12px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {activeBlocks.length} bloco{activeBlocks.length !== 1 ? "s" : ""} planejado{activeBlocks.length !== 1 ? "s" : ""}
                    {activeBlocks.length > 0 && ` · ${formatDuration(activeBlocks.reduce((sum, b) => sum + minutesDiff(b.startTime, b.endTime), 0))} total`}
                  </p>
                </div>
              </div>

              {activeBlocks.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-[14px]" style={{ color: "var(--text-muted)" }}>Nenhum bloco para este dia</p>
                  <p className="text-[12px] mt-1" style={{ color: "var(--text-faint)" }}>Este template não tem blocos para esta repetição</p>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute left-[46px] top-0 bottom-0 w-0.5 rounded-full"
                    style={{ background: "var(--app-border)" }} />
                  <div className="space-y-3">
                    {activeBlocks.map(block => {
                      const cat = CATEGORIES.find(c => c.id === block.category)!;
                      const isDone = completed.includes(block.id);
                      const duration = minutesDiff(block.startTime, block.endTime);
                      return (
                        <div key={block.id} className="flex gap-3 items-start">
                          <div className="text-[11px] font-medium w-10 text-right pt-3 flex-shrink-0"
                            style={{ color: "var(--text-faint)" }}>
                            {block.startTime}
                          </div>
                          <div className="w-2.5 h-2.5 rounded-full mt-3.5 flex-shrink-0 z-10"
                            style={{ background: block.color, boxShadow: "0 0 0 3px var(--app-bg)" }} />
                          <div
                            className="flex-1 rounded-xl border p-3 transition-all group cursor-pointer"
                            style={{
                              background: isDone ? `${block.color}08` : "var(--app-bg-2)",
                              borderColor: isDone ? `${block.color}40` : "var(--app-border)",
                              opacity: isDone ? 0.7 : 1,
                            }}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <span className="text-[16px]">{block.emoji}</span>
                                  <span className="text-[14px] font-semibold"
                                    style={{ color: block.color, textDecoration: isDone ? "line-through" : "none" }}>
                                    {block.title}
                                  </span>
                                  {block.flexible && (
                                    <span className="text-[9px] px-1.5 py-0.5 rounded-full"
                                      style={{ background: "var(--app-bg-4)", color: "var(--text-faint)" }}>flexível</span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                                    {block.startTime} – {block.endTime} · {formatDuration(duration)}
                                  </span>
                                  <span className="text-[10px] px-1.5 py-0.5 rounded-full"
                                    style={{ background: `${cat.color}15`, color: cat.color }}>
                                    {cat.emoji} {cat.label}
                                  </span>
                                  <span className="text-[10px]" style={{ color: "var(--text-faint)" }}>
                                    {REPEAT_LABELS[block.repeat]}
                                  </span>
                                </div>
                                {block.notes && (
                                  <p className="text-[11px] mt-1" style={{ color: "var(--text-muted)" }}>{block.notes}</p>
                                )}
                              </div>
                              <div className="flex items-center gap-1.5 flex-shrink-0">
                                <button onClick={() => openEditBlock(block)}
                                  className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                                  style={{ color: "var(--text-muted)" }}
                                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--app-bg-4)"}
                                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}>
                                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1.5 10.5l1.2-.4 6.5-6.5-1-1-6.5 6.5-.2 1.4z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </button>
                                <button onClick={() => removeBlockFromTemplate(block.id)}
                                  className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                                  style={{ color: "var(--text-muted)" }}
                                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#ef4444"; (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.1)"; }}
                                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2.5h8M4.5 1h3M3 2.5l.7 8h4.6l.7-8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
                                </button>
                                <button onClick={() => toggleBlock(block.id)}
                                  className="w-7 h-7 rounded-lg flex items-center justify-center border-2 transition-all"
                                  style={{
                                    borderColor: isDone ? "#4ade80" : `${block.color}50`,
                                    background: isDone ? "rgba(74,222,128,0.15)" : "transparent",
                                    color: "#4ade80",
                                  }}>
                                  {isDone && (
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SIDE: Stats */}
          <div className="w-64 border-l flex-shrink-0 overflow-y-auto px-4 py-5"
            style={{ borderColor: "var(--app-border)", background: "var(--app-bg-2)" }}>

            <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
              {selectedDate === today ? "Hoje" : formatDateShort(selectedDate)}
            </p>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-[32px] font-black" style={{ color: "var(--gold)", lineHeight: 1 }}>{completionPct}%</span>
              <span className="text-[12px] mb-1" style={{ color: "var(--text-muted)" }}>
                {completed.filter(id => activeBlocks.find(b => b.id === id)).length}/{activeBlocks.length} blocos
              </span>
            </div>
            <div className="h-2 rounded-full overflow-hidden mb-5" style={{ background: "var(--app-border)" }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${completionPct}%`, background: "var(--gold)" }} />
            </div>

            <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>Por categoria</p>
            <div className="space-y-3 mb-5">
              {CATEGORIES.map(cat => {
                const catBlocks = activeBlocks.filter(b => b.category === cat.id);
                if (catBlocks.length === 0) return null;
                const catDone = catBlocks.filter(b => completed.includes(b.id)).length;
                const pct = Math.round((catDone / catBlocks.length) * 100);
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

            <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>Seus templates</p>
            <div className="space-y-1.5">
              {templates.map(tpl => (
                <button key={tpl.id} onClick={() => setActiveTemplate(tpl)}
                  className="w-full text-left px-3 py-2 rounded-xl transition-all border text-[13px] font-medium"
                  style={{
                    background: activeTemplate?.id === tpl.id ? "var(--gold-bg)" : "transparent",
                    borderColor: activeTemplate?.id === tpl.id ? "var(--gold)" : "transparent",
                    color: activeTemplate?.id === tpl.id ? "var(--gold)" : "var(--text-secondary)",
                  }}>
                  {tpl.emoji} {tpl.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
