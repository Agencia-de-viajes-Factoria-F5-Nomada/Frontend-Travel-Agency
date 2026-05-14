import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { authService } from '../services/authService'

const makeToken = (payload) => {
  const header  = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body    = btoa(JSON.stringify(payload))
  return `${header}.${body}.signature`
}

beforeEach(() => localStorage.clear())
afterEach(() => localStorage.clear())

describe('authService.isAuthenticated', () => {
  it('returns false when no token', () => {
    expect(authService.isAuthenticated()).toBe(false)
  })

  it('returns true with a valid non-expired token', () => {
    const exp = Math.floor(Date.now() / 1000) + 3600
    localStorage.setItem('token', makeToken({ sub: 'user@test.com', exp }))
    expect(authService.isAuthenticated()).toBe(true)
  })

  it('returns false and clears storage when token is expired', () => {
    const exp = Math.floor(Date.now() / 1000) - 10
    localStorage.setItem('token', makeToken({ sub: 'user@test.com', exp }))
    expect(authService.isAuthenticated()).toBe(false)
    expect(localStorage.getItem('token')).toBeNull()
  })
})

describe('authService.isAdmin', () => {
  it('returns false when no user in storage', () => {
    expect(authService.isAdmin()).toBe(false)
  })

  it('returns true for ADMIN role', () => {
    localStorage.setItem('user', JSON.stringify({ rol: 'ADMIN' }))
    expect(authService.isAdmin()).toBe(true)
  })

  it('returns false for USER role', () => {
    localStorage.setItem('user', JSON.stringify({ rol: 'USER' }))
    expect(authService.isAdmin()).toBe(false)
  })
})

describe('authService.logout', () => {
  it('removes token and user from storage', () => {
    localStorage.setItem('token', 'abc')
    localStorage.setItem('user', '{}')
    authService.logout()
    expect(localStorage.getItem('token')).toBeNull()
    expect(localStorage.getItem('user')).toBeNull()
  })
})

describe('authService.login', () => {
  it('stores token and user on success', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ token: 'tok123', user: { id: 1, rol: 'USER' } }),
    })
    await authService.login('a@b.com', 'pass')
    expect(localStorage.getItem('token')).toBe('tok123')
    expect(JSON.parse(localStorage.getItem('user'))).toEqual({ id: 1, rol: 'USER' })
  })

  it('throws with server message on failure', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'Usuario no encontrado' }),
    })
    await expect(authService.login('bad@b.com', 'wrong')).rejects.toThrow('Usuario no encontrado')
  })
})