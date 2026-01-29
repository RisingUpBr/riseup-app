"use client";

import Link from "next/link";
import { useAuthUser } from "@/hooks/useAuthUser";

export default function UserProductsCard() {
  const { userData, loading } = useAuthUser();

  if (loading || !userData) return null;

  const produtos: string[] =
    userData.entitlements?.infoprodutos ?? [];

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4">
      <h2 className="text-lg font-semibold text-white">
        Seus conteúdos
      </h2>

      {produtos.length === 0 ? (
        <p className="text-sm text-neutral-400">
          Você ainda não adquiriu nenhum conteúdo complementar.
        </p>
      ) : (
        <ul className="space-y-2">
          {produtos.map((slug) => (
            <li key={slug}>
              <Link
                href={`/produtos/${slug}`}
                className="text-yellow-400 hover:underline"
              >
                Acessar {slug}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/produtos"
        className="text-sm text-neutral-400 hover:underline"
      >
        Ver todos os conteúdos disponíveis →
      </Link>
    </div>
  );
}
