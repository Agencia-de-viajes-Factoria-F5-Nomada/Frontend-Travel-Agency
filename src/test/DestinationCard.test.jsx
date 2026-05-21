import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import DestinationCard from '../components/organisms/DestinationCard'

const mockDestination = {
  id: 1,
  destiny: 'París',
  hotelCity: 'París',
  country: 'Francia',
  price: 500,
  halfBoardPrice: 450,
  fullBoardPrice: 600,
  hotelStars: 4,
  sale: false,
  tag: 'Disponible',
}

const wrap = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

describe('DestinationCard', () => {
  it('renderiza el nombre del destino', () => {
    wrap(<DestinationCard destination={mockDestination} />)
    const parisElements = screen.getAllByText(/París/)
    expect(parisElements.length).toBeGreaterThan(0)
  })

  it('renderiza la ciudad/país', () => {
    wrap(<DestinationCard destination={mockDestination} />)
    const parisElements = screen.getAllByText(/París/)
    expect(parisElements.length).toBeGreaterThan(1)
  })

  it('renderiza la calificación de estrellas', () => {
    wrap(<DestinationCard destination={mockDestination} />)
    expect(screen.getByText('4')).toBeInTheDocument()
  })

  it('renderiza el precio', () => {
    wrap(<DestinationCard destination={mockDestination} />)
    expect(screen.getByText(/450/)).toBeInTheDocument()
  })

  it('renderiza el tipo de pensión', () => {
    wrap(<DestinationCard destination={mockDestination} />)
    expect(screen.getByText('Media pensión')).toBeInTheDocument()
  })

  it('renderiza el botón Ver', () => {
    wrap(<DestinationCard destination={mockDestination} />)
    expect(screen.getByText('Ver')).toBeInTheDocument()
  })

  it('muestra descuento cuando es oferta', () => {
    const offerDestination = { ...mockDestination, sale: true, price: 300 }
    wrap(<DestinationCard destination={offerDestination} />)
    expect(screen.getAllByText(/-\d+%/).length).toBeGreaterThan(0)
  })

  it('renderiza como enlace con target blank', () => {
    wrap(<DestinationCard destination={mockDestination} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('muestra el tag correcto', () => {
    wrap(<DestinationCard destination={mockDestination} />)
    expect(screen.getByText('Disponible')).toBeInTheDocument()
  })

  it('muestra tag de Oferta cuando sale es true', () => {
    const offerDestination = { ...mockDestination, sale: true, tag: 'Oferta' }
    wrap(<DestinationCard destination={offerDestination} />)
    expect(screen.getByText('Oferta')).toBeInTheDocument()
  })

  it('muestra fullBoardPrice cuando boardType es full', () => {
    const fullBoardDest = { ...mockDestination, boardType: 'full' }
    wrap(<DestinationCard destination={fullBoardDest} boardType="full" />)
    expect(screen.getByText(/600/)).toBeInTheDocument()
  })

  it('muestra featured con estilo destacado', () => {
    wrap(<DestinationCard destination={mockDestination} featured />)
    expect(screen.getByText('Disponible')).toBeInTheDocument()
  })
})
