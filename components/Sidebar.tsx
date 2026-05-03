"use client";
import { useState, useEffect } from "react";
import { extractNameFromEmail } from "@/lib/extractName";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useUserPlan } from "@/lib/useUserPlan";
import { useTheme } from "@/contexts/ThemeContext";
import { getStreak, StreakData, DEFAULT_STREAK } from "@/lib/streakService";
import UpgradeModal from "@/components/UpgradeModal";

const Icons = {
  dashboard:   <svg width="16" height="16" viewBox="0 0 15 15" fill="none"><rect x="1" y="1" width="5.5" height="5.5" rx="1.2" fill="currentColor" opacity="0.9"/><rect x="8.5" y="1" width="5.5" height="5.5" rx="1.2" fill="currentColor" opacity="0.9"/><rect x="1" y="8.5" width="5.5" height="5.5" rx="1.2" fill="currentColor" opacity="0.9"/><rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1.2" fill="currentColor" opacity="0.9"/></svg>,
  library:     <svg width="16" height="16" viewBox="0 0 15 15" fill="none"><path d="M2 2.5h2.5v10H2zM6.5 2.5H9v10H6.5zM11 2.5l2.5.6v8.8l-2.5-.6V2.5z" fill="currentColor" opacity="0.8"/></svg>,
  notes:       <svg width="16" height="16" viewBox="0 0 15 15" fill="none"><rect x="2" y="1.5" width="11" height="12" rx="1.8" stroke="currentColor" strokeWidth="1.2"/><path d="M5 5.5h5M5 8h5M5 10.5h3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>,
  diary:       <svg width="16" height="16" viewBox="0 0 15 15" fill="none"><path d="M7.5 13V3.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/><path d="M7.5 3.5C6 2 3 2 1.5 3v9c1.5-1 4.5-1 6 0" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/><path d="M7.5 3.5C9 2 12 2 13.5 3v9c-1.5-1-4.5-1-6 0" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  flashcards:  <svg width="16" height="16" viewBox="0 0 15 15" fill="none"><rect x="1.5" y="3.5" width="9.5" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><rect x="4" y="5.5" width="9.5" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" opacity="0.4"/></svg>,
  mindmap:     <svg width="16" height="16" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="2" fill="currentColor"/><circle cx="2.5" cy="4" r="1.3" fill="currentColor" opacity="0.5"/><circle cx="12.5" cy="4" r="1.3" fill="currentColor" opacity="0.5"/><circle cx="2.5" cy="11" r="1.3" fill="currentColor" opacity="0.5"/><circle cx="12.5" cy="11" r="1.3" fill="currentColor" opacity="0.5"/><path d="M5.7 6.3L3.7 4.8M9.3 6.3l2-1.5M5.7 8.7L3.7 10.2M9.3 8.7l2 1.5" stroke="currentColor" strokeWidth="1" opacity="0.5" strokeLinecap="round"/></svg>,
  routine:     <svg width="16" height="16" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.2"/><path d="M7.5 4.5v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
  goals:       <svg width="16" height="16" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.2"/><circle cx="7.5" cy="7.5" r="2.8" stroke="currentColor" strokeWidth="1" opacity="0.5"/><circle cx="7.5" cy="7.5" r="1" fill="currentColor"/></svg>,
  brain:       <svg width="16" height="16" viewBox="0 0 15 15" fill="none"><path d="M7.5 13C7.5 13 3 11 3 7c0-2.2 1.6-4 3.5-4 .7 0 1.3.2 1.8.6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/><path d="M7.5 13C7.5 13 12 11 12 7c0-2.2-1.6-4-3.5-4-.7 0-1.3.2-1.8.6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/><path d="M7.5 3.6V13" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.4"/><path d="M4.5 6c-.8.3-1.5 1-1.5 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6"/><path d="M10.5 6c.8.3 1.5 1 1.5 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6"/><path d="M5 9.5c.5.8 1.4 1.5 2.5 1.5s2-.7 2.5-1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6"/><path d="M5.5 5.5C5 6 4.8 6.7 5 7.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/><path d="M9.5 5.5C10 6 10.2 6.7 10 7.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/></svg>,
  settings:    <svg width="16" height="16" viewBox="0 0 15 15" fill="none"><path d="M6.2 1.5l-.4 1.3a5 5 0 00-1.1.6L3.4 3l-1.2 2 1 .9a5 5 0 000 1.2l-1 .9 1.2 2 1.3-.4a5 5 0 001.1.6l.4 1.3h2.4l.4-1.3a5 5 0 001.1-.6l1.3.4 1.2-2-1-.9a5 5 0 000-1.2l1-.9-1.2-2-1.3.4a5 5 0 00-1.1-.6L8.6 1.5H6.2z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/><circle cx="7.5" cy="7.5" r="1.6" stroke="currentColor" strokeWidth="1.1"/></svg>,
  sun:         <svg width="16" height="16" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="2.8" stroke="currentColor" strokeWidth="1.2"/><path d="M7.5 1.5v1.2M7.5 12.3v1.2M1.5 7.5h1.2M12.3 7.5h1.2M3.4 3.4l.85.85M10.75 10.75l.85.85M10.75 3.4l-.85.85M3.4 10.75l.85-.85" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>,
  moon:        <svg width="16" height="16" viewBox="0 0 15 15" fill="none"><path d="M12.5 9.5A6 6 0 016.5 2.5a6 6 0 100 10 6 6 0 006-3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
  logout:      <svg width="16" height="16" viewBox="0 0 15 15" fill="none"><path d="M5.5 2.5H3A1 1 0 002 3.5v8a1 1 0 001 1h2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M10 10l3-2.5L10 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 7.5H6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
  upgrade:     <svg width="16" height="16" viewBox="0 0 15 15" fill="none"><path d="M7.5 2l1.8 3.5 3.7.6-2.7 2.6.7 3.8-3.5-1.8-3.5 1.8.7-3.8L2 6.1l3.7-.6L7.5 2z" fill="currentColor"/></svg>,
  chevron:     <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

const MENU = [
  {
    section: "INÍCIO",
    items: [
      { name: "Meu Espaço",  href: "/dashboard",     icon: "dashboard" },
      { name: "Biblioteca",  href: "/biblioteca",    icon: "library"   },
    ],
  },
  {
    section: "PRODUTIVIDADE",
    items: [
      { name: "Notas",       href: "/notes/simple",  icon: "notes"      },
      { name: "Diário",      href: "/diario",        icon: "diary"      },
      { name: "Flashcards",  href: "/flashcards/ai", icon: "flashcards" },
      { name: "Mapa Mental", href: "/mindmap",       icon: "mindmap"    },
    ],
  },
  {
    section: "PLANEJAMENTO",
    items: [
      { name: "Rotina",      href: "/routine",       icon: "routine"    },
      { name: "Metas",       href: "/goals",         icon: "goals"      },
    ],
  },
  {
    section: "CONHECIMENTO",
    items: [
      { name: "Segundo Cérebro", href: "/premium",   icon: "brain"      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, userData } = useAuthUser();
  const { isPremium } = useUserPlan();
  const { preference, setTheme } = useTheme();
  const [streak, setStreak] = useState<StreakData>(DEFAULT_STREAK);
  const [showUpgrade, setShowUpgrade] = useState(false);
  useEffect(() => {
    if (!user) return;
    getStreak(user.uid).then(setStreak);
  }, [user]);

  async function handleLogout() {
    await signOut(auth);
    router.push("/auth");
  }

  const displayName = userData?.name || user?.displayName || extractNameFromEmail(user?.email ?? "");
  const firstName = displayName.split(" ")[0];
  const initial = firstName[0]?.toUpperCase() ?? "?";

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 flex flex-col z-40 border-r"
      style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>

      {/* ── LOGO ── */}
      <div className="flex items-center gap-3 px-5 py-4 border-b"
        style={{ borderColor: "var(--app-border)" }}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden"
          style={{ background: "var(--gold)" }}>
          <span className="text-[15px] font-black" style={{ color: "#000", letterSpacing: "-0.5px" }}>R</span>
          <div className="absolute inset-0 rounded-xl"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)" }}/>
        </div>
        <div>
          <span className="text-[16px] font-black tracking-tight" style={{ color: "var(--text-primary)", letterSpacing: "-0.3px" }}>
            Rise Up
          </span>
          <div className="text-[9px] font-semibold uppercase tracking-widest -mt-0.5"
            style={{ color: "var(--text-faint)" }}>
            seu espaço para crescer
          </div>
        </div>
      </div>

      {/* ── PERFIL DO USUÁRIO ── */}
      <div className="px-3 pt-3 pb-2">
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border"
          style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border)" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[13px] font-bold flex-shrink-0"
            style={{ background: "var(--gold-bg)", color: "var(--gold)", border: "1px solid var(--gold)" }}>
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-[13px] font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                {firstName}
              </p>
              {isPremium && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: "var(--gold-bg)", color: "var(--gold)" }}>
                  PRO
                </span>
              )}
            </div>
            <p className="text-[11px] truncate" style={{ color: "var(--text-faint)" }}>
              {user?.email ?? ""}
            </p>
          </div>
          {streak.currentStreak > 0 && (
            <div className="flex items-center gap-0.5 flex-shrink-0 px-1.5 py-1 rounded-lg"
              style={{ background: "var(--gold-bg)" }}>
              <span className="text-[12px] font-black" style={{ color: "var(--gold)" }}>
                {streak.currentStreak}
              </span>
              <span className="text-[11px]">🔥</span>
            </div>
          )}
        </div>
      </div>

      {/* ── NAVEGAÇÃO ── */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto space-y-4 min-h-0">
        {MENU.map(section => (
          <div key={section.section}>
            <p className="text-[10px] font-bold uppercase tracking-widest px-2.5 mb-1"
              style={{ color: "var(--text-faint)" }}>
              {section.section}
            </p>
            <div className="space-y-0.5">
              {section.items.map(item => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                const icon = Icons[item.icon as keyof typeof Icons];
                return (
                  <Link key={item.href} href={item.href}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all group relative"
                    style={{
                      background: isActive ? "var(--gold-bg)" : "transparent",
                      color: isActive ? "var(--gold)" : "var(--text-secondary)",
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background = "var(--app-bg-4)";
                        (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                        (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                      }
                    }}>
                    {isActive && (
                      <div className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full"
                        style={{ background: "var(--gold)" }}/>
                    )}
                    <span className="flex-shrink-0 ml-0.5 w-4 h-4 flex items-center justify-center">{icon}</span>
                    <span className="text-[14px] font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* ── RODAPÉ ── */}
      <div className="px-3 pt-2 pb-5 border-t"
        style={{ borderColor: "var(--app-border)" }}>

        <Link href="/configuracoes"
          className="flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg transition-all w-full mt-1"
          style={{
            color: pathname === "/configuracoes" ? "var(--gold)" : "var(--text-secondary)",
            background: pathname === "/configuracoes" ? "var(--gold-bg)" : "transparent",
          }}
          onMouseEnter={e => { if (pathname !== "/configuracoes") { (e.currentTarget as HTMLElement).style.background = "var(--app-bg-4)"; (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; } }}
          onMouseLeave={e => { if (pathname !== "/configuracoes") { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; } }}>
          <span className="flex-shrink-0">{Icons.settings}</span>
          <span className="text-[14px] font-medium">Configurações</span>
        </Link>

        <div className="px-1 py-1 rounded-xl flex gap-0.5 mt-2"
          style={{ background: "var(--app-bg-3)", border: "1px solid var(--app-border)" }}>
          {([
            { id: "system" as const, icon: "💻", label: "Sistema" },
            { id: "dark"   as const, icon: "🌙", label: "Escuro"  },
            { id: "light"  as const, icon: "☀️", label: "Claro"   },
          ]).map(t => (
            <button key={t.id} onClick={() => setTheme(t.id)}
              className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
              style={{
                background: preference === t.id ? "var(--app-bg)" : "transparent",
                color: preference === t.id ? "var(--text-primary)" : "var(--text-faint)",
                boxShadow: preference === t.id ? "0 1px 3px rgba(0,0,0,0.2)" : "none",
              }}>
              <span className="text-[11px]">{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {!isPremium && (
          <>
            <button onClick={() => setShowUpgrade(true)}
              className="flex items-center justify-center gap-2 w-full text-[13px] font-bold py-2.5 rounded-xl transition-all hover:scale-[1.01] mt-2"
              style={{ background: "var(--gold)", color: "#000" }}>
              <span>{Icons.upgrade}</span>
              Fazer upgrade
            </button>
            {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}
          </>
        )}

        <button onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg transition-all mt-2"
          style={{ color: "var(--text-secondary)" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--danger)"; (e.currentTarget as HTMLElement).style.background = "var(--danger-bg)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
          <span className="flex-shrink-0">{Icons.logout}</span>
          <span className="text-[14px] font-medium">Sair</span>
        </button>
      </div>
    </aside>
  );
}
