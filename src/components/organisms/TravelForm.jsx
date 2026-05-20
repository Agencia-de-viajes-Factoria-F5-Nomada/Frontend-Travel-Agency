import FormField from '../molecules/FormField'
import SelectField from '../molecules/SelectField'
import CheckboxField from '../molecules/CheckboxField'

export default function TravelForm({ form, onChange, hotels, buses, initialData }) {
  const hotelOptions = hotels.map(h => ({ value: h.id, label: `${h.name} — ${h.city}` }))
  const busOptions = [
    { value: '', label: 'Sin autobús asignado' },
    ...buses.map(b => ({ value: b.id, label: `${b.licensePlate} (${b.capacity} plazas)` }))
  ]

  return (
    <div className="space-y-4">
      <FormField
        label="Destino"
        name="destiny"
        value={form.destiny}
        onChange={onChange}
        required
        placeholder="Ej: París, Francia"
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Fecha inicio" name="startDate" type="date" value={form.startDate} onChange={onChange} required />
        <FormField label="Fecha fin" name="endDate" type="date" value={form.endDate} onChange={onChange} required />
      </div>

      <FormField
        label="Plazas disponibles"
        name="availablePlaces"
        type="number"
        value={form.availablePlaces}
        onChange={onChange}
        required
      />

      <SelectField
        label="Hotel"
        name="hotelId"
        options={hotelOptions}
        value={form.hotelId}
        onChange={onChange}
        required
        placeholder="Selecciona un hotel"
      />

      <SelectField
        label="Autobús"
        name="busId"
        options={busOptions}
        value={form.busId}
        onChange={onChange}
        placeholder="Sin autobús asignado"
      />

      <CheckboxField
        label="En oferta"
        name="sale"
        checked={form.sale}
        onChange={onChange}
      />
    </div>
  )
}