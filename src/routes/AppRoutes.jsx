import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import AuthPage from "../pages/AuthPage";
import BookingsPage from "../pages/BookingsPage";

function AppRoutes() {
  return (
    <Routes>
      
      <Route path="/login" element={<AuthPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="bookings" element={<BookingsPage />} />
        <Route index element={<Navigate to="bookings" replace />} />
      </Route>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;
