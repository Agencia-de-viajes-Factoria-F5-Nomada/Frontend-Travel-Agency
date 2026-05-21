import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SelectField from '../components/molecules/SelectField'

describe('SelectField', () => {
  const mockOptions = [
    { value: '1', label: 'Opción 1' },
    { value: '2', label: 'Opción 2' },
  ]

  it('renderiza correctamente', () => {
    render(<SelectField label="Seleccionar" options={mockOptions} />)
    expect(screen.getByText('Seleccionar')).toBeInTheDocument()
  })

  it('renderiza el select', () => {
    render(<SelectField label="Test" options={mockOptions} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('muestra las opciones', () => {
    render(<SelectField label="Test" options={mockOptions} />)
    expect(screen.getByText('Opción 1')).toBeInTheDocument()
    expect(screen.getByText('Opción 2')).toBeInTheDocument()
  })

  it('llama onChange al seleccionar', () => {
    const handleChange = vi.fn()
    render(<SelectField label="Test" options={mockOptions} onChange={handleChange} />)
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '2' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('muestra error cuando se proporciona', () => {
    render(<SelectField label="Test" options={mockOptions} error="Campo requerido" />)
    expect(screen.getByText('Campo requerido')).toBeInTheDocument()
  })

  it('muestra hint cuando se proporciona', () => {
    render(<SelectField label="Test" options={mockOptions} hint="Selecciona una opción" />)
    expect(screen.getByText('Selecciona una opción')).toBeInTheDocument()
  })

  it('se muestra disabled', () => {
    render(<SelectField label="Test" options={mockOptions} disabled />)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('aplica className personalizado', () => {
    render(<SelectField label="Test" options={mockOptions} className="custom-class" />)
    expect(screen.getByText('Test').parentElement).toHaveClass('custom-class')
  })
})
