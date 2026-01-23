// app/page.tsx
import Hero from "@/components/home/Hero";
import Benefits from "@/components/home/Benefits";
import Feedbacks from "@/components/home/Feedbacks";
import Advantages from "@/components/home/Advantages";
import BeforeAfter from "@/components/home/BeforeAfter";
import AppPresentation from "@/components/home/AppPresentation";
import AppFeatures from "@/components/home/AppFeatures";
import AppSteps from "@/components/home/AppSteps";
import FAQ from "@/components/home/FAQ";

export default function Home() {
  return (
    <main>
      <Hero />
      <Benefits />
      <Feedbacks />
      <Advantages />
      <BeforeAfter />
      <AppPresentation />
      <AppFeatures />
      <AppSteps />
      <FAQ />
    </main>
  );
}
