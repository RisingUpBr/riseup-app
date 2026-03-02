import Hero from "@/components/home/Hero";
import Benefits from "@/components/home/Benefits";
import Feedbacks from "@/components/home/Feedbacks";
import Advantages from "@/components/home/Advantages";
import BeforeAfter from "@/components/home/BeforeAfter";
import AppPresentation from "@/components/home/AppPresentation";
import AppFeatures from "@/components/home/AppFeatures";
import AppSteps from "@/components/home/AppSteps";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 1. Hero - Primeira impressão */}
      <Hero />

      {/* 2. Benefits - Por que escolher Rise Up */}
      <Benefits />

      {/* 3. Feedbacks - Prova social */}
      <Feedbacks />

      {/* 4. Advantages - Diferenciais */}
      <Advantages />

      {/* 5. Before & After - Transformação */}
      <BeforeAfter />

      {/* 6. App Presentation - Apresentação do produto */}
      <AppPresentation />

      {/* 7. App Features - Funcionalidades principais */}
      <AppFeatures />

      {/* 8. App Steps - Como começar */}
      <AppSteps />

      {/* 9. FAQ - Dúvidas frequentes */}
      <FAQ />

      {/* 10. Final CTA - Última chamada para ação */}
      <FinalCTA />
    </main>
  );
}