import Link from "next/link";

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO + CORPO — seção contínua */}
      <section
        style={{
          background:
            "linear-gradient(to bottom, rgba(212,175,55,0.06) 0%, #000000 120px)",
        }}
      >
        {/* TÍTULO E DATA */}
        <div className="max-w-[720px] mx-auto px-6 pt-20 pb-10">
          <p className="text-[#D4AF37] text-sm font-bold uppercase tracking-widest mb-6">
            LEGAL
          </p>
          <h1 className="text-5xl font-black text-white mb-4 text-left">
            Política de Cookies
          </h1>
          <p className="text-neutral-500 text-sm text-left">
            Última atualização: abril de 2026
          </p>
        </div>

        {/* CORPO */}
        <div className="max-w-[720px] mx-auto px-6 pb-24">

          {/* 1 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            1. O que são cookies
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed">
            Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site. Eles permitem que o site reconheça seu dispositivo, lembre suas preferências e melhore sua experiência de navegação.
          </p>

          {/* 2 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            2. Como a Rise Up usa cookies
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed mb-3">
            Utilizamos cookies exclusivamente para garantir o funcionamento correto da plataforma. Não utilizamos cookies de rastreamento publicitário ou pixels de terceiros no momento.
          </p>
          <p className="text-neutral-300 text-base leading-relaxed mb-3">
            Os cookies que utilizamos são:
          </p>
          <ul className="list-disc ml-5 text-neutral-400 text-base leading-relaxed space-y-2">
            <li><span className="text-neutral-300"><strong className="text-white">Cookies de sessão:</strong> mantêm você autenticado enquanto usa o App Rise Up. São excluídos automaticamente ao fechar o navegador</span></li>
            <li><span className="text-neutral-300"><strong className="text-white">Cookies de preferências:</strong> lembram suas configurações, como idioma selecionado e preferências de interface</span></li>
            <li><span className="text-neutral-300"><strong className="text-white">Cookies de segurança:</strong> protegem sua conta contra acessos não autorizados e atividades suspeitas</span></li>
          </ul>

          {/* 3 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            3. Cookies de terceiros
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed">
            Podemos utilizar ferramentas de análise de uso anônimo para melhorar nossos produtos. Quando isso ocorrer, esta política será atualizada com os detalhes específicos. Atualmente não utilizamos pixels de conversão, cookies de remarketing ou qualquer ferramenta de rastreamento publicitário.
          </p>

          {/* 4 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            4. Seus direitos
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed mb-3">
            Você pode configurar seu navegador para recusar todos os cookies ou para ser notificado quando um cookie está sendo enviado. No entanto, algumas funcionalidades do App Rise Up podem não funcionar corretamente sem cookies de sessão, especialmente o login e a navegação autenticada.
          </p>
          <p className="text-neutral-300 text-base leading-relaxed mb-3">
            Como gerenciar cookies nos principais navegadores:
          </p>
          <ul className="list-disc ml-5 text-neutral-400 text-base leading-relaxed space-y-2">
            <li><span className="text-neutral-300"><strong className="text-white">Chrome:</strong> Configurações → Privacidade e segurança → Cookies</span></li>
            <li><span className="text-neutral-300"><strong className="text-white">Safari:</strong> Preferências → Privacidade</span></li>
            <li><span className="text-neutral-300"><strong className="text-white">Firefox:</strong> Configurações → Privacidade e segurança</span></li>
            <li><span className="text-neutral-300"><strong className="text-white">Edge:</strong> Configurações → Privacidade, pesquisa e serviços</span></li>
          </ul>

          {/* 5 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            5. Atualizações desta política
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed">
            Caso passemos a utilizar cookies adicionais, especialmente de análise ou marketing, esta política será atualizada e você será notificado por email ou aviso no site antes que qualquer novo cookie seja ativado.
          </p>

          {/* 6 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            6. Contato
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed">
            Dúvidas sobre nossa política de cookies:{" "}
            <a href="mailto:contato@riseupoficial.com" className="text-[#D4AF37] hover:underline">
              contato@riseupoficial.com
            </a>
          </p>
        </div>
      </section>

      {/* SEÇÃO FINAL */}
      <section className="py-24 bg-gradient-to-br from-black via-neutral-900 to-black text-center px-6">
        <h2 className="text-4xl font-black text-white mb-8">
          Pronto para começar sua evolução?
        </h2>
        <Link
          href="/auth"
          className="inline-block bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold px-6 py-3 text-sm rounded-xl hover:scale-105 transition-all"
        >
          Criar conta grátis
        </Link>
        <p className="text-neutral-500 text-xs mt-4">
          Sem cartão. Cancele quando quiser.
        </p>
      </section>
    </main>
  );
}
