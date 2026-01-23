export const APP_PLANS = {
  free: {
    entitlements: {
      notes: 20,
      flashcards: 5,
      routines: 1,
      treeNotes: 3,
      diaryNotes: 10,
      goalPlanner: 1,
      aiOrganizer: 1,
    },
  },

  quinzenal: {
    entitlements: {
      notes: 200,
      flashcards: 100,
      routines: 20,
      treeNotes: 50,
      diaryNotes: 100,
      goalPlanner: 10,
      aiOrganizer: 10,
    },
  },

  mensal: {
    entitlements: {
      notes: 1000,
      flashcards: 500,
      routines: 100,
      treeNotes: 200,
      diaryNotes: 500,
      goalPlanner: 50,
      aiOrganizer: 50,
    },
  },

  anual: {
    entitlements: {
      notes: 9999,
      flashcards: 9999,
      routines: 9999,
      treeNotes: 9999,
      diaryNotes: 9999,
      goalPlanner: 9999,
      aiOrganizer: 9999,
    },
  },
} as const;
