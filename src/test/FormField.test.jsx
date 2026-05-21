import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import FormField from '../components/molecules/FormField'

describe('FormField', () => {
  it('renderiza el label correctamente', () => {
    render(<FormField label="Nombre" name="name" />)
    expect(screen.getByText('Nombre')).toBeInTheDocument()
  })

  it('muestra el asterisco cuando es requerido', () => {
    render(<FormField label="Email" name="email" required />)
    const asterisk = screen.getByText('*')
    expect(asterisk).toBeInTheDocument()
  })

  it('renderiza el input', () => {
    render(<FormField label="Nombre" name="name" />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('muestra el hint cuando se proporciona', () => {
    render(<FormField label="Contraseña" name="password" hint="Mínimo 8 caracteres" />)
    expect(screen.getByText('Mínimo 8 caracteres')).toBeInTheDocument()
  })

  it('muestra el error cuando se proporciona', () => {
    render(<FormField label="Email" name="email" error="Email inválido" />)
    expect(screen.getByText('Email inválido')).toBeInTheDocument()
  })

  it('oculta el hint cuando hay error', () => {
    render(<FormField label="Email" name="email" hint="Formato: email@ejemplo.com" error="Email inválido" />)
    expect(screen.queryByText('Formato: email@ejemplo.com')).not.toBeInTheDocument()
    expect(screen.getByText('Email inválido')).toBeInTheDocument()
  })

  it('aplica el tipo de input correctamente', () => {
    render(<FormField label="Email" name="email" type="email" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('type', 'email')
  })

  it('aplica el valor correctamente', () => {
    render(<FormField label="Nombre" name="name" value="Juan" />)
    expect(screen.getByDisplayValue('Juan')).toBeInTheDocument()
  })

  it('llama onChange al cambiar el input', () => {
    const handleChange = vi.fn()
    render(<FormField label="Nombre" name="name" onChange={handleChange} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Nuevo valor' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('aplica placeholder correctamente', () => {
    render(<FormField label="Nombre" name="name" placeholder="Tu nombre" />)
    expect(screen.getByPlaceholderText('Tu nombre')).toBeInTheDocument()
  })

  it('aplica disabled correctamente', () => {
    render(<FormField label="Nombre" name="name" disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('aplica className personalizado', () => {
    render(<FormField label="Nombre" name="name" className="custom-class" />)
    expect(screen.getByText('Nombre').parentElement).toHaveClass('custom-class')
  })

  it('no renderiza label cuando no se proporciona', () => {
    const { container } = render(<FormField name="name" />)
    const labels = container.querySelectorAll('label')
    expect(labels.length).toBe(1)
  })
})
