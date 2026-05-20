import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Modal from './Modal'

describe('Modal', () => {
  it('no renderiza cuando isOpen es false', () => {
    render(<Modal isOpen={false} title="Test" />)
    expect(screen.queryByText('Test')).not.toBeInTheDocument()
  })

  it('renderiza cuando isOpen es true', () => {
    render(<Modal isOpen={true} title="Título del modal" />)
    expect(screen.getByText('Título del modal')).toBeInTheDocument()
  })

  it('muestra título correctamente', () => {
    render(<Modal isOpen title="Mi Modal" />)
    expect(screen.getByText('Mi Modal')).toBeInTheDocument()
  })

  it('muestra children correctamente', () => {
    render(<Modal isOpen>Contenido del modal</Modal>)
    expect(screen.getByText('Contenido del modal')).toBeInTheDocument()
  })

  it('muestra footer cuando se proporciona', () => {
    render(<Modal isOpen footer={<button>Confirmar</button>} />)
    expect(screen.getByText('Confirmar')).toBeInTheDocument()
  })

  it('llama onClose al hacer click en backdrop', () => {
    const onClose = vi.fn()
    render(<Modal isOpen onClose={onClose} title="Test" />)
    const backdrop = document.querySelector('.absolute.inset-0')
    fireEvent.click(backdrop)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('no llama onClose en backdrop cuando closeOnBackdrop es false', () => {
    const onClose = vi.fn()
    render(<Modal isOpen onClose={onClose} closeOnBackdrop={false} title="Test" />)
    const backdrop = document.querySelector('.absolute.inset-0')
    if (backdrop) fireEvent.click(backdrop)
    expect(onClose).not.toHaveBeenCalled()
  })

  it('cierra con botón X cuando showClose es true', () => {
    const onClose = vi.fn()
    render(<Modal isOpen onClose={onClose} showClose title="Test" />)
    const closeButton = document.querySelector('button')
    fireEvent.click(closeButton)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('aplica tamaño medium por defecto', () => {
    render(<Modal isOpen title="Test" />)
    const modalContent = document.querySelector('.rounded-2xl')
    expect(modalContent).toHaveClass('max-w-lg')
  })

  it('aplica tamaño large', () => {
    render(<Modal isOpen size="lg" title="Test" />)
    const modalContent = document.querySelector('.rounded-2xl')
    expect(modalContent).toHaveClass('max-w-2xl')
  })

  it('aplica tamaño small', () => {
    render(<Modal isOpen size="sm" title="Test" />)
    const modalContent = document.querySelector('.rounded-2xl')
    expect(modalContent).toHaveClass('max-w-md')
  })

  it('oculta botón de cierre cuando showClose es false', () => {
    render(<Modal isOpen showClose={false} title="Test" />)
    const buttons = document.querySelectorAll('button')
    expect(buttons.length).toBe(0)
  })
})