import FormField from '../molecules/FormField'

export default function BookingForm({ form, onChange, travels, users }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-medium text-ink-muted">Viaje *</label>
        <select
          name="travelId"
          value={form.travelId}
          onChange={onChange}
          required
          className="mt-1 w-full rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-ink focus:outline-none"
        >
          <option value="">Selecciona un viaje</option>
          {travels.map(t => (
            <option key={t.id} value={t.id}>{t.destiny} ({t.startDate})</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-medium text-ink-muted">Cliente *</label>
        <select
          name="customerId"
          value={form.customerId}
          onChange={onChange}
          required
          className="mt-1 w-full rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-ink focus:outline-none"
        >
          <option value="">Selecciona un cliente</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>{u.name} {u.surname}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-medium text-ink-muted">Tipo de pensión *</label>
        <select
          name="typeBoard"
          value={form.typeBoard}
          onChange={onChange}
          required
          className="mt-1 w-full rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-ink focus:outline-none"
        >
          <option value="HALF">Media pensión</option>
          <option value="FULL">Pensión completa</option>
        </select>
      </div>

      <div>
        <label className="text-xs font-medium text-ink-muted">¿Reserva de grupo?</label>
        <select
          name="isGroup"
          value={form.isGroup}
          onChange={onChange}
          className="mt-1 w-full rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-ink focus:outline-none"
        >
          <option value={false}>No</option>
          <option value={true}>Sí</option>
        </select>
      </div>
    </div>
  )
}