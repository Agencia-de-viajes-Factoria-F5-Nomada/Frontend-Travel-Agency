import { Link } from "react-router-dom";
import LoginForm from "../../components/forms/LoginForm";

function LoginPage() {
  return (
    <div className="auth">
      <div className="auth__card">
        <h1 className="auth__title">Iniciar sesión</h1>
        <LoginForm />
        <p className="auth__hint">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
