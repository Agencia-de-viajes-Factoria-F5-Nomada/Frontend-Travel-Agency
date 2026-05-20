import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Input from '../components/atoms/Input'

describe('Input', () => {
  it('renderiza correctamente', () => {
    render(<Input label="Nombre" placeholder="Tu nombre" />)
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument()
  })

  it('muestra el placeholder', () => {
    render(<Input placeholder="Buscar..." />)
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument()
  })

  it('aplica el tipo de input correctamente', () => {
    render(<Input type="email" label="Email" />)
    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('type', 'email')
  })

  it('muestra el hint cuando se proporciona', () => {
    render(<Input label="Contraseña" hint="Mínimo 8 caracteres" />)
    expect(screen.getByText('Mínimo 8 caracteres')).toBeInTheDocument()
  })

  it('aplica className personalizado', () => {
    render(<Input className="custom-class" />)
    expect(screen.getByRole('textbox')).toHaveClass('custom-class')
  })

  it('aplica id personalizado', () => {
    render(<Input id="test-id" label="Test" />)
    const input = screen.getByLabelText('Test')
    expect(input).toHaveAttribute('id', 'test-id')
  })
})
