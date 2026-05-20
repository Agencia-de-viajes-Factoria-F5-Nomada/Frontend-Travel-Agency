import { describe, it, expect } from 'vitest'

describe('checkout validations', () => {
  const validateCheckoutForm = (form) => {
    const errors = {}
    if (!form.name) errors.name = 'El nombre es requerido'
    if (!form.email) errors.email = 'El email es requerido'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Email inválido'
    if (!form.phone) errors.phone = 'El teléfono es requerido'
    if (!form.passengers || form.passengers < 1) errors.passengers = 'Al menos 1 pasajero'
    return errors
  }

  it('retorna errores para formulario vacío', () => {
    const errors = validateCheckoutForm({})
    expect(errors.name).toBe('El nombre es requerido')
    expect(errors.email).toBe('El email es requerido')
    expect(errors.phone).toBe('El teléfono es requerido')
    expect(errors.passengers).toBe('Al menos 1 pasajero')
  })

  it('retorna errores para email inválido', () => {
    const errors = validateCheckoutForm({
      name: 'Juan',
      email: 'invalid-email',
      phone: '123456789',
      passengers: 1,
    })
    expect(errors.email).toBe('Email inválido')
  })

  it('retorna objeto vacío para formulario válido', () => {
    const errors = validateCheckoutForm({
      name: 'Juan',
      email: 'juan@test.com',
      phone: '123456789',
      passengers: 2,
    })
    expect(Object.keys(errors).length).toBe(0)
  })

  it('valida pasajeros mínimos', () => {
    const errors = validateCheckoutForm({
      name: 'Juan',
      email: 'juan@test.com',
      phone: '123456789',
      passengers: 0,
    })
    expect(errors.passengers).toBe('Al menos 1 pasajero')
  })
})
