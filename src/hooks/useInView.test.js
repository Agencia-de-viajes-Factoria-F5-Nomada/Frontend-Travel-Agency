import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import useInView from './useInView'

describe('useInView', () => {
  let mockObserve
  let mockDisconnect

  beforeEach(() => {
    mockObserve = vi.fn()
    mockDisconnect = vi.fn()
    global.IntersectionObserver = vi.fn().mockImplementation(() => ({
      observe: mockObserve,
      disconnect: mockDisconnect,
    }))
    vi.clearAllMocks()
  })

  it('retorna un array con ref e inView', () => {
    const { result } = renderHook(() => useInView())
    expect(result.current).toHaveLength(2)
    expect(result.current[0]).toBeDefined()
    expect(typeof result.current[1]).toBe('boolean')
  })

  it('inView es false por defecto', () => {
    const { result } = renderHook(() => useInView())
    expect(result.current[1]).toBe(false)
  })

  it('acepta opciones de configuración', () => {
    const { result } = renderHook(() => useInView({
      rootMargin: '100px',
      threshold: 0.5
    }))
    expect(result.current[0]).toBeDefined()
  })

  it('retorna un objeto ref', () => {
    const { result } = renderHook(() => useInView())
    const [ref] = result.current

    expect(ref).toBeDefined()
    expect(ref.current).toBeDefined()
  })

  it('permite configurar root', () => {
    const { result } = renderHook(() => useInView({ root: document.body }))
    expect(result.current[0]).toBeDefined()
  })
})