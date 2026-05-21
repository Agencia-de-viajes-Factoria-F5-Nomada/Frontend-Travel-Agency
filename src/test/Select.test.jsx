import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Select from '../components/atoms/Select'

const mockOptions = [
  { value: '1', label: 'Opción 1' },
  { value: '2', label: 'Opción 2' },
  { value: '3', label: 'Opción 3' },
]

describe('Select', () => {
  it('renderiza correctamente', () => {
    render(<Select options={mockOptions} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('muestra el placeholder por defecto', () => {
    render(<Select options={mockOptions} />)
    expect(screen.getByText('Seleccionar...')).toBeInTheDocument()
  })

  it('muestra un placeholder personalizado', () => {
    render(<Select options={mockOptions} placeholder="Elige una opción" />)
    expect(screen.getByText('Elige una opción')).toBeInTheDocument()
  })

  it('renderiza todas las opciones', () => {
    render(<Select options={mockOptions} />)
    expect(screen.getByText('Opción 1')).toBeInTheDocument()
    expect(screen.getByText('Opción 2')).toBeInTheDocument()
    expect(screen.getByText('Opción 3')).toBeInTheDocument()
  })

  it('llama onChange al seleccionar una opción', () => {
    const handleChange = vi.fn()
    render(<Select options={mockOptions} onChange={handleChange} />)
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '2' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('se muestra disabled cuando la prop disabled es true', () => {
    render(<Select options={mockOptions} disabled />)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('aplica clase de error cuando error es true', () => {
    render(<Select options={mockOptions} error />)
    expect(screen.getByRole('combobox')).toHaveClass('border-red-500')
  })

  it('aplica className personalizado', () => {
    render(<Select options={mockOptions} className="custom-class" />)
    expect(screen.getByRole('combobox')).toHaveClass('custom-class')
  })

  it('aplica id cuando se proporciona', () => {
    render(<Select options={mockOptions} id="custom-id" />)
    expect(screen.getByRole('combobox')).toHaveAttribute('id', 'custom-id')
  })

  it('usa name como id cuando no se proporciona id', () => {
    render(<Select options={mockOptions} name="select-name" />)
    expect(screen.getByRole('combobox')).toHaveAttribute('id', 'select-name')
  })

  it('aplica name correctamente', () => {
    render(<Select options={mockOptions} name="test-name" />)
    expect(screen.getByRole('combobox')).toHaveAttribute('name', 'test-name')
  })
})
