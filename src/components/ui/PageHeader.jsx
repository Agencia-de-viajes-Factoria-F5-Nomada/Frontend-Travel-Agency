const PageHeader = ({ eyebrow, title, description, actions }) => (
  <header className="flex flex-col gap-4 border-b border-brand-500/25 pb-6 md:flex-row md:items-end md:justify-between">
    <div className="flex flex-col gap-2">
      {eyebrow ? (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">
          {eyebrow}
        </span>
      ) : null}
      <h1 className="text-3xl font-semibold text-white md:text-4xl">{title}</h1>
      {description ? (
        <p className="max-w-2xl text-sm text-ink-muted md:text-base">{description}</p>
      ) : null}
    </div>
    {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
  </header>
)

export default PageHeader
