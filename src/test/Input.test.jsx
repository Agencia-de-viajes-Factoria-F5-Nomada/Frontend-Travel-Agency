import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Input from '../components/atoms/Input'

describe('Input', () => {
  it('renderiza el label cuando se le pasa', () => {
    render(<Input label="Nombre" />)
    expect(screen.getByText('Nombre')).toBeInTheDocument()
  })

  it('no renderiza label si no se le pasa', () => {
    render(<Input placeholder="Escribe aquí" />)
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('llama a onChange al escribir', () => {
    const handleChange = vi.fn()
    render(<Input label="Email" onChange={handleChange} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test@mail.com' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('muestra el hint cuando se le pasa', () => {
    render(<Input label="DNI" hint="Formato: 12345678A" />)
    expect(screen.getByText('Formato: 12345678A')).toBeInTheDocument()
  })

  it('acepta el tipo password', () => {
    render(<Input label="Contraseña" type="password" />)
    const input = document.querySelector('input[type="password"]')
    expect(input).toBeInTheDocument()
  })
})