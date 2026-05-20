import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { authService } from '../services/authService'

describe('authService', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('login', () => {
    it('realiza login exitosamente', async () => {
      const mockResponse = {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZXhwIjo5OTk5OTk5OTk5fQ.abc123',
        user: { id: 1, name: 'Juan', email: 'juan@test.com' },
      }
      fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const result = await authService.login('juan@test.com', 'password123')
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/authentication/login'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ email: 'juan@test.com', password: 'password123' }),
        })
      )
      expect(result).toEqual(mockResponse)
      expect(localStorage.getItem('token')).toBe(mockResponse.token)
    })

    it('lanza error cuando las credenciales son incorrectas', async () => {
      fetch.mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ error: 'Credenciales incorrectas' }),
      })

      await expect(authService.login('wrong@test.com', 'wrongpass')).rejects.toThrow('Credenciales incorrectas')
    })
  })

  describe('logout', () => {
    it('elimina token y user del localStorage', () => {
      localStorage.setItem('token', 'test-token')
      localStorage.setItem('user', JSON.stringify({ id: 1 }))

      authService.logout(false)

      expect(localStorage.getItem('token')).toBeNull()
      expect(localStorage.getItem('user')).toBeNull()
    })
  })

  describe('isAuthenticated', () => {
    it('retorna false cuando no hay token', () => {
      expect(authService.isAuthenticated()).toBe(false)
    })

    it('retorna false cuando el token está expirado', () => {
      const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDAwMDAwMDB9.expired'
      localStorage.setItem('token', expiredToken)
      expect(authService.isAuthenticated()).toBe(false)
    })

    it('retorna true cuando el token es válido', () => {
      const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjk5OTk5OTk5OTl9.valid'
      localStorage.setItem('token', validToken)
      expect(authService.isAuthenticated()).toBe(true)
    })
  })

  describe('getUser', () => {
    it('retorna null cuando no hay user en localStorage', () => {
      expect(authService.getUser()).toBeNull()
    })

    it('retorna el user cuando existe en localStorage', () => {
      const mockUser = { id: 1, name: 'Juan', email: 'juan@test.com' }
      localStorage.setItem('user', JSON.stringify(mockUser))
      expect(authService.getUser()).toEqual(mockUser)
    })
  })

  describe('isAdmin', () => {
    it('retorna false cuando el user no es admin', () => {
      localStorage.setItem('user', JSON.stringify({ role: 'USER' }))
      expect(authService.isAdmin()).toBe(false)
    })

    it('retorna true cuando el user es ADMIN', () => {
      localStorage.setItem('user', JSON.stringify({ role: 'ADMIN' }))
      expect(authService.isAdmin()).toBe(true)
    })

    it('retorna true cuando el user tiene rol ADMIN', () => {
      localStorage.setItem('user', JSON.stringify({ rol: 'ADMIN' }))
      expect(authService.isAdmin()).toBe(true)
    })
  })

  describe('isTokenExpired', () => {
    it('retorna true cuando no hay token', () => {
      expect(authService.isTokenExpired()).toBe(true)
    })

    it('retorna true cuando el token está expirado', () => {
      const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDAwMDAwMDB9.expired'
      localStorage.setItem('token', expiredToken)
      expect(authService.isTokenExpired()).toBe(true)
    })

    it('retorna false cuando el token no está expirado', () => {
      const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjk5OTk5OTk5OTl9.valid'
      localStorage.setItem('token', validToken)
      expect(authService.isTokenExpired()).toBe(false)
    })
  })
})
