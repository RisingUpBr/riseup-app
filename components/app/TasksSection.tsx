"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { useAuthUser } from "@/hooks/useAuthUser";
import { getAppCapabilities, canCreateItem } from "@/lib/access";

export default function TasksSection() {
  const router = useRouter();
  const { user, userData, loading } = useAuthUser();

  const [tasksCount, setTasksCount] = useState(0);
  const [tasksLoading, setTasksLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // ✅ uid garantido
    const uid = user.uid;

    async function fetchTasks() {
      const snap = await getDocs(
        collection(db, "users", uid, "tasks")
      );
      setTasksCount(snap.size);
      setTasksLoading(false);
    }

    fetchTasks();
  }, [user]);

  if (!user || !userData || loading || tasksLoading) return null;

  const uid = user.uid;

  const capabilities = getAppCapabilities(userData.appPlan);
  const canCreate = canCreateItem(tasksCount, capabilities.maxTasks);

  async function handleCreateTask() {
    if (!canCreate) {
      router.push("/upgrade");
      return;
    }

    await addDoc(
      collection(db, "users", uid, "tasks"),
      {
        title: "Nova tarefa",
        completed: false,
        createdAt: serverTimestamp(),
      }
    );

    setTasksCount((c) => c + 1);
  }

  return (
    <section style={{ marginTop: 30 }}>
      <h3>✅ Tarefas</h3>

      <p>
        {tasksCount} /{" "}
        {capabilities.maxTasks === Infinity
          ? "∞"
          : capabilities.maxTasks}
      </p>

      <button onClick={handleCreateTask}>
        Criar tarefa
      </button>

      {!canCreate && (
        <p style={{ marginTop: 8 }}>
          🔒 Limite do plano atingido — <strong>faça upgrade</strong>
        </p>
      )}
    </section>
  );
}
