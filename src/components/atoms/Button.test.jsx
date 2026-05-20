import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Button from './Button'

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('Button', () => {
  it('renderiza children correctamente', () => {
    renderWithRouter(<Button>Hola mundo</Button>)
    expect(screen.getByText('Hola mundo')).toBeInTheDocument()
  })

  it('renderiza como botón por defecto', () => {
    const { container } = renderWithRouter(<Button>Test</Button>)
    expect(container.querySelector('button')).toBeInTheDocument()
  })

  it('renderiza como Link cuando tiene prop to', () => {
    renderWithRouter(<Button to="/ruta">Link</Button>)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/ruta')
  })

  it('renderiza como enlace cuando tiene prop href', () => {
    renderWithRouter(<Button href="https://example.com">External</Button>)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://example.com')
  })

  it('aplica variant primary por defecto', () => {
    const { container } = renderWithRouter(<Button>Test</Button>)
    expect(container.firstChild).toHaveClass('bg-brand-500')
  })

  it('aplica variant secondary', () => {
    const { container } = renderWithRouter(<Button variant="secondary">Test</Button>)
    expect(container.firstChild).toHaveClass('bg-surface-700')
  })

  it('aplica variant danger', () => {
    const { container } = renderWithRouter(<Button variant="danger">Test</Button>)
    expect(container.firstChild).toHaveClass('bg-status-pending')
  })

  it('aplica variant ghost', () => {
    const { container } = renderWithRouter(<Button variant="ghost">Test</Button>)
    expect(container.firstChild).toHaveClass('bg-transparent')
  })

  it('aplica tamaño small', () => {
    const { container } = renderWithRouter(<Button size="sm">Test</Button>)
    expect(container.firstChild).toHaveClass('h-9')
  })

  it('aplica tamaño large', () => {
    const { container } = renderWithRouter(<Button size="lg">Test</Button>)
    expect(container.firstChild).toHaveClass('h-12')
  })

  it('aplica fullWidth cuando está activo', () => {
    const { container } = renderWithRouter(<Button fullWidth>Test</Button>)
    expect(container.firstChild).toHaveClass('w-full')
  })

  it('no aplica fullWidth cuando no está activo', () => {
    const { container } = renderWithRouter(<Button>Test</Button>)
    expect(container.firstChild).not.toHaveClass('w-full')
  })

  it('pasa props adicionales al elemento', () => {
    renderWithRouter(<Button disabled>Test</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})