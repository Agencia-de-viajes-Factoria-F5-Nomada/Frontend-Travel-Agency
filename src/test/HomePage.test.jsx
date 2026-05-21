import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import HomePage from '../pages/HomePage'
import { authService } from '../services/authService'
import { travelService } from '../services/TravelsService'

vi.mock('../services/authService', () => ({
  authService: {
    isAuthenticated: vi.fn(),
    getUser: vi.fn(),
    login: vi.fn(),
    logout: vi.fn(),
  },
}))

vi.mock('../services/TravelsService', () => ({
  travelService: {
    getFeatured: vi.fn(),
  },
}))

vi.mock('../services/api', () => ({
  apiClient: {
    post: vi.fn(),
  },
}))

const wrap = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    authService.isAuthenticated.mockReturnValue(false)
    authService.getUser.mockReturnValue(null)
  })

  it('renderiza el título cuando no está logueado', () => {
    wrap(<HomePage />)
    expect(screen.getByText('Bienvenido a Nómada')).toBeInTheDocument()
  })

  it('renderiza el formulario de login cuando no está logueado', () => {
    wrap(<HomePage />)
    expect(screen.getByLabelText('Correo electrónico')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
  })

  it('renderiza tabs de login y signup', () => {
    wrap(<HomePage />)
    expect(screen.getAllByText('Iniciar sesión').length).toBeGreaterThan(0)
    expect(screen.getByText('Crear cuenta')).toBeInTheDocument()
  })

  it('renderiza mensaje de bienvenida cuando está logueado', () => {
    authService.isAuthenticated.mockReturnValue(true)
    authService.getUser.mockReturnValue({ name: 'Juan' })
    travelService.getFeatured.mockResolvedValue([])

    wrap(<HomePage />)
    expect(screen.getByText(/¡Bienvenido de nuevo, Juan!/)).toBeInTheDocument()
  })

  it('renderiza botones de navegación cuando está logueado', () => {
    authService.isAuthenticated.mockReturnValue(true)
    authService.getUser.mockReturnValue({ name: 'Juan' })
    travelService.getFeatured.mockResolvedValue([])

    wrap(<HomePage />)
    expect(screen.getByText('Ver todos los destinos')).toBeInTheDocument()
    expect(screen.getByText('Crear viaje personalizado')).toBeInTheDocument()
  })

  it('renderiza sección de destinos destacados cuando está logueado', () => {
    authService.isAuthenticated.mockReturnValue(true)
    authService.getUser.mockReturnValue({ name: 'Juan' })
    travelService.getFeatured.mockResolvedValue([])

    wrap(<HomePage />)
    expect(screen.getByText('Destinos destacados')).toBeInTheDocument()
  })
})
