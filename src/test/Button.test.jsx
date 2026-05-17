import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import Button from '../components/atoms/Button'

const wrap = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

describe('Button', () => {
  it('renderiza el texto', () => {
    wrap(<Button>Reservar</Button>)
    expect(screen.getByText('Reservar')).toBeInTheDocument()
  })

  it('llama al onClick al hacer click', () => {
    const handleClick = vi.fn()
    wrap(<Button onClick={handleClick}>Click</Button>)
    fireEvent.click(screen.getByText('Click'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('no dispara el onClick cuando está disabled', () => {
    const handleClick = vi.fn()
    wrap(<Button onClick={handleClick} disabled>Click</Button>)
    fireEvent.click(screen.getByText('Click'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('renderiza como enlace cuando recibe la prop to', () => {
    wrap(<Button to="/destinos">Ver destinos</Button>)
    expect(screen.getByRole('link', { name: 'Ver destinos' })).toBeInTheDocument()
  })

  it('aplica la variante danger', () => {
    wrap(<Button variant="danger">Eliminar</Button>)
    expect(screen.getByText('Eliminar')).toBeInTheDocument()
  })
})