"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useUserPlan } from "@/lib/useUserPlan";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/ConfirmModal";
import {
  DiaryEntry, subscribeToEntries, getOrCreateTodayEntry,
  updateEntry, deleteEntry, calculateStreak,
  formatDateLabel, formatDateShort, getTodayDate,
  MOOD_EMOJIS, MOOD_LABELS, MOOD_COLORS,
  getWeekDays, getMonthGrid,
} from "@/lib/diaryService";
import { getDailyPrompt } from "@/lib/diaryPrompts";

const HIGHLIGHT_COLORS = [
  { color: "#D4AF37", bg: "rgba(212,175,55,0.28)", label: "Dourado" },
  { color: "#f87171", bg: "rgba(248,113,113,0.22)", label: "Vermelho" },
  { color: "#4ade80", bg: "rgba(74,222,128,0.22)", label: "Verde" },
  { color: "#60a5fa", bg: "rgba(96,165,250,0.22)", label: "Azul" },
];

function groupByMonth(entries: DiaryEntry[]) {
  const groups: Record<string, DiaryEntry[]> = {};
  entries.forEach((e) => {
    const key = e.date.slice(0, 7);
    if (!groups[key]) groups[key] = [];
    groups[key].push(e);
  });
  return groups;
}

function monthLabel(key: string) {
  const [year, month] = key.split("-");
  return new Date(parseInt(year), parseInt(month) - 1)
    .toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
}

function getWeekRangeLabel(days: { date: string; num: number }[]) {
  if (!days.length) return "";
  const first = new Date(days[0].date + "T12:00:00");
  const last = new Date(days[days.length - 1].date + "T12:00:00");
  const firstMonth = first.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");
  const lastMonth = last.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");
  if (firstMonth === lastMonth) {
    return `${days[0].num} – ${days[days.length - 1].num} de ${lastMonth} ${last.getFullYear()}`;
  }
  return `${days[0].num} ${firstMonth} – ${days[days.length - 1].num} ${lastMonth} ${last.getFullYear()}`;
}

export default function DiarioPage() {
  const { user, userData } = useAuthUser();
  const { isPremium } = useUserPlan();
  const router = useRouter();

  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [activeEntry, setActiveEntry] = useState<DiaryEntry | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<number | null>(null);
  const [showPanel, setShowPanel] = useState(false);
  const [panelSearch, setPanelSearch] = useState("");
  const [panelFilter, setPanelFilter] = useState<"all" | "favorites" | "bookmarked">("all");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [calendarMode, setCalendarMode] = useState<"week" | "month">("week");
  const [weekRef, setWeekRef] = useState(new Date());
  const [monthRef, setMonthRef] = useState({ year: new Date().getFullYear(), month: new Date().getMonth() });
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const [toolbarPos, setToolbarPos] = useState({ top: 0, left: 0 });

  const saveTimer = useRef<NodeJS.Timeout | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const today = getTodayDate();
  const sevenDays = getWeekDays(weekRef);
  const streak = calculateStreak(entries);
  const canCreate = isPremium || entries.length < ((userData?.limits as any)?.dailyNotes ?? 5);
  const dailyPrompt = getDailyPrompt(mood);

  useEffect(() => {
    if (!user) return;
    const unsub = subscribeToEntries(user.uid, (data) => {
      setEntries(data);
      setLoading(false);
    });
    return unsub;
  }, [user]);

  useEffect(() => {
    if (!user || loading) return;
    loadEntry(today);
  }, [user, loading]);

  async function loadEntry(date: string) {
    if (!user) return;
    const existing = entries.find((e) => e.date === date);
    if (existing) {
      setActiveEntry(existing);
      setTitle(existing.title);
      setContent(existing.content);
      setMood(existing.mood ?? null);
    } else if (date === today) {
      if (!canCreate) { router.push("/planos-app"); return; }
      const entry = await getOrCreateTodayEntry(user.uid);
      setActiveEntry(entry);
      setTitle(""); setContent(""); setMood(null);
    } else {
      setActiveEntry(null);
      setTitle(""); setContent(""); setMood(null);
    }
  }

  const triggerSave = useCallback((newTitle: string, newContent: string) => {
    if (!activeEntry) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setSaving(true);
    saveTimer.current = setTimeout(async () => {
      await updateEntry(activeEntry.id, { title: newTitle, content: newContent }, user?.uid);
      setSaving(false);
      setLastSaved(new Date());
    }, 800);
  }, [activeEntry, user?.uid]);

  async function handleMoodSelect(m: number) {
    if (!activeEntry) return;
    const newMood = mood === m ? null : m;
    setMood(newMood);
    setActiveEntry({ ...activeEntry, mood: newMood });
    await updateEntry(activeEntry.id, { mood: newMood });
  }

  async function handleToggleFavorite() {
    if (!activeEntry) return;
    const v = !activeEntry.favorite;
    await updateEntry(activeEntry.id, { favorite: v });
    setActiveEntry({ ...activeEntry, favorite: v });
  }

  async function handleToggleBookmark() {
    if (!activeEntry) return;
    const v = !activeEntry.bookmarked;
    await updateEntry(activeEntry.id, { bookmarked: v });
    setActiveEntry({ ...activeEntry, bookmarked: v });
  }

  async function handleDeleteConfirm() {
    if (!deleteTarget) return;
    await deleteEntry(deleteTarget);
    if (activeEntry?.id === deleteTarget) {
      setActiveEntry(null); setTitle(""); setContent(""); setMood(null);
    }
    setDeleteTarget(null);
  }

  function selectDayEntry(date: string) {
    const entry = entries.find((e) => e.date === date);
    if (entry) {
      setActiveEntry(entry); setTitle(entry.title);
      setContent(entry.content); setMood(entry.mood ?? null);
    } else if (date === today) {
      loadEntry(today);
    } else {
      setActiveEntry(null); setTitle(""); setContent(""); setMood(null);
    }
  }

  function navigateWeek(dir: number) {
    const d = new Date(weekRef);
    d.setDate(d.getDate() + dir * 7);
    if (d > new Date()) return;
    setWeekRef(d);
  }

  function navigateMonth(dir: number) {
    let { year, month } = monthRef;
    month += dir;
    if (month < 0) { month = 11; year--; }
    if (month > 11) { month = 0; year++; }
    const now = new Date();
    if (year > now.getFullYear() || (year === now.getFullYear() && month > now.getMonth())) return;
    setMonthRef({ year, month });
  }

  function checkSelection() {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.toString().trim()) {
      setToolbarVisible(false); return;
    }
    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const edRect = editorRef.current?.getBoundingClientRect();
    if (!edRect) return;
    setToolbarPos({
      top: rect.top - edRect.top - 50,
      left: Math.max(0, rect.left - edRect.left + rect.width / 2 - 120),
    });
    setToolbarVisible(true);
  }

  function saveStatus() {
    if (saving) return "Salvando...";
    if (lastSaved) {
      const diff = Math.floor((Date.now() - lastSaved.getTime()) / 1000);
      return diff < 5 ? "Salvo agora" : "Salvo";
    }
    return "Salvo automaticamente";
  }

  const grouped = groupByMonth(
    entries.filter((e) => {
      if (panelFilter === "favorites") return e.favorite;
      if (panelFilter === "bookmarked") return e.bookmarked;
      if (panelSearch) return (
        e.title.toLowerCase().includes(panelSearch.toLowerCase()) ||
        e.content.toLowerCase().includes(panelSearch.toLowerCase())
      );
      return true;
    })
  );

  const monthGrid = getMonthGrid(monthRef.year, monthRef.month);
  const monthName = new Date(monthRef.year, monthRef.month)
    .toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

  if (loading) return (
    <div className="flex items-center justify-center h-screen" style={{ background: "var(--app-bg)" }}>
      <div className="w-7 h-7 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: "var(--gold)", borderTopColor: "transparent" }} />
    </div>
  );

  return (
    <div className="flex flex-col h-screen" style={{ background: "var(--app-bg)" }}>

      {/* TOP BAR */}
      <div className="border-b" style={{ borderColor: "var(--app-border)" }}>
        <div className="max-w-3xl mx-auto px-10 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[15px] font-bold" style={{ color: "var(--text-primary)" }}>Diário</span>
            {streak > 0 && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[12px] font-semibold"
                style={{ background: "var(--gold-bg)", color: "var(--gold)" }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M5 1l.5 2.5L8 4l-2.5.5L5 7l-.5-2.5L2 4l2.5-.5L5 1z" fill="currentColor"/>
                </svg>
                {streak} {streak === 1 ? "dia seguido" : "dias seguidos"}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[12px]" style={{ color: "var(--text-faint)" }}>{saveStatus()}</span>
            <button onClick={() => setShowPanel(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border text-[13px] font-medium transition-all"
              style={{ borderColor: "var(--app-border-2)", color: "var(--text-secondary)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--app-bg-4)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1"/>
                <rect x="7" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1"/>
                <rect x="1" y="7" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1"/>
                <rect x="7" y="7" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1"/>
              </svg>
              Todas as entradas
            </button>
          </div>
        </div>
      </div>

      {/* CALENDÁRIO */}
      <div className="border-b" style={{ borderColor: "var(--app-border)" }}>
        <div className="max-w-3xl mx-auto px-10 py-4">
          {/* Navegação alinhada com o grid */}
          <div className="relative">
            {/* Setas posicionadas nas bordas do grid */}
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => calendarMode === "week" ? navigateWeek(-1) : navigateMonth(-1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center border transition-all flex-shrink-0"
                style={{ borderColor: "var(--app-border)", color: "var(--text-secondary)" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--app-bg-3)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M8 2L4 6.5L8 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <span className="text-[13px] font-semibold" style={{ color: "var(--text-primary)" }}>
                {calendarMode === "week" ? getWeekRangeLabel(sevenDays) : monthName}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => calendarMode === "week" ? navigateWeek(1) : navigateMonth(1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center border transition-all"
                  style={{ borderColor: "var(--app-border)", color: "var(--text-secondary)" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--app-bg-3)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M5 2l4 4.5L5 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <div className="flex items-center gap-1 p-0.5 rounded-xl" style={{ background: "var(--app-bg-3)" }}>
                  {(["week", "month"] as const).map((mode) => (
                    <button key={mode} onClick={() => setCalendarMode(mode)}
                      className="px-4 py-1.5 rounded-lg text-[12px] font-semibold transition-all"
                      style={{
                        background: calendarMode === mode ? "var(--app-bg-2)" : "transparent",
                        color: calendarMode === mode ? "var(--text-primary)" : "var(--text-muted)",
                        border: calendarMode === mode ? "1px solid var(--app-border)" : "1px solid transparent",
                      }}>
                      {mode === "week" ? "Semana" : "Mês"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          {/* SEMANA */}
          {calendarMode === "week" && (
            <div className="grid grid-cols-7 gap-2">
              {sevenDays.map((day) => {
                const hasEntry = entries.some((e) => e.date === day.date);
                const isActive = activeEntry?.date === day.date;
                const isToday = day.date === today;
                const dayMonth = new Date(day.date + "T12:00:00")
                  .toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");
                return (
                  <button key={day.date} onClick={() => selectDayEntry(day.date)}
                    className="flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all border"
                    style={{
                      background: isActive ? "var(--gold-bg)" : "transparent",
                      borderColor: isActive ? "var(--gold)" : "transparent",
                    }}
                    onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "var(--app-bg-3)"; }}
                    onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                    <span className="text-[11px] uppercase tracking-wide font-bold capitalize"
                      style={{ color: isActive ? "var(--gold)" : "var(--text-muted)" }}>
                      {day.label}
                    </span>
                    <div className="w-10 h-10 rounded-full flex flex-col items-center justify-center"
                      style={{
                        background: isToday && isActive ? "var(--gold)" : isToday ? "var(--gold-bg)" : "transparent",
                        border: isToday && !isActive ? "2px solid var(--gold)" : "none",
                      }}>
                      <span className="text-[15px] font-bold leading-none"
                        style={{ color: isToday && isActive ? "#000" : isActive ? "var(--gold)" : "var(--text-primary)" }}>
                        {day.num}
                      </span>
                      <span className="text-[9px] leading-none mt-0.5 uppercase"
                        style={{ color: isToday && isActive ? "#00000060" : "var(--text-faint)" }}>
                        {dayMonth}
                      </span>
                    </div>
                    <div className="w-2 h-2 rounded-full"
                      style={{ background: hasEntry ? "var(--gold)" : "var(--app-border-2)" }} />
                  </button>
                );
              })}
            </div>
          )}

          {/* MÊS */}
          {calendarMode === "month" && (
            <div>
              <div className="grid grid-cols-7 gap-1 mb-1">
                {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
                  <div key={d} className="text-center text-[10px] uppercase font-bold py-1"
                    style={{ color: "var(--text-muted)" }}>{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {monthGrid.flat().map((date, i) => {
                  if (!date) return <div key={i} className="py-2" />;
                  const hasEntry = entries.some((e) => e.date === date);
                  const isActive = activeEntry?.date === date;
                  const isToday = date === today;
                  const isFuture = date > today;
                  return (
                    <button key={date} onClick={() => !isFuture && selectDayEntry(date)}
                      disabled={isFuture}
                      className="flex flex-col items-center gap-0.5 py-2 rounded-xl transition-all border"
                      style={{
                        background: isActive ? "var(--gold-bg)" : "transparent",
                        borderColor: isActive ? "var(--gold)" : "transparent",
                        opacity: isFuture ? 0.2 : 1,
                        cursor: isFuture ? "default" : "pointer",
                      }}
                      onMouseEnter={e => { if (!isActive && !isFuture) (e.currentTarget as HTMLElement).style.background = "var(--app-bg-3)"; }}
                      onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                      <span className="text-[13px] font-semibold"
                        style={{ color: isActive ? "var(--gold)" : isToday ? "var(--gold)" : "var(--text-primary)" }}>
                        {parseInt(date.split("-")[2])}
                      </span>
                      <div className="w-1.5 h-1.5 rounded-full"
                        style={{ background: hasEntry ? "var(--gold)" : "transparent" }} />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          </div>{/* end relative wrapper */}
        </div>
      </div>

      {/* EDITOR */}
      <div className="flex-1 overflow-y-auto relative" ref={editorRef}>
        {!activeEntry ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center border"
              style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border)" }}>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" style={{ color: "var(--text-muted)" } as any}>
                <path d="M4 3h13L22 8v16H4V3z" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M16 3v6h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                <path d="M8 12h10M8 16h7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-[15px] font-medium" style={{ color: "var(--text-tertiary)" }}>Selecione um dia para escrever</p>
            <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>Dias com ponto dourado já têm uma entrada</p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto px-10 py-10">

            <p className="text-[12px] uppercase tracking-widest font-bold mb-4"
              style={{ color: "var(--text-muted)" }}>
              {formatDateLabel(activeEntry.date)}
            </p>

            <input value={title}
              onChange={(e) => { setTitle(e.target.value); triggerSave(e.target.value, content); }}
              placeholder="Dê um título a esta página..."
              className="w-full text-[32px] font-bold bg-transparent border-none outline-none mb-6"
              style={{ color: "var(--text-primary)", lineHeight: 1.2 }}
            />

            {/* MOOD */}
            <div className="mb-6 pb-6 border-b" style={{ borderColor: "var(--app-border)" }}>
              <p className="text-[13px] mb-3 font-medium" style={{ color: "var(--text-secondary)" }}>
                Como você está?
                {mood !== null && (
                  <span className="ml-2" style={{ color: MOOD_COLORS[mood] }}>
                    {MOOD_LABELS[mood]}
                  </span>
                )}
              </p>
              <div className="flex gap-3">
                {MOOD_EMOJIS.map((emoji, i) => (
                  <button key={i} onClick={() => handleMoodSelect(i)} title={MOOD_LABELS[i]}
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-[22px] border transition-all"
                    style={{
                      borderColor: mood === i ? MOOD_COLORS[i] : "var(--app-border)",
                      background: mood === i ? `${MOOD_COLORS[i]}18` : "transparent",
                      transform: mood === i ? "scale(1.18)" : "scale(1)",
                    }}>
                    {emoji}
                  </button>
                ))}
              </div>
              {mood !== null && (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-medium border"
                  style={{
                    borderColor: `${MOOD_COLORS[mood]}40`,
                    background: `${MOOD_COLORS[mood]}10`,
                    color: MOOD_COLORS[mood],
                  }}>
                  {MOOD_EMOJIS[mood]}
                  <span>Você estava {MOOD_LABELS[mood].toLowerCase()} neste dia</span>
                  <button onClick={() => handleMoodSelect(mood)}
                    className="ml-1 opacity-50 hover:opacity-100 text-[11px] transition-opacity">✕</button>
                </div>
              )}
            </div>

            {/* PROMPT DIÁRIO */}
            <div className="mb-8 pl-5 border-l-2 py-2" style={{ borderColor: "var(--gold)" }}>
              <p className="text-[15px] italic leading-relaxed mb-1" style={{ color: "var(--text-secondary)" }}>
                &quot;{dailyPrompt.text}&quot;
              </p>
              <p className="text-[12px] font-medium" style={{ color: "var(--gold)" }}>
                — {dailyPrompt.author}
              </p>
            </div>

            {/* ÁREA DE ESCRITA */}
            <textarea
              value={content}
              onChange={(e) => { setContent(e.target.value); triggerSave(title, e.target.value); }}
              onMouseUp={checkSelection}
              onKeyUp={checkSelection}
              placeholder="Clique aqui e comece a escrever. Não existe certo ou errado — este é o seu espaço."
              className="w-full bg-transparent border-none outline-none resize-none text-[16px] leading-[2]"
              style={{ color: "var(--text-secondary)", minHeight: "280px", fontFamily: "inherit" }}
              onInput={(e) => {
                const el = e.currentTarget;
                el.style.height = "auto";
                el.style.height = el.scrollHeight + "px";
              }}
            />

            {/* AÇÕES */}
            <div className="flex items-center gap-2 mt-8 pt-6 border-t" style={{ borderColor: "var(--app-border)" }}>
              <button onClick={handleToggleFavorite}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border text-[13px] font-semibold transition-all"
                style={{
                  borderColor: activeEntry.favorite ? "var(--gold)" : "var(--app-border)",
                  color: activeEntry.favorite ? "var(--gold)" : "var(--text-secondary)",
                  background: activeEntry.favorite ? "var(--gold-bg)" : "transparent",
                }}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 1.5l1.3 3 3 .4-2.2 2.1.6 3-2.7-1.5-2.7 1.5.6-3-2.2-2.1 3-.4L6.5 1.5z"
                    fill={activeEntry.favorite ? "currentColor" : "none"}
                    stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
                </svg>
                {activeEntry.favorite ? "Favoritado" : "Favoritar"}
              </button>

              <button onClick={handleToggleBookmark}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border text-[13px] font-semibold transition-all"
                style={{
                  borderColor: activeEntry.bookmarked ? "#60a5fa" : "var(--app-border)",
                  color: activeEntry.bookmarked ? "#60a5fa" : "var(--text-secondary)",
                  background: activeEntry.bookmarked ? "rgba(96,165,250,0.08)" : "transparent",
                }}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M3 1h7v11l-3.5-2.5L3 12V1z"
                    fill={activeEntry.bookmarked ? "currentColor" : "none"}
                    stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
                </svg>
                {activeEntry.bookmarked ? "Marcado" : "Marcar página"}
              </button>

              {activeEntry.date !== today && (
                <button onClick={() => setDeleteTarget(activeEntry.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border text-[13px] transition-all ml-auto"
                  style={{ borderColor: "var(--app-border)", color: "var(--text-muted)" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--danger)"; el.style.borderColor = "var(--danger)"; el.style.background = "var(--danger-bg)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--text-muted)"; el.style.borderColor = "var(--app-border)"; el.style.background = "transparent"; }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 3h8M4.5 1h3M3 3l.8 8h4.4L9 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Excluir entrada
                </button>
              )}
            </div>
          </div>
        )}

        {/* FLOATING TOOLBAR */}
        {toolbarVisible && (
          <div
            className="absolute flex items-center gap-1 px-2 py-1.5 rounded-xl z-50 border shadow-lg"
            style={{
              top: toolbarPos.top,
              left: toolbarPos.left,
              background: "var(--app-bg-2)",
              borderColor: "var(--app-border-2)",
            }}
            onMouseDown={(e) => e.preventDefault()}
          >
            {[
              { cmd: "bold", label: "N", cls: "font-bold" },
              { cmd: "italic", label: "I", cls: "italic" },
              { cmd: "strikeThrough", label: "S", cls: "line-through" },
            ].map(({ cmd, label, cls }) => (
              <button key={cmd}
                onClick={() => { document.execCommand(cmd, false, undefined); setToolbarVisible(false); }}
                className={`w-7 h-7 rounded-md flex items-center justify-center text-[13px] ${cls} transition-all`}
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--app-bg-4)"; el.style.color = "var(--text-primary)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "var(--text-secondary)"; }}>
                {label}
              </button>
            ))}
            <div className="w-px h-4 mx-1" style={{ background: "var(--app-border-2)" }} />
            {HIGHLIGHT_COLORS.map(({ color, bg, label }) => (
              <button key={color} title={label}
                onClick={() => { document.execCommand("hiliteColor", false, bg); setToolbarVisible(false); }}
                className="w-5 h-5 rounded-[4px] hover:scale-110 transition-transform"
                style={{ background: color }} />
            ))}
          </div>
        )}
      </div>

      {/* PAINEL */}
      {showPanel && (
        <div className="fixed inset-0 z-40 flex" style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowPanel(false); }}>
          <div className="ml-auto w-full max-w-md h-full flex flex-col border-l"
            style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "var(--app-border)" }}>
              <span className="text-[16px] font-bold" style={{ color: "var(--text-primary)" }}>Todas as entradas</span>
              <button onClick={() => setShowPanel(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center border transition-all"
                style={{ borderColor: "var(--app-border)", color: "var(--text-muted)" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--app-bg-3)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2 2l9 9M11 2l-9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="px-4 py-3 border-b space-y-2" style={{ borderColor: "var(--app-border)" }}>
              <input value={panelSearch}
                onChange={(e) => { setPanelSearch(e.target.value); setPanelFilter("all"); }}
                placeholder="Buscar por título ou conteúdo..."
                className="w-full px-3 py-2.5 rounded-xl text-[13px] outline-none border"
                style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border)", color: "var(--text-primary)" }}
              />
              <div className="flex gap-2">
                {(["all", "favorites", "bookmarked"] as const).map((f) => (
                  <button key={f} onClick={() => { setPanelFilter(f); setPanelSearch(""); }}
                    className="flex-1 py-2 rounded-xl text-[12px] font-semibold border transition-all"
                    style={{
                      background: panelFilter === f ? (f === "bookmarked" ? "rgba(96,165,250,0.1)" : "var(--gold-bg)") : "transparent",
                      borderColor: panelFilter === f ? (f === "bookmarked" ? "#60a5fa" : "var(--gold)") : "var(--app-border)",
                      color: panelFilter === f ? (f === "bookmarked" ? "#60a5fa" : "var(--gold)") : "var(--text-muted)",
                    }}>
                    {f === "all" ? "Todas" : f === "favorites" ? "Favoritas" : "Marcadas"}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3">
              {Object.keys(grouped).length === 0 ? (
                <p className="text-center py-8 text-[13px]" style={{ color: "var(--text-muted)" }}>Nenhuma entrada encontrada</p>
              ) : Object.entries(grouped).map(([key, monthEntries]) => (
                <div key={key} className="mb-5">
                  <p className="text-[11px] uppercase tracking-widest font-bold mb-2 px-1 capitalize"
                    style={{ color: "var(--text-muted)" }}>{monthLabel(key)}</p>
                  {monthEntries.map((entry) => (
                    <button key={entry.id}
                      onClick={() => { setActiveEntry(entry); setTitle(entry.title); setContent(entry.content); setMood(entry.mood ?? null); setShowPanel(false); }}
                      className="w-full text-left px-4 py-3 rounded-xl mb-1.5 border transition-all flex items-start gap-3"
                      style={{
                        background: activeEntry?.id === entry.id ? "var(--gold-bg)" : "transparent",
                        borderColor: activeEntry?.id === entry.id ? "var(--gold)" : entry.bookmarked ? "#60a5fa40" : "transparent",
                      }}
                      onMouseEnter={e => { if (activeEntry?.id !== entry.id) (e.currentTarget as HTMLElement).style.background = "var(--app-bg-3)"; }}
                      onMouseLeave={e => { if (activeEntry?.id !== entry.id) (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] mb-0.5" style={{ color: "var(--text-muted)" }}>{formatDateShort(entry.date)}</p>
                        <p className="text-[14px] font-semibold truncate mb-0.5" style={{ color: "var(--text-primary)" }}>
                          {entry.title || formatDateShort(entry.date)}
                        </p>
                        <p className="text-[12px] truncate" style={{ color: "var(--text-muted)" }}>
                          {entry.content.slice(0, 60) || "Sem conteúdo"}
                        </p>
                      </div>
                      <div className="flex gap-1.5 flex-shrink-0 items-center mt-0.5">
                        {entry.mood !== null && entry.mood !== undefined && (
                          <span className="text-[16px]">{MOOD_EMOJIS[entry.mood]}</span>
                        )}
                        {entry.favorite && (
                          <span style={{ color: "var(--gold)" }}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M6 1.5l1.2 2.8 2.8.4-2 2 .5 2.8L6 8l-2.5 1.5.5-2.8-2-2 2.8-.4L6 1.5z" fill="currentColor"/>
                            </svg>
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <ConfirmModal
          title="Excluir entrada do diário?"
          description="Esta ação não pode ser desfeita. O conteúdo desta entrada será permanentemente removido."
          confirmLabel="Excluir" cancelLabel="Cancelar" variant="danger"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
