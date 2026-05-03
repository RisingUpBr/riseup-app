"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useUserPlan } from "@/lib/useUserPlan";
import { useTheme } from "@/contexts/ThemeContext";
import { db } from "@/lib/firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import {
  updateProfile, sendPasswordResetEmail, deleteUser, signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import UpgradeModal from "@/components/UpgradeModal";
import {
  NotificationSettings, DEFAULT_SETTINGS,
  requestPermission,
  saveNotificationSettings, getNotificationSettings,
} from "@/lib/notificationService";

type Tab = "profile" | "notifications" | "plan" | "security";

const WEEK_DAYS_LABELS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const FEATURES_FREE = [
  "3 metas ativas",
  "Diário com 7 dias de histórico",
  "Rotina básica",
  "Mapa mental (até 20 nodes)",
];

const FEATURES_PREMIUM = [
  "Metas ilimitadas com milestones",
  "Segundo cérebro completo",
  "Mapa mental sem limite de nodes",
  "Relatórios semanais detalhados",
  "Notificações avançadas",
  "Templates de metas exclusivos",
  "Suporte prioritário",
];

export default function ConfiguracoesPage() {
  const router = useRouter();
  const { user, userData } = useAuthUser();
  const { isPremium } = useUserPlan();
  const { preference, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  // Profile
  const [name, setName] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [savedName, setSavedName] = useState(false);

  // Notifications
  const [settings, setSettings] = useState<NotificationSettings>(DEFAULT_SETTINGS);
  const [permissionState, setPermissionState] = useState<NotificationPermission>("default");
  const [savingNotif, setSavingNotif] = useState(false);
  const [savedNotif, setSavedNotif] = useState(false);

  // Plan
  const [showUpgrade, setShowUpgrade] = useState(false);

  // Security
  const [resetSent, setResetSent] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const displayName = userData?.name ?? user?.displayName ?? user?.email ?? "?";
  const initial = displayName[0]?.toUpperCase() ?? "?";

  useEffect(() => {
    if (!user) return;
    setName(userData?.name ?? user.displayName ?? "");
    if ("Notification" in window) setPermissionState(Notification.permission);
    getNotificationSettings(user.uid).then(setSettings);
  }, [user, userData]);

  async function handleSaveName() {
    if (!user || !name.trim()) return;
    const trimmed = name.trim();
    setSavingName(true);
    try {
      await updateDoc(doc(db, "users", user.uid), { name: trimmed });
      await updateProfile(user, { displayName: trimmed });
      setSavedName(true);
      setTimeout(() => setSavedName(false), 2000);
    } finally {
      setSavingName(false);
    }
  }

  async function handleRequestPermission() {
    const granted = await requestPermission();
    setPermissionState(granted ? "granted" : "denied");
    if (granted) {
      const updated = { ...settings, enabled: true };
      setSettings(updated);
      if (user) await saveNotificationSettings(user.uid, updated);
    }
  }

  async function handleSaveNotif() {
    if (!user) return;
    setSavingNotif(true);
    await saveNotificationSettings(user.uid, settings);
    setSavingNotif(false);
    setSavedNotif(true);
    setTimeout(() => setSavedNotif(false), 2000);
  }

  function updateNotif(key: keyof NotificationSettings, value: NotificationSettings[keyof NotificationSettings]) {
    setSettings(prev => ({ ...prev, [key]: value }));
  }

  async function handlePasswordReset() {
    if (!user?.email) return;
    await sendPasswordResetEmail(auth, user.email);
    setResetSent(true);
    setTimeout(() => setResetSent(false), 5000);
  }

  async function handleDeleteAccount() {
    if (!user || deleteConfirm !== "EXCLUIR") return;
    setDeleting(true);
    setDeleteError("");
    try {
      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(user);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Erro ao excluir";
      setDeleteError(msg.includes("requires-recent-login")
        ? "Faça login novamente para excluir sua conta."
        : "Erro ao excluir. Tente novamente.");
      setDeleting(false);
    }
  }

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button onClick={() => onChange(!value)}
      className="w-11 h-6 rounded-full transition-all relative flex-shrink-0"
      style={{ background: value ? "var(--gold)" : "var(--app-border-2)" }}>
      <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all shadow-sm"
        style={{ left: value ? "22px" : "2px" }}/>
    </button>
  );

  const TABS: { id: Tab; label: string }[] = [
    { id: "profile", label: "Perfil" },
    { id: "notifications", label: "Notificações" },
    { id: "plan", label: "Plano" },
    { id: "security", label: "Segurança" },
  ];

  return (
    <div className="flex flex-col h-screen" style={{ background: "var(--app-bg)" }}>
      <div className="flex-shrink-0 border-b" style={{ borderColor: "var(--app-border)", background: "var(--app-bg-2)" }}>
        <div className="max-w-3xl mx-auto px-10 py-6">
          <h1 className="text-[26px] font-bold" style={{ color: "var(--text-primary)" }}>Configurações</h1>
          <p className="text-[13px] mt-1" style={{ color: "var(--text-muted)" }}>
            Personalize sua experiência no Rise Up
          </p>
        </div>
        <div className="max-w-3xl mx-auto px-10 flex gap-1">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className="px-5 py-3 text-[14px] font-semibold border-b-2 transition-all"
              style={{
                borderColor: activeTab === tab.id ? "var(--gold)" : "transparent",
                color: activeTab === tab.id ? "var(--gold)" : "var(--text-muted)",
              }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-10 py-8 space-y-4">

          {/* PERFIL */}
          {activeTab === "profile" && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl border"
                style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
                <p className="text-[13px] font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
                  Informações da conta
                </p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[22px] font-black flex-shrink-0"
                      style={{ background: "var(--gold-bg)", color: "var(--gold)", border: "2px solid var(--gold)" }}>
                      {initial}
                    </div>
                    <div>
                      <p className="text-[17px] font-bold" style={{ color: "var(--text-primary)" }}>
                        {userData?.name ?? user?.email}
                      </p>
                      <p className="text-[14px]" style={{ color: "var(--text-muted)" }}>{user?.email}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {isPremium ? (
                      <span className="text-[11px] font-bold px-3 py-1.5 rounded-full"
                        style={{ background: "var(--gold-bg)", color: "var(--gold)", border: "1px solid var(--gold)" }}>
                        ⭐ Premium
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium px-3 py-1.5 rounded-full"
                        style={{ background: "var(--app-bg-4)", color: "var(--text-muted)", border: "1px solid var(--app-border)" }}>
                        Plano gratuito
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[14px] font-semibold block mb-1.5" style={{ color: "var(--text-muted)" }}>
                      Nome de exibição
                    </label>
                    <div className="flex gap-2">
                      <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Seu nome"
                        className="flex-1 px-3 py-2 rounded-xl border outline-none text-[13px]"
                        style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }}
                      />
                      <button onClick={handleSaveName} disabled={savingName || !name.trim()}
                        className="px-4 py-2 rounded-xl text-[12px] font-bold disabled:opacity-50 transition-all"
                        style={{ background: savedName ? "var(--success)" : "var(--gold)", color: "#000" }}>
                        {savedName ? "Salvo" : savingName ? "..." : "Salvar"}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-[14px] font-semibold block mb-1.5" style={{ color: "var(--text-muted)" }}>
                      E-mail
                    </label>
                    <p className="px-3 py-2 rounded-xl border text-[13px]"
                      style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-muted)" }}>
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border"
                style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
                <p className="text-[15px] font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Tema do app</p>
                <div className="flex gap-2">
                  {(["system", "dark", "light"] as const).map(t => (
                    <button key={t}
                      onClick={() => setTheme(t)}
                      className="flex-1 py-2.5 rounded-xl text-[12px] font-bold border transition-all"
                      style={{
                        background: preference === t ? "var(--gold-bg)" : "var(--app-bg-3)",
                        borderColor: preference === t ? "var(--gold)" : "var(--app-border)",
                        color: preference === t ? "var(--gold)" : "var(--text-muted)",
                      }}>
                      {t === "system" ? "Sistema" : t === "dark" ? "Escuro" : "Claro"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl border"
                style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
                <p className="text-[15px] font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Modo daltônico</p>
                <p className="text-[14px] mb-2" style={{ color: "var(--text-muted)" }}>
                  Em breve — substitui as cores por padrões e ícones.
                </p>
                <span className="text-[11px] px-3 py-1.5 rounded-lg inline-block"
                  style={{ background: "var(--app-bg-4)", color: "var(--text-faint)" }}>
                  Em breve
                </span>
              </div>
            </div>
          )}

          {/* NOTIFICAÇÕES */}
          {activeTab === "notifications" && (
            <div className="space-y-4">
              {permissionState !== "granted" && (
                <div className="p-5 rounded-2xl border"
                  style={{ background: "var(--gold-bg)", borderColor: "var(--gold)" }}>
                  <p className="text-[14px] font-semibold mb-1" style={{ color: "var(--gold)" }}>Ativar notificações</p>
                  <p className="text-[14px] mb-3" style={{ color: "var(--text-muted)" }}>
                    Receba lembretes para manter seus hábitos em dia.
                  </p>
                  <button onClick={handleRequestPermission}
                    className="px-5 py-2 rounded-xl text-[13px] font-bold"
                    style={{ background: "var(--gold)", color: "#000" }}>
                    {permissionState === "denied" ? "Permissão bloqueada — ative no navegador" : "Permitir notificações"}
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between p-4 rounded-xl border"
                style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
                <div>
                  <p className="text-[16px] font-semibold" style={{ color: "var(--text-primary)" }}>Notificações ativas</p>
                  <p className="text-[14px] mt-0.5" style={{ color: "var(--text-muted)" }}>Ativar ou desativar todos os lembretes</p>
                </div>
                <Toggle value={settings.enabled && permissionState === "granted"}
                  onChange={v => {
                    if (v && permissionState !== "granted") { handleRequestPermission(); return; }
                    updateNotif("enabled", v);
                  }}/>
              </div>

              {[
                { key: "diaryReminder" as const, label: "Lembrete do Diário", timeKey: "diaryTime" as const },
                { key: "routineReminder" as const, label: "Lembrete da Rotina", timeKey: "routineTime" as const },
              ].map(({ key, label, timeKey }) => (
                <div key={key} className="p-4 rounded-xl border space-y-3"
                  style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)", opacity: settings.enabled ? 1 : 0.5 }}>
                  <div className="flex items-center justify-between">
                    <p className="text-[16px] font-semibold" style={{ color: "var(--text-primary)" }}>{label}</p>
                    <Toggle value={settings[key] as boolean} onChange={v => updateNotif(key, v)}/>
                  </div>
                  {settings[key] && (
                    <div className="flex items-center gap-3">
                      <p className="text-[14px]" style={{ color: "var(--text-muted)" }}>Horário:</p>
                      <input type="time" value={settings[timeKey] as string}
                        onChange={e => updateNotif(timeKey, e.target.value)}
                        className="px-3 py-1.5 rounded-lg border outline-none text-[13px]"
                        style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }}/>
                    </div>
                  )}
                </div>
              ))}

              <div className="p-4 rounded-xl border space-y-3"
                style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)", opacity: settings.enabled ? 1 : 0.5 }}>
                <div className="flex items-center justify-between">
                  <p className="text-[16px] font-semibold" style={{ color: "var(--text-primary)" }}>Revisão de Metas</p>
                  <Toggle value={settings.goalReview} onChange={v => updateNotif("goalReview", v)}/>
                </div>
                {settings.goalReview && (
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex gap-1">
                      {WEEK_DAYS_LABELS.map((d, i) => (
                        <button key={i} onClick={() => updateNotif("goalReviewDay", i)}
                          className="w-9 h-9 rounded-xl text-[12px] font-bold border transition-all"
                          style={{ background: settings.goalReviewDay === i ? "var(--gold-bg)" : "transparent", borderColor: settings.goalReviewDay === i ? "var(--gold)" : "var(--app-border)", color: settings.goalReviewDay === i ? "var(--gold)" : "var(--text-muted)" }}>
                          {d}
                        </button>
                      ))}
                    </div>
                    <input type="time" value={settings.goalReviewTime}
                      onChange={e => updateNotif("goalReviewTime", e.target.value)}
                      className="px-3 py-1.5 rounded-lg border outline-none text-[13px]"
                      style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }}/>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-xl border space-y-3"
                style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)", opacity: settings.enabled ? 1 : 0.5 }}>
                <div className="flex items-center justify-between">
                  <p className="text-[16px] font-semibold" style={{ color: "var(--text-primary)" }}>Relatório Semanal</p>
                  <Toggle value={settings.weeklyReport} onChange={v => updateNotif("weeklyReport", v)}/>
                </div>
                {settings.weeklyReport && (
                  <div className="flex gap-1">
                    {WEEK_DAYS_LABELS.map((d, i) => (
                      <button key={i} onClick={() => updateNotif("weeklyReportDay", i)}
                        className="w-9 h-9 rounded-xl text-[12px] font-bold border transition-all"
                        style={{ background: settings.weeklyReportDay === i ? "var(--gold-bg)" : "transparent", borderColor: settings.weeklyReportDay === i ? "var(--gold)" : "var(--app-border)", color: settings.weeklyReportDay === i ? "var(--gold)" : "var(--text-muted)" }}>
                        {d}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button onClick={handleSaveNotif} disabled={savingNotif}
                className="w-full py-3 rounded-xl text-[14px] font-bold disabled:opacity-50"
                style={{ background: "var(--gold)", color: "#000" }}>
                {savedNotif ? "Salvo!" : savingNotif ? "Salvando..." : "Salvar configurações"}
              </button>
            </div>
          )}

          {/* PLANO */}
          {activeTab === "plan" && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl border"
                style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
                <p className="text-[13px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
                  Plano atual
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[18px] font-black" style={{ color: "var(--text-primary)" }}>
                      {isPremium ? "Rise Up Premium" : "Plano Gratuito"}
                    </p>
                    <p className="text-[14px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {isPremium ? "Acesso completo a todos os recursos" : "Recursos limitados"}
                    </p>
                  </div>
                  <span className="text-[12px] px-3 py-1 rounded-full font-bold"
                    style={{ background: isPremium ? "var(--gold-bg)" : "var(--app-bg-3)", color: isPremium ? "var(--gold)" : "var(--text-muted)", border: `1px solid ${isPremium ? "var(--gold)" : "var(--app-border)"}` }}>
                    {isPremium ? "Premium" : "Free"}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl border"
                style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
                <p className="text-[14px] font-bold mb-3" style={{ color: "var(--text-muted)" }}>
                  {isPremium ? "Incluído no seu plano" : "Disponível no plano gratuito"}
                </p>
                <div className="space-y-2">
                  {(isPremium ? FEATURES_PREMIUM : FEATURES_FREE).map(f => (
                    <div key={f} className="flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="6" fill={isPremium ? "var(--gold)" : "var(--app-bg-3)"} opacity={isPremium ? "0.2" : "1"}/>
                        <path d="M4 7l2 2 4-4" stroke={isPremium ? "var(--gold)" : "var(--text-muted)"} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-[14px]" style={{ color: "var(--text-muted)" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {!isPremium && (
                <div className="p-4 rounded-xl border"
                  style={{ background: "var(--gold-bg)", borderColor: "var(--gold)" }}>
                  <p className="text-[13px] font-semibold mb-1" style={{ color: "var(--gold)" }}>
                    Faça upgrade para Premium
                  </p>
                  <p className="text-[14px] mb-3" style={{ color: "var(--text-muted)" }}>
                    Desbloqueie metas ilimitadas, segundo cérebro completo, relatórios avançados e muito mais.
                  </p>
                  <button onClick={() => setShowUpgrade(true)}
                    className="px-5 py-2.5 rounded-xl text-[13px] font-black transition-all hover:scale-[1.01]"
                    style={{ background: "var(--gold)", color: "#000" }}>
                    Ver planos
                  </button>
                </div>
              )}

              {isPremium && (
                <div className="p-4 rounded-xl border"
                  style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
                  <p className="text-[15px] font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                    Gerenciar assinatura
                  </p>
                  <p className="text-[14px] mb-3" style={{ color: "var(--text-muted)" }}>
                    Altere o plano, método de pagamento ou cancele a assinatura.
                  </p>
                  <a href="/billing"
                    className="inline-block px-5 py-2 rounded-xl text-[13px] font-semibold transition-all"
                    style={{ background: "var(--app-bg-3)", border: "1px solid var(--app-border-2)", color: "var(--text-primary)" }}>
                    Portal de cobrança
                  </a>
                </div>
              )}
            </div>
          )}

          {/* SEGURANÇA */}
          {activeTab === "security" && (
            <div className="space-y-4">
              {/* Redefinir senha */}
              <div className="p-5 rounded-2xl border" style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
                <p className="text-[15px] font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Redefinir senha</p>
                <p className="text-[14px] mb-3" style={{ color: "var(--text-muted)" }}>
                  Enviaremos um link de redefinição para {user?.email}
                </p>
                {resetSent ? (
                  <p className="text-[13px] font-semibold" style={{ color: "var(--success)" }}>
                    ✓ Email enviado! Verifique sua caixa de entrada.
                  </p>
                ) : (
                  <button onClick={handlePasswordReset}
                    className="px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all"
                    style={{ background: "var(--app-bg-3)", border: "1px solid var(--app-border-2)", color: "var(--text-primary)" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--gold)"; el.style.color = "var(--gold)"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--app-border-2)"; el.style.color = "var(--text-primary)"; }}>
                    Enviar email de redefinição
                  </button>
                )}
              </div>

              {/* Sessões */}
              <div className="p-5 rounded-2xl border" style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
                <p className="text-[15px] font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Encerrar sessão</p>
                <p className="text-[14px] mb-3" style={{ color: "var(--text-muted)" }}>
                  Saia da sua conta neste dispositivo.
                </p>
                <button onClick={async () => { await signOut(auth); router.push("/auth"); }}
                  className="px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all"
                  style={{ background: "var(--app-bg-3)", border: "1px solid var(--app-border-2)", color: "var(--text-primary)" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--gold)"; el.style.color = "var(--gold)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--app-border-2)"; el.style.color = "var(--text-primary)"; }}>
                  Sair da conta
                </button>
              </div>

              {/* Excluir conta */}
              <div className="p-5 rounded-2xl border" style={{ background: "var(--app-bg-2)", borderColor: "var(--danger, #ef4444)" }}>
                <p className="text-[14px] font-semibold mb-1" style={{ color: "var(--danger, #ef4444)" }}>Excluir conta</p>
                <p className="text-[12px] mb-4" style={{ color: "var(--text-muted)" }}>
                  Esta ação é irreversível. Todos os seus dados serão permanentemente apagados.
                </p>
                {!showDeleteConfirm ? (
                  <button onClick={() => setShowDeleteConfirm(true)}
                    className="px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all"
                    style={{ background: "rgba(239,68,68,0.08)", border: "1px solid var(--danger, #ef4444)", color: "var(--danger, #ef4444)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.15)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.08)"; }}>
                    Excluir minha conta
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl border" style={{ background: "rgba(239,68,68,0.05)", borderColor: "rgba(239,68,68,0.3)" }}>
                      <p className="text-[13px] font-semibold mb-1" style={{ color: "var(--danger, #ef4444)" }}>Confirmação necessária</p>
                      <p className="text-[14px]" style={{ color: "var(--text-muted)" }}>
                        Digite <strong>EXCLUIR</strong> abaixo para confirmar. Esta ação não pode ser desfeita.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <input value={deleteConfirm} onChange={e => { setDeleteConfirm(e.target.value); setDeleteError(""); }}
                        placeholder='Digite "EXCLUIR" para continuar'
                        className="flex-1 px-3 py-2.5 rounded-xl border outline-none text-[13px]"
                        style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }}/>
                      <button onClick={handleDeleteAccount}
                        disabled={deleteConfirm !== "EXCLUIR" || deleting}
                        className="px-4 py-2.5 rounded-xl text-[13px] font-bold disabled:opacity-40 transition-all"
                        style={{ background: "var(--danger, #ef4444)", color: "#fff" }}>
                        {deleting ? "..." : "Excluir"}
                      </button>
                    </div>
                    {deleteError && (
                      <p className="text-[12px]" style={{ color: "var(--danger, #ef4444)" }}>{deleteError}</p>
                    )}
                    <button onClick={() => { setShowDeleteConfirm(false); setDeleteConfirm(""); }}
                      className="text-[14px]" style={{ color: "var(--text-muted)" }}>
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}
    </div>
  );
}
