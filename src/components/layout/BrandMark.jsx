import { Link } from 'react-router-dom'
import { PUBLIC_PATHS } from '../../constants/paths'

const BrandMark = ({ to = PUBLIC_PATHS.HOME }) => (
  <Link
    to={to}
    className="inline-flex items-center"
    aria-label="Inicio Nómada"
  >
    <svg
      height="48"
      viewBox="0 0 300 120"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="55" cy="60" r="42" fill="none" stroke="white" strokeWidth="1.5"/>
      <path d="M13 52 Q35 42 55 44 Q75 42 97 52" fill="none" stroke="white" strokeWidth="1.5"/>
      <path d="M16 68 Q36 60 55 62 Q74 60 94 68" fill="none" stroke="white" strokeWidth="1.5"/>
      <circle cx="70" cy="38" r="7" fill="#4A8FA8"/>
      <line x1="115" y1="15" x2="115" y2="105" stroke="white" strokeWidth="1.5"/>
      <text x="145" y="42" fontFamily="serif" fontSize="32" fontWeight="700" fill="white" letterSpacing="1">NÓ</text>
      <text x="145" y="75" fontFamily="serif" fontSize="32" fontWeight="700" fill="white" letterSpacing="1">MA</text>
      <text x="145" y="108" fontFamily="serif" fontSize="32" fontWeight="700" fill="white" letterSpacing="1">DA</text>
    </svg>
  </Link>
)

export default BrandMark