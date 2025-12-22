export function HeroSection() {
  return (
    <section className="space-y-6">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Portfolio
      </p>
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
          Привіт, я Лізак Даниїл
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
          .NET і React розробник. Пишу API та створюю сучасні інтерфейси з Vite,
          TypeScript і shadcn/ui.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <a
          href="https://github.com/OstrohCoder/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Мій GitHub
        </a>
        <a
          href="https://vercel.com/danyillizak-oaeduuas-projects"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Мій Vercel
        </a>
      </div>
    </section>
  );
}
