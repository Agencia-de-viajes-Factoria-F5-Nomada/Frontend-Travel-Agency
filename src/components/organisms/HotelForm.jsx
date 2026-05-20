import FormField from '../molecules/FormField'
import SelectField from '../molecules/SelectField'
import ImageUpload from '../molecules/ImageUpload'

const STAR_OPTIONS = [
  { value: 1, label: '1 ⭐' },
  { value: 2, label: '2 ⭐⭐' },
  { value: 3, label: '3 ⭐⭐⭐' },
  { value: 4, label: '4 ⭐⭐⭐⭐' },
  { value: 5, label: '5 ⭐⭐⭐⭐⭐' },
]

export default function HotelForm({ form, onChange, initialData }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Nombre" name="name" value={form.name} onChange={onChange} required />
        <SelectField
          label="Estrellas"
          name="stars"
          options={STAR_OPTIONS}
          value={form.stars}
          onChange={onChange}
        />
      </div>

      <FormField label="Dirección" name="address" value={form.address} onChange={onChange} />

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Ciudad" name="city" value={form.city} onChange={onChange} required />
        <FormField label="País" name="country" value={form.country} onChange={onChange} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Capacidad total" name="capacity" type="number" value={form.capacity} onChange={onChange} />
        <FormField label="Plazas disponibles" name="availablePlaces" type="number" value={form.availablePlaces} onChange={onChange} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Precio media pensión (€)" name="halfBoardPrice" type="number" step="0.01" value={form.halfBoardPrice} onChange={onChange} />
        <FormField label="Precio pensión completa (€)" name="fullBoardPrice" type="number" step="0.01" value={form.fullBoardPrice} onChange={onChange} />
      </div>

      <ImageUpload
        label="Imagen del hotel"
        name="imageUrl"
        value={form.imageUrl}
        onChange={onChange}
      />
    </div>
  )
}