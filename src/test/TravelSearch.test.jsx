import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import TravelSearch from '../components/molecules/TravelSearch'

const defaultProps = {
  searchMode: 'dates',
  setSearchMode: vi.fn(),
  search: {
    destiny: '',
    startDate: '',
    endDate: '',
    passengers: 1,
  },
  setSearch: vi.fn(),
  onSearch: vi.fn((e) => e.preventDefault()),
  onPopularClick: vi.fn(),
}

describe('TravelSearch', () => {
  it('renderiza el título principal', () => {
    render(<TravelSearch {...defaultProps} />)
    expect(screen.getByText('Encuentra tu viaje ideal')).toBeInTheDocument()
  })

  it('renderiza el subtítulo', () => {
    render(<TravelSearch {...defaultProps} />)
    expect(screen.getByText('Explora todos los destinos disponibles y compara precios por fecha o mes.')).toBeInTheDocument()
  })

  it('renderiza el toggle de Fechas/Mes', () => {
    render(<TravelSearch {...defaultProps} />)
    expect(screen.getByText('Fechas exactas')).toBeInTheDocument()
    expect(screen.getByText('Por mes')).toBeInTheDocument()
  })

  it('cambia a modo mes al hacer click', () => {
    render(<TravelSearch {...defaultProps} />)
    fireEvent.click(screen.getByText('Por mes'))
    expect(defaultProps.setSearchMode).toHaveBeenCalledWith('month')
  })

  it('cambia a modo fechas al hacer click', () => {
    render(<TravelSearch {...defaultProps} />)
    fireEvent.click(screen.getByText('Fechas exactas'))
    expect(defaultProps.setSearchMode).toHaveBeenCalledWith('dates')
  })

  it('renderiza el campo de destino', () => {
    render(<TravelSearch {...defaultProps} />)
    expect(screen.getByPlaceholderText('¿A dónde?')).toBeInTheDocument()
  })

  it('renderiza los campos de fecha en modo dates', () => {
    render(<TravelSearch {...defaultProps} searchMode="dates" />)
    const dateInputs = document.querySelectorAll('input[type="date"]')
    expect(dateInputs.length).toBe(2)
  })

  it('renderiza el campo de mes en modo month', () => {
    render(<TravelSearch {...defaultProps} searchMode="month" />)
    const monthInput = document.querySelector('input[type="month"]')
    expect(monthInput).toBeDefined()
  })

  it('renderiza el control de pasajeros', () => {
    render(<TravelSearch {...defaultProps} />)
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('incrementa pasajeros al hacer click en +', () => {
    render(<TravelSearch {...defaultProps} />)
    const plusButtons = screen.getAllByText('+')
    fireEvent.click(plusButtons[0])
    expect(defaultProps.setSearch).toHaveBeenCalled()
  })

  it('decrementa pasajeros al hacer click en -', () => {
    render(<TravelSearch {...defaultProps} />)
    const minusButtons = screen.getAllByText('−')
    fireEvent.click(minusButtons[0])
    expect(defaultProps.setSearch).toHaveBeenCalled()
  })

  it('renderiza el botón de buscar', () => {
    render(<TravelSearch {...defaultProps} />)
    expect(screen.getByText('Buscar')).toBeInTheDocument()
  })

  it('envía el formulario al hacer submit', () => {
    render(<TravelSearch {...defaultProps} />)
    const form = document.querySelector('form')
    fireEvent.submit(form)
    expect(defaultProps.onSearch).toHaveBeenCalled()
  })

  it('renderiza los destinos populares', () => {
    render(<TravelSearch {...defaultProps} />)
    expect(screen.getByText('Populares:')).toBeInTheDocument()
    expect(screen.getByText('Londres')).toBeInTheDocument()
    expect(screen.getByText('París')).toBeInTheDocument()
    expect(screen.getByText('Roma')).toBeInTheDocument()
    expect(screen.getByText('Tokio')).toBeInTheDocument()
  })

  it('llama onPopularClick al hacer click en un destino popular', () => {
    render(<TravelSearch {...defaultProps} />)
    fireEvent.click(screen.getByText('Londres'))
    expect(defaultProps.onPopularClick).toHaveBeenCalledWith('Londres')
  })
})
