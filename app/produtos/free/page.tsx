"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function FreeProdutoPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name || !email) {
      setError("Preencha nome e email");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "leads"), {
        name,
        email,
        source: "free_infoproduto",
        createdAt: serverTimestamp(),
      });

      router.push("/free");
    } catch (err) {
      setError("Erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full border rounded-xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Comece gratuitamente
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Um conteúdo direto, prático e honesto para te ajudar a ganhar clareza
          e dar o próximo passo com consciência.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Seu nome"
            className="w-full border rounded px-4 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Seu melhor email"
            className="w-full border rounded px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded hover:opacity-90"
          >
            {loading ? "Enviando..." : "Receber acesso gratuito"}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          Sem spam. Apenas conteúdo de valor.
        </p>
      </div>
    </main>
  );
}
