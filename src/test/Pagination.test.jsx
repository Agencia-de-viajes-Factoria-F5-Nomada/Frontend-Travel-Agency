import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import Pagination from '../components/molecules/Pagination'

const wrap = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

describe('Pagination', () => {
  it('no renderiza cuando hay solo 1 página', () => {
    wrap(<Pagination currentPage={1} totalPages={1} />)
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
  })

  it('renderiza los botones de paginación', () => {
    wrap(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('muestra la página actual con variante primary', () => {
    wrap(<Pagination currentPage={3} totalPages={5} onPageChange={() => {}} />)
    const currentPageButton = screen.getByText('3')
    expect(currentPageButton).toBeInTheDocument()
  })

  it('llama onPageChange al hacer click en una página', () => {
    const handlePageChange = vi.fn()
    wrap(<Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} />)
    fireEvent.click(screen.getByText('2'))
    expect(handlePageChange).toHaveBeenCalledWith(2)
  })

  it('muestra botón de primera página', () => {
    wrap(<Pagination currentPage={3} totalPages={10} onPageChange={() => {}} />)
    expect(screen.getByText('««')).toBeInTheDocument()
  })

  it('muestra botón de última página', () => {
    wrap(<Pagination currentPage={3} totalPages={10} onPageChange={() => {}} />)
    expect(screen.getByText('»»')).toBeInTheDocument()
  })

  it('muestra botón de página anterior', () => {
    wrap(<Pagination currentPage={3} totalPages={10} onPageChange={() => {}} />)
    expect(screen.getByText('«')).toBeInTheDocument()
  })

  it('muestra botón de página siguiente', () => {
    wrap(<Pagination currentPage={3} totalPages={10} onPageChange={() => {}} />)
    expect(screen.getByText('»')).toBeInTheDocument()
  })

  it('deshabilita botón de primera página cuando está en la primera', () => {
    wrap(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />)
    expect(screen.getByText('««')).toBeDisabled()
  })

  it('deshabilita botón de última página cuando está en la última', () => {
    wrap(<Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />)
    expect(screen.getByText('»»')).toBeDisabled()
  })

  it('deshabilita botón anterior cuando está en la primera página', () => {
    wrap(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />)
    expect(screen.getByText('«')).toBeDisabled()
  })

  it('deshabilita botón siguiente cuando está en la última página', () => {
    wrap(<Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />)
    expect(screen.getByText('»')).toBeDisabled()
  })

  it('oculta botones de primera/última cuando showFirstLast es false', () => {
    wrap(<Pagination currentPage={3} totalPages={10} onPageChange={() => {}} showFirstLast={false} />)
    expect(screen.queryByText('««')).not.toBeInTheDocument()
    expect(screen.queryByText('»»')).not.toBeInTheDocument()
  })

  it('oculta botones de anterior/siguiente cuando showPrevNext es false', () => {
    wrap(<Pagination currentPage={3} totalPages={10} onPageChange={() => {}} showPrevNext={false} />)
    expect(screen.queryByText('«')).not.toBeInTheDocument()
    expect(screen.queryByText('»')).not.toBeInTheDocument()
  })

  it('navega a la primera página al hacer click en ««', () => {
    const handlePageChange = vi.fn()
    wrap(<Pagination currentPage={5} totalPages={10} onPageChange={handlePageChange} />)
    fireEvent.click(screen.getByText('««'))
    expect(handlePageChange).toHaveBeenCalledWith(1)
  })

  it('navega a la última página al hacer click en »»', () => {
    const handlePageChange = vi.fn()
    wrap(<Pagination currentPage={1} totalPages={10} onPageChange={handlePageChange} />)
    fireEvent.click(screen.getByText('»»'))
    expect(handlePageChange).toHaveBeenCalledWith(10)
  })

  it('navega a la página anterior al hacer click en «', () => {
    const handlePageChange = vi.fn()
    wrap(<Pagination currentPage={3} totalPages={10} onPageChange={handlePageChange} />)
    fireEvent.click(screen.getByText('«'))
    expect(handlePageChange).toHaveBeenCalledWith(2)
  })

  it('navega a la página siguiente al hacer click en »', () => {
    const handlePageChange = vi.fn()
    wrap(<Pagination currentPage={3} totalPages={10} onPageChange={handlePageChange} />)
    fireEvent.click(screen.getByText('»'))
    expect(handlePageChange).toHaveBeenCalledWith(4)
  })
})
