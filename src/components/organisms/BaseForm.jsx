import FormField from '../molecules/FormField'
import SelectField from '../molecules/SelectField'
import CheckboxField from '../molecules/CheckboxField'
import ImageUpload from '../molecules/ImageUpload'
import { classNames } from '../../utils/classNames'

const GRID_CLASSES = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
}

function resolveValue(val, initialData) {
  return typeof val === 'function' ? val(initialData) : val
}

function FieldRenderer({ field, form, onChange, initialData, relatedData }) {
  const value = form[field.name]
  const required = resolveValue(field.required, initialData)
  const hint = resolveValue(field.hint, initialData)
  const placeholder = resolveValue(field.placeholder, initialData)

  const common = {
    name: field.name,
    label: field.label,
    value,
    onChange,
    required,
    hint,
    placeholder,
  }

  switch (field.type) {
    case 'select': {
      const options = field.mapOptions
        ? field.mapOptions(relatedData || {})
        : field.options || []
      return <SelectField {...common} options={options} />
    }
    case 'checkbox':
      return <CheckboxField {...common} checked={!!value} />
    case 'checkbox-group':
      return (
        <div className={classNames('rounded-lg p-4', field.className)}>
          {field.label && (
            <p className="text-sm font-semibold text-ink mb-3">{field.label}</p>
          )}
          <div className={classNames('grid gap-3', field.gridClass || 'grid-cols-2')}>
            {field.checkboxes.map((cb) => (
              <CheckboxField
                key={cb.name}
                label={cb.label}
                name={cb.name}
                checked={!!form[cb.name]}
                onChange={onChange}
              />
            ))}
          </div>
        </div>
      )
    case 'image':
      return <ImageUpload {...common} />
    default:
      return <FormField {...common} type={field.type || 'text'} step={field.step} />
  }
}

function GridRow({ fields, form, onChange, initialData, relatedData }) {
  const cols = Math.min(fields.length, 4)
  const gridClass = GRID_CLASSES[cols] || GRID_CLASSES[2]

  return (
    <div className={`grid ${gridClass} gap-4`}>
      {fields.map((f) => (
        <FieldRenderer
          key={f.name}
          field={f}
          form={form}
          onChange={onChange}
          initialData={initialData}
          relatedData={relatedData}
        />
      ))}
    </div>
  )
}

export default function BaseForm({ fields = [], form, onChange, initialData, relatedData }) {
  const rows = []
  let buffer = []

  for (const field of fields) {
    if (field.type === 'checkbox-group' || field.type === 'checkbox' || field.type === 'image') {
      if (buffer.length > 0) {
        rows.push({ type: 'grid', fields: buffer })
        buffer = []
      }
      rows.push({ type: 'full', field })
    } else if (field.fullWidth === false) {
      if (buffer.length > 0 && field.breakRow) {
        rows.push({ type: 'grid', fields: buffer })
        buffer = []
      }
      buffer.push(field)
    } else {
      if (buffer.length > 0) {
        rows.push({ type: 'grid', fields: buffer })
        buffer = []
      }
      rows.push({ type: 'full', field })
    }
  }
  if (buffer.length > 0) {
    rows.push({ type: 'grid', fields: buffer })
  }

  return (
    <div className="space-y-4">
      {rows.map((row, i) =>
        row.type === 'grid' ? (
          <GridRow
            key={i}
            fields={row.fields}
            form={form}
            onChange={onChange}
            initialData={initialData}
            relatedData={relatedData}
          />
        ) : (
          <FieldRenderer
            key={row.field.name}
            field={row.field}
            form={form}
            onChange={onChange}
            initialData={initialData}
            relatedData={relatedData}
          />
        ),
      )}
    </div>
  )
}
