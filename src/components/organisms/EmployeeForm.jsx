import FormField from '../molecules/FormField'
import SelectField from '../molecules/SelectField'

const GENDER_OPTIONS = [
  { value: 'Male', label: 'Masculino' },
  { value: 'Female', label: 'Femenino' },
]

export default function EmployeeForm({ form, onChange }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Nombre"
          name="name"
          value={form.name}
          onChange={onChange}
          required
        />
        <FormField
          label="Apellido"
          name="surname"
          value={form.surname}
          onChange={onChange}
          required
        />
      </div>

      <SelectField
        label="Género"
        name="gender"
        options={GENDER_OPTIONS}
        value={form.gender}
        onChange={onChange}
      />
    </div>
  )
}