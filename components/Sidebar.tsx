"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useUserPlan } from "@/lib/useUserPlan";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, userData } = useAuthUser();
  const { isPremium } = useUserPlan();

  // Pega o plano específico do Stripe (quinzenal, mensal, anual)
  const specificPlan = userData?.stripe?.plan;

  async function handleLogout() {
    if (confirm("Tem certeza que deseja sair?")) {
      await signOut(auth);
      router.push("/");
    }
  }

  const menuItems = [
    {
      section: "Início",
      items: [
        { name: "Dashboard", href: "/dashboard", icon: "🏠" },
        { name: "Biblioteca", href: "/biblioteca", icon: "📚", premium: true },
      ],
    },
    {
      section: "Produtividade",
      items: [
        { name: "Notas", href: "/notes/simple", icon: "📝" },
        { name: "Diário", href: "/diario", icon: "📖" },
        { name: "Flashcards", href: "/flashcards/ai", icon: "🎴" },
        { name: "Mapa Mental", href: "/mindmap", icon: "🧠", premium: true },
      ],
    },
    {
      section: "Planejamento",
      items: [
        { name: "Rotina", href: "/routine", icon: "📅" },
        { name: "Metas", href: "/goals", icon: "🎯" },
      ],
    },
    {
      section: "Premium",
      items: [
        { name: "Conteúdo Premium", href: "/premium", icon: "🔥", premium: true },
      ],
    },
  ];

  // Função para formatar o nome do plano
  function getPlanDisplayName() {
    if (!specificPlan) return "Free";
    
    switch (specificPlan) {
      case "quinzenal":
        return "Quinzenal";
      case "mensal":
        return "Mensal";
      case "anual":
        return "Anual";
      default:
        return "Free";
    }
  }

  return (
    <aside className="w-64 h-screen bg-neutral-950 border-r border-neutral-800 flex flex-col fixed left-0 top-0 overflow-y-auto">
      {/* HEADER DA SIDEBAR */}
      <div className="p-4 border-b border-neutral-800">
        <Link href="/" className="flex items-center justify-center">
          <Image
            src="/logo/Logo_transparente_RiseUp_Dourado_e_preto__1_.png"
            alt="RiseUp"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
        </Link>
        
        {/* PLANO ATUAL */}
        <div className="mt-3 px-3 py-2 bg-neutral-900 rounded-lg text-xs">
          <div className="flex items-center justify-between">
            <span className="text-neutral-400">Plano:</span>
            <span className={`font-semibold ${isPremium ? "text-gold" : "text-neutral-300"}`}>
              {getPlanDisplayName()}
            </span>
          </div>
        </div>
      </div>

      {/* NAVEGAÇÃO */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        {menuItems.map((section, idx) => (
          <div key={idx}>
            <h3 className="text-xs uppercase text-neutral-500 font-semibold mb-2 px-2">
              {section.section}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const isLocked = item.premium && !isPremium;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center justify-between gap-3 px-3 py-2 rounded-lg transition
                      ${isActive 
                        ? "bg-neutral-800 text-white" 
                        : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
                      }
                      ${isLocked ? "opacity-50" : ""}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    {isLocked && (
                      <span className="text-xs">🔒</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* FOOTER DA SIDEBAR */}
      <div className="p-4 border-t border-neutral-800 space-y-2">
        {/* UPGRADE (SE FREE) */}
        {!isPremium && (
          <Link
            href="/planos-app"
            className="block w-full text-center bg-gold hover:bg-gold-light text-black py-2 rounded-lg font-semibold text-sm transition"
          >
            ⚡ Fazer Upgrade
          </Link>
        )}

        {/* PERFIL */}
        <button
          onClick={() => router.push("/perfil")}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-400 hover:bg-neutral-900 hover:text-white transition"
        >
          <span className="text-lg">👤</span>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium truncate">
              {user?.email || "Usuário"}
            </p>
            <p className="text-xs text-neutral-500">Ver perfil</p>
          </div>
        </button>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-400 hover:bg-red-900/20 hover:text-red-400 transition"
        >
          <span className="text-lg">🚪</span>
          <span className="text-sm font-medium">Sair</span>
        </button>

        {/* VOLTAR PARA O SITE */}
        <Link
          href="/"
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-400 hover:bg-neutral-900 hover:text-white transition text-sm"
        >
          <span className="text-lg">🏠</span>
          <span>Voltar para o site</span>
        </Link>
      </div>
    </aside>
  );
}