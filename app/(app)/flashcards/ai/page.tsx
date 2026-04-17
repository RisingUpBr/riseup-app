"use client";
import { useState, useEffect } from "react";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useUserPlan } from "@/lib/useUserPlan";
import ConfirmModal from "@/components/ConfirmModal";
import {
  Deck, Flashcard,
  subscribeToDecks, subscribeToCards,
  createDeck, updateDeck, deleteDeck,
  createCard, updateCard, deleteCard,
  reviewCard, getCardsToReview,
  DECK_EMOJIS,
} from "@/lib/flashcardsService";

type Screen = "decks" | "deck" | "study" | "add-card" | "new-deck";

const FREE_DECK_LIMIT = 3;
const FREE_CARD_LIMIT = 20;

export default function FlashcardsPage() {
  const { user, userData } = useAuthUser();
  const { isPremium } = useUserPlan();

  const [screen, setScreen] = useState<Screen>("decks");
  const [decks, setDecks] = useState<Deck[]>([]);
  const [activeDeck, setActiveDeck] = useState<Deck | null>(null);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [studyCards, setStudyCards] = useState<Flashcard[]>([]);
  const [studyIndex, setStudyIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [studyDone, setStudyDone] = useState(false);
  const [results, setResults] = useState({ correct: 0, wrong: 0 });

  const [newDeckName, setNewDeckName] = useState("");
  const [newDeckEmoji, setNewDeckEmoji] = useState("📚");
  const [newDeckDesc, setNewDeckDesc] = useState("");
  const [savingDeck, setSavingDeck] = useState(false);

  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);
  const [savingCard, setSavingCard] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<{ type: "deck" | "card"; id: string; deckId?: string } | null>(null);

  const canCreateDeck = isPremium || decks.length < FREE_DECK_LIMIT;
  const canCreateCard = isPremium || cards.length < FREE_CARD_LIMIT;
  const toReview = activeDeck ? getCardsToReview(cards) : [];

  useEffect(() => {
    if (!user) return;
    return subscribeToDecks(user.uid, setDecks);
  }, [user]);

  useEffect(() => {
    if (!activeDeck) return;
    return subscribeToCards(activeDeck.id, setCards);
  }, [activeDeck]);

  function openDeck(deck: Deck) {
    setActiveDeck(deck);
    setScreen("deck");
  }

  function startStudy() {
    const review = getCardsToReview(cards);
    if (!review.length) return;
    setStudyCards(review);
    setStudyIndex(0);
    setFlipped(false);
    setStudyDone(false);
    setResults({ correct: 0, wrong: 0 });
    setScreen("study");
  }

  async function handleReview(correct: boolean) {
    const card = studyCards[studyIndex];
    if (!activeDeck) return;
    await reviewCard(card.id, activeDeck.id, correct);
    const newResults = { ...results, [correct ? "correct" : "wrong"]: results[correct ? "correct" : "wrong"] + 1 };
    setResults(newResults);
    if (studyIndex + 1 >= studyCards.length) {
      setStudyDone(true);
    } else {
      setStudyIndex(studyIndex + 1);
      setFlipped(false);
    }
  }

  async function handleSaveDeck() {
    if (!user || !newDeckName.trim()) return;
    setSavingDeck(true);
    try {
      await createDeck(user.uid, { name: newDeckName.trim(), emoji: newDeckEmoji, description: newDeckDesc.trim() });
      setNewDeckName(""); setNewDeckEmoji("📚"); setNewDeckDesc("");
      setScreen("decks");
    } finally {
      setSavingDeck(false);
    }
  }

  async function handleSaveCard() {
    if (!user || !activeDeck || !cardFront.trim() || !cardBack.trim()) return;
    setSavingCard(true);
    try {
      if (editingCard) {
        await updateCard(editingCard.id, { front: cardFront.trim(), back: cardBack.trim() });
      } else {
        await createCard(user.uid, activeDeck.id, cardFront, cardBack);
      }
      setCardFront(""); setCardBack(""); setEditingCard(null);
      setScreen("deck");
    } finally {
      setSavingCard(false);
    }
  }

  async function handleDeleteConfirm() {
    if (!deleteTarget || !user) return;
    if (deleteTarget.type === "deck") {
      await deleteDeck(deleteTarget.id, user.uid);
      setActiveDeck(null);
      setScreen("decks");
    } else {
      await deleteCard(deleteTarget.id, deleteTarget.deckId!);
    }
    setDeleteTarget(null);
  }

  const progressPct = activeDeck && activeDeck.cardCount > 0
    ? Math.round((activeDeck.reviewCount / activeDeck.cardCount) * 100)
    : 0;

  // ── TELA: LISTA DE DECKS ──────────────────────────────
  if (screen === "decks") return (
    <div className="max-w-2xl mx-auto px-8 py-10" style={{ background: "var(--app-bg)" }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[24px] font-bold mb-1" style={{ color: "var(--text-primary)" }}>Flashcards</h1>
          <p className="text-[13px]" style={{ color: "var(--text-tertiary)" }}>
            {isPremium ? "Decks ilimitados" : `${decks.length} / ${FREE_DECK_LIMIT} decks`}
          </p>
        </div>
        <button
          onClick={() => canCreateDeck ? setScreen("new-deck") : null}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-bold transition-all hover:scale-[1.02]"
          style={{ background: canCreateDeck ? "var(--gold)" : "var(--app-bg-4)", color: canCreateDeck ? "#000" : "var(--text-muted)", cursor: canCreateDeck ? "pointer" : "default" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          Novo deck
        </button>
      </div>

      {!isPremium && (
        <div className="flex items-center gap-3 mb-6 p-4 rounded-xl border" style={{ borderColor: "var(--app-border)", background: "var(--app-bg-2)" }}>
          <div className="flex-1">
            <p className="text-[13px] font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>
              Geração por IA — em breve
            </p>
            <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
              Cole um texto e a IA cria os flashcards automaticamente. Disponível no plano premium.
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold"
            style={{ background: "var(--app-bg-4)", color: "var(--text-muted)" }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1"/>
              <path d="M5 3v2.5M5 6.5v.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>
            Em breve
          </div>
        </div>
      )}

      {decks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center border text-[24px]"
            style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border)" }}>📚</div>
          <p className="text-[15px] font-medium" style={{ color: "var(--text-tertiary)" }}>Nenhum deck ainda</p>
          <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>Crie seu primeiro deck para começar a estudar</p>
          <button onClick={() => setScreen("new-deck")}
            className="mt-2 px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all hover:scale-[1.02]"
            style={{ background: "var(--gold)", color: "#000" }}>
            Criar primeiro deck
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {decks.map((deck) => {
            const pct = deck.cardCount > 0 ? Math.round((deck.reviewCount / deck.cardCount) * 100) : 0;
            const needsReview = deck.cardCount > deck.reviewCount;
            return (
              <button key={deck.id} onClick={() => openDeck(deck)}
                className="w-full text-left p-5 rounded-2xl border transition-all"
                style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--app-border-2)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--app-border)"}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[24px]">{deck.emoji}</span>
                    <div>
                      <p className="text-[15px] font-bold" style={{ color: "var(--text-primary)" }}>{deck.name}</p>
                      {deck.description && (
                        <p className="text-[12px] mt-0.5" style={{ color: "var(--text-muted)" }}>{deck.description}</p>
                      )}
                    </div>
                  </div>
                  {needsReview && (
                    <span className="text-[11px] px-2.5 py-1 rounded-lg font-semibold flex-shrink-0"
                      style={{ background: "var(--gold-bg)", color: "var(--gold)" }}>
                      Revisar
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                    {deck.cardCount} card{deck.cardCount !== 1 ? "s" : ""}
                  </span>
                  <span className="text-[12px]" style={{ color: "var(--text-muted)" }}>{pct}% revisado</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--app-border)" }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: "var(--gold)" }} />
                </div>
              </button>
            );
          })}
        </div>
      )}

      {deleteTarget && (
        <ConfirmModal
          title={deleteTarget.type === "deck" ? "Excluir deck?" : "Excluir card?"}
          description={deleteTarget.type === "deck" ? "Todos os cards deste deck serão apagados permanentemente." : "Este card será removido permanentemente."}
          confirmLabel="Excluir" cancelLabel="Cancelar" variant="danger"
          onConfirm={handleDeleteConfirm} onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );

  // ── TELA: NOVO DECK ───────────────────────────────────
  if (screen === "new-deck") return (
    <div className="max-w-lg mx-auto px-8 py-10" style={{ background: "var(--app-bg)" }}>
      <button onClick={() => setScreen("decks")}
        className="flex items-center gap-2 text-[13px] mb-8 transition-colors"
        style={{ color: "var(--text-tertiary)" }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)"}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Voltar
      </button>
      <h1 className="text-[22px] font-bold mb-6" style={{ color: "var(--text-primary)" }}>Novo deck</h1>

      <div className="mb-5">
        <p className="text-[11px] uppercase tracking-wide font-bold mb-2" style={{ color: "var(--text-muted)" }}>Emoji</p>
        <div className="flex flex-wrap gap-2">
          {DECK_EMOJIS.map((e) => (
            <button key={e} onClick={() => setNewDeckEmoji(e)}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-[20px] border transition-all"
              style={{
                borderColor: newDeckEmoji === e ? "var(--gold)" : "var(--app-border)",
                background: newDeckEmoji === e ? "var(--gold-bg)" : "transparent",
              }}>
              {e}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-[11px] uppercase tracking-wide font-bold mb-2" style={{ color: "var(--text-muted)" }}>Nome do deck</p>
        <input value={newDeckName} onChange={e => setNewDeckName(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSaveDeck()}
          placeholder="Ex: Inglês — Vocabulário"
          className="w-full px-4 py-3 rounded-xl text-[14px] outline-none border"
          style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }}
          onFocus={e => (e.target.style.borderColor = "var(--gold)")}
          onBlur={e => (e.target.style.borderColor = "var(--app-border-2)")}
          autoFocus
        />
      </div>

      <div className="mb-6">
        <p className="text-[11px] uppercase tracking-wide font-bold mb-2" style={{ color: "var(--text-muted)" }}>Descrição (opcional)</p>
        <input value={newDeckDesc} onChange={e => setNewDeckDesc(e.target.value)}
          placeholder="Ex: Palavras para o TOEFL"
          className="w-full px-4 py-3 rounded-xl text-[14px] outline-none border"
          style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)" }}
          onFocus={e => (e.target.style.borderColor = "var(--gold)")}
          onBlur={e => (e.target.style.borderColor = "var(--app-border-2)")}
        />
      </div>

      <div className="flex gap-3">
        <button onClick={handleSaveDeck} disabled={savingDeck || !newDeckName.trim()}
          className="flex-1 py-3 rounded-xl text-[14px] font-bold transition-all hover:scale-[1.01] disabled:opacity-50"
          style={{ background: "var(--gold)", color: "#000" }}>
          {savingDeck ? "Criando..." : "Criar deck"}
        </button>
        <button onClick={() => setScreen("decks")}
          className="px-6 py-3 rounded-xl text-[14px] border transition-all"
          style={{ borderColor: "var(--app-border-2)", color: "var(--text-secondary)" }}>
          Cancelar
        </button>
      </div>
    </div>
  );

  // ── TELA: DECK (lista de cards) ───────────────────────
  if (screen === "deck" && activeDeck) return (
    <div className="max-w-2xl mx-auto px-8 py-10" style={{ background: "var(--app-bg)" }}>
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => setScreen("decks")}
          className="flex items-center gap-2 text-[13px] transition-colors"
          style={{ color: "var(--text-tertiary)" }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)"}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Todos os decks
        </button>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <span className="text-[36px]">{activeDeck.emoji}</span>
          <div>
            <h1 className="text-[22px] font-bold" style={{ color: "var(--text-primary)" }}>{activeDeck.name}</h1>
            {activeDeck.description && (
              <p className="text-[13px] mt-0.5" style={{ color: "var(--text-muted)" }}>{activeDeck.description}</p>
            )}
            <p className="text-[12px] mt-1" style={{ color: "var(--text-muted)" }}>
              {activeDeck.cardCount} card{activeDeck.cardCount !== 1 ? "s" : ""} · {progressPct}% revisado
            </p>
          </div>
        </div>
        <button onClick={() => setDeleteTarget({ type: "deck", id: activeDeck.id })}
          className="p-2 rounded-lg transition-all"
          style={{ color: "var(--text-faint)" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--danger)"; (e.currentTarget as HTMLElement).style.background = "var(--danger-bg)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-faint)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2.5 3.5h9M5.5 1.5h3M4 3.5l.7 9h4.6l.7-9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="h-1.5 rounded-full overflow-hidden mb-6" style={{ background: "var(--app-border)" }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${progressPct}%`, background: "var(--gold)" }} />
      </div>

      <div className="flex gap-3 mb-8">
        <button onClick={startStudy} disabled={toReview.length === 0}
          className="flex-1 py-3 rounded-xl text-[14px] font-bold transition-all hover:scale-[1.01] disabled:opacity-40 disabled:cursor-default flex items-center justify-center gap-2"
          style={{ background: "var(--gold)", color: "#000" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 2l9 5-9 5V2z" fill="currentColor"/>
          </svg>
          {toReview.length > 0 ? `Estudar agora (${toReview.length})` : "Tudo revisado!"}
        </button>
        <button
          onClick={() => canCreateCard ? setScreen("add-card") : null}
          className="px-5 py-3 rounded-xl text-[14px] font-bold border transition-all"
          style={{
            borderColor: canCreateCard ? "var(--app-border-2)" : "var(--app-border)",
            color: canCreateCard ? "var(--text-secondary)" : "var(--text-faint)",
            cursor: canCreateCard ? "pointer" : "default",
          }}
          onMouseEnter={e => { if (canCreateCard) (e.currentTarget as HTMLElement).style.background = "var(--app-bg-4)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
          + Card
        </button>
      </div>

      {!canCreateCard && !isPremium && (
        <div className="mb-4 px-4 py-3 rounded-xl border text-[12px]"
          style={{ borderColor: "var(--app-border)", background: "var(--app-bg-2)", color: "var(--text-muted)" }}>
          Limite de {FREE_CARD_LIMIT} cards atingido no plano gratuito.
          <button onClick={() => {}} className="ml-2 font-semibold" style={{ color: "var(--gold)" }}>Fazer upgrade</button>
        </div>
      )}

      {cards.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <p className="text-[14px]" style={{ color: "var(--text-muted)" }}>Nenhum card ainda</p>
          <button onClick={() => setScreen("add-card")}
            className="px-5 py-2 rounded-xl text-[13px] font-bold"
            style={{ background: "var(--gold)", color: "#000" }}>
            Adicionar primeiro card
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {cards.map((card) => (
            <div key={card.id}
              className="p-4 rounded-xl border transition-all group"
              style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
              <div className="flex items-start justify-between mb-2">
                <p className="text-[13px] font-semibold leading-snug flex-1" style={{ color: "var(--text-primary)" }}>
                  {card.front}
                </p>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0">
                  <button onClick={() => { setEditingCard(card); setCardFront(card.front); setCardBack(card.back); setScreen("add-card"); }}
                    className="p-1 rounded-md transition-all" style={{ color: "var(--text-muted)" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"}>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M1.5 9.5l2-0.5 6-6-1.5-1.5-6 6-0.5 2z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button onClick={() => setDeleteTarget({ type: "card", id: card.id, deckId: activeDeck.id })}
                    className="p-1 rounded-md transition-all" style={{ color: "var(--text-muted)" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--danger)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"}>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M2 2.5h7M4 1h3M3.5 2.5l.5 7h3l.5-7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="h-px mb-2" style={{ background: "var(--app-border)" }} />
              <p className="text-[12px] leading-relaxed" style={{ color: "var(--text-muted)" }}>{card.back}</p>
              {card.difficulty === 2 && (
                <div className="mt-2 text-[10px] font-semibold" style={{ color: "#ef4444" }}>Para revisar</div>
              )}
              {card.difficulty === 1 && (
                <div className="mt-2 text-[10px] font-semibold" style={{ color: "var(--gold)" }}>Dominado</div>
              )}
            </div>
          ))}
        </div>
      )}

      {deleteTarget && (
        <ConfirmModal
          title={deleteTarget.type === "deck" ? "Excluir deck?" : "Excluir card?"}
          description={deleteTarget.type === "deck" ? "Todos os cards deste deck serão apagados permanentemente." : "Este card será removido permanentemente."}
          confirmLabel="Excluir" cancelLabel="Cancelar" variant="danger"
          onConfirm={handleDeleteConfirm} onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );

  // ── TELA: ADICIONAR/EDITAR CARD ───────────────────────
  if (screen === "add-card" && activeDeck) return (
    <div className="max-w-lg mx-auto px-8 py-10" style={{ background: "var(--app-bg)" }}>
      <button onClick={() => { setScreen("deck"); setEditingCard(null); setCardFront(""); setCardBack(""); }}
        className="flex items-center gap-2 text-[13px] mb-8 transition-colors"
        style={{ color: "var(--text-tertiary)" }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)"}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Voltar ao deck
      </button>

      <h1 className="text-[22px] font-bold mb-2" style={{ color: "var(--text-primary)" }}>
        {editingCard ? "Editar card" : "Novo card"}
      </h1>
      <p className="text-[13px] mb-8" style={{ color: "var(--text-muted)" }}>
        Deck: {activeDeck.emoji} {activeDeck.name}
      </p>

      <div className="mb-5">
        <p className="text-[11px] uppercase tracking-wide font-bold mb-2" style={{ color: "var(--text-muted)" }}>
          Frente — pergunta ou termo
        </p>
        <textarea value={cardFront} onChange={e => setCardFront(e.target.value)}
          placeholder="Ex: What does 'resilience' mean?"
          rows={3}
          className="w-full px-4 py-3 rounded-xl text-[14px] outline-none border resize-none"
          style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)", fontFamily: "inherit" }}
          onFocus={e => (e.target.style.borderColor = "var(--gold)")}
          onBlur={e => (e.target.style.borderColor = "var(--app-border-2)")}
          autoFocus
        />
      </div>

      <div className="mb-8">
        <p className="text-[11px] uppercase tracking-wide font-bold mb-2" style={{ color: "var(--text-muted)" }}>
          Verso — resposta ou definição
        </p>
        <textarea value={cardBack} onChange={e => setCardBack(e.target.value)}
          placeholder="Ex: Resiliência — capacidade de se recuperar rapidamente."
          rows={3}
          className="w-full px-4 py-3 rounded-xl text-[14px] outline-none border resize-none"
          style={{ background: "var(--app-bg-3)", borderColor: "var(--app-border-2)", color: "var(--text-primary)", fontFamily: "inherit" }}
          onFocus={e => (e.target.style.borderColor = "var(--gold)")}
          onBlur={e => (e.target.style.borderColor = "var(--app-border-2)")}
        />
      </div>

      {(cardFront || cardBack) && (
        <div className="mb-6 p-4 rounded-xl border" style={{ background: "var(--app-bg-2)", borderColor: "var(--app-border)" }}>
          <p className="text-[10px] uppercase tracking-wide font-bold mb-3" style={{ color: "var(--text-faint)" }}>Preview</p>
          <div className="flex gap-3">
            <div className="flex-1 p-3 rounded-lg text-center" style={{ background: "var(--app-bg-3)" }}>
              <p className="text-[11px] mb-1 font-semibold" style={{ color: "var(--text-faint)" }}>Frente</p>
              <p className="text-[13px] font-medium" style={{ color: "var(--text-primary)" }}>{cardFront || "—"}</p>
            </div>
            <div className="flex items-center" style={{ color: "var(--text-faint)" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex-1 p-3 rounded-lg text-center" style={{ background: "var(--app-bg-3)" }}>
              <p className="text-[11px] mb-1 font-semibold" style={{ color: "var(--text-faint)" }}>Verso</p>
              <p className="text-[13px]" style={{ color: "var(--text-secondary)" }}>{cardBack || "—"}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={handleSaveCard} disabled={savingCard || !cardFront.trim() || !cardBack.trim()}
          className="flex-1 py-3 rounded-xl text-[14px] font-bold transition-all hover:scale-[1.01] disabled:opacity-50"
          style={{ background: "var(--gold)", color: "#000" }}>
          {savingCard ? "Salvando..." : editingCard ? "Salvar alterações" : "Adicionar card"}
        </button>
        <button onClick={() => { setScreen("deck"); setEditingCard(null); setCardFront(""); setCardBack(""); }}
          className="px-6 py-3 rounded-xl text-[14px] border transition-all"
          style={{ borderColor: "var(--app-border-2)", color: "var(--text-secondary)" }}>
          Cancelar
        </button>
      </div>
    </div>
  );

  // ── TELA: ESTUDO ──────────────────────────────────────
  if (screen === "study" && activeDeck) {
    if (studyDone) return (
      <div className="max-w-lg mx-auto px-8 py-10 flex flex-col items-center justify-center min-h-[60vh]" style={{ background: "var(--app-bg)" }}>
        <div className="text-[48px] mb-4">🎉</div>
        <h2 className="text-[24px] font-bold mb-2" style={{ color: "var(--text-primary)" }}>Sessão concluída!</h2>
        <p className="text-[14px] mb-8 text-center" style={{ color: "var(--text-muted)" }}>
          Você revisou {studyCards.length} card{studyCards.length !== 1 ? "s" : ""} do deck {activeDeck.emoji} {activeDeck.name}
        </p>
        <div className="flex gap-6 mb-8">
          <div className="text-center">
            <p className="text-[32px] font-bold" style={{ color: "#22c55e" }}>{results.correct}</p>
            <p className="text-[12px]" style={{ color: "var(--text-muted)" }}>Acertei</p>
          </div>
          <div className="w-px" style={{ background: "var(--app-border)" }} />
          <div className="text-center">
            <p className="text-[32px] font-bold" style={{ color: "#ef4444" }}>{results.wrong}</p>
            <p className="text-[12px]" style={{ color: "var(--text-muted)" }}>Errei</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setScreen("deck")}
            className="px-6 py-3 rounded-xl text-[14px] font-bold border transition-all"
            style={{ borderColor: "var(--app-border-2)", color: "var(--text-secondary)" }}>
            Ver deck
          </button>
          {results.wrong > 0 && (
            <button onClick={startStudy}
              className="px-6 py-3 rounded-xl text-[14px] font-bold transition-all hover:scale-[1.01]"
              style={{ background: "var(--gold)", color: "#000" }}>
              Revisar erros ({results.wrong})
            </button>
          )}
        </div>
      </div>
    );

    const card = studyCards[studyIndex];
    const progress = Math.round(((studyIndex) / studyCards.length) * 100);

    return (
      <div className="max-w-lg mx-auto px-8 py-10" style={{ background: "var(--app-bg)" }}>
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => setScreen("deck")}
            className="flex items-center gap-2 text-[13px] transition-colors"
            style={{ color: "var(--text-tertiary)" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)"}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Parar
          </button>
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--app-border)" }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: "var(--gold)" }} />
          </div>
          <span className="text-[12px] font-medium" style={{ color: "var(--text-muted)" }}>
            {studyIndex + 1} / {studyCards.length}
          </span>
        </div>

        <div
          onClick={() => !flipped && setFlipped(true)}
          className="rounded-2xl border p-8 mb-6 min-h-[200px] flex flex-col items-center justify-center text-center transition-all"
          style={{
            background: "var(--app-bg-2)",
            borderColor: flipped ? "var(--gold)" : "var(--app-border)",
            cursor: flipped ? "default" : "pointer",
          }}
        >
          {!flipped ? (
            <>
              <p className="text-[11px] uppercase tracking-widest font-bold mb-4" style={{ color: "var(--text-faint)" }}>
                Frente
              </p>
              <p className="text-[20px] font-bold leading-snug" style={{ color: "var(--text-primary)" }}>
                {card.front}
              </p>
              <p className="text-[12px] mt-4" style={{ color: "var(--text-faint)" }}>
                Clique para ver a resposta
              </p>
            </>
          ) : (
            <>
              <p className="text-[11px] uppercase tracking-widest font-bold mb-4" style={{ color: "var(--gold)" }}>
                Resposta
              </p>
              <p className="text-[18px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {card.back}
              </p>
            </>
          )}
        </div>

        {flipped && (
          <div className="flex gap-3">
            <button onClick={() => handleReview(false)}
              className="flex-1 py-3.5 rounded-xl text-[14px] font-bold border-2 transition-all hover:scale-[1.01]"
              style={{ borderColor: "#ef4444", color: "#ef4444", background: "rgba(239,68,68,0.06)" }}>
              Errei
            </button>
            <button onClick={() => handleReview(true)}
              className="flex-1 py-3.5 rounded-xl text-[14px] font-bold transition-all hover:scale-[1.01]"
              style={{ background: "var(--gold)", color: "#000" }}>
              Acertei
            </button>
          </div>
        )}
      </div>
    );
  }

  return null;
}
