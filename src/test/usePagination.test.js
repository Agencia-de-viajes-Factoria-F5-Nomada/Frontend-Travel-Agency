import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import usePagination from '../hooks/usePagination'

describe('usePagination', () => {
  const mockFetchFn = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('inicializa con valores por defecto', () => {
    const { result } = renderHook(() => usePagination(mockFetchFn))
    expect(result.current.data).toEqual([])
    expect(result.current.page).toBe(0)
    expect(result.current.totalPages).toBe(0)
    expect(result.current.totalElements).toBe(0)
    expect(result.current.size).toBe(10)
    expect(result.current.loading).toBe(false)
  })
})
