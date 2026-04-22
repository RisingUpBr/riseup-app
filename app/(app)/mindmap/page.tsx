"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useUserPlan } from "@/lib/useUserPlan";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/ConfirmModal";
import {
  Mindmap, MindmapNode, MindmapConnection,
  subscribeToMindmaps, createMindmap, saveMindmap, deleteMindmap,
  NODE_COLORS,
} from "@/lib/mindmapService";

type Tool = "select" | "text" | "card" | "sticky" | "connect" | "image";
type ElementType = "text" | "card" | "sticky" | "image";

interface CanvasNode extends MindmapNode {
  elementType: ElementType;
  width: number;
  height: number;
  cardBack?: string;
  imageData?: string;
  fontSize?: number;
  createdAt?: number;
}

let uid = 0;
const genId = () => `n_${Date.now()}_${uid++}`;
const genCId = () => `c_${Date.now()}_${uid++}`;

function formatTs(ts?: number) {
  if (!ts) return "";
  const d = new Date(ts);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit" }) + " " +
    d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

const TOOL_CONFIG: { id: Tool; label: string; key: string; icon: React.ReactNode }[] = [
  { id: "select", label: "Selecionar", key: "V", icon: <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M3 2l9 5-5 1.5-2 4.5L3 2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg> },
  { id: "text",   label: "Texto",      key: "T", icon: <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 3h9M6.5 3v7M4.5 10h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg> },
  { id: "card",   label: "Card",       key: "C", icon: <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="2" y="2" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M2 6h9" stroke="currentColor" strokeWidth="1"/></svg> },
  { id: "sticky", label: "Sticky",     key: "S", icon: <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 2h9v7l-3 2H2V2z" stroke="currentColor" strokeWidth="1.2"/><path d="M10 9l-1 2v-2h1z" fill="currentColor" opacity=".4"/></svg> },
  { id: "connect",label: "Conectar",   key: "L", icon: <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="2.5" cy="6.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/><circle cx="10.5" cy="6.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M4 6.5h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg> },
  { id: "image",  label: "Imagem",     key: "I", icon: <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="2" y="2" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.2"/><circle cx="4.5" cy="4.5" r=".8" fill="currentColor"/><path d="M2 8.5l3-3 2 2 2-2 2 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg> },
];

function NodeEl({ node, selected, canvasDark, onPointerDown, onConnectStart, onUpdate, onDelete }: {
  node: CanvasNode; selected: boolean; canvasDark: boolean;
  onPointerDown: (id: string, e: React.PointerEvent) => void;
  onConnectStart: (id: string) => void;
  onUpdate: (id: string, patch: Partial<CanvasNode>) => void;
  onDelete: (id: string) => void;
}) {
  const bgColor = canvasDark
    ? NODE_COLORS.find(c => c.color === node.color)?.bg ?? "#111"
    : NODE_COLORS.find(c => c.color === node.color)?.bgLight ?? "#fff";
  const borderColor = selected ? node.color : canvasDark ? `${node.color}55` : `${node.color}88`;

  const ColorBar = () => (
    <div className="absolute flex items-center gap-1 px-1.5 py-1 rounded-lg border"
      style={{ top: -38, left: "50%", transform: "translateX(-50%)", background: canvasDark ? "#141414" : "#fff", borderColor: canvasDark ? "#222" : "#e0e0e0", whiteSpace: "nowrap", zIndex: 30 }}
      onPointerDown={e => e.stopPropagation()}>
      {NODE_COLORS.map(c => (
        <div key={c.color} className="w-3.5 h-3.5 rounded-full cursor-pointer hover:scale-110 transition-transform border-2"
          style={{ background: c.color, borderColor: node.color === c.color ? "#fff" : "transparent" }}
          onClick={() => onUpdate(node.id, { color: c.color, bg: c.bg })} />
      ))}
      <div className="w-px h-3 mx-1 self-center" style={{ background: "#333" }} />
      <button className="text-[10px] font-bold px-1" style={{ color: "#ef4444" }}
        onClick={() => onDelete(node.id)}>✕</button>
    </div>
  );

  const ConnectDot = () => (
    <div
      className="absolute w-3 h-3 rounded-full border-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-crosshair"
      style={{ right: -6, top: "50%", transform: "translateY(-50%)", background: node.color, borderColor: canvasDark ? "#0A0A0A" : "#fff", zIndex: 20 }}
      onPointerDown={e => { e.stopPropagation(); onConnectStart(node.id); }} />
  );

  const Timestamp = () => (node.createdAt && selected) ? (
    <div className="text-[9px] mt-1.5 opacity-40" style={{ color: node.color }}>{formatTs(node.createdAt)}</div>
  ) : null;

  if (node.elementType === "image") return (
    <div data-node="true" onPointerDown={e => { e.stopPropagation(); onPointerDown(node.id, e); }}
      className="absolute rounded-xl overflow-hidden border-2 cursor-move group"
      style={{ left: node.x, top: node.y, width: node.width, height: node.height, borderColor, boxShadow: selected ? `0 0 0 3px ${node.color}40` : "none", zIndex: selected ? 10 : 1 }}>
      {selected && <ColorBar />}
      {node.imageData && <img src={node.imageData} alt="" className="w-full h-full object-cover" draggable={false}/>}
      {selected && node.createdAt && (
        <div className="absolute bottom-1 left-1 text-[9px] px-1.5 py-0.5 rounded" style={{ background: "rgba(0,0,0,0.55)", color: "#aaa" }}>{formatTs(node.createdAt)}</div>
      )}
      <ConnectDot />
    </div>
  );

  if (node.elementType === "sticky") return (
    <div data-node="true" onPointerDown={e => { e.stopPropagation(); onPointerDown(node.id, e); }}
      className="absolute cursor-move group"
      style={{ left: node.x, top: node.y, width: node.width, background: bgColor, borderRadius: "4px 4px 4px 0", boxShadow: selected ? `0 0 0 3px ${node.color}40, 2px 6px 16px rgba(0,0,0,0.3)` : "2px 4px 12px rgba(0,0,0,0.2)", zIndex: selected ? 10 : 1 }}>
      {selected && <ColorBar />}
      <div style={{ borderLeft: `3px solid ${node.color}` }} className="px-3 pt-2.5 pb-3">
        <div contentEditable suppressContentEditableWarning
          onBlur={e => onUpdate(node.id, { text: e.currentTarget.textContent || "" })}
          onPointerDown={e => e.stopPropagation()}
          className="outline-none text-[13px] leading-relaxed"
          style={{ color: node.color, minHeight: 60, minWidth: 100 }}>
          {node.text}
        </div>
        <Timestamp />
      </div>
      <ConnectDot />
    </div>
  );

  if (node.elementType === "card") return (
    <div data-node="true" onPointerDown={e => { e.stopPropagation(); onPointerDown(node.id, e); }}
      className="absolute rounded-xl border-2 cursor-move overflow-hidden group"
      style={{ left: node.x, top: node.y, width: node.width, background: bgColor, borderColor, boxShadow: selected ? `0 0 0 3px ${node.color}40` : "none", zIndex: selected ? 10 : 1 }}>
      {selected && <ColorBar />}
      <div className="px-3 py-2 border-b" style={{ borderColor: `${node.color}30` }}>
        <div className="text-[9px] uppercase tracking-widest font-bold mb-1" style={{ color: `${node.color}70` }}>Frente</div>
        <div contentEditable suppressContentEditableWarning
          onBlur={e => onUpdate(node.id, { text: e.currentTarget.textContent || "" })}
          onPointerDown={e => e.stopPropagation()}
          className="outline-none text-[13px] font-semibold" style={{ color: node.color, minHeight: 18 }}>{node.text}</div>
      </div>
      <div className="px-3 py-2">
        <div className="text-[9px] uppercase tracking-widest font-bold mb-1" style={{ color: `${node.color}50` }}>Verso</div>
        <div contentEditable suppressContentEditableWarning
          onBlur={e => onUpdate(node.id, { cardBack: e.currentTarget.textContent || "" })}
          onPointerDown={e => e.stopPropagation()}
          className="outline-none text-[12px]" style={{ color: canvasDark ? "#777" : "#555", minHeight: 18 }}>{node.cardBack || ""}</div>
        <Timestamp />
      </div>
      <ConnectDot />
    </div>
  );

  return (
    <div data-node="true" onPointerDown={e => { e.stopPropagation(); onPointerDown(node.id, e); }}
      className="absolute rounded-xl border-2 cursor-move group"
      style={{ left: node.x, top: node.y, minWidth: 100, background: bgColor, borderColor, boxShadow: selected ? `0 0 0 3px ${node.color}40` : "none", zIndex: selected ? 10 : 1 }}>
      {selected && <ColorBar />}
      <div className="px-3 py-2.5">
        <div contentEditable suppressContentEditableWarning
          onBlur={e => onUpdate(node.id, { text: e.currentTarget.textContent || "" })}
          onPointerDown={e => e.stopPropagation()}
          className="outline-none font-semibold leading-snug"
          style={{ color: node.color, fontSize: node.fontSize ?? 14, minHeight: 20, minWidth: 80 }}>
          {node.text}
        </div>
        <Timestamp />
      </div>
      <ConnectDot />
    </div>
  );
}

export default function MindmapPage() {
  const { user } = useAuthUser();
  const { isPremium } = useUserPlan();
  const router = useRouter();

  const [maps, setMaps] = useState<Mindmap[]>([]);
  const [activeMapId, setActiveMapId] = useState<string | null>(null);
  const [nodes, setNodes] = useState<CanvasNode[]>([]);
  const [connections, setConnections] = useState<MindmapConnection[]>([]);
  const [canvasDark, setCanvasDark] = useState(true);
  const [tool, setTool] = useState<Tool>("select");
  const [selected, setSelected] = useState<string | null>(null);
  const [connecting, setConnecting] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [editingName, setEditingName] = useState(false);
  const [newMapName, setNewMapName] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [history, setHistory] = useState<{ nodes: CanvasNode[]; connections: MindmapConnection[] }[]>([]);

  const canvasRef = useRef<HTMLDivElement>(null);
  const saveTimer = useRef<NodeJS.Timeout | null>(null);
  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pendingImagePos = useRef<{ x: number; y: number } | null>(null);
  const activeMapIdRef = useRef<string | null>(null);
  activeMapIdRef.current = activeMapId;
  const nodesRef = useRef(nodes);
  nodesRef.current = nodes;
  const connectionsRef = useRef(connections);
  connectionsRef.current = connections;
  const selectedRef = useRef(selected);
  selectedRef.current = selected;
  const historyRef = useRef(history);
  historyRef.current = history;

  useEffect(() => {
    if (!user) return;
    return subscribeToMindmaps(user.uid, (data) => {
      setMaps(data);
      setLoading(false);
      if (data.length > 0 && !activeMapIdRef.current) loadMap(data[0]);
    });
  }, [user]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isEditing = (e.target as HTMLElement).getAttribute("contenteditable") ||
        ["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName);
      if (isEditing) return;

      const keyMap: Record<string, Tool> = { v: "select", t: "text", c: "card", s: "sticky", l: "connect", i: "image" };
      if (keyMap[e.key.toLowerCase()]) { setTool(keyMap[e.key.toLowerCase()]); return; }

      if (e.key === "Escape") { setConnecting(null); setTool("select"); setSelected(null); }
      if ((e.key === "Delete" || e.key === "Backspace") && selectedRef.current) {
        pushHistory();
        deleteNodeById(selectedRef.current);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "z") { e.preventDefault(); undo(); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function pushHistory() {
    setHistory(h => [...h.slice(-20), { nodes: [...nodesRef.current], connections: [...connectionsRef.current] }]);
  }

  function undo() {
    const h = historyRef.current;
    if (!h.length) return;
    const prev = h[h.length - 1];
    setNodes(prev.nodes);
    setConnections(prev.connections);
    setHistory(h.slice(0, -1));
    triggerSave(activeMapIdRef.current!, prev.nodes, prev.connections, canvasDark);
  }

  function loadMap(map: Mindmap) {
    setActiveMapId(map.id);
    setNodes((map.nodes ?? []) as CanvasNode[]);
    setConnections(map.connections ?? []);
    setCanvasDark(map.canvasDark ?? true);
    setSelected(null); setConnecting(null); setHistory([]);
  }

  const triggerSave = useCallback((mapId: string, n: CanvasNode[], c: MindmapConnection[], dark: boolean) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setSaving(true);
    saveTimer.current = setTimeout(async () => {
      await saveMindmap(mapId, { nodes: n as unknown as MindmapNode[], connections: c, canvasDark: dark });
      setSaving(false);
    }, 1500);
  }, []);

  function save(n: CanvasNode[], c: MindmapConnection[], dark?: boolean) {
    if (!activeMapIdRef.current) return;
    triggerSave(activeMapIdRef.current, n, c, dark ?? canvasDark);
  }

  function makeNode(x: number, y: number, type: ElementType): CanvasNode {
    const color = NODE_COLORS[0];
    const base = { id: genId(), x, y, color: color.color, bg: color.bg, type: "default" as const, elementType: type, createdAt: Date.now() };
    if (type === "text") return { ...base, text: "Texto", width: 140, height: 40, fontSize: 15 };
    if (type === "card") return { ...base, text: "Frente", cardBack: "Verso", width: 190, height: 100 };
    if (type === "sticky") return { ...base, text: "Escreva aqui...", width: 170, height: 90 };
    return { ...base, text: "", width: 180, height: 140 };
  }

  function createElement(x: number, y: number, type: ElementType) {
    pushHistory();
    const node = makeNode(x - 70, y - 30, type);
    const updated = [...nodesRef.current, node];
    setNodes(updated); setSelected(node.id); setTool("select");
    save(updated, connectionsRef.current);
  }

  function updateNode(id: string, patch: Partial<CanvasNode>) {
    const updated = nodesRef.current.map(n => n.id === id ? { ...n, ...patch } : n);
    setNodes(updated); save(updated, connectionsRef.current);
  }

  function deleteNodeById(id: string) {
    const updN = nodesRef.current.filter(n => n.id !== id);
    const updC = connectionsRef.current.filter(c => c.fromId !== id && c.toId !== id);
    setNodes(updN); setConnections(updC); setSelected(null);
    save(updN, updC);
  }

  function moveNode(id: string, dx: number, dy: number) {
    const updated = nodesRef.current.map(n => n.id === id ? { ...n, x: n.x + dx / zoom, y: n.y + dy / zoom } : n);
    setNodes(updated); save(updated, connectionsRef.current);
  }

  function connectNodes(toId: string) {
    if (!connecting || connecting === toId) { setConnecting(null); return; }
    const exists = connectionsRef.current.find(c =>
      (c.fromId === connecting && c.toId === toId) || (c.fromId === toId && c.toId === connecting)
    );
    if (!exists) {
      const newConn: MindmapConnection = { id: genCId(), fromId: connecting, toId };
      const updated = [...connectionsRef.current, newConn];
      setConnections(updated); save(nodesRef.current, updated);
    }
    setConnecting(null); setTool("select");
  }

  function getCanvasPos(e: { clientX: number; clientY: number }) {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: (e.clientX - rect.left - pan.x) / zoom, y: (e.clientY - rect.top - pan.y) / zoom };
  }

  function handleCanvasClick(e: React.MouseEvent) {
    if ((e.target as HTMLElement).closest("[data-node]")) return;
    if (tool === "select") { setSelected(null); setConnecting(null); return; }
    if (tool === "connect") return;
    if (tool === "image") {
      pendingImagePos.current = getCanvasPos(e);
      fileInputRef.current?.click();
      return;
    }
    const typeMap: Record<string, ElementType> = { text: "text", card: "card", sticky: "sticky" };
    const type = typeMap[tool];
    if (!type) return;
    const pos = getCanvasPos(e);
    createElement(pos.x, pos.y, type);
  }

  function handleCanvasDoubleClick(e: React.MouseEvent) {
    if ((e.target as HTMLElement).closest("[data-node]")) return;
    const pos = getCanvasPos(e);
    createElement(pos.x, pos.y, "text");
    setTool("select");
  }

  function handleCanvasPointerDown(e: React.PointerEvent) {
    if ((e.target as HTMLElement).closest("[data-node]")) return;
    if (tool !== "select") return;
    isPanning.current = true;
    panStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
  }

  function handleCanvasPointerMove(e: React.PointerEvent) {
    if (!isPanning.current) return;
    setPan({ x: panStart.current.panX + e.clientX - panStart.current.x, y: panStart.current.panY + e.clientY - panStart.current.y });
  }

  function handleCanvasPointerUp() { isPanning.current = false; }

  function handleNodePointerDown(id: string, e: React.PointerEvent) {
    if (tool === "connect") { connecting ? connectNodes(id) : setConnecting(id); return; }
    setSelected(id);
    const startX = e.clientX; const startY = e.clientY;
    const handleMove = (me: PointerEvent) => moveNode(id, me.clientX - startX, me.clientY - startY);
    const handleUp = () => { document.removeEventListener("pointermove", handleMove); document.removeEventListener("pointerup", handleUp); };
    document.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerup", handleUp);
  }

  function handleWheel(e: React.WheelEvent) {
    e.preventDefault();
    const rect = canvasRef.current!.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const factor = e.deltaY > 0 ? 0.92 : 1.08;
    const newZoom = Math.min(Math.max(zoom * factor, 0.2), 3);
    const scale = newZoom / zoom;
    setPan(p => ({ x: mouseX - scale * (mouseX - p.x), y: mouseY - scale * (mouseY - p.y) }));
    setZoom(newZoom);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = Array.from(e.dataTransfer.files).find(f => f.type.startsWith("image/"));
    if (!file) return;
    if (file.size > 1.5 * 1024 * 1024) { alert("Imagem deve ter no máximo 1.5MB"); return; }
    const pos = getCanvasPos(e);
    const reader = new FileReader();
    reader.onload = ev => {
      const data = ev.target?.result as string;
      pushHistory();
      const node: CanvasNode = { id: genId(), x: pos.x - 90, y: pos.y - 70, text: "", color: NODE_COLORS[0].color, bg: NODE_COLORS[0].bg, type: "default", elementType: "image", width: 200, height: 150, imageData: data, createdAt: Date.now() };
      const updated = [...nodesRef.current, node];
      setNodes(updated); setSelected(node.id);
      save(updated, connectionsRef.current);
    };
    reader.readAsDataURL(file);
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1.5 * 1024 * 1024) { alert("Imagem deve ter no máximo 1.5MB"); return; }
    const pos = pendingImagePos.current ?? { x: 200, y: 200 };
    const reader = new FileReader();
    reader.onload = ev => {
      const data = ev.target?.result as string;
      pushHistory();
      const node: CanvasNode = { id: genId(), x: pos.x - 90, y: pos.y - 70, text: "", color: NODE_COLORS[0].color, bg: NODE_COLORS[0].bg, type: "default", elementType: "image", width: 200, height: 150, imageData: data, createdAt: Date.now() };
      const updated = [...nodesRef.current, node];
      setNodes(updated); setSelected(node.id);
      save(updated, connectionsRef.current);
      pendingImagePos.current = null;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  async function handleNewMap() {
    if (!user || !newMapName.trim()) return;
    await createMindmap(user.uid, newMapName.trim());
    setNewMapName(""); setEditingName(false);
  }

  async function handleDeleteMap() {
    if (!deleteTarget) return;
    await deleteMindmap(deleteTarget);
    if (activeMapId === deleteTarget) { setActiveMapId(null); setNodes([]); setConnections([]); }
    setDeleteTarget(null);
  }

  function toggleCanvasDark() {
    const d = !canvasDark; setCanvasDark(d); save(nodesRef.current, connectionsRef.current, d);
  }

  const activeMap = maps.find(m => m.id === activeMapId);

  if (!isPremium) return (
    <div className="flex flex-col items-center justify-center h-full gap-5" style={{ background: "var(--app-bg)" }}>
      <div className="w-20 h-20 rounded-3xl flex items-center justify-center border" style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border)" }}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="5" fill="currentColor" opacity="0.4" style={{ color: "var(--gold)" }}/>
          <circle cx="8" cy="12" r="3.5" fill="currentColor" opacity="0.3" style={{ color: "var(--gold)" }}/>
          <circle cx="32" cy="12" r="3.5" fill="currentColor" opacity="0.3" style={{ color: "var(--gold)" }}/>
          <circle cx="8" cy="28" r="3.5" fill="currentColor" opacity="0.3" style={{ color: "var(--gold)" }}/>
          <circle cx="32" cy="28" r="3.5" fill="currentColor" opacity="0.3" style={{ color: "var(--gold)" }}/>
          <path d="M15 17.5L11 14M25 17.5l4-3.5M15 22.5L11 26M25 22.5l4 3.5" stroke="var(--gold)" strokeWidth="1.5" opacity="0.4"/>
        </svg>
      </div>
      <h2 className="text-[22px] font-bold" style={{ color: "var(--text-primary)" }}>Mapa Mental</h2>
      <p className="text-[14px] text-center max-w-sm" style={{ color: "var(--text-tertiary)" }}>Canvas infinito. Conecte notas, cards, imagens e pensamentos livremente.</p>
      <button onClick={() => router.push("/planos-app")} className="px-8 py-3 rounded-xl text-[15px] font-bold transition-all hover:scale-[1.02]" style={{ background: "var(--gold)", color: "#000" }}>
        Fazer upgrade para acessar
      </button>
    </div>
  );

  if (loading) return (
    <div className="flex items-center justify-center h-full" style={{ background: "var(--app-bg)" }}>
      <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "var(--gold)" }} />
    </div>
  );

  if (maps.length === 0 && !editingName) return (
    <div className="flex flex-col items-center justify-center h-full gap-4" style={{ background: "var(--app-bg)" }}>
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center border" style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border)" }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="3" y="3" width="22" height="22" rx="4" stroke="var(--text-muted)" strokeWidth="1.5"/>
          <path d="M9 14h10M14 9v10" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      <h2 className="text-[20px] font-bold" style={{ color: "var(--text-primary)" }}>Nenhum mapa ainda</h2>
      <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>Crie seu primeiro mapa mental</p>
      <button onClick={() => setEditingName(true)} className="px-6 py-3 rounded-xl text-[14px] font-bold" style={{ background: "var(--gold)", color: "#000" }}>Criar mapa</button>
    </div>
  );

  return (
    <div className="flex flex-col h-screen" style={{ background: "var(--app-bg)" }}>

      {/* TOPBAR */}
      <div className="flex items-center gap-3 px-4 py-3 border-b flex-shrink-0"
        style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>

        <div className="flex items-center gap-2 overflow-x-auto flex-1 min-w-0">
          {maps.map(map => (
            <button key={map.id} onClick={() => loadMap(map)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold flex-shrink-0 border transition-all group"
              style={{ background: activeMapId === map.id ? "var(--gold-bg)" : "var(--app-bg-3)", borderColor: activeMapId === map.id ? "var(--gold)" : "var(--app-border)", color: activeMapId === map.id ? "var(--gold)" : "var(--text-secondary)" }}>
              {map.name}
              {activeMapId === map.id && (
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px]" style={{ color: "var(--text-muted)" }}
                  onClick={e => { e.stopPropagation(); setDeleteTarget(map.id); }}>✕</span>
              )}
            </button>
          ))}
          {editingName ? (
            <div className="flex items-center gap-2 flex-shrink-0">
              <input value={newMapName} onChange={e => setNewMapName(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") handleNewMap(); if (e.key === "Escape") setEditingName(false); }}
                placeholder="Nome do mapa..." autoFocus
                className="px-3 py-2 rounded-xl text-[13px] outline-none border"
                style={{ background: "var(--app-bg-3)", borderColor: "var(--gold)", color: "var(--text-primary)", width: 160 }}
              />
              <button onClick={handleNewMap} className="px-3 py-2 rounded-xl text-[12px] font-bold" style={{ background: "var(--gold)", color: "#000" }}>Criar</button>
              <button onClick={() => setEditingName(false)} className="text-[12px]" style={{ color: "var(--text-muted)" }}>Cancelar</button>
            </div>
          ) : (
            <button onClick={() => setEditingName(true)}
              className="px-3 py-2 rounded-xl text-[13px] font-medium border border-dashed flex-shrink-0 transition-all"
              style={{ borderColor: "var(--app-border-2)", color: "var(--text-muted)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--app-border-2)"}>
              + Novo mapa
            </button>
          )}
        </div>

        <div className="flex items-center gap-1 px-2 py-1.5 rounded-xl border flex-shrink-0"
          style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border)" }}>
          {TOOL_CONFIG.map(({ id, label, key, icon }) => (
            <button key={id} onClick={() => setTool(id)} title={`${label} (${key})`}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all border"
              style={{ background: tool === id ? "var(--gold-bg)" : "transparent", borderColor: tool === id ? "var(--gold)" : "transparent", color: tool === id ? "var(--gold)" : "var(--text-secondary)" }}>
              {icon}
              <span className="hidden lg:inline">{label}</span>
              <span className="hidden lg:inline text-[9px] opacity-40">{key}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button onClick={undo} disabled={!history.length} title="Desfazer (Ctrl+Z)"
            className="w-8 h-8 rounded-lg flex items-center justify-center border transition-all disabled:opacity-25"
            style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border)", color: "var(--text-secondary)" }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 5.5h6a3 3 0 010 6H5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M4.5 3L2 5.5 4.5 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <span className="text-[11px]" style={{ color: "var(--text-faint)" }}>{saving ? "Salvando..." : "Salvo"}</span>

          <div className="flex items-center gap-1 px-2 py-1.5 rounded-xl border"
            style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border)" }}>
            <button onClick={() => setZoom(z => Math.max(z - 0.1, 0.2))}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[16px] font-bold"
              style={{ color: "var(--text-secondary)" }}>−</button>
            <button onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
              className="text-[12px] min-w-[40px] text-center font-medium"
              style={{ color: "var(--text-muted)" }}>
              {Math.round(zoom * 100)}%
            </button>
            <button onClick={() => setZoom(z => Math.min(z + 0.1, 3))}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[16px] font-bold"
              style={{ color: "var(--text-secondary)" }}>+</button>
          </div>

          <button onClick={toggleCanvasDark}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border text-[12px] font-semibold transition-all"
            style={{ borderColor: "var(--app-border)", color: "var(--text-secondary)", background: "var(--app-bg-3)" }}>
            {canvasDark
              ? <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="2.5" stroke="currentColor" strokeWidth="1.2"/><path d="M6.5 1v1M6.5 11v1M1 6.5h1M11 6.5h1M2.9 2.9l.7.7M9.4 9.4l.7.7M9.4 2.9l-.7.7M2.9 9.4l.7-.7" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
              : <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M11 8A5 5 0 016 3a5 5 0 100 10 5 5 0 005-5z" stroke="currentColor" strokeWidth="1.2"/></svg>}
            {canvasDark ? "Claro" : "Escuro"}
          </button>
        </div>
      </div>

      {/* MAP INFO BAR */}
      {activeMap && (
        <div className="px-4 py-1.5 border-b flex items-center gap-3 flex-shrink-0"
          style={{ borderColor: "var(--app-border)", background: "var(--app-bg-2)" }}>
          <span className="text-[11px] font-semibold" style={{ color: "var(--text-secondary)" }}>{activeMap.name}</span>
          <span className="text-[10px]" style={{ color: "var(--text-faint)" }}>
            Última edição: {activeMap.updatedAt ? formatTs(activeMap.updatedAt.toDate?.()?.getTime() ?? 0) : "—"}
          </span>
          <span className="text-[10px] ml-auto" style={{ color: "var(--text-faint)" }}>
            {nodes.length} elemento{nodes.length !== 1 ? "s" : ""} · {connections.length} conexã{connections.length !== 1 ? "ões" : "o"}
          </span>
        </div>
      )}

      {/* CANVAS */}
      {activeMapId ? (
        <div ref={canvasRef}
          className="flex-1 relative overflow-hidden"
          style={{ background: canvasDark ? "#0A0A0A" : "#fafaf8", cursor: tool === "select" ? "grab" : "crosshair" }}
          onClick={handleCanvasClick}
          onDoubleClick={handleCanvasDoubleClick}
          onPointerDown={handleCanvasPointerDown}
          onPointerMove={handleCanvasPointerMove}
          onPointerUp={handleCanvasPointerUp}
          onWheel={handleWheel}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: `radial-gradient(circle, ${canvasDark ? "#1e1e1e" : "#d0d0cc"} 1px, transparent 1px)`, backgroundSize: `${28 * zoom}px ${28 * zoom}px`, backgroundPosition: `${pan.x % (28 * zoom)}px ${pan.y % (28 * zoom)}px` }} />

          {nodes.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none">
              <p className="text-[15px] font-medium" style={{ color: canvasDark ? "#222" : "#ccc" }}>Canvas vazio</p>
              <p className="text-[12px]" style={{ color: canvasDark ? "#1a1a1a" : "#ddd" }}>Duplo clique para adicionar texto · Arraste uma imagem aqui</p>
              <p className="text-[11px]" style={{ color: canvasDark ? "#161616" : "#e5e5e5" }}>T=Texto  C=Card  S=Sticky  I=Imagem  V=Selecionar  L=Conectar</p>
            </div>
          )}

          <div className="absolute" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: "0 0" }}>
            <svg className="absolute overflow-visible pointer-events-none" style={{ left: 0, top: 0, width: 1, height: 1 }}>
              <defs>
                <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill={canvasDark ? "#333" : "#aaa"}/>
                </marker>
              </defs>
              {connections.map(conn => {
                const from = nodes.find(n => n.id === conn.fromId);
                const to = nodes.find(n => n.id === conn.toId);
                if (!from || !to) return null;
                const x1 = from.x + (from.width ?? 140); const y1 = from.y + 20;
                const x2 = to.x; const y2 = to.y + 20;
                return <path key={conn.id} d={`M ${x1} ${y1} C ${x1+60} ${y1} ${x2-60} ${y2} ${x2} ${y2}`} stroke={canvasDark ? "#2a2a2a" : "#bbb"} strokeWidth="1.5" fill="none" markerEnd="url(#arr)"/>;
              })}
              {connecting && (() => {
                const from = nodes.find(n => n.id === connecting);
                if (!from) return null;
                return <circle cx={from.x + (from.width ?? 140)} cy={from.y + 20} r={7} fill="#D4AF37" opacity={0.9}/>;
              })()}
            </svg>

            {nodes.map(node => (
              <NodeEl key={node.id} node={node} selected={selected === node.id} canvasDark={canvasDark}
                onPointerDown={handleNodePointerDown}
                onConnectStart={id => { connecting ? connectNodes(id) : (setConnecting(id), setTool("connect")); }}
                onUpdate={updateNode}
                onDelete={id => { pushHistory(); deleteNodeById(id); }} />
            ))}
          </div>

          <div className="absolute bottom-5 right-5 flex flex-col gap-1.5">
            {[{ l: "+", a: () => setZoom(z => Math.min(z + 0.15, 3)) }, { l: "⊡", a: () => { setZoom(1); setPan({ x: 0, y: 0 }); } }, { l: "−", a: () => setZoom(z => Math.max(z - 0.15, 0.2)) }].map(({ l, a }) => (
              <button key={l} onClick={a} className="w-9 h-9 rounded-xl flex items-center justify-center border font-bold text-[16px]"
                style={{ background: canvasDark ? "#111" : "#fff", borderColor: canvasDark ? "#1e1e1e" : "#e0e0e0", color: canvasDark ? "#555" : "#888" }}>{l}</button>
            ))}
          </div>

          {connecting && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl text-[13px] font-medium border"
              style={{ background: "var(--gold-bg)", borderColor: "var(--gold)", color: "var(--gold)" }}>
              Clique em outro nó para conectar · ESC para cancelar
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center" style={{ background: "var(--app-bg)" }}>
          <p style={{ color: "var(--text-muted)" }}>Selecione ou crie um mapa</p>
        </div>
      )}

      <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={handleImageUpload} />

      {deleteTarget && (
        <ConfirmModal title="Excluir mapa mental?" description="Todos os nós e conexões serão apagados permanentemente."
          confirmLabel="Excluir" cancelLabel="Cancelar" variant="danger"
          onConfirm={handleDeleteMap} onCancel={() => setDeleteTarget(null)} />
      )}
    </div>
  );
}
