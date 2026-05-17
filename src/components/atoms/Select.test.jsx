import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Select from './Select'

describe('Select', () => {
  const opciones = [
    { value: 'opt1', label: 'Opción 1' },
    { value: 'opt2', label: 'Opción 2' },
    { value: 'opt3', label: 'Opción 3' },
  ]

  it('renderiza select correctamente', () => {
    render(<Select options={opciones} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('muestra placeholder por defecto', () => {
    render(<Select options={opciones} />)
    expect(screen.getByText('Seleccionar...')).toBeInTheDocument()
  })

  it('muestra opciones proporcionadas', () => {
    render(<Select options={opciones} />)
    expect(screen.getByText('Opción 1')).toBeInTheDocument()
    expect(screen.getByText('Opción 2')).toBeInTheDocument()
    expect(screen.getByText('Opción 3')).toBeInTheDocument()
  })

  it('llama onChange al seleccionar', () => {
    const onChange = vi.fn()
    render(<Select options={opciones} onChange={onChange} />)
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'opt2' } })
    expect(onChange).toHaveBeenCalled()
  })

  it('muestra valor seleccionado', () => {
    render(<Select options={opciones} value="opt1" />)
    expect(screen.getByRole('combobox')).toHaveValue('opt1')
  })

  it('se desactiva con disabled', () => {
    render(<Select options={opciones} disabled />)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('aplica estilo de error', () => {
    const { container } = render(<Select options={opciones} error />)
    expect(container.querySelector('select')).toHaveClass('border-red-500')
  })

  it('acepta name e id', () => {
    render(<Select options={opciones} name="miSelect" id="miId" />)
    expect(screen.getByRole('combobox')).toHaveAttribute('name', 'miSelect')
    expect(screen.getByRole('combobox')).toHaveAttribute('id', 'miId')
  })
})