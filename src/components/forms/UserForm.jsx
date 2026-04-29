import { useState } from "react";
import TextField from "../common/TextField";

const INITIAL = { name: "", lastname: "", email: "", role: "user", active: true };
const EMAIL_RE = /^\S+@\S+\.\S+$/;
const TEXT_FIELDS = [
  { name: "name", label: "Nombre" },
  { name: "lastname", label: "Apellido" },
  { name: "email", label: "Email", type: "email" },
];

function UserForm({ editingUser, onCreate, onUpdate, onCancel }) {
  const [form, setForm] = useState(editingUser ?? INITIAL);
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
      email: form.email.trim(),
    };
    const fe = {};
    if (!trimmed.name) fe.name = "Nombre obligatorio";
    if (!trimmed.lastname) fe.lastname = "Apellido obligatorio";
    if (!trimmed.email) fe.email = "Email obligatorio";
    else if (!EMAIL_RE.test(trimmed.email)) fe.email = "Email no válido";
    if (Object.keys(fe).length > 0) {
      setForm(trimmed);
      setErrors(fe);
      return;
    }
    if (editingUser) onUpdate(editingUser.id, trimmed);
    else {
      onCreate(trimmed);
      setForm(INITIAL);
    }
  };

  return (
    <form className="crud-form" onSubmit={handleSubmit} noValidate>
      <h2 className="crud-form__title">
        {editingUser ? "Editar usuario" : "Crear usuario"}
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
        <div className="field">
          <label htmlFor="field-role" className="field__label">Rol</label>
          <select
            id="field-role"
            value={form.role}
            onChange={(e) => updateField("role", e.target.value)}
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <label className="crud-form__checkbox">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => updateField("active", e.target.checked)}
          />
          Usuario activo
        </label>
      </div>
      <div className="crud-form__actions">
        <button type="submit" className="crud-form__submit">
          {editingUser ? "Guardar cambios" : "Crear usuario"}
        </button>
        {editingUser && (
          <button type="button" className="crud-form__cancel" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default UserForm;
