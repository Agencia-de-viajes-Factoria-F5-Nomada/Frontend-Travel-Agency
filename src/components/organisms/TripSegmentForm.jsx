import FormField from '../molecules/FormField'

export default function TripSegmentForm({ form, onChange }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Origen"
          name="origin"
          value={form.origin}
          onChange={onChange}
          required
          placeholder="Ciudad de origen"
        />
        <FormField
          label="Destino"
          name="destination"
          value={form.destination}
          onChange={onChange}
          required
          placeholder="Ciudad de destino"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Salida (Fecha y Hora)"
          name="start_time"
          type="datetime-local"
          value={form.start_time}
          onChange={onChange}
          required
        />
        <FormField
          label="Llegada (Fecha y Hora)"
          name="end_time"
          type="datetime-local"
          value={form.end_time}
          onChange={onChange}
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <FormField
          label="ID Autobús"
          name="bus_id"
          type="number"
          value={form.bus_id}
          onChange={onChange}
          required
        />
        <FormField
          label="ID Conductor"
          name="driver_id"
          type="number"
          value={form.driver_id}
          onChange={onChange}
          required
        />
        <FormField
          label="ID Viaje"
          name="travel_id"
          type="number"
          value={form.travel_id}
          onChange={onChange}
          required
        />
      </div>
    </div>
  )
}