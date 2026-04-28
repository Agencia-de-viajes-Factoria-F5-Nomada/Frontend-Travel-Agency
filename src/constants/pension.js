export const PENSION_LABELS = {
  media: "Media pensión",
  completa: "Pensión completa",
};

export const getPensionLabel = (type) => PENSION_LABELS[type] ?? "";
