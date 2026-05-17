import FormField from '../molecules/FormField'
import CheckboxField from '../molecules/CheckboxField'

export default function BusForm({ form, onChange, initialData }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Matrícula" name="licensePlate" value={form.licensePlate} onChange={onChange} required />
        <FormField label="Capacidad" name="capacity" type="number" value={form.capacity} onChange={onChange} required />
      </div>

      <FormField
        label="ID Conductor"
        name="driverId"
        type="number"
        value={form.driverId}
        onChange={onChange}
        hint={initialData ? 'Dejar vacío para quitar conductor' : 'Dejar vacío si no asignado'}
      />

      <div className="rounded-lg p-4 bg-brand-100/60">
        <p className="text-sm font-semibold text-ink mb-3">Equipamiento</p>
        <div className="grid grid-cols-2 gap-3">
          <CheckboxField label="Baño" name="bath" checked={form.bath} onChange={onChange} />
          <CheckboxField label="Wifi" name="wifi" checked={form.wifi} onChange={onChange} />
          <CheckboxField label="Aire acondicionado" name="ac" checked={form.ac} onChange={onChange} />
          <CheckboxField label="USB" name="usb" checked={form.usb} onChange={onChange} />
        </div>
      </div>

      <CheckboxField
        label="Disponible"
        name="available"
        checked={form.available}
        onChange={onChange}
      />
    </div>
  )
}