"use client";
import { useState, useEffect } from "react";
import { useAuthUser } from "@/hooks/useAuthUser";
import ConfirmModal from "@/components/ConfirmModal";
import {
  RoutineBlock, RoutineTemplate, CategoryType, RepeatType,
  CATEGORIES, PRESET_TEMPLATES, WEEK_DAYS,
  subscribeToTemplates, subscribeToLogs,
  createTemplate, updateTemplate, deleteTemplate, logDay,
  getBlocksForDate, getTemplatesForDate, getWeekDates, getTodayStr,
  formatDateLabel, formatDateShort, minutesDiff, formatDuration,
  makeBlock, scheduleDaysLabel,
} from "@/lib/routineService";

const REPEAT_LABELS: Record<RepeatType, string> = {
  daily: "Todo dia", weekdays: "Dias úteis", weekends: "Fim de semana",
  custom: "Personalizado", once: "Uma vez",
};

type Screen = "main" | "templates" | "preset-preview" | "new-template" | "edit-template";

// ── BLOCK FORM ────────────────────────────────────────────
function BlockForm({ initial, onSave, onCancel }: {
  initial?: RoutineBlock;
  onSave: (b: RoutineBlock) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [emoji, setEmoji] = useState(initial?.emoji ?? "⭐");
  const [start, setStart] = useState(initial?.startTime ?? "08:00");
  const [end, setEnd] = useState(initial?.endTime ?? "09:00");
  const [category, setCategory] = useState<CategoryType>(initial?.category ?? "personal");
  const [repeat, setRepeat] = useState<RepeatType>(initial?.repeat ?? "daily");
  const [repeatDays, setRepeatDays] = useState<number[]>(initial?.repeatDays ?? []);
  const [flexible, setFlexible] = useState(initial?.flexible ?? false);
  const [notes, setNotes] = useState(initial?.notes ?? "");

  function save() {
    const cat = CATEGORIES.find(c => c.id === category)!;
    onSave({
      id: initial?.id ?? makeBlock().id,
      title, emoji, startTime: start, endTime: end,
      category, repeat,
      repeatDays: repeat === "custom" ? repeatDays : [],
      flexible, notes, color: cat.color,
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>Emoji</p>
          <input value={emoji} onChange={e => setEmoji(e.target.value)}
            className="w-14 h-10 text-center text-[22px] rounded-xl border outline-none"
            style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }} />
        </div>
        <div className="flex-1">
          <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>Título</p>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex: Exercício matinal" autoFocus
            className="w-full px-3 py-2.5 rounded-xl text-[14px] border outline-none"
            style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }}
            onFocus={e => (e.target.style.borderColor = "var(--gold)")}
            onBlur={e => (e.target.style.borderColor = "var(--app-border-2)")} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>Início</p>
          <input type="time" value={start} onChange={e => setStart(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl text-[14px] border outline-none"
            style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }} />
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>Fim</p>
          <input type="time" value={end} onChange={e => setEnd(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl text-[14px] border outline-none"
            style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }} />
        </div>
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>Categoria</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setCategory(cat.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold border transition-all"
              style={{ background: category === cat.id ? `${cat.color}18` : "transparent", borderColor: category === cat.id ? cat.color : "var(--app-border)", color: category === cat.id ? cat.color : "var(--text-muted)" }}>
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>Repetição</p>
        <div className="flex flex-wrap gap-2">
          {(Object.entries(REPEAT_LABELS) as [RepeatType, string][]).map(([key, label]) => (
            <button key={key} onClick={() => setRepeat(key)}
              className="px-3 py-1.5 rounded-xl text-[12px] font-semibold border transition-all"
              style={{ background: repeat === key ? "var(--gold-bg)" : "transparent", borderColor: repeat === key ? "var(--gold)" : "var(--app-border)", color: repeat === key ? "var(--gold)" : "var(--text-muted)" }}>
              {label}
            </button>
          ))}
        </div>
        {repeat === "custom" && (
          <div className="flex gap-2 mt-3">
            {WEEK_DAYS.map((d, i) => (
              <button key={i} onClick={() => setRepeatDays(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])}
                className="w-9 h-9 rounded-xl text-[12px] font-bold border transition-all"
                style={{ background: repeatDays.includes(i) ? "var(--gold-bg)" : "transparent", borderColor: repeatDays.includes(i) ? "var(--gold)" : "var(--app-border)", color: repeatDays.includes(i) ? "var(--gold)" : "var(--text-muted)" }}>
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
          <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>Pode ser feito a qualquer hora do dia</p>
        </div>
        <button onClick={() => setFlexible(f => !f)}
          className="w-11 h-6 rounded-full transition-all relative"
          style={{ background: flexible ? "var(--gold)" : "var(--app-border-2)" }}>
          <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all shadow-sm"
            style={{ left: flexible ? "22px" : "2px" }} />
        </button>
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>Notas</p>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Detalhes opcionais..." rows={2}
          className="w-full px-3 py-2.5 rounded-xl text-[13px] border outline-none resize-none"
          style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)", fontFamily: "inherit" }} />
      </div>
      <div className="flex gap-3">
        <button onClick={save} disabled={!title.trim()}
          className="flex-1 py-3 rounded-xl text-[14px] font-bold disabled:opacity-50"
          style={{ background: "var(--gold)", color: "#000" }}>
          {initial ? "Salvar alterações" : "Adicionar bloco"}
        </button>
        <button onClick={onCancel}
          className="px-6 py-3 rounded-xl text-[14px] border"
          style={{ borderColor: "var(--app-border-2)", color: "var(--text-secondary)" }}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

// ── TEMPLATE FORM ─────────────────────────────────────────
function TemplateForm({ initial, onSave, onCancel, title: formTitle }: {
  initial?: RoutineTemplate;
  onSave: (name: string, emoji: string, blocks: RoutineBlock[], scheduleDays: number[]) => void;
  onCancel: () => void;
  title: string;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [emoji, setEmoji] = useState(initial?.emoji ?? "📋");
  const [blocks, setBlocks] = useState<RoutineBlock[]>(initial?.blocks ?? []);
  const [scheduleDays, setScheduleDays] = useState<number[]>(initial?.scheduleDays ?? [0,1,2,3,4,5,6]);
  const [editingBlock, setEditingBlock] = useState<RoutineBlock | "new" | null>(null);

  if (editingBlock !== null) return (
    <div className="max-w-lg mx-auto px-8 py-8" style={{ background: "var(--app-bg)" }}>
      <h2 className="text-[20px] font-bold mb-6" style={{ color: "var(--text-primary)" }}>
        {editingBlock === "new" ? "Novo bloco" : "Editar bloco"}
      </h2>
      <BlockForm
        initial={editingBlock === "new" ? undefined : editingBlock}
        onSave={b => { setBlocks(prev => editingBlock === "new" ? [...prev, b] : prev.map(x => x.id === b.id ? b : x)); setEditingBlock(null); }}
        onCancel={() => setEditingBlock(null)}
      />
    </div>
  );

  return (
    <div className="max-w-lg mx-auto px-8 py-8" style={{ background: "var(--app-bg)" }}>
      <button onClick={onCancel} className="flex items-center gap-2 text-[13px] mb-6" style={{ color: "var(--text-tertiary)" }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Voltar
      </button>
      <h2 className="text-[20px] font-bold mb-6" style={{ color: "var(--text-primary)" }}>{formTitle}</h2>
      <div className="flex gap-3 mb-5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>Emoji</p>
          <input value={emoji} onChange={e => setEmoji(e.target.value)}
            className="w-14 h-10 text-center text-[22px] rounded-xl border outline-none"
            style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }} />
        </div>
        <div className="flex-1">
          <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>Nome</p>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Minha rotina matinal" autoFocus
            className="w-full px-3 py-2.5 rounded-xl text-[14px] border outline-none"
            style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }}
            onFocus={e => (e.target.style.borderColor = "var(--gold)")}
            onBlur={e => (e.target.style.borderColor = "var(--app-border-2)")} />
        </div>
      </div>
      <div className="mb-5">
        <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>Aplicar nos dias</p>
        <div className="flex gap-1.5 mb-2">
          {WEEK_DAYS.map((d, i) => (
            <button key={i} onClick={() => setScheduleDays(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])}
              className="flex-1 py-2 rounded-xl text-[12px] font-bold border transition-all"
              style={{ background: scheduleDays.includes(i) ? "var(--gold-bg)" : "transparent", borderColor: scheduleDays.includes(i) ? "var(--gold)" : "var(--app-border)", color: scheduleDays.includes(i) ? "var(--gold)" : "var(--text-muted)" }}>
              {d}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {[["Dias úteis", [1,2,3,4,5]], ["Fim de semana", [0,6]], ["Todos os dias", [0,1,2,3,4,5,6]]].map(([label, days]) => (
            <button key={label as string} onClick={() => setScheduleDays(days as number[])}
              className="text-[11px] px-3 py-1 rounded-lg border transition-all"
              style={{ borderColor: "var(--app-border)", color: "var(--text-muted)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--app-border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}>
              {label as string}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>Blocos ({blocks.length})</p>
          <button onClick={() => setEditingBlock("new")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold"
            style={{ background: "var(--gold)", color: "#000" }}>
            + Adicionar bloco
          </button>
        </div>
        {blocks.length === 0 ? (
          <div className="py-8 text-center border border-dashed rounded-xl" style={{ borderColor: "var(--app-border)" }}>
            <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>Nenhum bloco ainda</p>
          </div>
        ) : (
          <div className="space-y-2">
            {[...blocks].sort((a, b) => a.startTime.localeCompare(b.startTime)).map(block => {
              const cat = CATEGORIES.find(c => c.id === block.category)!;
              return (
                <div key={block.id} className="flex items-center gap-3 p-3 rounded-xl border"
                  style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
                  <span className="text-[18px]">{block.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold truncate" style={{ color: "var(--text-primary)" }}>{block.title}</p>
                    <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>{block.startTime} – {block.endTime} · {REPEAT_LABELS[block.repeat]}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: `${cat.color}15`, color: cat.color }}>{cat.emoji}</span>
                  <button onClick={() => setEditingBlock(block)} style={{ color: "var(--text-muted)" }}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 11l1.5-.5 7-7-1-1-7 7L2 11z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                  <button onClick={() => setBlocks(prev => prev.filter(b => b.id !== block.id))} style={{ color: "var(--text-muted)" }}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 3h9M5 1h3M3.5 3l.7 8.5h4.6l.7-8.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="flex gap-3">
        <button onClick={() => onSave(name, emoji, blocks, scheduleDays)} disabled={!name.trim()}
          className="flex-1 py-3 rounded-xl text-[14px] font-bold disabled:opacity-50"
          style={{ background: "var(--gold)", color: "#000" }}>
          Salvar template
        </button>
        <button onClick={onCancel}
          className="px-6 py-3 rounded-xl text-[14px] border"
          style={{ borderColor: "var(--app-border-2)", color: "var(--text-secondary)" }}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

// ── PRESET PREVIEW ────────────────────────────────────────
function PresetPreview({ preset, onConfirm, onBack }: {
  preset: typeof PRESET_TEMPLATES[0];
  onConfirm: (scheduleDays: number[]) => void;
  onBack: () => void;
}) {
  const [scheduleDays, setScheduleDays] = useState<number[]>(preset.scheduleDays);

  return (
    <div className="max-w-2xl mx-auto px-8 py-8" style={{ background: "var(--app-bg)" }}>
      <button onClick={onBack} className="flex items-center gap-2 text-[13px] mb-6" style={{ color: "var(--text-tertiary)" }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Voltar aos templates
      </button>
      <div className="flex items-center gap-4 mb-6">
        <span className="text-[40px]">{preset.emoji}</span>
        <div>
          <h2 className="text-[22px] font-bold" style={{ color: "var(--text-primary)" }}>{preset.name}</h2>
          <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>{preset.blocks.length} blocos pré-configurados</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {Array.from(new Set(preset.blocks.map(b => b.category))).map(catId => {
          const cat = CATEGORIES.find(c => c.id === catId)!;
          return (
            <span key={catId} className="text-[11px] px-2.5 py-1 rounded-full font-semibold"
              style={{ background: `${cat.color}15`, color: cat.color }}>
              {cat.emoji} {cat.label}
            </span>
          );
        })}
      </div>
      <div className="p-4 rounded-2xl border mb-6" style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
        <p className="text-[13px] font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Em quais dias aplicar?</p>
        <div className="flex gap-1.5 mb-3">
          {WEEK_DAYS.map((d, i) => (
            <button key={i} onClick={() => setScheduleDays(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])}
              className="flex-1 py-2 rounded-xl text-[12px] font-bold border transition-all"
              style={{ background: scheduleDays.includes(i) ? "var(--gold-bg)" : "transparent", borderColor: scheduleDays.includes(i) ? "var(--gold)" : "var(--app-border)", color: scheduleDays.includes(i) ? "var(--gold)" : "var(--text-muted)" }}>
              {d}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {[["Dias úteis", [1,2,3,4,5]], ["Fim de semana", [0,6]], ["Todos os dias", [0,1,2,3,4,5,6]]].map(([label, days]) => (
            <button key={label as string} onClick={() => setScheduleDays(days as number[])}
              className="text-[11px] px-3 py-1 rounded-lg border transition-all"
              style={{ borderColor: "var(--app-border)", color: "var(--text-muted)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--app-border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}>
              {label as string}
            </button>
          ))}
        </div>
      </div>
      <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>Blocos incluídos</p>
      <div className="space-y-2 mb-6 max-h-64 overflow-y-auto">
        {[...preset.blocks].sort((a, b) => a.startTime.localeCompare(b.startTime)).map(block => {
          const cat = CATEGORIES.find(c => c.id === block.category)!;
          return (
            <div key={block.id} className="flex items-center gap-3 px-4 py-3 rounded-xl border"
              style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
              <span className="text-[16px]">{block.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold" style={{ color: "var(--text-primary)" }}>{block.title}</p>
                <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                  {block.startTime} – {block.endTime} · {formatDuration(minutesDiff(block.startTime, block.endTime))}
                </p>
              </div>
              <span className="text-[10px] px-2 py-1 rounded-full flex-shrink-0"
                style={{ background: `${cat.color}15`, color: cat.color }}>
                {cat.emoji} {cat.label}
              </span>
            </div>
          );
        })}
      </div>
      <button onClick={() => onConfirm(scheduleDays)} disabled={scheduleDays.length === 0}
        className="w-full py-3.5 rounded-xl text-[15px] font-bold disabled:opacity-40 transition-all hover:scale-[1.01]"
        style={{ background: "var(--gold)", color: "#000" }}>
        Criar template e começar
      </button>
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────
export default function RoutinePage() {
  const { user } = useAuthUser();
  const [templates, setTemplates] = useState<RoutineTemplate[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(getTodayStr());
  const [screen, setScreen] = useState<Screen>("main");
  const [editingTemplate, setEditingTemplate] = useState<RoutineTemplate | null>(null);
  const [previewPreset, setPreviewPreset] = useState<typeof PRESET_TEMPLATES[0] | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const weekDates = getWeekDates();
  const today = getTodayStr();
  const dayEntries = getBlocksForDate(templates, selectedDate);
  const todayLog = logs.find(l => l.date === selectedDate);
  const completed = todayLog?.completedBlocks ?? [];
  const totalBlocks = dayEntries.length;
  const doneBlocks = dayEntries.filter(e => completed.includes(e.block.id)).length;
  const completionPct = totalBlocks > 0 ? Math.round((doneBlocks / totalBlocks) * 100) : 0;
  const activeTemplatesForDay = getTemplatesForDate(templates, selectedDate);

  useEffect(() => {
    if (!user) return;
    const u1 = subscribeToTemplates(user.uid, setTemplates);
    const u2 = subscribeToLogs(user.uid, setLogs);
    return () => { u1(); u2(); };
  }, [user]);

  async function toggleBlock(blockId: string) {
    if (!user) return;
    const newCompleted = completed.includes(blockId) ? completed.filter((id: string) => id !== blockId) : [...completed, blockId];
    await logDay(user.uid, selectedDate, newCompleted, todayLog?.mood);
  }

  async function handleUsePreset(preset: typeof PRESET_TEMPLATES[0], scheduleDays: number[]) {
    if (!user) return;
    await createTemplate(user.uid, { ...preset, scheduleDays });
    setPreviewPreset(null);
    setScreen("main");
  }

  async function handleSaveNewTemplate(name: string, emoji: string, blocks: RoutineBlock[], scheduleDays: number[]) {
    if (!user || !name.trim()) return;
    await createTemplate(user.uid, { name, emoji, blocks, scheduleDays, isPreset: false });
    setScreen("main");
  }

  async function handleSaveEditTemplate(name: string, emoji: string, blocks: RoutineBlock[], scheduleDays: number[]) {
    if (!editingTemplate || !name.trim()) return;
    await updateTemplate(editingTemplate.id, { name, emoji, blocks, scheduleDays });
    setEditingTemplate(null);
    setScreen("main");
  }

  async function handleDeleteTemplate() {
    if (!deleteTarget) return;
    await deleteTemplate(deleteTarget);
    setDeleteTarget(null);
  }

  // ── SCREENS ──
  if (screen === "preset-preview" && previewPreset) return (
    <PresetPreview
      preset={previewPreset}
      onConfirm={days => handleUsePreset(previewPreset, days)}
      onBack={() => { setPreviewPreset(null); setScreen("templates"); }}
    />
  );

  if (screen === "new-template") return (
    <TemplateForm title="Novo template" onSave={handleSaveNewTemplate} onCancel={() => setScreen("templates")} />
  );

  if (screen === "edit-template" && editingTemplate) return (
    <TemplateForm title="Editar template" initial={editingTemplate}
      onSave={handleSaveEditTemplate}
      onCancel={() => { setEditingTemplate(null); setScreen("main"); }} />
  );

  if (screen === "templates") return (
    <div className="max-w-2xl mx-auto px-8 py-8" style={{ background: "var(--app-bg)" }}>
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => setScreen("main")} className="flex items-center gap-2 text-[13px]" style={{ color: "var(--text-tertiary)" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Voltar
        </button>
        <button onClick={() => setScreen("new-template")}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-bold"
          style={{ background: "var(--gold)", color: "#000" }}>
          + Criar do zero
        </button>
      </div>

      <h2 className="text-[22px] font-bold mb-2" style={{ color: "var(--text-primary)" }}>Templates</h2>
      <p className="text-[13px] mb-8" style={{ color: "var(--text-muted)" }}>Escolha um pré-definido ou crie o seu próprio.</p>

      {templates.length > 0 && (
        <div className="mb-8">
          <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>Meus templates</p>
          <div className="space-y-2">
            {templates.map(tpl => (
              <div key={tpl.id} className="flex items-center gap-3 p-4 rounded-xl border"
                style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
                <span className="text-[22px]">{tpl.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold" style={{ color: "var(--text-primary)" }}>{tpl.name}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {(tpl.blocks ?? []).length} blocos · {scheduleDaysLabel(tpl.scheduleDays)}
                  </p>
                </div>
                <button onClick={() => { setEditingTemplate(tpl); setScreen("edit-template"); }}
                  className="p-2 rounded-lg transition-all" style={{ color: "var(--text-muted)" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12l1.5-.5 8-8-1-1-8 8L2 12z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button onClick={() => setDeleteTarget(tpl.id)}
                  className="p-2 rounded-lg transition-all" style={{ color: "var(--text-muted)" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--danger)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 3.5h9M5.5 1.5h3M4 3.5l.7 9h4.6l.7-9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>Pré-definidos</p>
      <div className="grid grid-cols-2 gap-3">
        {PRESET_TEMPLATES.map((preset, i) => {
          const uniqueCats = Array.from(new Set(preset.blocks.map(b => b.category)));
          return (
            <div key={i} className="p-4 rounded-2xl border flex flex-col"
              style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[22px]">{preset.emoji}</span>
                <p className="text-[14px] font-bold" style={{ color: "var(--text-primary)" }}>{preset.name}</p>
              </div>
              <p className="text-[11px] mb-3" style={{ color: "var(--text-muted)" }}>
                {preset.blocks.length} blocos · {scheduleDaysLabel(preset.scheduleDays)}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {uniqueCats.map(catId => {
                  const cat = CATEGORIES.find(c => c.id === catId)!;
                  return (
                    <span key={catId} className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                      style={{ background: `${cat.color}15`, color: cat.color }}>
                      {cat.emoji} {cat.label}
                    </span>
                  );
                })}
              </div>
              <div className="mt-auto">
                <button onClick={() => { setPreviewPreset(preset); setScreen("preset-preview"); }}
                  className="w-full py-2 rounded-xl text-[12px] font-bold transition-all hover:scale-[1.01]"
                  style={{ background: "var(--gold)", color: "#000" }}>
                  Ver e usar
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {deleteTarget && (
        <ConfirmModal title="Excluir template?" description="Este template será removido permanentemente."
          confirmLabel="Excluir" cancelLabel="Cancelar" variant="danger"
          onConfirm={handleDeleteTemplate} onCancel={() => setDeleteTarget(null)} />
      )}
    </div>
  );

  // ── TELA PRINCIPAL ────────────────────────────────────
  return (
    <div className="flex flex-col h-screen" style={{ background: "var(--app-bg)" }}>

      {/* TOPBAR */}
      <div className="flex-shrink-0 border-b" style={{ borderColor: "var(--app-border)", background: "var(--app-bg-2)" }}>
        <div className="flex items-start justify-between gap-4 px-8 py-5">
          {/* Lado esquerdo — título e info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-[24px] font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>Rotina</h1>
            <p className="text-[12px] mt-0.5" style={{ color: "var(--text-muted)" }}>
              {selectedDate === today
                ? `Hoje · ${dayEntries.length} bloco${dayEntries.length !== 1 ? "s" : ""}`
                : `${formatDateShort(selectedDate)} · ${dayEntries.length} bloco${dayEntries.length !== 1 ? "s" : ""}`}
            </p>
            {activeTemplatesForDay.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-[11px]" style={{ color: "var(--text-faint)" }}>Ativos:</span>
                {activeTemplatesForDay.map(tpl => (
                  <div key={tpl.id}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[12px] font-semibold border"
                    style={{ background: "var(--gold-bg)", borderColor: "var(--gold)", color: "var(--gold)" }}>
                    {tpl.emoji} {tpl.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Lado direito — botão Templates */}
          <button onClick={() => setScreen("templates")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[13px] font-semibold transition-all flex-shrink-0"
            style={{ borderColor: "var(--app-border-2)", color: "var(--text-secondary)", background: "var(--app-bg-3)" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--gold-bg)"; el.style.borderColor = "var(--gold)"; el.style.color = "var(--gold)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--app-bg-3)"; el.style.borderColor = "var(--app-border-2)"; el.style.color = "var(--text-secondary)"; }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1"/>
              <rect x="7" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1"/>
              <rect x="1" y="7" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1"/>
              <rect x="7" y="7" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1"/>
            </svg>
            Templates
          </button>
        </div>
      </div>

      {templates.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="text-[44px]">📅</div>
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

          {/* MAIN — ocupa todo o espaço menos a sidebar */}
          <div className="flex-1 overflow-y-auto">

            {/* Mini semana — ocupa TODA a largura disponível */}
            <div className="border-b" style={{ borderColor: "var(--app-border)" }}>
              <div className="px-8 py-3">
                <div className="flex gap-1">
                  {weekDates.map(date => {
                    const dayTemplates = getTemplatesForDate(templates, date);
                    const dayBlocks = getBlocksForDate(templates, date);
                    const dayLog = logs.find((l: any) => l.date === date);
                    const dayDone = dayBlocks.length > 0 && dayBlocks.every(e => (dayLog?.completedBlocks ?? []).includes(e.block.id));
                    const isSelected = date === selectedDate;
                    const isToday = date === today;
                    return (
                      <button key={date} onClick={() => setSelectedDate(date)}
                        className="flex-1 flex flex-col items-center gap-1 py-3 rounded-xl transition-all border"
                        style={{
                          background: isSelected ? "var(--gold-bg)" : "transparent",
                          borderColor: isSelected ? "var(--gold)" : "transparent",
                        }}>
                        <span className="text-[11px] uppercase font-bold tracking-wide"
                          style={{ color: isSelected ? "var(--gold)" : "var(--text-faint)" }}>
                          {formatDateShort(date)}
                        </span>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-[15px] font-bold"
                          style={{
                            background: isToday && isSelected ? "var(--gold)" : isToday ? "var(--gold-bg)" : "transparent",
                            color: isToday && isSelected ? "#000" : isSelected ? "var(--gold)" : "var(--text-primary)",
                            border: isToday && !isSelected ? "2px solid var(--gold)" : "none",
                          }}>
                          {new Date(date + "T12:00:00").getDate()}
                        </div>
                        <div className="flex gap-0.5">
                          {dayTemplates.slice(0, 3).map(t => (
                            <div key={t.id} className="w-1.5 h-1.5 rounded-full"
                              style={{ background: dayDone ? "#4ade80" : "var(--gold)" }} />
                          ))}
                          {dayTemplates.length === 0 && (
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "transparent" }} />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Conteúdo do dia */}
            <div className="px-8 py-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-[20px] font-bold capitalize" style={{ color: "var(--text-primary)" }}>
                    {formatDateLabel(selectedDate)}
                  </h2>
                  <p className="text-[13px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {dayEntries.length === 0
                      ? "Nenhum bloco para este dia"
                      : `${dayEntries.length} bloco${dayEntries.length !== 1 ? "s" : ""} · ${formatDuration(dayEntries.reduce((s, e) => s + minutesDiff(e.block.startTime, e.block.endTime), 0))} planejado${dayEntries.length !== 1 ? "s" : ""}`}
                  </p>
                </div>
              </div>

              {/* Templates ativos + adicionar */}
              {activeTemplatesForDay.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {activeTemplatesForDay.map(tpl => (
                    <div key={tpl.id}
                      className="flex items-center gap-1.5 pl-3 pr-1.5 py-1.5 rounded-xl border text-[12px] font-semibold group"
                      style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border-2)", color: "var(--text-secondary)" }}>
                      <span>{tpl.emoji}</span>
                      <span>{tpl.name}</span>
                      <div className="flex items-center gap-0.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { setEditingTemplate(tpl); setScreen("edit-template"); }}
                          className="w-6 h-6 rounded-md flex items-center justify-center transition-all"
                          style={{ color: "var(--text-faint)" }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--app-bg-4)"; (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-faint)"; }}>
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 8.5l1-.3 5.5-5.5-.7-.7-5.5 5.5-.3 1z" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
                        </button>
                        <button onClick={() => setDeleteTarget(tpl.id)}
                          className="w-6 h-6 rounded-md flex items-center justify-center transition-all"
                          style={{ color: "var(--text-faint)" }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--danger-bg)"; (e.currentTarget as HTMLElement).style.color = "var(--danger)"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-faint)"; }}>
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => setScreen("templates")}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl border text-[12px] font-semibold border-dashed transition-all"
                    style={{ borderColor: "var(--app-border-2)", color: "var(--text-faint)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--app-border-2)"; (e.currentTarget as HTMLElement).style.color = "var(--text-faint)"; }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                    Adicionar
                  </button>
                </div>
              )}

              {dayEntries.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-[15px]" style={{ color: "var(--text-muted)" }}>Nenhum bloco para este dia</p>
                  <p className="text-[13px] mt-2" style={{ color: "var(--text-faint)" }}>
                    Seus templates não têm blocos para este dia da semana
                  </p>
                  <button onClick={() => setScreen("templates")}
                    className="mt-4 px-5 py-2.5 rounded-xl text-[13px] font-bold"
                    style={{ background: "var(--gold)", color: "#000" }}>
                    Gerenciar templates
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute left-[46px] top-0 bottom-0 w-0.5 rounded-full"
                    style={{ background: "var(--app-border)" }} />
                  <div className="space-y-3">
                    {dayEntries.map(({ block, templateId, templateName, templateEmoji }) => {
                      const cat = CATEGORIES.find(c => c.id === block.category)!;
                      const isDone = completed.includes(block.id);
                      const duration = minutesDiff(block.startTime, block.endTime);
                      return (
                        <div key={`${templateId}-${block.id}`} className="flex gap-3 items-start">
                          <div className="text-[11px] font-medium w-10 text-right pt-3.5 flex-shrink-0"
                            style={{ color: "var(--text-faint)" }}>
                            {block.startTime}
                          </div>
                          <div className="w-2.5 h-2.5 rounded-full mt-4 flex-shrink-0 z-10"
                            style={{ background: block.color, boxShadow: "0 0 0 3px var(--app-bg)" }} />
                          <div
                            title={`${templateEmoji} ${templateName}`}
                            className="flex-1 p-4 transition-all group overflow-hidden relative"
                            style={{
                              background: isDone ? `${block.color}08` : "var(--app-bg-2)",
                              borderTop: `1px solid ${isDone ? `${block.color}40` : "var(--app-border)"}`,
                              borderRight: `1px solid ${isDone ? `${block.color}40` : "var(--app-border)"}`,
                              borderBottom: `1px solid ${isDone ? `${block.color}40` : "var(--app-border)"}`,
                              borderLeft: `3px solid ${block.color}`,
                              borderRadius: "16px",
                              opacity: isDone ? 0.75 : 1,
                            }}>
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1.5">
                                  <span className="text-[18px]">{block.emoji}</span>
                                  <span className="text-[15px] font-bold"
                                    style={{ color: block.color, textDecoration: isDone ? "line-through" : "none" }}>
                                    {block.title}
                                  </span>
                                  {block.flexible && (
                                    <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold"
                                      style={{ background: "var(--app-bg-4)", color: "var(--text-faint)" }}>
                                      flexível
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                                    {block.startTime} – {block.endTime} · {formatDuration(duration)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[11px] px-2 py-0.5 rounded-full"
                                    style={{ background: `${cat.color}15`, color: cat.color }}>
                                    {cat.emoji} {cat.label}
                                  </span>
                                  <span className="text-[10px] px-2 py-0.5 rounded-full"
                                    style={{ background: "var(--app-bg-4)", color: "var(--text-faint)" }}>
                                    {templateEmoji} {templateName}
                                  </span>
                                </div>
                                {block.notes && (
                                  <p className="text-[12px] mt-1.5" style={{ color: "var(--text-muted)" }}>{block.notes}</p>
                                )}
                              </div>
                              <button onClick={() => toggleBlock(block.id)}
                                className="w-8 h-8 rounded-xl flex items-center justify-center transition-all flex-shrink-0 mt-0.5"
                                style={{
                                  borderTop: `2px solid ${isDone ? "#4ade80" : `${block.color}50`}`,
                                  borderRight: `2px solid ${isDone ? "#4ade80" : `${block.color}50`}`,
                                  borderBottom: `2px solid ${isDone ? "#4ade80" : `${block.color}50`}`,
                                  borderLeft: `2px solid ${isDone ? "#4ade80" : `${block.color}50`}`,
                                  borderRadius: "12px",
                                  background: isDone ? "rgba(74,222,128,0.15)" : "transparent",
                                  color: "#4ade80",
                                }}>
                                {isDone && (
                                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                                    <path d="M2.5 6.5l3 3 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                )}
                              </button>
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

          {/* SIDEBAR */}
          <div className="w-56 border-l flex-shrink-0 overflow-y-auto px-5 py-6"
            style={{ borderColor: "var(--app-border)", background: "var(--app-bg-2)" }}>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
              {selectedDate === today ? "Hoje" : formatDateShort(selectedDate)}
            </p>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-[32px] font-black" style={{ color: "var(--gold)", lineHeight: 1 }}>{completionPct}%</span>
              <span className="text-[12px] mb-1" style={{ color: "var(--text-muted)" }}>{doneBlocks}/{totalBlocks}</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden mb-5" style={{ background: "var(--app-border)" }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${completionPct}%`, background: "var(--gold)" }} />
            </div>

            <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>Por categoria</p>
            <div className="space-y-3 mb-5">
              {CATEGORIES.map(cat => {
                const catEntries = dayEntries.filter(e => e.block.category === cat.id);
                if (catEntries.length === 0) return null;
                const catDone = catEntries.filter(e => completed.includes(e.block.id)).length;
                const pct = Math.round((catDone / catEntries.length) * 100);
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

            <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>Templates</p>
            <div className="space-y-1.5 mb-4">
              {templates.map(tpl => {
                const isActive = getTemplatesForDate([tpl], selectedDate).length > 0;
                return (
                  <div key={tpl.id}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-[12px] font-medium border transition-all cursor-pointer"
                    style={{ background: isActive ? "var(--gold-bg)" : "transparent", borderColor: isActive ? "var(--gold)" : "transparent", color: isActive ? "var(--gold)" : "var(--text-secondary)" }}
                    onClick={() => { setEditingTemplate(tpl); setScreen("edit-template"); }}>
                    <span>{tpl.emoji}</span>
                    <span className="flex-1 truncate">{tpl.name}</span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--gold)" }} />}
                  </div>
                );
              })}
            </div>
            <button onClick={() => setScreen("templates")}
              className="w-full py-2 rounded-xl text-[12px] font-bold border transition-all"
              style={{ borderColor: "var(--app-border-2)", color: "var(--text-muted)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--app-border-2)"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}>
              Gerenciar templates
            </button>
          </div>
        </div>
      )}

      {deleteTarget && (
        <ConfirmModal title="Excluir template?" description="Este template será removido permanentemente."
          confirmLabel="Excluir" cancelLabel="Cancelar" variant="danger"
          onConfirm={handleDeleteTemplate} onCancel={() => setDeleteTarget(null)} />
      )}
    </div>
  );
}
