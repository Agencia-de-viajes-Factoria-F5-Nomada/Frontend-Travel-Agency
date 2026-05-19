import { describe, it, expect } from 'vitest'

// ── Lógica actual de CheckoutPage ──────────────────────────────────────────

const calculateAge = (birthDate) => {
  if (!birthDate) return null
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}

const hasMinorWithoutAdult = (passengers) => {
  const hasMinor = passengers.some(p => p.birthDate && calculateAge(p.birthDate) < 12)
  const hasAdult = passengers.some(p => p.birthDate && calculateAge(p.birthDate) >= 12)
  return hasMinor && !hasAdult
}

const allFilled = (passengers) =>
  passengers.every(p => p.name?.trim() && p.surname?.trim() && p.birthDate)

const getCategory = (age) => {
  if (age === null) return 'UNKNOWN'
  if (age < 2)   return 'BABY'
  if (age < 12)  return 'CHILD'
  if (age >= 65) return 'PENSIONER'
  return 'ADULT'
}

const calcularTarifa = (age, basePrice) => {
  if (age < 2)   return basePrice * 0.05
  if (age < 12)  return basePrice * 0.60
  if (age >= 65) return basePrice * 0.90
  return basePrice
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('calculateAge', () => {
  it('calcula correctamente la edad de un adulto', () => {
    const age = calculateAge('1990-01-01')
    expect(age).toBeGreaterThanOrEqual(35)
  })

  it('devuelve null si no hay fecha', () => {
    expect(calculateAge('')).toBeNull()
    expect(calculateAge(null)).toBeNull()
  })

  it('calcula correctamente un bebé', () => {
    const today = new Date()
    const birthDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
      .toISOString().split('T')[0]
    expect(calculateAge(birthDate)).toBe(1)
  })
})

describe('Validación: menor sin adulto', () => {
  const hoy = new Date()
  const fechaBebe  = new Date(hoy.getFullYear() - 1,  hoy.getMonth(), hoy.getDate()).toISOString().split('T')[0]
  const fechaNino  = new Date(hoy.getFullYear() - 8,  hoy.getMonth(), hoy.getDate()).toISOString().split('T')[0]
  const fechaAdult = new Date(hoy.getFullYear() - 30, hoy.getMonth(), hoy.getDate()).toISOString().split('T')[0]

  it('detecta bebé sin adulto', () => {
    expect(hasMinorWithoutAdult([{ birthDate: fechaBebe }])).toBe(true)
  })

  it('detecta niño sin adulto', () => {
    expect(hasMinorWithoutAdult([{ birthDate: fechaNino }])).toBe(true)
  })

  it('permite bebé con adulto', () => {
    expect(hasMinorWithoutAdult([{ birthDate: fechaBebe }, { birthDate: fechaAdult }])).toBe(false)
  })

  it('permite niño con adulto', () => {
    expect(hasMinorWithoutAdult([{ birthDate: fechaNino }, { birthDate: fechaAdult }])).toBe(false)
  })

  it('no falla con solo adultos', () => {
    expect(hasMinorWithoutAdult([{ birthDate: fechaAdult }])).toBe(false)
  })

  it('no falla con lista vacía', () => {
    expect(hasMinorWithoutAdult([])).toBe(false)
  })
})

describe('Validación: formulario completo', () => {
  it('detecta formulario incompleto sin birthDate', () => {
    expect(allFilled([{ name: 'María', surname: 'García', birthDate: '' }])).toBe(false)
  })

  it('detecta formulario incompleto sin nombre', () => {
    expect(allFilled([{ name: '', surname: 'García', birthDate: '1990-01-01' }])).toBe(false)
  })

  it('valida formulario completo', () => {
    expect(allFilled([{ name: 'María', surname: 'García', birthDate: '1990-01-01' }])).toBe(true)
  })

  it('valida múltiples pasajeros completos', () => {
    expect(allFilled([
      { name: 'María', surname: 'García', birthDate: '1990-01-01' },
      { name: 'Juan',  surname: 'Pérez',  birthDate: '2020-05-10' },
    ])).toBe(true)
  })
})

describe('Categoría por edad', () => {
  it('bebé: 0-1 años → BABY', () => {
    expect(getCategory(1)).toBe('BABY')
  })

  it('niño: 2-11 años → CHILD', () => {
    expect(getCategory(8)).toBe('CHILD')
  })

  it('adulto: 12-64 años → ADULT', () => {
    expect(getCategory(30)).toBe('ADULT')
  })

  it('pensionista: 65+ años → PENSIONER', () => {
    expect(getCategory(70)).toBe('PENSIONER')
  })

  it('devuelve UNKNOWN sin edad', () => {
    expect(getCategory(null)).toBe('UNKNOWN')
  })
})

describe('Cálculo de tarifa por edad', () => {
  const base = 1000

  it('bebé paga el 5%', () => {
    expect(calcularTarifa(1, base)).toBe(50)
  })

  it('niño paga el 60%', () => {
    expect(calcularTarifa(8, base)).toBe(600)
  })

  it('adulto paga el 100%', () => {
    expect(calcularTarifa(30, base)).toBe(1000)
  })

  it('pensionista paga el 90%', () => {
    expect(calcularTarifa(70, base)).toBe(900)
  })

  it('adolescente de 12 años paga el 100%', () => {
    expect(calcularTarifa(12, base)).toBe(1000)
  })
})