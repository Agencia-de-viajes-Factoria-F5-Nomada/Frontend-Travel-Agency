import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LoadingSpinner from '../components/atoms/LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renderiza correctamente', () => {
    render(<LoadingSpinner />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('aplica tamaño sm', () => {
    render(<LoadingSpinner size="sm" />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toHaveClass('h-4')
  })

  it('aplica tamaño lg', () => {
    render(<LoadingSpinner size="lg" />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toHaveClass('h-8')
  })

  it('aplica className personalizado', () => {
    render(<LoadingSpinner className="custom-class" />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toHaveClass('custom-class')
  })

  it('tiene animación de spin', () => {
    render(<LoadingSpinner />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toHaveClass('animate-spin')
  })
})
