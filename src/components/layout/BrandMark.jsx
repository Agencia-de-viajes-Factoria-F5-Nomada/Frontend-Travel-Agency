import { Link } from 'react-router-dom'
import { PUBLIC_PATHS } from '../../constants/paths'

const BrandMark = ({ to = PUBLIC_PATHS.HOME }) => (
  <Link
    to={to}
    className="inline-flex items-center"
    aria-label="Inicio Agencia de Viajes"
  >
    <img
      src="/nomada-logo-symbol.png"
      alt=""
      className="h-11 w-11 object-contain"
      aria-hidden="true"
    />
  </Link>
)

export default BrandMark
