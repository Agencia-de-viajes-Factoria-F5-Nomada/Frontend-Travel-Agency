import Card from '../atoms/Card'

const StatCard = ({ label, value, icon: Icon, delta }) => (
  <Card className="flex items-center justify-between p-5">
    <div className="flex flex-col gap-1">
      <span className="text-xs uppercase tracking-wide text-ink-muted">{label}</span>
      <span className="text-2xl font-semibold text-white">{value}</span>
      {delta ? <span className="text-xs text-brand-400">{delta}</span> : null}
    </div>
    {Icon ? (
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-400/20 text-brand-300">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
    ) : null}
  </Card>
)

export default StatCard
