import FormField from '../molecules/FormField'
import SelectField from '../molecules/SelectField'
import CheckboxField from '../molecules/CheckboxField'

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

      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="Género"
          name="gender"
          options={GENDER_OPTIONS}
          value={form.gender}
          onChange={onChange}
        />
        <FormField
          label="Horas de trabajo"
          name="work_hour"
          type="number"
          value={form.work_hour}
          onChange={onChange}
        />
      </div>

      <CheckboxField
        label="Contratado"
        name="hired"
        checked={form.hired}
        onChange={onChange}
      />
    </div>
  )
}