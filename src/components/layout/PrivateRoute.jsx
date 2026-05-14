import { Navigate } from 'react-router-dom';
import { authService } from '../../services/authService';

export default function PrivateRoute({ children, adminOnly = false }) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/auth" replace />;
  }
  if (adminOnly && !authService.isAdmin()) {
    return <Navigate to="/" replace />;
  }
  return children;
}