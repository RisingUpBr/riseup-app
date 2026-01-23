export type FeatureKey =
  | "simpleNotes"
  | "dailyNotes"
  | "mindmaps"
  | "manualFlashcards"
  | "aiFlashcards"
  | "aiRoutineGenerator"
  | "aiGoalsGenerator"
  | "calendarRoutine"
  | "exclusiveLibrary";

export type FeatureDefinition = {
  key: FeatureKey;
  label: string;
  description: string;
};

export const FEATURE_DEFINITIONS: FeatureDefinition[] = [
  {
    key: "simpleNotes",
    label: "Notas simples",
    description: "Criação de anotações básicas",
  },
  {
    key: "dailyNotes",
    label: "Diário",
    description: "Entradas diárias de reflexão",
  },
  {
    key: "manualFlashcards",
    label: "Flashcards manuais",
    description: "Criação manual de flashcards",
  },
  {
    key: "aiFlashcards",
    label: "Flashcards por IA",
    description: "Geração automática com inteligência artificial",
  },
  {
    key: "aiRoutineGenerator",
    label: "Rotina automática",
    description: "Criação de rotina inteligente",
  },
  {
    key: "aiGoalsGenerator",
    label: "Metas automáticas",
    description: "Geração automática de metas",
  },
];
