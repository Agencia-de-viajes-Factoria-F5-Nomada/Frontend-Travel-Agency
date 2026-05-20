import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Badge from '../components/atoms/Badge'

describe('Badge', () => {
  it('renderiza correctamente', () => {
    render(<Badge>Etiqueta</Badge>)
    expect(screen.getByText('Etiqueta')).toBeInTheDocument()
  })

  it('aplica variante neutral por defecto', () => {
    render(<Badge>Neutral</Badge>)
    expect(screen.getByText('Neutral')).toHaveClass('bg-surface-700')
  })

  it('aplica variante brand', () => {
    render(<Badge tone="brand">Brand</Badge>)
    expect(screen.getByText('Brand')).toHaveClass('bg-brand-500/15')
  })

  it('aplica variante confirmed', () => {
    render(<Badge tone="confirmed">Confirmed</Badge>)
    expect(screen.getByText('Confirmed')).toHaveClass('bg-status-confirmed/15')
  })

  it('aplica variante pending', () => {
    render(<Badge tone="pending">Pending</Badge>)
    expect(screen.getByText('Pending')).toHaveClass('bg-status-pending/15')
  })

  it('aplica variante warning', () => {
    render(<Badge tone="warning">Warning</Badge>)
    expect(screen.getByText('Warning')).toHaveClass('bg-status-warning/15')
  })

  it('aplica clases personalizadas', () => {
    render(<Badge className="custom-class">Custom</Badge>)
    expect(screen.getByText('Custom')).toHaveClass('custom-class')
  })

  it('renderiza children correctamente', () => {
    render(<Badge><span>Contenido</span></Badge>)
    expect(screen.getByText('Contenido')).toBeInTheDocument()
  })
})
