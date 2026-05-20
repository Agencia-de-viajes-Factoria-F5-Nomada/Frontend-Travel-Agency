import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Card from './Card'

describe('Card', () => {
  it('renderiza children correctamente', () => {
    render(<Card>Contenido de tarjeta</Card>)
    expect(screen.getByText('Contenido de tarjeta')).toBeInTheDocument()
  })

  it('renderiza como div por defecto', () => {
    const { container } = render(<Card>Test</Card>)
    expect(container.querySelector('div')).toBeInTheDocument()
  })

  it('renderiza como elemento personalizado con prop as', () => {
    const { container } = render(<Card as="section">Test</Card>)
    expect(container.querySelector('section')).toBeInTheDocument()
  })

  it('renderiza como article con prop as', () => {
    const { container } = render(<Card as="article">Test</Card>)
    expect(container.querySelector('article')).toBeInTheDocument()
  })

  it('aplica clases base de tarjeta', () => {
    const { container } = render(<Card>Test</Card>)
    expect(container.firstChild).toHaveClass('rounded-card')
    expect(container.firstChild).toHaveClass('border')
  })

  it('acepta className personalizado', () => {
    const { container } = render(<Card className="mi-clase">Test</Card>)
    expect(container.firstChild).toHaveClass('mi-clase')
  })

  it('pasa props adicionales al elemento', () => {
    const { container } = render(<Card data-testid="test-card">Test</Card>)
    expect(container.firstChild).toHaveAttribute('data-testid', 'test-card')
  })
})