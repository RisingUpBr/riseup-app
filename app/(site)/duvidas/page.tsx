"use client";

import Link from "next/link";
import { useState } from "react";

const faqs = [
  {
    category: "App Rise Up",
    items: [
      {
        q: "Posso cancelar quando quiser?",
        a: "Sim. Você pode cancelar sua assinatura a qualquer momento pelas configurações da conta. Ao cancelar, seu acesso premium permanece ativo até o último dia do período já pago. Após isso, sua conta retorna automaticamente ao plano gratuito.",
      },
      {
        q: "Como funciona o período de teste?",
        a: "O plano Quinzenal funciona como um trial completo de 15 dias por R$ 19, sem fidelidade. Você tem acesso a todas as funcionalidades premium sem compromisso de continuidade.",
      },
      {
        q: "Meus dados ficam salvos se eu cancelar?",
        a: "Sim. Seus dados, notas e conteúdos salvos são mantidos mesmo após o cancelamento ou downgrade para o plano gratuito.",
      },
      {
        q: "Posso mudar de plano depois?",
        a: "Sim. Você pode fazer upgrade ou downgrade do seu plano a qualquer momento pelas configurações da conta.",
      },
      {
        q: "O app funciona offline?",
        a: "Algumas funcionalidades básicas funcionam offline, mas recursos que utilizam IA e sincronização em tempo real requerem conexão com a internet.",
      },
      {
        q: "Tem versão mobile e web?",
        a: "O App Rise Up funciona no navegador (web) em qualquer dispositivo. Uma versão mobile nativa está em desenvolvimento.",
      },
      {
        q: "Qual a diferença entre os planos pagos?",
        a: "Os planos Mensal e Anual oferecem as mesmas funcionalidades — tudo ilimitado, IA completa e acesso premium. A diferença é apenas o ciclo de cobrança e o valor: o Anual oferece economia de 30% em relação ao Mensal.",
      },
    ],
  },
  {
    category: "Infoprodutos",
    items: [
      {
        q: "Os infoprodutos têm acesso vitalício ou é mensalidade?",
        a: "Acesso vitalício. Você compra uma vez e tem acesso para sempre ao conteúdo, incluindo todas as atualizações futuras que fizermos no material. Sem mensalidades, sem renovações.",
      },
      {
        q: "Como funciona a entrega dos infoprodutos?",
        a: "Após a confirmação do pagamento, você recebe por email o acesso ao conteúdo adquirido. O processo é automático e geralmente ocorre em minutos.",
      },
      {
        q: "Qual a diferença entre os planos Essencial, Avançado e Completo?",
        a: "Cada plano é uma expansão do anterior. O Essencial traz a base do Método Rise Up com os primeiros materiais. O Avançado aprofunda com mais módulos, ebooks e ferramentas. O Completo inclui tudo, com módulos exclusivos e benefícios no App Rise Up.",
      },
      {
        q: "Os conteúdos são atualizados?",
        a: "Sim. Atualizações nos materiais adquiridos são entregues sem custo adicional para quem já comprou.",
      },
      {
        q: "Preciso comprar infoproduto para usar o app?",
        a: "Não. O App Rise Up e os infoprodutos são produtos independentes. Você pode usar um sem o outro. Juntos, formam o sistema completo Rise Up.",
      },
      {
        q: "O App está incluso nos planos de infoprodutos?",
        a: "O plano Completo inclui benefícios no App Rise Up. Os demais planos de infoprodutos não incluem assinatura do app — são produtos separados.",
      },
      {
        q: "Como funciona o reembolso dos infoprodutos?",
        a: "Oferecemos garantia de 7 dias a partir da data da compra. Para solicitar, envie um email para contato@riseupoficial.com com o assunto \"Reembolso — Infoproduto\". Saiba mais na nossa Política de Reembolso.",
      },
    ],
  },
  {
    category: "Conteúdo Gratuito",
    items: [
      {
        q: "Os recursos são realmente gratuitos?",
        a: "Sim. Os materiais disponíveis na página de Conteúdo Gratuito são 100% gratuitos, sem necessidade de cartão de crédito ou cadastro pago.",
      },
      {
        q: "Preciso comprar algo depois de baixar o conteúdo gratuito?",
        a: "Não. O conteúdo gratuito é seu sem nenhuma obrigação de compra. Se quiser aprofundar sua jornada, os infoprodutos e o App Rise Up estão disponíveis como próximo passo — mas a escolha é sempre sua.",
      },
      {
        q: "Para quem é indicado o conteúdo gratuito?",
        a: "Para qualquer pessoa que queira começar a organizar melhor sua rotina, criar hábitos consistentes e entender a metodologia Rise Up antes de investir nos produtos pagos.",
      },
      {
        q: "Posso sair da lista de emails quando quiser?",
        a: "Sim. Todo email enviado pela Rise Up contém um link de descadastro. Você pode sair da lista a qualquer momento com um clique, sem burocracia.",
      },
    ],
  },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-neutral-800">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span
          className="text-white text-base font-medium transition-transform duration-200 group-hover:translate-x-1"
        >
          {q}
        </span>
        <svg
          className={`w-4 h-4 text-white flex-shrink-0 ml-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <p className="text-neutral-400 text-base leading-relaxed pb-4">
          {a}
        </p>
      )}
    </div>
  );
}

export default function DuvidasPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section
        style={{
          background:
            "linear-gradient(to bottom, rgba(212,175,55,0.06) 0%, #000000 120px)",
        }}
      >
        <div className="max-w-[720px] mx-auto px-6 pt-20 pb-12">
          <p className="text-[#D4AF37] text-sm font-bold uppercase tracking-widest mb-6">
            SUPORTE
          </p>
          <h1 className="text-5xl font-black text-white mb-4 text-left">
            Dúvidas Frequentes
          </h1>
          <p className="text-neutral-400 text-base text-left">
            Respostas para as principais dúvidas sobre a Rise Up.
          </p>
        </div>

        {/* CORPO — accordion por categoria */}
        <div className="max-w-[720px] mx-auto px-6 pb-24">
          {faqs.map((section) => (
            <div key={section.category}>
              <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mt-12 mb-4">
                {section.category}
              </p>
              <div className="border-b border-[#D4AF37]/30 mb-6" />
              {section.items.map((item) => (
                <AccordionItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* SEÇÃO FINAL — igual ao FinalCTA da home */}
      <section className="py-20 md:py-32 bg-[#D4AF37] overflow-hidden relative">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#E5C158] to-[#D4AF37] opacity-60" />
          <div className="absolute top-1/4 left-0 w-full h-1/2">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 320">
              <path fill="#C9A532" fillOpacity="0.4" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,122.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1/2">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 320">
              <path fill="#B8941F" fillOpacity="0.3" d="M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,112C672,107,768,149,864,165.3C960,181,1056,171,1152,149.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
            </svg>
          </div>
        </div>

        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-neutral-900 rounded-3xl p-8 md:p-10 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              Pare de planejar.
              <br />
              Comece a executar.
            </h2>
            <p className="text-sm md:text-base text-neutral-400 mb-8 max-w-xl mx-auto leading-relaxed">
              O sistema está pronto. Só falta você.
            </p>
            <div className="mb-4">
              <Link
                href="/auth"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold rounded-full transition-all hover:scale-105 shadow-lg"
              >
                Começar grátis
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <Link
              href="/planos"
              className="inline-block text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Ver planos
            </Link>
            <p className="text-xs text-neutral-500 mt-3">
              Sem cartão. Cancelamento a qualquer momento.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
