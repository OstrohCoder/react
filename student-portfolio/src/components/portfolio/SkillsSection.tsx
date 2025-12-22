const skills = [
  "JavaScript / TypeScript",
  "React, React Router",
  "Vite, shadcn/ui, Tailwind CSS",
  "Git, GitHub, Vercel",
  "Perplexity, ChatGPT 😁",
];

export function SkillsSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">Навички</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center rounded-full border bg-muted/40 px-3 py-1 text-xs sm:text-sm text-muted-foreground"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
