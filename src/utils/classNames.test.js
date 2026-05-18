import { describe, it, expect } from 'vitest'
import { classNames } from './classNames'

describe('classNames', () => {
  it('concatena clases válidas', () => {
    expect(classNames('foo', 'bar')).toBe('foo bar')
  })

  it('filtra valores falsos', () => {
    expect(classNames('foo', false, null, undefined, 'bar')).toBe('foo bar')
  })

  it('filtra strings vacíos', () => {
    expect(classNames('foo', '', 'bar')).toBe('foo bar')
  })

  it('maneja solo strings válidos', () => {
    expect(classNames('foo', 'bar')).toBe('foo bar')
  })

  it('retorna string vacío si no hay valores válidos', () => {
    expect(classNames(false, null)).toBe('')
  })
})