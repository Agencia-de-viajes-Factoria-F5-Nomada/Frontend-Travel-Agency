import { Link } from 'react-router-dom'
import { PUBLIC_PATHS } from '../../constants/paths'

const BrandMark = ({ to = PUBLIC_PATHS.HOME }) => (
  <Link
    to={to}
    className="inline-flex items-center gap-2"
    aria-label="Inicio Nomada"
  >
    <img
      src="/nomada-logo-symbol.png"
      alt=""
      className="h-14 w-14 object-contain"
      aria-hidden="true"
    />
    <span className="text-xl font-semibold tracking-tight text-white">
      Nomada
    </span>
  </Link>
)

export default BrandMark
