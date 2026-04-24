# AI_CONTEXT.md â Rise Up App

> Leia este arquivo COMPLETO antes de qualquer tarefa. Ele define tudo sobre o projeto.

---

## 1. IDENTIDADE DO PROJETO

**Rise Up** Ã© um app SaaS de produtividade pessoal focado em jovens adultos brasileiros.
- **RepositÃ³rio:** github.com/RisingUpBr/riseup-app
- **Stack:** Next.js 16, TypeScript, Tailwind CSS 4, Firebase (Auth + Firestore), Stripe, Vercel
- **URL de produÃ§Ã£o:** (a definir)
- **Ambiente local:** `npm run dev` na porta 3000

---

## 2. ARQUITETURA DE PASTAS

```
app/
  (app)/          â Ã¡rea logada (requer auth)
    dashboard/
    biblioteca/
    notes/simple/
    diario/
    flashcards/ai/
    mindmap/
    routine/
    goals/          â ainda nÃ£o implementado
    configuracoes/
    onboarding/
    layout.tsx      â layout da Ã¡rea logada (inclui Sidebar)
  (site)/           â landing page pÃºblica
    layout.tsx
  auth/page.tsx     â login/cadastro
  layout.tsx        â layout raiz
  globals.css       â variÃ¡veis CSS de tema

components/
  Sidebar.tsx
  ConfirmModal.tsx
  ProtectedRoute.tsx
  FeatureGate.tsx
  layout/Header.tsx Footer.tsx

contexts/
  ThemeContext.tsx
  LanguageContext.tsx

hooks/
  useAuthUser.ts
  useFeatureAccess.ts

lib/
  firebase.ts           â config Firebase (auth, db â SEM storage)
  appPlans.ts
  canUseFeature.ts
  ensureUserDocument.ts
  normalizeUser.ts
  extractName.ts
  notesService.ts
  diaryService.ts
  diaryPrompts.ts       â 100+ frases de pensadores por humor
  flashcardsService.ts
  mindmapService.ts
  routineService.ts
  activityService.ts
  incrementUsage.ts
  useUserPlan.ts

data/
  biblioteca.ts         â JSON local, sem Firestore
public/logo/
  logo-dourado.png
  logo-branco.png
```

---

## 3. IDENTIDADE VISUAL

| VariÃ¡vel CSS | Valor (dark) | Uso |
|---|---|---|
| `--gold` | `#D4AF37` | Cor principal, CTAs, destaques |
| `--app-bg` | `#0A0A0A` | Fundo principal |
| `--app-bg-2` | `#0f0f0f` | Sidebars, cards |
| `--app-bg-3` | `#141414` | Inputs, hover |
| `--app-bg-4` | `#1a1a1a` | Hover ativo |
| `--text-primary` | `#f5f5f5` | TÃ­tulos |
| `--text-secondary` | `#d0d0d0` | Texto normal |
| `--text-muted` | `#888` | SubtÃ­tulos |
| `--text-tertiary` | `#666` | Labels |
| `--text-faint` | `#444` | Placeholders |
| `--app-border` | `#1a1a1a` | Bordas sutis |
| `--app-border-2` | `#222` | Bordas inputs |
| `--gold-bg` | `rgba(212,175,55,0.1)` | Fundo dourado suave |
| `--danger` | `#ef4444` | AÃ§Ãµes destrutivas |
| `--danger-bg` | `rgba(239,68,68,0.08)` | Fundo danger |
| `--success` | `#4ade80` | ConfirmaÃ§Ãµes |

**Tema claro** tambÃ©m existe â variÃ¡veis redefinidas via `[data-theme="light"]` no globals.css.

**REGRA:** NUNCA use cores hardcoded (ex: `text-white`, `bg-black`). Use SEMPRE `var(--...)`.

---

## 4. FIREBASE

```
projectId: rise-up-ecosystem
authDomain: rise-up-ecosystem.firebaseapp.com
storageBucket: rise-up-ecosystem.firebasestorage.app (NÃO ATIVO â plano Spark)
```

**ColeÃ§Ãµes Firestore:**
| ColeÃ§Ã£o | Estrutura | Regra de acesso |
|---|---|---|
| `users/{uid}` | perfil, plano, limites, uso | `auth.uid == userId` |
| `notes/{noteId}` | userId, title, content, blocks, favorite, updatedAt | `auth.uid == resource.data.userId` |
| `diary/{entryId}` | userId, date, title, content, mood, favorite, bookmarked | idem |
| `decks/{deckId}` | userId, name, emoji, cardCount, reviewCount | idem |
| `flashcards/{cardId}` | userId, deckId, front, back, source, difficulty | idem |
| `mindmaps/{mapId}` | userId, name, nodes[], connections[], canvasDark | idem |
| `routineTemplates/{id}` | userId, name, emoji, blocks[], scheduleDays[], isPreset | idem |
| `routineLogs/{id}` | userId, date, completedBlocks[], mood | idem |
| `activity/{docId}` | userId, type, title, path, timestamp | idem |
| `resources/{id}` | conteÃºdo da biblioteca | read: true, write: false |

**Firebase Storage:** NÃO usar. Requer plano Blaze. Foto de perfil = URL externa.

**Ãndices necessÃ¡rios (jÃ¡ criados):**
- notes: userId ASC + updatedAt DESC
- diary: userId ASC + date DESC
- decks: userId ASC
- flashcards: deckId ASC

---

## 5. SISTEMA DE PLANOS

```typescript
// Planos: "free" | "quinzenal" | "mensal" | "anual"
// isPremium = plano !== "free"

// Limites free:
notes: 10 simultÃ¢neas
dailyNotes: 5 por mÃªs
decks: 3
flashcards: 20 por deck
aiFlashcards: 3 geraÃ§Ãµes/mÃªs
mindmaps: 0 (premium only)

// Premium: tudo ilimitado
```

**Para testar premium:** Firestore â users â [uid] â `plan: "premium"` + `stripe.status: "active"`

---

## 6. PADRÃES DE CÃDIGO OBRIGATÃRIOS

### 6.1 Componentes
- Sempre `"use client"` em componentes interativos
- Props tipadas com interface TypeScript
- Hooks customizados para lÃ³gica reutilizÃ¡vel
- MÃ¡ximo ~200 linhas por arquivo â dividir se maior

### 6.2 ServiÃ§os (lib/)
- Um arquivo por funcionalidade: `notesService.ts`, `diaryService.ts`, etc.
- Exportar funÃ§Ãµes puras + tipos + constantes
- Usar `onSnapshot` para real-time, `getDocs` para leitura pontual
- NUNCA salvar `undefined` no Firestore â usar `null` ou `deleteField()`

### 6.3 Estilo
- Tailwind para layout/spacing
- `style={{}}` inline para cores dinÃ¢micas com `var(--...)`
- Hover effects via `onMouseEnter/Leave` quando dinÃ¢mico
- Sem classes hardcoded de cor (`text-white`, `bg-gray-900`)

### 6.4 ExclusÃ£o e aÃ§Ãµes destrutivas
- SEMPRE usar `ConfirmModal` antes de deletar qualquer dado
- Nunca deletar direto â sempre confirmaÃ§Ã£o prÃ©via

### 6.5 Salvamento
- Autosave com debounce (800msâ1500ms) para conteÃºdo de texto
- Indicador visual "Salvando..." / "Salvo"
- Nunca perder dado por falta de salvamento

---

## 7. FUNCIONALIDADES â STATUS

| Feature | Status | Arquivo principal |
|---|---|---|
| Auth + Onboarding | â Completo | `app/auth/`, `app/(app)/onboarding/` |
| Sidebar | â Completo | `components/Sidebar.tsx` |
| Dashboard | â Completo | `app/(app)/dashboard/` |
| Biblioteca | â Completo | `app/(app)/biblioteca/`, `data/biblioteca.ts` |
| Notas | â Completo | `app/(app)/notes/simple/`, `lib/notesService.ts` |
| DiÃ¡rio | â Completo | `app/(app)/diario/`, `lib/diaryService.ts` |
| Flashcards | â Estrutura pronta, IA desabilitada | `app/(app)/flashcards/ai/`, `lib/flashcardsService.ts` |
| Mapa Mental | â Completo (premium) | `app/(app)/mindmap/`, `lib/mindmapService.ts` |
| Rotina | ð§ Em progresso | `app/(app)/routine/`, `lib/routineService.ts` |
| Metas | â NÃ£o iniciado | `app/(app)/goals/` |
| ConfiguraÃ§Ãµes | ð§ Parcial | `app/(app)/configuracoes/` |
| Planos/Stripe | â NÃ£o iniciado | â |

---

## 8. FUNCIONALIDADES PENDENTES / BUGS CONHECIDOS

- **Rotina:** bug `scheduleDays undefined` corrigido com fallback `?? []`. Templates antigos no Firestore podem nÃ£o ter o campo.
- **Flashcards IA:** estrutura pronta com limites, botÃ£o "Em breve" â nÃ£o ativar sem configurar billing.
- **Firebase Storage:** desativado. Foto de perfil via URL externa.
- **Metas:** pÃ¡gina placeholder â nÃ£o iniciada.
- **Stripe:** nÃ£o integrado ainda.

---

## 9. DIVISÃO DE RESPONSABILIDADES ENTRE IAs

| Agente | Papel | Quando usar |
|---|---|---|
| **Claude (esta conversa)** | Arquitetura, decisÃµes, UI complexa, lÃ³gica de negÃ³cio do APP | Funcionalidades novas, bugs complexos, decisÃµes de produto |
| **Claude Code (CLI)** | ExecuÃ§Ã£o dos prompts desta conversa no cÃ³digo | Sempre junto desta conversa |
| **Codex / Copilot** | Autocomplete inline, sugestÃµes rÃ¡pidas de sintaxe | DigitaÃ§Ã£o, boilerplate simples |
| **Outras conversas Claude** | Site Rise Up (separado do app) | Apenas para o site â nÃ£o misturar contexto |

**REGRA DE OURO:** Nunca peÃ§a para dois agentes fazerem a mesma tarefa. Codex completa linha; Claude decide arquitetura.

---

## 10. O QUE NUNCA FAZER

- â Usar `localStorage` ou `sessionStorage` (nÃ£o funciona em artifacts)
- â Salvar `undefined` no Firestore (usar `null` ou `deleteField()`)
- â Usar Firebase Storage (plano Spark â sem acesso)
- â Cores hardcoded â sempre `var(--...)`
- â Criar lÃ³gica duplicada â verificar se jÃ¡ existe em `lib/`
- â Deletar dados sem `ConfirmModal`
- â Pedir para Claude Code e Codex a mesma tarefa simultaneamente
- â Misturar contexto do site com contexto do app nesta conversa

---

## 11. COMO INICIAR UMA SESSÃO

1. Leia este arquivo
2. Verifique o status da feature em desenvolvimento (seÃ§Ã£o 7)
3. Consulte bugs conhecidos (seÃ§Ã£o 8)
4. Siga os padrÃµes de cÃ³digo (seÃ§Ã£o 6)
5. Use `var(--...)` para todas as cores (seÃ§Ã£o 3)
