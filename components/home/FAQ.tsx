// components/home/FAQ.tsx
"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
  category: "infoproduto" | "app";
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "Os infoprodutos têm acesso vitalício ou é mensalidade?",
      answer: "Acesso vitalício. Você compra uma vez e tem acesso para sempre ao conteúdo. Sem mensalidades, sem renovações. O material é seu permanentemente, incluindo todas as atualizações futuras que fizermos.",
      category: "infoproduto",
    },
    {
      question: "Qual a diferença entre o app e os infoprodutos?",
      answer: "O app é a ferramenta prática onde você executa: organiza tarefas, cria anotações ramificadas, usa blocos de tempo. Os infoprodutos são os cursos que ensinam as técnicas e estratégias de produtividade que você aplica no app. Um complementa o outro, mas funcionam de forma independente.",
      category: "infoproduto",
    },
    {
      question: "Preciso comprar infoproduto para usar o app?",
      answer: "Não. O app funciona de forma totalmente independente. Você pode usar apenas o app (plano mensal ou anual) sem comprar nenhum infoproduto. Os infoprodutos são opcionais e servem para quem quer aprender técnicas avançadas de produtividade.",
      category: "app",
    },
    {
      question: "Como funciona a entrega dos infoprodutos?",
      answer: "Imediatamente após o pagamento ser aprovado, você recebe um email com login e senha da plataforma Kiwify, onde todo o conteúdo está hospedado. O acesso é instantâneo e você pode começar imediatamente.",
      category: "infoproduto",
    },
    {
      question: "O app tem versão mobile ou só funciona no navegador?",
      answer: "Por enquanto, o app funciona via navegador (desktop e mobile). Estamos desenvolvendo aplicativos nativos para iOS e Android, previstos para o segundo semestre de 2026. Enquanto isso, você pode usar normalmente pelo navegador do celular.",
      category: "app",
    },
    {
      question: "Existe desconto ao comprar infoproduto + app juntos?",
      answer: "Sim. Ao comprar qualquer infoproduto, você ganha 30% de desconto no plano anual do app. E se já é assinante do app (anual), ganha 20% de desconto em qualquer infoproduto. Os descontos são aplicados automaticamente no checkout.",
      category: "infoproduto",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-32 bg-black transition-colors overflow-hidden">
      <div className="max-w-[750px] mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <div className="mb-14">
          {/* Chat bubble — standard circular outline, matches /recursos and /app */}
          <svg
            className="w-12 h-12 mx-auto mb-6 text-[#D4AF37]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>

          <h2 className="text-[56px] md:text-[64px] font-black leading-tight mb-4 text-center whitespace-nowrap">
            <span className="text-white">Perguntas </span>
            <span style={{ color: "#D4AF37" }}>Frequentes</span>
          </h2>

          <p className="text-neutral-400 text-base text-center">
            Dúvidas comuns sobre o app e os infoprodutos.
          </p>
        </div>

        {/* FAQ ACCORDION */}
        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-neutral-800">
              {/* PERGUNTA */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between py-5 text-left group hover:translate-x-1 transition-transform duration-200"
              >
                <h3 className="text-base font-semibold text-white pr-6 leading-snug">
                  {faq.question}
                </h3>
                <svg
                  className={`flex-shrink-0 w-5 h-5 text-white transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* RESPOSTA */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="text-neutral-400 text-sm leading-relaxed pb-5">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA FINAL */}
        <div className="mt-12 text-center">
          <p className="text-neutral-400">
            Ainda tem dúvidas?{" "}
            <a
              href="/contact"
              className="text-[#D4AF37] hover:text-[#E5C158] font-semibold transition-colors"
            >
              Fale com a gente
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
