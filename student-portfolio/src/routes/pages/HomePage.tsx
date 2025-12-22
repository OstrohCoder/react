import { HeroSection } from "@/components/portfolio/HeroSection";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { SkillsSection } from "@/components/portfolio/SkillsSection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";

export function HomePage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] flex justify-center px-4 py-8">
      <div className="w-full max-w-3xl space-y-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
      </div>
    </main>
  );
}
