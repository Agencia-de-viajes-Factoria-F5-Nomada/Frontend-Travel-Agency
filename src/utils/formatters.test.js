import { describe, it, expect } from 'vitest'
import { formatCurrency } from './formatters'

describe('formatCurrency', () => {
  it('formatea número y termina con €', () => {
    expect(formatCurrency(1000)).toContain('€')
  })

  it('formatea número grande', () => {
    expect(formatCurrency(100000)).toContain('100')
  })

  it('maneja cero', () => {
    expect(formatCurrency(0)).toContain('0')
  })

  it('redondea números decimales', () => {
    expect(formatCurrency(1000.99)).toBe(formatCurrency(1001))
  })

  it('maneja números negativos', () => {
    expect(formatCurrency(-500)).toContain('-')
  })
})