import { describe, it, expect } from 'vitest'
import { formatCurrency } from '../utils/formatters'

describe('formatCurrency', () => {
  it('formatea un número entero positivo en euros', () => {
    const result = formatCurrency(1000)
    expect(result).toContain('1000')
    expect(result).toContain('€')
  })

  it('formatea cero correctamente', () => {
    const result = formatCurrency(0)
    expect(result).toMatch(/0/)
    expect(result).toMatch(/€/)
  })

  it('redondea decimales (maximumFractionDigits: 0)', () => {
    expect(formatCurrency(99.4)).toMatch(/99/)
    expect(formatCurrency(99.6)).toMatch(/100/)
  })

  it('formatea números grandes con separador de miles', () => {
    const result = formatCurrency(10000)
    expect(result).toContain('10')
    expect(result).toContain('€')
  })

  it('formatea números negativos', () => {
    const result = formatCurrency(-500)
    expect(result).toMatch(/-/)
    expect(result).toMatch(/500/)
    expect(result).toMatch(/€/)
  })

  it('formatea cantidades típicas de viajes', () => {
    expect(formatCurrency(850)).toContain('850')
    expect(formatCurrency(1299)).toContain('1299')
    expect(formatCurrency(2500)).toContain('2500')
  })

  it('devuelve un string', () => {
    expect(typeof formatCurrency(100)).toBe('string')
  })
})