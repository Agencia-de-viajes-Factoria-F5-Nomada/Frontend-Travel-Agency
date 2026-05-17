import { useState, useEffect } from 'react'
import { Tag } from 'lucide-react'
import Button from '../components/atoms/Button'
import DestinationCard from '../components/organisms/DestinationCard'
import PageHeader from '../components/atoms/PageHeader'
import { travelService } from '../services/TravelsService'
import { PUBLIC_PATHS } from '../constants/paths'

const OffersPage = () => {
  const [offers, setOffers]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    travelService.getOnSale()
      .then(data => setOffers(data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container-page py-12">
      <PageHeader
        eyebrow="Ofertas"
        title="Viajes en oferta ahora mismo"
        description="Aprovecha los precios rebajados en estos destinos seleccionados."
      />

      {error && (
        <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
      )}

      {loading ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl bg-surface-800" />
          ))}
        </div>
      ) : offers.length ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {offers.map(travel => (
            <DestinationCard
              key={travel.id}
              destination={travel}
              showOfferPrice
              featured
            />
          ))}
        </div>
      ) : (
        <div className="mt-12 grid place-items-center gap-3 rounded-card border border-dashed border-surface-700 p-12 text-center">
          <Tag className="h-8 w-8 text-brand-400" aria-hidden="true" />
          <p className="text-lg font-semibold text-white">No hay ofertas disponibles</p>
          <p className="text-sm text-ink-muted">
            Vuelve pronto, publicamos nuevas ofertas con frecuencia.
          </p>
          <Button to={PUBLIC_PATHS.SEARCH}>Explorar destinos</Button>
        </div>
      )}
    </div>
  )
}

export default OffersPage