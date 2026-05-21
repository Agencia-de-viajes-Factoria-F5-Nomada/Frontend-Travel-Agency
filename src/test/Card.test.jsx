import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Card from '../components/atoms/Card'

describe('Card', () => {
  it('renderiza como div por defecto', () => {
    render(<Card>Contenido</Card>)
    expect(screen.getByText('Contenido')).toBeInTheDocument()
  })

  it('renderiza como otro elemento cuando se pasa la prop as', () => {
    render(<Card as="section">Contenido</Card>)
    expect(screen.getByText('Contenido').tagName).toBe('SECTION')
  })

  it('aplica clases personalizadas', () => {
    render(<Card className="custom-class">Contenido</Card>)
    expect(screen.getByText('Contenido')).toHaveClass('custom-class')
  })

  it('aplica las clases base por defecto', () => {
    render(<Card>Contenido</Card>)
    const card = screen.getByText('Contenido')
    expect(card).toHaveClass('rounded-card')
    expect(card).toHaveClass('shadow-card')
  })

  it('renderiza children correctamente', () => {
    render(
      <Card>
        <h2>Título</h2>
        <p>Descripción</p>
      </Card>
    )
    expect(screen.getByText('Título')).toBeInTheDocument()
    expect(screen.getByText('Descripción')).toBeInTheDocument()
  })
})
