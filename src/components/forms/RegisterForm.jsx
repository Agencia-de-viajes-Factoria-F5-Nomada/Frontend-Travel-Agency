import { useRegisterForm } from "../../hooks/useRegisterForm";
import TextField from "../common/TextField";

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
        <TextField
          key={f.name}
          name={f.name}
          label={f.label}
          type={f.type}
          autoComplete={f.autoComplete}
          value={form[f.name]}
          error={errors[f.name]}
          onChange={(v) => updateField(f.name, v)}
        />
      ))}
      {errors.global && <p className="auth__error">{errors.global}</p>}
      <button type="submit" className="auth__button">
        Crear cuenta
      </button>
    </form>
  );
}

export default RegisterForm;
