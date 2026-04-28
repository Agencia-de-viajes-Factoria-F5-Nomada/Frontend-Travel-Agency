import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export const useLoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const submit = (e) => {
    e.preventDefault();
    const email = form.email.trim();
    const password = form.password;
    if (!email || !password) {
      setError("Email y contraseña son obligatorios");
      return;
    }
    const result = login(email, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate("/profile");
  };

  return { form, error, updateField, submit };
};
