import FormField from '../molecules/FormField'

export default function OfferForm({ form, onChange }) {
  return (
    <div className="space-y-4">
      <FormField
        label="Porcentaje de descuento (%)"
        name="discount_percentage"
        type="number"
        step="0.01"
        value={form.discount_percentage}
        onChange={onChange}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Fecha de inicio"
          name="start_date"
          type="date"
          value={form.start_date}
          onChange={onChange}
          required
        />
        <FormField
          label="Fecha de fin"
          name="end_date"
          type="date"
          value={form.end_date}
          onChange={onChange}
          required
        />
      </div>
    </div>
  )
}