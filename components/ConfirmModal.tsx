"use client";
import { useEffect } from "react";

interface ConfirmModalProps {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning";
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  variant = "danger",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
      if (e.key === "Enter") onConfirm();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div
        className="w-full max-w-sm rounded-2xl border p-6"
        style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border-2)" }}
      >
        <div className="flex items-start gap-3 mb-4">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: variant === "danger" ? "var(--danger-bg)" : "rgba(251,146,60,0.1)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 6v4M8 11.5v.5" stroke={variant === "danger" ? "var(--danger)" : "#fb923c"} strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M6.5 2.5l-5 9A1 1 0 002.5 13h11a1 1 0 001-1.5l-5-9a1 1 0 00-1.8 0z" stroke={variant === "danger" ? "var(--danger)" : "#fb923c"} strokeWidth="1.3"/>
            </svg>
          </div>
          <div>
            <p className="text-[15px] font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
              {title}
            </p>
            <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
              {description}
            </p>
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-[13px] font-medium border transition-all"
            style={{ borderColor: "var(--app-border-2)", color: "var(--text-secondary)" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--app-bg-4)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl text-[13px] font-bold transition-all"
            style={{
              background: variant === "danger" ? "var(--danger)" : "#fb923c",
              color: "#fff",
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
