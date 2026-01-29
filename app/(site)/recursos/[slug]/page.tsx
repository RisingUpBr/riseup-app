"use client";

import Link from "next/link";
import { notFound, usePathname } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";

type Resource = {
  title: string;
  description: string;
  type: "pdf" | "email";
  delivery: "download" | "email";
  requiresEmail: boolean;
  active: boolean;
};

export default function RecursoDetalhePage({
  params,
}: {
  params: { slug: string };
}) {
  const [recurso, setRecurso] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    async function loadResource() {
      try {
        const ref = doc(db, "resources", params.slug);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          setRecurso(null);
          return;
        }

        const data = snap.data() as Resource;

        if (!data.active) {
          setRecurso(null);
          return;
        }

        setRecurso(data);
      } finally {
        setLoading(false);
      }
    }

    loadResource();
  }, [params.slug]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-500">
        Carregando…
      </main>
    );
  }

  if (!recurso) {
    return notFound();
  }

  return (
    <main className="min-h-screen px-6 py-20 max-w-3xl mx-auto">
      {/* TÍTULO */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-3">{recurso.title}</h1>

        <p className="text-xl text-gray-600">
          {recurso.type === "pdf"
            ? "Leitura estratégica e direta ao ponto."
            : "Treinamento distribuído por email."}
        </p>
      </header>

      {/* DESCRIÇÃO */}
      <section className="text-gray-700 mb-12 space-y-4">
        {recurso.description.split("\n").map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </section>

      {/* INFO */}
      <section className="border rounded-xl p-6 bg-gray-50 mb-12">
        <p className="text-sm text-gray-700 mb-2">
          <strong>Formato:</strong>{" "}
          {recurso.type === "pdf"
            ? "PDF para download"
            : "Emails sequenciais"}
        </p>

        <p className="text-sm text-gray-700">
          <strong>Entrega:</strong>{" "}
          {recurso.delivery === "download"
            ? "Acesso imediato após cadastro"
            : "Envio automático por email"}
        </p>
      </section>

      {/* CTA PRINCIPAL */}
      <section className="text-center mb-12">
        <Link
          href={`/cadastro?redirect=${encodeURIComponent(pathname)}`}
          className="inline-block bg-black text-white px-8 py-4 rounded text-lg hover:opacity-90"
        >
          Acessar gratuitamente
        </Link>

        <p className="text-sm text-gray-500 mt-4">
          Cadastro único. Acesso liberado para todos os recursos gratuitos.
        </p>
      </section>

      {/* CTA SECUNDÁRIO */}
      <section className="text-center text-gray-600">
        <p className="mb-2">Quer aprofundar além do gratuito?</p>

        <div className="flex justify-center gap-4">
          <Link href="/planos" className="underline">
            Conhecer o App
          </Link>

          <Link href="/produtos" className="underline">
            Ver programas completos
          </Link>
        </div>
      </section>
    </main>
  );
}
