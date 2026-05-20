import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="grid min-h-screen place-items-center bg-gray-50">
          <div className="text-center space-y-4 p-8">
            <h1 className="text-2xl font-bold text-gray-800">Algo ha ido mal</h1>
            <p className="text-gray-500">Ha ocurrido un error inesperado. Por favor recarga la página.</p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg px-6 py-2 text-white font-medium bg-blue-600 hover:bg-blue-700"
            >
              Recargar
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}