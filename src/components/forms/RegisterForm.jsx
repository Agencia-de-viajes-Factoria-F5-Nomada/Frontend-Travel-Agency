import { useRegisterForm } from "../../hooks/useRegisterForm";

const FIELDS = [
  { name: "name", label: "Nombre", type: "text", autoComplete: "given-name" },
  { name: "lastname", label: "Apellido", type: "text", autoComplete: "family-name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "password", label: "Contraseña", type: "password", autoComplete: "new-password" },
];

function RegisterForm() {
  const { form, errors, updateField, submit } = useRegisterForm();

  return (
    <form className="auth__form" onSubmit={submit} noValidate>
      {FIELDS.map((f) => (
        <div className="auth__field" key={f.name}>
          <label htmlFor={`register-${f.name}`}>{f.label}</label>
          <input
            id={`register-${f.name}`}
            type={f.type}
            value={form[f.name]}
            onChange={(e) => updateField(f.name, e.target.value)}
            autoComplete={f.autoComplete}
          />
          {errors[f.name] && (
            <span className="auth__field-error">{errors[f.name]}</span>
          )}
        </div>
      ))}
      {errors.global && <p className="auth__error">{errors.global}</p>}
      <button type="submit" className="auth__button">
        Crear cuenta
      </button>
    </form>
  );
}

export default RegisterForm;
