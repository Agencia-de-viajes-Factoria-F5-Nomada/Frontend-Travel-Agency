import { describe, it, expect, vi } from 'vitest'
import { travelService } from '../services/TravelsService'

vi.mock('../services/api', () => ({
  apiClient: {
    get: vi.fn(() => Promise.resolve({ data: [] })),
    post: vi.fn(() => Promise.resolve({ data: {} })),
    put: vi.fn(() => Promise.resolve({ data: {} })),
    delete: vi.fn(() => Promise.resolve({})),
  },
}))

describe('travelService', () => {
  it('tiene un método getAll', () => {
    expect(typeof travelService.getAll).toBe('function')
  })

  it('tiene un método getFeatured', () => {
    expect(typeof travelService.getFeatured).toBe('function')
  })

  it('tiene un método getById', () => {
    expect(typeof travelService.getById).toBe('function')
  })

  it('tiene un método create', () => {
    expect(typeof travelService.create).toBe('function')
  })

  it('tiene un método update', () => {
    expect(typeof travelService.update).toBe('function')
  })

  it('tiene un método delete', () => {
    expect(typeof travelService.delete).toBe('function')
  })

  it('tiene un método getAvailable', () => {
    expect(typeof travelService.getAvailable).toBe('function')
  })
})
