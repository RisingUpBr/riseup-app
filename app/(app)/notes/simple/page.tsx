"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useUserPlan } from "@/lib/useUserPlan";
import { useRouter } from "next/navigation";
import {
  subscribeToNotes, createNote, updateNote,
  deleteNote, toggleFavorite, Note, NoteBlock,
} from "@/lib/notesService";

type SortMode = "updated" | "created" | "alpha";
type FilterMode = "all" | "favorites";

function tsToMs(ts: any): number {
  if (!ts) return 0;
  if (ts.toDate) return ts.toDate().getTime();
  if (ts.seconds) return ts.seconds * 1000;
  return new Date(ts).getTime();
}

function timeAgo(ts: any): string {
  const ms = tsToMs(ts);
  if (!ms) return "Agora";
  const diff = Math.floor((Date.now() - ms) / 1000);
  if (diff < 60) return "Agora";
  if (diff < 3600) return `${Math.floor(diff / 60)}min atrás`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h atrás`;
  if (diff < 172800) return "Ontem";
  return new Date(ms).toLocaleDateString("pt-BR", { day: "numeric", month: "short" });
}

function formatDate(ts: any): string {
  const ms = tsToMs(ts);
  if (!ms) return "";
  return new Date(ms).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function blockPreview(blocks: NoteBlock[]): string {
  const first = blocks?.find((b) => b.type === "p" && b.content?.replace(/<[^>]*>/g, "").trim());
  return first?.content.replace(/<[^>]*>/g, "").slice(0, 60) || "";
}

function sortNotes(notes: Note[], mode: SortMode): Note[] {
  return [...notes].sort((a, b) => {
    if (mode === "alpha") {
      const ta = (a.title || "zzz").toLowerCase();
      const tb = (b.title || "zzz").toLowerCase();
      return ta.localeCompare(tb, "pt-BR", { sensitivity: "base" });
    }
    if (mode === "created") {
      const diff = tsToMs(b.createdAt) - tsToMs(a.createdAt);
      return diff !== 0 ? diff : tsToMs(b.updatedAt) - tsToMs(a.updatedAt);
    }
    const diff = tsToMs(b.updatedAt) - tsToMs(a.updatedAt);
    return diff !== 0 ? diff : tsToMs(b.createdAt) - tsToMs(a.createdAt);
  });
}

// ── BLOCK ITEM ───────────────────────────────────────────────
function BlockItem({ block, index, onChange, onKeyDown, onKeyUp, onMouseUp, inputRef }: {
  block: NoteBlock; index: number;
  onChange: (i: number, content: string) => void;
  onKeyDown: (e: React.KeyboardEvent, i: number) => void;
  onKeyUp: (e: React.KeyboardEvent) => void;
  onMouseUp: () => void;
  inputRef: (el: HTMLElement | null) => void;
}) {
  const common = {
    contentEditable: true as const,
    suppressContentEditableWarning: true,
    "data-idx": index,
    onInput: (e: React.FormEvent<HTMLElement>) => onChange(index, e.currentTarget.innerHTML),
    onKeyDown: (e: React.KeyboardEvent) => onKeyDown(e, index),
    onKeyUp, onMouseUp, ref: inputRef,
  };

  if (block.type === "divider")
    return <div className="my-4 h-px" style={{ background: "var(--app-border)" }} />;

  if (block.type === "h2")
    return (
      <div {...common}
        className="text-[22px] font-semibold outline-none py-1 mt-3 mb-1 block-ph"
        style={{ color: "var(--text-primary)" } as any}
        data-ph="Título grande"
        dangerouslySetInnerHTML={{ __html: block.content }}
      />
    );

  if (block.type === "h3")
    return (
      <div {...common}
        className="text-[17px] font-semibold outline-none py-1 mt-2 block-ph"
        style={{ color: "var(--text-primary)" } as any}
        data-ph="Título médio"
        dangerouslySetInnerHTML={{ __html: block.content }}
      />
    );

  if (block.type === "li")
    return (
      <div className="flex gap-3 items-start py-0.5">
        <span className="mt-1 flex-shrink-0 text-base leading-7" style={{ color: "var(--gold)" }}>•</span>
        <div {...common}
          className="flex-1 text-[15px] outline-none leading-7 block-ph"
          style={{ color: "var(--text-secondary)" } as any}
          data-ph="Item da lista"
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      </div>
    );

  if (block.type === "check")
    return (
      <div className="flex gap-3 items-start py-0.5">
        <button
          onClick={() => onChange(index, block.content)}
          className="mt-1.5 w-4 h-4 rounded-[4px] border flex items-center justify-center flex-shrink-0 transition-all"
          style={{ background: block.done ? "var(--gold)" : "transparent", borderColor: block.done ? "var(--gold)" : "var(--app-border-3)" }}
        >
          {block.done && (
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
              <path d="M1.5 4.5l2 2 3.5-3.5" stroke="#000" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
        <div {...common}
          className="flex-1 text-[15px] outline-none leading-7 block-ph"
          style={{ color: block.done ? "var(--text-muted)" : "var(--text-secondary)", textDecoration: block.done ? "line-through" : "none" } as any}
          data-ph="Tarefa"
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      </div>
    );

  if (block.type === "quote")
    return (
      <div className="pl-4 my-3 border-l-2" style={{ borderColor: "var(--gold)" }}>
        <div {...common}
          className="text-[15px] outline-none leading-7 block-ph"
          style={{ color: "var(--gold)" } as any}
          data-ph="Citação ou destaque..."
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      </div>
    );

  return (
    <div {...common}
      className="text-[15px] outline-none leading-[1.85] py-0.5 block-ph"
      style={{ color: "var(--text-secondary)" } as any}
      data-ph="Escreva algo ou digite /"
      dangerouslySetInnerHTML={{ __html: block.content }}
    />
  );
}

const SLASH_ITEMS = [
  { type: "p",       label: "Parágrafo",    hint: "Texto simples",    icon: "¶" },
  { type: "h2",      label: "Título grande", hint: "Cabeçalho H2",    icon: "H2" },
  { type: "h3",      label: "Título médio",  hint: "Cabeçalho H3",    icon: "H3" },
  { type: "li",      label: "Lista",         hint: "Marcadores",       icon: "•" },
  { type: "check",   label: "Checklist",     hint: "Tarefas",          icon: "✓" },
  { type: "quote",   label: "Destaque",      hint: "Citação dourada",  icon: '"' },
  { type: "divider", label: "Divisor",       hint: "Linha separadora", icon: "—" },
] as const;

const HIGHLIGHT_COLORS = [
  { color: "#D4AF37", bg: "rgba(212,175,55,0.3)" },
  { color: "#60a5fa", bg: "rgba(96,165,250,0.25)" },
  { color: "#4ade80", bg: "rgba(74,222,128,0.25)" },
  { color: "#f472b6", bg: "rgba(244,114,182,0.25)" },
  { color: "#fb923c", bg: "rgba(251,146,60,0.25)" },
];

const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: "updated", label: "Mais recentes" },
  { value: "created", label: "Data de criação" },
  { value: "alpha",   label: "A → Z" },
];

export default function NotesPage() {
  const { user, userData } = useAuthUser();
  const { isPremium } = useUserPlan();
  const router = useRouter();

  const [notes, setNotes] = useState<Note[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState<NoteBlock[]>([{ type: "p", content: "" }]);
  const [search, setSearch] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("updated");
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [sortOpen, setSortOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [autoCreating, setAutoCreating] = useState(false);
  const [slashOpen, setSlashOpen] = useState(false);
  const [slashPos, setSlashPos] = useState({ top: 0, left: 0 });
  const [slashIdx, setSlashIdx] = useState(0);
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const [toolbarPos, setToolbarPos] = useState({ top: 0, left: 0 });

  const saveTimer = useRef<NodeJS.Timeout | null>(null);
  const blockRefs = useRef<(HTMLElement | null)[]>([]);
  const editorRef = useRef<HTMLDivElement>(null);
  const slashBlockIdx = useRef<number>(-1);
  const sortRef = useRef<HTMLDivElement>(null);

  const activeNote = notes.find((n) => n.id === activeId) ?? null;

  const displayed = sortNotes(
    notes.filter((n) => {
      if (filterMode === "favorites" && !n.favorite) return false;
      if (!search) return true;
      return (
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.blocks?.some((b) => b.content.replace(/<[^>]*>/g, "").toLowerCase().includes(search.toLowerCase()))
      );
    }),
    sortMode
  );

  useEffect(() => {
    if (!user) return;
    return subscribeToNotes(user.uid, setNotes);
  }, [user]);

  useEffect(() => {
    if (!activeNote) return;
    setTitle(activeNote.title ?? "");
    setBlocks(activeNote.blocks?.length ? activeNote.blocks : [{ type: "p", content: "" }]);
    blockRefs.current = [];
  }, [activeId]);

  const triggerSave = useCallback((newTitle: string, newBlocks: NoteBlock[]) => {
    if (!activeId) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      updateNote(activeId, { title: newTitle, blocks: newBlocks }, user?.uid);
    }, 2000);
  }, [activeId, user?.uid]);

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
    triggerSave(e.target.value, blocks);
  }

  function handleBlockChange(i: number, content: string) {
    const note = notes.find((n) => n.id === activeId);
    if (!note) return;
    const isCheckToggle = note.blocks[i]?.type === "check" && content === note.blocks[i]?.content;
    const updated = blocks.map((b, idx) =>
      idx === i ? { ...b, content: isCheckToggle ? b.content : content, done: isCheckToggle ? !b.done : b.done } : b
    );
    setBlocks(updated);
    triggerSave(title, updated);
  }

  function handleBlockKeyDown(e: React.KeyboardEvent, i: number) {
    const el = e.currentTarget as HTMLElement;

    if (e.key === "/") {
      const rect = el.getBoundingClientRect();
      const edRect = editorRef.current!.getBoundingClientRect();
      setSlashPos({ top: rect.bottom - edRect.top + 4, left: Math.min(rect.left - edRect.left, edRect.width - 220) });
      setSlashOpen(true);
      slashBlockIdx.current = i;
      setSlashIdx(0);
      e.preventDefault();
      return;
    }

    if (slashOpen) {
      if (e.key === "ArrowDown") { setSlashIdx((s) => Math.min(s + 1, SLASH_ITEMS.length - 1)); e.preventDefault(); }
      if (e.key === "ArrowUp") { setSlashIdx((s) => Math.max(s - 1, 0)); e.preventDefault(); }
      if (e.key === "Enter") { insertBlock(SLASH_ITEMS[slashIdx].type as NoteBlock["type"]); e.preventDefault(); return; }
      if (e.key === "Escape") { setSlashOpen(false); return; }
    }

    if (e.key === "Enter" && !e.shiftKey && !slashOpen) {
      e.preventDefault();
      const newBlock: NoteBlock = { type: "p", content: "" };
      const updated = [...blocks.slice(0, i + 1), newBlock, ...blocks.slice(i + 1)];
      setBlocks(updated);
      triggerSave(title, updated);
      setTimeout(() => blockRefs.current[i + 1]?.focus(), 30);
    }

    if (e.key === "Backspace" && el.innerHTML === "" && blocks.length > 1) {
      e.preventDefault();
      const updated = blocks.filter((_, idx) => idx !== i);
      setBlocks(updated);
      triggerSave(title, updated);
      setTimeout(() => blockRefs.current[Math.max(0, i - 1)]?.focus(), 30);
    }
  }

  function checkSelection() {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.toString().trim()) { setToolbarVisible(false); return; }
    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const edRect = editorRef.current?.getBoundingClientRect();
    if (!edRect) return;
    setToolbarPos({ top: rect.top - edRect.top - 50, left: Math.max(0, rect.left - edRect.left + rect.width / 2 - 120) });
    setToolbarVisible(true);
  }

  function insertBlock(type: NoteBlock["type"]) {
    const i = slashBlockIdx.current;
    const newBlock: NoteBlock = { type, content: "", ...(type === "check" ? { done: false } : {}) };
    const updated = [...blocks.slice(0, i + 1), newBlock, ...blocks.slice(i + 1)];
    setBlocks(updated);
    triggerSave(title, updated);
    setSlashOpen(false);
    setTimeout(() => blockRefs.current[i + 1]?.focus(), 30);
  }

  async function handleNewNote() {
    if (!user) return;
    const currentCount = notes.length;
    const noteLimit = userData?.limits?.simpleNotes ?? 10;
    if (!isPremium && currentCount >= noteLimit) {
      router.push("/planos-app");
      return;
    }
    setSaving(true);
    try {
      const id = await createNote(user.uid);
      setActiveId(id);
    } finally {
      setSaving(false);
    }
  }

  async function handleEmptyStateClick() {
    if (!user || autoCreating) return;
    const currentCount = notes.length;
    const noteLimit = userData?.limits?.simpleNotes ?? 10;
    if (!isPremium && currentCount >= noteLimit) {
      router.push("/planos-app");
      return;
    }
    setAutoCreating(true);
    try {
      const id = await createNote(user.uid);
      setActiveId(id);
    } finally {
      setAutoCreating(false);
    }
  }

  async function handleDeleteNote() {
    if (!activeId) return;
    if (!confirm("Excluir esta nota?")) return;
    await deleteNote(activeId);
    setActiveId(null);
    setTitle("");
    setBlocks([{ type: "p", content: "" }]);
  }

  async function handleToggleFavorite() {
    if (!activeNote) return;
    await toggleFavorite(activeNote.id, activeNote.favorite ?? false);
  }

  useEffect(() => {
    function handler(e: MouseEvent) {
      setToolbarVisible(false);
      if (!(e.target as Element).closest("#slashMenu")) setSlashOpen(false);
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const StarIcon = ({ filled }: { filled: boolean }) => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M6.5 1.5l1.3 3.2 3.2.4-2.3 2.2.6 3.2-2.8-1.6-2.8 1.6.6-3.2L1.9 5.1l3.2-.4z"
        stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"
        fill={filled ? "currentColor" : "none"} />
    </svg>
  );

  return (
    <>
      <style>{`
        .block-ph:empty:before { content: attr(data-ph); color: var(--text-faint); pointer-events: none; }
        .block-ph:focus:empty:before { color: var(--text-muted); }
      `}</style>

      <div className="flex h-screen" style={{ background: "var(--app-bg)" }}>

        {/* ── LEFT PANEL ── */}
        <div className="w-64 min-w-64 flex flex-col border-r"
          style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>

          <div className="px-4 pt-5 pb-3 border-b" style={{ borderColor: "var(--app-border)" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[14px] font-semibold" style={{ color: "var(--text-primary)" }}>Notas</span>
              <button
                onClick={handleNewNote}
                disabled={saving}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-bold rounded-lg transition-all disabled:opacity-50 hover:scale-[1.02]"
                style={{ background: "var(--gold)", color: "#000" }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                Nova nota
              </button>
            </div>

            <div className="relative mb-2">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-muted)" }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.1" />
                  <path d="M8.5 8.5l2 2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                </svg>
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar notas..."
                className="w-full rounded-lg pl-8 pr-3 py-2 text-[13px] outline-none transition-colors"
                style={{ background: "var(--app-bg-3)", border: "1px solid var(--app-border)", color: "var(--text-primary)" }}
              />
            </div>

            <div className="flex items-center gap-1.5 mt-1">
              <button
                onClick={() => setFilterMode(filterMode === "favorites" ? "all" : "favorites")}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all flex-1 justify-center border"
                style={{
                  background: filterMode === "favorites" ? "var(--gold-bg)" : "transparent",
                  borderColor: filterMode === "favorites" ? "var(--gold)" : "var(--app-border)",
                  color: filterMode === "favorites" ? "var(--gold)" : "var(--text-tertiary)",
                }}
              >
                <StarIcon filled={filterMode === "favorites"} />
                Favoritos
              </button>

              <div className="relative" ref={sortRef}>
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] border transition-all"
                  style={{ background: "transparent", borderColor: "var(--app-border)", color: "var(--text-tertiary)" }}
                >
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M1 2.5h9M2.5 5.5h6M4 8.5h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                  {SORT_OPTIONS.find(s => s.value === sortMode)?.label.split(" ")[0]}
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-full mt-1 rounded-xl border z-50 overflow-hidden w-44"
                    style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border-2)", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
                    {SORT_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => { setSortMode(opt.value); setSortOpen(false); }}
                        className="w-full flex items-center justify-between px-3 py-2.5 text-[12px] transition-colors"
                        style={{
                          color: sortMode === opt.value ? "var(--gold)" : "var(--text-secondary)",
                          background: sortMode === opt.value ? "var(--gold-bg)" : "transparent",
                        }}
                      >
                        {opt.label}
                        {sortMode === opt.value && (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5l2.5 2.5 3.5-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-2 py-2">
            {displayed.length === 0 && (
              <div className="text-center py-10 text-[13px]" style={{ color: "var(--text-muted)" }}>
                {filterMode === "favorites" ? "Nenhum favorito ainda" : search ? "Nenhuma nota encontrada" : "Nenhuma nota ainda"}
              </div>
            )}
            {displayed.map((note) => {
              const isActive = note.id === activeId;
              return (
                <button
                  key={note.id}
                  onClick={() => setActiveId(note.id)}
                  className="w-full text-left px-3 py-3 rounded-xl mb-1 border transition-all"
                  style={{
                    background: isActive ? "var(--app-bg-4)" : "transparent",
                    borderColor: isActive ? "var(--app-border-2)" : "transparent",
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "var(--app-bg-3)"; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-[14px] font-semibold truncate flex-1"
                      style={{ color: isActive ? "var(--text-primary)" : "var(--text-secondary)" }}>
                      {note.title || "Sem título"}
                    </div>
                    {note.favorite && (
                      <span className="ml-1.5 flex-shrink-0" style={{ color: "var(--gold)" }}>
                        <StarIcon filled={true} />
                      </span>
                    )}
                  </div>
                  <div className="text-[12px] truncate mb-1.5" style={{ color: "var(--text-muted)" }}>
                    {blockPreview(note.blocks) || "Sem conteúdo"}
                  </div>
                  <div className="text-[11px]" style={{ color: "var(--text-faint)" }}>
                    {sortMode === "created" ? formatDate(note.createdAt) : timeAgo(note.updatedAt)}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="px-4 py-3 border-t" style={{ borderColor: "var(--app-border)" }}>
            <div className="flex justify-between mb-1.5">
              <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>Notas usadas</span>
              <span className="text-[11px] font-medium" style={{ color: "var(--text-tertiary)" }}>
                {isPremium ? "Ilimitadas" : `${notes.length} / ${userData?.limits?.simpleNotes ?? 10}`}
              </span>
            </div>
            {!isPremium && (
              <div className="h-0.5 rounded-full overflow-hidden" style={{ background: "var(--app-border)" }}>
                <div className="h-full rounded-full transition-all"
                  style={{ width: `${Math.min((notes.length / (userData?.limits?.simpleNotes ?? 10)) * 100, 100)}%`, background: "var(--gold)" }} />
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="flex-1 flex flex-col min-w-0" style={{ background: "var(--app-bg)" }}>
          <div className="flex items-center justify-between px-8 py-3 border-b"
            style={{ borderColor: "var(--app-border)" }}>
            <span className="text-[12px]" style={{ color: "var(--text-muted)" }}>
              {activeNote
                ? `Criado em ${formatDate(activeNote.createdAt)} · Editado ${timeAgo(activeNote.updatedAt)}`
                : "Selecione uma nota"}
            </span>
            {activeId && (
              <div className="flex gap-2">
                <button
                  onClick={handleToggleFavorite}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] transition-all"
                  style={{
                    borderColor: activeNote?.favorite ? "var(--gold)" : "var(--app-border)",
                    color: activeNote?.favorite ? "var(--gold)" : "var(--text-tertiary)",
                    background: activeNote?.favorite ? "var(--gold-bg)" : "transparent",
                  }}
                >
                  <StarIcon filled={activeNote?.favorite ?? false} />
                  {activeNote?.favorite ? "Favoritado" : "Favoritar"}
                </button>
                <button
                  onClick={handleDeleteNote}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] transition-all"
                  style={{ borderColor: "var(--app-border)", color: "var(--text-tertiary)" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--danger)"; el.style.borderColor = "var(--danger)"; el.style.background = "var(--danger-bg)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--text-tertiary)"; el.style.borderColor = "var(--app-border)"; el.style.background = "transparent"; }}
                >
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M2 2.5h7M4 1h3M3.5 2.5l.5 7h3l.5-7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Excluir
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto relative" ref={editorRef}>
            {!activeId ? (
              <div
                className="flex flex-col items-center justify-center h-full gap-3 select-none"
                style={{ cursor: autoCreating ? "wait" : "text" }}
                onClick={handleEmptyStateClick}
              >
                {autoCreating ? (
                  <div className="w-7 h-7 rounded-full border-2 border-t-transparent animate-spin"
                    style={{ borderColor: "var(--gold)", borderTopColor: "transparent" }} />
                ) : (
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-colors"
                    style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border)" }}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ color: "var(--text-muted)" }}>
                      <rect x="3" y="2" width="16" height="18" rx="3" stroke="currentColor" strokeWidth="1.3" />
                      <path d="M7 8h8M7 11.5h8M7 15h5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
                <p className="text-[14px]" style={{ color: "var(--text-tertiary)" }}>
                  {autoCreating ? "Criando nota..." : "Clique para criar uma nova nota"}
                </p>
                {!autoCreating && (
                  <p className="text-[12px]" style={{ color: "var(--text-muted)" }}>Digite / para ver os tipos de bloco</p>
                )}
              </div>
            ) : (
              <div className="max-w-2xl px-10 py-10">
                <input
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Título da nota"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (!blocks.length) {
                        const nb = [{ type: "p" as const, content: "" }];
                        setBlocks(nb);
                        triggerSave(title, nb);
                      }
                      setTimeout(() => {
                        const first = blockRefs.current[0];
                        if (first) {
                          first.focus();
                          const range = document.createRange();
                          const sel = window.getSelection();
                          range.selectNodeContents(first);
                          range.collapse(false);
                          sel?.removeAllRanges();
                          sel?.addRange(range);
                        }
                      }, 30);
                    }
                  }}
                  className="note-title-input w-full text-[28px] font-bold bg-transparent border-none outline-none mb-1"
                  style={{ color: "var(--text-primary)" }}
                />
                <div className="mb-6 h-px" style={{ background: "var(--app-border)" }} />
                <div className="space-y-1">
                  {blocks.map((block, i) => (
                    <BlockItem
                      key={i} block={block} index={i}
                      onChange={handleBlockChange}
                      onKeyDown={handleBlockKeyDown}
                      onKeyUp={() => checkSelection()}
                      onMouseUp={() => checkSelection()}
                      inputRef={(el) => { blockRefs.current[i] = el; }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* FLOATING TOOLBAR */}
            {toolbarVisible && (
              <div
                className="absolute flex items-center gap-1 px-2 py-1.5 rounded-xl z-50 border"
                style={{ top: toolbarPos.top, left: toolbarPos.left, background: "var(--app-bg-2)", borderColor: "var(--app-border-2)" }}
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
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "var(--text-secondary)"; }}
                  >{label}</button>
                ))}
                <div className="w-px h-4 mx-1" style={{ background: "var(--app-border-2)" }} />
                {HIGHLIGHT_COLORS.map(({ color, bg }) => (
                  <button key={color}
                    onClick={() => { document.execCommand("hiliteColor", false, bg); setToolbarVisible(false); }}
                    className="w-4 h-4 rounded-[3px] hover:scale-110 transition-transform"
                    style={{ background: color }}
                  />
                ))}
              </div>
            )}

            {/* SLASH MENU */}
            {slashOpen && (
              <div id="slashMenu"
                className="absolute rounded-xl p-1.5 w-52 z-50 border"
                style={{ top: slashPos.top, left: slashPos.left, background: "var(--app-bg-2)", borderColor: "var(--app-border-2)", boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}
              >
                {SLASH_ITEMS.map((item, i) => (
                  <button key={item.type}
                    onMouseDown={(e) => { e.preventDefault(); insertBlock(item.type as NoteBlock["type"]); }}
                    className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg transition-colors text-left"
                    style={{ background: i === slashIdx ? "var(--app-bg-4)" : "transparent" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--app-bg-4)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = i === slashIdx ? "var(--app-bg-4)" : "transparent"}
                  >
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-[11px] font-mono border"
                      style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border)", color: "var(--text-tertiary)" }}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-[13px] font-medium" style={{ color: "var(--text-secondary)" }}>{item.label}</div>
                      <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>{item.hint}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
