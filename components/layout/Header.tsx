"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const translations = {
  "pt-BR": {
    home: "Home",
    app: "App",
    plans: "Planos",
    resources: "Recursos",
    connect: "Conecte-se",
    about: "Sobre",
    login: "Entrar",
    cta: "Transforme sua vida",
    dashboard: "Dashboard",
  },
  en: {
    home: "Home",
    app: "App",
    plans: "Plans",
    resources: "Resources",
    connect: "Connect",
    about: "About",
    login: "Login",
    cta: "Transform your life",
    dashboard: "Dashboard",
  },
  es: {
    home: "Inicio",
    app: "App",
    plans: "Planes",
    resources: "Recursos",
    connect: "Conectar",
    about: "Acerca",
    login: "Entrar",
    cta: "Transforma tu vida",
    dashboard: "Dashboard",
  },
};

export default function Header() {
  const { user, loading } = useAuthUser();
  const { language, setLanguage } = useLanguage();
  const [showLangMenu, setShowLangMenu] = useState(false);

  const t = translations[language];

  return (
    <header className="sticky top-0 z-50 w-full bg-black/95 backdrop-blur-sm border-b border-neutral-800">
      <div className="w-full px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* LOGO - EXTREMA ESQUERDA (MAIOR) */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo/Logo transparente RiseUp Dourado e preto (1).png"
                alt="RiseUp"
                width={280}
                height={90}
                className="h-16 w-auto"
                priority
              />
            </Link>
          </div>

          {/* MENU - CENTRO ABSOLUTO */}
          <nav className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-8 text-sm font-medium text-neutral-300">
            <Link href="/" className="hover:text-white transition-colors">
              {t.home}
            </Link>
            <Link href="/app" className="hover:text-white transition-colors">
              {t.app}
            </Link>
            <Link href="/planos" className="hover:text-white transition-colors">
              {t.plans}
            </Link>
            <Link href="/recursos" className="hover:text-white transition-colors">
              {t.resources}
            </Link>
            <Link href="/conecte-se" className="hover:text-white transition-colors">
              {t.connect}
            </Link>
            <Link href="/sobre" className="hover:text-white transition-colors">
              {t.about}
            </Link>
          </nav>

          {/* AÇÕES - EXTREMA DIREITA */}
          <div className="flex items-center gap-4">
            {/* SELETOR DE IDIOMA */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="p-2 hover:bg-neutral-800 rounded-lg transition-colors text-neutral-400 hover:text-white"
                title="Selecionar idioma"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-44 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl overflow-hidden z-50">
                  <button
                    onClick={() => {
                      setLanguage("pt-BR");
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-neutral-800 transition-colors ${
                      language === "pt-BR" ? "bg-neutral-800 text-gold" : "text-neutral-300"
                    }`}
                  >
                    🇧🇷 Português (BR)
                  </button>
                  <button
                    onClick={() => {
                      setLanguage("en");
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-neutral-800 transition-colors ${
                      language === "en" ? "bg-neutral-800 text-gold" : "text-neutral-300"
                    }`}
                  >
                    🇺🇸 English
                  </button>
                  <button
                    onClick={() => {
                      setLanguage("es");
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-neutral-800 transition-colors ${
                      language === "es" ? "bg-neutral-800 text-gold" : "text-neutral-300"
                    }`}
                  >
                    🇪🇸 Español
                  </button>
                </div>
              )}
            </div>

            {/* LOADING */}
            {loading && (
              <div className="w-40 h-10 bg-neutral-800 animate-pulse rounded-lg"></div>
            )}

            {/* SE LOGADO */}
            {!loading && user && (
              <Link
                href="/dashboard"
                className="bg-[#D4AF37] hover:bg-[#E5C158] text-black px-6 py-2.5 rounded-lg text-sm font-bold transition-all hover:scale-105 shadow-lg shadow-[#D4AF37]/30"
              >
                {t.dashboard}
              </Link>
            )}

            {/* SE NÃO LOGADO */}
            {!loading && !user && (
              <>
                <Link
                  href="/auth"
                  className="text-sm text-neutral-300 hover:text-white transition-colors px-3 py-2 hidden sm:block font-medium"
                >
                  {t.login}
                </Link>
                <Link
                  href="/auth"
                  className="bg-[#D4AF37] hover:bg-[#E5C158] text-black px-6 py-2.5 rounded-lg text-sm font-bold transition-all hover:scale-105 shadow-lg shadow-[#D4AF37]/30 whitespace-nowrap"
                >
                  {t.cta}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}