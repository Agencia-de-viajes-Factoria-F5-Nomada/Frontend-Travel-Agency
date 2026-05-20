import { describe, it, expect, vi } from 'vitest'
import { bookingService } from '../services/BookingService'

vi.mock('../services/api', () => ({
  apiClient: {
    get: vi.fn(() => Promise.resolve({ data: [] })),
    post: vi.fn(() => Promise.resolve({ data: {} })),
    put: vi.fn(() => Promise.resolve({ data: {} })),
    delete: vi.fn(() => Promise.resolve({})),
  },
}))

describe('bookingService', () => {
  it('tiene un método getAll', () => {
    expect(typeof bookingService.getAll).toBe('function')
  })

  it('tiene un método getById', () => {
    expect(typeof bookingService.getById).toBe('function')
  })

  it('tiene un método create', () => {
    expect(typeof bookingService.create).toBe('function')
  })

  it('tiene un método update', () => {
    expect(typeof bookingService.update).toBe('function')
  })

  it('tiene un método delete', () => {
    expect(typeof bookingService.delete).toBe('function')
  })
})
