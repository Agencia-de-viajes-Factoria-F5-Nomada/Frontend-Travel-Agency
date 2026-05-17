import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { authService } from './authService'

const mockLocalStorage = (() => {
  let store = {}
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => { store[key] = value }),
    removeItem: vi.fn((key) => { delete store[key] }),
    clear: () => { store = {} }
  }
})()

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage })

global.fetch = vi.fn()

describe('authService', () => {
  beforeEach(() => {
    mockLocalStorage.clear()
    vi.clearAllMocks()
  })

  describe('login', () => {
    it('hace fetch correctamente', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ token: 'abc123', user: { id: 1, email: 'test@test.com' } })
      })

      await authService.login('test@test.com', 'password123')

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/login'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'test@test.com', password: 'password123' })
        })
      )
    })

    it('guarda token en localStorage', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ token: 'token123', user: { id: 1 } })
      })

      await authService.login('test@test.com', 'password')

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('token', 'token123')
    })

    it('guarda usuario en localStorage', async () => {
      const user = { id: 1, email: 'test@test.com', rol: 'USER' }
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ token: 'abc', user })
      })

      await authService.login('test@test.com', 'password')

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(user))
    })

    it('lanza error si response no es ok', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 401
      })

      await expect(authService.login('test@test.com', 'wrong')).rejects.toThrow('Credenciales incorrectas')
    })

    it('retorna datos del usuario', async () => {
      const data = { token: 'abc', user: { id: 1 } }
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => data
      })

      const result = await authService.login('test@test.com', 'password')

      expect(result).toEqual(data)
    })
  })

  describe('logout', () => {
    it('elimina token del localStorage', () => {
      mockLocalStorage.getItem.mockReturnValue('token123')

      authService.logout()

      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token')
    })

    it('elimina usuario del localStorage', () => {
      authService.logout()

      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('user')
    })
  })

  describe('isAuthenticated', () => {
    it('retorna true cuando hay token', () => {
      mockLocalStorage.getItem.mockReturnValue('token123')

      expect(authService.isAuthenticated()).toBe(true)
    })

    it('retorna false cuando no hay token', () => {
      mockLocalStorage.getItem.mockReturnValue(null)

      expect(authService.isAuthenticated()).toBe(false)
    })
  })

  describe('getUser', () => {
    it('retorna usuario parseado', () => {
      const user = { id: 1, rol: 'ADMIN' }
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(user))

      expect(authService.getUser()).toEqual(user)
    })

    it('retorna null cuando no hay usuario', () => {
      mockLocalStorage.getItem.mockReturnValue(null)

      expect(authService.getUser()).toBeNull()
    })
  })

  describe('isAdmin', () => {
    it('retorna true cuando rol es ADMIN (rol)', () => {
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ rol: 'ADMIN' }))

      expect(authService.isAdmin()).toBe(true)
    })

    it('retorna true cuando rol es ADMIN (role)', () => {
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ role: 'ADMIN' }))

      expect(authService.isAdmin()).toBe(true)
    })

    it('retorna false cuando no es admin', () => {
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ rol: 'USER' }))

      expect(authService.isAdmin()).toBe(false)
    })

    it('retorna false cuando no hay usuario', () => {
      mockLocalStorage.getItem.mockReturnValue(null)

      expect(authService.isAdmin()).toBe(false)
    })
  })
})