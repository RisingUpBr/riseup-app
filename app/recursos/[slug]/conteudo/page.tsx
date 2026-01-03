"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

/* =======================
   TYPES
======================= */
type Resource = {
  title: string;
  description: string;
  type: "pdf" | "email";
  delivery: "download" | "email";
  active: boolean;
  fileUrl?: string;
};

/* =======================
   PAGE
======================= */
export default function ConteudoRecursoPage() {
  const params = useParams();
  const router = useRouter();

  /* 🔐 NORMALIZA SLUG */
  const rawSlug = params.slug;
  const slug =
    typeof rawSlug === "string"
      ? rawSlug
      : Array.isArray(rawSlug)
      ? rawSlug[0]
      : "";

  /* 🚫 Slug inválido → não renderiza nada */
  if (!slug) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-500">
        Recurso inválido.
      </main>
    );
  }

  const [userChecked, setUserChecked] = useState(false);
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);

  /* =======================
     REGISTRA ACESSO
  ======================= */
  async function registerAccess(
    userId: string,
    resourceSlug: string,
    type: "pdf" | "email"
  ) {
    const ref = doc(
      db,
      "userResources",
      `${userId}_${resourceSlug}`
    );

    await setDoc(
      ref,
      {
        userId,
        resourceSlug,
        type,
        accessedAt: serverTimestamp(),
      },
      { merge: true }
    );
  }

  /* =======================
     1️⃣ AUTH CHECK
  ======================= */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace(
          `/cadastro?redirect=/recursos/${slug}/conteudo`
        );
      } else {
        setUserChecked(true);
      }
    });

    return () => unsubscribe();
  }, [router, slug]);

  /* =======================
     2️⃣ LOAD RESOURCE
  ======================= */
  useEffect(() => {
    if (!userChecked) return;

    async function loadResource() {
      try {
        const ref = doc(db, "resources", slug);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          setResource(null);
          return;
        }

        const data = snap.data() as Resource;

        if (!data.active) {
          setResource(null);
          return;
        }

        setResource(data);

        if (auth.currentUser) {
          await registerAccess(
            auth.currentUser.uid,
            slug,
            data.type
          );
        }
      } finally {
        setLoading(false);
      }
    }

    loadResource();
  }, [slug, userChecked]);

  /* =======================
     LOADING
  ======================= */
  if (loading || !userChecked) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-500">
        Preparando seu conteúdo…
      </main>
    );
  }

  /* =======================
     NOT FOUND
  ======================= */
  if (!resource) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-500">
        Recurso não encontrado.
      </main>
    );
  }

  /* =======================
     RENDER
  ======================= */
  return (
    <main className="min-h-screen px-6 py-20 max-w-3xl mx-auto">
      {/* HEADER */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-3">
          {resource.title}
        </h1>

        <p className="text-gray-600">
          Conteúdo liberado para sua conta.
        </p>
      </header>

      {/* PDF */}
      {resource.type === "pdf" && (
        <section className="border rounded-xl p-6 bg-gray-50 mb-12 text-center">
          <p className="mb-6 text-gray-700">
            Clique abaixo para baixar o material em PDF.
          </p>

          {resource.fileUrl ? (
            <a
              href={resource.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-black text-white px-8 py-4 rounded hover:opacity-90"
            >
              Baixar PDF
            </a>
          ) : (
            <p className="text-sm text-red-600">
              Arquivo indisponível.
            </p>
          )}
        </section>
      )}

      {/* EMAIL */}
      {resource.type === "email" && (
        <section className="border rounded-xl p-6 bg-gray-50 mb-12 text-center">
          <p className="text-gray-700 mb-4">
            Este conteúdo será enviado automaticamente ao seu email.
          </p>

          <p className="text-sm text-gray-500">
            Verifique também a pasta de spam.
          </p>
        </section>
      )}

      {/* CTA */}
      <section className="text-center text-gray-600">
        <p className="mb-3">
          Quer continuar evoluindo?
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/planos" className="underline">
            Conhecer o App
          </Link>

          <Link href="/recursos" className="underline">
            Voltar aos recursos
          </Link>
        </div>
      </section>
    </main>
  );
}

