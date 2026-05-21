import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import BrandMark from '../components/layout/BrandMark'

const wrap = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

describe('BrandMark', () => {
  it('renderiza correctamente', () => {
    wrap(<BrandMark />)
    expect(screen.getByRole('link', { name: /Inicio Nómada/i })).toBeInTheDocument()
  })

  it('renderiza como enlace', () => {
    wrap(<BrandMark />)
    expect(screen.getByRole('link')).toBeInTheDocument()
  })

  it('muestra el logo/svg', () => {
    const { container } = wrap(<BrandMark />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
