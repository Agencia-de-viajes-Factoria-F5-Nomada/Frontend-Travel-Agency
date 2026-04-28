import { useState } from "react";

const buildPassengers = ({ adults = 0, children = 0, seniors = 0 }) => {
  const make = (type, n) =>
    Array.from({ length: n }, () => ({ type, name: "", lastname: "" }));
  return [
    ...make("adult", adults),
    ...make("child", children),
    ...make("senior", seniors),
  ];
};

export const useCheckoutForm = (counts) => {
  const [passengers, setPassengers] = useState(() => buildPassengers(counts));
  const [errors, setErrors] = useState({});

  const updatePassenger = (index, field, value) => {
    setPassengers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  const validate = () => {
    const trimmed = passengers.map((p) => ({
      ...p,
      name: p.name.trim(),
      lastname: p.lastname.trim(),
    }));

    const next = {};
    trimmed.forEach((p, i) => {
      if (!p.name) next[`${i}-name`] = "Nombre obligatorio";
      if (!p.lastname) next[`${i}-lastname`] = "Apellido obligatorio";
    });

    const hasAdult = trimmed.some((p) => p.type === "adult");
    const hasChild = trimmed.some((p) => p.type === "child");
    if (hasChild && !hasAdult) {
      next.global = "Un menor debe viajar acompañado de un adulto";
    }

    setPassengers(trimmed);
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  return { passengers, updatePassenger, validate, errors };
};
