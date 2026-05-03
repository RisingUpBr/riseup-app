import Link from "next/link";

export default function ConectePage() {
  return (
    <main className="min-h-screen bg-[#000000] text-white overflow-hidden">

      <style>{`
        @keyframes globeGlow {
          0%, 100% { filter: drop-shadow(0 0 12px rgba(212,175,55,0.25)); }
          50%       { filter: drop-shadow(0 0 28px rgba(212,175,55,0.50)); }
        }
        @keyframes dotTwinkle {
          0%, 100% { opacity: 0.35; }
          50%       { opacity: 0.95; }
        }
        @keyframes lineFlow {
          from { stroke-dashoffset: 16; }
          to   { stroke-dashoffset: 0;  }
        }
        .globe-svg  { animation: globeGlow   5s ease-in-out infinite; }
        .dot-a      { animation: dotTwinkle  2.5s ease-in-out infinite; }
        .dot-b      { animation: dotTwinkle  3.5s ease-in-out infinite 0.7s; }
        .dot-c      { animation: dotTwinkle  4.0s ease-in-out infinite 1.4s; }
        .dot-d      { animation: dotTwinkle  3.0s ease-in-out infinite 2.1s; }
        .flow-line  { animation: lineFlow    3s  linear        infinite; }
      `}</style>

      {/* ── HERO ── */}
      <section
        className="relative py-[100px] px-4 sm:px-6 lg:px-16 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(212,175,55,0.10) 0%, transparent 70%), #000",
        }}
      >
        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          {/* Label */}
          <p
            className="text-[12px] font-bold uppercase mb-6"
            style={{ color: "#D4AF37", letterSpacing: "0.2em" }}
          >
            ECOSSISTEMA RISE UP
          </p>

          {/* H1 */}
          <h1
            className="font-black mb-6"
            style={{ fontSize: "clamp(40px, 6vw, 72px)", lineHeight: "1.0" }}
          >
            <span style={{ color: "#F5F5F5" }}>Conecte-se ao</span>
            <br />
            <span style={{ color: "#D4AF37" }}>ecossistema Rise Up</span>
          </h1>

          {/* Subtítulo */}
          <p
            className="text-lg mx-auto"
            style={{ color: "#888", maxWidth: "460px" }}
          >
            Conteúdos, ferramentas e caminhos diferentes, todos levando ao
            mesmo objetivo: evolução real.
          </p>
        </div>

        {/* Cone de luz */}
        <div
          className="absolute bottom-0 left-0 w-full h-48 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(212,175,55,0.07) 0%, rgba(212,175,55,0.01) 100%)",
            clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
          }}
        />
      </section>

      {/* ── DIAGRAMA DO ECOSSISTEMA ── */}
      <section className="py-[100px] px-4 sm:px-6 lg:px-16 bg-[#000000]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-[11px] font-bold uppercase mb-4"
              style={{ color: "#D4AF37", letterSpacing: "0.2em" }}
            >
              COMO FUNCIONA O ECOSSISTEMA
            </p>
            <h2
              className="font-extrabold mb-4"
              style={{ fontSize: 38, color: "#F5F5F5" }}
            >
              Tudo conectado. Tudo com propósito.
            </h2>
            <p
              className="mx-auto text-center"
              style={{ color: "#888", maxWidth: "440px" }}
            >
              Nossa infraestrutura foi desenhada para que cada ponto de contato
              acelere seu desenvolvimento de forma integrada.
            </p>
          </div>

          {/* Diagrama */}
          <div className="relative max-w-3xl mx-auto mb-2">

            {/* Linhas de conexão — coordenadas apontam para o centro de cada nó (96×96px) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              style={{ opacity: 0.28 }}
            >
              {/* Topo: top-0, centro em y=8% (48/600) */}
              <line x1="50%" y1="50%" x2="50%" y2="8%"  stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="4 4" className="flow-line" />
              {/* Topo-direita: top-1/4 right-4, centro em (92%, 33%) */}
              <line x1="50%" y1="50%" x2="92%" y2="33%" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="4 4" className="flow-line" style={{ animationDelay: "0.5s" }} />
              {/* Base-direita: bottom-1/4 right-4, centro em (92%, 67%) */}
              <line x1="50%" y1="50%" x2="92%" y2="67%" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="4 4" className="flow-line" style={{ animationDelay: "1s" }} />
              {/* Base: bottom-0, centro em y=92% (552/600) */}
              <line x1="50%" y1="50%" x2="50%" y2="92%" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="4 4" className="flow-line" style={{ animationDelay: "1.5s" }} />
              {/* Base-esquerda: bottom-1/4 left-4, centro em (8%, 67%) */}
              <line x1="50%" y1="50%" x2="8%"  y2="67%" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="4 4" className="flow-line" style={{ animationDelay: "2s" }} />
              {/* Topo-esquerda: top-1/4 left-4, centro em (8%, 33%) */}
              <line x1="50%" y1="50%" x2="8%"  y2="33%" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="4 4" className="flow-line" style={{ animationDelay: "2.5s" }} />
            </svg>

            <div className="relative w-full h-[500px] sm:h-[600px]">

              {/* ── CENTRO — Globo Rise Up → /sobre ── */}
              <Link
                href="/sobre"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 group"
              >
                <div className="relative group-hover:scale-110 transition-transform duration-300">
                  <svg
                    viewBox="0 0 160 160"
                    width="160"
                    height="160"
                    className="globe-svg"
                    aria-hidden="true"
                  >
                    <defs>
                      <radialGradient id="globeBg" cx="42%" cy="38%" r="65%">
                        <stop offset="0%"   stopColor="#1a1400" />
                        <stop offset="100%" stopColor="#050505" />
                      </radialGradient>
                      <radialGradient id="globeCenterGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%"   stopColor="#D4AF37" stopOpacity="0.14" />
                        <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                      </radialGradient>
                      <clipPath id="globeClip">
                        <circle cx="80" cy="80" r="70" />
                      </clipPath>
                    </defs>

                    {/* Fundo da esfera */}
                    <circle cx="80" cy="80" r="70" fill="url(#globeBg)" />

                    {/* Linhas de grade (latitude + longitude), recortadas */}
                    <g clipPath="url(#globeClip)" opacity="0.38">
                      {/* Latitude */}
                      <ellipse cx="80" cy="42" rx="50" ry="16" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
                      <ellipse cx="80" cy="62" rx="65" ry="23" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
                      <ellipse cx="80" cy="80" rx="70" ry="28" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
                      <ellipse cx="80" cy="98" rx="65" ry="23" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
                      <ellipse cx="80" cy="118" rx="50" ry="16" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
                      {/* Longitude */}
                      <ellipse cx="80" cy="80" rx="28"  ry="70" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
                      <ellipse cx="80" cy="80" rx="28"  ry="70" fill="none" stroke="#D4AF37" strokeWidth="0.8" transform="rotate(60, 80, 80)" />
                      <ellipse cx="80" cy="80" rx="28"  ry="70" fill="none" stroke="#D4AF37" strokeWidth="0.8" transform="rotate(-60, 80, 80)" />
                      <ellipse cx="80" cy="80" rx="28"  ry="70" fill="none" stroke="#D4AF37" strokeWidth="0.8" transform="rotate(90, 80, 80)" />
                    </g>

                    {/* Pontos na superfície */}
                    <g>
                      <circle cx="44"  cy="50"  r="2.5" fill="#D4AF37" className="dot-a" />
                      <circle cx="108" cy="44"  r="2"   fill="white"   className="dot-b" />
                      <circle cx="132" cy="73"  r="2.5" fill="white"   className="dot-c" />
                      <circle cx="124" cy="112" r="2"   fill="#D4AF37" className="dot-d" />
                      <circle cx="70"  cy="134" r="2.5" fill="white"   className="dot-a" />
                      <circle cx="36"  cy="112" r="2"   fill="white"   className="dot-b" />
                      <circle cx="22"  cy="80"  r="2.5" fill="#D4AF37" className="dot-c" />
                      <circle cx="38"  cy="48"  r="1.5" fill="white"   className="dot-d" />
                      <circle cx="80"  cy="18"  r="2"   fill="#D4AF37" className="dot-a" />
                      <circle cx="62"  cy="35"  r="1.5" fill="white"   className="dot-b" />
                      <circle cx="98"  cy="30"  r="1.5" fill="white"   className="dot-c" />
                      <circle cx="140" cy="96"  r="2"   fill="white"   className="dot-d" />
                      <circle cx="16"  cy="60"  r="2"   fill="#D4AF37" className="dot-a" />
                      <circle cx="52"  cy="128" r="1.5" fill="#D4AF37" className="dot-b" />
                      <circle cx="102" cy="126" r="2"   fill="white"   className="dot-c" />
                      <circle cx="118" cy="56"  r="1.5" fill="white"   className="dot-d" />
                    </g>

                    {/* Glow central */}
                    <circle cx="80" cy="80" r="70" fill="url(#globeCenterGlow)" />

                    {/* Borda dourada */}
                    <circle cx="80" cy="80" r="70" fill="none" stroke="#D4AF37" strokeWidth="1.5" opacity="0.9" />

                    {/* Texto */}
                    <text x="80" y="73" textAnchor="middle" fill="white"    fontSize="13" fontWeight="bold" fontFamily="system-ui, sans-serif" letterSpacing="1.5">RISE</text>
                    <text x="80" y="93" textAnchor="middle" fill="#D4AF37"  fontSize="13" fontWeight="bold" fontFamily="system-ui, sans-serif" letterSpacing="1.5">UP</text>
                  </svg>

                  {/* Tooltip hover */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-900 border border-[#D4AF37] text-white px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Rise Up
                  </div>
                </div>
              </Link>

              {/* ── TOPO — App Rise Up ── */}
              <Link href="/app" className="absolute top-0 left-1/2 -translate-x-1/2 group">
                <div className="relative">
                  <div className="w-24 h-24 bg-neutral-900 border-2 border-[#D4AF37]/30 rounded-full flex items-center justify-center group-hover:border-[#D4AF37] group-hover:scale-125 transition-all duration-300">
                    <svg className="w-8 h-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-neutral-900 border border-[#D4AF37] text-white px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    App Rise Up
                  </div>
                </div>
              </Link>

              {/* ── TOPO DIREITA — Infoprodutos ── */}
              <Link href="/planos" className="absolute top-1/4 right-0 sm:right-4 group">
                <div className="relative">
                  <div className="w-24 h-24 bg-neutral-900 border-2 border-[#D4AF37]/30 rounded-full flex items-center justify-center group-hover:border-[#D4AF37] group-hover:scale-125 transition-all duration-300">
                    <svg className="w-8 h-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-900 border border-[#D4AF37] text-white px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Infoprodutos
                  </div>
                </div>
              </Link>

              {/* ── BASE DIREITA — Instagram ── */}
              <a
                href="https://instagram.com/riseup.vibe"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-1/4 right-0 sm:right-4 group"
              >
                <div className="relative">
                  <div className="w-24 h-24 bg-neutral-900 border-2 border-[#D4AF37]/30 rounded-full flex items-center justify-center group-hover:border-[#D4AF37] group-hover:scale-125 transition-all duration-300">
                    <svg className="w-8 h-8 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-900 border border-[#D4AF37] text-white px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Instagram
                  </div>
                </div>
              </a>

              {/* ── BASE — YouTube ── */}
              <a
                href="https://youtube.com/@canalRiseUp"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 group"
              >
                <div className="relative">
                  <div className="w-24 h-24 bg-neutral-900 border-2 border-[#D4AF37]/30 rounded-full flex items-center justify-center group-hover:border-[#D4AF37] group-hover:scale-125 transition-all duration-300">
                    <svg className="w-8 h-8 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-900 border border-[#D4AF37] text-white px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    YouTube
                  </div>
                </div>
              </a>

              {/* ── BASE ESQUERDA — TikTok ── */}
              <a
                href="https://tiktok.com/@riseup.vibe"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-1/4 left-0 sm:left-4 group"
              >
                <div className="relative">
                  <div className="w-24 h-24 bg-neutral-900 border-2 border-[#D4AF37]/30 rounded-full flex items-center justify-center group-hover:border-[#D4AF37] group-hover:scale-125 transition-all duration-300">
                    <svg className="w-8 h-8 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                    </svg>
                  </div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-900 border border-[#D4AF37] text-white px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    TikTok
                  </div>
                </div>
              </a>

              {/* ── TOPO ESQUERDA — Recursos Gratuitos ── */}
              <Link href="/recursos" className="absolute top-1/4 left-0 sm:left-4 group">
                <div className="relative">
                  <div className="w-24 h-24 bg-neutral-900 border-2 border-[#D4AF37]/30 rounded-full flex items-center justify-center group-hover:border-[#D4AF37] group-hover:scale-125 transition-all duration-300">
                    <svg className="w-8 h-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-900 border border-[#D4AF37] text-white px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Recursos Gratuitos
                  </div>
                </div>
              </Link>

            </div>
          </div>

          {/* Texto abaixo do diagrama */}
          <div className="max-w-2xl mx-auto text-center mt-20">
            <p
              className="text-sm uppercase tracking-widest font-semibold mb-5"
              style={{ color: "#D4AF37" }}
            >
              Explore o ecossistema
            </p>
            <p className="text-xl sm:text-2xl text-neutral-300 leading-relaxed">
              Escolha por onde começar sua jornada. Cada caminho leva ao mesmo
              lugar: uma versão melhor de você.
            </p>
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTOS ── */}
      <section className="py-[100px] px-4 sm:px-6 lg:px-16 bg-[#060606]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Resultados de quem já começou
            </h2>
            <p className="text-neutral-400">Pessoas reais, transformações reais.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {/* Carla Mendes — 4 ★ */}
            <div
              className="flex flex-col h-full"
              style={{
                background: "#0a0a0a",
                border: "1px solid #161616",
                borderRadius: 16,
                padding: 32,
              }}
            >
              <div
                className="leading-none mb-4 font-serif"
                style={{ fontSize: 48, color: "#D4AF37", opacity: 0.5, fontFamily: "Georgia, serif" }}
              >
                &ldquo;
              </div>
              <p className="text-sm leading-relaxed italic flex-grow mb-6" style={{ color: "#BBBBBB" }}>
                Comprei o plano Avançado sem muita expectativa. A qualidade do
                conteúdo foi além do que imaginei. Comecei a criar uma rotina
                de verdade.
              </p>
              <div className="border-t pt-6" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(4)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" fill="#D4AF37" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <svg className="w-4 h-4" fill="#2a2a2a" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=112&h=112&fit=crop&crop=face&q=80"
                    alt="Carla Mendes"
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="font-bold text-sm text-white">Carla Mendes</p>
                    <p className="text-[11px] uppercase tracking-wider" style={{ color: "#444" }}>
                      Estudante de Engenharia
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rafael Torres — 4.5 ★ */}
            <div
              className="flex flex-col h-full"
              style={{
                background: "#0a0a0a",
                border: "1px solid #161616",
                borderRadius: 16,
                padding: 32,
              }}
            >
              <div
                className="leading-none mb-4 font-serif"
                style={{ fontSize: 48, color: "#D4AF37", opacity: 0.5, fontFamily: "Georgia, serif" }}
              >
                &ldquo;
              </div>
              <p className="text-sm leading-relaxed italic flex-grow mb-6" style={{ color: "#BBBBBB" }}>
                O app é exatamente o que precisava para organizar minha bagunça
                mental. Anotações, metas e rotinas em um lugar só que
                finalmente funciona.
              </p>
              <div className="border-t pt-6" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(4)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" fill="#D4AF37" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <svg className="w-4 h-4" viewBox="0 0 20 20">
                    <defs>
                      <linearGradient id="half-rafael" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="50%" stopColor="#D4AF37" />
                        <stop offset="50%" stopColor="#2a2a2a" />
                      </linearGradient>
                    </defs>
                    <path fill="url(#half-rafael)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=112&h=112&fit=crop&crop=face&q=80"
                    alt="Rafael Torres"
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="font-bold text-sm text-white">Rafael Torres</p>
                    <p className="text-[11px] uppercase tracking-wider" style={{ color: "#444" }}>
                      Desenvolvedor
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Julia Ferreira — 4 ★ */}
            <div
              className="flex flex-col h-full"
              style={{
                background: "#0a0a0a",
                border: "1px solid #161616",
                borderRadius: 16,
                padding: 32,
              }}
            >
              <div
                className="leading-none mb-4 font-serif"
                style={{ fontSize: 48, color: "#D4AF37", opacity: 0.5, fontFamily: "Georgia, serif" }}
              >
                &ldquo;
              </div>
              <p className="text-sm leading-relaxed italic flex-grow mb-6" style={{ color: "#BBBBBB" }}>
                Achei que seria mais um app de produtividade. O que me
                surpreendeu foi a simplicidade. Sem curva de aprendizado, só
                resultados.
              </p>
              <div className="border-t pt-6" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(4)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" fill="#D4AF37" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <svg className="w-4 h-4" fill="#2a2a2a" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=112&h=112&fit=crop&crop=face&q=80"
                    alt="Julia Ferreira"
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="font-bold text-sm text-white">Julia Ferreira</p>
                    <p className="text-[11px] uppercase tracking-wider" style={{ color: "#444" }}>
                      Psicóloga
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-[120px] px-4 sm:px-6 lg:px-16 bg-[#000000]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-10 leading-tight">
            Sua melhor versão<br />não começa amanhã.
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/recursos"
              className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] text-black rounded-xl font-bold hover:scale-105 transition-all duration-200"
            >
              Começar com recursos gratuitos
            </Link>

            <Link
              href="/app"
              className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-xl font-bold hover:scale-105 transition-all duration-200"
            >
              Conhecer o App
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
