import { useState } from "react";

const buildTravelers = ({ adults = 0, children = 0, seniors = 0 }) => {
  const make = (type, n) =>
    Array.from({ length: n }, () => ({ type, name: "", lastname: "" }));
  return [
    ...make("adult", adults),
    ...make("child", children),
    ...make("senior", seniors),
  ];
};

export const useCheckoutForm = (passengerCounts) => {
  const [travelers, setTravelers] = useState(() =>
    buildTravelers(passengerCounts)
  );
  const [errors, setErrors] = useState({});

  const updateTraveler = (index, field, value) => {
    setTravelers((prev) =>
      prev.map((t, i) => (i === index ? { ...t, [field]: value } : t))
    );
    setErrors((prev) => {
      const key = `${index}-${field}`;
      if (!(key in prev) && !("global" in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      delete next.global;
      return next;
    });
  };

  const validate = () => {
    const trimmed = travelers.map((t) => ({
      ...t,
      name: t.name.trim(),
      lastname: t.lastname.trim(),
    }));

    const next = {};
    trimmed.forEach((t, i) => {
      if (!t.name) next[`${i}-name`] = "Nombre obligatorio";
      if (!t.lastname) next[`${i}-lastname`] = "Apellido obligatorio";
    });

    const hasAdult = trimmed.some((t) => t.type === "adult");
    const hasChild = trimmed.some((t) => t.type === "child");
    if (hasChild && !hasAdult) {
      next.global = "Un menor debe viajar acompañado de un adulto";
    }

    setTravelers(trimmed);
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  return { travelers, updateTraveler, validate, errors };
};
