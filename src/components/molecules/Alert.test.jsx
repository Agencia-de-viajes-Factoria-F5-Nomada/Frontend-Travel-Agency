import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Alert from './Alert'

describe('Alert', () => {
  it('renderiza mensaje correctamente', () => {
    render(<Alert message="Error occurred" />)
    expect(screen.getByText('Error occurred')).toBeInTheDocument()
  })

  it('renderiza título y mensaje', () => {
    render(<Alert title="Error" message="Something went wrong" />)
    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('muestra botón de cierre cuando onClose está presente', () => {
    render(<Alert message="Test" onClose={() => {}} />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('no muestra botón de cierre cuando onClose no está presente', () => {
    render(<Alert message="Test" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('llama a onClose al hacer click en el botón', () => {
    const onClose = vi.fn()
    render(<Alert message="Test" onClose={onClose} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('usa tipo info por defecto', () => {
    const { container } = render(<Alert message="Test" />)
    expect(container.firstChild).toHaveClass('bg-blue-50')
  })

  it('aplica estilo error', () => {
    const { container } = render(<Alert type="error" message="Test" />)
    expect(container.firstChild).toHaveClass('bg-red-50')
  })

  it('aplica estilo success', () => {
    const { container } = render(<Alert type="success" message="Test" />)
    expect(container.firstChild).toHaveClass('bg-green-50')
  })

  it('aplica estilo warning', () => {
    const { container } = render(<Alert type="warning" message="Test" />)
    expect(container.firstChild).toHaveClass('bg-yellow-50')
  })

  it('aplica clases personalizadas', () => {
    const { container } = render(<Alert message="Test" className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })
})