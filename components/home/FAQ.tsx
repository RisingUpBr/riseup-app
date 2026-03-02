// components/home/FAQ.tsx
"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
  category: "infoproduto" | "app";
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D4AF37] rounded-2xl mb-6">
            <span className="text-3xl">💬</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Perguntas frequentes
          </h2>
          
          <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Dúvidas comuns sobre o app e os infoprodutos. Se não encontrar sua resposta aqui, fale com a gente.
          </p>
        </div>

        {/* FAQ ACCORDION */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-2 border-neutral-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#D4AF37]"
            >
              {/* PERGUNTA */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left transition-colors"
              >
                <h3 className="text-lg md:text-xl font-bold text-white pr-4 leading-tight">
                  {faq.question}
                </h3>
                
                <div
                  className={`flex-shrink-0 w-8 h-8 flex items-center justify-center transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    className="w-6 h-6 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {/* RESPOSTA */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                  <div className="border-t border-neutral-800 pt-6">
                    <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA FINAL */}
        <div className="mt-16 text-center">
          <p className="text-neutral-400 mb-6">
            Ainda tem dúvidas?{" "}
            <a
              href="/contact"
              className="text-[#D4AF37] hover:text-[#E5C158] font-semibold underline transition-colors"
            >
              Fale com a gente
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}