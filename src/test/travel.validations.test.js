import { describe, it, expect } from 'vitest'

describe('travel validations', () => {
  const validateTravelForm = (form) => {
    const errors = {}
    if (!form.destiny) errors.destiny = 'El destino es requerido'
    if (!form.startDate) errors.startDate = 'La fecha de inicio es requerida'
    if (!form.endDate) errors.endDate = 'La fecha de fin es requerida'
    if (form.startDate && form.endDate && new Date(form.startDate) > new Date(form.endDate)) {
      errors.endDate = 'La fecha de fin debe ser posterior a la de inicio'
    }
    if (!form.price || form.price <= 0) errors.price = 'El precio debe ser mayor a 0'
    if (!form.availableSeats || form.availableSeats < 1) errors.availableSeats = 'Al menos 1 plaza disponible'
    return errors
  }

  it('retorna errores para formulario vacío', () => {
    const errors = validateTravelForm({})
    expect(errors.destiny).toBe('El destino es requerido')
    expect(errors.startDate).toBe('La fecha de inicio es requerida')
    expect(errors.endDate).toBe('La fecha de fin es requerida')
    expect(errors.price).toBe('El precio debe ser mayor a 0')
    expect(errors.availableSeats).toBe('Al menos 1 plaza disponible')
  })

  it('valida que la fecha de fin sea posterior a la de inicio', () => {
    const errors = validateTravelForm({
      destiny: 'París',
      startDate: '2026-12-01',
      endDate: '2026-11-01',
      price: 500,
      availableSeats: 10,
    })
    expect(errors.endDate).toBe('La fecha de fin debe ser posterior a la de inicio')
  })

  it('retorna objeto vacío para formulario válido', () => {
    const errors = validateTravelForm({
      destiny: 'París',
      startDate: '2026-06-01',
      endDate: '2026-06-15',
      price: 500,
      availableSeats: 10,
    })
    expect(Object.keys(errors).length).toBe(0)
  })

  it('valida precio mayor a 0', () => {
    const errors = validateTravelForm({
      destiny: 'París',
      startDate: '2026-06-01',
      endDate: '2026-06-15',
      price: 0,
      availableSeats: 10,
    })
    expect(errors.price).toBe('El precio debe ser mayor a 0')
  })

  it('valida plazas disponibles mínimas', () => {
    const errors = validateTravelForm({
      destiny: 'París',
      startDate: '2026-06-01',
      endDate: '2026-06-15',
      price: 500,
      availableSeats: 0,
    })
    expect(errors.availableSeats).toBe('Al menos 1 plaza disponible')
  })
})
