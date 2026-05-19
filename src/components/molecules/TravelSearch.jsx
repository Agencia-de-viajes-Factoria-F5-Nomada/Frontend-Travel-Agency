import { MapPin, Search, Calendar, Users } from 'lucide-react'

const POPULAR = ['Londres', 'París', 'Roma', 'Tokio']

const TravelSearch = ({ searchMode, setSearchMode, search, setSearch, onSearch, onPopularClick }) => {
  return (
    <section
      style={{ background: '#1A3A5C' }}
      className="flex flex-col items-center justify-center px-6 py-10 text-center"
    >
      <div className="mb-5 flex items-center gap-3">
        <span style={{ width: 20, height: 1, background: '#4A8FA8', display: 'inline-block' }} />
        <span style={{ fontSize: 11, color: '#7AAFC0', letterSpacing: '0.12em' }} className="uppercase">
          Catálogo de viajes · 2026
        </span>
        <span style={{ width: 20, height: 1, background: '#4A8FA8', display: 'inline-block' }} />
      </div>

      <h1 style={{ color: '#DAEEF7', letterSpacing: '-0.02em' }} className="text-4xl font-medium leading-tight mb-3">
        Encuentra tu viaje ideal
      </h1>
      <p style={{ color: '#7AAFC0' }} className="text-base leading-7 mb-8 max-w-lg">
        Explora todos los destinos disponibles y compara precios por fecha o mes.
      </p>

      {/* Toggle Fechas / Mes */}
      <div className="flex items-center gap-2 mb-4">
        <button
          type="button"
          onClick={() => setSearchMode('dates')}
          style={{
            fontSize: 13,
            padding: '4px 16px',
            borderRadius: 20,
            border: searchMode === 'dates' ? '1px solid #4A8FA8' : '1px solid rgba(74,143,168,0.3)',
            background: searchMode === 'dates' ? 'rgba(74,143,168,0.2)' : 'transparent',
            color: searchMode === 'dates' ? '#DAEEF7' : '#7AAFC0',
            cursor: 'pointer',
            fontWeight: searchMode === 'dates' ? 600 : 400,
          }}
        >
          Fechas exactas
        </button>
        <button
          type="button"
          onClick={() => setSearchMode('month')}
          style={{
            fontSize: 13,
            padding: '4px 16px',
            borderRadius: 20,
            border: searchMode === 'month' ? '1px solid #4A8FA8' : '1px solid rgba(74,143,168,0.3)',
            background: searchMode === 'month' ? 'rgba(74,143,168,0.2)' : 'transparent',
            color: searchMode === 'month' ? '#DAEEF7' : '#7AAFC0',
            cursor: 'pointer',
            fontWeight: searchMode === 'month' ? 600 : 400,
          }}
        >
          Por mes
        </button>
      </div>

      {/* Formulario de búsqueda */}
      <form
        onSubmit={onSearch}
        style={{
          background: 'rgba(218,238,247,0.06)',
          border: '1.5px solid #4A8FA8',
          borderRadius: 16,
          padding: '1rem',
          width: '100%',
          maxWidth: 860,
        }}
        className="flex flex-col lg:flex-row items-center gap-0"
      >
        {/* Destino */}
        <div className="flex flex-col flex-[2] w-full px-3 py-1 lg:border-r" style={{ borderColor: 'rgba(74,143,168,0.3)' }}>
          <span style={{ fontSize: 10, color: '#4A8FA8', letterSpacing: '0.1em' }} className="uppercase mb-1">Destino</span>
          <div className="flex items-center gap-2">
            <MapPin size={15} style={{ color: '#4A8FA8', flexShrink: 0 }} />
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

        {searchMode === 'dates' ? (
          <>
            {/* Salida */}
            <div className="flex flex-col flex-1 w-full px-3 py-1 lg:border-r" style={{ borderColor: 'rgba(74,143,168,0.3)' }}>
              <span style={{ fontSize: 10, color: '#4A8FA8', letterSpacing: '0.1em' }} className="uppercase mb-1">Salida</span>
              <div className="flex items-center gap-2">
                <Calendar size={15} style={{ color: '#4A8FA8', flexShrink: 0 }} />
                <input
                  type="date"
                  value={search.startDate}
                  onChange={e => setSearch(s => ({ ...s, startDate: e.target.value }))}
                  style={{ colorScheme: 'dark', background: 'transparent', border: 'none', outline: 'none', color: search.startDate ? '#DAEEF7' : 'rgba(218,238,247,0.25)', fontSize: 13, width: '100%' }}
                />
              </div>
            </div>

            {/* Vuelta */}
            <div className="flex flex-col flex-1 w-full px-3 py-1 lg:border-r" style={{ borderColor: 'rgba(74,143,168,0.3)' }}>
              <span style={{ fontSize: 10, color: '#4A8FA8', letterSpacing: '0.1em' }} className="uppercase mb-1">Vuelta</span>
              <div className="flex items-center gap-2">
                <Calendar size={15} style={{ color: '#4A8FA8', flexShrink: 0 }} />
                <input
                  type="date"
                  value={search.endDate}
                  onChange={e => setSearch(s => ({ ...s, endDate: e.target.value }))}
                  style={{ colorScheme: 'dark', background: 'transparent', border: 'none', outline: 'none', color: search.endDate ? '#DAEEF7' : 'rgba(218,238,247,0.25)', fontSize: 13, width: '100%' }}
                />
              </div>
            </div>
          </>
        ) : (
          /* Mes */
          <div className="flex flex-col flex-1 w-full px-3 py-1 lg:border-r" style={{ borderColor: 'rgba(74,143,168,0.3)' }}>
            <span style={{ fontSize: 10, color: '#4A8FA8', letterSpacing: '0.1em' }} className="uppercase mb-1">Mes</span>
            <div className="flex items-center gap-2">
              <Calendar size={15} style={{ color: '#4A8FA8', flexShrink: 0 }} />
              <input
                type="month"
                value={search.month}
                onChange={e => setSearch(s => ({ ...s, month: e.target.value }))}
                style={{ colorScheme: 'dark', background: 'transparent', border: 'none', outline: 'none', color: search.month ? '#DAEEF7' : 'rgba(218,238,247,0.25)', fontSize: 13, width: '100%' }}
              />
            </div>
          </div>
        )}

        {/* Viajeros */}
        <div className="flex flex-col flex-1 w-full px-3 py-1 lg:border-r" style={{ borderColor: 'rgba(74,143,168,0.3)' }}>
          <span style={{ fontSize: 10, color: '#4A8FA8', letterSpacing: '0.1em' }} className="uppercase mb-1">Viajeros</span>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Users size={15} style={{ color: '#4A8FA8' }} />
              <span style={{ fontSize: 13, color: 'rgba(218,238,247,0.7)' }}>{search.passengers}</span>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setSearch(s => ({ ...s, passengers: Math.max(1, s.passengers - 1) }))}
                style={{ width: 20, height: 20, borderRadius: '50%', border: '0.5px solid rgba(74,143,168,0.4)', background: 'transparent', color: '#7AAFC0', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
              <button type="button" onClick={() => setSearch(s => ({ ...s, passengers: Math.min(20, s.passengers + 1) }))}
                style={{ width: 20, height: 20, borderRadius: '50%', border: '0.5px solid rgba(74,143,168,0.4)', background: 'transparent', color: '#7AAFC0', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
            </div>
          </div>
        </div>

        {/* Botón */}
        <div className="pl-3 w-full lg:w-auto mt-3 lg:mt-0">
          <button type="submit"
            style={{ background: '#4A8FA8', color: '#DAEEF7', border: 'none', borderRadius: 10, padding: '10px 22px', fontSize: 14, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', width: '100%', justifyContent: 'center' }}>
            <Search size={15} />
            Buscar
          </button>
        </div>
      </form>

      {/* Populares */}
      <div className="flex items-center gap-2 mt-4 flex-wrap justify-center">
        <span style={{ fontSize: 11, color: '#7AAFC0' }}>Populares:</span>
        {POPULAR.map(p => (
          <button key={p} type="button"
            onClick={() => onPopularClick(p)}
            style={{ fontSize: 11, color: '#7AAFC0', border: '0.5px solid rgba(74,143,168,0.3)', borderRadius: 20, padding: '2px 12px', background: 'transparent', cursor: 'pointer' }}>
            {p}
          </button>
        ))}
      </div>
    </section>
  )
}

export default TravelSearch