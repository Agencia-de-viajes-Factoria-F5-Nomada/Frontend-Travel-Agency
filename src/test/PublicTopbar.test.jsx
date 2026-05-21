import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import PublicTopbar from '../components/layout/PublicTopbar'
import { authService } from '../services/authService'

vi.mock('../services/authService', () => ({
  authService: {
    isAdmin: vi.fn(),
    isAuthenticated: vi.fn(),
    getUser: vi.fn(),
  },
}))

const wrap = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

describe('PublicTopbar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    authService.isAdmin.mockReturnValue(false)
    authService.isAuthenticated.mockReturnValue(false)
    authService.getUser.mockReturnValue(null)
  })

  it('renderiza el logo/brand', () => {
    wrap(<PublicTopbar />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renderiza el botón de menú móvil', () => {
    wrap(<PublicTopbar />)
    const menuButton = screen.getByRole('button', { name: /Abrir menu/i })
    expect(menuButton).toBeInTheDocument()
  })

  it('abre el menú móvil al hacer click', () => {
    wrap(<PublicTopbar />)
    const menuButton = screen.getByRole('button', { name: /Abrir menu/i })
    fireEvent.click(menuButton)
    expect(screen.getByRole('button', { name: /Cerrar menu/i })).toBeInTheDocument()
  })

  it('cierra el menú móvil al hacer click nuevamente', () => {
    wrap(<PublicTopbar />)
    const menuButton = screen.getByRole('button', { name: /Abrir menu/i })
    fireEvent.click(menuButton)
    fireEvent.click(screen.getByRole('button', { name: /Cerrar menu/i }))
    expect(screen.getByRole('button', { name: /Abrir menu/i })).toBeInTheDocument()
  })

  it('muestra navegación principal en desktop', () => {
    wrap(<PublicTopbar />)
    expect(screen.getByRole('navigation', { name: 'Principal' })).toBeInTheDocument()
  })

  it('muestra navegación móvil cuando está abierto', () => {
    wrap(<PublicTopbar />)
    const menuButton = screen.getByRole('button', { name: /Abrir menu/i })
    fireEvent.click(menuButton)
    expect(screen.getByRole('navigation', { name: 'Principal movil' })).toBeInTheDocument()
  })
})
