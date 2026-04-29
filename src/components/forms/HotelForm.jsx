import { useState } from "react";
import TextField from "../common/TextField";

const INITIAL = {
  name: "",
  city: "",
  capacity: "",
  occupied: "",
  pricePerNight: "",
  image: "",
  active: true,
};

const URL_RE = /^https?:\/\/\S+$/i;

const TEXT_FIELDS = [
  { name: "name", label: "Nombre" },
  { name: "city", label: "Ciudad" },
  { name: "capacity", label: "Capacidad", type: "number" },
  { name: "occupied", label: "Ocupados", type: "number" },
  { name: "pricePerNight", label: "Precio noche (€)", type: "number" },
  { name: "image", label: "URL imagen", type: "url" },
];

const fromHotel = (h) => ({
  name: h.name,
  city: h.city,
  capacity: String(h.capacity),
  occupied: String(h.occupied),
  pricePerNight: String(h.pricePerNight),
  image: h.image,
  active: h.active,
});

const validate = (form) => {
  const errors = {};
  if (!form.name) errors.name = "Nombre obligatorio";
  if (!form.city) errors.city = "Ciudad obligatoria";
  const capacity = Number(form.capacity);
  const occupied = Number(form.occupied);
  const price = Number(form.pricePerNight);
  if (!Number.isFinite(capacity) || capacity < 1) errors.capacity = "Capacidad ≥ 1";
  if (!Number.isFinite(occupied) || occupied < 0) errors.occupied = "Ocupados ≥ 0";
  else if (Number.isFinite(capacity) && occupied > capacity)
    errors.occupied = "No puede superar la capacidad";
  if (!Number.isFinite(price) || price <= 0) errors.pricePerNight = "Precio > 0";
  if (!form.image) errors.image = "Imagen obligatoria";
  else if (!URL_RE.test(form.image)) errors.image = "URL no válida";
  return errors;
};

function HotelForm({ editingHotel, onCreate, onUpdate, onCancel }) {
  const [form, setForm] = useState(editingHotel ? fromHotel(editingHotel) : INITIAL);
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
      city: form.city.trim(),
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
      capacity: Number(trimmed.capacity),
      occupied: Number(trimmed.occupied),
      pricePerNight: Number(trimmed.pricePerNight),
    };
    if (editingHotel) onUpdate(editingHotel.id, data);
    else {
      onCreate(data);
      setForm(INITIAL);
    }
  };

  return (
    <form className="crud-form" onSubmit={handleSubmit} noValidate>
      <h2 className="crud-form__title">
        {editingHotel ? "Editar hotel" : "Crear hotel"}
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
          Hotel activo
        </label>
      </div>
      <div className="crud-form__actions">
        <button type="submit" className="crud-form__submit">
          {editingHotel ? "Guardar cambios" : "Crear hotel"}
        </button>
        {editingHotel && (
          <button type="button" className="crud-form__cancel" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default HotelForm;
