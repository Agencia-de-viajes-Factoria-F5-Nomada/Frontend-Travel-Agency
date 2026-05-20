import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Badge from './Badge'

describe('Badge', () => {
  it('renderiza children correctamente', () => {
    render(<Badge>Nuevo</Badge>)
    expect(screen.getByText('Nuevo')).toBeInTheDocument()
  })

  it('usa tono neutral por defecto', () => {
    const { container } = render(<Badge>Test</Badge>)
    expect(container.firstChild).toHaveClass('bg-surface-700')
  })

  it('aplica tono brand', () => {
    const { container } = render(<Badge tone="brand">Test</Badge>)
    expect(container.firstChild).toHaveClass('bg-brand-500/15')
  })

  it('aplica tono confirmed', () => {
    const { container } = render(<Badge tone="confirmed">Test</Badge>)
    expect(container.firstChild).toHaveClass('bg-status-confirmed/15')
  })

  it('aplica tono pending', () => {
    const { container } = render(<Badge tone="pending">Test</Badge>)
    expect(container.firstChild).toHaveClass('bg-status-pending/15')
  })

  it('aplica tono warning', () => {
    const { container } = render(<Badge tone="warning">Test</Badge>)
    expect(container.firstChild).toHaveClass('bg-status-warning/15')
  })

  it('aplica clases personalizadas', () => {
    const { container } = render(<Badge className="custom-class">Test</Badge>)
    expect(container.firstChild).toHaveClass('custom-class')
  })
})