import { useState } from "react";
import TextField from "../common/TextField";

const INITIAL = {
  plate: "",
  model: "",
  seats: "",
  occupied: "",
  image: "",
  active: true,
};

const URL_RE = /^https?:\/\/\S+$/i;

const TEXT_FIELDS = [
  { name: "plate", label: "Matrícula" },
  { name: "model", label: "Modelo" },
  { name: "seats", label: "Plazas", type: "number" },
  { name: "occupied", label: "Ocupados", type: "number" },
  { name: "image", label: "URL imagen", type: "url" },
];

const fromBus = (b) => ({
  plate: b.plate,
  model: b.model,
  seats: String(b.seats),
  occupied: String(b.occupied),
  image: b.image,
  active: b.active,
});

const validate = (form) => {
  const errors = {};
  if (!form.plate) errors.plate = "Matrícula obligatoria";
  if (!form.model) errors.model = "Modelo obligatorio";
  const seats = Number(form.seats);
  const occupied = Number(form.occupied);
  if (!Number.isFinite(seats) || seats < 1) errors.seats = "Plazas ≥ 1";
  if (!Number.isFinite(occupied) || occupied < 0) errors.occupied = "Ocupados ≥ 0";
  else if (Number.isFinite(seats) && occupied > seats)
    errors.occupied = "No puede superar las plazas";
  if (!form.image) errors.image = "Imagen obligatoria";
  else if (!URL_RE.test(form.image)) errors.image = "URL no válida";
  return errors;
};

function BusForm({ editingBus, onCreate, onUpdate, onCancel }) {
  const [form, setForm] = useState(editingBus ? fromBus(editingBus) : INITIAL);
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
      plate: form.plate.trim(),
      model: form.model.trim(),
      image: form.image.trim(),
    };
    const fe = validate(trimmed);
    if (Object.keys(fe).length > 0) {
      setForm(trimmed);
      setErrors(fe);
      return;
    }
    const data = {
      ...trimmed,
      seats: Number(trimmed.seats),
      occupied: Number(trimmed.occupied),
    };
    if (editingBus) onUpdate(editingBus.id, data);
    else {
      onCreate(data);
      setForm(INITIAL);
    }
  };

  return (
    <form className="crud-form" onSubmit={handleSubmit} noValidate>
      <h2 className="crud-form__title">
        {editingBus ? "Editar autobús" : "Crear autobús"}
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
            checked={form.active}
            onChange={(e) => updateField("active", e.target.checked)}
          />
          Autobús activo
        </label>
      </div>
      <div className="crud-form__actions">
        <button type="submit" className="crud-form__submit">
          {editingBus ? "Guardar cambios" : "Crear autobús"}
        </button>
        {editingBus && (
          <button type="button" className="crud-form__cancel" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default BusForm;
