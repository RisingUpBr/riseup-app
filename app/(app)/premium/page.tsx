"use client";
import { useState, useEffect, useRef } from "react";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useUserPlan } from "@/lib/useUserPlan";
import { useTheme } from "@/contexts/ThemeContext";
import ConfirmModal from "@/components/ConfirmModal";
import {
  BrainItem, BrainConnection, BrainItemSource,
  SOURCE_CONFIG, BRAIN_LIMITS,
  subscribeToItems, subscribeToConnections,
  saveItem, deleteItem,
  findAutoConnections,
} from "@/lib/secondBrainService";

type View = "dashboard" | "explore" | "visual";

// ── VISUAL (Globo Fibonacci) ──────────────────────────────
function VisualView({ items, connections, theme, onSelectItem }: {
  items: BrainItem[]; connections: BrainConnection[];
  theme: string; onSelectItem: (item: BrainItem | null) => void;
}) {
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [rotation, setRotation] = useState({ x: 0.3, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });
  const isDark = theme === "dark";
  const autoConns = findAutoConnections(items);

  const bg = isDark ? "#080810" : "#f0f0ec";
  const labelBg = isDark ? "rgba(8,8,16,0.94)" : "rgba(240,240,236,0.96)";
  const labelText = isDark ? "#ddd" : "#222";
  const R = Math.max(120, Math.min(200, 80 + items.length * 6));
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 960, h: 640 });
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setDims({ w: width, h: height });
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);
  const CX = dims.w / 2; const CY = dims.h / 2;

  function project(lat: number, lng: number): { x: number; y: number; z: number } {
    const rx = rotation.x; const ry = rotation.y;
    const x0 = Math.sin(lat) * Math.cos(lng);
    const y0 = Math.cos(lat);
    const z0 = Math.sin(lat) * Math.sin(lng);
    const x1 = x0 * Math.cos(ry) - z0 * Math.sin(ry);
    const z1 = x0 * Math.sin(ry) + z0 * Math.cos(ry);
    const y2 = y0 * Math.cos(rx) - z1 * Math.sin(rx);
    const z2 = y0 * Math.sin(rx) + z1 * Math.cos(rx);
    return { x: CX + x1 * R, y: CY + y2 * R, z: z2 };
  }

  function layoutGlobe(): Record<string, { x: number; y: number; z: number }> {
    const result: Record<string, { x: number; y: number; z: number }> = {};
    const n = items.length;
    if (!n) return result;
    items.forEach((item, i) => {
      const phi = Math.acos(1 - 2 * (i + 0.5) / n);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      result[item.id] = project(phi, theta);
    });
    return result;
  }

  const positions = layoutGlobe();
  const sortedItems = [...items].sort((a, b) => (positions[a.id]?.z ?? 0) - (positions[b.id]?.z ?? 0));

  function getGlobeLines() {
    const lines: { x1: number; y1: number; x2: number; y2: number; opacity: number }[] = [];
    const steps = 60;
    for (let lng = 0; lng < Math.PI * 2; lng += Math.PI / 6) {
      for (let i = 0; i < steps; i++) {
        const lat1 = (i / steps) * Math.PI;
        const lat2 = ((i + 1) / steps) * Math.PI;
        const p1 = project(lat1, lng);
        const p2 = project(lat2, lng);
        const avgZ = (p1.z + p2.z) / 2;
        const opacity = 0.3 + 0.3 * ((avgZ / R + 1) / 2);
        lines.push({ x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y, opacity });
      }
    }
    for (let lat = Math.PI / 6; lat < Math.PI; lat += Math.PI / 6) {
      for (let i = 0; i < steps; i++) {
        const lng1 = (i / steps) * Math.PI * 2;
        const lng2 = ((i + 1) / steps) * Math.PI * 2;
        const p1 = project(lat, lng1);
        const p2 = project(lat, lng2);
        const avgZ = (p1.z + p2.z) / 2;
        const opacity = 0.3 + 0.3 * ((avgZ / R + 1) / 2);
        lines.push({ x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y, opacity });
      }
    }
    return lines;
  }

  const globeLines = getGlobeLines();

  function onMouseDown(e: React.MouseEvent) {
    if ((e.target as Element).closest("[data-node]")) return;
    isDragging.current = true;
    dragStart.current = { mx: e.clientX, my: e.clientY, rx: rotation.x, ry: rotation.y };
  }
  function onMouseMove(e: React.MouseEvent) {
    if (!isDragging.current) return;
    const dx = (e.clientX - dragStart.current.mx) * 0.008;
    const dy = (e.clientY - dragStart.current.my) * 0.008;
    setRotation({ x: dragStart.current.rx + dy, y: dragStart.current.ry + dx });
  }
  function onMouseUp() { isDragging.current = false; }
  function onWheel(e: React.WheelEvent) {
    e.preventDefault();
    setZoom(z => Math.min(Math.max(z * (e.deltaY > 0 ? 0.92 : 1.08), 0.3), 3));
  }

  const sphereStroke = isDark ? "rgba(212,175,55,0.15)" : "rgba(150,120,0,0.2)";

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* LEGENDA LATERAL */}
      <div className="w-64 flex-shrink-0 border-r flex flex-col py-5 px-5 overflow-y-auto"
        style={{ borderColor: isDark ? "#1a1a2a" : "#dddde8", background: isDark ? "#080810" : "#f0f0ec" }}>
        <p className="text-[12px] font-bold uppercase tracking-widest mb-5"
          style={{ color: isDark ? "#555" : "#aaa" }}>Globo de Conhecimento</p>

        <p className="text-[10px] font-bold uppercase tracking-wide mb-3"
          style={{ color: isDark ? "#333" : "#bbb" }}>Por fonte</p>
        <div className="space-y-2.5 mb-6">
          {(Object.entries(SOURCE_CONFIG) as [BrainItemSource, typeof SOURCE_CONFIG[BrainItemSource]][])
            .filter(([key]) => items.some(i => i.source === key))
            .map(([key, cfg]) => {
              const count = items.filter(i => i.source === key).length;
              const pct = Math.round((count / items.length) * 100);
              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: cfg.color }} />
                      <span className="text-[12px]" style={{ color: isDark ? "#888" : "#555" }}>{cfg.emoji} {cfg.label}</span>
                    </div>
                    <span className="text-[11px]" style={{ color: isDark ? "#555" : "#aaa" }}>{count}</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: isDark ? "#1a1a2a" : "#dddde8" }}>
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: cfg.color }}/>
                  </div>
                </div>
              );
            })}
        </div>

        <p className="text-[10px] font-bold uppercase tracking-wide mb-3"
          style={{ color: isDark ? "#333" : "#bbb" }}>Conexões</p>
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <svg width="28" height="10"><line x1="0" y1="5" x2="28" y2="5" stroke={isDark ? "#D4AF37" : "#b8920a"} strokeWidth="1.5" strokeDasharray="4,3" strokeOpacity="0.6"/></svg>
            <span className="text-[11px]" style={{ color: isDark ? "#666" : "#888" }}>Tags em comum</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="28" height="10"><line x1="0" y1="5" x2="28" y2="5" stroke={isDark ? "#60a5fa" : "#3c64c8"} strokeWidth="1.5" strokeOpacity="0.6"/></svg>
            <span className="text-[11px]" style={{ color: isDark ? "#666" : "#888" }}>Conexão manual</span>
          </div>
        </div>

        {selected ? (() => {
          const item = items.find(i => i.id === selected);
          if (!item) return null;
          const cfg = SOURCE_CONFIG[item.source];
          return (
            <div className="p-4 rounded-xl border"
              style={{ background: isDark ? "#111118" : "#e8e8e4", borderColor: `${item.color}50` }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[18px]">{cfg.emoji}</span>
                <span className="text-[13px] font-semibold leading-snug" style={{ color: item.color }}>{item.title}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                style={{ background: `${item.color}18`, color: item.color }}>{cfg.label}</span>
              {item.content && (
                <p className="text-[11px] mt-2 mb-3 leading-relaxed"
                  style={{ color: isDark ? "#666" : "#777" }}>
                  {item.content.slice(0, 100)}{item.content.length > 100 ? "..." : ""}
                </p>
              )}
              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.map(t => (
                    <span key={t} className="text-[10px] px-1.5 py-0.5 rounded-full"
                      style={{ background: isDark ? "#1a1a2a" : "#dddde8", color: isDark ? "#666" : "#888" }}>{t}</span>
                  ))}
                </div>
              )}
              <button onClick={() => onSelectItem(item)}
                className="w-full py-2 rounded-lg text-[12px] font-bold"
                style={{ background: item.color, color: "#000" }}>
                Ver / Editar
              </button>
              <button onClick={() => { setSelected(null); onSelectItem(null); }}
                className="w-full py-1.5 rounded-lg text-[11px] mt-1.5"
                style={{ color: isDark ? "#555" : "#aaa" }}>
                Deselecionar
              </button>
            </div>
          );
        })() : (
          <div className="p-3 rounded-xl border border-dashed text-center"
            style={{ borderColor: isDark ? "#1a1a2a" : "#dddde8" }}>
            <p className="text-[11px]" style={{ color: isDark ? "#333" : "#bbb" }}>
              Arraste para girar · Scroll para zoom
            </p>
            <p className="text-[11px] mt-1" style={{ color: isDark ? "#2a2a3a" : "#ccc" }}>
              Clique em um nó para ver detalhes
            </p>
          </div>
        )}

        <div className="mt-auto flex gap-1.5 pt-5">
          {[{l:"+",a:()=>setZoom(z=>Math.min(z+0.2,3))},{l:"⊡",a:()=>{setZoom(1);setPanOffset({x:0,y:0});setRotation({x:0.3,y:0});}},{l:"−",a:()=>setZoom(z=>Math.max(z-0.2,0.3))}].map(({l,a})=>(
            <button key={l} onClick={a}
              className="flex-1 py-2 rounded-xl text-[15px] font-bold border"
              style={{ background: "transparent", borderColor: isDark ? "#1a1a2a" : "#dddde8", color: isDark ? "#555" : "#aaa" }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* CANVAS GLOBO */}
      <div ref={containerRef} className="flex-1 relative overflow-hidden"
        style={{ background: bg, cursor: isDragging.current ? "grabbing" : "grab" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onWheel={onWheel}>

        {items.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <p className="text-[15px] font-medium" style={{ color: isDark ? "#2a2a3a" : "#ccc" }}>
              Nenhum item ainda
            </p>
          </div>
        ) : (
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <filter id="glow-node">
                <feGaussianBlur stdDeviation="2.5" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            <g transform={`translate(${panOffset.x},${panOffset.y}) scale(${zoom})`}
              style={{ transformOrigin: `${CX}px ${CY}px` }}>

              <circle cx={CX} cy={CY} r={R + 1}
                fill="none" stroke={sphereStroke} strokeWidth="1"/>

              {globeLines.map((line, i) => (
                <line key={i}
                  x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                  stroke={isDark ? "rgba(212,175,55,0.06)" : "rgba(150,120,0,0.09)"}
                  strokeWidth="0.5" opacity={line.opacity}/>
              ))}

              {autoConns.map((conn, i) => {
                const from = positions[conn.fromId];
                const to = positions[conn.toId];
                if (!from || !to || from.z < -R * 0.3 || to.z < -R * 0.3) return null;
                const opacity = Math.max(0.1, (from.z + to.z) / (2 * R) * 0.5 + 0.2);
                return (
                  <line key={`a${i}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                    stroke={isDark ? "#D4AF37" : "#b8920a"}
                    strokeWidth="0.8" strokeOpacity={opacity} strokeDasharray="3,4"/>
                );
              })}

              {connections.map(conn => {
                const from = positions[conn.fromId];
                const to = positions[conn.toId];
                if (!from || !to) return null;
                const opacity = Math.max(0.1, (from.z + to.z) / (2 * R) * 0.5 + 0.3);
                return (
                  <line key={conn.id} x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                    stroke={isDark ? "#60a5fa" : "#3c64c8"}
                    strokeWidth="1" strokeOpacity={opacity}/>
                );
              })}

              {sortedItems.map(item => {
                const pos = positions[item.id];
                if (!pos) return null;
                const isH = hovered === item.id;
                const isS = selected === item.id;
                const depth = (pos.z / R + 1) / 2;
                if (depth < 0.05) return null;
                const r = (isH || isS ? 11 : 7) * (0.4 + depth * 0.6);
                const opacity = 0.25 + depth * 0.75;
                return (
                  <g key={item.id} data-node="true" style={{ cursor: "pointer" }}
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={e => {
                      e.stopPropagation();
                      const ns = selected === item.id ? null : item.id;
                      setSelected(ns);
                      onSelectItem(ns ? item : null);
                    }}>
                    {(isH || isS) && (
                      <circle cx={pos.x} cy={pos.y} r={r + 10}
                        fill={`${item.color}18`} opacity={opacity}/>
                    )}
                    <circle cx={pos.x} cy={pos.y} r={r}
                      fill={isDark ? `${item.color}30` : `${item.color}38`}
                      stroke={item.color}
                      strokeWidth={isS ? 2 : isH ? 1.8 : 1.2}
                      opacity={opacity}
                      filter={isH || isS ? "url(#glow-node)" : undefined}/>
                    <circle cx={pos.x} cy={pos.y} r={r * 0.35}
                      fill={item.color} opacity={opacity * 0.9}/>
                    {(isH || isS) && depth > 0.4 && (
                      <g>
                        <rect x={pos.x - 48} y={pos.y + r + 5} width={96} height={17} rx={5}
                          fill={labelBg} opacity={0.97}/>
                        <text x={pos.x} y={pos.y + r + 17} textAnchor="middle"
                          fontSize="9.5" fill={labelText} fontWeight="500">
                          {item.title.slice(0, 15)}{item.title.length > 15 ? "..." : ""}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              <circle cx={CX} cy={CY} r={14}
                fill={isDark ? "rgba(212,175,55,0.1)" : "rgba(212,175,55,0.15)"}
                stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.5"/>
              <text x={CX} y={CY + 5} textAnchor="middle" fontSize="12">🧠</text>
            </g>
          </svg>
        )}

        <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-xl text-[11px] border"
          style={{ background: isDark ? "rgba(8,8,16,0.85)" : "rgba(240,240,236,0.9)", borderColor: isDark ? "#1a1a2a" : "#dddde8", color: isDark ? "#444" : "#999" }}>
          {items.length} nós · {autoConns.length + connections.length} conexões · {Math.round(zoom * 100)}%
        </div>
      </div>
    </div>
  );
}

// ── SAVE / EDIT MODAL ─────────────────────────────────────
function ItemModal({ initial, onSave, onClose }: {
  initial?: BrainItem;
  onSave: (data: { title: string; content: string; source: BrainItemSource; url?: string; tags: string[] }) => void;
  onClose: () => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [source, setSource] = useState<BrainItemSource>(initial?.source ?? "saved");
  const [url, setUrl] = useState(initial?.url ?? "");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(initial?.tags ?? []);

  function addTag() {
    const t = tagInput.trim().toLowerCase();
    if (t && !tags.includes(t)) setTags(prev => [...prev, t]);
    setTagInput("");
  }

  const cfg = SOURCE_CONFIG[source];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="w-full max-w-md rounded-2xl border p-6"
        style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border-2)" }}>
        <h3 className="text-[16px] font-bold mb-5" style={{ color: "var(--text-primary)" }}>
          {initial ? "Editar item" : "Salvar no Segundo Cérebro"}
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>Tipo</p>
            <div className="flex flex-wrap gap-2">
              {(Object.entries(SOURCE_CONFIG) as [BrainItemSource, typeof SOURCE_CONFIG[BrainItemSource]][]).map(([key, c]) => (
                <button key={key} onClick={() => setSource(key)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold border transition-all"
                  style={{ background: source === key ? `${c.color}18` : "transparent", borderColor: source === key ? c.color : "var(--app-border)", color: source === key ? c.color : "var(--text-muted)" }}>
                  {c.emoji} {c.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>Título</p>
            <input value={title} onChange={e => setTitle(e.target.value)} autoFocus
              placeholder="Nome do conteúdo..."
              className="w-full px-3 py-2.5 rounded-xl text-[14px] border outline-none"
              style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }}
              onFocus={e => (e.target.style.borderColor = cfg.color)}
              onBlur={e => (e.target.style.borderColor = "var(--app-border-2)")}/>
          </div>
          {source === "saved" && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>URL (opcional)</p>
              <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..."
                className="w-full px-3 py-2.5 rounded-xl text-[13px] border outline-none"
                style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }}/>
            </div>
          )}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>Resumo / Insight</p>
            <textarea value={content} onChange={e => setContent(e.target.value)}
              placeholder="O que você aprendeu ou quer lembrar?"
              rows={3} className="w-full px-3 py-2.5 rounded-xl text-[13px] border outline-none resize-none"
              style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)", fontFamily: "inherit" }}/>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>Tags</p>
            <div className="flex gap-2 mb-2">
              <input value={tagInput} onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addTag()}
                placeholder="Ex: produtividade, foco..."
                className="flex-1 px-3 py-2 rounded-xl text-[13px] border outline-none"
                style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }}/>
              <button onClick={addTag} className="px-3 py-2 rounded-xl text-[13px] font-bold"
                style={{ background: cfg.color, color: "#000" }}>+</button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tags.map(t => (
                  <span key={t} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold cursor-pointer"
                    style={{ background: `${cfg.color}15`, color: cfg.color }}
                    onClick={() => setTags(prev => prev.filter(x => x !== t))}>
                    {t} ✕
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={() => onSave({ title, content, source, url: url || undefined, tags })}
            disabled={!title.trim()}
            className="flex-1 py-2.5 rounded-xl text-[14px] font-bold disabled:opacity-40"
            style={{ background: cfg.color, color: "#000" }}>
            {initial ? "Salvar alterações" : "Salvar no Cérebro"}
          </button>
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-[14px] border"
            style={{ borderColor: "var(--app-border-2)", color: "var(--text-secondary)" }}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────
export default function SecondBrainPage() {
  const { user } = useAuthUser();
  const { isPremium } = useUserPlan();
  const { theme } = useTheme();

  const [items, setItems] = useState<BrainItem[]>([]);
  const [connections, setConnections] = useState<BrainConnection[]>([]);
  const [view, setView] = useState<View>("dashboard");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<BrainItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSource, setActiveSource] = useState<BrainItemSource | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const itemLimit = isPremium ? BRAIN_LIMITS.premium.items : BRAIN_LIMITS.free.items;
  const canAdd = items.length < itemLimit;
  const autoConns = findAutoConnections(items);

  useEffect(() => {
    if (!user) return;
    const u1 = subscribeToItems(user.uid, data => { setItems(data); setLoading(false); });
    const u2 = subscribeToConnections(user.uid, setConnections);
    const t = setTimeout(() => setLoading(false), 3000);
    return () => { u1(); u2(); clearTimeout(t); };
  }, [user]);

  async function handleSave(data: { title: string; content: string; source: BrainItemSource; url?: string; tags: string[] }) {
    if (!user || !data.title.trim()) return;
    if (editingItem) {
      await deleteItem(editingItem.id);
      await saveItem(user.uid, data);
    } else {
      await saveItem(user.uid, data);
    }
    setShowModal(false);
    setEditingItem(null);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    await deleteItem(deleteTarget);
    setDeleteTarget(null);
  }

  const filtered = items.filter(item => {
    if (activeSource !== "all" && item.source !== activeSource) return false;
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.content.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const recentItems = items.slice(0, 12);

  const ItemCard = ({ item, compact = false }: { item: BrainItem; compact?: boolean }) => {
    const cfg = SOURCE_CONFIG[item.source];
    return (
      <div className="p-5 rounded-2xl border transition-all group relative flex flex-col gap-3"
        style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)", borderLeft: `3px solid ${item.color}` }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = `${item.color}70`}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--app-border)"}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[20px] flex-shrink-0">{cfg.emoji}</span>
            <p className="text-[14px] font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>{item.title}</p>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
            <button onClick={() => { setEditingItem(item); setShowModal(true); }}
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ color: "var(--text-faint)" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--app-bg-4)"; el.style.color = "var(--text-primary)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "var(--text-faint)"; }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1.5 9.5l1-.3 5.5-5.5-.7-.7-5.5 5.5-.3 1z" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
            </button>
            <button onClick={() => setDeleteTarget(item.id)}
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ color: "var(--text-faint)" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--danger-bg)"; el.style.color = "var(--danger)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "var(--text-faint)"; }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 2l7 7M9 2l-7 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>
        {item.content && (
          <p className="text-[12px] leading-relaxed flex-1"
            style={{ color: "var(--text-muted)" }}>
            {item.content.slice(0, 120)}{item.content.length > 120 ? "..." : ""}
          </p>
        )}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold"
            style={{ background: `${item.color}18`, color: item.color }}>
            {cfg.label}
          </span>
          {item.tags.slice(0, 2).map(t => (
            <span key={t} className="text-[11px] px-2 py-0.5 rounded-full"
              style={{ background: "var(--app-bg-4)", color: "var(--text-faint)" }}>
              {t}
            </span>
          ))}
          {item.url && (
            <a href={item.url} target="_blank" rel="noopener noreferrer"
              className="text-[11px] ml-auto" style={{ color: "var(--gold)" }}
              onClick={e => e.stopPropagation()}>🔗</a>
          )}
        </div>
      </div>
    );
  };

  if (loading) return (
    <div className="flex items-center justify-center h-full" style={{ background: "var(--app-bg)" }}>
      <div className="w-7 h-7 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "var(--gold)" }} />
    </div>
  );

  return (
    <div className="flex flex-col h-screen" style={{ background: "var(--app-bg)" }}>

      {/* TOPBAR */}
      <div className="flex-shrink-0 border-b" style={{ borderColor: "var(--app-border)", background: "var(--app-bg-2)" }}>
        <div className="px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-[22px] font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
              🧠 Segundo Cérebro
            </h1>
            <p className="text-[12px] mt-0.5" style={{ color: "var(--text-muted)" }}>
              {items.length} item{items.length !== 1 ? "s" : ""} · {autoConns.length} conexões descobertas
              {!isPremium && ` · ${items.length}/${itemLimit} no plano gratuito`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-1 rounded-xl border"
              style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border)" }}>
              {([
                { id: "dashboard" as View, label: "Dashboard" },
                { id: "explore" as View, label: "Explorar" },
                { id: "visual" as View, label: "Mapa" },
              ]).map(({ id, label }) => (
                <button key={id} onClick={() => setView(id)}
                  className="px-4 py-2 rounded-lg text-[13px] font-semibold transition-all border"
                  style={{ background: view === id ? "var(--gold-bg)" : "transparent", borderColor: view === id ? "var(--gold)" : "transparent", color: view === id ? "var(--gold)" : "var(--text-secondary)" }}>
                  {label}
                </button>
              ))}
            </div>
            <button onClick={() => canAdd ? (setEditingItem(null), setShowModal(true)) : null}
              disabled={!canAdd}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-bold disabled:opacity-50 transition-all hover:scale-[1.01]"
              style={{ background: canAdd ? "var(--gold)" : "var(--app-bg-4)", color: canAdd ? "#000" : "var(--text-muted)" }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
              Salvar
            </button>
          </div>
        </div>
      </div>

      {/* MAPA VISUAL */}
      {view === "visual" && (
        <VisualView
          items={items}
          connections={connections}
          theme={theme as "dark" | "light"}
          onSelectItem={item => { if (item) { setEditingItem(item); } }}
        />
      )}

      {/* EXPLORAR */}
      {view === "explore" && (
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="flex gap-3 mb-5">
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar no seu Segundo Cérebro..."
              className="flex-1 px-4 py-2.5 rounded-xl text-[14px] border outline-none"
              style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }}
              onFocus={e => (e.target.style.borderColor = "var(--gold)")}
              onBlur={e => (e.target.style.borderColor = "var(--app-border-2)")}/>
            <div className="flex gap-1.5">
              <button onClick={() => setActiveSource("all")}
                className="px-3 py-2 rounded-xl text-[12px] font-semibold border transition-all"
                style={{ background: activeSource === "all" ? "var(--gold-bg)" : "transparent", borderColor: activeSource === "all" ? "var(--gold)" : "var(--app-border)", color: activeSource === "all" ? "var(--gold)" : "var(--text-muted)" }}>
                Todos
              </button>
              {(Object.entries(SOURCE_CONFIG) as [BrainItemSource, typeof SOURCE_CONFIG[BrainItemSource]][])
                .filter(([key]) => items.some(i => i.source === key))
                .map(([key, cfg]) => (
                  <button key={key} onClick={() => setActiveSource(key)}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl text-[12px] font-semibold border transition-all"
                    style={{ background: activeSource === key ? `${cfg.color}18` : "transparent", borderColor: activeSource === key ? cfg.color : "var(--app-border)", color: activeSource === key ? cfg.color : "var(--text-muted)" }}>
                    {cfg.emoji} {cfg.label}
                  </button>
                ))}
            </div>
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[14px]" style={{ color: "var(--text-muted)" }}>Nenhum item encontrado</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3">
              {filtered.map(item => <ItemCard key={item.id} item={item} compact />)}
            </div>
          )}
        </div>
      )}

      {/* DASHBOARD */}
      {view === "dashboard" && (
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto px-8 py-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="text-[48px]">🧠</div>
                <h2 className="text-[20px] font-bold" style={{ color: "var(--text-primary)" }}>Seu Segundo Cérebro está vazio</h2>
                <p className="text-[14px] text-center max-w-sm" style={{ color: "var(--text-muted)" }}>
                  Salve insights das suas notas, diário, flashcards e metas. O sistema vai conectar automaticamente.
                </p>
                <button onClick={() => setShowModal(true)}
                  className="px-6 py-3 rounded-xl text-[14px] font-bold mt-2"
                  style={{ background: "var(--gold)", color: "#000" }}>
                  Salvar primeiro item
                </button>
              </div>
            ) : (
              <div className="space-y-6 max-w-4xl">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest mb-3"
                    style={{ color: "var(--text-muted)" }}>Adicionados recentemente</p>
                  <div className="grid grid-cols-4 gap-4">
                    {recentItems.map(item => <ItemCard key={item.id} item={item} compact />)}
                  </div>
                </div>

                {autoConns.length > 0 && (
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest mb-3"
                      style={{ color: "var(--text-muted)" }}>
                      ✦ Conexões descobertas automaticamente
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {autoConns.slice(0, 6).map((conn, i) => {
                        const from = items.find(x => x.id === conn.fromId);
                        const to = items.find(x => x.id === conn.toId);
                        if (!from || !to) return null;
                        return (
                          <div key={i} className="flex items-center gap-3 p-3 rounded-xl border"
                            style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
                            <div className="flex items-center gap-1.5 flex-1 min-w-0">
                              <span className="text-[14px]">{SOURCE_CONFIG[from.source].emoji}</span>
                              <p className="text-[12px] font-semibold truncate"
                                style={{ color: SOURCE_CONFIG[from.source].color }}>
                                {from.title.slice(0, 20)}{from.title.length > 20 ? "..." : ""}
                              </p>
                            </div>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                              <path d="M3 7h8M8 4l3 3-3 3" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <div className="flex items-center gap-1.5 flex-1 min-w-0 justify-end">
                              <p className="text-[12px] font-semibold truncate"
                                style={{ color: SOURCE_CONFIG[to.source].color }}>
                                {to.title.slice(0, 20)}{to.title.length > 20 ? "..." : ""}
                              </p>
                              <span className="text-[14px]">{SOURCE_CONFIG[to.source].emoji}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="w-64 border-l flex-shrink-0 overflow-y-auto px-5 py-6"
            style={{ borderColor: "var(--app-border)", background: "var(--app-bg-2)" }}>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-3"
              style={{ color: "var(--text-muted)" }}>Visão do mapa</p>
            <div className="rounded-xl overflow-hidden border mb-5 relative"
              style={{ background: theme === "dark" ? "#0d0d0f" : "#f5f5f7", borderColor: "var(--app-border)", height: 160 }}>
              {items.length > 0 ? (
                <svg className="w-full h-full">
                  {(() => {
                    const mini = items.slice(0, 15);
                    const cx = 100; const cy = 80;
                    const pos: Record<string, {x:number;y:number}> = {};
                    mini.forEach((item, i) => {
                      const a = (i / mini.length) * Math.PI * 2;
                      pos[item.id] = { x: cx + Math.cos(a) * 60, y: cy + Math.sin(a) * 55 };
                    });
                    const aconns = findAutoConnections(mini);
                    return (
                      <g>
                        {aconns.map((c, i) => {
                          const f = pos[c.fromId]; const t = pos[c.toId];
                          if (!f || !t) return null;
                          return <line key={i} x1={f.x} y1={f.y} x2={t.x} y2={t.y} stroke="rgba(212,175,55,0.2)" strokeWidth="1"/>;
                        })}
                        <circle cx={cx} cy={cy} r={12} fill="rgba(212,175,55,0.1)" stroke="#D4AF37" strokeWidth="1"/>
                        <text x={cx} y={cy+4} textAnchor="middle" fontSize="8" fill="#D4AF37">🧠</text>
                        {mini.map(item => {
                          const p = pos[item.id];
                          if (!p) return null;
                          return <circle key={item.id} cx={p.x} cy={p.y} r={5} fill={`${item.color}30`} stroke={item.color} strokeWidth="1"/>;
                        })}
                      </g>
                    );
                  })()}
                </svg>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-[10px]" style={{ color: theme === "dark" ? "#222" : "#ccc" }}>Sem itens</p>
                </div>
              )}
              <button onClick={() => setView("visual")}
                className="absolute bottom-2 right-2 text-[9px] px-2 py-0.5 rounded"
                style={{ background: "rgba(0,0,0,0.5)", color: "#888" }}>
                Ver mapa →
              </button>
            </div>

            <p className="text-[11px] font-bold uppercase tracking-widest mb-3"
              style={{ color: "var(--text-muted)" }}>Por fonte</p>
            <div className="space-y-3 mb-5">
              {(Object.entries(SOURCE_CONFIG) as [BrainItemSource, typeof SOURCE_CONFIG[BrainItemSource]][])
                .filter(([key]) => items.some(i => i.source === key))
                .map(([key, cfg]) => {
                  const count = items.filter(i => i.source === key).length;
                  const pct = Math.round((count / items.length) * 100);
                  return (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[12px]">{cfg.emoji}</span>
                          <span className="text-[12px] font-medium" style={{ color: "var(--text-secondary)" }}>{cfg.label}</span>
                        </div>
                        <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>{count}</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--app-border)" }}>
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: cfg.color }} />
                      </div>
                    </div>
                  );
                })}
            </div>

            {!isPremium && (
              <div className="p-3 rounded-xl border mb-4"
                style={{ borderColor: "var(--app-border)", background: "var(--app-bg-3)" }}>
                <p className="text-[11px] font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                  {items.length}/{itemLimit} itens
                </p>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--app-border)" }}>
                  <div className="h-full rounded-full" style={{ width: `${(items.length / itemLimit) * 100}%`, background: "var(--gold)" }} />
                </div>
              </div>
            )}

            <button onClick={() => canAdd ? (setEditingItem(null), setShowModal(true)) : null}
              disabled={!canAdd}
              className="w-full py-2.5 rounded-xl text-[13px] font-bold disabled:opacity-50"
              style={{ background: canAdd ? "var(--gold)" : "var(--app-bg-4)", color: canAdd ? "#000" : "var(--text-muted)" }}>
              {canAdd ? "+ Salvar conteúdo" : `Limite (${itemLimit})`}
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <ItemModal
          initial={editingItem ?? undefined}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditingItem(null); }}
        />
      )}

      {deleteTarget && (
        <ConfirmModal title="Remover do Segundo Cérebro?"
          description="Este item será removido permanentemente."
          confirmLabel="Remover" cancelLabel="Cancelar" variant="danger"
          onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      )}
    </div>
  );
}
