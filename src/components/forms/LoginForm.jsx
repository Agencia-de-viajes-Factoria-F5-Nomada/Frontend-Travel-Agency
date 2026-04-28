import { useLoginForm } from "../../hooks/useLoginForm";

function LoginForm() {
  const { form, error, updateField, submit } = useLoginForm();

  return (
    <form className="auth__form" onSubmit={submit} noValidate>
      <div className="auth__field">
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          autoComplete="email"
        />
      </div>
      <div className="auth__field">
        <label htmlFor="login-password">Contraseña</label>
        <input
          id="login-password"
          type="password"
          value={form.password}
          onChange={(e) => updateField("password", e.target.value)}
          autoComplete="current-password"
        />
      </div>
      {error && <p className="auth__error">{error}</p>}
      <button type="submit" className="auth__button">
        Entrar
      </button>
    </form>
  );
}

export default LoginForm;
