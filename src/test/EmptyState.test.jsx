import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import EmptyState from '../components/molecules/EmptyState'
import { MapPin } from 'lucide-react'

describe('EmptyState', () => {
  it('renderiza el título por defecto', () => {
    render(<EmptyState />)
    expect(screen.getByText('No hay datos')).toBeInTheDocument()
  })

  it('renderiza un título personalizado', () => {
    render(<EmptyState title="Sin resultados" />)
    expect(screen.getByText('Sin resultados')).toBeInTheDocument()
  })

  it('renderiza la descripción cuando se proporciona', () => {
    render(<EmptyState description="No se encontraron viajes" />)
    expect(screen.getByText('No se encontraron viajes')).toBeInTheDocument()
  })

  it('no renderiza descripción cuando no se proporciona', () => {
    render(<EmptyState />)
    const descriptions = document.querySelectorAll('p')
    expect(descriptions.length).toBe(0)
  })

  it('renderiza el botón de acción cuando se proporcionan actionLabel y onAction', () => {
    render(<EmptyState actionLabel="Crear nuevo" onAction={() => {}} />)
    expect(screen.getByText('Crear nuevo')).toBeInTheDocument()
  })

  it('no renderiza botón cuando no se proporcionan actionLabel y onAction', () => {
    render(<EmptyState />)
    const buttons = screen.queryAllByRole('button')
    expect(buttons.length).toBe(0)
  })

  it('llama onAction al hacer click en el botón', () => {
    const handleAction = vi.fn()
    render(<EmptyState actionLabel="Acción" onAction={handleAction} />)
    fireEvent.click(screen.getByText('Acción'))
    expect(handleAction).toHaveBeenCalledTimes(1)
  })

  it('renderiza un icono personalizado', () => {
    render(<EmptyState icon={MapPin} title="Test" />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('aplica className personalizado', () => {
    render(<EmptyState className="custom-class" />)
    expect(screen.getByText('No hay datos').parentElement).toHaveClass('custom-class')
  })

  it('renderiza el icono por defecto', () => {
    render(<EmptyState />)
    const iconContainer = document.querySelector('.rounded-full')
    expect(iconContainer).toBeInTheDocument()
  })
})
