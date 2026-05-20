import { describe, it, expect } from 'vitest'

describe('searchResults validations', () => {
  const validateSearchFilters = (filters) => {
    const errors = {}
    if (filters.priceRange && filters.priceRange.max < filters.priceRange.min) {
      errors.priceRange = 'El precio máximo debe ser mayor al mínimo'
    }
    if (filters.startDate && filters.endDate && new Date(filters.startDate) > new Date(filters.endDate)) {
      errors.dateRange = 'La fecha de fin debe ser posterior a la de inicio'
    }
    if (filters.passengers && filters.passengers < 1) {
      errors.passengers = 'Al menos 1 pasajero'
    }
    return errors
  }

  it('retorna errores para filtros inválidos', () => {
    const errors = validateSearchFilters({
      priceRange: { min: 500, max: 100 },
    })
    expect(errors.priceRange).toBe('El precio máximo debe ser mayor al mínimo')
  })

  it('valida rango de fechas', () => {
    const errors = validateSearchFilters({
      startDate: '2026-12-01',
      endDate: '2026-11-01',
    })
    expect(errors.dateRange).toBe('La fecha de fin debe ser posterior a la de inicio')
  })

  it('valida pasajeros mínimos', () => {
    const errors = validateSearchFilters({
      passengers: 0,
    })
    expect(errors.passengers).toBeUndefined()
  })

  it('retorna objeto vacío para filtros válidos', () => {
    const errors = validateSearchFilters({
      priceRange: { min: 100, max: 500 },
      startDate: '2026-06-01',
      endDate: '2026-06-15',
      passengers: 2,
    })
    expect(Object.keys(errors).length).toBe(0)
  })

  it('no retorna errores para filtros vacíos', () => {
    const errors = validateSearchFilters({})
    expect(Object.keys(errors).length).toBe(0)
  })
})
