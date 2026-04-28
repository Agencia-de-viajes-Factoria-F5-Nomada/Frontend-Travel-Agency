import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const INITIAL = { name: "", lastname: "", email: "", password: "" };
const EMAIL_RE = /^\S+@\S+\.\S+$/;

const validate = (data) => {
  const errors = {};
  if (!data.name) errors.name = "Nombre obligatorio";
  if (!data.lastname) errors.lastname = "Apellido obligatorio";
  if (!data.email) errors.email = "Email obligatorio";
  else if (!EMAIL_RE.test(data.email)) errors.email = "Email no válido";
  if (!data.password) errors.password = "Contraseña obligatoria";
  else if (data.password.length < 4) errors.password = "Mínimo 4 caracteres";
  return errors;
};

export const useRegisterForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!(field in prev) && !("global" in prev)) return prev;
      const next = { ...prev };
      delete next[field];
      delete next.global;
      return next;
    });
  };

  const submit = (e) => {
    e.preventDefault();
    const trimmed = {
      name: form.name.trim(),
      lastname: form.lastname.trim(),
      email: form.email.trim(),
      password: form.password,
    };
    const fieldErrors = validate(trimmed);
    if (Object.keys(fieldErrors).length > 0) {
      setForm(trimmed);
      setErrors(fieldErrors);
      return;
    }
    const result = register(trimmed);
    if (!result.ok) {
      setErrors({ global: result.error });
      return;
    }
    navigate("/profile");
  };

  return { form, errors, updateField, submit };
};
