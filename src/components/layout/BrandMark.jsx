import { Plane } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PUBLIC_PATHS } from '../../constants/paths'

const BrandMark = ({ to = PUBLIC_PATHS.HOME }) => (
  <Link
    to={to}
    className="inline-flex items-center gap-2 text-white"
    aria-label="Inicio Agencia de Viajes"
  >
    <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 text-surface-950">
      <Plane className="h-5 w-5" aria-hidden="true" />
    </span>
    <span className="text-lg font-semibold tracking-tight">Nomada</span>
  </Link>
)

export default BrandMark
