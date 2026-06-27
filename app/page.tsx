import ParticleField from "@/components/ParticleField";
import FloatingMascot from "@/components/FloatingMascot";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative">
      <div className="fixed inset-0 -z-10">
        <ParticleField />
      </div>

      <Hero />
      <Skills />
      <Projects />
      <Contact />

      <FloatingMascot />
    </main>
  );
}
