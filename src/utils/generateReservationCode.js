const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export const generateReservationCode = () => {
  const year = new Date().getFullYear();
  let suffix = "";
  for (let i = 0; i < 5; i++) {
    suffix += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return `TRV-${year}-${suffix}`;
};
