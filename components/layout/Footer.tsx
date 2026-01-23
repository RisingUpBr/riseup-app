// components/layout/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-black">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-neutral-400">
        <div>
          <h3 className="text-white font-semibold mb-2">
            Rise<span className="text-yellow-400">Up</span>
          </h3>
          <p>
            Eleve sua mente. Execute seu propósito.
          </p>
        </div>

        <div>
          <h4 className="text-white font-medium mb-2">Empresa</h4>
          <ul className="space-y-1">
            <li><Link href="/sobre">Sobre</Link></li>
            <li><Link href="/conecte-se">Conecte-se</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-2">Produto</h4>
          <ul className="space-y-1">
            <li><Link href="/app">App</Link></li>
            <li><Link href="/planos">Planos</Link></li>
            <li><Link href="/recursos">Recursos</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-2">Legal</h4>
          <ul className="space-y-1">
            <li><Link href="/legal/termos">Termos</Link></li>
            <li><Link href="/legal/privacidade">Privacidade</Link></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-neutral-600 py-6 border-t border-neutral-800">
        © {new Date().getFullYear()} Rise Up. Todos os direitos reservados.
      </div>
    </footer>
  );
}
