import { describe, it, expect } from 'vitest'
import { classNames } from '../utils/classNames'

describe('classNames', () => {
  it('une varias clases en un string', () => {
    expect(classNames('foo', 'bar')).toBe('foo bar')
  })

  it('ignora valores falsy', () => {
    expect(classNames('foo', false, null, undefined, '', 'bar')).toBe('foo bar')
  })

  it('devuelve string vacío si no recibe ningún valor válido', () => {
    expect(classNames(false, null, undefined)).toBe('')
  })

  it('funciona con una sola clase', () => {
    expect(classNames('solo')).toBe('solo')
  })

  it('acepta clases condicionales correctamente', () => {
    const activo = true
    const inactivo = false
    expect(classNames('base', activo && 'activo', inactivo && 'inactivo')).toBe('base activo')
  })
})