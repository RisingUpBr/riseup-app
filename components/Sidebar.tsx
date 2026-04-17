"use client";
import { useState, useRef, useEffect } from "react";
import { extractNameFromEmail } from "@/lib/extractName";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useUserPlan } from "@/lib/useUserPlan";
import { useTheme } from "@/contexts/ThemeContext";


const Icons = {
  dashboard: (<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5" height="5" rx="1.2" fill="currentColor"/><rect x="8" y="1" width="5" height="5" rx="1.2" fill="currentColor"/><rect x="1" y="8" width="5" height="5" rx="1.2" fill="currentColor"/><rect x="8" y="8" width="5" height="5" rx="1.2" fill="currentColor"/></svg>),
  library: (<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2h2v10H2zM6 2h2v10H6zM10 2l2 .5v9l-2-.5V2z" fill="currentColor"/></svg>),
  notes: (<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="1.5" width="10" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M4.5 5h5M4.5 7.5h5M4.5 10h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>),
  diary: (<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 2h6.5L11 3.5V12H3V2z" stroke="currentColor" strokeWidth="1.2"/><path d="M9 2v2h2" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/><path d="M5 6h4M5 8.5h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>),
  flashcards: (<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="3" width="9" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.2"/><rect x="3.5" y="5" width="9" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.2" opacity="0.4"/></svg>),
  mindmap: (<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="1.8" fill="currentColor"/><circle cx="2.5" cy="4" r="1.2" fill="currentColor" opacity="0.6"/><circle cx="11.5" cy="4" r="1.2" fill="currentColor" opacity="0.6"/><circle cx="2.5" cy="10" r="1.2" fill="currentColor" opacity="0.6"/><circle cx="11.5" cy="10" r="1.2" fill="currentColor" opacity="0.6"/><path d="M5.3 6.1L3.6 4.9M8.7 6.1l1.7-1.2M5.3 7.9L3.6 9.1M8.7 7.9l1.7 1.2" stroke="currentColor" strokeWidth="0.9" opacity="0.5"/></svg>),
  routine: (<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.2"/><path d="M7 4v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>),
  goals: (<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.2"/><circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1" opacity="0.6"/><circle cx="7" cy="7" r="1" fill="currentColor"/></svg>),
  premium: (<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5l1.5 3.5 3.5.5-2.5 2.5.7 3.5L7 9.5l-3.2 2 .7-3.5L2 5.5l3.5-.5L7 1.5z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/></svg>),
  lock: (<svg width="11" height="11" viewBox="0 0 11 11" fill="none"><rect x="2" y="4.5" width="7" height="5.5" rx="1" stroke="currentColor" strokeWidth="1"/><path d="M3.5 4.5V3a2 2 0 014 0v1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>),
  logout: (<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2H2.5A1 1 0 001.5 3v8a1 1 0 001 1H5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M9.5 9.5L12.5 7l-3-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12.5 7H5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>),
  home: (<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1.5 6.5L7 2l5.5 4.5V12H9V9H5v3H1.5V6.5z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/></svg>),
  settings: (<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.1"/><path d="M7 1.5v1M7 11.5v1M1.5 7h1M11.5 7h1M3.2 3.2l.7.7M10.1 10.1l.7.7M10.1 3.2l-.7.7M3.2 10.8l.7-.7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>),
  upgrade: (<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2l1.5 3 3 .5-2.2 2.2.6 3.3L7 9.5l-2.9 1.5.6-3.3L2.5 5.5l3-.5L7 2z" fill="currentColor"/></svg>),
  sun: (<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.2"/><path d="M7 1.5v1M7 11.5v1M1.5 7h1M11.5 7h1M3.4 3.4l.7.7M9.9 9.9l.7.7M9.9 3.4l-.7.7M3.4 9.9l.7-.7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>),
  moon: (<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.5 8A5 5 0 016 2.5a5 5 0 100 9 5 5 0 005.5-3.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>),
};

const MENU = [
  {
    section: "Início",
    items: [
      { name: "Meu espaço", href: "/dashboard", icon: "dashboard" },
      { name: "Biblioteca", href: "/biblioteca", icon: "library", premium: true },
    ],
  },
  {
    section: "Produtividade",
    items: [
      { name: "Notas", href: "/notes/simple", icon: "notes" },
      { name: "Diário", href: "/diario", icon: "diary" },
      { name: "Flashcards", href: "/flashcards/ai", icon: "flashcards" },
      { name: "Mapa Mental", href: "/mindmap", icon: "mindmap", premium: true },
    ],
  },
  {
    section: "Planejamento",
    items: [
      { name: "Rotina", href: "/routine", icon: "routine" },
      { name: "Metas", href: "/goals", icon: "goals" },
    ],
  },
  {
    section: "Premium",
    items: [
      { name: "Conteúdo Premium", href: "/premium", icon: "premium", premium: true },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, userData } = useAuthUser();
  const { isPremium } = useUserPlan();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const specificPlan = userData?.stripe?.plan;
  const displayName = userData?.name || (user?.email ? extractNameFromEmail(user.email) : "Você");

  function getPlanLabel() {
    if (isPremium) {
      const labels: Record<string, string> = { quinzenal: "Quinzenal", mensal: "Mensal", anual: "Anual" };
      return labels[specificPlan ?? ""] ?? "Premium";
    }
    return "Free";
  }

  async function handleLogout() {
    setShowUserMenu(false);
    await signOut(auth);
    router.push("/");
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isDark = theme === "dark";

  const s = {
    aside: { background: "var(--app-bg-2)", borderColor: "var(--app-border)" },
    section: { color: "var(--text-tertiary)" },
    itemDefault: { color: "var(--text-primary)" },
    itemActive: { background: "var(--app-bg-4)", color: "var(--gold)" },
    itemLocked: { color: "var(--text-secondary)" },
    userBtn: { color: "var(--text-primary)" },
    dropdown: { background: "var(--app-bg-3)", borderColor: "var(--app-border-2)" },
    dropItem: { color: "var(--text-secondary)" },
  };

  return (
    <aside
      className="w-64 h-screen flex flex-col fixed left-0 top-0 overflow-y-auto border-r"
      style={s.aside}
    >
      {/* LOGO + USUÁRIO */}
      <div className="px-4 pt-5 pb-3 border-b" style={{ borderColor: "var(--app-border)" }}>
        <Link href="/" className="flex items-center mb-4 px-1">
          <span className="font-semibold tracking-[0.15em] text-sm uppercase" style={{ color: "var(--gold)" }}>
            Rise Up
          </span>
        </Link>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-full flex items-center justify-between px-2 py-2 rounded-lg transition-colors"
            style={{ color: "var(--text-primary)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--app-bg-4)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0"
                style={{ background: "var(--gold-bg)", border: "1px solid var(--gold)", color: "var(--gold)" }}
              >
                {displayName.charAt(0).toUpperCase()}
              </div>
              <span className="text-[13px] font-medium truncate max-w-[120px]">
                Espaço de {displayName}
              </span>
            </div>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
              className={`transition-transform flex-shrink-0 ${showUserMenu ? "rotate-180" : ""}`}
              style={{ color: "var(--text-muted)" }}>
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {showUserMenu && (
            <div
              className="absolute left-0 right-0 top-full mt-1.5 rounded-xl overflow-hidden shadow-2xl z-50 border"
              style={s.dropdown}
            >
              <div className="px-3.5 py-3 border-b" style={{ borderColor: "var(--app-border)" }}>
                <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{user?.email}</p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>Plano atual</span>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background: isPremium ? "var(--gold-bg)" : "var(--app-bg-4)",
                      color: isPremium ? "var(--gold)" : "var(--text-muted)",
                    }}
                  >
                    {getPlanLabel()}
                  </span>
                </div>
              </div>

              {!isPremium && (
                <div className="px-2.5 py-2 border-b" style={{ borderColor: "var(--app-border)" }}>
                  <Link
                    href="/upgrade"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 w-full px-2.5 py-2 rounded-lg transition-colors"
                    style={{ background: "var(--gold-bg)" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "var(--gold-bg-strong)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "var(--gold-bg)")}
                  >
                    <span style={{ color: "var(--gold)" }}>{Icons.upgrade}</span>
                    <span className="text-xs font-semibold" style={{ color: "var(--gold)" }}>Fazer upgrade</span>
                  </Link>
                </div>
              )}

              <div className="px-2.5 py-2 space-y-0.5">
                <button
                  onClick={() => { router.push("/configuracoes"); setShowUserMenu(false); }}
                  className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg transition-colors"
                  style={{ color: "var(--text-tertiary)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--app-bg-4)"; (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)"; }}
                >
                  <span>{Icons.settings}</span>
                  <span className="text-xs">Configurações</span>
                </button>
                <button
                  onClick={() => { router.push("/"); setShowUserMenu(false); }}
                  className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg transition-colors"
                  style={{ color: "var(--text-tertiary)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--app-bg-4)"; (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)"; }}
                >
                  <span>{Icons.home}</span>
                  <span className="text-xs">Voltar ao site</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg transition-colors"
                  style={{ color: "var(--text-tertiary)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--danger-bg)"; (e.currentTarget as HTMLElement).style.color = "var(--danger)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)"; }}
                >
                  <span>{Icons.logout}</span>
                  <span className="text-xs">Sair</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* NAVEGAÇÃO */}
      <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
        {MENU.map((section) => (
          <div key={section.section}>
            <p className="text-[12px] uppercase tracking-widest font-semibold mb-2 px-2" style={s.section}>
              {section.section}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                const isLocked = item.premium && !isPremium;
                const icon = Icons[item.icon as keyof typeof Icons];
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between px-2.5 py-2 rounded-lg transition-all"
                    style={isActive ? s.itemActive : isLocked ? s.itemLocked : s.itemDefault}
                    onMouseEnter={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background = "var(--app-bg-4)";
                        if (!isLocked) (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                        (e.currentTarget as HTMLElement).style.color = isLocked ? "var(--text-secondary)" : "var(--text-primary)";
                      }
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex-shrink-0">{icon}</span>
                      <span className="text-[14px] font-medium">{item.name}</span>
                    </div>
                    {isLocked && <span style={{ color: "var(--text-tertiary)" }}>{Icons.lock}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* RODAPÉ */}
      <div className="px-3 pb-4 pt-3 border-t space-y-1" style={{ borderColor: "var(--app-border)" }}>

        {/* TOGGLE TEMA */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg transition-all mb-2"
          style={{ color: "var(--text-tertiary)" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--app-bg-4)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
        >
          <div className="flex items-center gap-2.5">
            <span>{isDark ? Icons.moon : Icons.sun}</span>
            <span className="text-[14px] font-medium">{isDark ? "Tema escuro" : "Tema claro"}</span>
          </div>
          <div
            className="w-8 h-4 rounded-full relative transition-colors"
            style={{ background: isDark ? "var(--app-bg-4)" : "var(--gold)" }}
          >
            <div
              className="absolute top-0.5 w-3 h-3 rounded-full transition-all"
              style={{
                background: isDark ? "var(--text-muted)" : "#000",
                left: isDark ? "2px" : "calc(100% - 14px)",
              }}
            />
          </div>
        </button>

        {!isPremium && (
          <Link
            href="/upgrade"
            className="flex items-center justify-center gap-2 w-full text-xs font-semibold py-2.5 rounded-lg transition-all hover:scale-[1.02] mb-1"
            style={{ background: "var(--gold)", color: "#000" }}
          >
            <span>{Icons.upgrade}</span>
            Fazer upgrade
          </Link>
        )}

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all"
          style={{ color: "var(--text-secondary)" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--danger)"; (e.currentTarget as HTMLElement).style.background = "var(--danger-bg)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
        >
          <span className="flex-shrink-0">{Icons.logout}</span>
          <span className="text-[14px] font-medium">Sair</span>
        </button>
      </div>
    </aside>
  );
}
