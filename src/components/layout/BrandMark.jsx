import { Link } from 'react-router-dom'
import { PUBLIC_PATHS } from '../../constants/paths'

const BrandMark = ({ to = PUBLIC_PATHS.HOME }) => (
  <Link
    to={to}
    className="inline-flex items-center gap-2"
    aria-label="Inicio Agencia de Viajes"
  >
    <img
      src="/nomada-logo-symbol.png"
      alt="logo Nómada"
      className="h-10 w-10 object-contain"
      aria-hidden="true"
    />
    <span className="text-xl font-bold text-white tracking-tight">Nomada</span>
  </Link>
)

export default BrandMark
