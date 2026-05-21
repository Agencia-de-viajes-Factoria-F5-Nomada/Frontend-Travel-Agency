import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Avatar from '../components/atoms/Avatar'

describe('Avatar', () => {
  it('renderiza con imagen', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="Usuario" />)
    expect(screen.getByAltText('Usuario')).toBeInTheDocument()
  })

  it('renderiza con fallback por defecto', () => {
    render(<Avatar />)
    expect(screen.getByText('?')).toBeInTheDocument()
  })

  it('renderiza con fallback personalizado', () => {
    render(<Avatar fallback="JP" />)
    expect(screen.getByText('JP')).toBeInTheDocument()
  })

  it('renderiza con tamaño sm', () => {
    render(<Avatar size="sm" />)
    expect(document.querySelector('.h-8')).toBeInTheDocument()
  })

  it('renderiza con tamaño lg', () => {
    render(<Avatar size="lg" />)
    expect(document.querySelector('.h-12')).toBeInTheDocument()
  })

  it('aplica className personalizado', () => {
    render(<Avatar className="custom-class" />)
    expect(document.querySelector('.custom-class')).toBeInTheDocument()
  })
})
