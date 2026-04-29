import { useState } from "react";

const INITIAL = { name: "", lastname: "", email: "", role: "user", active: true };
const EMAIL_RE = /^\S+@\S+\.\S+$/;
const TEXT_FIELDS = [
  ["name", "Nombre"],
  ["lastname", "Apellido"],
  ["email", "Email"],
];

function TextField({ name, label, value, error, onChange }) {
  return (
    <div className="user-form__field">
      <label htmlFor={`user-${name}`}>{label}</label>
      <input
        id={`user-${name}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <span className="user-form__error">{error}</span>}
    </div>
  );
}

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
    <form className="user-form" onSubmit={handleSubmit} noValidate>
      <h2 className="user-form__title">
        {editingUser ? "Editar usuario" : "Crear usuario"}
      </h2>
      <div className="user-form__grid">
        {TEXT_FIELDS.map(([name, label]) => (
          <TextField key={name} name={name} label={label}
            value={form[name]} error={errors[name]}
            onChange={(v) => updateField(name, v)} />
        ))}
        <div className="user-form__field">
          <label htmlFor="user-role">Rol</label>
          <select id="user-role" value={form.role}
            onChange={(e) => updateField("role", e.target.value)}>
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <label className="user-form__checkbox">
          <input type="checkbox" checked={form.active}
            onChange={(e) => updateField("active", e.target.checked)} />
          Usuario activo
        </label>
      </div>
      <div className="user-form__actions">
        <button type="submit" className="user-form__submit">
          {editingUser ? "Guardar cambios" : "Crear usuario"}
        </button>
        {editingUser && (
          <button type="button" className="user-form__cancel" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default UserForm;
