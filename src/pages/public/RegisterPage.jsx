import { Link } from "react-router-dom";
import RegisterForm from "../../components/forms/RegisterForm";

function RegisterPage() {
  return (
    <div className="auth">
      <div className="auth__card">
        <h1 className="auth__title">Crear cuenta</h1>
        <RegisterForm />
        <p className="auth__hint">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
