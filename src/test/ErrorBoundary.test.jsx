import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ErrorBoundary from '../components/layout/ErrorBoundary'

const Boom = () => { throw new Error('Test error') }

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <p>contenido ok</p>
      </ErrorBoundary>
    )
    expect(screen.getByText('contenido ok')).toBeInTheDocument()
  })

  it('shows fallback UI when a child throws', () => {
    const consoleError = console.error
    console.error = () => {}
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>
    )
    expect(screen.getByText('Algo salió mal')).toBeInTheDocument()
    expect(screen.getByText('Test error')).toBeInTheDocument()
    console.error = consoleError
  })
})