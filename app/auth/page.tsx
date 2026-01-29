"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "@/lib/firebase";
import { createUserIfNotExists } from "@/lib/user";
import { useAuthUser } from "@/hooks/useAuthUser";

export default function AuthPage() {
  const router = useRouter();
  const { user, userData, loading: authLoading } = useAuthUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (user) {
      if (userData?.onboardingCompleted) {
        router.push("/dashboard");
      } else {
        router.push("/onboarding");
      }
    }
  }, [user, userData, authLoading, router]);

  async function handleLogin() {
    if (!email || !password) {
      alert("Preencha email e senha");
      return;
    }

    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      await createUserIfNotExists(cred.user.uid, cred.user.email);

      router.push("/dashboard");
    } catch (err: any) {
      alert(err.code);
    }
    setLoading(false);
  }

  async function handleSignup() {
    if (!email || !password) {
      alert("Preencha email e senha");
      return;
    }

    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await createUserIfNotExists(cred.user.uid, cred.user.email);

      router.push("/onboarding");
    } catch (err: any) {
      alert(err.code);
    }
    setLoading(false);
  }

  if (authLoading) return <p>Carregando...</p>;

  return (
    <main style={{ padding: 40 }}>
      <h1>Entrar ou Criar Conta</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin} disabled={loading}>
        Entrar
      </button>

      <br /><br />

      <button onClick={handleSignup} disabled={loading}>
        Criar conta
      </button>
    </main>
  );
}
