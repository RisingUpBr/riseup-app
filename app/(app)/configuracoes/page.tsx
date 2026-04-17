"use client";
import { useState } from "react";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useUserPlan } from "@/lib/useUserPlan";
import { useTheme } from "@/contexts/ThemeContext";
import { auth, db } from "@/lib/firebase";
import { updateProfile, sendPasswordResetEmail, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

type Section = "perfil" | "seguranca" | "plano" | "preferencias" | "dados";

const NAV: { id: Section; label: string }[] = [
  { id: "perfil", label: "Perfil" },
  { id: "seguranca", label: "Segurança" },
  { id: "plano", label: "Plano e cobrança" },
  { id: "preferencias", label: "Preferências" },
  { id: "dados", label: "Meus dados" },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[18px] font-semibold mb-6" style={{ color: "var(--text-primary)" }}>
      {children}
    </h2>
  );
}

function FieldRow({ label, value, action, actionLabel, actionVariant = "default" }: {
  label: string; value: string;
  action?: () => void; actionLabel?: string;
  actionVariant?: "default" | "danger" | "gold";
}) {
  const colors = {
    default: { background: "transparent", border: "1px solid var(--app-border-2)", color: "var(--text-secondary)" },
    danger: { background: "transparent", border: "1px solid var(--danger)", color: "var(--danger)" },
    gold: { background: "var(--gold)", border: "none", color: "#000" },
  };

  return (
    <div className="flex items-center justify-between py-4 border-b" style={{ borderColor: "var(--app-border)" }}>
      <div>
        <p className="text-[11px] mb-1 uppercase tracking-wide font-medium" style={{ color: "var(--text-muted)" }}>{label}</p>
        <p className="text-[14px] font-medium" style={{ color: "var(--text-primary)" }}>{value}</p>
      </div>
      {action && actionLabel && (
        <button
          onClick={action}
          className="text-[12px] font-semibold px-4 py-2 rounded-lg transition-all hover:scale-[1.02]"
          style={colors[actionVariant]}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

function Toast({ message, type }: { message: string; type: "success" | "error" }) {
  return (
    <div
      className="fixed bottom-6 right-6 px-4 py-3 rounded-xl text-[13px] font-medium z-50 border"
      style={{
        background: "var(--app-bg-2)",
        borderColor: type === "success" ? "var(--success)" : "var(--danger)",
        color: type === "success" ? "var(--success)" : "var(--danger)",
      }}
    >
      {message}
    </div>
  );
}

export default function ConfiguracoesPage() {
  const { user, userData } = useAuthUser();
  const { isPremium, plan } = useUserPlan();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const [section, setSection] = useState<Section>("perfil");
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteEmail, setDeleteEmail] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [savingName, setSavingName] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(false);
  const [newPhotoURL, setNewPhotoURL] = useState("");

  const displayName = userData?.name || user?.displayName || user?.email?.split("@")[0] || "Você";
  const planLabel = isPremium
    ? ({ quinzenal: "Quinzenal", mensal: "Mensal", anual: "Anual" } as Record<string, string>)[plan ?? ""] ?? "Premium"
    : "Gratuito";

  function showToast(message: string, type: "success" | "error") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleSaveName() {
    if (!user || !newName.trim()) return;
    setSavingName(true);
    try {
      await updateDoc(doc(db, "users", user.uid), { name: newName.trim() });
      await updateProfile(user, { displayName: newName.trim() });
      setEditingName(false);
      showToast("Nome atualizado com sucesso.", "success");
    } catch {
      showToast("Erro ao atualizar nome.", "error");
    } finally {
      setSavingName(false);
    }
  }

  async function handlePasswordReset() {
    if (!user?.email) return;
    try {
      await sendPasswordResetEmail(auth, user.email);
      showToast("Email de redefinição enviado.", "success");
    } catch {
      showToast("Erro ao enviar email.", "error");
    }
  }

  async function handleDeleteAccount() {
    if (!user) return;
    if (deleteEmail !== user.email) {
      showToast("Email incorreto.", "error");
      return;
    }
    setDeleting(true);
    try {
      const credential = EmailAuthProvider.credential(user.email!, deletePassword);
      await reauthenticateWithCredential(user, credential);
      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(user);
      router.push("/");
    } catch {
      showToast("Senha incorreta ou erro ao excluir.", "error");
    } finally {
      setDeleting(false);
    }
  }

  const photoURL = (userData as any)?.photoURL || user?.photoURL;

  return (
    <div className="flex h-screen" style={{ background: "var(--app-bg)" }}>

      {/* SIDEBAR DE CONFIGURAÇÕES */}
      <div className="w-56 min-w-56 border-r flex flex-col px-3 py-6"
        style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
        <p className="text-[11px] uppercase tracking-widest font-semibold px-2 mb-3"
          style={{ color: "var(--text-muted)" }}>
          Conta
        </p>
        {NAV.slice(0, 3).map((item) => (
          <button
            key={item.id}
            onClick={() => setSection(item.id)}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[14px] font-medium text-left mb-0.5 transition-all"
            style={{
              background: section === item.id ? "var(--app-bg-4)" : "transparent",
              color: section === item.id ? "var(--gold)" : "var(--text-primary)",
            }}
          >
            {item.label}
          </button>
        ))}

        <div className="my-3 h-px" style={{ background: "var(--app-border)" }} />

        <p className="text-[11px] uppercase tracking-widest font-semibold px-2 mb-3"
          style={{ color: "var(--text-muted)" }}>
          App
        </p>
        {NAV.slice(3).map((item) => (
          <button
            key={item.id}
            onClick={() => setSection(item.id)}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[14px] font-medium text-left mb-0.5 transition-all"
            style={{
              background: section === item.id ? "var(--app-bg-4)" : "transparent",
              color: section === item.id ? "var(--gold)" : "var(--text-primary)",
            }}
          >
            {item.label}
          </button>
        ))}

        <div className="mt-auto">
          <div className="h-px mb-3" style={{ background: "var(--app-border)" }} />
          <button
            onClick={() => setSection("seguranca")}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium text-left w-full transition-all"
            style={{ color: "var(--danger)" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--danger-bg)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
          >
            Excluir conta
          </button>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="flex-1 overflow-y-auto px-10 py-8 max-w-2xl">

        {/* ── PERFIL ── */}
        {section === "perfil" && (
          <div>
            <SectionTitle>Perfil</SectionTitle>

            {/* Avatar */}
            <div className="flex items-center gap-5 mb-8 pb-6 border-b" style={{ borderColor: "var(--app-border)" }}>
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-[24px] font-bold overflow-hidden flex-shrink-0"
                style={{ background: "var(--gold-bg)", border: "2px solid var(--gold)", color: "var(--gold)" }}
              >
                {photoURL ? (
                  <img src={photoURL} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  displayName.charAt(0).toUpperCase()
                )}
              </div>
              <div className="flex-1">
                <p className="text-[14px] font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                  {displayName}
                </p>
                <p className="text-[12px] mb-3" style={{ color: "var(--text-muted)" }}>
                  {user?.email}
                </p>
                {editingPhoto ? (
                  <div className="flex gap-2">
                    <input
                      value={newPhotoURL}
                      onChange={e => setNewPhotoURL(e.target.value)}
                      placeholder="Cole uma URL de imagem (https://...)"
                      className="flex-1 px-3 py-2 rounded-lg text-[13px] outline-none border"
                      style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }}
                      onFocus={e => (e.target.style.borderColor = "var(--gold)")}
                      onBlur={e => (e.target.style.borderColor = "var(--app-border-2)")}
                    />
                    <button
                      onClick={async () => {
                        if (!user || !newPhotoURL.trim()) return;
                        try {
                          await updateProfile(user, { photoURL: newPhotoURL.trim() });
                          await updateDoc(doc(db, "users", user.uid), { photoURL: newPhotoURL.trim() });
                          setEditingPhoto(false);
                          setNewPhotoURL("");
                          showToast("Foto atualizada.", "success");
                        } catch {
                          showToast("Erro ao atualizar foto.", "error");
                        }
                      }}
                      className="text-[12px] font-bold px-4 py-2 rounded-lg"
                      style={{ background: "var(--gold)", color: "#000" }}
                    >
                      Salvar
                    </button>
                    <button
                      onClick={() => { setEditingPhoto(false); setNewPhotoURL(""); }}
                      className="text-[12px] px-4 py-2 rounded-lg border"
                      style={{ borderColor: "var(--app-border-2)", color: "var(--text-secondary)" }}
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingPhoto(true)}
                      className="text-[12px] font-semibold px-4 py-1.5 rounded-lg transition-all hover:scale-[1.02]"
                      style={{ background: "var(--gold)", color: "#000" }}
                    >
                      Trocar foto
                    </button>
                    {photoURL && (
                      <button
                        onClick={async () => {
                          if (!user) return;
                          await updateProfile(user, { photoURL: "" });
                          await updateDoc(doc(db, "users", user.uid), { photoURL: "" });
                          showToast("Foto removida.", "success");
                        }}
                        className="text-[12px] px-4 py-1.5 rounded-lg border transition-all"
                        style={{ borderColor: "var(--app-border-2)", color: "var(--text-secondary)" }}
                      >
                        Remover
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Nome */}
            {editingName ? (
              <div className="py-4 border-b" style={{ borderColor: "var(--app-border)" }}>
                <p className="text-[11px] mb-2 uppercase tracking-wide font-medium" style={{ color: "var(--text-muted)" }}>
                  Nome
                </p>
                <div className="flex gap-2">
                  <input
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSaveName()}
                    autoFocus
                    className="flex-1 px-3 py-2 rounded-lg text-[14px] outline-none border"
                    style={{
                      background: "var(--app-bg-3)",
                      borderColor: "var(--app-border-2)",
                      color: "var(--text-primary)",
                    }}
                    onFocus={e => (e.target.style.borderColor = "var(--gold)")}
                    onBlur={e => (e.target.style.borderColor = "var(--app-border-2)")}
                  />
                  <button
                    onClick={handleSaveName}
                    disabled={savingName}
                    className="text-[12px] font-bold px-4 py-2 rounded-lg transition-all"
                    style={{ background: "var(--gold)", color: "#000" }}
                  >
                    {savingName ? "Salvando..." : "Salvar"}
                  </button>
                  <button
                    onClick={() => setEditingName(false)}
                    className="text-[12px] px-4 py-2 rounded-lg border transition-all"
                    style={{ borderColor: "var(--app-border-2)", color: "var(--text-secondary)" }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <FieldRow
                label="Nome"
                value={displayName}
                action={() => { setNewName(displayName); setEditingName(true); }}
                actionLabel="Editar"
              />
            )}

            <FieldRow label="Email" value={user?.email ?? ""} />
            <FieldRow
              label="Membro desde"
              value={user?.metadata?.creationTime
                ? new Date(user.metadata.creationTime).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })
                : "—"}
            />
          </div>
        )}

        {/* ── SEGURANÇA ── */}
        {section === "seguranca" && (
          <div>
            <SectionTitle>Segurança</SectionTitle>

            <FieldRow
              label="Senha"
              value="••••••••••••"
              action={handlePasswordReset}
              actionLabel="Enviar email de redefinição"
            />

            <div className="py-4 border-b" style={{ borderColor: "var(--app-border)" }}>
              <p className="text-[11px] mb-1 uppercase tracking-wide font-medium" style={{ color: "var(--text-muted)" }}>
                Autenticação
              </p>
              <p className="text-[14px]" style={{ color: "var(--text-primary)" }}>Email e senha</p>
              <p className="text-[12px] mt-1" style={{ color: "var(--text-tertiary)" }}>
                Conta protegida com email e senha.
              </p>
            </div>

            {/* Excluir conta */}
            <div className="mt-8 p-5 rounded-xl border" style={{ borderColor: "var(--danger)", background: "var(--danger-bg)" }}>
              <p className="text-[14px] font-semibold mb-1" style={{ color: "var(--danger)" }}>
                Excluir conta
              </p>
              <p className="text-[13px] mb-4" style={{ color: "var(--text-tertiary)" }}>
                Esta ação é permanente e irá apagar todos os seus dados. Não pode ser desfeita.
              </p>

              {!deleteConfirm ? (
                <button
                  onClick={() => setDeleteConfirm(true)}
                  className="text-[13px] font-semibold px-4 py-2 rounded-lg border transition-all"
                  style={{ borderColor: "var(--danger)", color: "var(--danger)" }}
                >
                  Quero excluir minha conta
                </button>
              ) : (
                <div className="space-y-3">
                  <p className="text-[12px]" style={{ color: "var(--text-secondary)" }}>
                    Digite seu email e senha para confirmar:
                  </p>
                  <input
                    type="email"
                    value={deleteEmail}
                    onChange={e => setDeleteEmail(e.target.value)}
                    placeholder={user?.email ?? "seu@email.com"}
                    className="w-full px-3 py-2 rounded-lg text-[13px] outline-none border"
                    style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }}
                  />
                  <input
                    type="password"
                    value={deletePassword}
                    onChange={e => setDeletePassword(e.target.value)}
                    placeholder="Sua senha"
                    className="w-full px-3 py-2 rounded-lg text-[13px] outline-none border"
                    style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleDeleteAccount}
                      disabled={deleting}
                      className="text-[13px] font-bold px-4 py-2 rounded-lg transition-all"
                      style={{ background: "var(--danger)", color: "#fff" }}
                    >
                      {deleting ? "Excluindo..." : "Confirmar exclusão"}
                    </button>
                    <button
                      onClick={() => { setDeleteConfirm(false); setDeleteEmail(""); setDeletePassword(""); }}
                      className="text-[13px] px-4 py-2 rounded-lg border transition-all"
                      style={{ borderColor: "var(--app-border-2)", color: "var(--text-secondary)" }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── PLANO ── */}
        {section === "plano" && (
          <div>
            <SectionTitle>Plano e cobrança</SectionTitle>

            <div className="p-5 rounded-xl border mb-6"
              style={{ background: "var(--app-bg-2)", borderColor: isPremium ? "var(--gold)" : "var(--app-border)" }}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[16px] font-bold" style={{ color: "var(--text-primary)" }}>{planLabel}</p>
                  <p className="text-[12px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {isPremium ? "Plano ativo com todos os recursos" : "Plano gratuito com recursos básicos"}
                  </p>
                </div>
                <span
                  className="text-[11px] px-3 py-1 rounded-full font-semibold"
                  style={{
                    background: isPremium ? "var(--gold-bg)" : "var(--app-bg-4)",
                    color: isPremium ? "var(--gold)" : "var(--text-muted)",
                  }}
                >
                  {isPremium ? "Ativo" : "Free"}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {isPremium ? (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--gold)" }} />
                      <span className="text-[13px]" style={{ color: "var(--text-primary)" }}>Todos os recursos desbloqueados</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--gold)" }} />
                      <span className="text-[13px]" style={{ color: "var(--text-primary)" }}>IA e Mapa Mental incluídos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--gold)" }} />
                      <span className="text-[13px]" style={{ color: "var(--text-primary)" }}>Biblioteca completa</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--gold)" }} />
                      <span className="text-[13px]" style={{ color: "var(--text-primary)" }}>Notas, Diário e Flashcards básicos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--text-faint)" }} />
                      <span className="text-[13px]" style={{ color: "var(--text-tertiary)" }}>IA, Mapa Mental e Biblioteca — bloqueados</span>
                    </div>
                  </>
                )}
              </div>

              {!isPremium && (
                <button
                  onClick={() => router.push("/planos-app")}
                  className="w-full text-[13px] font-bold py-2.5 rounded-xl transition-all hover:scale-[1.01]"
                  style={{ background: "var(--gold)", color: "#000" }}
                >
                  Fazer upgrade
                </button>
              )}
            </div>

            {isPremium && (
              <div className="p-4 rounded-xl border" style={{ borderColor: "var(--app-border)", background: "var(--app-bg-2)" }}>
                <p className="text-[13px]" style={{ color: "var(--text-secondary)" }}>
                  Para cancelar ou gerenciar sua assinatura, acesse o portal de cobrança.
                </p>
                <button
                  onClick={() => router.push("/planos-app")}
                  className="mt-3 text-[12px] px-4 py-2 rounded-lg border transition-all"
                  style={{ borderColor: "var(--app-border-2)", color: "var(--text-secondary)" }}
                >
                  Gerenciar assinatura
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── PREFERÊNCIAS ── */}
        {section === "preferencias" && (
          <div>
            <SectionTitle>Preferências</SectionTitle>

            <div className="flex items-center justify-between py-4 border-b" style={{ borderColor: "var(--app-border)" }}>
              <div>
                <p className="text-[11px] mb-1 uppercase tracking-wide font-medium" style={{ color: "var(--text-muted)" }}>Tema</p>
                <p className="text-[14px] font-medium" style={{ color: "var(--text-primary)" }}>
                  {theme === "dark" ? "Escuro" : "Claro"}
                </p>
              </div>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2.5 px-4 py-2 rounded-lg border text-[13px] font-medium transition-all"
                style={{ borderColor: "var(--app-border-2)", color: "var(--text-secondary)" }}
              >
                {theme === "dark" ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M7 1.5v1M7 11.5v1M1.5 7h1M11.5 7h1M3.4 3.4l.7.7M9.9 9.9l.7.7M9.9 3.4l-.7.7M3.4 9.9l.7-.7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M11.5 8A5 5 0 016 2.5a5 5 0 100 9 5 5 0 005.5-3.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                )}
                Mudar para tema {theme === "dark" ? "claro" : "escuro"}
              </button>
            </div>

            <div className="flex items-center justify-between py-4 border-b" style={{ borderColor: "var(--app-border)" }}>
              <div>
                <p className="text-[11px] mb-1 uppercase tracking-wide font-medium" style={{ color: "var(--text-muted)" }}>Idioma</p>
                <p className="text-[14px] font-medium" style={{ color: "var(--text-primary)" }}>Português (BR)</p>
              </div>
              <span className="text-[12px] px-3 py-1 rounded-lg" style={{ background: "var(--app-bg-4)", color: "var(--text-muted)" }}>
                Em breve
              </span>
            </div>
          </div>
        )}

        {/* ── DADOS ── */}
        {section === "dados" && (
          <div>
            <SectionTitle>Meus dados</SectionTitle>
            <p className="text-[13px] mb-6" style={{ color: "var(--text-tertiary)" }}>
              Visão geral do conteúdo criado na sua conta.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Notas criadas", value: (userData?.usage as any)?.simpleNotes ?? 0, unit: "notas" },
                { label: "Entradas no diário", value: (userData?.usage as any)?.dailyNotes ?? 0, unit: "entradas" },
                { label: "Flashcards", value: (userData?.usage as any)?.manualFlashcards ?? 0, unit: "cards" },
                { label: "Rotinas", value: (userData?.usage as any)?.routines ?? 0, unit: "rotinas" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-5 rounded-xl border"
                  style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}
                >
                  <p className="text-[11px] uppercase tracking-wide font-medium mb-2" style={{ color: "var(--text-muted)" }}>
                    {item.label}
                  </p>
                  <p className="text-[28px] font-bold" style={{ color: "var(--text-primary)" }}>
                    {item.value}
                  </p>
                  <p className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)" }}>{item.unit}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl border" style={{ borderColor: "var(--app-border)", background: "var(--app-bg-2)" }}>
              <p className="text-[12px]" style={{ color: "var(--text-tertiary)" }}>
                Seus dados são armazenados com segurança e nunca compartilhados com terceiros.
                Em conformidade com a LGPD.
              </p>
            </div>
          </div>
        )}

      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
