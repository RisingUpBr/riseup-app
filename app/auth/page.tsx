"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/firebase";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useLanguage } from "@/contexts/LanguageContext";

const translations = {
  "pt-BR": {
    welcome: "Bem-vindo de volta!",
    createAccount: "Crie sua conta",
    login: "Entrar",
    signup: "Criar conta",
    email: "Email",
    password: "Senha",
    minChars: "Mínimo de 6 caracteres",
    loading: "Carregando...",
    loginButton: "Entrar",
    signupButton: "Criar conta grátis",
    forgotPassword: "Esqueceu a senha?",
    backToSite: "← Voltar para o site",
    errors: {
      fillAll: "Preencha todos os campos",
      minPassword: "A senha deve ter pelo menos 6 caracteres",
      userNotFound: "Usuário não encontrado",
      wrongPassword: "Senha incorreta",
      emailInUse: "Este email já está em uso",
      invalidEmail: "Email inválido",
      weakPassword: "Senha muito fraca",
      invalidCredential: "Email ou senha incorretos",
      default: "Erro ao fazer login. Tente novamente.",
    },
  },
  en: {
    welcome: "Welcome back!",
    createAccount: "Create your account",
    login: "Login",
    signup: "Sign up",
    email: "Email",
    password: "Password",
    minChars: "Minimum 6 characters",
    loading: "Loading...",
    loginButton: "Login",
    signupButton: "Create free account",
    forgotPassword: "Forgot password?",
    backToSite: "← Back to site",
    errors: {
      fillAll: "Fill in all fields",
      minPassword: "Password must be at least 6 characters",
      userNotFound: "User not found",
      wrongPassword: "Wrong password",
      emailInUse: "This email is already in use",
      invalidEmail: "Invalid email",
      weakPassword: "Password too weak",
      invalidCredential: "Incorrect email or password",
      default: "Login error. Please try again.",
    },
  },
  es: {
    welcome: "¡Bienvenido de nuevo!",
    createAccount: "Crea tu cuenta",
    login: "Entrar",
    signup: "Registrarse",
    email: "Email",
    password: "Contraseña",
    minChars: "Mínimo 6 caracteres",
    loading: "Cargando...",
    loginButton: "Entrar",
    signupButton: "Crear cuenta gratis",
    forgotPassword: "¿Olvidaste la contraseña?",
    backToSite: "← Volver al sitio",
    errors: {
      fillAll: "Completa todos los campos",
      minPassword: "La contraseña debe tener al menos 6 caracteres",
      userNotFound: "Usuario no encontrado",
      wrongPassword: "Contraseña incorrecta",
      emailInUse: "Este email ya está en uso",
      invalidEmail: "Email inválido",
      weakPassword: "Contraseña muy débil",
      invalidCredential: "Email o contraseña incorrectos",
      default: "Error al iniciar sesión. Inténtalo de nuevo.",
    },
  },
};

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const { user, userData, loading: authLoading } = useAuthUser();
  const { language } = useLanguage();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const t = translations[language];

  useEffect(() => {
    if (authLoading) return;
    if (user) {
      if (userData?.onboardingCompleted) {
        router.push(redirect);
      } else {
        router.push("/onboarding");
      }
    }
  }, [user, userData, authLoading, router, redirect]);

  async function createUserViaAPI(uid: string, email: string) {
    try {
      const res = await fetch("/api/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, email }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Erro ao criar usuário");
      }
      return await res.json();
    } catch (error) {
      console.error("Erro na API:", error);
      throw error;
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(t.errors.fillAll);
      return;
    }

    if (password.length < 6) {
      setError(t.errors.minPassword);
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        await createUserViaAPI(cred.user.uid, cred.user.email!);
        router.push(redirect);
      } else {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await createUserViaAPI(cred.user.uid, cred.user.email!);
        router.push("/onboarding");
      }
    } catch (err: any) {
      console.error(err);
      
      if (err.code === "auth/user-not-found") setError(t.errors.userNotFound);
      else if (err.code === "auth/wrong-password") setError(t.errors.wrongPassword);
      else if (err.code === "auth/email-already-in-use") setError(t.errors.emailInUse);
      else if (err.code === "auth/invalid-email") setError(t.errors.invalidEmail);
      else if (err.code === "auth/weak-password") setError(t.errors.weakPassword);
      else if (err.code === "auth/invalid-credential") setError(t.errors.invalidCredential);
      else setError(err.message || t.errors.default);
    }
    setLoading(false);
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37] mx-auto mb-4"></div>
          <p className="text-gray-400">{t.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* LOGO MAIOR */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/logo/Logo transparente RiseUp Dourado e preto (1).png"
              alt="RiseUp"
              width={280}
              height={93}
              className="h-16 w-auto mx-auto"
            />
          </Link>
          <p className="text-neutral-400 mt-4 text-lg">
            {isLogin ? t.welcome : t.createAccount}
          </p>
        </div>

        {/* CARD */}
        <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-8 shadow-2xl">
          {/* TOGGLE DOURADO */}
          <div className="flex gap-2 mb-6 bg-neutral-900 p-1 rounded-lg">
            <button
              onClick={() => { setIsLogin(true); setError(""); }}
              className={`flex-1 py-2.5 rounded-lg font-medium transition ${
                isLogin ? "bg-[#D4AF37] text-black" : "text-neutral-400 hover:text-white"
              }`}>
              {t.login}
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(""); }}
              className={`flex-1 py-2.5 rounded-lg font-medium transition ${
                !isLogin ? "bg-[#D4AF37] text-black" : "text-neutral-400 hover:text-white"
              }`}>
              {t.signup}
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">{t.email}</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition"
                disabled={loading} />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">{t.password}</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition"
                disabled={loading} />
              {!isLogin && (
                <p className="text-xs text-neutral-500 mt-1">{t.minChars}</p>
              )}
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-800 rounded-lg p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* BOTÃO DOURADO */}
            <button type="submit" disabled={loading}
              className="w-full bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold py-3 rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#D4AF37]/30">
              {loading ? t.loading : isLogin ? t.loginButton : t.signupButton}
            </button>
          </form>

          {isLogin && (
            <div className="text-center mt-4">
              <button className="text-sm text-neutral-400 hover:text-white transition">
                {t.forgotPassword}
              </button>
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-neutral-400 hover:text-white transition">
            {t.backToSite}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37] mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando...</p>
        </div>
      </div>
    }>
      <AuthContent />
    </Suspense>
  );
}