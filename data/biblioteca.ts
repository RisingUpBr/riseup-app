export type ContentLevel = "free" | "premium";
export type ContentType = "guia" | "artigo" | "framework";
export type ContentCategory = "disciplina" | "mentalidade" | "produtividade";

export interface BibliotecaContent {
  id: string;
  title: string;
  description: string;
  category: ContentCategory;
  type: ContentType;
  level: ContentLevel;
  readingTime: number;
  publishedAt: string;
  blocks: ContentBlock[];
}

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "highlight"; text: string };

export const BIBLIOTECA_CONTENTS: BibliotecaContent[] = [
  {
    id: "7-pilares-disciplina",
    title: "Os 7 Pilares da Disciplina Magnética",
    description: "O framework completo para construir disciplina real e duradoura.",
    category: "disciplina",
    type: "guia",
    level: "free",
    readingTime: 8,
    publishedAt: "2026-01-01",
    blocks: [
      { type: "paragraph", text: "A disciplina não é um traço de personalidade. É uma habilidade construída, pilar por pilar, decisão por decisão." },
      { type: "heading", text: "Pilar 1 — Clareza de propósito" },
      { type: "paragraph", text: "Sem saber o porquê, qualquer obstáculo se torna motivo para desistir. Defina com precisão o que você quer e por que isso importa para a sua vida." },
      { type: "heading", text: "Pilar 2 — Ambiente projetado" },
      { type: "paragraph", text: "Seu ambiente fala mais alto que sua força de vontade. Remova fricção do caminho certo e adicione fricção ao caminho errado." },
      { type: "heading", text: "Pilar 3 — Sistemas, não motivação" },
      { type: "paragraph", text: "A motivação é instável. Sistemas são estáveis. Crie rotinas que funcionem mesmo nos dias em que você não sente vontade nenhuma." },
      { type: "heading", text: "Pilar 4 — Identidade antes de comportamento" },
      { type: "paragraph", text: "Não tente mudar o que você faz. Mude quem você acredita que é. Comportamentos seguem identidade, não o contrário." },
      { type: "heading", text: "Pilar 5 — Recuperação rápida" },
      { type: "paragraph", text: "Você vai falhar. O que separa os disciplinados não é não cair — é quanto tempo levam para se levantar. Um dia perdido não vira uma semana perdida." },
      { type: "heading", text: "Pilar 6 — Medição constante" },
      { type: "paragraph", text: "O que não é medido não é gerenciado. Registre sua consistência diariamente. O simples ato de registrar já aumenta a probabilidade de execução." },
      { type: "heading", text: "Pilar 7 — Recompensa consciente" },
      { type: "paragraph", text: "Celebre cada conquista, por menor que seja. O cérebro aprende pelo reforço positivo. Reconheça seu progresso em voz alta." },
      { type: "highlight", text: "Disciplina magnética não é sofrimento. É o prazer de ser a pessoa que você decidiu ser." },
    ],
  },
  {
    id: "25-livros-bilionarios",
    title: "Os 25 Livros que os Bilionários Leem em Segredo",
    description: "A lista curada de leituras que moldaram as mentes mais bem-sucedidas do mundo.",
    category: "mentalidade",
    type: "guia",
    level: "free",
    readingTime: 6,
    publishedAt: "2026-01-01",
    blocks: [
      { type: "paragraph", text: "Não existe acidente nos padrões de leitura das pessoas mais bem-sucedidas do mundo. Existe intenção deliberada." },
      { type: "heading", text: "Por que eles leem o que leem" },
      { type: "paragraph", text: "Enquanto a maioria lê por entretenimento, os bilionários leem para instalar novos modelos mentais, resolver problemas e antecipar o futuro." },
      { type: "heading", text: "Modelos mentais e decisão" },
      { type: "list", items: ["Thinking, Fast and Slow — Daniel Kahneman", "Poor Charlie's Almanack — Charlie Munger", "The Almanack of Naval Ravikant", "Principles — Ray Dalio", "The Psychology of Money — Morgan Housel"] },
      { type: "heading", text: "Negócios e estratégia" },
      { type: "list", items: ["Zero to One — Peter Thiel", "The Hard Thing About Hard Things — Ben Horowitz", "Good to Great — Jim Collins", "Built to Last — Jim Collins", "The Innovator's Dilemma — Clayton Christensen"] },
      { type: "heading", text: "Desenvolvimento pessoal e foco" },
      { type: "list", items: ["Deep Work — Cal Newport", "Atomic Habits — James Clear", "The ONE Thing — Gary Keller", "Essentialism — Greg McKeown", "Man's Search for Meaning — Viktor Frankl"] },
      { type: "heading", text: "Ciência e visão de longo prazo" },
      { type: "list", items: ["Sapiens — Yuval Noah Harari", "The Beginning of Infinity — David Deutsch", "Antifragile — Nassim Taleb", "The Black Swan — Nassim Taleb", "Thinking in Systems — Donella Meadows"] },
      { type: "heading", text: "Os outros 5" },
      { type: "list", items: ["Meditations — Marcus Aurelius", "Letters from a Stoic — Seneca", "The Art of War — Sun Tzu", "48 Laws of Power — Robert Greene", "The 4-Hour Workweek — Tim Ferriss"] },
      { type: "highlight", text: "Líderes são leitores. Não porque leram muito — mas porque leram com intenção de mudar como pensam." },
    ],
  },
  {
    id: "sistema-produtividade-profunda",
    title: "Sistema de Produtividade Profunda",
    description: "Como estruturar seu dia para máximo foco e resultado consistente.",
    category: "produtividade",
    type: "framework",
    level: "premium",
    readingTime: 10,
    publishedAt: "2026-02-01",
    blocks: [
      { type: "paragraph", text: "Conteúdo premium. Faça upgrade para acessar." },
    ],
  },
  {
    id: "reprogramacao-mental",
    title: "Reprogramação Mental — O Método Rise Up",
    description: "Como reescrever crenças limitantes e instalar uma mentalidade de alto desempenho.",
    category: "mentalidade",
    type: "artigo",
    level: "premium",
    readingTime: 12,
    publishedAt: "2026-02-01",
    blocks: [
      { type: "paragraph", text: "Conteúdo premium. Faça upgrade para acessar." },
    ],
  },
  {
    id: "habitos-inquebraveis",
    title: "Construindo Hábitos Inquebráveis",
    description: "O framework de 4 fases para criar hábitos que resistem a qualquer obstáculo.",
    category: "disciplina",
    type: "framework",
    level: "premium",
    readingTime: 9,
    publishedAt: "2026-02-01",
    blocks: [
      { type: "paragraph", text: "Conteúdo premium. Faça upgrade para acessar." },
    ],
  },
  {
    id: "planejamento-semanal",
    title: "O Guia Definitivo do Planejamento Semanal",
    description: "Como planejar sua semana para não perder nenhuma meta importante.",
    category: "produtividade",
    type: "guia",
    level: "premium",
    readingTime: 7,
    publishedAt: "2026-02-01",
    blocks: [
      { type: "paragraph", text: "Conteúdo premium. Faça upgrade para acessar." },
    ],
  },
];

export const CATEGORIES = [
  { value: "todos", label: "Todos" },
  { value: "disciplina", label: "Disciplina e hábitos" },
  { value: "mentalidade", label: "Mentalidade" },
  { value: "produtividade", label: "Produtividade" },
] as const;

export const TYPE_LABELS: Record<ContentType, string> = {
  guia: "Guia",
  artigo: "Artigo",
  framework: "Framework",
};
