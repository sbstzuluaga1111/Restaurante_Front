import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext"; // Importar el AuthProvider

import Home from "./views/Home";
import Error from './views/Error';
import Menu from './views/Menu';
import Login from './views/Login.jsx';
import Carrito from './views/Carrito.jsx';
import Admin from "./views/Admin";
import Empleado from "./views/Empleado";
import Footer from './components/Footer';
import ProtectedRoute from "./routes/ProtectedRoute.js"; // Importamos las rutas protegidas
import TareasAdmin from './views/TareasAdmin.jsx';

function App() {
  return (
    <BrowserRouter> {/* Mover BrowserRouter afuera */}
      <AuthProvider> {/* El AuthProvider está ahora dentro del BrowserRouter */}
        <Routes>
          {/* Vista principal */}
          <Route path="/" element={<Home />} />

          {/* Otras rutas */}
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/carrito" element={<Carrito />} />

          {/* Ruta protegida para ADMIN */}
          <Route element={<ProtectedRoute requiredRole={1} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          
          <Route element={<ProtectedRoute requiredRole={1} />}>
            <Route path='/gestion-tareas' element={<TareasAdmin />} />
          </Route>

          {/* Ruta protegida para EMPLEADO */}
          <Route element={<ProtectedRoute requiredRole={2} />}>
            <Route path="/empleado" element={<Empleado />} />
          </Route>

          {/* Ruta de error */}
          <Route path="/error" element={<Error />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/error" replace />} />
        </Routes>

        <FooterVisibility />
      </AuthProvider>
    </BrowserRouter>
  );
}

function FooterVisibility() {
  const location = useLocation();
  const hideFooterOn = ["/b"];

  return !hideFooterOn.includes(location.pathname) ? <Footer /> : null;
}

export default App;