import { describe, it, expect } from 'vitest'

// Lógica extraída de CheckoutPage para poder testearla de forma aislada
const hasMinorWithoutAdult = (passengers) => {
  const hasMinor = passengers.some(p => p.tarifa === 'CHILD')
  const hasAdult = passengers.some(p => p.tarifa === 'ADULT' || p.tarifa === 'PENSIONER')
  return hasMinor && !hasAdult
}

const calcularPrecioBase = (tarifa, halfBoardPrice, fullBoardPrice, typeBoard) => {
  const precio = typeBoard === 'HALF_BOARD' ? halfBoardPrice : fullBoardPrice
  if (tarifa === 'CHILD')     return precio * 0.5
  if (tarifa === 'PENSIONER') return precio * 0.8
  return precio
}

describe('Validación: menor sin adulto', () => {
  it('detecta un menor sin adulto', () => {
    const passengers = [{ tarifa: 'CHILD' }]
    expect(hasMinorWithoutAdult(passengers)).toBe(true)
  })

  it('permite menor acompañado de adulto', () => {
    const passengers = [{ tarifa: 'CHILD' }, { tarifa: 'ADULT' }]
    expect(hasMinorWithoutAdult(passengers)).toBe(false)
  })

  it('permite menor acompañado de pensionista', () => {
    const passengers = [{ tarifa: 'CHILD' }, { tarifa: 'PENSIONER' }]
    expect(hasMinorWithoutAdult(passengers)).toBe(false)
  })

  it('no falla si solo hay adultos', () => {
    const passengers = [{ tarifa: 'ADULT' }, { tarifa: 'ADULT' }]
    expect(hasMinorWithoutAdult(passengers)).toBe(false)
  })

  it('no falla con lista vacía', () => {
    expect(hasMinorWithoutAdult([])).toBe(false)
  })
})

describe('Cálculo de tarifas por pasajero', () => {
  const HALF = 100
  const FULL = 150

  it('adulto paga precio completo en media pensión', () => {
    expect(calcularPrecioBase('ADULT', HALF, FULL, 'HALF_BOARD')).toBe(100)
  })

  it('adulto paga precio completo en pensión completa', () => {
    expect(calcularPrecioBase('ADULT', HALF, FULL, 'FULL_BOARD')).toBe(150)
  })

  it('niño paga el 50% del precio', () => {
    expect(calcularPrecioBase('CHILD', HALF, FULL, 'HALF_BOARD')).toBe(50)
  })

  it('pensionista paga el 80% del precio', () => {
    expect(calcularPrecioBase('PENSIONER', HALF, FULL, 'HALF_BOARD')).toBe(80)
  })

  it('pensionista en pensión completa paga el 80% del precio completo', () => {
    expect(calcularPrecioBase('PENSIONER', HALF, FULL, 'FULL_BOARD')).toBe(120)
  })
})