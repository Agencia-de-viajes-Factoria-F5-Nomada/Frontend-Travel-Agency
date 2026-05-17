import FormField from '../molecules/FormField'

export default function BookingForm({ form, onChange }) {
  return (
    <div className="space-y-4">
      <FormField
        label="Nombre del cliente"
        name="customerName"
        value={form.customerName}
        onChange={onChange}
        required
        placeholder="Nombre completo"
      />

      <FormField
        label="Destino"
        name="destination"
        value={form.destination}
        onChange={onChange}
        required
        placeholder="Ej: París, Francia"
      />

      <FormField
        label="Fecha de reserva"
        name="bookingDate"
        type="date"
        value={form.bookingDate}
        onChange={onChange}
        required
      />
    </div>
  )
}