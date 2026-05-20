import FormField from '../molecules/FormField'
import CheckboxField from '../molecules/CheckboxField'
import ImageUpload from '../molecules/ImageUpload'

export default function DriverForm({ form, onChange, initialData }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Nombre" name="name" value={form.name} onChange={onChange} required />
        <FormField label="Apellido" name="surname" value={form.surname} onChange={onChange} required />
      </div>

      <FormField
        label="Número de matriculación"
        name="enrollment"
        value={form.enrollment}
        onChange={onChange}
        required
        placeholder="Ej: DRV-2024-001"
      />

      <ImageUpload
        label="Imagen del conductor"
        name="imageUrl"
        value={form.imageUrl}
        onChange={onChange}
      />

      <CheckboxField
        label="Licencia activa"
        name="licenceActive"
        checked={form.licenceActive}
        onChange={onChange}
      />
    </div>
  )
}