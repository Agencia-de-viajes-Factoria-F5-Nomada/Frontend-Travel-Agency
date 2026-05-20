import { describe, it, expect } from 'vitest'
import { formatCurrency, formatDate, formatDateTime } from '../utils/formatters'

describe('formatters', () => {
  describe('formatCurrency', () => {
    it('formatea un número como moneda', () => {
      const result = formatCurrency(100)
      expect(result).toMatch(/100/)
    })

    it('formatea decimales correctamente', () => {
      const result = formatCurrency(99.99)
      expect(result).toMatch(/100/)
    })

    it('formatea números grandes', () => {
      const result = formatCurrency(1000)
      expect(result).toMatch(/1000/)
    })

    it('formatea cero', () => {
      const result = formatCurrency(0)
      expect(result).toMatch(/0/)
    })
  })

  describe('formatDate', () => {
    it('formatea una fecha string correctamente', () => {
      expect(formatDate('2026-06-15')).toBe('15/06/2026')
    })

    it('retorna string vacío para fecha vacía', () => {
      expect(formatDate('')).toBe('')
    })

    it('retorna string vacío para null/undefined', () => {
      expect(formatDate(null)).toBe('')
      expect(formatDate(undefined)).toBe('')
    })
  })
})
