export const validatePasswordStrength = (password) => {
  if (password.length < 8) {
    return 'La contraseña debe tener al menos 8 caracteres'
  }

  if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
    return 'La contraseña debe contener al menos una mayúscula y un número'
  }

  return null
}
