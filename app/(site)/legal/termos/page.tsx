import Link from "next/link";

export default function TermosPage() {
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
            Termos de Uso
          </h1>
          <p className="text-neutral-500 text-sm text-left">
            Última atualização: abril de 2026
          </p>
        </div>

        {/* CORPO */}
        <div className="max-w-[720px] mx-auto px-6 pb-24">

          {/* 1 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            1. Aceitação dos Termos
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed">
            Ao acessar ou usar o site da Rise Up (riseup.com.br), o App Rise Up ou adquirir qualquer infoproduto, você concorda com estes Termos de Uso. Se não concordar, não utilize nossos produtos ou serviços.
          </p>

          {/* 2 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            2. O que oferecemos
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed mb-3">
            A Rise Up oferece dois produtos complementares:
          </p>
          <ul className="list-disc ml-5 text-neutral-400 text-base leading-relaxed space-y-2">
            <li><span className="text-neutral-300"><strong className="text-white">App Rise Up:</strong> plataforma SaaS de organização pessoal com assinatura recorrente, incluindo notas, flashcards com IA, rotinas automáticas e relatórios de progresso</span></li>
            <li><span className="text-neutral-300"><strong className="text-white">Infoprodutos:</strong> ebooks, guias, planners, mapas mentais, treinamentos e o Método Rise Up, disponíveis mediante pagamento único com acesso vitalício</span></li>
          </ul>

          {/* 3 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            3. Cadastro e conta
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed">
            Para usar o App Rise Up, você deve criar uma conta com informações verdadeiras e atualizadas. Você é responsável por manter suas credenciais seguras e por todas as atividades realizadas em sua conta. Notifique-nos imediatamente em caso de acesso não autorizado:{" "}
            <a href="mailto:contato@riseupoficial.com" className="text-[#D4AF37] hover:underline">
              contato@riseupoficial.com
            </a>
          </p>
          <p className="text-neutral-300 text-base leading-relaxed mt-3">
            Idade mínima para uso: 13 anos.
          </p>

          {/* 4 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            4. Assinatura e pagamentos — App Rise Up
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed mb-3">
            O App Rise Up é oferecido em planos de assinatura recorrente (quinzenal, mensal ou anual), processados via Stripe. Ao assinar:
          </p>
          <ul className="list-disc ml-5 text-neutral-400 text-base leading-relaxed space-y-2">
            <li><span className="text-neutral-300">Você autoriza a cobrança automática no método de pagamento cadastrado</span></li>
            <li><span className="text-neutral-300">As assinaturas renovam automaticamente ao final de cada período</span></li>
            <li><span className="text-neutral-300">Você pode cancelar a qualquer momento pelas configurações da conta — o acesso permanece até o fim do período pago</span></li>
            <li><span className="text-neutral-300">Valores em reais (BRL) para usuários brasileiros</span></li>
          </ul>

          {/* 5 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            5. Pagamento único — Infoprodutos
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed mb-3">
            Os infoprodutos são vendidos mediante pagamento único com acesso vitalício ao conteúdo adquirido. Após a confirmação do pagamento via Kiwify (Brasil) ou Lemon Squeezy (internacional):
          </p>
          <ul className="list-disc ml-5 text-neutral-400 text-base leading-relaxed space-y-2">
            <li><span className="text-neutral-300">O acesso ao conteúdo é liberado automaticamente</span></li>
            <li><span className="text-neutral-300">O conteúdo é seu para sempre, incluindo atualizações futuras do material adquirido</span></li>
            <li><span className="text-neutral-300">Não há mensalidades ou cobranças adicionais</span></li>
          </ul>

          {/* 6 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            6. Política de reembolso
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed">
            <strong className="text-white">Infoprodutos:</strong> reembolso disponível em até 7 dias após a compra, conforme o Código de Defesa do Consumidor (Lei nº 8.078/1990), desde que o conteúdo não tenha sido integralmente acessado.
          </p>
          <p className="text-neutral-300 text-base leading-relaxed mt-3">
            <strong className="text-white">App Rise Up:</strong> não há reembolso proporcional por período não utilizado após o início de um ciclo de cobrança. O plano Quinzenal funciona como trial completo sem fidelidade.
          </p>
          <p className="text-neutral-300 text-base leading-relaxed mt-3">
            Para solicitar reembolso:{" "}
            <a href="mailto:contato@riseupoficial.com" className="text-[#D4AF37] hover:underline">
              contato@riseupoficial.com
            </a>
          </p>

          {/* 7 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            7. Uso permitido
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed mb-3">
            Ao usar nossos produtos, você concorda em:
          </p>
          <ul className="list-disc ml-5 text-neutral-400 text-base leading-relaxed space-y-2">
            <li><span className="text-neutral-300">Usar o conteúdo exclusivamente para fins pessoais</span></li>
            <li><span className="text-neutral-300">Não reproduzir, distribuir, revender ou compartilhar os materiais adquiridos</span></li>
            <li><span className="text-neutral-300">Não usar o app para fins ilegais ou que prejudiquem terceiros</span></li>
            <li><span className="text-neutral-300">Não tentar acessar áreas restritas do sistema ou contornar mecanismos de segurança</span></li>
          </ul>

          {/* 8 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            8. Propriedade intelectual
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed">
            Todo o conteúdo da Rise Up — textos, designs, metodologias, marca, materiais didáticos e software — é de propriedade exclusiva da Rise Up e protegido por lei. A compra de um infoproduto ou assinatura do app concede uma licença pessoal e intransferível de uso, não transferindo qualquer direito de propriedade intelectual.
          </p>

          {/* 9 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            9. Disponibilidade do serviço
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed">
            O App Rise Up é fornecido "como está" e "conforme disponível". Não garantimos disponibilidade ininterrupta, embora nos esforcemos para manter alta disponibilidade. Podemos realizar manutenções, atualizações ou modificar funcionalidades sem aviso prévio.
          </p>

          {/* 10 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            10. Limitação de responsabilidade
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed">
            A Rise Up não se responsabiliza por resultados específicos decorrentes do uso dos nossos produtos. Desenvolvimento pessoal depende do esforço e comprometimento de cada usuário. Nossa responsabilidade total, em qualquer caso, está limitada ao valor pago pelo serviço nos últimos 12 meses.
          </p>

          {/* 11 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            11. Privacidade e dados
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed">
            O tratamento dos seus dados pessoais é regido pela nossa{" "}
            <Link href="/legal/privacidade" className="text-[#D4AF37] hover:underline">
              Política de Privacidade
            </Link>
            , em conformidade com a LGPD (Lei nº 13.709/2018).
          </p>

          {/* 12 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            12. Modificações dos Termos
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed">
            Podemos atualizar estes Termos periodicamente. Alterações relevantes serão comunicadas por email ou notificação no app. O uso continuado dos nossos serviços após as alterações constitui aceitação dos novos Termos.
          </p>

          {/* 13 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            13. Lei aplicável e foro
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed">
            Estes Termos são regidos pelas leis brasileiras. Fica eleito o foro da comarca de domicílio do usuário para resolução de conflitos, conforme o Código de Defesa do Consumidor.
          </p>

          {/* 14 */}
          <h2 className="text-white font-bold text-lg mt-10 mb-3">
            14. Contato
          </h2>
          <p className="text-neutral-300 text-base leading-relaxed">
            Dúvidas sobre estes Termos:{" "}
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
