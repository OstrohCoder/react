type Project = {
  name: string;
  description: string;
  vercelUrl?: string;
  githubUrl: string;
};

const projects: Project[] = [
  {
    name: "ClockStock",
    description: "Система управління складом годинників.",
    githubUrl: "https://github.com/OstrohCoder/ClockStock",
  },
  {
    name: "Lizak_blog",
    description: "Блог на Laravel.",
    githubUrl: "https://github.com/OstrohCoder/Lizak_blog",
  },
];

export function ProjectsSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">Проєкти</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.name}
            className="flex flex-col justify-between rounded-xl border bg-card/60 px-4 py-3 shadow-sm space-y-2"
          >
            <div className="space-y-1">
              <h3 className="font-medium tracking-tight">
                {project.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>
            </div>
            <div className="mt-2 flex flex-wrap gap-3 text-sm">
              {project.vercelUrl && (
                <a
                  href={project.vercelUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center underline-offset-2 hover:underline"
                >
                  Vercel
                </a>
              )}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center underline-offset-2 hover:underline"
              >
                GitHub
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
