import { useState, useEffect } from 'react'
import { MapPin, Search, Calendar, Users, Plane, Hotel, Ticket } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/atoms/PageHeader'
import DestinationCard from '../components/organisms/DestinationCard'
import { travelService } from '../services/travelsService'
import { bookingService } from '../services/BookingService'
import { authService } from '../services/authService'

const TABS = [
  { id: 'search', label: 'Buscar destino' },
  { id: 'custom', label: 'Crear viaje personalizado' },
]

const DestinationsPage = () => {
  const [travels, setTravels]     = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)
  const [tab, setTab]             = useState('search')
  const [sending, setSending]     = useState(false)
  const [sent, setSent]           = useState(false)
  const [formError, setFormError] = useState(null)
  const navigate                  = useNavigate()

  const [search, setSearch] = useState({
    destiny: '', startDate: '', endDate: '', passengers: 2,
    includesFlight: false, includesHotel: false, includesActivities: false,
  })

  useEffect(() => {
    travelService.getAvailable()
      .then(data => setTravels(data))
      .catch(e => setError(e.message || 'Error al cargar los viajes'))
      .finally(() => setLoading(false))
  }, [])

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const filtered = travels.filter(t => {
    const matchesSearch = (t.destiny || t.name || '').toLowerCase().includes(search.destiny.toLowerCase())
    const isFuture = t.startDate ? new Date(t.startDate) >= today : true
    return matchesSearch && isFuture
  })

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (search.destiny) params.set('destiny', search.destiny)
    if (search.startDate) params.set('startDate', search.startDate)
    if (search.endDate) params.set('endDate', search.endDate)
    if (search.passengers) params.set('passengers', search.passengers)
    navigate(`/search?${params.toString()}`)
  }

  const handleCustomSubmit = async (e) => {
    e.preventDefault()
    if (!authService.isAuthenticated()) { navigate('/auth'); return }
    setSending(true)
    setFormError(null)
    try {
      await bookingService.create({
        customDestiny: search.destiny,
        customStartDate: search.startDate,
        customEndDate: search.endDate,
        passengers: search.passengers,
        includesFlight: search.includesFlight,
        includesHotel: search.includesHotel,
        includesActivities: search.includesActivities,
        boughtDate: new Date().toISOString(),
        isGroup: search.passengers >= 10,
      })
      setSent(true)
    } catch (e) {
      setFormError(e.message || 'Error al enviar la solicitud')
    } finally {
      setSending(false)
    }
  }

  const SERVICES = [
    { key: 'includesFlight',     label: 'Vuelo',       icon: Plane },
    { key: 'includesHotel',      label: 'Hotel',       icon: Hotel },
    { key: 'includesActivities', label: 'Actividades', icon: Ticket },
  ]

  return (
    <div className="container-page py-12">
      <PageHeader
        eyebrow="Catálogo"
        title="Destinos disponibles"
        description="Busca entre nuestros destinos o diseña tu viaje a medida."
      />

      {/* ── BARRA UNIFICADA ── */}
      <div className="mt-6 rounded-2xl border border-surface-600 overflow-hidden" style={{ background: 'rgba(218,238,247,0.04)' }}>

        {/* Tabs */}
        <div className="grid grid-cols-2 border-b border-surface-600">
          {TABS.map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => { setTab(t.id); setSent(false); setFormError(null) }}
              className="py-3 text-sm font-semibold transition-colors"
              style={{
                color: tab === t.id ? '#DAEEF7' : '#6B7280',
                background: tab === t.id ? 'rgba(74,143,168,0.15)' : 'transparent',
                borderBottom: tab === t.id ? '2px solid #4A8FA8' : '2px solid transparent',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Campos comunes */}
        <div className="flex flex-col lg:flex-row items-stretch divide-y lg:divide-y-0 lg:divide-x divide-surface-600">

          {/* Destino */}
          <div className="flex flex-col flex-[2] px-4 py-3">
            <span style={{ fontSize: 10, color: '#4A8FA8', letterSpacing: '0.1em' }} className="uppercase mb-1">Destino</span>
            <div className="flex items-center gap-2">
              <MapPin size={14} style={{ color: '#4A8FA8', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="¿A dónde?"
                value={search.destiny}
                onChange={e => setSearch(s => ({ ...s, destiny: e.target.value }))}
                style={{ background: 'transparent', border: 'none', outline: 'none', color: '#DAEEF7', fontSize: 14, width: '100%' }}
                className="placeholder:text-white/25"
              />
            </div>
          </div>

          {/* Salida */}
          <div className="flex flex-col flex-1 px-4 py-3">
            <span style={{ fontSize: 10, color: '#4A8FA8', letterSpacing: '0.1em' }} className="uppercase mb-1">Salida</span>
            <div className="flex items-center gap-2">
              <Calendar size={14} style={{ color: '#4A8FA8', flexShrink: 0 }} />
              <input
                type="date"
                value={search.startDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => setSearch(s => ({ ...s, startDate: e.target.value }))}
                style={{ colorScheme: 'dark', background: 'transparent', border: 'none', outline: 'none', color: search.startDate ? '#DAEEF7' : 'rgba(218,238,247,0.25)', fontSize: 13, width: '100%' }}
              />
            </div>
          </div>

          {/* Vuelta */}
          <div className="flex flex-col flex-1 px-4 py-3">
            <span style={{ fontSize: 10, color: '#4A8FA8', letterSpacing: '0.1em' }} className="uppercase mb-1">Vuelta</span>
            <div className="flex items-center gap-2">
              <Calendar size={14} style={{ color: '#4A8FA8', flexShrink: 0 }} />
              <input
                type="date"
                value={search.endDate}
                min={search.startDate || new Date().toISOString().split('T')[0]}
                onChange={e => setSearch(s => ({ ...s, endDate: e.target.value }))}
                style={{ colorScheme: 'dark', background: 'transparent', border: 'none', outline: 'none', color: search.endDate ? '#DAEEF7' : 'rgba(218,238,247,0.25)', fontSize: 13, width: '100%' }}
              />
            </div>
          </div>

          {/* Viajeros */}
          <div className="flex flex-col flex-1 px-4 py-3">
            <span style={{ fontSize: 10, color: '#4A8FA8', letterSpacing: '0.1em' }} className="uppercase mb-1">Viajeros</span>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Users size={14} style={{ color: '#4A8FA8' }} />
                <span style={{ fontSize: 13, color: 'rgba(218,238,247,0.7)' }}>{search.passengers}</span>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setSearch(s => ({ ...s, passengers: Math.max(1, s.passengers - 1) }))}
                  style={{ width: 20, height: 20, borderRadius: '50%', border: '0.5px solid rgba(74,143,168,0.4)', background: 'transparent', color: '#7AAFC0', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                <button type="button" onClick={() => setSearch(s => ({ ...s, passengers: Math.min(50, s.passengers + 1) }))}
                  style={{ width: 20, height: 20, borderRadius: '50%', border: '0.5px solid rgba(74,143,168,0.4)', background: 'transparent', color: '#7AAFC0', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
              </div>
            </div>
          </div>

          {/* Servicios — solo en pestaña custom */}
          {tab === 'custom' && (
            <div className="flex flex-col px-4 py-3 gap-2">
              <span style={{ fontSize: 10, color: '#4A8FA8', letterSpacing: '0.1em' }} className="uppercase mb-1">Incluir</span>
              <div className="flex gap-2">
                {SERVICES.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSearch(s => ({ ...s, [key]: !s[key] }))}
                    title={label}
                    className="flex flex-col items-center gap-1 rounded-lg px-2 py-1 transition-colors"
                    style={{
                      background: search[key] ? 'rgba(74,143,168,0.25)' : 'transparent',
                      border: `1px solid ${search[key] ? '#4A8FA8' : 'rgba(255,255,255,0.1)'}`,
                    }}
                  >
                    <Icon size={14} style={{ color: search[key] ? '#DAEEF7' : '#6B7280' }} />
                    <span style={{ fontSize: 9, color: search[key] ? '#DAEEF7' : '#6B7280' }}>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Botón acción */}
          <div className="flex items-center px-4 py-3">
            <button
              type="button"
              onClick={tab === 'search' ? handleSearch : handleCustomSubmit}
              disabled={sending}
              style={{ background: '#4A8FA8', color: '#DAEEF7', border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}
            >
              {tab === 'search'
                ? <><Search size={14} /> Buscar</>
                : sending ? 'Enviando...' : <><Plane size={14} /> Solicitar</>
              }
            </button>
          </div>
        </div>

        {/* Confirmación viaje personalizado */}
        {tab === 'custom' && sent && (
          <div className="flex flex-col items-center gap-2 py-6 text-center border-t border-surface-600">
            <Ticket className="h-8 w-8" style={{ color: '#4A8FA8' }} />
            <p className="font-semibold text-white">¡Solicitud enviada!</p>
            <p className="text-sm text-ink-muted">Nuestro equipo se pondrá en contacto contigo para confirmar los detalles.</p>
            <button
              onClick={() => { setSent(false); setSearch(s => ({ ...s, destiny: '', startDate: '', endDate: '', passengers: 2, includesFlight: false, includesHotel: false, includesActivities: false })) }}
              style={{ color: '#4A8FA8', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, textDecoration: 'underline', marginTop: 4 }}
            >
              Crear otra solicitud
            </button>
          </div>
        )}

        {tab === 'custom' && formError && (
          <div className="px-6 pb-4 text-sm text-red-600">{formError}</div>
        )}
      </div>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
      )}

      {loading ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl bg-surface-800" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-12 text-center">
          <MapPin className="mx-auto h-10 w-10 text-brand-400" />
          <p className="mt-3 text-lg font-semibold text-white">No se encontraron destinos</p>
          <p className="text-sm text-ink-muted">Prueba con otro término de búsqueda</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(travel => (
            <DestinationCard
              key={travel.id}
              destination={travel}
              showOfferPrice={travel.sale === true}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default DestinationsPage