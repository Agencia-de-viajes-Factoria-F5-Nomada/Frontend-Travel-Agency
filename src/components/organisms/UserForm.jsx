import FormField from '../molecules/FormField'
import SelectField from '../molecules/SelectField'

const ROL_OPTIONS = [
  { value: 'USER', label: 'Usuario' },
  { value: 'ADMIN', label: 'Administrador' },
]

export default function UserForm({ form, onChange, initialData }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Nombre" name="name" value={form.name} onChange={onChange} required />
        <FormField label="Apellido" name="surname" value={form.surname} onChange={onChange} required />
      </div>

      <FormField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={onChange}
        required
      />

      <FormField
        label="Contraseña"
        name="password"
        type="password"
        value={form.password}
        onChange={onChange}
        required={!initialData}
        hint={initialData ? 'Dejar vacío para mantener la actual' : undefined}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Pasaporte" name="passport" value={form.passport} onChange={onChange} />
        <FormField label="Fecha nacimiento" name="birthDate" type="date" value={form.birthDate} onChange={onChange} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="Rol"
          name="rol"
          options={ROL_OPTIONS}
          value={form.rol}
          onChange={onChange}
        />
        <FormField label="ID Tutor (menores)" name="tutorId" type="number" value={form.tutorId} onChange={onChange} />
      </div>
    </div>
  )
}