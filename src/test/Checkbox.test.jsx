import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Checkbox from '../components/atoms/Checkbox'

describe('Checkbox', () => {
  it('renderiza correctamente con label', () => {
    render(<Checkbox label="Aceptar términos" />)
    expect(screen.getByText('Aceptar términos')).toBeInTheDocument()
  })

  it('llama onChange al hacer click', () => {
    const handleChange = vi.fn()
    render(<Checkbox checked={false} onChange={handleChange} label="Opción" />)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('se muestra checked cuando la prop checked es true', () => {
    render(<Checkbox checked={true} onChange={() => {}} label="Seleccionado" />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('se muestra unchecked cuando la prop checked es false', () => {
    render(<Checkbox checked={false} onChange={() => {}} label="No seleccionado" />)
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('se muestra disabled cuando la prop disabled es true', () => {
    render(<Checkbox disabled={true} label="Deshabilitado" />)
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })

  it('aplica className personalizado', () => {
    render(<Checkbox className="custom-class" label="Test" />)
    expect(screen.getByText('Test').parentElement).toHaveClass('custom-class')
  })

  it('aplica id cuando se proporciona', () => {
    render(<Checkbox id="custom-id" label="Test" />)
    expect(screen.getByLabelText('Test')).toHaveAttribute('id', 'custom-id')
  })

  it('usa name como id cuando no se proporciona id', () => {
    render(<Checkbox name="test-name" label="Test" />)
    expect(screen.getByLabelText('Test')).toHaveAttribute('id', 'test-name')
  })
})
