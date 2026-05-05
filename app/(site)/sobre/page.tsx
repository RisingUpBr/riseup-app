import Link from "next/link";

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* ── 1. HERO ───────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center text-center py-[100px] px-6"
        style={{ background: "#000000" }}
      >
        {/* Halo central dourado */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0) 70%)",
          }}
        />
        {/* Cone dourado na base */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 100%, transparent 160deg, rgba(212,175,55,0.1) 180deg, transparent 200deg)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-6 max-w-[640px] mx-auto">
          <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-[#D4AF37]">
            Sobre nós
          </span>

          <h1 className="text-[72px] font-black tracking-tighter text-[#F5F5F5] leading-none">
            RISE UP
          </h1>

          <h2 className="text-[28px] font-bold text-[#D0D0D0] max-w-[560px] mx-auto leading-snug">
            Um ecossistema inteligente desenhado para quem não aceita o comum.
          </h2>

          <p className="text-[18px] text-[#888] max-w-[560px] mx-auto leading-relaxed">
            A evolução não é um evento isolado, mas o subproduto de consistência
            inabalável e ferramentas certas. Nós construímos o caminho para sua
            maestria pessoal.
          </p>

          <Link
            href="/auth"
            className="mt-2 bg-[#D4AF37] text-black font-bold px-10 py-4 rounded-lg hover:scale-105 transition-all duration-300 hover:bg-[#C5A028]"
          >
            Começar Jornada
          </Link>
        </div>
      </section>

      {/* ── 2. CAPTURA DE LEADS ───────────────────────────────────────── */}
      <section className="bg-[#060606] py-6 px-[80px]">
        <div className="border border-white/10 rounded-2xl py-8 px-10 flex flex-row items-center gap-8">
          <p className="text-[16px] font-bold text-white leading-snug max-w-[220px]">
            Receba conteúdo que transforma
          </p>
          <form action="#" className="flex flex-row gap-3 flex-1">
            <input
              type="text"
              placeholder="Seu primeiro nome"
              className="flex-1 bg-[#141414] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white text-sm placeholder:text-[#444] focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
            />
            <input
              type="email"
              placeholder="Seu melhor email"
              className="flex-[1.5] bg-[#141414] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white text-sm placeholder:text-[#444] focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
            />
            <button
              type="submit"
              className="bg-[#D4AF37] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#C5A028] transition-colors whitespace-nowrap text-sm"
            >
              Quero receber
            </button>
          </form>
        </div>
      </section>

      {/* ── 3. ESSÊNCIA — MVV ─────────────────────────────────────────── */}
      <section className="py-[100px] px-4 sm:px-6 lg:px-16 bg-[#000]">
        <div className="max-w-[1200px] mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] mb-5 font-semibold">
              Essência
            </h2>
            <h3 className="text-4xl sm:text-5xl font-bold">
              <span className="text-[#F5F5F5]">Não é apenas conteúdo.</span>
              <br />
              <span className="text-[#D4AF37]">É um sistema para viver melhor.</span>
            </h3>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">

            {/* Missão */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 rounded-2xl border border-neutral-800 hover:border-[#D4AF37]/30 transition-all duration-300 flex flex-col">
              <div className="mb-8 h-24 flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#D4AF37" strokeWidth="1.5">
                  <circle cx="20" cy="20" r="16"/>
                  <circle cx="20" cy="20" r="10"/>
                  <circle cx="20" cy="20" r="4" fill="#D4AF37"/>
                  <path d="M28 12 L22 18" strokeLinecap="round"/>
                  <path d="M25 9 L28 12 L25 15" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M28 12 L34 6" strokeLinecap="round" strokeDasharray="2 2"/>
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
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="#D4AF37" strokeWidth="1.5">
                  <circle cx="12" cy="28" r="9"/>
                  <circle cx="32" cy="28" r="9"/>
                  <path d="M21 28 L23 28" strokeLinecap="round"/>
                  <path d="M3 22 L12 18 L22 22" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 22 L32 18 L41 22" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 22 L22 14" strokeLinecap="round"/>
                  <circle cx="22" cy="11" r="3"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Nossa Visão</h3>
              <p className="text-neutral-300 leading-relaxed">
                Ser o ecossistema global de referência para o desenvolvimento humano
                integrado, unindo tecnologia e sabedoria prática.
              </p>
            </div>

            {/* Valores */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 rounded-2xl border border-neutral-800 hover:border-[#D4AF37]/30 transition-all duration-300 flex flex-col">
              <div className="mb-8 h-24 flex items-center justify-center">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="#D4AF37" strokeWidth="1.5">
                  <path d="M8 30 C6 26 6 22 8 18 C10 14 14 13 17 15 L22 11 L27 15 C30 13 34 14 36 18 C38 22 38 26 36 30 L22 40 Z" strokeLinejoin="round"/>
                  <path d="M22 11 L22 6" strokeLinecap="round"/>
                  <path d="M18 8 L22 4 L26 8" strokeLinecap="round" strokeLinejoin="round"/>
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

      {/* ── 4. ORIGEM — comparação ────────────────────────────────────── */}
      <section className="py-[100px] px-4 sm:px-6 lg:px-16" style={{ background: "#060606" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] mb-5 font-semibold">
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
                >
                  Começar agora
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 5. ECOSSISTEMA ────────────────────────────────────────────── */}
      <section className="py-[100px] px-4 sm:px-6 lg:px-16 bg-[#000]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] mb-5 font-semibold">
              Como funciona
            </h2>
            <h3 className="text-4xl sm:text-5xl font-bold text-[#F5F5F5]">
              Conheça o ecossistema Rise Up
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Card 1 — Infoprodutos */}
            <Link
              href="/planos"
              className="relative rounded-3xl overflow-hidden min-h-[520px] flex flex-col justify-start p-7 transition-transform duration-300 hover:scale-[1.03]"
              style={{ background: "linear-gradient(160deg, #1e1500 0%, #2a1c00 35%, #0d0900 100%)" }}
            >
              <svg
                className="absolute bottom-0 left-0 right-0 w-full pointer-events-none"
                viewBox="0 0 200 110"
                preserveAspectRatio="xMidYMax meet"
              >
                <line x1="10" y1="8" x2="10" y2="82" stroke="white" strokeWidth="0.6" />
                <line x1="10" y1="82" x2="90" y2="82" stroke="white" strokeWidth="0.6" />
                <path d="M12 18 C22 20 32 30 42 44 C52 58 62 70 88 79" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" />
                <text x="50" y="96" fill="white" fontSize="6.5" textAnchor="middle">Sem método</text>
                <line x1="112" y1="8" x2="112" y2="82" stroke="#D4AF37" strokeWidth="0.6" />
                <line x1="112" y1="82" x2="192" y2="82" stroke="#D4AF37" strokeWidth="0.6" />
                <path d="M114 78 L120 78 L120 68 L130 68 L130 56 L140 56 L140 44 L150 44 L150 32 L160 32 L160 22 L170 22 L170 14" stroke="#D4AF37" strokeWidth="1.4" fill="none" strokeLinecap="round" />
                <text x="152" y="96" fill="#D4AF37" fontSize="6.5" textAnchor="middle">Com método</text>
              </svg>
              <div className="relative z-10">
                <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider">Infoprodutos</span>
                <h4 className="text-[#F5F5F5] font-bold text-xl mt-3 leading-snug">Aprenda.<br />Aplique.<br />Evolua.</h4>
              </div>
            </Link>

            {/* Card 2 — Método Rise Up */}
            <Link
              href="/"
              className="relative rounded-3xl overflow-hidden min-h-[520px] flex flex-col justify-start p-7 transition-transform duration-300 hover:scale-[1.03]"
              style={{ background: "linear-gradient(160deg, #111111 0%, #1c1c1c 35%, #050505 100%)" }}
            >
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 520" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.07 }}>
                {[0, 60, 120, 180, 240, 300, 360, 420, 480].map((y) => (
                  <line key={`h${y}`} x1="0" y1={y} x2="200" y2={y} stroke="#666" strokeWidth="0.4" />
                ))}
                {[0, 50, 100, 150, 200].map((x) => (
                  <line key={`v${x}`} x1={x} y1="0" x2={x} y2="520" stroke="#666" strokeWidth="0.4" />
                ))}
              </svg>
              <svg
                className="absolute bottom-0 left-0 right-0 w-full pointer-events-none"
                viewBox="0 0 200 105"
                preserveAspectRatio="xMidYMax meet"
              >
                <line x1="38" y1="8" x2="38" y2="98" stroke="white" strokeWidth="0.6" />
                <line x1="38" y1="20" x2="195" y2="20" stroke="white" strokeWidth="0.3" />
                <line x1="38" y1="45" x2="195" y2="45" stroke="white" strokeWidth="0.3" />
                <line x1="38" y1="70" x2="195" y2="70" stroke="white" strokeWidth="0.3" />
                <line x1="38" y1="95" x2="195" y2="95" stroke="white" strokeWidth="0.3" />
                <text x="5" y="24" fill="white" fontSize="7">6h</text>
                <text x="5" y="49" fill="white" fontSize="7">9h</text>
                <text x="5" y="74" fill="white" fontSize="7">12h</text>
                <text x="5" y="99" fill="white" fontSize="7">18h</text>
                <rect x="42" y="20" width="148" height="25" rx="4" fill="#D4AF37" opacity="0.85" />
                <text x="116" y="36" fill="#000" fontSize="8" textAnchor="middle" fontWeight="bold">Foco</text>
                <rect x="42" y="45" width="148" height="25" rx="4" fill="white" opacity="0.18" />
                <text x="116" y="61" fill="white" fontSize="7" textAnchor="middle">Revisão</text>
                <rect x="42" y="70" width="148" height="25" rx="4" fill="#C5A028" opacity="0.75" />
                <text x="116" y="86" fill="#000" fontSize="8" textAnchor="middle">Execução</text>
              </svg>
              <div className="relative z-10">
                <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider">Método Rise Up</span>
                <h4 className="text-[#F5F5F5] font-bold text-xl mt-3 leading-snug">Estrutura<br />que<br />sustenta.</h4>
              </div>
            </Link>

            {/* Card 3 — App Rise Up */}
            <Link
              href="/app"
              className="relative rounded-3xl overflow-hidden min-h-[520px] flex flex-col justify-start p-7 transition-transform duration-300 hover:scale-[1.03]"
              style={{ background: "linear-gradient(160deg, #0a0700 0%, #050505 50%, #000000 100%)" }}
            >
              <div
                className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.25) 0%, transparent 65%)" }}
              />
              <svg
                className="absolute bottom-0 left-0 right-0 w-full pointer-events-none"
                viewBox="0 0 200 115"
                preserveAspectRatio="xMidYMax meet"
              >
                <rect x="18" y="5" width="164" height="106" rx="7" fill="none" stroke="white" strokeWidth="0.8" />
                <rect x="18" y="5" width="164" height="22" rx="7" fill="white" opacity="0.09" />
                <text x="100" y="20" fill="white" fontSize="7.5" textAnchor="middle" fontWeight="bold">Check-in do dia</text>
                <line x1="18" y1="27" x2="182" y2="27" stroke="white" strokeWidth="0.4" />
                <rect x="28" y="35" width="10" height="10" rx="2" fill="#D4AF37" />
                <path d="M29.5 40 L32 43 L37 36.5" stroke="#000" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                <text x="44" y="45" fill="#D4AF37" fontSize="7.5">Leitura</text>
                <rect x="28" y="52" width="10" height="10" rx="2" fill="none" stroke="white" strokeWidth="0.7" />
                <text x="44" y="62" fill="white" fontSize="7.5">Metas do dia</text>
                <rect x="28" y="69" width="10" height="10" rx="2" fill="#D4AF37" />
                <path d="M29.5 74 L32 77 L37 70.5" stroke="#000" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                <text x="44" y="79" fill="#D4AF37" fontSize="7.5">Check-in</text>
                <rect x="28" y="86" width="10" height="10" rx="2" fill="none" stroke="white" strokeWidth="0.7" />
                <text x="44" y="96" fill="white" fontSize="7.5">Foco profundo</text>
              </svg>
              <div className="relative z-10">
                <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider">App Rise Up</span>
                <h4 className="text-[#F5F5F5] font-bold text-xl mt-3 leading-snug">Organize<br />o que<br />importa.</h4>
              </div>
            </Link>

            {/* Card 4 — Ecossistema */}
            <Link
              href="/conecte-se"
              className="relative rounded-3xl overflow-hidden min-h-[520px] flex flex-col justify-start p-7 transition-transform duration-300 hover:scale-[1.03]"
              style={{ background: "linear-gradient(160deg, #130b02 0%, #0e0702 35%, #070400 100%)" }}
            >
              <svg
                className="absolute bottom-0 left-0 right-0 w-full pointer-events-none"
                viewBox="0 0 200 130"
                preserveAspectRatio="xMidYMax meet"
              >
                <circle cx="100" cy="65" r="52" fill="none" stroke="white" strokeWidth="0.4" />
                <circle cx="100" cy="13" r="9" fill="none" stroke="#D4AF37" strokeWidth="1.1" />
                <circle cx="152" cy="65" r="9" fill="none" stroke="#D4AF37" strokeWidth="1.1" />
                <circle cx="100" cy="117" r="9" fill="none" stroke="#D4AF37" strokeWidth="1.1" />
                <circle cx="48" cy="65" r="9" fill="none" stroke="#D4AF37" strokeWidth="1.1" />
                <text x="100" y="17" fill="#D4AF37" fontSize="5.5" textAnchor="middle">Conteúdo</text>
                <text x="152" y="69" fill="#D4AF37" fontSize="5.5" textAnchor="middle">Método</text>
                <text x="100" y="121" fill="#D4AF37" fontSize="5.5" textAnchor="middle">Tecnolog.</text>
                <text x="48" y="69" fill="#D4AF37" fontSize="5.5" textAnchor="middle">Comunid.</text>
                <path d="M107 19 Q138 22 146 57" stroke="#D4AF37" strokeWidth="0.85" fill="none" strokeLinecap="round" />
                <path d="M148 73 Q150 100 108 112" stroke="#D4AF37" strokeWidth="0.85" fill="none" strokeLinecap="round" />
                <path d="M92 112 Q50 104 54 73" stroke="#D4AF37" strokeWidth="0.85" fill="none" strokeLinecap="round" />
                <path d="M54 57 Q60 24 93 19" stroke="#D4AF37" strokeWidth="0.85" fill="none" strokeLinecap="round" />
                <circle cx="100" cy="65" r="3" fill="#D4AF37" />
              </svg>
              <div className="relative z-10">
                <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider">Ecossistema</span>
                <h4 className="text-[#F5F5F5] font-bold text-xl mt-3 leading-snug">Você não<br />cresce<br />sozinho.</h4>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* ── 6. DIFERENCIAIS ───────────────────────────────────────────── */}
      <section className="py-[100px] px-4 sm:px-6 lg:px-16" style={{ background: "#060606" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] mb-5 font-semibold">
              Diferenciais
            </h2>
            <h3 className="text-4xl sm:text-5xl font-bold mb-4 text-[#F5F5F5]">
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
                <svg viewBox="0 0 180 64" className="w-full" style={{ opacity: 0.6 }}>
                  <circle cx="30" cy="28" r="9" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
                  <circle cx="90" cy="28" r="9" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
                  <circle cx="150" cy="28" r="9" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
                  <line x1="39" y1="28" x2="81" y2="28" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 2" />
                  <line x1="99" y1="28" x2="141" y2="28" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 2" />
                  <text x="30" y="52" textAnchor="middle" fill="#888" fontSize="8">Conteúdo</text>
                  <text x="90" y="52" textAnchor="middle" fill="#888" fontSize="8">Método</text>
                  <text x="150" y="52" textAnchor="middle" fill="#888" fontSize="8">App</text>
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

      {/* ── 7. CTA FINAL ──────────────────────────────────────────────── */}
      <section className="py-[120px] px-4 sm:px-6 lg:px-16" style={{ background: "#000000" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-12">

            {/* Esquerda — título */}
            <div className="sm:max-w-xl">
              <h2
                className="font-black leading-[1.05] mb-4 text-[#F5F5F5]"
                style={{ fontSize: "clamp(40px, 5vw, 64px)" }}
              >
                Evoluir é uma escolha diária.
              </h2>
              <p className="text-[16px] text-[#888]">
                Você está pronto para o próximo passo?
              </p>
            </div>

            {/* Direita — botões */}
            <div className="flex flex-row gap-4 flex-shrink-0">
              <Link
                href="/planos"
                className="px-8 py-4 bg-white text-black rounded-xl font-bold transition-all duration-300 hover:scale-105 text-center whitespace-nowrap hover:bg-neutral-100"
              >
                Explorar produtos
              </Link>
              <Link
                href="/app"
                className="px-8 py-4 bg-[#D4AF37] text-black rounded-xl font-bold transition-all duration-300 hover:scale-105 text-center whitespace-nowrap hover:bg-[#C5A028]"
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
