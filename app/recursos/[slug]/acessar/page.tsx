"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, useParams } from "next/navigation";

export default function AcessarRecursoPage() {
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace(
          `/cadastro?redirect=/recursos/${params.slug}/acessar`
        );
      } else {
        router.replace(`/recursos/${params.slug}/conteudo`);
      }
    });

    return () => unsubscribe();
  }, [router, params.slug]);

  return (
    <main className="min-h-screen flex items-center justify-center text-gray-500">
      Preparando seu acesso…
    </main>
  );
}
