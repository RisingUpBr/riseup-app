"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, useSearchParams } from "next/navigation";

export default function CadastroPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/recursos";

  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const cred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        if (name) {
          await updateProfile(cred.user, {
            displayName: name,
          });
        }
      }

      router.push(redirectTo);
    } catch {
      setError("Não foi possível continuar. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md border rounded-xl p-8">
        <h1 className="text-2xl font-bold mb-2">
          {isLogin ? "Entrar" : "Criar conta gratuita"}
        </h1>

        <p className="text-gray-600 mb-6">
          {isLogin
            ? "Acesse sua conta para continuar."
            : "Cadastre-se para acessar os materiais gratuitos da Rise Up."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Seu primeiro nome"
              className="w-full border rounded px-4 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full border rounded px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            required
            className="w-full border rounded px-4 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded hover:opacity-90 disabled:opacity-50"
          >
            {loading
              ? "Aguarde..."
              : isLogin
              ? "Entrar"
              : "Criar conta e acessar"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          {isLogin ? (
            <>
              Ainda não tem conta?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="underline"
              >
                Criar conta
              </button>
            </>
          ) : (
            <>
              Já tem conta?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="underline"
              >
                Entrar
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}