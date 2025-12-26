"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signOut } from "firebase/auth";

import { useAuthUser } from "@/lib/useAuthUser";
import { auth } from "@/lib/firebase";
import { getAppCapabilities } from "@/lib/access";

import NotesSection from "./notes";
import TasksSection from "./tasks"; // ✅ IMPORTADO AQUI

export default function AppPage() {
  const router = useRouter();
  const { user, userData, loading } = useAuthUser();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/auth");
      return;
    }

    if (!userData?.onboardingCompleted) {
      router.push("/onboarding");
    }
  }, [user, userData, loading, router]);

  async function handleLogout() {
    await signOut(auth);
    router.push("/auth");
  }

  if (loading || !userData) return <p>Carregando...</p>;

  const capabilities = getAppCapabilities(userData.appPlan);

  return (
    <main style={{ padding: 40 }}>
      <h1>Área do App</h1>
      <p>Bem-vindo ao RiseUp 🚀</p>

      <hr />

      <h3>Plano atual: {userData.appPlan}</h3>
      <p>Notas permitidas: {capabilities.maxNotes}</p>
      <p>Tarefas permitidas: {capabilities.maxTasks}</p>

      <hr />

      {/* ✅ NOTES */}
      <NotesSection />

      {/* ✅ TASKS */}
      <TasksSection />

      <br />
      <br />

      <button onClick={handleLogout}>Sair</button>
    </main>
  );
}
