import { describe, it, expect } from 'vitest'

const today = new Date()
today.setHours(0, 0, 0, 0)

const isFutureTravel = (startDate) => new Date(startDate) >= today

const normalize = (str) =>
  str?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() ?? ''

const matchesDestiny = (travel, search) => {
  if (!search) return true
  const s = normalize(search)
  return (
    normalize(travel.destiny ?? '').includes(s) ||
    normalize(travel.hotelCity ?? '').includes(s)
  )
}

const matchesPrice = (travel, max) => {
  const price = travel.price || travel.halfBoardPrice || 0
  return price <= max
}

const matchesOffer = (travel, onlyOffers) => {
  if (!onlyOffers) return true
  return travel.sale === true
}

describe('Filtro: viajes pasados', () => {
  it('excluye viajes con startDate en el pasado', () => {
    expect(isFutureTravel('2020-01-01')).toBe(false)
  })

  it('incluye viajes con startDate en el futuro', () => {
    expect(isFutureTravel('2099-01-01')).toBe(true)
  })

  it('incluye viajes con startDate hoy', () => {
    const todayStr = new Date().toISOString().split('T')[0]
    expect(isFutureTravel(todayStr)).toBe(true)
  })
})

describe('Filtro: destino', () => {
  const travel = { destiny: 'París Ciudad de la Luz', hotelCity: 'París' }

  it('encuentra por nombre de destino', () => {
    expect(matchesDestiny(travel, 'París')).toBe(true)
  })

  it('búsqueda case-insensitive', () => {
    expect(matchesDestiny(travel, 'paris')).toBe(true)
  })

  it('búsqueda sin acento encuentra con acento', () => {
    expect(matchesDestiny(travel, 'Paris')).toBe(true)
  })

  it('no encuentra destino que no existe', () => {
    expect(matchesDestiny(travel, 'Madrid')).toBe(false)
  })

  it('sin búsqueda devuelve todos', () => {
    expect(matchesDestiny(travel, '')).toBe(true)
  })
})

describe('Filtro: precio', () => {
  it('incluye viaje dentro del rango', () => {
    expect(matchesPrice({ price: 100 }, 200)).toBe(true)
  })

  it('excluye viaje fuera del rango', () => {
    expect(matchesPrice({ price: 300 }, 200)).toBe(false)
  })

  it('usa halfBoardPrice si no hay price', () => {
    expect(matchesPrice({ halfBoardPrice: 150 }, 200)).toBe(true)
  })

  it('precio 0 si no hay ninguno', () => {
    expect(matchesPrice({}, 200)).toBe(true)
  })
})

describe('Filtro: solo ofertas', () => {
  it('incluye viaje en oferta si onlyOffers=true', () => {
    expect(matchesOffer({ sale: true }, true)).toBe(true)
  })

  it('excluye viaje sin oferta si onlyOffers=true', () => {
    expect(matchesOffer({ sale: false }, true)).toBe(false)
  })

  it('incluye todo si onlyOffers=false', () => {
    expect(matchesOffer({ sale: false }, false)).toBe(true)
  })
})