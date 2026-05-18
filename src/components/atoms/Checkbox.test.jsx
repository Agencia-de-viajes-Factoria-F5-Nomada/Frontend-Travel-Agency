import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Checkbox from './Checkbox'

describe('Checkbox', () => {
  it('renderiza correctamente', () => {
    render(<Checkbox />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('muestra label cuando se proporciona', () => {
    render(<Checkbox label="Acepto términos" />)
    expect(screen.getByText('Acepto términos')).toBeInTheDocument()
  })

  it('no muestra label cuando no se proporciona', () => {
    render(<Checkbox />)
    expect(screen.queryByRole('checkbox').nextSibling).toBeNull()
  })

  it('marca checkbox cuando checked es true', () => {
    render(<Checkbox checked />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('desmarca checkbox cuando checked es false', () => {
    render(<Checkbox checked={false} />)
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('llama onChange al hacer click', () => {
    const onChange = vi.fn()
    render(<Checkbox onChange={onChange} />)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('se desactiva con disabled', () => {
    render(<Checkbox disabled />)
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })

  it('aplica opacidad cuando está deshabilitado', () => {
    const { container } = render(<Checkbox disabled />)
    expect(container.firstChild).toHaveClass('opacity-50')
  })

  it('acepta name e id', () => {
    render(<Checkbox name="terminos" id="terminos-id" />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('name', 'terminos')
    expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'terminos-id')
  })

  it('acepta className personalizado', () => {
    const { container } = render(<Checkbox className="custom-checkbox" />)
    expect(container.firstChild).toHaveClass('custom-checkbox')
  })
})