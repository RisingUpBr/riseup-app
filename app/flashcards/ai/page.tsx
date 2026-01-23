"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import GenerateAIFlashcardsButton from "@/components/GenerateAIFlashcardsButton";

export default function FlashcardsAIPage() {
  const [text, setText] = useState("");

  return (
    <ProtectedRoute>
      <div className="max-w-xl mx-auto py-10 space-y-6">
        <h1 className="text-2xl font-bold text-white">
          Flashcards por Inteligência Artificial
        </h1>

        <p className="text-sm text-neutral-400">
          Cole um texto abaixo e transforme-o automaticamente em flashcards.
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Cole aqui o conteúdo para transformar em flashcards..."
          className="w-full h-40 bg-neutral-900 border border-neutral-700 rounded-lg p-4 text-white text-sm"
        />

        <GenerateAIFlashcardsButton text={text} />
      </div>
    </ProtectedRoute>
  );
}
