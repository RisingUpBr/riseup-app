import { GoalCategory, Milestone } from "./goalsService";

export interface GoalTemplate {
  id: string;
  title: string;
  emoji: string;
  category: GoalCategory;
  why: string;
  deadlineMonths: number;
  milestones: Omit<Milestone, "id">[];
}

export const GOAL_TEMPLATES: GoalTemplate[] = [
  {
    id: "run-5k",
    title: "Correr 5km sem parar",
    emoji: "🏃",
    category: "health",
    why: "Quero melhorar minha saúde cardiovascular e disposição no dia a dia",
    deadlineMonths: 3,
    milestones: [
      { title: "Correr 1km sem parar", completed: false },
      { title: "Correr 2km sem parar", completed: false },
      { title: "Correr 3km seguidos", completed: false },
      { title: "Completar os 5km", completed: false },
    ],
  },
  {
    id: "english-b2",
    title: "Inglês fluente (nível B2)",
    emoji: "🇺🇸",
    category: "study",
    why: "Abrir portas para oportunidades internacionais e crescimento profissional",
    deadlineMonths: 12,
    milestones: [
      { title: "Concluir nível A2", completed: false },
      { title: "Ter primeira conversa em inglês", completed: false },
      { title: "Assistir série sem legendas em português", completed: false },
      { title: "Atingir nível B2 certificado", completed: false },
    ],
  },
  {
    id: "emergency-fund",
    title: "Reserva de emergência (6 meses)",
    emoji: "💰",
    category: "finance",
    why: "Ter segurança financeira e tranquilidade para tomar decisões sem pressão",
    deadlineMonths: 18,
    milestones: [
      { title: "Guardar 1 mês de despesas", completed: false },
      { title: "Guardar 3 meses de despesas", completed: false },
      { title: "Guardar 6 meses de despesas", completed: false },
    ],
  },
  {
    id: "lose-weight",
    title: "Perder 10kg com saúde",
    emoji: "⚖️",
    category: "health",
    why: "Sentir mais energia, autoestima e saúde no longo prazo",
    deadlineMonths: 6,
    milestones: [
      { title: "Perder primeiros 2kg", completed: false },
      { title: "Perder 5kg — metade do caminho", completed: false },
      { title: "Criar hábito de exercício semanal", completed: false },
      { title: "Atingir os 10kg perdidos", completed: false },
    ],
  },
  {
    id: "read-books",
    title: "Ler 12 livros em 1 ano",
    emoji: "📚",
    category: "study",
    why: "Expandir conhecimento, vocabulário e referências de vida",
    deadlineMonths: 12,
    milestones: [
      { title: "Terminar primeiro livro", completed: false },
      { title: "Criar hábito de leitura diária", completed: false },
      { title: "Ler 6 livros — metade", completed: false },
      { title: "Concluir os 12 livros", completed: false },
    ],
  },
  {
    id: "launch-project",
    title: "Lançar meu projeto/negócio",
    emoji: "🚀",
    category: "career",
    why: "Construir algo próprio que gere impacto e independência financeira",
    deadlineMonths: 6,
    milestones: [
      { title: "Definir ideia e público-alvo", completed: false },
      { title: "Criar MVP ou protótipo", completed: false },
      { title: "Primeiros 10 usuários/clientes", completed: false },
      { title: "Lançamento oficial", completed: false },
    ],
  },
  {
    id: "meditate",
    title: "Meditar 10 minutos por dia",
    emoji: "🧘",
    category: "health",
    why: "Reduzir ansiedade, melhorar foco e qualidade do sono",
    deadlineMonths: 2,
    milestones: [
      { title: "Meditar 7 dias seguidos", completed: false },
      { title: "Meditar 21 dias seguidos", completed: false },
      { title: "Hábito consolidado — 60 dias", completed: false },
    ],
  },
  {
    id: "salary-raise",
    title: "Conseguir aumento de salário",
    emoji: "💼",
    category: "career",
    why: "Reconhecimento pelo trabalho e crescimento financeiro",
    deadlineMonths: 6,
    milestones: [
      { title: "Listar conquistas e resultados", completed: false },
      { title: "Desenvolver habilidade valorizada", completed: false },
      { title: "Negociar com gestor", completed: false },
    ],
  },
];
