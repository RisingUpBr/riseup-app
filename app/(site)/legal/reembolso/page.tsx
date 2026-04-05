import Link from "next/link";

export default function ReembolsoPage() {
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
            Política de Reembolso
          </h1>
          <p className="text-neutral-500 text-sm text-left">
            Última atualização: abril de 2026
          </p>
        </div>

        {/* CORPO */}
        <div className="max-w-[720px] mx-auto px-6 pb-24">

          {/* 1 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            1. Visão geral
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed">
            A Rise Up oferece dois tipos de produto com políticas de reembolso distintas: infoprodutos (pagamento único) e o App Rise Up (assinatura recorrente). Leia com atenção a política correspondente ao produto adquirido.
          </p>

          {/* 2 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            2. Infoprodutos — Pagamento único
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed mb-3">
            Os infoprodutos Rise Up (ebooks, guias, planners, treinamentos e o Método Rise Up) são vendidos com garantia de 7 dias a partir da data da compra.
          </p>
          <p className="text-neutral-300 text-base leading-relaxed mb-3">
            Como funciona:
          </p>
          <ul className="list-disc ml-5 text-neutral-400 text-base leading-relaxed space-y-2 mb-6">
            <li><span className="text-neutral-300">Você tem 7 dias corridos após a compra para solicitar reembolso, sem necessidade de justificativa</span></li>
            <li><span className="text-neutral-300">O reembolso é processado pela plataforma de pagamento utilizada na compra: Kiwify (Brasil) ou Lemon Squeezy (internacional)</span></li>
            <li><span className="text-neutral-300">O prazo de estorno depende do método de pagamento utilizado e das políticas de cada plataforma — geralmente entre 5 e 10 dias úteis</span></li>
            <li><span className="text-neutral-300">Após os 7 dias, não é possível solicitar reembolso</span></li>
          </ul>
          <p className="text-neutral-300 text-base leading-relaxed mb-2">
            <strong className="text-white">Como solicitar:</strong>
          </p>
          <p className="text-neutral-300 text-base leading-relaxed">
            Entre em contato pelo email{" "}
            <a href="mailto:contato@riseupoficial.com" className="text-[#D4AF37] hover:underline">
              contato@riseupoficial.com
            </a>{" "}
            com o assunto "Reembolso — Infoproduto", informando seu nome completo e o email utilizado na compra. Responderemos em até 48 horas com as instruções para o processo.
          </p>

          {/* 3 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            3. App Rise Up — Assinatura recorrente
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed mb-6">
            O App Rise Up é oferecido em três planos de assinatura, cada um com sua política específica:
          </p>

          <p className="text-white font-semibold text-base mb-3">Plano Quinzenal (R$ 19 / 15 dias)</p>
          <ul className="list-disc ml-5 text-neutral-400 text-base leading-relaxed space-y-2 mb-6">
            <li><span className="text-neutral-300">Reembolso disponível apenas nas primeiras 48 horas após o pagamento, em casos de compra acidental ou duplicada</span></li>
            <li><span className="text-neutral-300">Após 48 horas, não há reembolso — o acesso permanece ativo pelos 15 dias completos</span></li>
            <li><span className="text-neutral-300">Para cancelar a renovação automática: acesse as configurações da sua conta antes do fim do período</span></li>
          </ul>

          <p className="text-white font-semibold text-base mb-3">Plano Mensal (R$ 29 / mês)</p>
          <ul className="list-disc ml-5 text-neutral-400 text-base leading-relaxed space-y-2 mb-6">
            <li><span className="text-neutral-300">Você pode cancelar a qualquer momento pelas configurações da conta</span></li>
            <li><span className="text-neutral-300">Ao cancelar, seu acesso premium permanece ativo até o último dia do ciclo mensal pago</span></li>
            <li><span className="text-neutral-300">Não há reembolso proporcional por dias não utilizados</span></li>
            <li><span className="text-neutral-300">Após o encerramento do período, sua conta retorna automaticamente ao plano gratuito</span></li>
          </ul>

          <p className="text-white font-semibold text-base mb-3">Plano Anual (R$ 244 / ano)</p>
          <ul className="list-disc ml-5 text-neutral-400 text-base leading-relaxed space-y-2 mb-6">
            <li><span className="text-neutral-300">Você pode cancelar a qualquer momento pelas configurações da conta</span></li>
            <li><span className="text-neutral-300">Ao cancelar, seu acesso premium permanece ativo até o último dia do ciclo anual pago</span></li>
            <li><span className="text-neutral-300">Não há reembolso proporcional por meses não utilizados — a mesma lógica do cancelamento de planos anuais em plataformas como Canva e similares</span></li>
            <li><span className="text-neutral-300">Após o encerramento do período, sua conta retorna automaticamente ao plano gratuito</span></li>
          </ul>

          <p className="text-neutral-300 text-base leading-relaxed mb-3">
            Em todos os planos:
          </p>
          <ul className="list-disc ml-5 text-neutral-400 text-base leading-relaxed space-y-2">
            <li><span className="text-neutral-300">O cancelamento encerra apenas a renovação automática — não há interrupção imediata do acesso</span></li>
            <li><span className="text-neutral-300">Ao fim do período pago, o usuário retorna ao plano Free com acesso às funcionalidades básicas</span></li>
            <li><span className="text-neutral-300">Dados e conteúdos salvos são mantidos mesmo após o downgrade para o plano gratuito</span></li>
          </ul>

          {/* 4 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            4. Casos excepcionais
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed">
            Em situações de cobrança indevida, erro técnico comprovado ou falha na entrega do acesso, analisamos cada caso individualmente independente do prazo. Entre em contato:{" "}
            <a href="mailto:contato@riseupoficial.com" className="text-[#D4AF37] hover:underline">
              contato@riseupoficial.com
            </a>
          </p>

          {/* 5 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            5. Pagamentos processados por terceiros
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed mb-3">
            Os pagamentos da Rise Up são processados por plataformas terceiras:
          </p>
          <ul className="list-disc ml-5 text-neutral-400 text-base leading-relaxed space-y-2 mb-4">
            <li><span className="text-neutral-300"><strong className="text-white">Kiwify</strong> — infoprodutos no Brasil</span></li>
            <li><span className="text-neutral-300"><strong className="text-white">Lemon Squeezy</strong> — infoprodutos internacionais</span></li>
            <li><span className="text-neutral-300"><strong className="text-white">Stripe</strong> — assinaturas do App Rise Up</span></li>
          </ul>
          <p className="text-neutral-300 text-base leading-relaxed">
            A Rise Up não armazena dados de cartão de crédito. Em caso de disputa de cobrança diretamente com seu banco ou operadora de cartão, entre em contato conosco primeiro para resolvermos sem necessidade de chargeback.
          </p>

          {/* 6 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            6. Contato
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed">
            Para qualquer dúvida sobre reembolsos:{" "}
            <a href="mailto:contato@riseupoficial.com" className="text-[#D4AF37] hover:underline">
              contato@riseupoficial.com
            </a>
          </p>
          <p className="text-neutral-300 text-base leading-relaxed mt-2">
            Respondemos em até 48 horas úteis.
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
