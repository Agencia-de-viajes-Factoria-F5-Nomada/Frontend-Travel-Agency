import { MapPin, Search, Calendar, Users } from 'lucide-react'

const POPULAR = ['Londres', 'París', 'Roma', 'Tokio']

const TravelSearch = ({ searchMode, setSearchMode, search, setSearch, onSearch, onPopularClick }) => {
  return (
    <section
      className="flex flex-col items-center justify-center bg-accent-dark px-6 py-10 text-center"
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="inline-block h-px w-5 bg-accent" />
        <span className="text-[11px] uppercase tracking-[0.12em] text-accent-muted">
          Catálogo de viajes · 2026
        </span>
        <span className="inline-block h-px w-5 bg-accent" />
      </div>

      <h1 className="text-4xl font-medium leading-tight mb-3 tracking-tight text-accent-light">
        Encuentra tu viaje ideal
      </h1>
      <p className="text-base leading-7 mb-8 max-w-lg text-accent-muted">
        Explora todos los destinos disponibles y compara precios por fecha o mes.
      </p>

      {/* Toggle Fechas / Mes */}
      <div className="flex items-center gap-2 mb-4">
        <button
          type="button"
          onClick={() => setSearchMode('dates')}
          className={`cursor-pointer rounded-full px-4 py-1 text-xs ${
            searchMode === 'dates'
              ? 'border border-accent bg-accent/20 font-semibold text-accent-light'
              : 'border border-accent/30 bg-transparent font-normal text-accent-muted'
          }`}
        >
          Fechas exactas
        </button>
        <button
          type="button"
          onClick={() => setSearchMode('month')}
          className={`cursor-pointer rounded-full px-4 py-1 text-xs ${
            searchMode === 'month'
              ? 'border border-accent bg-accent/20 font-semibold text-accent-light'
              : 'border border-accent/30 bg-transparent font-normal text-accent-muted'
          }`}
        >
          Por mes
        </button>
      </div>

      {/* Formulario de búsqueda */}
      <form
        onSubmit={onSearch}
        className="flex w-full max-w-[860px] flex-col items-center gap-0 rounded-2xl border-[1.5px] border-accent bg-accent-light/[0.06] p-4 lg:flex-row"
      >
        {/* Destino */}
        <div className="flex w-full flex-[2] flex-col px-3 py-1 lg:border-r lg:border-accent/30">
          <span className="mb-1 text-[10px] uppercase tracking-[0.1em] text-accent">Destino</span>
          <div className="flex items-center gap-2">
            <MapPin size={15} className="shrink-0 text-accent" />
            <input
              type="text"
              placeholder="¿A dónde?"
              value={search.destiny}
              onChange={e => setSearch(s => ({ ...s, destiny: e.target.value }))}
              className="w-full border-none bg-transparent text-sm text-accent-light outline-none placeholder:text-white/25"
            />
          </div>
        </div>

        {searchMode === 'dates' ? (
          <>
            {/* Salida */}
            <div className="flex w-full flex-1 flex-col px-3 py-1 lg:border-r lg:border-accent/30">
              <span className="mb-1 text-[10px] uppercase tracking-[0.1em] text-accent">Salida</span>
              <div className="flex items-center gap-2">
                <Calendar size={15} className="shrink-0 text-accent" />
                <input
                  type="date"
                  value={search.startDate}
                  onChange={e => setSearch(s => ({ ...s, startDate: e.target.value }))}
                  className={`w-full border-none bg-transparent text-sm outline-none [color-scheme:dark] ${
                    search.startDate ? 'text-accent-light' : 'text-accent-light/25'
                  }`}
                />
              </div>
            </div>

            {/* Vuelta */}
            <div className="flex w-full flex-1 flex-col px-3 py-1 lg:border-r lg:border-accent/30">
              <span className="mb-1 text-[10px] uppercase tracking-[0.1em] text-accent">Vuelta</span>
              <div className="flex items-center gap-2">
                <Calendar size={15} className="shrink-0 text-accent" />
                <input
                  type="date"
                  value={search.endDate}
                  onChange={e => setSearch(s => ({ ...s, endDate: e.target.value }))}
                  className={`w-full border-none bg-transparent text-sm outline-none [color-scheme:dark] ${
                    search.endDate ? 'text-accent-light' : 'text-accent-light/25'
                  }`}
                />
              </div>
            </div>
          </>
        ) : (
          /* Mes */
          <div className="flex w-full flex-1 flex-col px-3 py-1 lg:border-r lg:border-accent/30">
            <span className="mb-1 text-[10px] uppercase tracking-[0.1em] text-accent">Mes</span>
            <div className="flex items-center gap-2">
              <Calendar size={15} className="shrink-0 text-accent" />
              <input
                type="month"
                value={search.month}
                onChange={e => setSearch(s => ({ ...s, month: e.target.value }))}
                className={`w-full border-none bg-transparent text-sm outline-none [color-scheme:dark] ${
                  search.month ? 'text-accent-light' : 'text-accent-light/25'
                }`}
              />
            </div>
          </div>
        )}

        {/* Viajeros */}
        <div className="flex w-full flex-1 flex-col px-3 py-1 lg:border-r lg:border-accent/30">
          <span className="mb-1 text-[10px] uppercase tracking-[0.1em] text-accent">Viajeros</span>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Users size={15} className="text-accent" />
              <span className="text-[13px] text-accent-light/70">{search.passengers}</span>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setSearch(s => ({ ...s, passengers: Math.max(1, s.passengers - 1) }))}
                className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border-[0.5px] border-accent/40 bg-transparent text-sm text-accent-muted">−</button>
              <button type="button" onClick={() => setSearch(s => ({ ...s, passengers: Math.min(20, s.passengers + 1) }))}
                className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border-[0.5px] border-accent/40 bg-transparent text-sm text-accent-muted">+</button>
            </div>
          </div>
        </div>

        {/* Botón */}
        <div className="mt-3 w-full pl-3 lg:mt-0 lg:w-auto">
          <button type="submit"
            className="flex w-full cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl border-none bg-accent px-[22px] py-[10px] text-sm font-medium text-accent-light">
            <Search size={15} />
            Buscar
          </button>
        </div>
      </form>

      {/* Populares */}
      <div className="flex items-center gap-2 mt-4 flex-wrap justify-center">
        <span className="text-[11px] text-accent-muted">Populares:</span>
        {POPULAR.map(p => (
          <button key={p} type="button"
            onClick={() => onPopularClick(p)}
            className="cursor-pointer rounded-full border-[0.5px] border-accent/30 bg-transparent px-3 py-0.5 text-[11px] text-accent-muted">
            {p}
          </button>
        ))}
      </div>
    </section>
  )
}

export default TravelSearch