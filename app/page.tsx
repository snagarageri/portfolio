import ParticleField from "@/components/ParticleField";
import FloatingMascot from "@/components/FloatingMascot";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative">
      <div className="fixed inset-0 -z-10">
        <ParticleField />
      </div>

      <Nav />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Contact />

      <FloatingMascot />
    </main>
  );
}