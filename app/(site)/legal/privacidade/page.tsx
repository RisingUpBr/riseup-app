import Link from "next/link";

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO + CORPO — seção contínua */}
      <section
        style={{
          background:
            "linear-gradient(to bottom, rgba(212,175,55,0.06) 0%, #000000 120px)",
        }}
      >
        {/* TÍTULO E DATA — alinhados à esquerda dentro do mesmo container do corpo */}
        <div className="max-w-[720px] mx-auto px-6 pt-20 pb-10">
          <p className="text-[#D4AF37] text-sm font-bold uppercase tracking-widest mb-6">
            LEGAL
          </p>
          <h1 className="text-5xl font-black text-white mb-4 text-left">
            Política de Privacidade
          </h1>
          <p className="text-neutral-500 text-sm text-left">
            Última atualização: abril de 2026
          </p>
        </div>

        {/* CORPO */}
        <div className="max-w-[720px] mx-auto px-6 pb-24">
          {/* 1 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            1. Introdução
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed">
            Esta Política de Privacidade descreve como a Rise Up ("nós", "nosso" ou "Rise Up") coleta, usa e protege as informações pessoais dos usuários do nosso site (riseup.com.br) e da nossa plataforma de desenvolvimento pessoal, incluindo o App Rise Up e os infoprodutos.
          </p>
          <p className="text-neutral-300 text-base leading-relaxed mt-3">
            Contato:{" "}
            <a href="mailto:contato@riseupoficial.com" className="text-[#D4AF37] hover:underline">
              contato@riseupoficial.com
            </a>
          </p>
          <p className="text-neutral-300 text-base leading-relaxed mt-3">
            Podemos atualizar esta política periodicamente. Recomendamos que você a visite regularmente.
          </p>

          {/* 2 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            2. Quais informações coletamos
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed">
            Coletamos informações que você fornece voluntariamente, como nome e email ao se cadastrar, assinar nossa newsletter ou adquirir nossos produtos. Também coletamos dados de uso, como endereço IP, tipo de dispositivo, páginas visitadas e tempo de navegação, por meio de ferramentas de análise.
          </p>

          {/* 3 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            3. Como usamos as informações
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed mb-3">
            Utilizamos suas informações para:
          </p>
          <ul className="list-disc ml-5 text-neutral-400 text-base leading-relaxed space-y-2">
            <li><span className="text-neutral-300">Fornecer acesso ao App Rise Up e aos infoprodutos adquiridos</span></li>
            <li><span className="text-neutral-300">Enviar comunicações relacionadas à sua conta e compras</span></li>
            <li><span className="text-neutral-300">Enviar conteúdos e newsletters (somente com seu consentimento)</span></li>
            <li><span className="text-neutral-300">Melhorar nossos produtos e serviços</span></li>
            <li><span className="text-neutral-300">Cumprir obrigações legais e prevenir fraudes</span></li>
          </ul>

          {/* 4 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            4. Base legal (LGPD)
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed mb-3">
            Tratamos seus dados com base nas seguintes hipóteses legais previstas na Lei Geral de Proteção de Dados (Lei nº 13.709/2018):
          </p>
          <ul className="list-disc ml-5 text-neutral-400 text-base leading-relaxed space-y-2">
            <li><span className="text-neutral-300"><strong className="text-white">Execução de contrato:</strong> para entregar os produtos e serviços adquiridos</span></li>
            <li><span className="text-neutral-300"><strong className="text-white">Legítimo interesse:</strong> para melhorar a experiência e comunicar novidades relevantes</span></li>
            <li><span className="text-neutral-300"><strong className="text-white">Consentimento:</strong> para envio de comunicações de marketing</span></li>
            <li><span className="text-neutral-300"><strong className="text-white">Cumprimento de obrigação legal:</strong> quando exigido por lei</span></li>
          </ul>

          {/* 5 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            5. Compartilhamento de informações
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed mb-3">
            Não vendemos suas informações pessoais. Podemos compartilhá-las com:
          </p>
          <ul className="list-disc ml-5 text-neutral-400 text-base leading-relaxed space-y-2">
            <li><span className="text-neutral-300">Plataformas de pagamento (Stripe, Kiwify, Lemon Squeezy) para processar transações</span></li>
            <li><span className="text-neutral-300">Ferramentas de email marketing (ConvertKit) para envio de comunicações autorizadas</span></li>
            <li><span className="text-neutral-300">Serviços de hospedagem e infraestrutura (Vercel, Firebase/Supabase)</span></li>
            <li><span className="text-neutral-300">Autoridades competentes, quando exigido por lei</span></li>
          </ul>

          {/* 6 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            6. Segurança
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed">
            Adotamos medidas técnicas e organizacionais razoáveis para proteger suas informações contra acesso não autorizado, perda ou divulgação indevida, incluindo criptografia e controle de acesso. Nenhum sistema é 100% seguro — recomendamos que você proteja suas credenciais de acesso.
          </p>

          {/* 7 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            7. Retenção de dados
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed">
            Mantemos suas informações pelo tempo necessário para cumprir as finalidades descritas nesta política, respeitando obrigações legais e resolvendo eventuais disputas. Dados de conta são mantidos enquanto sua conta estiver ativa.
          </p>

          {/* 8 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            8. Seus direitos (LGPD)
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed mb-3">
            De acordo com a LGPD, você tem direito a:
          </p>
          <ul className="list-disc ml-5 text-neutral-400 text-base leading-relaxed space-y-2">
            <li><span className="text-neutral-300">Confirmar a existência de tratamento dos seus dados</span></li>
            <li><span className="text-neutral-300">Acessar, corrigir ou atualizar seus dados</span></li>
            <li><span className="text-neutral-300">Solicitar a exclusão dos seus dados</span></li>
            <li><span className="text-neutral-300">Revogar o consentimento para comunicações de marketing</span></li>
            <li><span className="text-neutral-300">Obter informações sobre compartilhamento de dados</span></li>
          </ul>
          <p className="text-neutral-300 text-base leading-relaxed mt-3">
            Para exercer qualquer desses direitos, entre em contato:{" "}
            <a href="mailto:contato@riseupoficial.com" className="text-[#D4AF37] hover:underline">
              contato@riseupoficial.com
            </a>
          </p>

          {/* 9 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            9. Cookies
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed">
            Utilizamos cookies para melhorar sua experiência de navegação, lembrar preferências e analisar o uso do site via Google Analytics. Você pode desativar cookies nas configurações do seu navegador, mas algumas funcionalidades podem ser afetadas.
          </p>

          {/* 10 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            10. Contato
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed">
            Dúvidas sobre esta política? Entre em contato:{" "}
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
