import { Navigate, Outlet } from 'react-router-dom'
import { PUBLIC_PATHS } from '../constants/paths'

const PrivateRoute = () => {
  const token = sessionStorage.getItem('token')
  return token ? <Outlet /> : <Navigate to={PUBLIC_PATHS.AUTH} replace />
}

export default PrivateRoute
