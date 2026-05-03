"use client";
import { useRef } from "react";

interface Props {
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  onClose: () => void;
}

export default function ShareAchievement({ title, subtitle, emoji, color, onClose }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  async function handleShare() {
    if (navigator.share) {
      await navigator.share({
        title: "Rise Up — Conquista desbloqueada!",
        text: `${emoji} ${title} — ${subtitle}\n\nConstruindo hábitos com Rise Up 🚀`,
        url: "https://riseup.app",
      });
    } else {
      await navigator.clipboard.writeText(
        `${emoji} ${title}\n${subtitle}\n\nConstruindo hábitos com Rise Up 🚀\nhttps://riseup.app`
      );
      alert("Copiado para a área de transferência!");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.8)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="w-full max-w-sm">
        <div ref={cardRef}
          className="rounded-3xl p-8 mb-4 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0A0A0A 0%, #1a1500 100%)", border: `1.5px solid ${color}40` }}>
          <div className="absolute inset-0 opacity-10"
            style={{ background: `radial-gradient(circle at 50% 0%, ${color}, transparent 70%)` }}/>
          <div className="text-[64px] mb-4">{emoji}</div>
          <div className="text-[11px] font-bold uppercase tracking-widest mb-2"
            style={{ color }}>Rise Up — Conquista</div>
          <h2 className="text-[22px] font-black mb-2" style={{ color: "#fff" }}>{title}</h2>
          <p className="text-[14px]" style={{ color: "#888" }}>{subtitle}</p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-16 h-0.5 rounded-full" style={{ background: `${color}40` }}/>
            <span className="text-[11px] font-bold" style={{ color: `${color}80` }}>riseup.app</span>
            <div className="w-16 h-0.5 rounded-full" style={{ background: `${color}40` }}/>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={handleShare}
            className="flex-1 py-3 rounded-xl text-[14px] font-bold transition-all hover:scale-[1.01]"
            style={{ background: color, color: "#000" }}>
            Compartilhar
          </button>
          <button onClick={onClose}
            className="px-5 py-3 rounded-xl text-[14px] border"
            style={{ borderColor: "var(--app-border-2)", color: "var(--text-secondary)" }}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
