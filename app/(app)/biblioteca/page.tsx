"use client";
import { useState } from "react";
import { useUserPlan } from "@/lib/useUserPlan";
import UpgradeModal from "@/components/UpgradeModal";
import {
  BIBLIOTECA_CONTENTS, CATEGORIES, TYPE_LABELS,
  BibliotecaContent, ContentBlock,
} from "@/data/biblioteca";

function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h3 className="text-base font-semibold mt-8 mb-3" style={{ color: "var(--text-primary)" }}>
          {block.text}
        </h3>
      );
    case "paragraph":
      return (
        <p className="text-[15px] leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul className="mb-5 space-y-2 pl-5">
          {block.items.map((item, i) => (
            <li key={i} className="text-[14px] leading-relaxed list-disc" style={{ color: "var(--text-secondary)" }}>
              {item}
            </li>
          ))}
        </ul>
      );
    case "highlight":
      return (
        <div className="my-8 pl-5 border-l-2" style={{ borderColor: "var(--gold)" }}>
          <p className="text-[15px] leading-relaxed font-medium" style={{ color: "var(--gold)" }}>
            {block.text}
          </p>
        </div>
      );
    default:
      return null;
  }
}

function ContentCard({ content, isPremium, onClick }: {
  content: BibliotecaContent; isPremium: boolean; onClick: () => void;
}) {
  const isLocked = content.level === "premium" && !isPremium;

  return (
    <div
      onClick={onClick}
      className="rounded-2xl p-6 cursor-pointer transition-all flex flex-col border"
      style={{
        background: "var(--app-bg-2)",
        borderColor: "var(--app-border)",
        opacity: isLocked ? 0.55 : 1,
      }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--app-border-3)"}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--app-border)"}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: isLocked ? "var(--text-faint)" : "var(--gold)" }} />
        <span className="text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
          {TYPE_LABELS[content.type]}
        </span>
      </div>

      <h3 className="text-[15px] font-semibold leading-snug mb-3 flex-1"
        style={{ color: isLocked ? "var(--text-muted)" : "var(--text-primary)" }}>
        {content.title}
      </h3>

      <p className="text-[13px] leading-relaxed mb-6"
        style={{ color: isLocked ? "var(--text-faint)" : "var(--text-secondary)" }}>
        {content.description}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
          {content.readingTime} min de leitura
        </span>
        {isLocked ? (
          <div className="flex items-center gap-1.5 text-[11px]" style={{ color: "var(--text-muted)" }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <rect x="1.5" y="4" width="7" height="5.5" rx="1" stroke="currentColor" strokeWidth="1"/>
              <path d="M3.5 4V3a1.5 1.5 0 013 0v1" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>
            Premium
          </div>
        ) : (
          <span className="text-[11px] px-2.5 py-1 rounded-lg font-medium"
            style={{ color: "var(--gold)", background: "var(--gold-bg)" }}>
            Gratuito
          </span>
        )}
      </div>
    </div>
  );
}

export default function BibliotecaPage() {
  const { isPremium } = useUserPlan();
  const [activeCategory, setActiveCategory] = useState("todos");
  const [reading, setReading] = useState<BibliotecaContent | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const filtered = BIBLIOTECA_CONTENTS.filter(
    (c) => activeCategory === "todos" || c.category === activeCategory
  );

  function handleCardClick(content: BibliotecaContent) {
    if (content.level === "premium" && !isPremium) {
      setShowUpgrade(true);
      return;
    }
    setReading(content);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (reading) {
    return (
      <div className="max-w-2xl mx-auto px-8 py-12" style={{ background: "var(--app-bg)" }}>
        <button
          onClick={() => setReading(null)}
          className="flex items-center gap-2 text-[13px] transition-colors mb-10"
          style={{ color: "var(--text-tertiary)" }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)"}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Voltar à biblioteca
        </button>

        <p className="text-[11px] uppercase tracking-widest mb-3" style={{ color: "var(--gold)" }}>
          {CATEGORIES.find((c) => c.value === reading.category)?.label}
        </p>
        <h1 className="text-2xl font-semibold mb-4 leading-snug" style={{ color: "var(--text-primary)" }}>
          {reading.title}
        </h1>
        <div className="flex items-center gap-5 text-[12px] mb-8" style={{ color: "var(--text-muted)" }}>
          <span>{TYPE_LABELS[reading.type]}</span>
          <span>{reading.readingTime} min de leitura</span>
          <span style={{ color: "var(--gold)" }}>Gratuito</span>
        </div>

        <div className="h-px mb-10" style={{ background: "var(--app-border)" }} />

        <div>
          {reading.blocks.map((block, i) => (
            <BlockRenderer key={i} block={block} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-8 py-10" style={{ background: "var(--app-bg)" }}>

      <div className="mb-10">
        <h1 className="text-2xl font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
          Biblioteca
        </h1>
        <p className="text-[14px]" style={{ color: "var(--text-tertiary)" }}>
          Conteúdos Rise Up — leia, aplique, evolua.
        </p>
      </div>

      <div className="flex gap-2 flex-wrap mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className="px-5 py-2 rounded-full text-[13px] border transition-all font-medium"
            style={{
              background: activeCategory === cat.value ? "var(--gold-bg)" : "var(--app-bg-2)",
              borderColor: activeCategory === cat.value ? "var(--gold)" : "var(--app-border)",
              color: activeCategory === cat.value ? "var(--gold)" : "var(--text-tertiary)",
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {!isPremium && (
        <div className="flex items-center justify-between rounded-2xl px-7 py-5 mb-10 border"
          style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
          <div>
            <p className="text-[15px] font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
              Acesse toda a biblioteca
            </p>
            <p className="text-[13px]" style={{ color: "var(--text-tertiary)" }}>
              Frameworks, guias e artigos exclusivos no plano premium.
            </p>
          </div>
          <button
            onClick={() => setShowUpgrade(true)}
            className="text-[13px] font-bold px-6 py-2.5 rounded-xl transition-all hover:scale-[1.02] flex-shrink-0 ml-6"
            style={{ background: "var(--gold)", color: "#000" }}
          >
            Fazer upgrade
          </button>
          {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((content) => (
          <ContentCard
            key={content.id}
            content={content}
            isPremium={isPremium}
            onClick={() => handleCardClick(content)}
          />
        ))}
      </div>
    </div>
  );
}
