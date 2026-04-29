import { useLoginForm } from "../../hooks/useLoginForm";
import TextField from "../common/TextField";

function LoginForm() {
  const { form, error, updateField, submit } = useLoginForm();

  return (
    <form className="auth__form" onSubmit={submit} noValidate>
      <TextField
        name="email"
        label="Email"
        type="email"
        value={form.email}
        onChange={(v) => updateField("email", v)}
        autoComplete="email"
      />
      <TextField
        name="password"
        label="Contraseña"
        type="password"
        value={form.password}
        onChange={(v) => updateField("password", v)}
        autoComplete="current-password"
      />
      {error && <p className="auth__error">{error}</p>}
      <button type="submit" className="auth__button">
        Entrar
      </button>
    </form>
  );
}

export default LoginForm;
