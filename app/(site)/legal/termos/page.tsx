export default function TermosPage() {
  return (
    <main className="min-h-screen px-6 py-16 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">
        Termos de Uso
      </h1>

      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">
            1. Aceitação dos Termos
          </h2>
          <p>
            Ao acessar e usar a Rise Up, você concorda com estes Termos de Uso.
            Se não concordar, não utilize nossos serviços.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">
            2. Descrição do Serviço
          </h2>
          <p>
            A Rise Up oferece ferramentas de organização pessoal, conteúdos
            educacionais e recursos para desenvolvimento pessoal.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">
            3. Conta de Usuário
          </h2>
          <p>
            Você é responsável por manter a confidencialidade de sua conta e
            senha. Notifique-nos imediatamente sobre qualquer uso não autorizado.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">
            4. Pagamentos e Assinaturas
          </h2>
          <p>
            Assinaturas são cobradas de acordo com o plano escolhido.
            Cancelamentos podem ser feitos a qualquer momento através da sua
            conta.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">
            5. Propriedade Intelectual
          </h2>
          <p>
            Todo conteúdo da Rise Up é protegido por direitos autorais. Você
            pode usar o conteúdo para uso pessoal, mas não pode redistribuir ou
            vender.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">
            6. Proibições de Uso
          </h2>
          <p>
            É proibido usar o serviço para atividades ilegais, distribuir malware,
            ou violar direitos de terceiros.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">
            7. Limitação de Responsabilidade
          </h2>
          <p>
            A Rise Up não se responsabiliza por danos indiretos decorrentes do
            uso do serviço. O serviço é fornecido "como está".
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">
            8. Modificações nos Termos
          </h2>
          <p>
            Podemos modificar estes termos a qualquer momento. Mudanças
            significativas serão notificadas por email.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">
            9. Lei Aplicável
          </h2>
          <p>
            Estes termos são regidos pelas leis do Brasil. Disputas serão
            resolvidas no foro da comarca de São Paulo.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">
            10. Contato
          </h2>
          <p>
            Para questões sobre estes termos, entre em contato através de{" "}
            <a href="mailto:legal@riseup.com" className="text-blue-600 underline">
              legal@riseup.com
            </a>
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-8">
          Última atualização: Janeiro de 2025
        </p>
      </div>
    </main>
  );
}