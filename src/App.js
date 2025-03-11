import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";

import Home from "./views/Home";
import Error from './views/Error';
import Menu from './views/Menu';
import B from './views/b';
import C from './views/c';
import Admin from "./views/Admin";
import Empleado from "./views/Empleado";
import Footer from './components/Footer';
import ProtectedRoute from "./routes/ProtectedRoute.js"; // Importamos las rutas protegidas

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div>
          <Routes>
            {/* Vista principal */}
            <Route path="/" element={<Home />} />

            {/* Otras rutas */}
            <Route path="/a" element={<Menu />} />
            <Route path="/b" element={<B />} />
            <Route path="/c" element={<C />} />

            {/* Ruta protegida para ADMIN */}
            <Route element={<ProtectedRoute requiredRole={1} />}>
              <Route path="/admin" element={<Admin />} />
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
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

function FooterVisibility() {
  const location = useLocation();
  const hideFooterOn = ["/b"];

  return !hideFooterOn.includes(location.pathname) ? <Footer /> : null;
}

export default App;
