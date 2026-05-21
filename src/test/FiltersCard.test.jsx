import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import FiltersCard from '../components/molecules/FiltersCard'

const defaultProps = {
  priceRange: { min: 0, max: 5000 },
  setPriceRange: vi.fn(),
  onlyOffers: false,
  setOnlyOffers: vi.fn(),
  regions: ['España', 'Francia', 'Italia'],
  selectedRegions: [],
  setSelectedRegions: vi.fn(),
  selectedContinents: [],
  setSelectedContinents: vi.fn(),
  durationRange: null,
  setDurationRange: vi.fn(),
  starFilter: [],
  setStarFilter: vi.fn(),
  availabilityOnly: false,
  setAvailabilityOnly: vi.fn(),
  minDiscount: null,
  setMinDiscount: vi.fn(),
  boardType: 'half',
  setBoardType: vi.fn(),
  onClearFilters: vi.fn(),
}

describe('FiltersCard', () => {
  it('renderiza el título de filtros', () => {
    render(<FiltersCard {...defaultProps} />)
    expect(screen.getByText('Filtros')).toBeInTheDocument()
  })

  it('renderiza el selector de tipo de pensión', () => {
    render(<FiltersCard {...defaultProps} />)
    expect(screen.getByText('Media pensión')).toBeInTheDocument()
    expect(screen.getByText('Pensión completa')).toBeInTheDocument()
  })

  it('cambia el tipo de pensión al hacer click', () => {
    render(<FiltersCard {...defaultProps} />)
    fireEvent.click(screen.getByText('Pensión completa'))
    expect(defaultProps.setBoardType).toHaveBeenCalledWith('full')
  })

  it('renderiza el slider de precio', () => {
    render(<FiltersCard {...defaultProps} />)
    const slider = screen.getByRole('slider')
    expect(slider).toBeInTheDocument()
  })

  it('renderiza los continentes', () => {
    render(<FiltersCard {...defaultProps} />)
    expect(screen.getByText(/Europa/)).toBeInTheDocument()
  })

  it('renderiza los países cuando hay regiones', () => {
    render(<FiltersCard {...defaultProps} />)
    expect(screen.getByText('España')).toBeInTheDocument()
    expect(screen.getByText('Francia')).toBeInTheDocument()
    expect(screen.getByText('Italia')).toBeInTheDocument()
  })

  it('renderiza las opciones de duración', () => {
    render(<FiltersCard {...defaultProps} />)
    expect(screen.getByText('1-3 dias')).toBeInTheDocument()
    expect(screen.getByText('4-7 dias')).toBeInTheDocument()
    expect(screen.getByText('8-14 dias')).toBeInTheDocument()
    expect(screen.getByText('15+ dias')).toBeInTheDocument()
  })

  it('renderiza los filtros de estrellas', () => {
    render(<FiltersCard {...defaultProps} />)
    const stars = screen.getAllByText('')
    expect(stars.length).toBeGreaterThan(0)
  })

  it('renderiza el checkbox de disponibilidad', () => {
    render(<FiltersCard {...defaultProps} />)
    expect(screen.getByText('Solo con plazas disponibles')).toBeInTheDocument()
  })

  it('renderiza los filtros de descuento', () => {
    render(<FiltersCard {...defaultProps} />)
    expect(screen.getByText('5%+')).toBeInTheDocument()
    expect(screen.getByText('10%+')).toBeInTheDocument()
    expect(screen.getByText('15%+')).toBeInTheDocument()
    expect(screen.getByText('20%+')).toBeInTheDocument()
  })

  it('renderiza el checkbox de solo ofertas', () => {
    render(<FiltersCard {...defaultProps} />)
    expect(screen.getByText('Solo viajes en oferta')).toBeInTheDocument()
  })

  it('renderiza el botón de limpiar filtros', () => {
    render(<FiltersCard {...defaultProps} />)
    const clearButton = screen.getByText('Limpiar filtros')
    expect(clearButton).toBeInTheDocument()
  })

  it('llama onClearFilters al hacer click en limpiar', () => {
    render(<FiltersCard {...defaultProps} />)
    fireEvent.click(screen.getByText('Limpiar filtros'))
    expect(defaultProps.onClearFilters).toHaveBeenCalled()
  })

  it('selecciona un continente al hacer click', () => {
    render(<FiltersCard {...defaultProps} />)
    const europeButton = screen.getByText(/Europa/)
    fireEvent.click(europeButton)
    expect(defaultProps.setSelectedContinents).toHaveBeenCalled()
  })

  it('selecciona un país al hacer click en checkbox', () => {
    render(<FiltersCard {...defaultProps} />)
    const spainCheckbox = screen.getByLabelText('España')
    fireEvent.click(spainCheckbox)
    expect(defaultProps.setSelectedRegions).toHaveBeenCalled()
  })
})
