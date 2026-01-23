// components/layout/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-wide">
          Rise<span className="text-yellow-400">Up</span>
        </Link>

        <nav className="hidden md:flex gap-6 text-sm font-medium text-neutral-300">
          <Link href="/">Home</Link>
          <Link href="/planos">Planos</Link>
          <Link href="/produtos">Produtos</Link>

          {/* 🔥 AQUI ESTAVA O PROBLEMA */}
          <Link href="/dashboard">App</Link>

          <Link href="/recursos">Recursos</Link>
          <Link href="/conecte-se">Conecte-se</Link>
          <Link href="/sobre">Sobre</Link>
        </nav>
      </div>
    </header>
  );
}
