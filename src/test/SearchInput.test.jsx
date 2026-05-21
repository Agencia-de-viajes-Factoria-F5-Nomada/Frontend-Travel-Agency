import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SearchInput from '../components/molecules/SearchInput'

describe('SearchInput', () => {
  it('renderiza correctamente', () => {
    render(<SearchInput value="" onChange={() => {}} />)
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument()
  })

  it('muestra placeholder personalizado', () => {
    render(<SearchInput value="" onChange={() => {}} placeholder="Buscar viajes..." />)
    expect(screen.getByPlaceholderText('Buscar viajes...')).toBeInTheDocument()
  })

  it('muestra el valor inicial', () => {
    render(<SearchInput value="París" onChange={() => {}} />)
    expect(screen.getByDisplayValue('París')).toBeInTheDocument()
  })

  it('llama onChange al escribir', async () => {
    vi.useFakeTimers()
    const handleChange = vi.fn()
    render(<SearchInput value="" onChange={handleChange} debounce={100} />)
    const input = screen.getByPlaceholderText('Buscar...')
    fireEvent.change(input, { target: { value: 'Roma' } })
    
    await vi.advanceTimersByTimeAsync(100)
    expect(handleChange).toHaveBeenCalled()
    vi.useRealTimers()
  })

  it('llama onSubmit al presionar Enter', () => {
    const handleSubmit = vi.fn()
    render(<SearchInput value="" onChange={() => {}} onSubmit={handleSubmit} />)
    const input = screen.getByPlaceholderText('Buscar...')
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })

  it('muestra botón de limpiar cuando hay valor', () => {
    render(<SearchInput value="test" onChange={() => {}} />)
    const clearButton = screen.getByRole('button')
    expect(clearButton).toBeInTheDocument()
  })

  it('no muestra botón de limpiar cuando no hay valor', () => {
    render(<SearchInput value="" onChange={() => {}} />)
    const buttons = screen.queryAllByRole('button')
    expect(buttons.length).toBe(0)
  })

  it('limpia el valor al hacer click en el botón X', () => {
    const handleChange = vi.fn()
    render(<SearchInput value="test" onChange={handleChange} />)
    const clearButton = screen.getByRole('button')
    fireEvent.click(clearButton)
    expect(handleChange).toHaveBeenCalledWith({ target: { value: '' } })
  })

  it('oculta botón de limpiar cuando showClear es false', () => {
    render(<SearchInput value="test" onChange={() => {}} showClear={false} />)
    const buttons = screen.queryAllByRole('button')
    expect(buttons.length).toBe(0)
  })

  it('aplica debounce correctamente', async () => {
    vi.useFakeTimers()
    const handleChange = vi.fn()
    render(<SearchInput value="" onChange={handleChange} debounce={300} />)
    const input = screen.getByPlaceholderText('Buscar...')
    fireEvent.change(input, { target: { value: 'test' } })

    expect(handleChange).not.toHaveBeenCalled()
    await act(async () => {
      vi.advanceTimersByTime(300)
    })
    expect(handleChange).toHaveBeenCalledTimes(1)
    vi.useRealTimers()
  })

  it('aplica className personalizado', () => {
    render(<SearchInput value="" onChange={() => {}} className="custom-class" />)
    expect(screen.getByPlaceholderText('Buscar...').closest('.custom-class')).toBeInTheDocument()
  })
})
