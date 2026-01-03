"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Resource = {
  id: string;
  title: string;
  description: string;
  type: "pdf" | "email";
  accessLevel: "free";
};

export default function RecursosPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadResources() {
      const q = query(
        collection(db, "resources"),
        where("accessLevel", "==", "free"),
        where("active", "==", true)
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Resource, "id">),
      }));

      setResources(data);
      setLoading(false);
    }

    loadResources();
  }, []);

  return (
    <main className="min-h-screen px-6 py-16 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Recursos Gratuitos Rise Up
      </h1>

      <p className="text-center text-gray-600 mb-12">
        Materiais criados para gerar clareza, disciplina e direção —
        sem custo, sem ruído.
      </p>

      {loading ? (
        <p className="text-center text-gray-500">Carregando…</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {resources.map((res) => (
            <div
              key={res.id}
              className="border rounded-xl p-6 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs uppercase tracking-wide text-gray-500">
                  {res.type === "pdf" ? "PDF" : "Treinamento por email"}
                </span>

                <h3 className="text-lg font-semibold mt-2 mb-2">
                  {res.title}
                </h3>

                <p className="text-gray-600 text-sm">
                  {res.description}
                </p>
              </div>

              <Link
                href={`/recursos/${res.id}`}
                className="mt-6 text-center rounded bg-black text-white py-2 hover:opacity-90"
              >
                Acessar gratuitamente
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* CTA FINAL */}
      <div className="mt-20 text-center border rounded-xl p-8 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-2">
          Quer ir além do gratuito?
        </h2>

        <p className="text-gray-600 mb-6">
          Acesse o App Rise Up ou aprofunde com os infoprodutos completos.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/planos"
            className="bg-black text-white px-6 py-3 rounded"
          >
            Ver planos do App
          </Link>

          <Link
            href="/produtos"
            className="border border-black px-6 py-3 rounded hover:bg-black hover:text-white transition"
          >
            Ver infoprodutos
          </Link>
        </div>
      </div>
    </main>
  );
}
