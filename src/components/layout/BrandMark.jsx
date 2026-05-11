import { Link } from 'react-router-dom'
import { PUBLIC_PATHS } from '../../constants/paths'

const BrandMark = ({ to = PUBLIC_PATHS.HOME }) => (
  <Link
    to={to}
    className="inline-flex items-center"
    aria-label="Inicio Agencia de Viajes"
  >
    <img
      src="src/assets/logoNomada.a1b2c3.png.png"
      alt="logo Nómada"
      className="h-20 w-20 object-contain"
      aria-hidden="true"
    />
  </Link>
)

export default BrandMark
