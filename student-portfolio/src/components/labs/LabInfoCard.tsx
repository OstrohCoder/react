type LabInfoCardProps = {
  title: string;
  description: string;
  vercelUrl: string;
  githubUrl: string;
};

export function LabInfoCard({
  title,
  description,
  vercelUrl,
  githubUrl,
}: LabInfoCardProps) {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-xl w-full rounded-xl border bg-card/60 backdrop-blur-sm shadow-sm px-6 py-8 space-y-6">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Лабораторна робота
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            {title}
          </h1>
        </header>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            href={vercelUrl}
            target="_blank"
            rel="noreferrer"
          >
            Відкрити на Vercel
          </a>
          <a
            className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            Код на GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
