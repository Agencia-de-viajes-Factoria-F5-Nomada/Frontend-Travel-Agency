import { describe, it, expect } from 'vitest'

// Lógica extraída de DestinationDetailPage
const isPastTravel = (startDate) => {
  if (!startDate) return false
  return new Date(startDate) < new Date()
}

const isFullTravel = (availablePlaces) => availablePlaces === 0

describe('Validación: viaje pasado', () => {
  it('detecta un viaje con fecha pasada', () => {
    expect(isPastTravel('2020-01-01')).toBe(true)
  })

  it('no bloquea un viaje con fecha futura', () => {
    expect(isPastTravel('2099-12-31')).toBe(false)
  })

  it('no bloquea si no hay fecha', () => {
    expect(isPastTravel(null)).toBe(false)
    expect(isPastTravel(undefined)).toBe(false)
  })
})

describe('Validación: viaje completo', () => {
  it('detecta un viaje sin plazas disponibles', () => {
    expect(isFullTravel(0)).toBe(true)
  })

  it('no bloquea si hay plazas disponibles', () => {
    expect(isFullTravel(10)).toBe(false)
    expect(isFullTravel(1)).toBe(false)
  })
})

describe('Combinación: botón de reserva deshabilitado', () => {
  const isBookingDisabled = (travel) =>
    isPastTravel(travel.startDate) || isFullTravel(travel.availablePlaces)

  it('deshabilita si el viaje es pasado', () => {
    expect(isBookingDisabled({ startDate: '2020-01-01', availablePlaces: 10 })).toBe(true)
  })

  it('deshabilita si no hay plazas', () => {
    expect(isBookingDisabled({ startDate: '2099-12-31', availablePlaces: 0 })).toBe(true)
  })

  it('deshabilita si es pasado y sin plazas', () => {
    expect(isBookingDisabled({ startDate: '2020-01-01', availablePlaces: 0 })).toBe(true)
  })

  it('habilita si hay plazas y la fecha es futura', () => {
    expect(isBookingDisabled({ startDate: '2099-12-31', availablePlaces: 5 })).toBe(false)
  })
})