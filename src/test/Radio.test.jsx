import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Radio from '../components/atoms/Radio'

describe('Radio', () => {
  it('renderiza correctamente con label', () => {
    render(<Radio label="Opción 1" name="options" value="1" />)
    expect(screen.getByText('Opción 1')).toBeInTheDocument()
  })

  it('llama onChange al hacer click', () => {
    const handleChange = vi.fn()
    render(<Radio label="Opción" name="options" value="1" onChange={handleChange} />)
    fireEvent.click(screen.getByRole('radio'))
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('se muestra checked cuando la prop checked es true', () => {
    render(<Radio label="Seleccionado" name="options" value="1" checked={true} />)
    expect(screen.getByRole('radio')).toBeChecked()
  })

  it('se muestra unchecked cuando la prop checked es false', () => {
    render(<Radio label="No seleccionado" name="options" value="1" checked={false} />)
    expect(screen.getByRole('radio')).not.toBeChecked()
  })

  it('se muestra disabled cuando la prop disabled es true', () => {
    render(<Radio label="Deshabilitado" name="options" value="1" disabled={true} />)
    expect(screen.getByRole('radio')).toBeDisabled()
  })

  it('aplica className personalizado', () => {
    render(<Radio label="Test" name="options" value="1" className="custom-class" />)
    expect(screen.getByText('Test').parentElement).toHaveClass('custom-class')
  })
})
