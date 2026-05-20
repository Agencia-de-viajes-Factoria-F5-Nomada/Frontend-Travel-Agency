import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import BookingForm from '../components/organisms/BookingForm'

const mockForm = {
  travelId: '',
  customerId: '',
  typeBoard: 'HALF',
  isGroup: false,
}

const mockTravels = [
  { id: 1, destiny: 'París', startDate: '2026-06-01' },
  { id: 2, destiny: 'Roma', startDate: '2026-07-15' },
]

const mockUsers = [
  { id: 1, name: 'Juan', surname: 'Pérez' },
  { id: 2, name: 'María', surname: 'García' },
]

describe('BookingForm', () => {
  it('renderiza el selector de viaje', () => {
    render(<BookingForm form={mockForm} onChange={() => {}} travels={mockTravels} users={mockUsers} />)
    const selects = screen.getAllByRole('combobox')
    expect(selects.length).toBeGreaterThan(0)
  })

  it('renderiza el selector de cliente', () => {
    render(<BookingForm form={mockForm} onChange={() => {}} travels={mockTravels} users={mockUsers} />)
    const selects = screen.getAllByRole('combobox')
    expect(selects.length).toBeGreaterThanOrEqual(2)
  })

  it('renderiza el selector de tipo de pensión', () => {
    render(<BookingForm form={mockForm} onChange={() => {}} travels={mockTravels} users={mockUsers} />)
    const selects = screen.getAllByRole('combobox')
    expect(selects.length).toBeGreaterThanOrEqual(3)
  })

  it('renderiza el selector de grupo', () => {
    render(<BookingForm form={mockForm} onChange={() => {}} travels={mockTravels} users={mockUsers} />)
    const selects = screen.getAllByRole('combobox')
    expect(selects.length).toBeGreaterThanOrEqual(3)
  })

  it('llama onChange al cambiar un select', () => {
    const handleChange = vi.fn()
    render(<BookingForm form={mockForm} onChange={handleChange} travels={mockTravels} users={mockUsers} />)
    const selects = screen.getAllByRole('combobox')
    fireEvent.change(selects[0], { target: { value: '1' } })
    expect(handleChange).toHaveBeenCalled()
  })

  it('muestra las opciones de viaje', () => {
    render(<BookingForm form={mockForm} onChange={() => {}} travels={mockTravels} users={mockUsers} />)
    expect(screen.getByText('París (2026-06-01)')).toBeInTheDocument()
    expect(screen.getByText('Roma (2026-07-15)')).toBeInTheDocument()
  })

  it('muestra las opciones de usuarios', () => {
    render(<BookingForm form={mockForm} onChange={() => {}} travels={mockTravels} users={mockUsers} />)
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
    expect(screen.getByText('María García')).toBeInTheDocument()
  })

  it('muestra las opciones de tipo de pensión', () => {
    render(<BookingForm form={mockForm} onChange={() => {}} travels={mockTravels} users={mockUsers} />)
    expect(screen.getByText('Media pensión')).toBeInTheDocument()
    expect(screen.getByText('Pensión completa')).toBeInTheDocument()
  })

  it('llama onChange al cambiar un select', () => {
    const handleChange = vi.fn()
    render(<BookingForm form={mockForm} onChange={handleChange} travels={mockTravels} users={mockUsers} />)
    const selects = screen.getAllByRole('combobox')
    fireEvent.change(selects[0], { target: { value: '1' } })
    expect(handleChange).toHaveBeenCalled()
  })

  it('muestra opción por defecto en selector de viaje', () => {
    render(<BookingForm form={mockForm} onChange={() => {}} travels={mockTravels} users={mockUsers} />)
    expect(screen.getByText('Selecciona un viaje')).toBeInTheDocument()
  })

  it('muestra opción por defecto en selector de cliente', () => {
    render(<BookingForm form={mockForm} onChange={() => {}} travels={mockTravels} users={mockUsers} />)
    expect(screen.getByText('Selecciona un cliente')).toBeInTheDocument()
  })
})
