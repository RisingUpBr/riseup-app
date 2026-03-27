import Link from "next/link";

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-24 pb-0 px-4 sm:px-6 lg:px-16"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 65% 50%, rgba(212,175,55,0.10) 0%, rgba(212,175,55,0.04) 50%, transparent 80%), #000000",
        }}
      >
        <div className="max-w-[1600px] mx-auto">
          {/* items-stretch faz ambas as colunas terem a mesma altura */}
          <div className="grid lg:grid-cols-[1fr_455px] gap-16 items-stretch">

            {/* Esquerda: textos */}
            <div className="relative z-10 flex flex-col justify-center">
              <div className="inline-block mb-6 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full self-start">
                <span className="text-[#D4AF37] text-sm font-medium">Sobre o Rise Up</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Rise Up
              </h1>

              <div className="max-w-[600px]">
                <p className="text-lg sm:text-xl text-neutral-300 mb-5 leading-relaxed">
                  Um ecossistema inteligente de desenvolvimento pessoal que integra
                  mentalidade, organização e tecnologia.
                </p>

                <p className="text-base text-neutral-400 leading-relaxed">
                  Não acreditamos em fórmulas mágicas ou promessas vazias. Acreditamos
                  em sistemas, clareza mental e consistência.
                </p>
              </div>
            </div>

            {/* Direita: card de captura — h-full para alinhar altura com coluna esquerda */}
            <div className="bg-white/[0.04] border border-neutral-800 rounded-2xl p-8 flex flex-col h-full">
              <div className="w-11 h-11 bg-[#D4AF37]/15 border border-[#D4AF37]/25 rounded-full flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              <h4 className="text-2xl font-bold mb-2">Receba conteúdo que transforma</h4>
              <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                Conteúdo gratuito. Todo dia, durante ao menos 12 dias.
              </p>

              <form action="#" className="space-y-3">
                <input
                  type="text"
                  placeholder="Seu primeiro nome"
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]/50 transition-colors text-sm"
                />
                <input
                  type="email"
                  placeholder="Seu melhor email"
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]/50 transition-colors text-sm"
                />
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-[#C5A028] transition-all duration-300 hover:scale-[1.01] text-sm"
                >
                  Quero receber
                </button>
              </form>

              <p className="text-center text-neutral-600 text-xs mt-auto pt-5">
                Sem spam. Só o que realmente importa.
              </p>
            </div>

          </div>

          {/* Linha separadora — espaço simétrico: mt-[7.5rem] acima, pt-[7.5rem] na seção seguinte */}
          <div className="mt-[9.1rem] border-t border-white/[0.08]" />
        </div>
      </section>

      {/* ── ESSÊNCIA + MISSÃO / VISÃO / VALORES ───────────────────────── */}
      <section className="pt-[9.1rem] pb-24 px-4 sm:px-6 lg:px-16 bg-black">
        <div className="max-w-[1600px] mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-wider text-[#D4AF37] mb-4 font-semibold">
              Essência
            </h2>
            <h3 className="text-4xl sm:text-5xl font-bold">
              Não é apenas conteúdo.
              <br />
              <span className="text-neutral-400">É um sistema para viver melhor.</span>
            </h3>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">

            {/* Missão */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 rounded-2xl border border-neutral-800 hover:border-[#D4AF37]/30 transition-all duration-300 flex flex-col">
              <div className="mb-8 h-24 flex items-center justify-center">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <defs>
                    <filter id="glow-missao">
                      <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <g filter="url(#glow-missao)" opacity="0.9">
                    <path d="M40 64 L40 22" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M40 22 L28 36" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M40 22 L52 36" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M22 20 L22 26" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
                    <path d="M19 23 L25 23" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
                    <path d="M58 34 L58 38" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                    <path d="M56 36 L60 36" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                    <circle cx="40" cy="18" r="2.5" stroke="white" strokeWidth="1.2" opacity="0.8" />
                  </g>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Nossa Missão</h3>
              <p className="text-neutral-300 leading-relaxed">
                Ajudar pessoas a organizarem suas vidas, pensamentos e rotinas para
                viverem com mais eficiência, consciência e equilíbrio.
              </p>
            </div>

            {/* Visão */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 rounded-2xl border border-neutral-800 hover:border-[#D4AF37]/30 transition-all duration-300 flex flex-col">
              <div className="mb-8 h-24 flex items-center justify-center">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <defs>
                    <filter id="glow-visao">
                      <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <g filter="url(#glow-visao)" opacity="0.9">
                    <path d="M14 40 C22 26 58 26 66 40 C58 54 22 54 14 40Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="40" cy="40" r="9" stroke="white" strokeWidth="1.6" />
                    <circle cx="40" cy="40" r="3.5" stroke="white" strokeWidth="1.2" opacity="0.7" />
                    <path d="M20 24 L20 28" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                    <path d="M18 26 L22 26" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                    <path d="M60 22 L60 27" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
                    <path d="M57.5 24.5 L62.5 24.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
                  </g>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Nossa Visão</h3>
              <p className="text-neutral-300 leading-relaxed mb-4">
                Criar um ecossistema completo que una conteúdo, método e tecnologia.
              </p>
              <p className="text-[#D4AF37] font-semibold">
                Ser o "Canva da organização pessoal e mentalidade"
              </p>
            </div>

            {/* Valores */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 rounded-2xl border border-neutral-800 hover:border-[#D4AF37]/30 transition-all duration-300 flex flex-col">
              <div className="mb-8 h-24 flex items-center justify-center">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <defs>
                    <filter id="glow-valores">
                      <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <g filter="url(#glow-valores)" opacity="0.9">
                    <path d="M40 20 L42.5 32 L55 32 L45 40 L48 52 L40 44 L32 52 L35 40 L25 32 L37.5 32 Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
                    <path d="M18 30 L19 35 L24 35 L20 38 L21.5 43 L18 40 L14.5 43 L16 38 L12 35 L17 35 Z" stroke="white" strokeWidth="1" strokeLinejoin="round" opacity="0.5" />
                    <path d="M60 28 L61 33 L66 33 L62 36 L63.5 41 L60 38 L56.5 41 L58 36 L54 33 L59 33 Z" stroke="white" strokeWidth="1" strokeLinejoin="round" opacity="0.5" />
                  </g>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Nossos Valores</h3>
              <ul className="space-y-3 text-neutral-300">
                {["Honestidade e transparência", "Autenticidade e empatia", "Evolução contínua", "Eficiência e performance real"].map((v) => (
                  <li key={v} className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1">•</span>
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── POR QUE EXISTE — estilo Manychat ──────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-16 bg-neutral-950">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-wider text-[#D4AF37] mb-4 font-semibold">
              Origem
            </h2>
            <h3 className="text-4xl sm:text-5xl font-bold mb-6">
              Por que a Rise Up existe?
            </h3>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              Para transformar informação em sistema, intenção em hábito e esforço em resultado real.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Card esquerdo — Sem Rise Up */}
            <div
              className="rounded-2xl p-10 flex flex-col min-h-[540px]"
              style={{ background: "linear-gradient(145deg, #2d0a0a 0%, #1a0303 55%, #0f0202 100%)" }}
            >
              {/* Cabeçalho com min-h igual ao do card direito para alinhar listas */}
              <div className="min-h-[13rem] flex flex-col">
                <p className="text-xs text-red-400/60 uppercase tracking-widest font-semibold mb-4 text-center">
                  Sem Rise Up:
                </p>
                <h4 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-0 text-center">
                  Sem sistema,
                  <br />
                  sem direção.
                </h4>
              </div>
              <div className="divide-y divide-white/10 pt-10">
                {[
                  "Informação acumulando, sem virar ação",
                  "Metas que existem só na cabeça",
                  "Rotina que recomeça toda segunda",
                  "Sensação de estar sempre atrasado",
                ].map((item) => (
                  <div key={item} className="flex items-center justify-between py-4">
                    <span className="text-xs uppercase tracking-wide text-neutral-300">{item}</span>
                    <div className="w-7 h-7 rounded-md bg-black border border-white/20 flex items-center justify-center flex-shrink-0 ml-4">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-8">
                <Link
                  href="/app"
                  className="w-full h-14 bg-black/50 border border-white/10 text-white font-bold rounded-2xl hover:bg-black/70 hover:scale-[1.03] transition-all duration-300 uppercase tracking-wider text-sm flex items-center justify-center"
                  style={{ lineHeight: 1, padding: 0 }}
                >
                  Conhecer a solução
                </Link>
              </div>
            </div>

            {/* Card direito — Com Rise Up */}
            <div
              className="rounded-2xl p-10 flex flex-col min-h-[540px]"
              style={{ background: "linear-gradient(145deg, #D4AF37 0%, #C5A028 45%, #A8891F 100%)" }}
            >
              {/* Cabeçalho com mesma min-h do card esquerdo */}
              <div className="min-h-[13rem] flex flex-col">
                <p className="text-xs text-black/60 uppercase tracking-widest font-semibold mb-4 text-center">
                  Com Rise Up:
                </p>
                <h4 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-0 text-center text-black">
                  Clareza.
                  <br />
                  Método.
                  <br />
                  Resultado.
                </h4>
              </div>
              <div className="divide-y divide-black/15 pt-8">
                {[
                  "Clareza sobre o que fazer e por quê",
                  "Metas conectadas à rotina real",
                  "Sistema que funciona mesmo nos dias ruins",
                  "Progresso visível, consistente e mensurável",
                ].map((item) => (
                  <div key={item} className="flex items-center justify-between py-4">
                    <span className="text-xs uppercase tracking-wide text-black/80">{item}</span>
                    <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center flex-shrink-0 ml-4">
                      <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-8">
                <Link
                  href="/planos"
                  className="w-full h-14 bg-white text-black font-bold rounded-2xl hover:bg-neutral-100 hover:scale-[1.03] transition-all duration-300 uppercase tracking-wider text-sm flex items-center justify-center"
                  style={{ lineHeight: 1, padding: 0 }}
                >
                  Começar agora
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── ECOSSISTEMA — estilo Apple cards ──────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-16 bg-black">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-wider text-[#D4AF37] mb-4 font-semibold">
              Como funciona
            </h2>
            <h3 className="text-4xl sm:text-5xl font-bold">
              Conheça o ecossistema Rise Up
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Card 1 — Infoprodutos → /planos */}
            <Link
              href="/planos"
              className="relative rounded-3xl overflow-hidden min-h-[520px] flex flex-col justify-start p-7 transition-transform duration-300 hover:scale-[1.03]"
              style={{ background: "linear-gradient(160deg, #1e1500 0%, #2a1c00 35%, #0d0900 100%)" }}
            >
              {/* Glow dourado */}
              <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)" }} />

              {/* Ilustração: curva de progresso — duas mini charts */}
              <svg
                className="absolute bottom-0 left-0 right-0 w-full opacity-[0.45] pointer-events-none"
                viewBox="0 0 200 110"
                preserveAspectRatio="xMidYMax meet"
              >
                {/* Eixos esquerdo */}
                <line x1="10" y1="8" x2="10" y2="82" stroke="white" strokeWidth="0.6" />
                <line x1="10" y1="82" x2="90" y2="82" stroke="white" strokeWidth="0.6" />
                {/* Curva descendente */}
                <path d="M12 18 C22 20 32 30 42 44 C52 58 62 70 88 79" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" />
                <text x="50" y="96" fill="white" fontSize="6.5" textAnchor="middle">Sem método</text>
                {/* Eixos direito */}
                <line x1="112" y1="8" x2="112" y2="82" stroke="#D4AF37" strokeWidth="0.6" />
                <line x1="112" y1="82" x2="192" y2="82" stroke="#D4AF37" strokeWidth="0.6" />
                {/* Curva ascendente em degraus */}
                <path d="M114 78 L120 78 L120 68 L130 68 L130 56 L140 56 L140 44 L150 44 L150 32 L160 32 L160 22 L170 22 L170 14" stroke="#D4AF37" strokeWidth="1.4" fill="none" strokeLinecap="round" />
                <text x="152" y="96" fill="#D4AF37" fontSize="6.5" textAnchor="middle">Com método</text>
              </svg>

              <div className="relative z-10">
                <span className="text-xs text-neutral-500 uppercase tracking-widest font-medium">Infoprodutos</span>
                <h4 className="text-3xl font-bold mt-3 leading-snug text-white">Aprenda.<br />Aplique.<br />Evolua.</h4>
              </div>
            </Link>

            {/* Card 2 — Método Rise Up → / */}
            <Link
              href="/"
              className="relative rounded-3xl overflow-hidden min-h-[520px] flex flex-col justify-start p-7 transition-transform duration-300 hover:scale-[1.03]"
              style={{ background: "linear-gradient(160deg, #111111 0%, #1c1c1c 35%, #050505 100%)" }}
            >
              {/* Grid pattern decorativo */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none" viewBox="0 0 200 520" preserveAspectRatio="xMidYMid slice">
                {[0, 60, 120, 180, 240, 300, 360, 420, 480].map((y) => (
                  <line key={`h${y}`} x1="0" y1={y} x2="200" y2={y} stroke="#666" strokeWidth="0.4" />
                ))}
                {[0, 50, 100, 150, 200].map((x) => (
                  <line key={`v${x}`} x1={x} y1="0" x2={x} y2="520" stroke="#666" strokeWidth="0.4" />
                ))}
              </svg>

              {/* Ilustração: time blocking */}
              <svg
                className="absolute bottom-0 left-0 right-0 w-full opacity-[0.45] pointer-events-none"
                viewBox="0 0 200 105"
                preserveAspectRatio="xMidYMax meet"
              >
                <line x1="38" y1="8" x2="38" y2="98" stroke="white" strokeWidth="0.6" />
                <line x1="38" y1="20" x2="195" y2="20" stroke="white" strokeWidth="0.3" opacity="0.5" />
                <line x1="38" y1="45" x2="195" y2="45" stroke="white" strokeWidth="0.3" opacity="0.5" />
                <line x1="38" y1="70" x2="195" y2="70" stroke="white" strokeWidth="0.3" opacity="0.5" />
                <line x1="38" y1="95" x2="195" y2="95" stroke="white" strokeWidth="0.3" opacity="0.5" />
                <text x="5" y="24" fill="white" fontSize="7">6h</text>
                <text x="5" y="49" fill="white" fontSize="7">9h</text>
                <text x="5" y="74" fill="white" fontSize="7">12h</text>
                <text x="5" y="99" fill="white" fontSize="7">18h</text>
                <rect x="42" y="20" width="148" height="25" rx="4" fill="#D4AF37" opacity="0.8" />
                <text x="116" y="36" fill="#000" fontSize="8" textAnchor="middle" fontWeight="bold">Foco</text>
                <rect x="42" y="45" width="148" height="25" rx="4" fill="white" opacity="0.15" />
                <text x="116" y="61" fill="white" fontSize="7" textAnchor="middle">Revisão</text>
                <rect x="42" y="70" width="148" height="25" rx="4" fill="#C5A028" opacity="0.65" />
                <text x="116" y="86" fill="#000" fontSize="8" textAnchor="middle">Execução</text>
              </svg>

              <div className="relative z-10">
                <span className="text-xs text-neutral-500 uppercase tracking-widest font-medium">Método Rise Up</span>
                <h4 className="text-3xl font-bold mt-3 leading-snug text-white">Estrutura<br />que<br />sustenta.</h4>
              </div>
            </Link>

            {/* Card 3 — App Rise Up → /app */}
            <Link
              href="/app"
              className="relative rounded-3xl overflow-hidden min-h-[520px] flex flex-col justify-start p-7 transition-transform duration-300 hover:scale-[1.03]"
              style={{ background: "linear-gradient(160deg, #0a0700 0%, #050505 50%, #000000 100%)" }}
            >
              {/* Contorno de celular */}
              <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] w-40 h-40 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="0.6">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
              {/* Bottom glow */}
              <div className="absolute bottom-0 left-0 right-0 h-48 opacity-15 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.7) 0%, transparent 65%)" }} />

              {/* Ilustração: habit tracker / interface do app */}
              <svg
                className="absolute bottom-0 left-0 right-0 w-full opacity-[0.45] pointer-events-none"
                viewBox="0 0 200 115"
                preserveAspectRatio="xMidYMax meet"
              >
                <rect x="18" y="5" width="164" height="106" rx="7" fill="none" stroke="white" strokeWidth="0.8" />
                <rect x="18" y="5" width="164" height="22" rx="7" fill="white" opacity="0.07" />
                <text x="100" y="20" fill="white" fontSize="7.5" textAnchor="middle" fontWeight="bold">Check-in do dia</text>
                <line x1="18" y1="27" x2="182" y2="27" stroke="white" strokeWidth="0.4" opacity="0.4" />
                {/* Item 1: marcado */}
                <rect x="28" y="35" width="10" height="10" rx="2" fill="#D4AF37" />
                <path d="M29.5 40 L32 43 L37 36.5" stroke="#000" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                <text x="44" y="45" fill="#D4AF37" fontSize="7.5">Leitura</text>
                {/* Item 2: vazio */}
                <rect x="28" y="52" width="10" height="10" rx="2" fill="none" stroke="white" strokeWidth="0.7" opacity="0.5" />
                <text x="44" y="62" fill="white" fontSize="7.5" opacity="0.5">Metas do dia</text>
                {/* Item 3: marcado */}
                <rect x="28" y="69" width="10" height="10" rx="2" fill="#D4AF37" />
                <path d="M29.5 74 L32 77 L37 70.5" stroke="#000" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                <text x="44" y="79" fill="#D4AF37" fontSize="7.5">Check-in</text>
                {/* Item 4: vazio */}
                <rect x="28" y="86" width="10" height="10" rx="2" fill="none" stroke="white" strokeWidth="0.7" opacity="0.5" />
                <text x="44" y="96" fill="white" fontSize="7.5" opacity="0.5">Foco profundo</text>
              </svg>

              <div className="relative z-10">
                <span className="text-xs text-neutral-500 uppercase tracking-widest font-medium">App Rise Up</span>
                <h4 className="text-3xl font-bold mt-3 leading-snug text-white">Organize<br />o que<br />importa.</h4>
              </div>
            </Link>

            {/* Card 4 — Ecossistema → /conecte-se */}
            <Link
              href="/conecte-se"
              className="relative rounded-3xl overflow-hidden min-h-[520px] flex flex-col justify-start p-7 transition-transform duration-300 hover:scale-[1.03]"
              style={{ background: "linear-gradient(160deg, #130b02 0%, #0e0702 35%, #070400 100%)" }}
            >
              {/* Ilustração: ciclo circular com 4 nós */}
              <svg
                className="absolute bottom-0 left-0 right-0 w-full opacity-[0.45] pointer-events-none"
                viewBox="0 0 200 130"
                preserveAspectRatio="xMidYMax meet"
              >
                {/* Círculo guia externo */}
                <circle cx="100" cy="65" r="52" fill="none" stroke="white" strokeWidth="0.4" />
                {/* Nós */}
                <circle cx="100" cy="13" r="9" fill="none" stroke="#D4AF37" strokeWidth="1.1" />
                <circle cx="152" cy="65" r="9" fill="none" stroke="#D4AF37" strokeWidth="1.1" />
                <circle cx="100" cy="117" r="9" fill="none" stroke="#D4AF37" strokeWidth="1.1" />
                <circle cx="48" cy="65" r="9" fill="none" stroke="#D4AF37" strokeWidth="1.1" />
                {/* Labels */}
                <text x="100" y="17" fill="#D4AF37" fontSize="5.5" textAnchor="middle">Conteúdo</text>
                <text x="152" y="69" fill="#D4AF37" fontSize="5.5" textAnchor="middle">Método</text>
                <text x="100" y="121" fill="#D4AF37" fontSize="5.5" textAnchor="middle">Tecnolog.</text>
                <text x="48" y="69" fill="#D4AF37" fontSize="5.5" textAnchor="middle">Comunid.</text>
                {/* Arcos de conexão (sentido horário) */}
                <path d="M107 19 Q138 22 146 57" stroke="#D4AF37" strokeWidth="0.85" fill="none" strokeLinecap="round" />
                <path d="M148 73 Q150 100 108 112" stroke="#D4AF37" strokeWidth="0.85" fill="none" strokeLinecap="round" />
                <path d="M92 112 Q50 104 54 73" stroke="#D4AF37" strokeWidth="0.85" fill="none" strokeLinecap="round" />
                <path d="M54 57 Q60 24 93 19" stroke="#D4AF37" strokeWidth="0.85" fill="none" strokeLinecap="round" />
                {/* Centro */}
                <circle cx="100" cy="65" r="3" fill="#D4AF37" opacity="0.7" />
              </svg>

              <div className="relative z-10">
                <span className="text-xs text-neutral-500 uppercase tracking-widest font-medium">Ecossistema</span>
                <h4 className="text-3xl font-bold mt-3 leading-snug text-white">Você não<br />cresce<br />sozinho.</h4>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* ── POR QUE ESCOLHER — grid assimétrico estilo Bolt.new ────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-16 bg-neutral-950">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-wider text-[#D4AF37] mb-4 font-semibold">
              Diferenciais
            </h2>
            <h3 className="text-4xl sm:text-5xl font-bold mb-4">
              Por que escolher a Rise Up?
            </h3>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Porque evoluir sem sistema é só força de vontade. E força de vontade acaba.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">

            {/* Card 1 — 1/3 */}
            <div className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-2xl p-7 hover:border-[#D4AF37]/30 transition-all duration-300 flex flex-col">
              <h4 className="text-2xl font-bold mb-3">Tudo conectado</h4>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                Conteúdo, método e tecnologia no mesmo ecossistema. Não são peças
                soltas, são partes de um sistema.
              </p>
              <div className="mt-auto">
                <svg viewBox="0 0 180 64" className="w-full opacity-55">
                  <circle cx="30" cy="28" r="9" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
                  <circle cx="90" cy="28" r="9" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
                  <circle cx="150" cy="28" r="9" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
                  <line x1="39" y1="28" x2="81" y2="28" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 2" />
                  <line x1="99" y1="28" x2="141" y2="28" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 2" />
                  <text x="30" y="52" textAnchor="middle" fill="#666" fontSize="8">Conteúdo</text>
                  <text x="90" y="52" textAnchor="middle" fill="#666" fontSize="8">Método</text>
                  <text x="150" y="52" textAnchor="middle" fill="#666" fontSize="8">App</text>
                </svg>
              </div>
            </div>

            {/* Card 2 — 2/3 */}
            <div className="sm:col-span-2 bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-2xl p-7 hover:border-[#D4AF37]/30 transition-all duration-300">
              <h4 className="text-2xl font-bold mb-3">Progresso que você vê</h4>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                Metas, hábitos e check-ins que mostram onde você estava e onde está
                agora.
              </p>
              <div className="space-y-4">
                {[
                  { label: "Clareza mental", pct: 85 },
                  { label: "Consistência", pct: 72 },
                  { label: "Execução", pct: 90 },
                ].map((bar) => (
                  <div key={bar.label}>
                    <div className="flex justify-between text-xs text-neutral-500 mb-1.5">
                      <span>{bar.label}</span>
                      <span className="text-[#D4AF37]">{bar.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#D4AF37] to-[#C5A028] rounded-full"
                        style={{ width: `${bar.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3 — 2/3 */}
            <div className="sm:col-span-2 bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-2xl p-7 hover:border-[#D4AF37]/30 transition-all duration-300">
              <h4 className="text-2xl font-bold mb-3">Direto ao ponto</h4>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                Sem promessas vazias, sem fórmulas mágicas. Só estrutura, clareza
                e consistência, aplicadas no seu ritmo.
              </p>
              <blockquote className="border-l-2 border-[#D4AF37] pl-5">
                <p className="text-2xl font-bold text-[#D4AF37] leading-snug">
                  "Clareza é o maior ativo de quem quer evoluir."
                </p>
              </blockquote>
            </div>

            {/* Card 4 — 1/3 */}
            <div className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-2xl p-7 hover:border-[#D4AF37]/30 transition-all duration-300 flex flex-col justify-between">
              <div>
                <h4 className="text-2xl font-bold mb-3">Comece sem gastar nada</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Recursos gratuitos, app com plano free e conteúdo que já entrega
                  valor antes de qualquer compra.
                </p>
              </div>
              {/* Dois botões iguais lado a lado */}
              <div className="mt-6 flex gap-3">
                <Link
                  href="/auth"
                  className="flex-1 py-3 bg-[#D4AF37] text-black font-bold rounded-xl text-sm text-center tracking-widest hover:bg-[#C5A028] transition-colors"
                >
                  FREE
                </Link>
                <Link
                  href="/recursos"
                  className="flex-1 py-3 bg-transparent border border-neutral-700 text-white font-bold rounded-xl text-sm text-center hover:border-neutral-500 transition-colors"
                >
                  Começar agora
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA FINAL — fundo escuro + layout dividido ─────────────────── */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-16"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(212,175,55,0.10) 0%, rgba(212,175,55,0.04) 50%, transparent 80%), #000000",
        }}
      >
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-12">

            {/* Esquerda — título + pergunta */}
            <div className="sm:max-w-xl">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-4">
                Evoluir é uma escolha diária.
              </h2>
              <p className="text-xl text-neutral-400">
                Você está pronto para o próximo passo?
              </p>
            </div>

            {/* Direita — dois botões lado a lado */}
            <div className="flex flex-row gap-4 flex-shrink-0">
              <Link
                href="/planos"
                className="px-8 py-4 bg-transparent border border-neutral-600 text-white rounded-xl font-bold hover:border-neutral-400 transition-all duration-300 hover:scale-105 text-center whitespace-nowrap"
              >
                Explorar produtos
              </Link>
              <Link
                href="/app"
                className="px-8 py-4 bg-[#D4AF37] text-black rounded-xl font-bold hover:bg-[#C5A028] transition-all duration-300 hover:scale-105 text-center whitespace-nowrap"
              >
                Conhecer o App
              </Link>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
