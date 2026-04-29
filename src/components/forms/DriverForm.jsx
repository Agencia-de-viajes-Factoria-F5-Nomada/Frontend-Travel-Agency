import { useState } from "react";
import TextField from "../common/TextField";

const INITIAL = {
  name: "",
  lastname: "",
  licenseNumber: "",
  phone: "",
  available: true,
  active: true,
};

const TEXT_FIELDS = [
  { name: "name", label: "Nombre" },
  { name: "lastname", label: "Apellido" },
  { name: "licenseNumber", label: "Licencia" },
  { name: "phone", label: "Teléfono", type: "tel" },
];

const validate = (form) => {
  const errors = {};
  if (!form.name) errors.name = "Nombre obligatorio";
  else if (form.name.length < 2) errors.name = "Mínimo 2 caracteres";
  if (!form.lastname) errors.lastname = "Apellido obligatorio";
  else if (form.lastname.length < 2) errors.lastname = "Mínimo 2 caracteres";
  if (!form.licenseNumber) errors.licenseNumber = "Licencia obligatoria";
  else if (form.licenseNumber.length < 4) errors.licenseNumber = "Mínimo 4 caracteres";
  if (!form.phone) errors.phone = "Teléfono obligatorio";
  else if (form.phone.length < 7) errors.phone = "Teléfono no válido";
  return errors;
};

function DriverForm({ editingDriver, onCreate, onUpdate, onCancel }) {
  const [form, setForm] = useState(editingDriver ?? INITIAL);
  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = {
      ...form,
      name: form.name.trim(),
      lastname: form.lastname.trim(),
      licenseNumber: form.licenseNumber.trim(),
      phone: form.phone.trim(),
    };
    const fe = validate(trimmed);
    if (Object.keys(fe).length > 0) {
      setForm(trimmed);
      setErrors(fe);
      return;
    }
    if (editingDriver) onUpdate(editingDriver.id, trimmed);
    else {
      onCreate(trimmed);
      setForm(INITIAL);
    }
  };

  return (
    <form className="crud-form" onSubmit={handleSubmit} noValidate>
      <h2 className="crud-form__title">
        {editingDriver ? "Editar conductor" : "Crear conductor"}
      </h2>
      <div className="crud-form__grid">
        {TEXT_FIELDS.map((f) => (
          <TextField
            key={f.name}
            name={f.name}
            label={f.label}
            type={f.type}
            value={form[f.name]}
            error={errors[f.name]}
            onChange={(v) => updateField(f.name, v)}
          />
        ))}
        <label className="crud-form__checkbox">
          <input
            type="checkbox"
            checked={form.available}
            onChange={(e) => updateField("available", e.target.checked)}
          />
          Disponible
        </label>
        <label className="crud-form__checkbox">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => updateField("active", e.target.checked)}
          />
          Conductor activo
        </label>
      </div>
      <div className="crud-form__actions">
        <button type="submit" className="crud-form__submit">
          {editingDriver ? "Guardar cambios" : "Crear conductor"}
        </button>
        {editingDriver && (
          <button type="button" className="crud-form__cancel" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default DriverForm;
