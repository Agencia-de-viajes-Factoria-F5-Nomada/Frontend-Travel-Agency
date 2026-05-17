import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Input from './Input'

describe('Input', () => {
  it('renderiza input correctamente', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('muestra label cuando se proporciona', () => {
    render(<Input label="Nombre" />)
    expect(screen.getByText('Nombre')).toBeInTheDocument()
  })

  it('no muestra label cuando no se proporciona', () => {
    const { container } = render(<Input />)
    const label = container.querySelector('label')
    const span = label.querySelector('span')
    expect(span).toBeNull()
  })

  it('muestra hint cuando se proporciona', () => {
    render(<Input hint="Este es un hint" />)
    expect(screen.getByText('Este es un hint')).toBeInTheDocument()
  })

  it('acepta tipo password', () => {
    render(<Input type="password" />)
    expect(screen.getByLabelText('')).toHaveAttribute('type', 'password')
  })

  it('acepta tipo email', () => {
    render(<Input type="email" />)
    expect(screen.getByLabelText('')).toHaveAttribute('type', 'email')
  })

  it('acepta atributos adicionales', () => {
    render(<Input placeholder="Escribe aquí" />)
    expect(screen.getByPlaceholderText('Escribe aquí')).toBeInTheDocument()
  })

  it('acepta className personalizado', () => {
    const { container } = render(<Input className="custom-class" />)
    expect(container.querySelector('input')).toHaveClass('custom-class')
  })

  it('maneja valor por defecto', () => {
    render(<Input defaultValue="valor inicial" />)
    expect(screen.getByRole('textbox')).toHaveValue('valor inicial')
  })
})