"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "@/lib/firebase";
import { useAuthUser } from "@/lib/useAuthUser";

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useAuthUser();

  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);

  async function finishOnboarding() {
    if (!name || !goal) {
      alert("Preencha todos os campos");
      return;
    }

    if (!user) return;

    setLoading(true);

    try {
      await updateDoc(doc(db, "users", user.uid), {
        name,
        goal,
        onboardingCompleted: true,
      });

      router.push("/app");
    } catch (err) {
      console.error(err);
      alert("Erro ao finalizar onboarding");
    }

    setLoading(false);
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Bem-vindo ao RiseUp 🚀</h1>
      <p>Vamos começar sua jornada</p>

      <br />

      <input
        placeholder="Como você quer ser chamado?"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <select value={goal} onChange={(e) => setGoal(e.target.value)}>
        <option value="">Selecione seu objetivo</option>
        <option value="disciplina">Disciplina</option>
        <option value="produtividade">Produtividade</option>
        <option value="proposito">Propósito</option>
        <option value="mindset">Mindset</option>
      </select>

      <br /><br />

      <button onClick={finishOnboarding} disabled={loading}>
        {loading ? "Salvando..." : "Começar"}
      </button>
    </main>
  );
}

