import { describe, it, expect } from 'vitest'
import { validatePasswordStrength } from '../utils/passwordValidation'

describe('passwordValidation', () => {
  it('valida longitud mínima', () => {
    const result = validatePasswordStrength('Abc1')
    expect(result).toBe('La contraseña debe tener al menos 8 caracteres')
  })

  it('valida mayúscula y número requerido', () => {
    const result = validatePasswordStrength('abcdefg1')
    expect(result).toBe('La contraseña debe contener al menos una mayúscula y un número')
  })

  it('valida solo mayúscula sin número', () => {
    const result = validatePasswordStrength('Abcdefgh')
    expect(result).toBe('La contraseña debe contener al menos una mayúscula y un número')
  })

  it('retorna null para contraseña válida', () => {
    const result = validatePasswordStrength('Password1')
    expect(result).toBeNull()
  })

  it('valida contraseña vacía', () => {
    const result = validatePasswordStrength('')
    expect(result).toBe('La contraseña debe tener al menos 8 caracteres')
  })

  it('valida contraseña con solo 7 caracteres', () => {
    const result = validatePasswordStrength('Passw0r')
    expect(result).toBe('La contraseña debe tener al menos 8 caracteres')
  })
})
