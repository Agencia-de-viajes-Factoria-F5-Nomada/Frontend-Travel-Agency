import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import BookingsPage from "../pages/BookingsPage";

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. BORRA LA ETIQUETA <Navbar /> QUE ESTABA AQUÍ */}
      
      <main>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;