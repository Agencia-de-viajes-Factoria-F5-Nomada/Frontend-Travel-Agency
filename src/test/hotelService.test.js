import { describe, it, expect, beforeEach, vi } from 'vitest'
import { hotelService } from '../services/HotelService'

beforeEach(() => {
  localStorage.setItem('token', 'test-token')
})

const mockFetch = (body, ok = true) => {
  global.fetch = vi.fn().mockResolvedValue({
    ok,
    json: async () => body,
  })
}

describe('hotelService.getAll', () => {
  it('returns hotel list on success', async () => {
    const hotels = [{ id: 1, name: 'Hotel Sol' }]
    mockFetch(hotels)
    const result = await hotelService.getAll()
    expect(result).toEqual(hotels)
  })

  it('throws on error response', async () => {
    mockFetch({}, false)
    await expect(hotelService.getAll()).rejects.toThrow('Error al cargar hoteles')
  })
})

describe('hotelService.create', () => {
  it('sends POST and returns created hotel', async () => {
    const hotel = { id: 2, name: 'Hotel Luna' }
    mockFetch(hotel)
    const result = await hotelService.create({ name: 'Hotel Luna' })
    expect(result).toEqual(hotel)
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/hotels'),
      expect.objectContaining({ method: 'POST' })
    )
  })
})

describe('hotelService.delete', () => {
  it('returns true on success', async () => {
    mockFetch(null)
    const result = await hotelService.delete(1)
    expect(result).toBe(true)
  })

  it('throws on error', async () => {
    mockFetch({}, false)
    await expect(hotelService.delete(1)).rejects.toThrow('Error al eliminar hotel')
  })
})