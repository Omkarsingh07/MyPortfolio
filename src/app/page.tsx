import { IntroProvider } from "@/components/intro-experience";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { SoftwareProjects } from "@/components/software-projects";
import { GenAiShowcase } from "@/components/genai-showcase";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <IntroProvider>
      <div className="min-h-screen flex flex-col bg-background font-sans">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <About />
          <SoftwareProjects />
          <GenAiShowcase />
          <Experience />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </IntroProvider>
  );
}
