import { describe, it, expect } from 'vitest'
import { classNames } from '../utils/classNames'

describe('classNames', () => {
  it('combina strings de clases', () => {
    expect(classNames('class1', 'class2')).toBe('class1 class2')
  })

  it('ignora valores falsy', () => {
    expect(classNames('class1', false, null, undefined, 'class2')).toBe('class1 class2')
  })

  it('maneja arrays de clases', () => {
    expect(classNames('class1', 'class2')).toBe('class1 class2')
  })

  it('combina múltiples tipos', () => {
    expect(classNames('base', 'class1', 'class2')).toBe('base class1 class2')
  })

  it('retorna string vacío sin argumentos', () => {
    expect(classNames()).toBe('')
  })

  it('filtra strings vacíos', () => {
    expect(classNames('', 'class1', '')).toBe('class1')
  })

  it('maneja clases duplicadas', () => {
    expect(classNames('class1', 'class1')).toBe('class1 class1')
  })

  it('maneja números como clases', () => {
    expect(classNames('prefix', 123)).toBe('prefix 123')
  })
})
