import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Package, Home } from 'lucide-react'
import EmptyState from './EmptyState'

describe('EmptyState', () => {
  it('renderiza título por defecto', () => {
    render(<EmptyState />)
    expect(screen.getByText('No hay datos')).toBeInTheDocument()
  })

  it('renderiza título personalizado', () => {
    render(<EmptyState title="Sin resultados" />)
    expect(screen.getByText('Sin resultados')).toBeInTheDocument()
  })

  it('renderiza descripción cuando se proporciona', () => {
    render(<EmptyState description="No se encontraron elementos" />)
    expect(screen.getByText('No se encontraron elementos')).toBeInTheDocument()
  })

  it('no renderiza descripción cuando no se proporciona', () => {
    const { container } = render(<EmptyState />)
    expect(container.querySelectorAll('p').length).toBe(0)
  })

  it('renderiza icono por defecto (Package)', () => {
    render(<EmptyState />)
    expect(document.querySelector('.rounded-full')).toBeInTheDocument()
  })

  it('renderiza icono personalizado', () => {
    render(<EmptyState icon={Home} />)
    expect(document.querySelector('.rounded-full')).toBeInTheDocument()
  })

  it('renderiza botón de acción cuando se proporcionan actionLabel y onAction', () => {
    render(<EmptyState actionLabel="Crear nuevo" onAction={() => {}} />)
    expect(screen.getByRole('button', { name: 'Crear nuevo' })).toBeInTheDocument()
  })

  it('no renderiza botón cuando falta actionLabel', () => {
    render(<EmptyState onAction={() => {}} />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('no renderiza botón cuando falta onAction', () => {
    render(<EmptyState actionLabel="Crear nuevo" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('llama a onAction al hacer click en el botón', () => {
    const onAction = vi.fn()
    render(<EmptyState actionLabel="Crear" onAction={onAction} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onAction).toHaveBeenCalledTimes(1)
  })

  it('acepta className personalizado', () => {
    const { container } = render(<EmptyState className="custom-empty" />)
    expect(container.firstChild).toHaveClass('custom-empty')
  })
})